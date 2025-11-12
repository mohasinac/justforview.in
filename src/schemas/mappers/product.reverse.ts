/**
 * Product Reverse Mapper
 * Transforms ProductUI (frontend display) back to Product (backend format)
 *
 * Used by edit forms to extract raw values before API submission
 */

import type { ProductUI } from "@/schemas/ui/product.ui";
import type {
  Product,
  ProductUpdateInput,
} from "@/schemas/resources/product.schema";

/**
 * Extract backend Product format from ProductUI
 * Extracts raw values from nested display objects
 *
 * @param productUI - Frontend ProductUI with nested display objects
 * @returns Partial Product data suitable for backend API
 */
export function productUIToBackend(productUI: ProductUI): Partial<Product> {
  return {
    // Basic fields (unchanged)
    name: productUI.name,
    slug: productUI.slug,
    description: productUI.description,
    sku: productUI.sku,

    // Extract raw price values
    price: productUI.price.raw,
    compareAtPrice: productUI.compareAtPrice?.raw,
    costPrice: productUI.costPrice?.raw,

    // Extract stock values
    stockCount: productUI.stock.count,
    lowStockThreshold: productUI.stock.lowStockThreshold,

    // Extract status value
    status: productUI.status.value,

    // Extract condition value
    condition: productUI.condition.value,

    // Extract IDs from nested objects
    categoryId: productUI.category?.id,
    shopId: productUI.shop?.id,

    // Tags (unchanged)
    tags: productUI.tags,

    // Images (extract URLs from image display objects if needed)
    images: productUI.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      isPrimary: img.isPrimary,
    })),

    // Weight and dimensions (unchanged)
    weight: productUI.weight,
    dimensions: productUI.dimensions,

    // Shipping (unchanged)
    shippingClass: productUI.shippingClass,

    // Return policy
    isReturnable: productUI.returnPolicy?.isAllowed,
    returnWindowDays: productUI.returnPolicy?.windowDays,

    // SEO (unchanged)
    metaTitle: productUI.seo?.title,
    metaDescription: productUI.seo?.description,
    metaKeywords: productUI.seo?.keywords,

    // Variants (if any)
    hasVariants: productUI.hasVariants,
    variants: productUI.variants,
  };
}

/**
 * Extract only editable fields from ProductUI for updates
 * Excludes computed/read-only fields like stats, ratings, etc.
 *
 * @param productUI - Frontend ProductUI
 * @returns ProductUpdateInput suitable for PATCH requests
 */
export function productUIToUpdateInput(
  productUI: ProductUI
): ProductUpdateInput {
  return {
    name: productUI.name,
    description: productUI.description,
    price: productUI.price.raw,
    compareAtPrice: productUI.compareAtPrice?.raw,
    costPrice: productUI.costPrice?.raw,
    stockCount: productUI.stock.count,
    lowStockThreshold: productUI.stock.lowStockThreshold,
    status: productUI.status.value,
    condition: productUI.condition.value,
    categoryId: productUI.category?.id,
    tags: productUI.tags,
    weight: productUI.weight,
    dimensions: productUI.dimensions,
    shippingClass: productUI.shippingClass,
    isReturnable: productUI.returnPolicy?.isAllowed,
    returnWindowDays: productUI.returnPolicy?.windowDays,
    metaTitle: productUI.seo?.title,
    metaDescription: productUI.seo?.description,
    metaKeywords: productUI.seo?.keywords,
  };
}

/**
 * Extract form field values from ProductUI
 * Used to populate edit form state with raw values
 *
 * @param productUI - Frontend ProductUI
 * @returns Plain object with raw values for form fields
 */
export function productUIToFormState(productUI: ProductUI) {
  return {
    name: productUI.name,
    slug: productUI.slug,
    description: productUI.description,
    sku: productUI.sku || "",

    // Raw numeric values for form inputs
    price: productUI.price.raw,
    compareAtPrice: productUI.compareAtPrice?.raw || 0,
    costPrice: productUI.costPrice?.raw || 0,

    // Stock fields
    stockCount: productUI.stock.count,
    lowStockThreshold: productUI.stock.lowStockThreshold || 0,

    // Status/condition values (string enums)
    status: productUI.status.value,
    condition: productUI.condition.value,

    // IDs for select inputs
    categoryId: productUI.category?.id || "",
    shopId: productUI.shop?.id || "",

    // Arrays
    tags: productUI.tags || [],
    images: productUI.images || [],

    // Numbers
    weight: productUI.weight || 0,

    // Dimensions
    length: productUI.dimensions?.length || 0,
    width: productUI.dimensions?.width || 0,
    height: productUI.dimensions?.height || 0,

    // Shipping
    shippingClass: productUI.shippingClass || "standard",

    // Return policy
    isReturnable: productUI.returnPolicy?.isAllowed || false,
    returnWindowDays: productUI.returnPolicy?.windowDays || 0,

    // SEO
    metaTitle: productUI.seo?.title || "",
    metaDescription: productUI.seo?.description || "",
    metaKeywords: productUI.seo?.keywords || [],

    // Variants
    hasVariants: productUI.hasVariants || false,
    variants: productUI.variants || [],
  };
}
