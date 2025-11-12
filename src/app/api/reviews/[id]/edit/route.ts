import { NextRequest, NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapReviewToUI } from "@/schemas/mappers/review.mapper";
import type { Review } from "@/schemas/resources/review.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = await Collections.reviews().doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Review not found" },
        { status: 404 }
      );
    }

    const data = doc.data() as Review;
    const raw: Review = { ...data, id: doc.id };
    const ui = mapReviewToUI(raw);

    return NextResponse.json({ success: true, ui, raw });
  } catch (error) {
    console.error("Error fetching review for edit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}
