/**
 * Return Mapper
 *
 * Transforms Return data between backend (Firestore) and frontend (UI) formats.
 */

import type { Return, ReturnItem } from "@/schemas/resources/return.schema";
import type {
  ReturnUI,
  ReturnCardUI,
  ReturnStatusDisplay,
  ReturnReasonDisplay,
  ReturnMethodDisplay,
  ReturnItemUI,
  ReturnAmountDisplay,
  ReturnTimelineEvent,
} from "@/schemas/ui/return.ui";

/**
 * Format price
 */
function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

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
 * Get time ago
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(date);
}

/**
 * Get return status display
 */
function getReturnStatusDisplay(status: Return["status"]): ReturnStatusDisplay {
  const statusMap: Record<
    Return["status"],
    {
      label: string;
      color: string;
      className: string;
      icon: string;
      description: string;
    }
  > = {
    requested: {
      label: "Requested",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "schedule",
      description: "Return request submitted",
    },
    approved: {
      label: "Approved",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "check_circle",
      description: "Return approved by seller",
    },
    rejected: {
      label: "Rejected",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "cancel",
      description: "Return request rejected",
    },
    "pickup-scheduled": {
      label: "Pickup Scheduled",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "event",
      description: "Pickup date scheduled",
    },
    "picked-up": {
      label: "Picked Up",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
      icon: "local_shipping",
      description: "Item picked up",
    },
    received: {
      label: "Received",
      color: "#06B6D4",
      className: "bg-cyan-100 text-cyan-800",
      icon: "inventory_2",
      description: "Item received by seller",
    },
    inspecting: {
      label: "Inspecting",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "search",
      description: "Item being inspected",
    },
    completed: {
      label: "Completed",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "done_all",
      description: "Return completed",
    },
    refunded: {
      label: "Refunded",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "payment",
      description: "Refund processed",
    },
    cancelled: {
      label: "Cancelled",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "close",
      description: "Return cancelled",
    },
  };

  return {
    value: status,
    ...statusMap[status],
  };
}

/**
 * Get return reason display
 */
function getReturnReasonDisplay(
  reason: Return["primaryReason"]
): ReturnReasonDisplay {
  const reasonMap: Record<
    Return["primaryReason"],
    { label: string; icon: string }
  > = {
    defective: { label: "Defective Product", icon: "report_problem" },
    damaged: { label: "Damaged in Transit", icon: "broken_image" },
    "wrong-item": { label: "Wrong Item Received", icon: "swap_horiz" },
    "not-as-described": { label: "Not as Described", icon: "description" },
    "size-issue": { label: "Size Issue", icon: "straighten" },
    "quality-issue": { label: "Quality Issue", icon: "star_half" },
    "changed-mind": { label: "Changed Mind", icon: "psychology" },
    other: { label: "Other Reason", icon: "help" },
  };

  return {
    value: reason,
    ...reasonMap[reason],
  };
}

/**
 * Get return method display
 */
function getReturnMethodDisplay(
  method: Return["returnMethod"]
): ReturnMethodDisplay {
  const methodMap: Record<
    Return["returnMethod"],
    { label: string; icon: string }
  > = {
    pickup: { label: "Pickup from Address", icon: "home" },
    "drop-off": { label: "Drop-off at Location", icon: "store" },
    courier: { label: "Courier Service", icon: "local_shipping" },
  };

  return {
    value: method,
    ...methodMap[method],
  };
}

/**
 * Map return item to UI
 */
function mapReturnItemToUI(item: ReturnItem): ReturnItemUI {
  return {
    orderItemId: item.orderItemId,
    productId: item.productId,
    productName: item.productName,
    quantity: item.quantity,
    price: item.price,
    priceFormatted: formatPrice(item.price),
    totalFormatted: formatPrice(item.price * item.quantity),
    reason: getReturnReasonDisplay(item.reason),
    condition: item.condition,
  };
}

/**
 * Get amount display
 */
function getAmountDisplay(returnData: Return): ReturnAmountDisplay {
  return {
    itemsTotal: returnData.itemsTotal,
    itemsTotalFormatted: formatPrice(returnData.itemsTotal),
    shippingRefund: returnData.shippingRefund,
    shippingRefundFormatted: formatPrice(returnData.shippingRefund),
    restockingFee: returnData.restockingFee,
    restockingFeeFormatted: formatPrice(returnData.restockingFee),
    refundAmount: returnData.refundAmount,
    refundAmountFormatted: formatPrice(returnData.refundAmount),
  };
}

/**
 * Generate timeline
 */
function generateTimeline(returnData: Return): ReturnTimelineEvent[] {
  const timeline: ReturnTimelineEvent[] = [
    {
      status: "requested",
      label: "Return Requested",
      date: returnData.createdAt,
      dateFormatted: formatDate(returnData.createdAt),
      completed: true,
      current: returnData.status === "requested",
    },
  ];

  if (returnData.approvedAt) {
    timeline.push({
      status: "approved",
      label: "Approved",
      date: returnData.approvedAt,
      dateFormatted: formatDate(returnData.approvedAt),
      completed: true,
      current: returnData.status === "approved",
    });
  }

  if (returnData.pickedUpAt) {
    timeline.push({
      status: "picked-up",
      label: "Picked Up",
      date: returnData.pickedUpAt,
      dateFormatted: formatDate(returnData.pickedUpAt),
      completed: true,
      current: returnData.status === "picked-up",
    });
  }

  if (returnData.receivedAt) {
    timeline.push({
      status: "received",
      label: "Received",
      date: returnData.receivedAt,
      dateFormatted: formatDate(returnData.receivedAt),
      completed: true,
      current: returnData.status === "received",
    });
  }

  if (returnData.refundedAt) {
    timeline.push({
      status: "refunded",
      label: "Refunded",
      date: returnData.refundedAt,
      dateFormatted: formatDate(returnData.refundedAt),
      completed: true,
      current: returnData.status === "refunded",
    });
  }

  return timeline;
}

/**
 * Map Return to ReturnUI
 */
export function mapReturnToUI(returnData: Return): ReturnUI {
  return {
    id: returnData.id,
    returnNumber: returnData.returnNumber,
    orderId: returnData.orderId,
    userId: returnData.userId,
    shopId: returnData.shopId,
    items: returnData.items.map(mapReturnItemToUI),
    itemCount: returnData.items.length,
    primaryReason: getReturnReasonDisplay(returnData.primaryReason),
    reasonDetails: returnData.reasonDetails,
    attachments: returnData.attachments,
    hasAttachments:
      !!returnData.attachments && returnData.attachments.length > 0,
    status: getReturnStatusDisplay(returnData.status),
    timeline: generateTimeline(returnData),
    returnMethod: getReturnMethodDisplay(returnData.returnMethod),
    pickupAddress: returnData.pickupAddress,
    trackingNumber: returnData.trackingNumber,
    hasTracking: !!returnData.trackingNumber,
    amounts: getAmountDisplay(returnData),
    approvedAt: returnData.approvedAt,
    approvedAtFormatted: returnData.approvedAt
      ? formatDate(returnData.approvedAt)
      : undefined,
    approvedBy: returnData.approvedBy,
    isApproved: !!returnData.approvedAt,
    rejectedAt: returnData.rejectedAt,
    rejectedAtFormatted: returnData.rejectedAt
      ? formatDate(returnData.rejectedAt)
      : undefined,
    rejectionReason: returnData.rejectionReason,
    isRejected: !!returnData.rejectedAt,
    pickupScheduledDate: returnData.pickupScheduledDate,
    pickupScheduledDateFormatted: returnData.pickupScheduledDate
      ? formatDate(returnData.pickupScheduledDate)
      : undefined,
    pickedUpAt: returnData.pickedUpAt,
    pickedUpAtFormatted: returnData.pickedUpAt
      ? formatDate(returnData.pickedUpAt)
      : undefined,
    receivedAt: returnData.receivedAt,
    receivedAtFormatted: returnData.receivedAt
      ? formatDate(returnData.receivedAt)
      : undefined,
    inspectionNotes: returnData.inspectionNotes,
    inspectionPhotos: returnData.inspectionPhotos,
    completedAt: returnData.completedAt,
    completedAtFormatted: returnData.completedAt
      ? formatDate(returnData.completedAt)
      : undefined,
    refundedAt: returnData.refundedAt,
    refundedAtFormatted: returnData.refundedAt
      ? formatDate(returnData.refundedAt)
      : undefined,
    refundMethod: returnData.refundMethod,
    refundTransactionId: returnData.refundTransactionId,
    isCompleted: returnData.status === "completed",
    isRefunded: returnData.status === "refunded",
    notes: returnData.notes,
    customerNotes: returnData.customerNotes,
    sellerNotes: returnData.sellerNotes,
    url: `/user/returns/${returnData.id}`,
    orderUrl: `/user/orders/${returnData.orderId}`,
    createdAt: returnData.createdAt,
    createdAtFormatted: formatDate(returnData.createdAt),
    updatedAt: returnData.updatedAt,
    age: getTimeAgo(returnData.createdAt),
  };
}

/**
 * Map Return to ReturnCardUI
 */
export function mapReturnToCard(returnData: Return): ReturnCardUI {
  return {
    id: returnData.id,
    returnNumber: returnData.returnNumber,
    orderId: returnData.orderId,
    status: getReturnStatusDisplay(returnData.status),
    itemCount: returnData.items.length,
    refundAmount: returnData.refundAmount,
    refundAmountFormatted: formatPrice(returnData.refundAmount),
    createdAt: returnData.createdAt,
    url: `/user/returns/${returnData.id}`,
  };
}
