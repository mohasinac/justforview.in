/**
 * Product API Endpoints
 * 
 * Centralized endpoint definitions for Product resource.
 * Used by services and API routes.
 */

/**
 * Public Product Endpoints
 */
export const PRODUCT_ENDPOINTS = {
  // List & Search
  LIST: '/products',
  SEARCH: '/products/search',
  FEATURED: '/products/featured',
  HOMEPAGE: '/products/homepage',
  TRENDING: '/products/trending',
  NEW_ARRIVALS: '/products/new-arrivals',
  BEST_SELLERS: '/products/best-sellers',

  // Single Product
  BY_ID: (id: string) => `/products/${id}`,
  BY_SLUG: (slug: string) => `/products/slug/${slug}`,

  // Product Relationships
  RELATED: (id: string) => `/products/${id}/related`,
  SIMILAR: (id: string) => `/products/${id}/similar`,
  FREQUENTLY_BOUGHT: (id: string) => `/products/${id}/frequently-bought`,

  // Product Reviews
  REVIEWS: (id: string) => `/products/${id}/reviews`,
  ADD_REVIEW: (id: string) => `/products/${id}/reviews`,

  // Product Interactions
  VIEW: (id: string) => `/products/${id}/view`,
  FAVORITE: (id: string) => `/products/${id}/favorite`,
  UNFAVORITE: (id: string) => `/products/${id}/unfavorite`,

  // Validation
  VALIDATE_SLUG: '/products/validate-slug',
  CHECK_AVAILABILITY: (id: string) => `/products/${id}/availability`,
} as const;

/**
 * Seller Product Endpoints
 */
export const SELLER_PRODUCT_ENDPOINTS = {
  // CRUD
  LIST: '/seller/products',
  CREATE: '/seller/products',
  BY_ID: (id: string) => `/seller/products/${id}`,
  UPDATE: (id: string) => `/seller/products/${id}`,
  DELETE: (id: string) => `/seller/products/${id}`,

  // Bulk Operations
  BULK: '/seller/products/bulk',
  BULK_UPDATE: '/seller/products/bulk/update',
  BULK_DELETE: '/seller/products/bulk/delete',
  BULK_PUBLISH: '/seller/products/bulk/publish',
  BULK_ARCHIVE: '/seller/products/bulk/archive',
  BULK_UPDATE_STOCK: '/seller/products/bulk/stock',
  BULK_UPDATE_PRICE: '/seller/products/bulk/price',

  // Media Management
  UPLOAD_IMAGE: (id: string) => `/seller/products/${id}/images`,
  DELETE_IMAGE: (id: string, imageId: string) => `/seller/products/${id}/images/${imageId}`,
  REORDER_IMAGES: (id: string) => `/seller/products/${id}/images/reorder`,
  UPLOAD_VIDEO: (id: string) => `/seller/products/${id}/videos`,
  DELETE_VIDEO: (id: string, videoId: string) => `/seller/products/${id}/videos/${videoId}`,

  // Stock Management
  UPDATE_STOCK: (id: string) => `/seller/products/${id}/stock`,
  LOW_STOCK_ALERT: '/seller/products/low-stock',

  // Analytics
  ANALYTICS: (id: string) => `/seller/products/${id}/analytics`,
  PERFORMANCE: '/seller/products/performance',

  // Import/Export
  IMPORT: '/seller/products/import',
  EXPORT: '/seller/products/export',
  TEMPLATE: '/seller/products/template',
} as const;

/**
 * Admin Product Endpoints
 */
export const ADMIN_PRODUCT_ENDPOINTS = {
  // CRUD
  LIST: '/admin/products',
  CREATE: '/admin/products',
  BY_ID: (id: string) => `/admin/products/${id}`,
  UPDATE: (id: string) => `/admin/products/${id}`,
  DELETE: (id: string) => `/admin/products/${id}`,

  // Bulk Operations
  BULK: '/admin/products/bulk',
  BULK_UPDATE: '/admin/products/bulk/update',
  BULK_DELETE: '/admin/products/bulk/delete',
  BULK_PUBLISH: '/admin/products/bulk/publish',
  BULK_ARCHIVE: '/admin/products/bulk/archive',
  BULK_FEATURE: '/admin/products/bulk/feature',
  BULK_UNFEATURE: '/admin/products/bulk/unfeature',

  // Moderation
  APPROVE: (id: string) => `/admin/products/${id}/approve`,
  REJECT: (id: string) => `/admin/products/${id}/reject`,
  FLAG: (id: string) => `/admin/products/${id}/flag`,
  UNFLAG: (id: string) => `/admin/products/${id}/unflag`,

  // Analytics & Reports
  ANALYTICS: '/admin/products/analytics',
  REPORTS: '/admin/products/reports',
  LOW_STOCK: '/admin/products/low-stock',
  OUT_OF_STOCK: '/admin/products/out-of-stock',
  TOP_SELLING: '/admin/products/top-selling',
  LEAST_SELLING: '/admin/products/least-selling',

  // Import/Export
  IMPORT: '/admin/products/import',
  EXPORT: '/admin/products/export',
  TEMPLATE: '/admin/products/template',
} as const;

/**
 * Product Filter Parameters
 */
export interface ProductFilterParams {
  // Pagination
  page?: number;
  limit?: number;

  // Sorting
  sort?: 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'popular' | 'rating' | 'name-asc' | 'name-desc';

  // Search
  search?: string;

  // Filters
  shopId?: string;
  categoryId?: string;
  status?: 'draft' | 'published' | 'archived' | 'out-of-stock';
  condition?: 'new' | 'used' | 'refurbished';
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  brand?: string;
  tags?: string[];
  
  // Flags
  isFeatured?: boolean;
  showOnHomepage?: boolean;
  inStock?: boolean;
  isReturnable?: boolean;
  hasDiscount?: boolean;

  // Date filters
  createdAfter?: string;
  createdBefore?: string;
  publishedAfter?: string;
  publishedBefore?: string;
}

/**
 * Helper to build product query string
 */
export function buildProductQueryString(params: ProductFilterParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Helper to build full product URL
 */
export function buildProductUrl(endpoint: string, params?: ProductFilterParams): string {
  if (!params) return endpoint;
  return `${endpoint}${buildProductQueryString(params)}`;
}

/**
 * All Product Endpoints
 */
export const ALL_PRODUCT_ENDPOINTS = {
  PUBLIC: PRODUCT_ENDPOINTS,
  SELLER: SELLER_PRODUCT_ENDPOINTS,
  ADMIN: ADMIN_PRODUCT_ENDPOINTS,
} as const;
