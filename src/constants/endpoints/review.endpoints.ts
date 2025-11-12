/**
 * Review API Endpoints
 * Constants for review-related routes
 */

export const REVIEW_ENDPOINTS = {
  // Public review endpoints
  list: "/api/reviews",
  byId: (id: string) => `/api/reviews/${id}`,
  forEdit: (id: string) => `/api/reviews/${id}/edit`,
  byProduct: (productId: string) => `/api/products/${productId}/reviews`,
  byShop: (shopId: string) => `/api/shops/${shopId}/reviews`,
  byAuction: (auctionId: string) => `/api/auctions/${auctionId}/reviews`,
  byCategory: (categoryId: string) => `/api/categories/${categoryId}/reviews`,

  // Create review
  create: "/api/reviews",

  // Review actions
  helpful: (id: string) => `/api/reviews/${id}/helpful`,
  unhelpful: (id: string) => `/api/reviews/${id}/unhelpful`,
  report: (id: string) => `/api/reviews/${id}/report`,

  // Stats
  stats: (productId: string) => `/api/products/${productId}/reviews/stats`,
  distribution: (productId: string) =>
    `/api/products/${productId}/reviews/distribution`,

  // Featured reviews
  featured: "/api/reviews/featured",
  homepage: "/api/reviews/homepage",
} as const;

export const USER_REVIEW_ENDPOINTS = {
  // User's own reviews
  list: "/api/user/reviews",
  byId: (id: string) => `/api/user/reviews/${id}`,
  create: "/api/user/reviews",
  update: (id: string) => `/api/user/reviews/${id}`,
  delete: (id: string) => `/api/user/reviews/${id}`,

  // Upload media
  uploadMedia: (id: string) => `/api/user/reviews/${id}/media`,
  deleteMedia: (id: string, mediaUrl: string) =>
    `/api/user/reviews/${id}/media`,

  // Check if user can review
  canReview: (productId: string) =>
    `/api/user/products/${productId}/can-review`,
  canReviewShop: (shopId: string) => `/api/user/shops/${shopId}/can-review`,
} as const;

export const ADMIN_REVIEW_ENDPOINTS = {
  // Admin review management
  list: "/api/admin/reviews",
  byId: (id: string) => `/api/admin/reviews/${id}`,
  pending: "/api/admin/reviews/pending",
  reported: "/api/admin/reviews/reported",

  // Moderation
  approve: (id: string) => `/api/admin/reviews/${id}/approve`,
  reject: (id: string) => `/api/admin/reviews/${id}/reject`,
  delete: (id: string) => `/api/admin/reviews/${id}`,

  // Feature management
  feature: (id: string) => `/api/admin/reviews/${id}/feature`,
  unfeature: (id: string) => `/api/admin/reviews/${id}/unfeature`,
  setHomepage: (id: string) => `/api/admin/reviews/${id}/homepage`,
  removeHomepage: (id: string) => `/api/admin/reviews/${id}/homepage`,

  // Bulk operations
  bulkApprove: "/api/admin/reviews/bulk/approve",
  bulkReject: "/api/admin/reviews/bulk/reject",
  bulkDelete: "/api/admin/reviews/bulk/delete",
  bulkFeature: "/api/admin/reviews/bulk/feature",

  // Stats
  stats: "/api/admin/reviews/stats",

  // Export
  export: "/api/admin/reviews/export",
} as const;

export type ReviewEndpoint =
  (typeof REVIEW_ENDPOINTS)[keyof typeof REVIEW_ENDPOINTS];
export type UserReviewEndpoint =
  (typeof USER_REVIEW_ENDPOINTS)[keyof typeof USER_REVIEW_ENDPOINTS];
export type AdminReviewEndpoint =
  (typeof ADMIN_REVIEW_ENDPOINTS)[keyof typeof ADMIN_REVIEW_ENDPOINTS];
