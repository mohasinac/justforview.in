/**
 * Payout Mapper
 *
 * Transforms Payout data between backend (Firestore) and frontend (UI) formats.
 */

import type { Payout } from "@/schemas/resources/payout.schema";
import type {
  PayoutUI,
  PayoutCardUI,
  PayoutStatusDisplay,
  PayoutMethodDisplay,
  PayoutAmountBreakdown,
} from "@/schemas/ui/payout.ui";

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
 * Get payout status display
 */
function getPayoutStatusDisplay(status: Payout["status"]): PayoutStatusDisplay {
  const statusMap: Record<
    Payout["status"],
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
      description: "Awaiting processing",
    },
    processing: {
      label: "Processing",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "sync",
      description: "Payout in progress",
    },
    completed: {
      label: "Completed",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "check_circle",
      description: "Payout successful",
    },
    failed: {
      label: "Failed",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "error",
      description: "Payout failed",
    },
    cancelled: {
      label: "Cancelled",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "cancel",
      description: "Payout cancelled",
    },
    "on-hold": {
      label: "On Hold",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "pause_circle",
      description: "Payout on hold",
    },
  };

  return {
    value: status,
    ...statusMap[status],
  };
}

/**
 * Get payout method display
 */
function getPayoutMethodDisplay(method: Payout["method"]): PayoutMethodDisplay {
  const methodMap: Record<Payout["method"], { label: string; icon: string }> = {
    "bank-transfer": { label: "Bank Transfer", icon: "account_balance" },
    upi: { label: "UPI", icon: "phone" },
    wallet: { label: "Wallet", icon: "account_balance_wallet" },
    cheque: { label: "Cheque", icon: "receipt" },
  };

  return {
    value: method,
    ...methodMap[method],
  };
}

/**
 * Get amount breakdown
 */
function getAmountBreakdown(payout: Payout): PayoutAmountBreakdown {
  const commissionRate =
    payout.salesAmount > 0
      ? ((payout.commissionAmount / payout.salesAmount) * 100).toFixed(1)
      : "0";

  return {
    salesAmount: payout.salesAmount,
    salesAmountFormatted: formatPrice(payout.salesAmount),
    commissionAmount: payout.commissionAmount,
    commissionAmountFormatted: formatPrice(payout.commissionAmount),
    platformFee: payout.platformFee,
    platformFeeFormatted: formatPrice(payout.platformFee),
    taxDeducted: payout.taxDeducted,
    taxDeductedFormatted: formatPrice(payout.taxDeducted),
    adjustments: payout.adjustments,
    adjustmentsFormatted: formatPrice(payout.adjustments),
    payoutAmount: payout.payoutAmount,
    payoutAmountFormatted: formatPrice(payout.payoutAmount),
    commissionRate: `${commissionRate}%`,
  };
}

/**
 * Mask account number
 */
function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) return accountNumber;
  return "X".repeat(accountNumber.length - 4) + accountNumber.slice(-4);
}

/**
 * Get period label
 */
function getPeriodLabel(start: Date, end: Date): string {
  return `${formatDate(start)} - ${formatDate(end)}`;
}

/**
 * Get payment details
 */
function getPaymentDetails(payout: Payout): string {
  if (payout.bankAccount) {
    return `${payout.bankAccount.bankName} - ${maskAccountNumber(
      payout.bankAccount.accountNumber
    )}`;
  }
  if (payout.upiId) {
    return payout.upiId;
  }
  if (payout.walletId) {
    return payout.walletId;
  }
  return "N/A";
}

/**
 * Map Payout to PayoutUI
 */
export function mapPayoutToUI(payout: Payout): PayoutUI {
  return {
    id: payout.id,
    payoutNumber: payout.payoutNumber,
    shopId: payout.shopId,
    sellerId: payout.sellerId,
    periodStart: payout.periodStart,
    periodStartFormatted: formatDate(payout.periodStart),
    periodEnd: payout.periodEnd,
    periodEndFormatted: formatDate(payout.periodEnd),
    periodLabel: getPeriodLabel(payout.periodStart, payout.periodEnd),
    amounts: getAmountBreakdown(payout),
    currency: payout.currency,
    orderIds: payout.orderIds,
    orderCount: payout.orderCount,
    method: getPayoutMethodDisplay(payout.method),
    status: getPayoutStatusDisplay(payout.status),
    bankAccount: payout.bankAccount
      ? {
          accountHolderName: payout.bankAccount.accountHolderName,
          accountNumber: payout.bankAccount.accountNumber,
          accountNumberMasked: maskAccountNumber(
            payout.bankAccount.accountNumber
          ),
          ifscCode: payout.bankAccount.ifscCode,
          bankName: payout.bankAccount.bankName,
          branchName: payout.bankAccount.branchName,
        }
      : undefined,
    upiId: payout.upiId,
    walletId: payout.walletId,
    paymentDetails: getPaymentDetails(payout),
    gatewayPayoutId: payout.gatewayPayoutId,
    transactionId: payout.transactionId,
    utr: payout.utr,
    hasTransactionDetails: !!(payout.transactionId || payout.utr),
    scheduledAt: payout.scheduledAt,
    scheduledAtFormatted: payout.scheduledAt
      ? formatDate(payout.scheduledAt)
      : undefined,
    processedAt: payout.processedAt,
    processedAtFormatted: payout.processedAt
      ? formatDate(payout.processedAt)
      : undefined,
    completedAt: payout.completedAt,
    completedAtFormatted: payout.completedAt
      ? formatDate(payout.completedAt)
      : undefined,
    failedAt: payout.failedAt,
    failedAtFormatted: payout.failedAt
      ? formatDate(payout.failedAt)
      : undefined,
    isPending: payout.status === "pending",
    isProcessing: payout.status === "processing",
    isCompleted: payout.status === "completed",
    isFailed: payout.status === "failed",
    isCancelled: payout.status === "cancelled",
    isOnHold: payout.status === "on-hold",
    failureReason: payout.failureReason,
    failureCode: payout.failureCode,
    retryCount: payout.retryCount,
    hasFailed: payout.status === "failed",
    holdReason: payout.holdReason,
    holdUntil: payout.holdUntil,
    holdUntilFormatted: payout.holdUntil
      ? formatDate(payout.holdUntil)
      : undefined,
    isHeld: payout.status === "on-hold",
    notes: payout.notes,
    adminNotes: payout.adminNotes,
    url: `/seller/payouts/${payout.id}`,
    shopUrl: `/seller/shops/${payout.shopId}`,
    createdAt: payout.createdAt,
    createdAtFormatted: formatDate(payout.createdAt),
    updatedAt: payout.updatedAt,
    age: getTimeAgo(payout.createdAt),
  };
}

/**
 * Map Payout to PayoutCardUI
 */
export function mapPayoutToCard(payout: Payout): PayoutCardUI {
  return {
    id: payout.id,
    payoutNumber: payout.payoutNumber,
    payoutAmount: payout.payoutAmount,
    payoutAmountFormatted: formatPrice(payout.payoutAmount),
    status: getPayoutStatusDisplay(payout.status),
    periodLabel: getPeriodLabel(payout.periodStart, payout.periodEnd),
    createdAt: payout.createdAt,
    url: `/seller/payouts/${payout.id}`,
  };
}
