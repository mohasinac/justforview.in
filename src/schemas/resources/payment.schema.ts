/**
 * Payment Resource Schema (Backend/Firestore)
 *
 * Defines the structure of Payment documents as stored in Firestore.
 * Used for validation, type inference, and database operations.
 */

import { z } from "zod";

/**
 * Payment Status Enum
 */
export const PaymentStatusEnum = z.enum([
  "pending",
  "processing",
  "completed",
  "failed",
  "cancelled",
  "refunded",
  "partially-refunded",
]);
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;

/**
 * Payment Method Enum
 */
export const PaymentMethodEnum = z.enum([
  "card",
  "upi",
  "netbanking",
  "wallet",
  "cod",
  "emi",
]);
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>;

/**
 * Payment Gateway Enum
 */
export const PaymentGatewayEnum = z.enum([
  "razorpay",
  "stripe",
  "paytm",
  "phonepe",
  "manual",
]);
export type PaymentGateway = z.infer<typeof PaymentGatewayEnum>;

/**
 * Refund Schema
 */
export const RefundSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  reason: z.string(),
  status: z.enum(["pending", "processed", "failed"]),
  gatewayRefundId: z.string().optional(),
  processedAt: z.date().optional(),
  createdAt: z.date(),
});
export type Refund = z.infer<typeof RefundSchema>;

/**
 * Complete Payment Schema (Firestore Document)
 */
export const PaymentSchema = z.object({
  // IDs
  id: z.string(),
  paymentNumber: z.string(),
  orderId: z.string(),
  userId: z.string(),
  shopId: z.string().optional(),

  // Amount
  amount: z.number().positive(),
  currency: z.string().default("INR"),
  taxAmount: z.number().min(0).default(0),
  shippingAmount: z.number().min(0).default(0),

  // Payment Details
  method: PaymentMethodEnum,
  gateway: PaymentGatewayEnum,
  status: PaymentStatusEnum,

  // Gateway Data
  gatewayPaymentId: z.string().optional(),
  gatewayOrderId: z.string().optional(),
  gatewaySignature: z.string().optional(),

  // Card/UPI Details (masked)
  cardLast4: z.string().optional(),
  cardBrand: z.string().optional(),
  upiId: z.string().optional(),
  walletType: z.string().optional(),
  bankName: z.string().optional(),

  // Processing
  processingFee: z.number().min(0).default(0),
  netAmount: z.number().positive(),

  // Refunds
  refunds: z.array(RefundSchema).optional(),
  refundedAmount: z.number().min(0).default(0),

  // Settlement
  settlementStatus: z
    .enum(["pending", "processing", "settled"])
    .default("pending"),
  settledAt: z.date().optional(),
  settlementAmount: z.number().optional(),

  // Failure
  failureReason: z.string().optional(),
  failureCode: z.string().optional(),

  // Timestamps
  initiatedAt: z.date(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),
  cancelledAt: z.date().optional(),

  // Metadata
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  notes: z.string().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Payment = z.infer<typeof PaymentSchema>;

/**
 * Create Payment Schema
 */
export const CreatePaymentSchema = PaymentSchema.omit({
  id: true,
  paymentNumber: true,
  status: true,
  gatewayPaymentId: true,
  gatewayOrderId: true,
  gatewaySignature: true,
  completedAt: true,
  failedAt: true,
  cancelledAt: true,
  settledAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  status: PaymentStatusEnum.default("pending"),
});

export type CreatePayment = z.infer<typeof CreatePaymentSchema>;

/**
 * Update Payment Schema
 */
export const UpdatePaymentSchema = PaymentSchema.partial().required({
  id: true,
});

export type UpdatePayment = z.infer<typeof UpdatePaymentSchema>;

/**
 * Payment Filter Schema
 */
export const PaymentFilterSchema = z.object({
  userId: z.string().optional(),
  shopId: z.string().optional(),
  orderId: z.string().optional(),
  status: PaymentStatusEnum.optional(),
  method: PaymentMethodEnum.optional(),
  gateway: PaymentGatewayEnum.optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sort: z.enum(["newest", "oldest", "amount"]).default("newest"),
});

export type PaymentFilter = z.infer<typeof PaymentFilterSchema>;

/**
 * Validation helper functions
 */
export function validatePayment(data: unknown): Payment {
  return PaymentSchema.parse(data);
}

export function validateCreatePayment(data: unknown): CreatePayment {
  return CreatePaymentSchema.parse(data);
}

export function validateUpdatePayment(data: unknown): UpdatePayment {
  return UpdatePaymentSchema.parse(data);
}

export function validatePaymentFilter(data: unknown): PaymentFilter {
  return PaymentFilterSchema.parse(data);
}
