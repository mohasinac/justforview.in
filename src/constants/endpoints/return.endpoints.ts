/**
 * Return API Endpoints
 * Constants for return-related routes
 */

export const RETURN_ENDPOINTS = {
  // User returns
  list: "/api/user/returns",
  byId: (id: string) => `/api/user/returns/${id}`,
  create: "/api/user/returns",
  cancel: (id: string) => `/api/user/returns/${id}/cancel`,

  // By order
  byOrder: (orderId: string) => `/api/user/orders/${orderId}/returns`,
} as const;

export const SELLER_RETURN_ENDPOINTS = {
  // Seller return management
  list: "/api/seller/returns",
  byId: (id: string) => `/api/seller/returns/${id}`,

  // Approval
  approve: (id: string) => `/api/seller/returns/${id}/approve`,
  reject: (id: string) => `/api/seller/returns/${id}/reject`,

  // Pickup
  schedulePickup: (id: string) => `/api/seller/returns/${id}/schedule-pickup`,
  markPickedUp: (id: string) => `/api/seller/returns/${id}/picked-up`,

  // Receiving
  markReceived: (id: string) => `/api/seller/returns/${id}/received`,
  addInspection: (id: string) => `/api/seller/returns/${id}/inspection`,

  // Completion
  complete: (id: string) => `/api/seller/returns/${id}/complete`,
  processRefund: (id: string) => `/api/seller/returns/${id}/refund`,

  // Stats
  stats: "/api/seller/returns/stats",
} as const;

export const ADMIN_RETURN_ENDPOINTS = {
  // Admin return management
  list: "/api/admin/returns",
  byId: (id: string) => `/api/admin/returns/${id}`,
  update: (id: string) => `/api/admin/returns/${id}`,

  // By user/shop
  byUser: (userId: string) => `/api/admin/users/${userId}/returns`,
  byShop: (shopId: string) => `/api/admin/shops/${shopId}/returns`,

  // Bulk operations
  bulkApprove: "/api/admin/returns/bulk/approve",
  bulkReject: "/api/admin/returns/bulk/reject",
  bulkDelete: "/api/admin/returns/bulk/delete",

  // Stats
  stats: "/api/admin/returns/stats",
  analytics: "/api/admin/returns/analytics",

  // Export
  export: "/api/admin/returns/export",
} as const;

export type ReturnEndpoint =
  (typeof RETURN_ENDPOINTS)[keyof typeof RETURN_ENDPOINTS];
export type SellerReturnEndpoint =
  (typeof SELLER_RETURN_ENDPOINTS)[keyof typeof SELLER_RETURN_ENDPOINTS];
export type AdminReturnEndpoint =
  (typeof ADMIN_RETURN_ENDPOINTS)[keyof typeof ADMIN_RETURN_ENDPOINTS];
