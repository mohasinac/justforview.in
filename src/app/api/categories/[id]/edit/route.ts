import { NextRequest, NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapCategoryToUI } from "@/schemas/mappers/category.mapper";
import type { Category } from "@/schemas/resources/category.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = await Collections.categories().doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const data = doc.data() as Category;
    const raw: Category = { ...data, id: doc.id };
    const ui = mapCategoryToUI(raw);

    return NextResponse.json({ success: true, ui, raw });
  } catch (error) {
    console.error("Error fetching category for edit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
