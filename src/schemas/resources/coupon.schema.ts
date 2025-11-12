/**
 * Coupon Resource Schema
 * Backend database schema with Zod validation
 */

import { z } from "zod";

/**
 * Coupon Type Enum
 */
export const CouponTypeEnum = z.enum([
  "percentage",
  "flat",
  "bogo",
  "tiered",
  "free-shipping",
]);

export type CouponType = z.infer<typeof CouponTypeEnum>;

/**
 * Coupon Status Enum
 */
export const CouponStatusEnum = z.enum([
  "active",
  "inactive",
  "expired",
  "used-up",
]);

export type CouponStatus = z.infer<typeof CouponStatusEnum>;

/**
 * Coupon Applicability Enum
 */
export const CouponApplicabilityEnum = z.enum(["all", "category", "product"]);

export type CouponApplicability = z.infer<typeof CouponApplicabilityEnum>;

/**
 * Tiered Discount Schema
 */
export const TieredDiscountSchema = z.object({
  minAmount: z.number().positive(),
  discountPercentage: z.number().min(0).max(100),
});

export type TieredDiscount = z.infer<typeof TieredDiscountSchema>;

/**
 * BOGO Configuration Schema
 */
export const BogoConfigSchema = z.object({
  buyQuantity: z.number().int().positive(),
  getQuantity: z.number().int().positive(),
  discountPercentage: z.number().min(0).max(100),
  applicableProducts: z.array(z.string()).optional(),
});

export type BogoConfig = z.infer<typeof BogoConfigSchema>;

/**
 * Main Coupon Schema (Firestore Document)
 */
export const CouponSchema = z.object({
  id: z.string().min(1),
  shopId: z.string().min(1),

  // Basic info
  code: z.string().min(3).max(50).toUpperCase(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),

  // Type & value
  type: CouponTypeEnum,
  discountValue: z.number().nonnegative().optional(),
  maxDiscountAmount: z.number().positive().optional(),

  // Configurations
  tiers: z.array(TieredDiscountSchema).optional(),
  bogoConfig: BogoConfigSchema.optional(),

  // Requirements
  minPurchaseAmount: z.number().nonnegative().default(0),
  minQuantity: z.number().int().nonnegative().default(0),

  // Applicability
  applicability: CouponApplicabilityEnum,
  applicableCategories: z.array(z.string()).optional(),
  applicableProducts: z.array(z.string()).optional(),
  excludedCategories: z.array(z.string()).optional(),
  excludedProducts: z.array(z.string()).optional(),

  // Usage
  usageLimit: z.number().int().positive().optional(),
  usageLimitPerUser: z.number().int().positive().default(1),
  usageCount: z.number().int().nonnegative().default(0),

  // Validity
  startDate: z.date(),
  endDate: z.date(),
  status: CouponStatusEnum,

  // Restrictions
  firstOrderOnly: z.boolean().default(false),
  newUsersOnly: z.boolean().default(false),
  canCombineWithOtherCoupons: z.boolean().default(false),

  // Display
  autoApply: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  isFeatured: z.boolean().default(false),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Coupon = z.infer<typeof CouponSchema>;

/**
 * Coupon Creation Schema
 */
export const CouponCreateSchema = CouponSchema.omit({
  id: true,
  usageCount: true,
  createdAt: true,
  updatedAt: true,
});

export type CouponCreate = z.infer<typeof CouponCreateSchema>;

/**
 * Coupon Update Schema
 */
export const CouponUpdateSchema = CouponSchema.partial().omit({
  id: true,
  shopId: true,
  code: true,
  usageCount: true,
  createdAt: true,
  updatedAt: true,
});

export type CouponUpdate = z.infer<typeof CouponUpdateSchema>;

/**
 * Coupon Validation Schema
 */
export const CouponValidationSchema = z.object({
  code: z.string().min(3).max(50),
  cartTotal: z.number().positive(),
  itemCount: z.number().int().positive(),
  userId: z.string().min(1),
  productIds: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
});

export type CouponValidation = z.infer<typeof CouponValidationSchema>;

/**
 * Validation Helpers
 */
export const validateCoupon = (data: unknown) => CouponSchema.parse(data);
export const validateCouponCreate = (data: unknown) =>
  CouponCreateSchema.parse(data);
export const validateCouponUpdate = (data: unknown) =>
  CouponUpdateSchema.parse(data);
export const validateCouponValidation = (data: unknown) =>
  CouponValidationSchema.parse(data);
