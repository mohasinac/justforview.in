import { NextRequest, NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { getCurrentUser } from "@/app/api/lib/session";
import { userOwnsShop } from "@/app/api/lib/firebase/queries";
import { mapOrderToUI } from "@/schemas/mappers/order.mapper";
import type { Order } from "@/schemas/resources/order.schema";

// GET /api/orders - role-filtered list
// POST /api/orders - create order (user)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    const role = user?.role || "guest";
    const { searchParams } = new URL(request.url);
    const shopId = searchParams.get("shop_id");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    let query: FirebaseFirestore.Query = Collections.orders();
    if (role === "admin") {
      if (shopId) query = query.where("shop_id", "==", shopId);
    } else if (role === "seller") {
      if (!shopId) return NextResponse.json({ success: true, data: [] });
      const owns = await userOwnsShop(shopId, user!.id);
      if (!owns)
        return NextResponse.json(
          { success: false, error: "Forbidden" },
          { status: 403 }
        );
      query = query.where("shop_id", "==", shopId);
    } else if (role === "user") {
      query = query.where("user_id", "==", user!.id);
    } else {
      return NextResponse.json({ success: true, data: [] });
    }

    const snap = await query.orderBy("created_at", "desc").limit(limit).get();
    const data = snap.docs.map((d) => {
      const orderData = d.data() as Order;
      return mapOrderToUI({ ...orderData, id: d.id });
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Orders list error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to list orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user?.id)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    const body = await request.json();
    const { shop_id, items, amount } = body;
    if (!shop_id || !Array.isArray(items) || !Number.isFinite(Number(amount))) {
      return NextResponse.json(
        { success: false, error: "Invalid payload" },
        { status: 400 }
      );
    }
    const now = new Date().toISOString();
    const docRef = await Collections.orders().add({
      user_id: user.id,
      shop_id,
      items,
      amount: Number(amount),
      status: "pending",
      created_at: now,
      updated_at: now,
    });
    const created = await docRef.get();
    const createdData = { ...created.data(), id: created.id } as Order & {
      id: string;
    };
    return NextResponse.json(
      { success: true, data: mapOrderToUI(createdData) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
