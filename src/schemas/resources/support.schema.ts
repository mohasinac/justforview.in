/**
 * Support Ticket Resource Schema (Backend/Firestore)
 *
 * Defines the structure of Support Ticket documents as stored in Firestore.
 * Used for validation, type inference, and database operations.
 */

import { z } from "zod";

/**
 * Ticket Status Enum
 */
export const TicketStatusEnum = z.enum([
  "open",
  "in-progress",
  "waiting-customer",
  "resolved",
  "closed",
]);
export type TicketStatus = z.infer<typeof TicketStatusEnum>;

/**
 * Ticket Priority Enum
 */
export const TicketPriorityEnum = z.enum(["low", "medium", "high", "urgent"]);
export type TicketPriority = z.infer<typeof TicketPriorityEnum>;

/**
 * Ticket Category Enum
 */
export const TicketCategoryEnum = z.enum([
  "account",
  "order",
  "payment",
  "product",
  "shipping",
  "return",
  "technical",
  "other",
]);
export type TicketCategory = z.infer<typeof TicketCategoryEnum>;

/**
 * Ticket Message Schema
 */
export const TicketMessageSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userType: z.enum(["customer", "support", "admin"]),
  message: z.string().min(1, "Message is required"),
  attachments: z.array(z.string().url()).optional(),
  isInternal: z.boolean().default(false),
  createdAt: z.date(),
});
export type TicketMessage = z.infer<typeof TicketMessageSchema>;

/**
 * Complete Support Ticket Schema (Firestore Document)
 */
export const SupportTicketSchema = z.object({
  // IDs
  id: z.string(),
  ticketNumber: z.string(),
  userId: z.string(),

  // Basic Info
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: TicketCategoryEnum,

  // Status & Priority
  status: TicketStatusEnum,
  priority: TicketPriorityEnum,

  // Related Entities
  orderId: z.string().optional(),
  productId: z.string().optional(),

  // Attachments
  attachments: z.array(z.string().url()).optional(),

  // Messages
  messages: z.array(TicketMessageSchema).optional(),

  // Assignment
  assignedTo: z.string().optional(),
  assignedAt: z.date().optional(),

  // Resolution
  resolvedAt: z.date().optional(),
  resolutionNote: z.string().optional(),
  closedAt: z.date().optional(),

  // Stats
  responseTime: z.number().optional(),
  resolutionTime: z.number().optional(),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  lastMessageAt: z.date().optional(),
});

export type SupportTicket = z.infer<typeof SupportTicketSchema>;

/**
 * Create Support Ticket Schema
 */
export const CreateSupportTicketSchema = SupportTicketSchema.omit({
  id: true,
  ticketNumber: true,
  messages: true,
  assignedTo: true,
  assignedAt: true,
  resolvedAt: true,
  resolutionNote: true,
  closedAt: true,
  responseTime: true,
  resolutionTime: true,
  createdAt: true,
  updatedAt: true,
  lastMessageAt: true,
}).extend({
  status: TicketStatusEnum.default("open"),
  priority: TicketPriorityEnum.default("medium"),
});

export type CreateSupportTicket = z.infer<typeof CreateSupportTicketSchema>;

/**
 * Update Support Ticket Schema
 */
export const UpdateSupportTicketSchema = SupportTicketSchema.partial().required(
  {
    id: true,
  }
);

export type UpdateSupportTicket = z.infer<typeof UpdateSupportTicketSchema>;

/**
 * Add Message Schema
 */
export const AddMessageSchema = z.object({
  ticketId: z.string(),
  message: z.string().min(1, "Message is required"),
  attachments: z.array(z.string().url()).optional(),
  isInternal: z.boolean().default(false),
});

export type AddMessage = z.infer<typeof AddMessageSchema>;

/**
 * Support Ticket Filter Schema
 */
export const SupportTicketFilterSchema = z.object({
  userId: z.string().optional(),
  status: TicketStatusEnum.optional(),
  priority: TicketPriorityEnum.optional(),
  category: TicketCategoryEnum.optional(),
  assignedTo: z.string().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sort: z
    .enum(["newest", "oldest", "priority", "status", "last-message"])
    .default("newest"),
});

export type SupportTicketFilter = z.infer<typeof SupportTicketFilterSchema>;

/**
 * Validation helper functions
 */
export function validateSupportTicket(data: unknown): SupportTicket {
  return SupportTicketSchema.parse(data);
}

export function validateCreateSupportTicket(
  data: unknown
): CreateSupportTicket {
  return CreateSupportTicketSchema.parse(data);
}

export function validateUpdateSupportTicket(
  data: unknown
): UpdateSupportTicket {
  return UpdateSupportTicketSchema.parse(data);
}

export function validateAddMessage(data: unknown): AddMessage {
  return AddMessageSchema.parse(data);
}

export function validateSupportTicketFilter(
  data: unknown
): SupportTicketFilter {
  return SupportTicketFilterSchema.parse(data);
}
