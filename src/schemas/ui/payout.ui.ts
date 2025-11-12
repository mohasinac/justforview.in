/**
 * Payout UI Schema (Frontend)
 *
 * Defines the structure of Payout data as displayed in the UI.
 * Includes formatted values, computed fields, and display helpers.
 */

import type {
  PayoutStatus,
  PayoutMethod,
} from "@/schemas/resources/payout.schema";

/**
 * Payout Status Display
 */
export interface PayoutStatusDisplay {
  value: PayoutStatus;
  label: string;
  color: string;
  className: string;
  icon: string;
  description: string;
}

/**
 * Payout Method Display
 */
export interface PayoutMethodDisplay {
  value: PayoutMethod;
  label: string;
  icon: string;
}

/**
 * Amount Breakdown
 */
export interface PayoutAmountBreakdown {
  salesAmount: number;
  salesAmountFormatted: string;
  commissionAmount: number;
  commissionAmountFormatted: string;
  platformFee: number;
  platformFeeFormatted: string;
  taxDeducted: number;
  taxDeductedFormatted: string;
  adjustments: number;
  adjustmentsFormatted: string;
  payoutAmount: number;
  payoutAmountFormatted: string;
  commissionRate: string;
}

/**
 * Complete Payout UI Schema
 */
export interface PayoutUI {
  // IDs
  id: string;
  payoutNumber: string;
  shopId: string;
  sellerId: string;

  // Period
  periodStart: Date;
  periodStartFormatted: string;
  periodEnd: Date;
  periodEndFormatted: string;
  periodLabel: string;

  // Amounts
  amounts: PayoutAmountBreakdown;
  currency: string;

  // Order details
  orderIds: string[];
  orderCount: number;

  // Payout details
  method: PayoutMethodDisplay;
  status: PayoutStatusDisplay;

  // Bank details
  bankAccount?: {
    accountHolderName: string;
    accountNumber: string;
    accountNumberMasked: string;
    ifscCode: string;
    bankName: string;
    branchName?: string;
  };
  upiId?: string;
  walletId?: string;
  paymentDetails: string;

  // Processing
  gatewayPayoutId?: string;
  transactionId?: string;
  utr?: string;
  hasTransactionDetails: boolean;

  // Timestamps
  scheduledAt?: Date;
  scheduledAtFormatted?: string;
  processedAt?: Date;
  processedAtFormatted?: string;
  completedAt?: Date;
  completedAtFormatted?: string;
  failedAt?: Date;
  failedAtFormatted?: string;

  // Status flags
  isPending: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isCancelled: boolean;
  isOnHold: boolean;

  // Failure
  failureReason?: string;
  failureCode?: string;
  retryCount: number;
  hasFailed: boolean;

  // Hold
  holdReason?: string;
  holdUntil?: Date;
  holdUntilFormatted?: string;
  isHeld: boolean;

  // Metadata
  notes?: string;
  adminNotes?: string;

  // URLs
  url: string;
  shopUrl: string;

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  updatedAt: Date;
  age: string;
}

/**
 * Payout Card UI (Simplified for cards)
 */
export interface PayoutCardUI {
  id: string;
  payoutNumber: string;
  payoutAmount: number;
  payoutAmountFormatted: string;
  status: PayoutStatusDisplay;
  periodLabel: string;
  createdAt: Date;
  url: string;
}

/**
 * Payout Form Data
 */
export interface PayoutFormData {
  shopId: string;
  periodStart: Date;
  periodEnd: Date;
  orderIds: string[];
  salesAmount: number;
  method: PayoutMethod;
  bankAccount?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branchName?: string;
  };
  upiId?: string;
}
