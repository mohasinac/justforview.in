import { NextRequest, NextResponse } from "next/server";
import { Collections } from "@/app/api/lib/firebase/collections";
import { mapUserToUI } from "@/schemas/mappers/user.mapper";
import type { User } from "@/schemas/resources/user.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const doc = await Collections.users().doc(userId).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const data = doc.data() as User;
    const raw: User = { ...data, id: doc.id };
    const ui = mapUserToUI(raw);

    return NextResponse.json({ success: true, ui, raw });
  } catch (error) {
    console.error("Error fetching user for edit:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
