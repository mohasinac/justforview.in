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

    // All order bulk actions require authentication
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // SELLER ACTIONS - can only modify orders for their shops
    if (["process", "ship", "deliver"].includes(action)) {
      if (user.role !== "admin") {
        const ordersSnapshot = await Collections.orders()
          .where("__name__", "in", ids)
          .get();

        const allOwned = ordersSnapshot.docs.every(
          (doc) => doc.data().shop_id === user.id
        );

        if (!allOwned) {
          return NextResponse.json(
            { error: "Can only modify orders for your shop" },
            { status: 403 }
          );
        }
      }

      return handleSellerActions(action, ids);
    }

    // ADMIN-ONLY ACTIONS
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    return handleAdminActions(action, ids);
  } catch (error: any) {
    console.error("Bulk order operation error:", error);
    return NextResponse.json(createBulkErrorResponse(error), { status: 500 });
  }
}

async function handleSellerActions(action: string, ids: string[]) {
  const db = Collections.orders().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.orders().doc(id);

    switch (action) {
      case "process":
        batch.update(ref, {
          status: "processing",
          processing_at: timestamp,
          updated_at: timestamp,
        });
        break;

      case "ship":
        batch.update(ref, {
          status: "shipped",
          shipped_at: timestamp,
          updated_at: timestamp,
        });
        break;

      case "deliver":
        batch.update(ref, {
          status: "delivered",
          delivered_at: timestamp,
          updated_at: timestamp,
        });
        break;
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
  const db = Collections.orders().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.orders().doc(id);

    switch (action) {
      case "confirm":
        batch.update(ref, {
          status: "confirmed",
          confirmed_at: timestamp,
          updated_at: timestamp,
        });
        break;

      case "cancel":
        batch.update(ref, {
          status: "cancelled",
          cancelled_at: timestamp,
          updated_at: timestamp,
        });
        break;

      case "refund":
        batch.update(ref, {
          status: "refunded",
          refunded_at: timestamp,
          updated_at: timestamp,
        });
        break;

      case "delete":
        // Only allow deleting cancelled or failed orders
        const orderDoc = await ref.get();
        const orderData = orderDoc.data();

        if (
          orderData?.status !== "cancelled" &&
          orderData?.status !== "failed"
        ) {
          return NextResponse.json(
            { error: `Order ${id} can only be deleted if cancelled or failed` },
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
