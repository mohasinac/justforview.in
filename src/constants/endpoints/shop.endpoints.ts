/**
 * Shop API Endpoints
 * Centralized shop endpoint constants
 */

/**
 * Public Shop Endpoints
 */
export const SHOP_ENDPOINTS = {
  // List & Search
  LIST: "/api/shops",
  SEARCH: "/api/shops/search",
  FEATURED: "/api/shops/featured",
  VERIFIED: "/api/shops/verified",
  TOP_RATED: "/api/shops/top-rated",

  // Single Shop
  BY_ID: (id: string) => `/api/shops/${id}`,
  BY_SLUG: (slug: string) => `/api/shops/slug/${slug}`,
  FOR_EDIT: (id: string) => `/api/shops/${id}/edit`,

  // Shop Content
  PRODUCTS: (shopId: string) => `/api/shops/${shopId}/products`,
  AUCTIONS: (shopId: string) => `/api/shops/${shopId}/auctions`,
  REVIEWS: (shopId: string) => `/api/shops/${shopId}/reviews`,

  // Interactions
  FOLLOW: (shopId: string) => `/api/shops/${shopId}/follow`,
  UNFOLLOW: (shopId: string) => `/api/shops/${shopId}/unfollow`,
  FOLLOWERS: (shopId: string) => `/api/shops/${shopId}/followers`,

  // Stats
  STATS: (shopId: string) => `/api/shops/${shopId}/stats`,
} as const;

/**
 * Seller Shop Endpoints
 */
export const SELLER_SHOP_ENDPOINTS = {
  // My Shop
  MY_SHOP: "/api/seller/shop",
  CREATE: "/api/seller/shop",
  UPDATE: "/api/seller/shop",
  DELETE: "/api/seller/shop",

  // Media
  UPLOAD_LOGO: "/api/seller/shop/logo",
  UPLOAD_BANNER: "/api/seller/shop/banner",
  DELETE_LOGO: "/api/seller/shop/logo",
  DELETE_BANNER: "/api/seller/shop/banner",

  // Business Info
  UPDATE_BUSINESS: "/api/seller/shop/business",
  UPDATE_BANK: "/api/seller/shop/bank",
  UPDATE_POLICIES: "/api/seller/shop/policies",

  // Analytics
  ANALYTICS: "/api/seller/shop/analytics",
  PERFORMANCE: "/api/seller/shop/performance",
  REVENUE: "/api/seller/shop/revenue",
  ORDERS: "/api/seller/shop/orders",

  // Verification
  REQUEST_VERIFICATION: "/api/seller/shop/verify",
  VERIFICATION_STATUS: "/api/seller/shop/verification-status",
} as const;

/**
 * Admin Shop Endpoints
 */
export const ADMIN_SHOP_ENDPOINTS = {
  // CRUD
  LIST: "/api/admin/shops",
  CREATE: "/api/admin/shops",
  GET: (id: string) => `/api/admin/shops/${id}`,
  UPDATE: (id: string) => `/api/admin/shops/${id}`,
  DELETE: (id: string) => `/api/admin/shops/${id}`,

  // Bulk Operations
  BULK_UPDATE: "/api/admin/shops/bulk/update",
  BULK_DELETE: "/api/admin/shops/bulk/delete",
  BULK_BAN: "/api/admin/shops/bulk/ban",
  BULK_UNBAN: "/api/admin/shops/bulk/unban",
  BULK_VERIFY: "/api/admin/shops/bulk/verify",
  BULK_FEATURE: "/api/admin/shops/bulk/feature",

  // Verification
  PENDING_VERIFICATION: "/api/admin/shops/pending-verification",
  VERIFY: (id: string) => `/api/admin/shops/${id}/verify`,
  REJECT_VERIFICATION: (id: string) =>
    `/api/admin/shops/${id}/reject-verification`,

  // Moderation
  BAN: (id: string) => `/api/admin/shops/${id}/ban`,
  UNBAN: (id: string) => `/api/admin/shops/${id}/unban`,
  FLAG: (id: string) => `/api/admin/shops/${id}/flag`,
  UNFLAG: (id: string) => `/api/admin/shops/${id}/unflag`,

  // Analytics
  STATS: "/api/admin/shops/stats",
  REPORTS: "/api/admin/shops/reports",
  TOP_SHOPS: "/api/admin/shops/top",
  REVENUE: "/api/admin/shops/revenue",
  PERFORMANCE: "/api/admin/shops/performance",

  // Import/Export
  EXPORT: "/api/admin/shops/export",
  IMPORT: "/api/admin/shops/import",
} as const;

/**
 * Shop Filter Parameters Interface
 */
export interface ShopFilterParams {
  ownerId?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  showOnHomepage?: boolean;
  isBanned?: boolean;
  minRating?: number;
  minProducts?: number;
  categories?: string[];
  city?: string;
  state?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Build query string from filter parameters
 */
export const buildShopQueryString = (params: ShopFilterParams): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * Build full shop URL with filters
 */
export const buildShopUrl = (
  endpoint: string,
  params?: ShopFilterParams
): string => {
  if (!params) return endpoint;
  const queryString = buildShopQueryString(params);
  return `${endpoint}${queryString}`;
};
