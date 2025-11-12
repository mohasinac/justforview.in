/**
 * Hero Slide API Endpoints
 * Constants for hero slide-related routes
 */

export const HERO_SLIDE_ENDPOINTS = {
  // Public hero slides
  list: "/api/hero-slides",
  active: "/api/hero-slides/active",
  byId: (id: string) => `/api/hero-slides/${id}`,
  trackView: (id: string) => `/api/hero-slides/${id}/view`,
  trackClick: (id: string) => `/api/hero-slides/${id}/click`,
} as const;

export const ADMIN_HERO_SLIDE_ENDPOINTS = {
  // Admin hero slide management
  list: "/api/admin/hero-slides",
  byId: (id: string) => `/api/admin/hero-slides/${id}`,
  create: "/api/admin/hero-slides",
  update: (id: string) => `/api/admin/hero-slides/${id}`,
  delete: (id: string) => `/api/admin/hero-slides/${id}`,

  // Status management
  activate: (id: string) => `/api/admin/hero-slides/${id}/activate`,
  deactivate: (id: string) => `/api/admin/hero-slides/${id}/deactivate`,
  publish: (id: string) => `/api/admin/hero-slides/${id}/publish`,

  // Ordering
  reorder: "/api/admin/hero-slides/reorder",
  moveUp: (id: string) => `/api/admin/hero-slides/${id}/move-up`,
  moveDown: (id: string) => `/api/admin/hero-slides/${id}/move-down`,

  // Bulk operations
  bulkActivate: "/api/admin/hero-slides/bulk/activate",
  bulkDeactivate: "/api/admin/hero-slides/bulk/deactivate",
  bulkDelete: "/api/admin/hero-slides/bulk/delete",

  // Stats
  stats: "/api/admin/hero-slides/stats",
  analytics: (id: string) => `/api/admin/hero-slides/${id}/analytics`,

  // Export
  export: "/api/admin/hero-slides/export",
} as const;

export type HeroSlideEndpoint =
  (typeof HERO_SLIDE_ENDPOINTS)[keyof typeof HERO_SLIDE_ENDPOINTS];
export type AdminHeroSlideEndpoint =
  (typeof ADMIN_HERO_SLIDE_ENDPOINTS)[keyof typeof ADMIN_HERO_SLIDE_ENDPOINTS];
