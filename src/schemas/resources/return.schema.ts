/**
 * Return Resource Schema (Backend/Firestore)
 *
 * Defines the structure of Return documents as stored in Firestore.
 * Used for validation, type inference, and database operations.
 */

import { z } from "zod";

/**
 * Return Status Enum
 */
export const ReturnStatusEnum = z.enum([
  "requested",
  "approved",
  "rejected",
  "pickup-scheduled",
  "picked-up",
  "received",
  "inspecting",
  "completed",
  "refunded",
  "cancelled",
]);
export type ReturnStatus = z.infer<typeof ReturnStatusEnum>;

/**
 * Return Reason Enum
 */
export const ReturnReasonEnum = z.enum([
  "defective",
  "damaged",
  "wrong-item",
  "not-as-described",
  "size-issue",
  "quality-issue",
  "changed-mind",
  "other",
]);
export type ReturnReason = z.infer<typeof ReturnReasonEnum>;

/**
 * Return Method Enum
 */
export const ReturnMethodEnum = z.enum(["pickup", "drop-off", "courier"]);
export type ReturnMethod = z.infer<typeof ReturnMethodEnum>;

/**
 * Return Item Schema
 */
export const ReturnItemSchema = z.object({
  orderItemId: z.string(),
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  reason: ReturnReasonEnum,
  condition: z.enum(["unopened", "opened", "used", "damaged"]),
});
export type ReturnItem = z.infer<typeof ReturnItemSchema>;

/**
 * Complete Return Schema (Firestore Document)
 */
export const ReturnSchema = z.object({
  // IDs
  id: z.string(),
  returnNumber: z.string(),
  orderId: z.string(),
  userId: z.string(),
  shopId: z.string(),

  // Items
  items: z.array(ReturnItemSchema).min(1, "At least one item required"),

  // Reason
  primaryReason: ReturnReasonEnum,
  reasonDetails: z.string().min(10, "Please provide details"),
  attachments: z.array(z.string().url()).optional(),

  // Status
  status: ReturnStatusEnum,

  // Return Method
  returnMethod: ReturnMethodEnum,
  pickupAddress: z.string().optional(),
  trackingNumber: z.string().optional(),

  // Amounts
  itemsTotal: z.number().positive(),
  refundAmount: z.number().positive(),
  shippingRefund: z.number().min(0).default(0),
  restockingFee: z.number().min(0).default(0),

  // Approval
  approvedAt: z.date().optional(),
  approvedBy: z.string().optional(),
  rejectedAt: z.date().optional(),
  rejectionReason: z.string().optional(),

  // Pickup
  pickupScheduledDate: z.date().optional(),
  pickedUpAt: z.date().optional(),

  // Received & Inspection
  receivedAt: z.date().optional(),
  inspectionNotes: z.string().optional(),
  inspectionPhotos: z.array(z.string().url()).optional(),

  // Completion
  completedAt: z.date().optional(),
  refundedAt: z.date().optional(),
  refundMethod: z.enum(["original", "store-credit", "bank"]).optional(),
  refundTransactionId: z.string().optional(),

  // Communication
  notes: z.string().optional(),
  customerNotes: z.string().optional(),
  sellerNotes: z.string().optional(),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Return = z.infer<typeof ReturnSchema>;

/**
 * Create Return Schema
 */
export const CreateReturnSchema = ReturnSchema.omit({
  id: true,
  returnNumber: true,
  status: true,
  approvedAt: true,
  approvedBy: true,
  rejectedAt: true,
  rejectionReason: true,
  pickupScheduledDate: true,
  pickedUpAt: true,
  receivedAt: true,
  inspectionNotes: true,
  inspectionPhotos: true,
  completedAt: true,
  refundedAt: true,
  refundMethod: true,
  refundTransactionId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  status: ReturnStatusEnum.default("requested"),
});

export type CreateReturn = z.infer<typeof CreateReturnSchema>;

/**
 * Update Return Schema
 */
export const UpdateReturnSchema = ReturnSchema.partial().required({
  id: true,
});

export type UpdateReturn = z.infer<typeof UpdateReturnSchema>;

/**
 * Return Filter Schema
 */
export const ReturnFilterSchema = z.object({
  userId: z.string().optional(),
  shopId: z.string().optional(),
  orderId: z.string().optional(),
  status: ReturnStatusEnum.optional(),
  primaryReason: ReturnReasonEnum.optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sort: z.enum(["newest", "oldest", "status", "amount"]).default("newest"),
});

export type ReturnFilter = z.infer<typeof ReturnFilterSchema>;

/**
 * Validation helper functions
 */
export function validateReturn(data: unknown): Return {
  return ReturnSchema.parse(data);
}

export function validateCreateReturn(data: unknown): CreateReturn {
  return CreateReturnSchema.parse(data);
}

export function validateUpdateReturn(data: unknown): UpdateReturn {
  return UpdateReturnSchema.parse(data);
}

export function validateReturnFilter(data: unknown): ReturnFilter {
  return ReturnFilterSchema.parse(data);
}
