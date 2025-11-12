import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/api/lib/auth-helpers";
import { Collections } from "@/app/api/lib/firebase/collections";
import {
  parseBulkRequest,
  createBulkErrorResponse,
} from "../../lib/bulk-operations";

export async function POST(req: NextRequest) {
  try {
    const { action, ids } = await parseBulkRequest(req);

    // All category bulk actions require admin authentication
    const user = await getAuthUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    return handleAdminActions(action, ids);
  } catch (error: any) {
    console.error("Bulk category operation error:", error);
    return NextResponse.json(createBulkErrorResponse(error), { status: 500 });
  }
}

async function handleAdminActions(action: string, ids: string[]) {
  const db = Collections.categories().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.categories().doc(id);

    switch (action) {
      case "activate":
        batch.update(ref, { is_active: true, updated_at: timestamp });
        break;

      case "deactivate":
        batch.update(ref, { is_active: false, updated_at: timestamp });
        break;

      case "feature":
        batch.update(ref, { is_featured: true, updated_at: timestamp });
        break;

      case "unfeature":
        batch.update(ref, { is_featured: false, updated_at: timestamp });
        break;

      case "delete":
        // Check if category has children
        const childrenSnapshot = await db
          .collection("categories")
          .where("parent_id", "==", id)
          .limit(1)
          .get();

        if (!childrenSnapshot.empty) {
          return NextResponse.json(
            { error: `Category ${id} has subcategories` },
            { status: 400 }
          );
        }

        // Check if category has products
        const productsSnapshot = await db
          .collection("products")
          .where("category_id", "==", id)
          .limit(1)
          .get();

        if (!productsSnapshot.empty) {
          return NextResponse.json(
            { error: `Category ${id} has products` },
            { status: 400 }
          );
        }

        batch.delete(ref);
        break;

      case "approve":
        batch.update(ref, {
          needs_review: false,
          is_active: true,
          updated_at: timestamp,
        });
        break;

      case "reject":
        batch.update(ref, {
          needs_review: false,
          is_active: false,
          updated_at: timestamp,
        });
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  await batch.commit();
  return NextResponse.json({
    success: true,
    updated: ids.length,
    action,
  });
}
