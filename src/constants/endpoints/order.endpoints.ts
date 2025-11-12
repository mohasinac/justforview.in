/**
 * Order API Endpoints
 * Constants for order-related routes
 */

export const ORDER_ENDPOINTS = {
  // Customer endpoints
  list: "/api/orders",
  byId: (id: string) => `/api/orders/${id}`,
  forEdit: (id: string) => `/api/orders/${id}/edit`,
  create: "/api/orders",
  cancel: (id: string) => `/api/orders/${id}/cancel`,
  track: (id: string) => `/api/orders/${id}/track`,
  invoice: (id: string) => `/api/orders/${id}/invoice`,
  receipt: (id: string) => `/api/orders/${id}/receipt`,

  // Order items
  items: (id: string) => `/api/orders/${id}/items`,

  // Order timeline
  timeline: (id: string) => `/api/orders/${id}/timeline`,
} as const;

export const SELLER_ORDER_ENDPOINTS = {
  // Seller order management
  list: "/api/seller/orders",
  byId: (id: string) => `/api/seller/orders/${id}`,
  byShop: (shopId: string) => `/api/seller/shops/${shopId}/orders`,

  // Order status updates
  confirm: (id: string) => `/api/seller/orders/${id}/confirm`,
  ship: (id: string) => `/api/seller/orders/${id}/ship`,
  deliver: (id: string) => `/api/seller/orders/${id}/deliver`,
  cancel: (id: string) => `/api/seller/orders/${id}/cancel`,

  // Shipping
  addTracking: (id: string) => `/api/seller/orders/${id}/tracking`,
  updateTracking: (id: string) => `/api/seller/orders/${id}/tracking`,

  // Notes
  addInternalNote: (id: string) => `/api/seller/orders/${id}/notes`,

  // Bulk operations
  bulkConfirm: "/api/seller/orders/bulk/confirm",
  bulkShip: "/api/seller/orders/bulk/ship",
  bulkCancel: "/api/seller/orders/bulk/cancel",
} as const;

export const ADMIN_ORDER_ENDPOINTS = {
  // Admin order management
  list: "/api/admin/orders",
  byId: (id: string) => `/api/admin/orders/${id}`,
  byCustomer: (customerId: string) =>
    `/api/admin/customers/${customerId}/orders`,
  byShop: (shopId: string) => `/api/admin/shops/${shopId}/orders`,

  // Order management
  update: (id: string) => `/api/admin/orders/${id}`,
  delete: (id: string) => `/api/admin/orders/${id}`,
  forceCancel: (id: string) => `/api/admin/orders/${id}/force-cancel`,
  refund: (id: string) => `/api/admin/orders/${id}/refund`,

  // Status override
  updateStatus: (id: string) => `/api/admin/orders/${id}/status`,
  updatePaymentStatus: (id: string) => `/api/admin/orders/${id}/payment-status`,

  // Notes
  updateInternalNotes: (id: string) => `/api/admin/orders/${id}/internal-notes`,

  // Analytics
  stats: "/api/admin/orders/stats",
  revenue: "/api/admin/orders/revenue",

  // Bulk operations
  bulkUpdate: "/api/admin/orders/bulk/update",
  bulkDelete: "/api/admin/orders/bulk/delete",
  bulkRefund: "/api/admin/orders/bulk/refund",

  // Export
  export: "/api/admin/orders/export",
} as const;

export type OrderEndpoint =
  (typeof ORDER_ENDPOINTS)[keyof typeof ORDER_ENDPOINTS];
export type SellerOrderEndpoint =
  (typeof SELLER_ORDER_ENDPOINTS)[keyof typeof SELLER_ORDER_ENDPOINTS];
export type AdminOrderEndpoint =
  (typeof ADMIN_ORDER_ENDPOINTS)[keyof typeof ADMIN_ORDER_ENDPOINTS];
