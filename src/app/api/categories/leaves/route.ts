import { NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapCategoryToUI } from "@/schemas/mappers/category.mapper";
import type { Category } from "@/schemas/resources/category.schema";

// GET /api/categories/leaves - Leaf categories (no children)
export async function GET() {
  try {
    const snapshot = await Collections.categories().limit(1000).get();
    const all = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as any));
    const parentIds = new Set<string>();
    all.forEach((c) => {
      if (c.parent_id) parentIds.add(c.parent_id);
    });
    const leaves = all.filter((c) => !parentIds.has(c.id));
    const result = leaves.map((c) => mapCategoryToUI(c as Category));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching leaf categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leaf categories" },
      { status: 500 }
    );
  }
}
