import { NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapCategoryToUI } from "@/schemas/mappers/category.mapper";
import type { Category } from "@/schemas/resources/category.schema";

// GET /api/categories/homepage
export async function GET() {
  try {
    // Use composite index: show_on_homepage + sort_order
    const snap = await Collections.categories()
      .where("show_on_homepage", "==", true)
      .orderBy("sort_order", "asc")
      .limit(100)
      .get();

    const data = snap.docs.map((d) =>
      mapCategoryToUI({ ...d.data(), id: d.id } as Category)
    );

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Homepage categories error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load homepage categories" },
      { status: 500 }
    );
  }
}
