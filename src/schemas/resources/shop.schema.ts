/**
 * Shop Resource Schema
 * Backend database schema with Zod validation
 */

import { z } from "zod";

/**
 * Shop Address Schema
 */
export const ShopAddressSchema = z.object({
  line1: z.string().min(1).max(200),
  line2: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  pincode: z.string().min(6).max(6),
  country: z.string().min(1).max(100),
});

export type ShopAddress = z.infer<typeof ShopAddressSchema>;

/**
 * Shop Bank Details Schema
 */
export const ShopBankDetailsSchema = z.object({
  accountHolderName: z.string().min(1).max(200),
  accountNumber: z.string().min(9).max(18),
  ifscCode: z.string().min(11).max(11),
  bankName: z.string().min(1).max(200),
  branchName: z.string().max(200).optional(),
});

export type ShopBankDetails = z.infer<typeof ShopBankDetailsSchema>;

/**
 * Main Shop Schema (Firestore Document)
 */
export const ShopSchema = z.object({
  id: z.string().min(1),
  ownerId: z.string().min(1),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(250),
  description: z.string().max(2000).optional(),
  logo: z.string().url().optional(),
  banner: z.string().url().optional(),

  // Contact
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  location: z.string().max(200).optional(),

  // Address
  address: ShopAddressSchema.optional(),

  // Categories
  categories: z.array(z.string()).optional(),

  // Social
  website: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),

  // Business
  gst: z.string().min(15).max(15).optional(),
  pan: z.string().min(10).max(10).optional(),

  // Bank details
  bankDetails: ShopBankDetailsSchema.optional(),
  upiId: z.string().max(100).optional(),

  // Policies
  returnPolicy: z.string().max(5000).optional(),
  shippingPolicy: z.string().max(5000).optional(),

  // Stats
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
  productCount: z.number().int().nonnegative(),
  follower_count: z.number().int().nonnegative().optional(),

  // Flags
  isVerified: z.boolean(),
  isFeatured: z.boolean(),
  showOnHomepage: z.boolean(),
  isBanned: z.boolean(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Shop = z.infer<typeof ShopSchema>;

/**
 * Create Shop Schema (for POST requests)
 */
export const CreateShopSchema = ShopSchema.omit({
  id: true,
  rating: true,
  reviewCount: true,
  productCount: true,
  follower_count: true,
  isVerified: true,
  isBanned: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().nonnegative().default(0),
  productCount: z.number().int().nonnegative().default(0),
  follower_count: z.number().int().nonnegative().default(0),
  isVerified: z.boolean().default(false),
  isBanned: z.boolean().default(false),
});

export type CreateShop = z.infer<typeof CreateShopSchema>;

/**
 * Update Shop Schema (for PATCH requests)
 */
export const UpdateShopSchema = ShopSchema.partial().extend({
  id: z.string().min(1),
});

export type UpdateShop = z.infer<typeof UpdateShopSchema>;

/**
 * Shop Filter Schema
 */
export const ShopFilterSchema = z.object({
  ownerId: z.string().optional(),
  isVerified: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  showOnHomepage: z.boolean().optional(),
  isBanned: z.boolean().optional(),
  minRating: z.number().min(0).max(5).optional(),
  minProducts: z.number().int().nonnegative().optional(),
  categories: z.array(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
});

export type ShopFilter = z.infer<typeof ShopFilterSchema>;

/**
 * Validation Helpers
 */

export const validateShop = (data: unknown) => {
  return ShopSchema.parse(data);
};

export const validateCreateShop = (data: unknown) => {
  return CreateShopSchema.parse(data);
};

export const validateUpdateShop = (data: unknown) => {
  return UpdateShopSchema.parse(data);
};

export const validateShopFilter = (data: unknown) => {
  return ShopFilterSchema.parse(data);
};
