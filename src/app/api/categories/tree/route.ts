import { NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapCategoryToUI } from "@/schemas/mappers/category.mapper";
import type { Category } from "@/schemas/resources/category.schema";

// GET /api/categories/tree - Full category tree (public)
export async function GET() {
  try {
    const snapshot = await Collections.categories().limit(1000).get();
    const nodes = snapshot.docs.map((d) =>
      mapCategoryToUI({ ...d.data(), id: d.id } as Category)
    );
    const byId: Record<string, any> = {};
    nodes.forEach((n) => {
      byId[n.id] = { ...n, children: [] };
    });
    const roots: any[] = [];
    nodes.forEach((n) => {
      if (n.hierarchy.parentId) {
        const parent = byId[n.hierarchy.parentId];
        if (parent) parent.children.push(byId[n.id]);
        else roots.push(byId[n.id]);
      } else {
        roots.push(byId[n.id]);
      }
    });
    return NextResponse.json({ success: true, data: roots });
  } catch (error) {
    console.error("Error building category tree:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load category tree" },
      { status: 500 }
    );
  }
}
