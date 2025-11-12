/**
 * Address API Endpoints
 * Constants for address-related routes
 */

export const ADDRESS_ENDPOINTS = {
  // User addresses
  list: "/api/user/addresses",
  byId: (id: string) => `/api/user/addresses/${id}`,
  create: "/api/user/addresses",
  update: (id: string) => `/api/user/addresses/${id}`,
  delete: (id: string) => `/api/user/addresses/${id}`,

  // Set default address
  setDefault: (id: string) => `/api/user/addresses/${id}/set-default`,
} as const;

export const ADMIN_ADDRESS_ENDPOINTS = {
  // Admin address management
  list: "/api/admin/addresses",
  byUserId: (userId: string) => `/api/admin/users/${userId}/addresses`,
  byId: (id: string) => `/api/admin/addresses/${id}`,
  delete: (id: string) => `/api/admin/addresses/${id}`,
} as const;

export type AddressEndpoint =
  (typeof ADDRESS_ENDPOINTS)[keyof typeof ADDRESS_ENDPOINTS];
export type AdminAddressEndpoint =
  (typeof ADMIN_ADDRESS_ENDPOINTS)[keyof typeof ADMIN_ADDRESS_ENDPOINTS];
