import { NextRequest, NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapAuctionToUI } from "@/schemas/mappers/auction.mapper";
import type { Auction } from "@/schemas/resources/auction.schema";

/**
 * GET /api/auctions/[id]/edit
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const doc = await Collections.auctions().doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "Auction not found" },
        { status: 404 }
      );
    }

    const data = doc.data() as Auction;
    const raw: Auction = { ...data, id: doc.id };
    const ui = mapAuctionToUI(raw);

    return NextResponse.json({
      success: true,
      ui,
      raw,
    });
  } catch (error) {
    console.error("Error fetching auction for edit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch auction" },
      { status: 500 }
    );
  }
}
