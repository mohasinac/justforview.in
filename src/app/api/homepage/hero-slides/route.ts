import { NextRequest, NextResponse } from "next/server";
import { getFirestoreAdmin } from "@/app/api/lib/firebase/admin";
import { COLLECTIONS } from "@/constants/database";
import { mapHeroSlideToUI } from "@/schemas/mappers/hero-slide.mapper";
import type { HeroSlide } from "@/schemas/resources/hero-slide.schema";

// GET /api/homepage/hero-slides - Public endpoint for active hero slides
export async function GET(req: NextRequest) {
  try {
    const db = getFirestoreAdmin();

    // Get all active hero slides ordered by position
    const snapshot = await db
      .collection(COLLECTIONS.HERO_SLIDES)
      .where("is_active", "==", true)
      .orderBy("position", "asc")
      .get();

    const slides = snapshot.docs.map((doc) =>
      mapHeroSlideToUI({ id: doc.id, ...doc.data() } as HeroSlide & {
        id: string;
      })
    );

    return NextResponse.json({ slides });
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    // Return empty array on error to prevent breaking the frontend
    return NextResponse.json({ slides: [] });
  }
}
