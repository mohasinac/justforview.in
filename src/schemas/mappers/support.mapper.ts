/**
 * Support Ticket Mapper
 *
 * Transforms Support Ticket data between backend (Firestore) and frontend (UI) formats.
 */

import type {
  SupportTicket,
  TicketMessage,
} from "@/schemas/resources/support.schema";
import type {
  SupportTicketUI,
  SupportTicketCardUI,
  SupportTicketListItemUI,
  StatusDisplay,
  PriorityDisplay,
  CategoryDisplay,
  TicketMessageUI,
  TicketBadge,
} from "@/schemas/ui/support.ui";

/**
 * Format date
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Get time ago string
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

/**
 * Format duration in hours
 */
function formatDuration(hours?: number): string | undefined {
  if (!hours) return undefined;
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  if (hours < 24) return `${Math.round(hours)}h`;
  return `${Math.round(hours / 24)}d`;
}

/**
 * Get status display
 */
function getStatusDisplay(status: SupportTicket["status"]): StatusDisplay {
  const statusMap: Record<
    SupportTicket["status"],
    { label: string; color: string; className: string; icon: string }
  > = {
    open: {
      label: "Open",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "circle",
    },
    "in-progress": {
      label: "In Progress",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
      icon: "pending",
    },
    "waiting-customer": {
      label: "Waiting for Customer",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "schedule",
    },
    resolved: {
      label: "Resolved",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "check_circle",
    },
    closed: {
      label: "Closed",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "cancel",
    },
  };

  return {
    value: status,
    ...statusMap[status],
  };
}

/**
 * Get priority display
 */
function getPriorityDisplay(
  priority: SupportTicket["priority"]
): PriorityDisplay {
  const priorityMap: Record<
    SupportTicket["priority"],
    { label: string; color: string; className: string; icon: string }
  > = {
    low: {
      label: "Low",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "arrow_downward",
    },
    medium: {
      label: "Medium",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "remove",
    },
    high: {
      label: "High",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
      icon: "arrow_upward",
    },
    urgent: {
      label: "Urgent",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "priority_high",
    },
  };

  return {
    value: priority,
    ...priorityMap[priority],
  };
}

/**
 * Get category display
 */
function getCategoryDisplay(
  category: SupportTicket["category"]
): CategoryDisplay {
  const categoryMap: Record<
    SupportTicket["category"],
    { label: string; icon: string }
  > = {
    account: { label: "Account", icon: "person" },
    order: { label: "Order", icon: "shopping_cart" },
    payment: { label: "Payment", icon: "payment" },
    product: { label: "Product", icon: "inventory" },
    shipping: { label: "Shipping", icon: "local_shipping" },
    return: { label: "Return", icon: "keyboard_return" },
    technical: { label: "Technical", icon: "build" },
    other: { label: "Other", icon: "help" },
  };

  return {
    value: category,
    ...categoryMap[category],
  };
}

/**
 * Map message to UI
 */
function mapMessageToUI(message: TicketMessage): TicketMessageUI {
  return {
    id: message.id,
    userId: message.userId,
    userType: message.userType,
    message: message.message,
    attachments: message.attachments,
    isInternal: message.isInternal,
    createdAt: message.createdAt,
    createdAtFormatted: formatDate(message.createdAt),
    timeAgo: getTimeAgo(message.createdAt),
  };
}

/**
 * Generate ticket badges
 */
function generateBadges(ticket: SupportTicket): TicketBadge[] {
  const badges: TicketBadge[] = [];

  if (ticket.priority === "urgent") {
    badges.push({
      text: "Urgent",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "priority_high",
    });
  }

  if (ticket.assignedTo) {
    badges.push({
      text: "Assigned",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "person",
    });
  }

  if (ticket.attachments && ticket.attachments.length > 0) {
    badges.push({
      text: `${ticket.attachments.length} attachment${
        ticket.attachments.length > 1 ? "s" : ""
      }`,
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "attach_file",
    });
  }

  return badges;
}

/**
 * Map Support Ticket to SupportTicketUI
 */
export function mapSupportTicketToUI(ticket: SupportTicket): SupportTicketUI {
  const messages = ticket.messages?.map(mapMessageToUI);
  const lastMessage = messages?.[messages.length - 1];

  return {
    id: ticket.id,
    ticketNumber: ticket.ticketNumber,
    userId: ticket.userId,
    subject: ticket.subject,
    description: ticket.description,
    category: getCategoryDisplay(ticket.category),
    status: getStatusDisplay(ticket.status),
    priority: getPriorityDisplay(ticket.priority),
    orderId: ticket.orderId,
    productId: ticket.productId,
    attachments: ticket.attachments,
    hasAttachments: !!ticket.attachments && ticket.attachments.length > 0,
    messages,
    messageCount: messages?.length || 0,
    lastMessage,
    assignedTo: ticket.assignedTo,
    assignedAt: ticket.assignedAt,
    assignedAtFormatted: ticket.assignedAt
      ? formatDate(ticket.assignedAt)
      : undefined,
    isAssigned: !!ticket.assignedTo,
    resolvedAt: ticket.resolvedAt,
    resolvedAtFormatted: ticket.resolvedAt
      ? formatDate(ticket.resolvedAt)
      : undefined,
    resolutionNote: ticket.resolutionNote,
    closedAt: ticket.closedAt,
    closedAtFormatted: ticket.closedAt
      ? formatDate(ticket.closedAt)
      : undefined,
    isResolved: !!ticket.resolvedAt,
    isClosed: ticket.status === "closed",
    responseTime: ticket.responseTime,
    responseTimeFormatted: formatDuration(ticket.responseTime),
    resolutionTime: ticket.resolutionTime,
    resolutionTimeFormatted: formatDuration(ticket.resolutionTime),
    age: getTimeAgo(ticket.createdAt),
    badges: generateBadges(ticket),
    url: `/support/tickets/${ticket.id}`,
    createdAt: ticket.createdAt,
    createdAtFormatted: formatDate(ticket.createdAt),
    updatedAt: ticket.updatedAt,
    lastMessageAt: ticket.lastMessageAt,
    lastMessageAtFormatted: ticket.lastMessageAt
      ? formatDate(ticket.lastMessageAt)
      : undefined,
  };
}

/**
 * Map Support Ticket to SupportTicketCardUI
 */
export function mapSupportTicketToCard(
  ticket: SupportTicket
): SupportTicketCardUI {
  return {
    id: ticket.id,
    ticketNumber: ticket.ticketNumber,
    subject: ticket.subject,
    status: getStatusDisplay(ticket.status),
    priority: getPriorityDisplay(ticket.priority),
    category: getCategoryDisplay(ticket.category),
    messageCount: ticket.messages?.length || 0,
    lastMessageAt: ticket.lastMessageAt,
    badges: generateBadges(ticket),
    url: `/support/tickets/${ticket.id}`,
  };
}

/**
 * Map Support Ticket to SupportTicketListItemUI
 */
export function mapSupportTicketToListItem(
  ticket: SupportTicket
): SupportTicketListItemUI {
  return {
    id: ticket.id,
    ticketNumber: ticket.ticketNumber,
    subject: ticket.subject,
    status: getStatusDisplay(ticket.status),
    priority: getPriorityDisplay(ticket.priority),
    category: ticket.category,
    createdAt: ticket.createdAt,
  };
}
