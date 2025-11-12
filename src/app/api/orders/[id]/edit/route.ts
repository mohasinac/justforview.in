import { NextRequest, NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapOrderToUI } from "@/schemas/mappers/order.mapper";
import type { Order } from "@/schemas/resources/order.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = await Collections.orders().doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const data = doc.data() as Order;
    const raw: Order = { ...data, id: doc.id };
    const ui = mapOrderToUI(raw);

    return NextResponse.json({ success: true, ui, raw });
  } catch (error) {
    console.error("Error fetching order for edit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
