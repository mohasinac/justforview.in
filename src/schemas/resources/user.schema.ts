/**
 * User Resource Schema
 * Backend database schema with Zod validation
 */

import { z } from "zod";

/**
 * User Role Enum
 */
export const UserRoleEnum = z.enum(["guest", "user", "seller", "admin"]);

export type UserRole = z.infer<typeof UserRoleEnum>;

/**
 * User Preferences Schema
 */
export const UserPreferencesSchema = z.object({
  language: z.string().default("en"),
  currency: z.string().default("INR"),
  notifications: z.object({
    email: z.boolean().default(true),
    sms: z.boolean().default(false),
    push: z.boolean().default(true),
  }),
  theme: z.enum(["light", "dark", "auto"]).default("light"),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

/**
 * Main User Schema (Firestore Document)
 */
export const UserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1).max(200).optional(),
  role: UserRoleEnum,
  avatar: z.string().url().optional(),
  phone: z.string().min(10).max(15).optional(),

  // Verification
  emailVerified: z.boolean().default(false),
  phoneVerified: z.boolean().default(false),

  // Preferences
  preferences: UserPreferencesSchema.optional(),

  // Profile
  bio: z.string().max(500).optional(),
  location: z.string().max(200).optional(),

  // Stats
  orderCount: z.number().int().nonnegative().default(0),
  reviewCount: z.number().int().nonnegative().default(0),
  wishlistCount: z.number().int().nonnegative().default(0),

  // Flags
  isActive: z.boolean().default(true),
  isBanned: z.boolean().default(false),

  // Timestamps
  lastLoginAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * User Registration Schema
 */
export const UserRegistrationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(200),
  password: z.string().min(8).max(100),
  role: UserRoleEnum.optional().default("user"),
});

export type UserRegistration = z.infer<typeof UserRegistrationSchema>;

/**
 * User Update Schema
 */
export const UserUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  avatar: z.string().url().optional(),
  phone: z.string().min(10).max(15).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(200).optional(),
  preferences: UserPreferencesSchema.optional(),
});

export type UserUpdate = z.infer<typeof UserUpdateSchema>;

/**
 * Validation Helpers
 */
export const validateUser = (data: unknown) => UserSchema.parse(data);
export const validateUserRegistration = (data: unknown) =>
  UserRegistrationSchema.parse(data);
export const validateUserUpdate = (data: unknown) =>
  UserUpdateSchema.parse(data);
