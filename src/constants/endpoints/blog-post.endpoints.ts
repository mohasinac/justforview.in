/**
 * Blog Post API Endpoints
 * Constants for blog-related routes
 */

export const BLOG_POST_ENDPOINTS = {
  // Public blog
  list: "/api/blog",
  bySlug: (slug: string) => `/api/blog/${slug}`,
  byCategory: (category: string) => `/api/blog/category/${category}`,
  byTag: (tag: string) => `/api/blog/tag/${tag}`,
  byAuthor: (authorId: string) => `/api/blog/author/${authorId}`,
  featured: "/api/blog/featured",
  popular: "/api/blog/popular",
  trending: "/api/blog/trending",
  related: (id: string) => `/api/blog/${id}/related`,

  // Engagement
  incrementView: (id: string) => `/api/blog/${id}/view`,
  like: (id: string) => `/api/blog/${id}/like`,
  unlike: (id: string) => `/api/blog/${id}/unlike`,

  // Comments
  comments: (id: string) => `/api/blog/${id}/comments`,
  addComment: (id: string) => `/api/blog/${id}/comments`,

  // Search
  search: "/api/blog/search",
} as const;

export const ADMIN_BLOG_POST_ENDPOINTS = {
  // Admin blog management
  list: "/api/admin/blog",
  byId: (id: string) => `/api/admin/blog/${id}`,
  create: "/api/admin/blog",
  update: (id: string) => `/api/admin/blog/${id}`,
  delete: (id: string) => `/api/admin/blog/${id}`,

  // Status management
  publish: (id: string) => `/api/admin/blog/${id}/publish`,
  unpublish: (id: string) => `/api/admin/blog/${id}/unpublish`,
  archive: (id: string) => `/api/admin/blog/${id}/archive`,
  schedule: (id: string) => `/api/admin/blog/${id}/schedule`,

  // Feature management
  feature: (id: string) => `/api/admin/blog/${id}/feature`,
  unfeature: (id: string) => `/api/admin/blog/${id}/unfeature`,

  // Bulk operations
  bulkPublish: "/api/admin/blog/bulk/publish",
  bulkArchive: "/api/admin/blog/bulk/archive",
  bulkDelete: "/api/admin/blog/bulk/delete",
  bulkFeature: "/api/admin/blog/bulk/feature",

  // Stats
  stats: "/api/admin/blog/stats",
  analytics: "/api/admin/blog/analytics",

  // Export
  export: "/api/admin/blog/export",
} as const;

export type BlogPostEndpoint =
  (typeof BLOG_POST_ENDPOINTS)[keyof typeof BLOG_POST_ENDPOINTS];
export type AdminBlogPostEndpoint =
  (typeof ADMIN_BLOG_POST_ENDPOINTS)[keyof typeof ADMIN_BLOG_POST_ENDPOINTS];
