import { NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapAuctionToUI } from "@/schemas/mappers/auction.mapper";
import type { Auction } from "@/schemas/resources/auction.schema";

// GET /api/auctions/live
export async function GET() {
  try {
    const now = new Date().toISOString();
    const q = await Collections.auctions()
      .where("status", "==", "active")
      .where("end_time", ">=", now)
      .orderBy("end_time", "asc")
      .limit(50);
    const snap = await (q as any).get();
    const data = snap.docs.map((d: any) =>
      mapAuctionToUI({ id: d.id, ...d.data() } as Auction)
    );
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Live auctions error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load live auctions" },
      { status: 500 }
    );
  }
}
