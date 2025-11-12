/**
 * User API Endpoints
 * Constants for user-related routes
 */

export const USER_ENDPOINTS = {
  // Public user endpoints
  profile: (userId: string) => `/api/users/${userId}`,

  // Current user endpoints
  me: "/api/user/me",
  updateProfile: "/api/user/profile",
  updatePreferences: "/api/user/preferences",
  updateAvatar: "/api/user/avatar",
  changePassword: "/api/user/password",

  // User addresses
  addresses: "/api/user/addresses",
  addressById: (id: string) => `/api/user/addresses/${id}`,

  // User orders
  orders: "/api/user/orders",
  orderById: (id: string) => `/api/user/orders/${id}`,

  // User reviews
  reviews: "/api/user/reviews",

  // User wishlist
  wishlist: "/api/user/wishlist",
  addToWishlist: "/api/user/wishlist/add",
  removeFromWishlist: (productId: string) => `/api/user/wishlist/${productId}`,

  // User notifications
  notifications: "/api/user/notifications",
  markNotificationRead: (id: string) => `/api/user/notifications/${id}/read`,
  markAllNotificationsRead: "/api/user/notifications/read-all",
} as const;

export const AUTH_ENDPOINTS = {
  // Authentication
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
  refresh: "/api/auth/refresh",

  // Password reset
  forgotPassword: "/api/auth/forgot-password",
  resetPassword: "/api/auth/reset-password",

  // Email verification
  verifyEmail: "/api/auth/verify-email",
  resendVerificationEmail: "/api/auth/resend-verification",

  // Phone verification
  verifyPhone: "/api/auth/verify-phone",
  sendPhoneOtp: "/api/auth/send-phone-otp",

  // Social auth
  googleAuth: "/api/auth/google",
  facebookAuth: "/api/auth/facebook",
} as const;

export const ADMIN_USER_ENDPOINTS = {
  // Admin user management
  list: "/api/admin/users",
  byId: (id: string) => `/api/admin/users/${id}`,
  create: "/api/admin/users",
  update: (id: string) => `/api/admin/users/${id}`,
  delete: (id: string) => `/api/admin/users/${id}`,

  // User moderation
  ban: (id: string) => `/api/admin/users/${id}/ban`,
  unban: (id: string) => `/api/admin/users/${id}/unban`,
  activate: (id: string) => `/api/admin/users/${id}/activate`,
  deactivate: (id: string) => `/api/admin/users/${id}/deactivate`,

  // Role management
  updateRole: (id: string) => `/api/admin/users/${id}/role`,
  promoteToSeller: (id: string) => `/api/admin/users/${id}/promote-seller`,
  promoteToAdmin: (id: string) => `/api/admin/users/${id}/promote-admin`,

  // Bulk operations
  bulkBan: "/api/admin/users/bulk/ban",
  bulkActivate: "/api/admin/users/bulk/activate",
  bulkDelete: "/api/admin/users/bulk/delete",

  // User analytics
  stats: "/api/admin/users/stats",
  activity: (id: string) => `/api/admin/users/${id}/activity`,

  // Export
  export: "/api/admin/users/export",
} as const;

export type UserEndpoint = (typeof USER_ENDPOINTS)[keyof typeof USER_ENDPOINTS];
export type AuthEndpoint = (typeof AUTH_ENDPOINTS)[keyof typeof AUTH_ENDPOINTS];
export type AdminUserEndpoint =
  (typeof ADMIN_USER_ENDPOINTS)[keyof typeof ADMIN_USER_ENDPOINTS];
