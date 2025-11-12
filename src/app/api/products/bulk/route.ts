import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/api/lib/auth-helpers";
import { Collections } from "@/app/api/lib/firebase/collections";
import {
  parseBulkRequest,
  createBulkErrorResponse,
} from "../../lib/bulk-operations";

export async function POST(req: NextRequest) {
  try {
    const { action, ids, data } = await parseBulkRequest(req);

    // PUBLIC ACTIONS - no auth required
    if (action === "addToCart") {
      return handleAddToCart(ids);
    }

    if (action === "addToWishlist") {
      return handleAddToWishlist(ids);
    }

    // All other actions require authentication
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // SELLER ACTIONS - can only modify own products
    if (
      [
        "update",
        "delete",
        "update-stock",
        "publish",
        "unpublish",
        "archive",
      ].includes(action)
    ) {
      // Verify seller owns all products
      if (user.role !== "admin") {
        const productsSnapshot = await Collections.products()
          .where("__name__", "in", ids)
          .get();

        const allOwned = productsSnapshot.docs.every(
          (doc) =>
            doc.data().shopId === user.id || doc.data().shop_id === user.id
        );

        if (!allOwned) {
          return NextResponse.json(
            { error: "Can only modify your own products" },
            { status: 403 }
          );
        }
      }

      // Admin or verified seller - proceed
      return handleSellerActions(action, ids, data);
    }

    // ADMIN-ONLY ACTIONS
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    // Execute admin-only operations
    return handleAdminActions(action, ids, data);
  } catch (error: any) {
    console.error("Bulk operation error:", error);
    return NextResponse.json(createBulkErrorResponse(error), { status: 500 });
  }
}

// Helper functions
async function handleAddToCart(ids: string[]) {
  // Implementation for cart (frontend handles this typically)
  return NextResponse.json({ success: true, message: "Use cart API" });
}

async function handleAddToWishlist(ids: string[]) {
  // Implementation for wishlist (frontend handles this typically)
  return NextResponse.json({ success: true, message: "Use wishlist API" });
}

async function handleSellerActions(action: string, ids: string[], data: any) {
  const db = Collections.products().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.products().doc(id);

    switch (action) {
      case "update":
        batch.update(ref, { ...data, updated_at: timestamp });
        break;

      case "delete":
        batch.delete(ref);
        break;

      case "update-stock":
        batch.update(ref, {
          stock_count: parseInt(data?.stockCount || "0"),
          updated_at: timestamp,
        });
        break;

      case "publish":
        batch.update(ref, { status: "published", updated_at: timestamp });
        break;

      case "unpublish":
        batch.update(ref, { status: "draft", updated_at: timestamp });
        break;

      case "archive":
        batch.update(ref, { status: "archived", updated_at: timestamp });
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

async function handleAdminActions(action: string, ids: string[], data: any) {
  const db = Collections.products().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.products().doc(id);

    switch (action) {
      case "feature":
        batch.update(ref, { is_featured: true, updated_at: timestamp });
        break;

      case "unfeature":
        batch.update(ref, { is_featured: false, updated_at: timestamp });
        break;

      case "ban":
        batch.update(ref, { status: "banned", updated_at: timestamp });
        break;

      case "verify":
        batch.update(ref, { is_verified: true, updated_at: timestamp });
        break;

      default:
        throw new Error(`Unknown admin action: ${action}`);
    }
  }

  await batch.commit();
  return NextResponse.json({
    success: true,
    updated: ids.length,
    action,
  });
}
