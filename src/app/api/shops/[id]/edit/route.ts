import { NextRequest, NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapShopToUI } from "@/schemas/mappers/shop.mapper";
import type { Shop } from "@/schemas/resources/shop.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = await Collections.shops().doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Shop not found" },
        { status: 404 }
      );
    }

    const data = doc.data() as Shop;
    const raw: Shop = { ...data, id: doc.id };
    const ui = mapShopToUI(raw);

    return NextResponse.json({ success: true, ui, raw });
  } catch (error) {
    console.error("Error fetching shop for edit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch shop" },
      { status: 500 }
    );
  }
}
