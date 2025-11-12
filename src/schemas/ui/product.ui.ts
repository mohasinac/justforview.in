/**
 * Product UI Schema (Frontend)
 *
 * Defines the structure of Product data as displayed in the UI.
 * Includes formatted values, computed fields, and display helpers.
 */

import type {
  ProductStatus,
  ProductCondition,
} from "@/schemas/resources/product.schema";

/**
 * Price Display Information
 */
export interface PriceDisplay {
  /** Raw price value */
  amount: number;
  /** Formatted price string (e.g., "₹1,999.99") */
  formatted: string;
  /** Currency symbol */
  currency: string;
  /** Currency code (INR, USD, etc.) */
  currencyCode: string;
}

/**
 * Discount Information
 */
export interface DiscountInfo {
  /** Discount amount */
  amount: number;
  /** Discount percentage */
  percentage: number;
  /** Formatted discount label (e.g., "20% OFF") */
  label: string;
  /** Savings amount formatted */
  savingsFormatted: string;
}

/**
 * Stock Status Information
 */
export interface StockStatus {
  /** Stock count */
  count: number;
  /** Is in stock */
  inStock: boolean;
  /** Is low stock */
  isLow: boolean;
  /** Is out of stock */
  outOfStock: boolean;
  /** Display label */
  label: string;
  /** CSS class for styling */
  className: string;
  /** Badge variant */
  badgeVariant: "success" | "warning" | "danger" | "default";
}

/**
 * Product Status Display
 */
export interface StatusDisplay {
  /** Status value */
  value: ProductStatus;
  /** Display label */
  label: string;
  /** Status color */
  color: string;
  /** CSS class */
  className: string;
  /** Icon name */
  icon?: string;
}

/**
 * Product Rating Display
 */
export interface RatingDisplay {
  /** Average rating (0-5) */
  average: number;
  /** Formatted rating (e.g., "4.5") */
  formatted: string;
  /** Review count */
  reviewCount: number;
  /** Review count formatted (e.g., "1.2k reviews") */
  reviewCountFormatted: string;
  /** Star display array [1, 1, 1, 1, 0.5] */
  stars: number[];
  /** Has reviews */
  hasReviews: boolean;
}

/**
 * Product Badge
 */
export interface ProductBadge {
  /** Badge text */
  text: string;
  /** Badge color */
  color: string;
  /** CSS class */
  className: string;
  /** Icon */
  icon?: string;
}

/**
 * Product Image
 */
export interface ProductImage {
  /** Original URL */
  url: string;
  /** Thumbnail URL */
  thumbnail?: string;
  /** Alt text */
  alt: string;
  /** Is primary image */
  isPrimary: boolean;
}

/**
 * Product Specification (Display)
 */
export interface ProductSpecificationUI {
  name: string;
  value: string;
  /** Icon for the specification */
  icon?: string;
}

/**
 * Product Variant (Display)
 */
export interface ProductVariantUI {
  name: string;
  value: string;
  priceAdjustment?: number;
  priceAdjustmentFormatted?: string;
  inStock: boolean;
  stockCount?: number;
  sku?: string;
}

/**
 * Shipping Information
 */
export interface ShippingInfo {
  /** Shipping class */
  class?: string;
  /** Estimated days */
  estimatedDays?: number;
  /** Display label */
  label: string;
  /** Is free shipping */
  isFree: boolean;
  /** Cost (if not free) */
  cost?: number;
  /** Formatted cost */
  costFormatted?: string;
}

/**
 * Return Policy Display
 */
export interface ReturnPolicyDisplay {
  /** Is returnable */
  isReturnable: boolean;
  /** Return window in days */
  windowDays: number;
  /** Display label */
  label: string;
  /** Icon */
  icon: string;
}

/**
 * Complete Product UI Schema
 * Used in components, pages, and UI logic
 */
export interface ProductUI {
  // IDs
  id: string;
  shopId: string;
  categoryId: string;

  // Basic Info
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;

  // Pricing
  price: PriceDisplay;
  originalPrice?: PriceDisplay;
  discount?: DiscountInfo;

  // Inventory
  stock: StockStatus;
  sku?: string;

  // Details
  condition: {
    value: ProductCondition;
    label: string;
  };
  brand?: string;
  manufacturer?: string;
  countryOfOrigin: string;

  // Media
  images: ProductImage[];
  videos?: string[];
  primaryImage: ProductImage;

  // Specifications
  specifications?: ProductSpecificationUI[];
  variants?: ProductVariantUI[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
    weight: number;
    weightUnit: string;
    formatted: string;
  };

  // Shipping
  shipping: ShippingInfo;

  // Tags
  tags?: string[];

  // Policies
  returnPolicy: ReturnPolicyDisplay;
  warranty?: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Stats
  rating: RatingDisplay;
  salesCount: number;
  salesCountFormatted: string;
  viewCount: number;
  viewCountFormatted: string;

  // Status
  status: StatusDisplay;

  // Flags
  isFeatured: boolean;
  showOnHomepage: boolean;

  // Badges
  badges: ProductBadge[];

  // URLs
  url: string;
  shareUrl: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  createdAtFormatted: string;
  updatedAtFormatted: string;
  publishDate?: Date;
  publishDateFormatted?: string;

  // Shop Info (populated if needed)
  shop?: {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    rating: number;
    isVerified: boolean;
  };

  // Category Info (populated if needed)
  category?: {
    id: string;
    name: string;
    slug: string;
    path: string;
  };
}

/**
 * Product Card UI (Simplified for cards)
 */
export interface ProductCardUI {
  id: string;
  name: string;
  slug: string;
  price: PriceDisplay;
  originalPrice?: PriceDisplay;
  discount?: DiscountInfo;
  primaryImage: ProductImage;
  rating: RatingDisplay;
  stock: StockStatus;
  badges: ProductBadge[];
  url: string;
  isFeatured: boolean;
}

/**
 * Product List Item UI (Simplified for lists)
 */
export interface ProductListItemUI {
  id: string;
  name: string;
  slug: string;
  price: PriceDisplay;
  primaryImage: ProductImage;
  stock: StockStatus;
  status: StatusDisplay;
  url: string;
  shop: {
    id: string;
    name: string;
  };
}

/**
 * Product Form Data (For create/edit forms)
 */
export interface ProductFormData {
  name: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  costPrice?: number;
  stockCount: number;
  lowStockThreshold: number;
  sku?: string;
  condition: ProductCondition;
  brand?: string;
  manufacturer?: string;
  countryOfOrigin: string;
  images: string[];
  videos?: string[];
  specifications?: Array<{ name: string; value: string }>;
  variants?: Array<{
    name: string;
    value: string;
    priceAdjustment?: number;
    stockCount?: number;
  }>;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: "cm" | "inch";
    weight: number;
    weightUnit: "kg" | "g" | "lb";
  };
  shippingClass?: string;
  tags?: string[];
  isReturnable: boolean;
  returnWindowDays: number;
  warranty?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: ProductStatus;
  isFeatured: boolean;
  showOnHomepage: boolean;
  publishDate?: Date;
}
