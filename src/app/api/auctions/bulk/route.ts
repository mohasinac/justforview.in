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

    // PUBLIC ACTIONS - no auth required
    if (action === "addToWatchlist") {
      return NextResponse.json({ success: true, message: "Use watchlist API" });
    }

    // All other actions require authentication
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // SELLER ACTIONS - can only modify own auctions
    if (["update", "delete", "start", "end", "cancel"].includes(action)) {
      // Verify seller owns all auctions
      if (user.role !== "admin") {
        const auctionsSnapshot = await Collections.auctions()
          .where("__name__", "in", ids)
          .get();

        const allOwned = auctionsSnapshot.docs.every(
          (doc) =>
            doc.data().sellerId === user.id || doc.data().seller_id === user.id
        );

        if (!allOwned) {
          return NextResponse.json(
            { error: "Can only modify your own auctions" },
            { status: 403 }
          );
        }

        // Validate status transitions
        for (const doc of auctionsSnapshot.docs) {
          const item = doc.data();
          const validation = validateAuctionAction(action, item);
          if (!validation.valid) {
            return NextResponse.json(
              { error: validation.error },
              { status: 400 }
            );
          }
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
    console.error("Bulk auction operation error:", error);
    return NextResponse.json(createBulkErrorResponse(error), { status: 500 });
  }
}

function validateAuctionAction(action: string, item: any) {
  switch (action) {
    case "start":
      if (item?.status !== "scheduled") {
        return {
          valid: false,
          error: "Only scheduled auctions can be started",
        };
      }
      break;

    case "end":
      if (item?.status !== "live") {
        return { valid: false, error: "Only live auctions can be ended" };
      }
      break;

    case "cancel":
      if (item?.status !== "scheduled" && item?.status !== "live") {
        return {
          valid: false,
          error: "Can only cancel scheduled or live auctions",
        };
      }
      break;

    case "delete":
      if (
        item?.status !== "draft" &&
        item?.status !== "ended" &&
        item?.status !== "cancelled"
      ) {
        return {
          valid: false,
          error: "Can only delete draft, ended, or cancelled auctions",
        };
      }
      break;
  }

  return { valid: true };
}

async function handleSellerActions(action: string, ids: string[]) {
  const db = Collections.auctions().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.auctions().doc(id);

    switch (action) {
      case "start":
        batch.update(ref, {
          status: "live",
          start_time: timestamp,
          updated_at: timestamp,
        });
        break;

      case "end":
        batch.update(ref, {
          status: "ended",
          end_time: timestamp,
          updated_at: timestamp,
        });
        break;

      case "cancel":
        batch.update(ref, { status: "cancelled", updated_at: timestamp });
        break;

      case "delete":
        batch.delete(ref);
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
  const db = Collections.auctions().firestore;
  const batch = db.batch();
  const timestamp = new Date().toISOString();

  for (const id of ids) {
    const ref = Collections.auctions().doc(id);

    switch (action) {
      case "feature":
        batch.update(ref, { is_featured: true, updated_at: timestamp });
        break;

      case "unfeature":
        batch.update(ref, { is_featured: false, updated_at: timestamp });
        break;

      case "approve":
        batch.update(ref, { is_approved: true, updated_at: timestamp });
        break;

      case "reject":
        batch.update(ref, {
          is_approved: false,
          status: "rejected",
          updated_at: timestamp,
        });
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
