/**
 * Support Ticket API Endpoints
 * Constants for support ticket-related routes
 */

export const SUPPORT_ENDPOINTS = {
  // User support tickets
  list: "/api/user/support/tickets",
  byId: (id: string) => `/api/user/support/tickets/${id}`,
  create: "/api/user/support/tickets",
  update: (id: string) => `/api/user/support/tickets/${id}`,
  addMessage: (id: string) => `/api/user/support/tickets/${id}/messages`,
  close: (id: string) => `/api/user/support/tickets/${id}/close`,
} as const;

export const ADMIN_SUPPORT_ENDPOINTS = {
  // Admin support management
  list: "/api/admin/support/tickets",
  byId: (id: string) => `/api/admin/support/tickets/${id}`,
  update: (id: string) => `/api/admin/support/tickets/${id}`,
  addMessage: (id: string) => `/api/admin/support/tickets/${id}/messages`,

  // Assignment
  assign: (id: string) => `/api/admin/support/tickets/${id}/assign`,
  unassign: (id: string) => `/api/admin/support/tickets/${id}/unassign`,

  // Status management
  resolve: (id: string) => `/api/admin/support/tickets/${id}/resolve`,
  reopen: (id: string) => `/api/admin/support/tickets/${id}/reopen`,
  close: (id: string) => `/api/admin/support/tickets/${id}/close`,

  // Priority management
  updatePriority: (id: string) => `/api/admin/support/tickets/${id}/priority`,

  // Bulk operations
  bulkAssign: "/api/admin/support/tickets/bulk/assign",
  bulkClose: "/api/admin/support/tickets/bulk/close",
  bulkDelete: "/api/admin/support/tickets/bulk/delete",

  // Stats
  stats: "/api/admin/support/stats",
  activity: (id: string) => `/api/admin/support/tickets/${id}/activity`,

  // Export
  export: "/api/admin/support/tickets/export",
} as const;

export type SupportEndpoint =
  (typeof SUPPORT_ENDPOINTS)[keyof typeof SUPPORT_ENDPOINTS];
export type AdminSupportEndpoint =
  (typeof ADMIN_SUPPORT_ENDPOINTS)[keyof typeof ADMIN_SUPPORT_ENDPOINTS];
