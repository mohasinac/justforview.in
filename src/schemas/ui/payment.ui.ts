/**
 * Payment UI Schema (Frontend)
 *
 * Defines the structure of Payment data as displayed in the UI.
 * Includes formatted values, computed fields, and display helpers.
 */

import type {
  PaymentStatus,
  PaymentMethod,
  PaymentGateway,
} from "@/schemas/resources/payment.schema";

/**
 * Payment Status Display
 */
export interface PaymentStatusDisplay {
  value: PaymentStatus;
  label: string;
  color: string;
  className: string;
  icon: string;
  description: string;
}

/**
 * Payment Method Display
 */
export interface PaymentMethodDisplay {
  value: PaymentMethod;
  label: string;
  icon: string;
  description: string;
}

/**
 * Payment Gateway Display
 */
export interface PaymentGatewayDisplay {
  value: PaymentGateway;
  label: string;
  logo?: string;
}

/**
 * Refund UI
 */
export interface RefundUI {
  id: string;
  amount: number;
  amountFormatted: string;
  reason: string;
  status: string;
  statusLabel: string;
  gatewayRefundId?: string;
  processedAt?: Date;
  processedAtFormatted?: string;
  createdAt: Date;
  createdAtFormatted: string;
}

/**
 * Amount Breakdown
 */
export interface PaymentAmountBreakdown {
  subtotal: number;
  subtotalFormatted: string;
  taxAmount: number;
  taxAmountFormatted: string;
  shippingAmount: number;
  shippingAmountFormatted: string;
  total: number;
  totalFormatted: string;
  processingFee: number;
  processingFeeFormatted: string;
  netAmount: number;
  netAmountFormatted: string;
  refundedAmount: number;
  refundedAmountFormatted: string;
}

/**
 * Complete Payment UI Schema
 */
export interface PaymentUI {
  // IDs
  id: string;
  paymentNumber: string;
  orderId: string;
  userId: string;
  shopId?: string;

  // Amount
  amounts: PaymentAmountBreakdown;
  currency: string;

  // Payment Details
  method: PaymentMethodDisplay;
  gateway: PaymentGatewayDisplay;
  status: PaymentStatusDisplay;

  // Gateway Data
  gatewayPaymentId?: string;
  gatewayOrderId?: string;
  hasGatewayData: boolean;

  // Card/UPI Details
  cardLast4?: string;
  cardBrand?: string;
  cardDisplay?: string;
  upiId?: string;
  walletType?: string;
  bankName?: string;
  paymentDetails: string;

  // Refunds
  refunds?: RefundUI[];
  hasRefunds: boolean;
  refundCount: number;

  // Settlement
  settlementStatus: string;
  settlementStatusLabel: string;
  settledAt?: Date;
  settledAtFormatted?: string;
  settlementAmount?: number;
  settlementAmountFormatted?: string;
  isSettled: boolean;

  // Failure
  failureReason?: string;
  failureCode?: string;
  hasFailed: boolean;

  // Status flags
  isPending: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isCancelled: boolean;
  isRefunded: boolean;

  // Timestamps
  initiatedAt: Date;
  initiatedAtFormatted: string;
  completedAt?: Date;
  completedAtFormatted?: string;
  failedAt?: Date;
  failedAtFormatted?: string;
  cancelledAt?: Date;
  cancelledAtFormatted?: string;

  // Metadata
  ipAddress?: string;
  userAgent?: string;
  notes?: string;

  // URLs
  url: string;
  orderUrl: string;

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  updatedAt: Date;
  age: string;
}

/**
 * Payment Card UI (Simplified for cards)
 */
export interface PaymentCardUI {
  id: string;
  paymentNumber: string;
  amount: number;
  amountFormatted: string;
  method: PaymentMethodDisplay;
  status: PaymentStatusDisplay;
  createdAt: Date;
  url: string;
}

/**
 * Payment Form Data
 */
export interface PaymentFormData {
  orderId: string;
  amount: number;
  method: PaymentMethod;
  gateway: PaymentGateway;
}
