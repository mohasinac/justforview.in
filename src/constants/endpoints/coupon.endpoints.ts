/**
 * Coupon API Endpoints
 * Constants for coupon-related routes
 */

export const COUPON_ENDPOINTS = {
  // Public coupon endpoints
  list: "/api/coupons",
  byId: (id: string) => `/api/coupons/${id}`,
  byCode: (code: string) => `/api/coupons/code/${code}`,
  validate: "/api/coupons/validate",
  featured: "/api/coupons/featured",

  // Shop coupons
  byShop: (shopId: string) => `/api/shops/${shopId}/coupons`,

  // Category coupons
  byCategory: (categoryId: string) => `/api/categories/${categoryId}/coupons`,

  // Product coupons
  byProduct: (productId: string) => `/api/products/${productId}/coupons`,

  // Auto-apply
  autoApply: "/api/coupons/auto-apply",
} as const;

export const SELLER_COUPON_ENDPOINTS = {
  // Seller coupon management
  list: "/api/seller/coupons",
  byId: (id: string) => `/api/seller/coupons/${id}`,
  create: "/api/seller/coupons",
  update: (id: string) => `/api/seller/coupons/${id}`,
  delete: (id: string) => `/api/seller/coupons/${id}`,

  // Coupon status
  activate: (id: string) => `/api/seller/coupons/${id}/activate`,
  deactivate: (id: string) => `/api/seller/coupons/${id}/deactivate`,

  // Coupon usage
  usage: (id: string) => `/api/seller/coupons/${id}/usage`,
  usageStats: (id: string) => `/api/seller/coupons/${id}/stats`,

  // Bulk operations
  bulkActivate: "/api/seller/coupons/bulk/activate",
  bulkDeactivate: "/api/seller/coupons/bulk/deactivate",
  bulkDelete: "/api/seller/coupons/bulk/delete",
} as const;

export const ADMIN_COUPON_ENDPOINTS = {
  // Admin coupon management
  list: "/api/admin/coupons",
  byId: (id: string) => `/api/admin/coupons/${id}`,
  create: "/api/admin/coupons",
  update: (id: string) => `/api/admin/coupons/${id}`,
  delete: (id: string) => `/api/admin/coupons/${id}`,

  // By shop
  byShop: (shopId: string) => `/api/admin/shops/${shopId}/coupons`,

  // Feature management
  feature: (id: string) => `/api/admin/coupons/${id}/feature`,
  unfeature: (id: string) => `/api/admin/coupons/${id}/unfeature`,

  // Status management
  activate: (id: string) => `/api/admin/coupons/${id}/activate`,
  deactivate: (id: string) => `/api/admin/coupons/${id}/deactivate`,
  expire: (id: string) => `/api/admin/coupons/${id}/expire`,

  // Bulk operations
  bulkActivate: "/api/admin/coupons/bulk/activate",
  bulkDeactivate: "/api/admin/coupons/bulk/deactivate",
  bulkDelete: "/api/admin/coupons/bulk/delete",
  bulkFeature: "/api/admin/coupons/bulk/feature",

  // Analytics
  stats: "/api/admin/coupons/stats",
  usage: "/api/admin/coupons/usage",

  // Export
  export: "/api/admin/coupons/export",
} as const;

export type CouponEndpoint =
  (typeof COUPON_ENDPOINTS)[keyof typeof COUPON_ENDPOINTS];
export type SellerCouponEndpoint =
  (typeof SELLER_COUPON_ENDPOINTS)[keyof typeof SELLER_COUPON_ENDPOINTS];
export type AdminCouponEndpoint =
  (typeof ADMIN_COUPON_ENDPOINTS)[keyof typeof ADMIN_COUPON_ENDPOINTS];
