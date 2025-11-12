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

    // All shop bulk actions require admin authentication
    const user = await getAuthUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    return handleAdminActions(action, ids);
  } catch (error: any) {
    console.error("Bulk shop operation error:", error);
    return NextResponse.json(createBulkErrorResponse(error), { status: 500 });
  }
}

async function handleAdminActions(action: string, ids: string[]) {
  const db = Collections.shops().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.shops().doc(id);

    switch (action) {
      case "verify":
        batch.update(ref, { is_verified: true, updated_at: timestamp });
        break;

      case "unverify":
        batch.update(ref, { is_verified: false, updated_at: timestamp });
        break;

      case "activate":
        batch.update(ref, {
          is_active: true,
          is_banned: false,
          updated_at: timestamp,
        });
        break;

      case "deactivate":
        batch.update(ref, { is_active: false, updated_at: timestamp });
        break;

      case "ban":
        batch.update(ref, {
          is_banned: true,
          is_active: false,
          ban_reason: "Bulk ban action",
          updated_at: timestamp,
        });
        break;

      case "unban":
        batch.update(ref, {
          is_banned: false,
          ban_reason: null,
          updated_at: timestamp,
        });
        break;

      case "delete":
        // Check if shop has products
        const productsSnapshot = await db
          .collection("products")
          .where("shop_id", "==", id)
          .limit(1)
          .get();

        if (!productsSnapshot.empty) {
          return NextResponse.json(
            { error: `Shop ${id} has products` },
            { status: 400 }
          );
        }

        // Check if shop has auctions
        const auctionsSnapshot = await db
          .collection("auctions")
          .where("shop_id", "==", id)
          .limit(1)
          .get();

        if (!auctionsSnapshot.empty) {
          return NextResponse.json(
            { error: `Shop ${id} has auctions` },
            { status: 400 }
          );
        }

        batch.delete(ref);
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
