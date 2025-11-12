import { NextRequest, NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapCategoryToUI } from "@/schemas/mappers/category.mapper";
import type { Category } from "@/schemas/resources/category.schema";

// GET /api/categories/search?q=term
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").toLowerCase().trim();
    if (!q) return NextResponse.json({ success: true, data: [] });

    // naive contains search on name/description
    const snap = await Collections.categories().limit(500).get();
    const results = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as any))
      .filter(
        (c) =>
          (c.name || "").toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q)
      )
      .slice(0, 50)
      .map((c) => mapCategoryToUI(c as Category));

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error("Category search error:", error);
    return NextResponse.json(
      { success: false, error: "Search failed" },
      { status: 500 }
    );
  }
}
