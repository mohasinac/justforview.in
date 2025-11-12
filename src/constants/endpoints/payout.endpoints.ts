/**
 * Payout API Endpoints
 * Constants for payout-related routes
 */

export const SELLER_PAYOUT_ENDPOINTS = {
  // Seller payout management
  list: "/api/seller/payouts",
  byId: (id: string) => `/api/seller/payouts/${id}`,

  // Stats
  stats: "/api/seller/payouts/stats",
  pending: "/api/seller/payouts/pending",

  // Bank account
  updateBankAccount: "/api/seller/payouts/bank-account",
} as const;

export const ADMIN_PAYOUT_ENDPOINTS = {
  // Admin payout management
  list: "/api/admin/payouts",
  byId: (id: string) => `/api/admin/payouts/${id}`,
  create: "/api/admin/payouts",
  update: (id: string) => `/api/admin/payouts/${id}`,

  // By shop/seller
  byShop: (shopId: string) => `/api/admin/shops/${shopId}/payouts`,
  bySeller: (sellerId: string) => `/api/admin/sellers/${sellerId}/payouts`,

  // Actions
  approve: (id: string) => `/api/admin/payouts/${id}/approve`,
  process: (id: string) => `/api/admin/payouts/${id}/process`,
  complete: (id: string) => `/api/admin/payouts/${id}/complete`,
  fail: (id: string) => `/api/admin/payouts/${id}/fail`,
  hold: (id: string) => `/api/admin/payouts/${id}/hold`,
  release: (id: string) => `/api/admin/payouts/${id}/release`,
  cancel: (id: string) => `/api/admin/payouts/${id}/cancel`,

  // Bulk operations
  bulkApprove: "/api/admin/payouts/bulk/approve",
  bulkProcess: "/api/admin/payouts/bulk/process",
  bulkHold: "/api/admin/payouts/bulk/hold",
  bulkCancel: "/api/admin/payouts/bulk/cancel",

  // Stats
  stats: "/api/admin/payouts/stats",
  analytics: "/api/admin/payouts/analytics",

  // Export
  export: "/api/admin/payouts/export",
} as const;

export type SellerPayoutEndpoint =
  (typeof SELLER_PAYOUT_ENDPOINTS)[keyof typeof SELLER_PAYOUT_ENDPOINTS];
export type AdminPayoutEndpoint =
  (typeof ADMIN_PAYOUT_ENDPOINTS)[keyof typeof ADMIN_PAYOUT_ENDPOINTS];
