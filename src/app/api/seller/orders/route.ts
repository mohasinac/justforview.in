import { NextRequest, NextResponse } from "next/server";
import { requireRole, handleAuthError } from "../../lib/auth-helpers";
import { getFirestoreAdmin } from "../../lib/firebase/admin";
import { mapOrderToUI } from "@/schemas/mappers/order.mapper";
import type { Order } from "@/schemas/resources/order.schema";

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(request, ["seller"]);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("paymentStatus");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const db = getFirestoreAdmin();

    // Get seller's shop ID
    const shopSnapshot = await db
      .collection("shops")
      .where("owner_id", "==", user.id)
      .limit(1)
      .get();

    if (shopSnapshot.empty) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    const shopId = shopSnapshot.docs[0].id;

    let query = db.collection("orders").where("shop_id", "==", shopId);

    // Apply filters
    if (status) {
      query = query.where("status", "==", status) as any;
    }
    if (paymentStatus) {
      query = query.where("payment_status", "==", paymentStatus) as any;
    }
    if (startDate) {
      query = query.where("created_at", ">=", new Date(startDate)) as any;
    }
    if (endDate) {
      query = query.where("created_at", "<=", new Date(endDate)) as any;
    }

    // Add ordering
    query = query.orderBy("created_at", "desc") as any;

    // Get total count
    const countSnapshot = await query.get();
    const total = countSnapshot.size;

    // Apply pagination
    const offset = (page - 1) * limit;
    const snapshot = await query.limit(limit).offset(offset).get();

    const orders = snapshot.docs.map((doc: any) =>
      mapOrderToUI({ id: doc.id, ...doc.data() } as Order & { id: string })
    );

    return NextResponse.json({
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return handleAuthError(error);
  }
}
