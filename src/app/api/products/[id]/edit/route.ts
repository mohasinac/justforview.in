import { NextRequest, NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapProductToUI } from "@/schemas/mappers/product.mapper";
import type { Product } from "@/schemas/resources/product.schema";

/**
 * GET /api/products/[id]/edit
 *
 * Returns both UI format (for display) and raw backend format (for form state)
 * Used by edit forms that need to display related data AND manage form inputs
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const doc = await Collections.products().doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const data = doc.data() as Product;
    const raw: Product = { ...data, id: doc.id };
    const ui = mapProductToUI(raw);

    return NextResponse.json({
      success: true,
      ui,
      raw,
    });
  } catch (error) {
    console.error("Error fetching product for edit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
