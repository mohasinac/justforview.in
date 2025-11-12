/**
 * Payment Mapper
 *
 * Transforms Payment data between backend (Firestore) and frontend (UI) formats.
 */

import type { Payment, Refund } from "@/schemas/resources/payment.schema";
import type {
  PaymentUI,
  PaymentCardUI,
  PaymentStatusDisplay,
  PaymentMethodDisplay,
  PaymentGatewayDisplay,
  RefundUI,
  PaymentAmountBreakdown,
} from "@/schemas/ui/payment.ui";

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
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Get time ago
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return formatDate(date);
}

/**
 * Get payment status display
 */
function getPaymentStatusDisplay(
  status: Payment["status"]
): PaymentStatusDisplay {
  const statusMap: Record<
    Payment["status"],
    {
      label: string;
      color: string;
      className: string;
      icon: string;
      description: string;
    }
  > = {
    pending: {
      label: "Pending",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
      icon: "schedule",
      description: "Payment initiated",
    },
    processing: {
      label: "Processing",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "sync",
      description: "Payment being processed",
    },
    completed: {
      label: "Completed",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "check_circle",
      description: "Payment successful",
    },
    failed: {
      label: "Failed",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "error",
      description: "Payment failed",
    },
    cancelled: {
      label: "Cancelled",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "cancel",
      description: "Payment cancelled",
    },
    refunded: {
      label: "Refunded",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "currency_rupee",
      description: "Full refund processed",
    },
    "partially-refunded": {
      label: "Partially Refunded",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "currency_rupee",
      description: "Partial refund processed",
    },
  };

  return {
    value: status,
    ...statusMap[status],
  };
}

/**
 * Get payment method display
 */
function getPaymentMethodDisplay(
  method: Payment["method"]
): PaymentMethodDisplay {
  const methodMap: Record<
    Payment["method"],
    { label: string; icon: string; description: string }
  > = {
    card: {
      label: "Card",
      icon: "credit_card",
      description: "Debit/Credit Card",
    },
    upi: { label: "UPI", icon: "phone", description: "UPI Payment" },
    netbanking: {
      label: "Net Banking",
      icon: "account_balance",
      description: "Net Banking",
    },
    wallet: {
      label: "Wallet",
      icon: "account_balance_wallet",
      description: "Mobile Wallet",
    },
    cod: {
      label: "Cash on Delivery",
      icon: "local_atm",
      description: "Pay on delivery",
    },
    emi: {
      label: "EMI",
      icon: "credit_score",
      description: "Easy installments",
    },
  };

  return {
    value: method,
    ...methodMap[method],
  };
}

/**
 * Get payment gateway display
 */
function getPaymentGatewayDisplay(
  gateway: Payment["gateway"]
): PaymentGatewayDisplay {
  const gatewayMap: Record<
    Payment["gateway"],
    { label: string; logo?: string }
  > = {
    razorpay: { label: "Razorpay", logo: "/gateways/razorpay.svg" },
    stripe: { label: "Stripe", logo: "/gateways/stripe.svg" },
    paytm: { label: "Paytm", logo: "/gateways/paytm.svg" },
    phonepe: { label: "PhonePe", logo: "/gateways/phonepe.svg" },
    manual: { label: "Manual", logo: undefined },
  };

  return {
    value: gateway,
    ...gatewayMap[gateway],
  };
}

/**
 * Map refund to UI
 */
function mapRefundToUI(refund: Refund): RefundUI {
  return {
    id: refund.id,
    amount: refund.amount,
    amountFormatted: formatPrice(refund.amount),
    reason: refund.reason,
    status: refund.status,
    statusLabel:
      refund.status === "processed"
        ? "Processed"
        : refund.status === "pending"
        ? "Pending"
        : "Failed",
    gatewayRefundId: refund.gatewayRefundId,
    processedAt: refund.processedAt,
    processedAtFormatted: refund.processedAt
      ? formatDate(refund.processedAt)
      : undefined,
    createdAt: refund.createdAt,
    createdAtFormatted: formatDate(refund.createdAt),
  };
}

/**
 * Get amount breakdown
 */
function getAmountBreakdown(payment: Payment): PaymentAmountBreakdown {
  const subtotal = payment.amount - payment.taxAmount - payment.shippingAmount;

  return {
    subtotal,
    subtotalFormatted: formatPrice(subtotal),
    taxAmount: payment.taxAmount,
    taxAmountFormatted: formatPrice(payment.taxAmount),
    shippingAmount: payment.shippingAmount,
    shippingAmountFormatted: formatPrice(payment.shippingAmount),
    total: payment.amount,
    totalFormatted: formatPrice(payment.amount),
    processingFee: payment.processingFee,
    processingFeeFormatted: formatPrice(payment.processingFee),
    netAmount: payment.netAmount,
    netAmountFormatted: formatPrice(payment.netAmount),
    refundedAmount: payment.refundedAmount,
    refundedAmountFormatted: formatPrice(payment.refundedAmount),
  };
}

/**
 * Get payment details string
 */
function getPaymentDetails(payment: Payment): string {
  if (payment.cardLast4 && payment.cardBrand) {
    return `${payment.cardBrand} •••• ${payment.cardLast4}`;
  }
  if (payment.upiId) {
    return payment.upiId;
  }
  if (payment.walletType) {
    return payment.walletType;
  }
  if (payment.bankName) {
    return payment.bankName;
  }
  return "N/A";
}

/**
 * Map Payment to PaymentUI
 */
export function mapPaymentToUI(payment: Payment): PaymentUI {
  return {
    id: payment.id,
    paymentNumber: payment.paymentNumber,
    orderId: payment.orderId,
    userId: payment.userId,
    shopId: payment.shopId,
    amounts: getAmountBreakdown(payment),
    currency: payment.currency,
    method: getPaymentMethodDisplay(payment.method),
    gateway: getPaymentGatewayDisplay(payment.gateway),
    status: getPaymentStatusDisplay(payment.status),
    gatewayPaymentId: payment.gatewayPaymentId,
    gatewayOrderId: payment.gatewayOrderId,
    hasGatewayData: !!(payment.gatewayPaymentId || payment.gatewayOrderId),
    cardLast4: payment.cardLast4,
    cardBrand: payment.cardBrand,
    cardDisplay:
      payment.cardLast4 && payment.cardBrand
        ? `${payment.cardBrand} •••• ${payment.cardLast4}`
        : undefined,
    upiId: payment.upiId,
    walletType: payment.walletType,
    bankName: payment.bankName,
    paymentDetails: getPaymentDetails(payment),
    refunds: payment.refunds?.map(mapRefundToUI),
    hasRefunds: !!(payment.refunds && payment.refunds.length > 0),
    refundCount: payment.refunds?.length || 0,
    settlementStatus: payment.settlementStatus,
    settlementStatusLabel:
      payment.settlementStatus === "settled"
        ? "Settled"
        : payment.settlementStatus === "processing"
        ? "Processing"
        : "Pending",
    settledAt: payment.settledAt,
    settledAtFormatted: payment.settledAt
      ? formatDate(payment.settledAt)
      : undefined,
    settlementAmount: payment.settlementAmount,
    settlementAmountFormatted: payment.settlementAmount
      ? formatPrice(payment.settlementAmount)
      : undefined,
    isSettled: payment.settlementStatus === "settled",
    failureReason: payment.failureReason,
    failureCode: payment.failureCode,
    hasFailed: payment.status === "failed",
    isPending: payment.status === "pending",
    isProcessing: payment.status === "processing",
    isCompleted: payment.status === "completed",
    isFailed: payment.status === "failed",
    isCancelled: payment.status === "cancelled",
    isRefunded:
      payment.status === "refunded" || payment.status === "partially-refunded",
    initiatedAt: payment.initiatedAt,
    initiatedAtFormatted: formatDate(payment.initiatedAt),
    completedAt: payment.completedAt,
    completedAtFormatted: payment.completedAt
      ? formatDate(payment.completedAt)
      : undefined,
    failedAt: payment.failedAt,
    failedAtFormatted: payment.failedAt
      ? formatDate(payment.failedAt)
      : undefined,
    cancelledAt: payment.cancelledAt,
    cancelledAtFormatted: payment.cancelledAt
      ? formatDate(payment.cancelledAt)
      : undefined,
    ipAddress: payment.ipAddress,
    userAgent: payment.userAgent,
    notes: payment.notes,
    url: `/user/payments/${payment.id}`,
    orderUrl: `/user/orders/${payment.orderId}`,
    createdAt: payment.createdAt,
    createdAtFormatted: formatDate(payment.createdAt),
    updatedAt: payment.updatedAt,
    age: getTimeAgo(payment.initiatedAt),
  };
}

/**
 * Map Payment to PaymentCardUI
 */
export function mapPaymentToCard(payment: Payment): PaymentCardUI {
  return {
    id: payment.id,
    paymentNumber: payment.paymentNumber,
    amount: payment.amount,
    amountFormatted: formatPrice(payment.amount),
    method: getPaymentMethodDisplay(payment.method),
    status: getPaymentStatusDisplay(payment.status),
    createdAt: payment.createdAt,
    url: `/user/payments/${payment.id}`,
  };
}
