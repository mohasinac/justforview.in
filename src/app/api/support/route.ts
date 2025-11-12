import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/api/lib/session";
import { getFirestoreAdmin } from "@/app/api/lib/firebase/admin";
import { mapSupportTicketToUI } from "@/schemas/mappers/support.mapper";
import type { SupportTicket } from "@/schemas/resources/support.schema";

/**
 * POST /api/support
 * Create a new support ticket
 */
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request
    const data = await request.json();
    const {
      subject,
      category,
      priority,
      description,
      attachments,
      shopId,
      orderId,
    } = data;

    // Validation
    if (!subject || subject.trim().length < 3) {
      return NextResponse.json(
        { error: "Subject must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Description must be at least 10 characters" },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    const validCategories = [
      "order-issue",
      "return-refund",
      "product-question",
      "account",
      "payment",
      "other",
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const validPriorities = ["low", "medium", "high", "urgent"];
    const ticketPriority =
      priority && validPriorities.includes(priority) ? priority : "medium";

    // Database operation
    const db = getFirestoreAdmin();
    const ticketsRef = db.collection("support_tickets");

    const now = new Date();
    const ticket: Partial<SupportTicket> = {
      userId: user.id,
      ticketNumber: `TICKET-${Date.now()}`,
      subject: subject.trim(),
      category,
      priority: ticketPriority,
      description: description.trim(),
      attachments: attachments || [],
      orderId: orderId || undefined,
      productId: undefined,
      status: "open",
      assignedTo: undefined,
      createdAt: now,
      updatedAt: now,
      resolvedAt: undefined,
    };

    const docRef = await ticketsRef.add(ticket);

    // Log ticket creation
    console.log("Support ticket created:", {
      ticketId: docRef.id,
      userId: user.id,
      subject,
      category,
      priority: ticketPriority,
    });

    const createdTicket: SupportTicket = {
      ...(ticket as SupportTicket),
      id: docRef.id,
    };
    return NextResponse.json({
      success: true,
      data: mapSupportTicketToUI(createdTicket),
    });
  } catch (error: any) {
    console.error("Error creating support ticket:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
