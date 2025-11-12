/**
 * Product Resource Schema (Backend/Firestore)
 *
 * Defines the structure of Product documents as stored in Firestore.
 * Used for validation, type inference, and database operations.
 */

import { z } from "zod";

/**
 * Product Condition Enum
 */
export const ProductConditionEnum = z.enum(["new", "used", "refurbished"]);
export type ProductCondition = z.infer<typeof ProductConditionEnum>;

/**
 * Product Status Enum
 */
export const ProductStatusEnum = z.enum([
  "draft",
  "published",
  "archived",
  "out-of-stock",
]);
export type ProductStatus = z.infer<typeof ProductStatusEnum>;

/**
 * Shipping Class Enum
 */
export const ShippingClassEnum = z.enum([
  "standard",
  "express",
  "heavy",
  "fragile",
]);
export type ShippingClass = z.infer<typeof ShippingClassEnum>;

/**
 * Product Specification Schema
 */
export const ProductSpecificationSchema = z.object({
  name: z.string().min(1, "Specification name is required"),
  value: z.string().min(1, "Specification value is required"),
});
export type ProductSpecification = z.infer<typeof ProductSpecificationSchema>;

/**
 * Product Variant Schema
 */
export const ProductVariantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  value: z.string().min(1, "Variant value is required"),
  priceAdjustment: z.number().optional(),
  stockCount: z.number().int().min(0).optional(),
  sku: z.string().optional(),
});
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

/**
 * Product Dimensions Schema
 */
export const ProductDimensionsSchema = z.object({
  length: z.number().positive("Length must be positive"),
  width: z.number().positive("Width must be positive"),
  height: z.number().positive("Height must be positive"),
  unit: z.enum(["cm", "inch"]),
  weight: z.number().positive("Weight must be positive"),
  weightUnit: z.enum(["kg", "g", "lb"]),
});
export type ProductDimensions = z.infer<typeof ProductDimensionsSchema>;

/**
 * Complete Product Schema (Firestore Document)
 */
export const ProductSchema = z.object({
  // IDs
  id: z.string(),
  shopId: z.string(),
  categoryId: z.string(),

  // Basic Info
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(200, "Product name is too long"),
  slug: z
    .string()
    .min(3)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  description: z.string().min(20, "Description must be at least 20 characters"),
  shortDescription: z.string().max(200).optional(),

  // Pricing
  price: z.number().positive("Price must be positive"),
  originalPrice: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),

  // Inventory
  stockCount: z.number().int().min(0, "Stock count cannot be negative"),
  lowStockThreshold: z.number().int().min(0).default(10),
  sku: z.string().optional(),

  // Details
  condition: ProductConditionEnum,
  brand: z.string().optional(),
  manufacturer: z.string().optional(),
  countryOfOrigin: z.string().default("India"),

  // Media
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  videos: z.array(z.string().url()).optional(),

  // Specifications
  specifications: z.array(ProductSpecificationSchema).optional(),
  variants: z.array(ProductVariantSchema).optional(),
  dimensions: ProductDimensionsSchema.optional(),

  // Shipping
  shippingClass: ShippingClassEnum.optional(),

  // Tags
  tags: z.array(z.string()).optional(),

  // Policies
  isReturnable: z.boolean().default(true),
  returnWindowDays: z.number().int().min(0).max(90).default(7),
  warranty: z.string().optional(),

  // SEO
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),

  // Scheduling
  publishDate: z.date().optional(),

  // Stats
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  salesCount: z.number().int().min(0).default(0),
  viewCount: z.number().int().min(0).default(0),

  // Status
  status: ProductStatusEnum,

  // Flags
  isFeatured: z.boolean().default(false),
  showOnHomepage: z.boolean().default(false),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Product = z.infer<typeof ProductSchema>;

/**
 * Create Product Schema (for new products)
 * Omits auto-generated fields
 */
export const CreateProductSchema = ProductSchema.omit({
  id: true,
  rating: true,
  reviewCount: true,
  salesCount: true,
  viewCount: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  // Make some fields optional for creation
  slug: z.string().optional(), // Can be auto-generated
  status: ProductStatusEnum.default("draft"),
});

export type CreateProduct = z.infer<typeof CreateProductSchema>;

/**
 * Update Product Schema (for updates)
 * All fields optional except ID
 */
export const UpdateProductSchema = ProductSchema.partial().required({
  id: true,
});

export type UpdateProduct = z.infer<typeof UpdateProductSchema>;

/**
 * Product Filter Schema
 */
export const ProductFilterSchema = z.object({
  shopId: z.string().optional(),
  categoryId: z.string().optional(),
  status: ProductStatusEnum.optional(),
  condition: ProductConditionEnum.optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  minRating: z.number().min(0).max(5).optional(),
  brand: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  showOnHomepage: z.boolean().optional(),
  inStock: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sort: z
    .enum(["newest", "oldest", "price-asc", "price-desc", "popular", "rating"])
    .default("newest"),
});

export type ProductFilter = z.infer<typeof ProductFilterSchema>;

/**
 * Validation helper functions
 */
export function validateProduct(data: unknown): Product {
  return ProductSchema.parse(data);
}

export function validateCreateProduct(data: unknown): CreateProduct {
  return CreateProductSchema.parse(data);
}

export function validateUpdateProduct(data: unknown): UpdateProduct {
  return UpdateProductSchema.parse(data);
}

export function validateProductFilter(data: unknown): ProductFilter {
  return ProductFilterSchema.parse(data);
}
