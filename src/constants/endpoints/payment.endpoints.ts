/**
 * Payment API Endpoints
 * Constants for payment-related routes
 */

export const PAYMENT_ENDPOINTS = {
  // User payments
  list: "/api/user/payments",
  byId: (id: string) => `/api/user/payments/${id}`,
  create: "/api/user/payments",

  // By order
  byOrder: (orderId: string) => `/api/user/orders/${orderId}/payments`,

  // Actions
  verify: (id: string) => `/api/user/payments/${id}/verify`,
  cancel: (id: string) => `/api/user/payments/${id}/cancel`,
} as const;

export const SELLER_PAYMENT_ENDPOINTS = {
  // Seller payment management
  list: "/api/seller/payments",
  byId: (id: string) => `/api/seller/payments/${id}`,

  // Stats
  stats: "/api/seller/payments/stats",

  // Settlement
  settlements: "/api/seller/payments/settlements",
} as const;

export const ADMIN_PAYMENT_ENDPOINTS = {
  // Admin payment management
  list: "/api/admin/payments",
  byId: (id: string) => `/api/admin/payments/${id}`,
  update: (id: string) => `/api/admin/payments/${id}`,

  // By user/shop
  byUser: (userId: string) => `/api/admin/users/${userId}/payments`,
  byShop: (shopId: string) => `/api/admin/shops/${shopId}/payments`,

  // Refunds
  initiateRefund: (id: string) => `/api/admin/payments/${id}/refund`,
  processRefund: (id: string) => `/api/admin/payments/${id}/refund/process`,

  // Settlement
  markSettled: (id: string) => `/api/admin/payments/${id}/settle`,
  bulkSettle: "/api/admin/payments/bulk/settle",

  // Stats
  stats: "/api/admin/payments/stats",
  analytics: "/api/admin/payments/analytics",
  revenue: "/api/admin/payments/revenue",

  // Export
  export: "/api/admin/payments/export",
} as const;

export type PaymentEndpoint =
  (typeof PAYMENT_ENDPOINTS)[keyof typeof PAYMENT_ENDPOINTS];
export type SellerPaymentEndpoint =
  (typeof SELLER_PAYMENT_ENDPOINTS)[keyof typeof SELLER_PAYMENT_ENDPOINTS];
export type AdminPaymentEndpoint =
  (typeof ADMIN_PAYMENT_ENDPOINTS)[keyof typeof ADMIN_PAYMENT_ENDPOINTS];
