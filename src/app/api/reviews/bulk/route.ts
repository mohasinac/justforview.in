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

    // PUBLIC ACTIONS - users can flag reviews
    if (action === "flag") {
      const user = await getAuthUser(req);
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return handleUserActions(action, ids);
    }

    // All other actions require admin authentication
    const user = await getAuthUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    return handleAdminActions(action, ids);
  } catch (error: any) {
    console.error("Bulk review operation error:", error);
    return NextResponse.json(createBulkErrorResponse(error), { status: 500 });
  }
}

async function handleUserActions(action: string, ids: string[]) {
  const db = Collections.reviews().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.reviews().doc(id);

    if (action === "flag") {
      batch.update(ref, {
        is_flagged: true,
        flagged_at: timestamp,
        updated_at: timestamp,
      });
    }
  }

  await batch.commit();
  return NextResponse.json({
    success: true,
    updated: ids.length,
    action,
  });
}

async function handleAdminActions(action: string, ids: string[]) {
  const db = Collections.reviews().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.reviews().doc(id);

    switch (action) {
      case "approve":
        batch.update(ref, {
          status: "approved",
          approved_at: timestamp,
          updated_at: timestamp,
        });
        break;

      case "reject":
        batch.update(ref, {
          status: "rejected",
          rejected_at: timestamp,
          updated_at: timestamp,
        });
        break;

      case "unflag":
        batch.update(ref, {
          is_flagged: false,
          flagged_at: null,
          updated_at: timestamp,
        });
        break;

      case "delete":
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
