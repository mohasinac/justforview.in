import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../lib/session";
import { getFirestoreAdmin } from "../../lib/firebase/admin";
import { mapAddressToUI } from "@/schemas/mappers/address.mapper";
import type { Address } from "@/schemas/resources/address.schema";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getFirestoreAdmin();
    const addressesSnapshot = await db
      .collection("addresses")
      .where("userId", "==", user.id)
      .orderBy("isDefault", "desc")
      .orderBy("createdAt", "desc")
      .get();

    const addresses = addressesSnapshot.docs.map((doc) => {
      const data = doc.data() as Address;
      return mapAddressToUI({ ...data, id: doc.id });
    });

    return NextResponse.json({ addresses });
  } catch (error: any) {
    console.error("Get addresses error:", error);
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const {
      recipientName,
      recipientPhone,
      line1,
      line2,
      city,
      state,
      pincode,
      country,
      landmark,
      label,
      isDefault,
    } = data;

    // Validation
    if (
      !recipientName ||
      !recipientPhone ||
      !line1 ||
      !city ||
      !state ||
      !pincode ||
      !country
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();

    // If this is set as default, unset other defaults
    if (isDefault) {
      const defaultAddresses = await db
        .collection("addresses")
        .where("userId", "==", user.id)
        .where("isDefault", "==", true)
        .get();

      const batch = db.batch();
      defaultAddresses.docs.forEach((doc) => {
        batch.update(doc.ref, { isDefault: false });
      });
      await batch.commit();
    }

    // Create new address
    const addressRef = db.collection("addresses").doc();
    const newAddress = {
      id: addressRef.id,
      userId: user.id,
      recipientName,
      recipientPhone,
      line1,
      line2: line2 || null,
      city,
      state,
      pincode,
      country,
      landmark: landmark || null,
      label: label || "home",
      isDefault: isDefault || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addressRef.set(newAddress);

    return NextResponse.json(
      {
        address: mapAddressToUI(
          newAddress as unknown as Address & { id: string }
        ),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create address error:", error);
    return NextResponse.json(
      { error: "Failed to create address" },
      { status: 500 }
    );
  }
}
