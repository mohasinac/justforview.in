/**
 * Address Resource Schema (Backend/Firestore)
 *
 * Defines the structure of Address documents as stored in Firestore.
 * Used for validation, type inference, and database operations.
 */

import { z } from "zod";

/**
 * Address Type Enum
 */
export const AddressTypeEnum = z.enum(["home", "work", "other"]);
export type AddressType = z.infer<typeof AddressTypeEnum>;

/**
 * Complete Address Schema (Firestore Document)
 */
export const AddressSchema = z.object({
  // IDs
  id: z.string(),
  userId: z.string(),

  // Basic Info
  label: AddressTypeEnum.default("home"),
  line1: z.string().min(5, "Address line 1 must be at least 5 characters"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  country: z.string().default("India"),
  landmark: z.string().optional(),

  // Contact
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),

  // Flags
  isDefault: z.boolean().default(false),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Address = z.infer<typeof AddressSchema>;

/**
 * Create Address Schema
 */
export const CreateAddressSchema = AddressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateAddress = z.infer<typeof CreateAddressSchema>;

/**
 * Update Address Schema
 */
export const UpdateAddressSchema = AddressSchema.partial().required({
  id: true,
});

export type UpdateAddress = z.infer<typeof UpdateAddressSchema>;

/**
 * Address Filter Schema
 */
export const AddressFilterSchema = z.object({
  userId: z.string().optional(),
  label: AddressTypeEnum.optional(),
  isDefault: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type AddressFilter = z.infer<typeof AddressFilterSchema>;

/**
 * Validation helper functions
 */
export function validateAddress(data: unknown): Address {
  return AddressSchema.parse(data);
}

export function validateCreateAddress(data: unknown): CreateAddress {
  return CreateAddressSchema.parse(data);
}

export function validateUpdateAddress(data: unknown): UpdateAddress {
  return UpdateAddressSchema.parse(data);
}

export function validateAddressFilter(data: unknown): AddressFilter {
  return AddressFilterSchema.parse(data);
}
