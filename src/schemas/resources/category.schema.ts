/**
 * Category Resource Schema
 * Backend database schema with Zod validation
 */

import { z } from "zod";

/**
 * Main Category Schema (Firestore Document)
 */
export const CategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),

  // Hierarchy - Multiple Parents Support
  parentIds: z.array(z.string()).default([]),
  path: z.string().min(1).max(500),
  level: z.number().int().min(0).max(5),
  hasChildren: z.boolean(),
  childCount: z.number().int().nonnegative(),

  // Legacy single parent (for backward compatibility)
  parentId: z.string().nullable().optional(),

  // Creator tracking for seller-created categories
  createdBy: z.enum(["admin", "seller"]).default("admin"),
  needsReview: z.boolean().default(false),
  reviewedAt: z.date().optional(),
  reviewedBy: z.string().optional(),

  // Display
  icon: z.string().max(50).optional(),
  image: z.string().url().optional(),
  banner: z.string().url().optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  sortOrder: z.number().int().min(0),

  // Stats
  productCount: z.number().int().nonnegative(),

  // Flags
  isFeatured: z.boolean(),
  showOnHomepage: z.boolean(),
  isActive: z.boolean(),

  // SEO
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),

  // Commission
  commissionRate: z.number().min(0).max(100),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Category = z.infer<typeof CategorySchema>;

/**
 * Create Category Schema (for POST requests)
 */
export const CreateCategorySchema = CategorySchema.omit({
  id: true,
  hasChildren: true,
  childCount: true,
  productCount: true,
  createdAt: true,
  updatedAt: true,
  reviewedAt: true,
  reviewedBy: true,
}).extend({
  hasChildren: z.boolean().default(false),
  childCount: z.number().int().nonnegative().default(0),
  productCount: z.number().int().nonnegative().default(0),
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;

/**
 * Update Category Schema (for PATCH requests)
 */
export const UpdateCategorySchema = CategorySchema.partial().extend({
  id: z.string().min(1),
});

export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;

/**
 * Category Filter Schema
 */
export const CategoryFilterSchema = z.object({
  parentId: z.string().nullable().optional(),
  level: z.number().int().min(0).max(5).optional(),
  isFeatured: z.boolean().optional(),
  showOnHomepage: z.boolean().optional(),
  isActive: z.boolean().optional(),
  hasChildren: z.boolean().optional(),
  minProductCount: z.number().int().nonnegative().optional(),
});

export type CategoryFilter = z.infer<typeof CategoryFilterSchema>;

/**
 * Validation Helpers
 */

export const validateCategory = (data: unknown) => {
  return CategorySchema.parse(data);
};

export const validateCreateCategory = (data: unknown) => {
  return CreateCategorySchema.parse(data);
};

export const validateUpdateCategory = (data: unknown) => {
  return UpdateCategorySchema.parse(data);
};

export const validateCategoryFilter = (data: unknown) => {
  return CategoryFilterSchema.parse(data);
};

/**
 * Circular Reference Validation
 */
export const validateNonCircular = (
  categoryId: string,
  parentIds: string[]
): boolean => {
  // Category cannot be its own parent
  if (parentIds.includes(categoryId)) {
    return false;
  }
  return true;
};

/**
 * Quick Create Schema (Seller Inline Creation)
 */
export const QuickCreateCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  parentIds: z.array(z.string()).default([]),
  createdBy: z.literal("seller"),
  needsReview: z.literal(true),
  isActive: z.literal(false),
});

export type QuickCreateCategory = z.infer<typeof QuickCreateCategorySchema>;
