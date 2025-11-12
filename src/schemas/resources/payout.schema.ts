/**
 * Payout Resource Schema (Backend/Firestore)
 *
 * Defines the structure of Payout documents as stored in Firestore.
 * Used for validation, type inference, and database operations.
 */

import { z } from "zod";

/**
 * Payout Status Enum
 */
export const PayoutStatusEnum = z.enum([
  "pending",
  "processing",
  "completed",
  "failed",
  "cancelled",
  "on-hold",
]);
export type PayoutStatus = z.infer<typeof PayoutStatusEnum>;

/**
 * Payout Method Enum
 */
export const PayoutMethodEnum = z.enum([
  "bank-transfer",
  "upi",
  "wallet",
  "cheque",
]);
export type PayoutMethod = z.infer<typeof PayoutMethodEnum>;

/**
 * Bank Account Schema
 */
export const BankAccountSchema = z.object({
  accountHolderName: z.string().min(2, "Account holder name required"),
  accountNumber: z.string().min(8, "Valid account number required"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  bankName: z.string().min(2, "Bank name required"),
  branchName: z.string().optional(),
});
export type BankAccount = z.infer<typeof BankAccountSchema>;

/**
 * Complete Payout Schema (Firestore Document)
 */
export const PayoutSchema = z.object({
  // IDs
  id: z.string(),
  payoutNumber: z.string(),
  shopId: z.string(),
  sellerId: z.string(),

  // Period
  periodStart: z.date(),
  periodEnd: z.date(),

  // Amounts
  salesAmount: z.number().positive(),
  commissionAmount: z.number().min(0),
  platformFee: z.number().min(0),
  taxDeducted: z.number().min(0),
  adjustments: z.number().default(0),
  payoutAmount: z.number().positive(),
  currency: z.string().default("INR"),

  // Order details
  orderIds: z.array(z.string()),
  orderCount: z.number().int().positive(),

  // Payout details
  method: PayoutMethodEnum,
  status: PayoutStatusEnum,

  // Bank details
  bankAccount: BankAccountSchema.optional(),
  upiId: z.string().optional(),
  walletId: z.string().optional(),

  // Processing
  gatewayPayoutId: z.string().optional(),
  transactionId: z.string().optional(),
  utr: z.string().optional(),

  // Timestamps
  scheduledAt: z.date().optional(),
  processedAt: z.date().optional(),
  completedAt: z.date().optional(),
  failedAt: z.date().optional(),

  // Failure
  failureReason: z.string().optional(),
  failureCode: z.string().optional(),
  retryCount: z.number().int().min(0).default(0),

  // Hold
  holdReason: z.string().optional(),
  holdUntil: z.date().optional(),

  // Metadata
  notes: z.string().optional(),
  adminNotes: z.string().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Payout = z.infer<typeof PayoutSchema>;

/**
 * Create Payout Schema
 */
export const CreatePayoutSchema = PayoutSchema.omit({
  id: true,
  payoutNumber: true,
  status: true,
  gatewayPayoutId: true,
  transactionId: true,
  utr: true,
  scheduledAt: true,
  processedAt: true,
  completedAt: true,
  failedAt: true,
  retryCount: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  status: PayoutStatusEnum.default("pending"),
});

export type CreatePayout = z.infer<typeof CreatePayoutSchema>;

/**
 * Update Payout Schema
 */
export const UpdatePayoutSchema = PayoutSchema.partial().required({
  id: true,
});

export type UpdatePayout = z.infer<typeof UpdatePayoutSchema>;

/**
 * Payout Filter Schema
 */
export const PayoutFilterSchema = z.object({
  shopId: z.string().optional(),
  sellerId: z.string().optional(),
  status: PayoutStatusEnum.optional(),
  method: PayoutMethodEnum.optional(),
  periodStart: z.date().optional(),
  periodEnd: z.date().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sort: z.enum(["newest", "oldest", "amount"]).default("newest"),
});

export type PayoutFilter = z.infer<typeof PayoutFilterSchema>;

/**
 * Validation helper functions
 */
export function validatePayout(data: unknown): Payout {
  return PayoutSchema.parse(data);
}

export function validateCreatePayout(data: unknown): CreatePayout {
  return CreatePayoutSchema.parse(data);
}

export function validateUpdatePayout(data: unknown): UpdatePayout {
  return UpdatePayoutSchema.parse(data);
}

export function validatePayoutFilter(data: unknown): PayoutFilter {
  return PayoutFilterSchema.parse(data);
}
