/**
 * Category API Endpoints
 * Centralized category endpoint constants
 */

/**
 * Public Category Endpoints
 */
export const CATEGORY_ENDPOINTS = {
  // List & Search
  LIST: "/api/categories",
  TREE: "/api/categories/tree",
  FEATURED: "/api/categories/featured",
  HOMEPAGE: "/api/categories/homepage",
  ROOTS: "/api/categories/roots",

  // Single Category
  BY_ID: (id: string) => `/api/categories/${id}`,
  BY_SLUG: (slug: string) => `/api/categories/slug/${slug}`,
  FOR_EDIT: (id: string) => `/api/categories/${id}/edit`,

  // Hierarchy
  CHILDREN: (id: string) => `/api/categories/${id}/children`,
  PARENTS: (id: string) => `/api/categories/${id}/parents`,
  PATH: (id: string) => `/api/categories/${id}/path`,
  BREADCRUMBS: (id: string) => `/api/categories/${id}/breadcrumbs`,

  // Products
  PRODUCTS: (id: string) => `/api/categories/${id}/products`,
  PRODUCT_COUNT: (id: string) => `/api/categories/${id}/product-count`,

  // Stats
  STATS: "/api/categories/stats",
} as const;

/**
 * Admin Category Endpoints
 */
export const ADMIN_CATEGORY_ENDPOINTS = {
  // CRUD
  LIST: "/api/admin/categories",
  CREATE: "/api/admin/categories",
  GET: (id: string) => `/api/admin/categories/${id}`,
  UPDATE: (id: string) => `/api/admin/categories/${id}`,
  DELETE: (id: string) => `/api/admin/categories/${id}`,

  // Bulk Operations
  BULK_UPDATE: "/api/admin/categories/bulk/update",
  BULK_DELETE: "/api/admin/categories/bulk/delete",
  BULK_ACTIVATE: "/api/admin/categories/bulk/activate",
  BULK_DEACTIVATE: "/api/admin/categories/bulk/deactivate",
  BULK_FEATURE: "/api/admin/categories/bulk/feature",

  // Hierarchy Management
  MOVE: (id: string) => `/api/admin/categories/${id}/move`,
  REORDER: "/api/admin/categories/reorder",
  MERGE: "/api/admin/categories/merge",

  // Media
  UPLOAD_IMAGE: (id: string) => `/api/admin/categories/${id}/image`,
  UPLOAD_BANNER: (id: string) => `/api/admin/categories/${id}/banner`,
  DELETE_IMAGE: (id: string) => `/api/admin/categories/${id}/image`,
  DELETE_BANNER: (id: string) => `/api/admin/categories/${id}/banner`,

  // Analytics
  STATS: "/api/admin/categories/stats",
  PERFORMANCE: "/api/admin/categories/performance",
  TOP_CATEGORIES: "/api/admin/categories/top",
  EMPTY_CATEGORIES: "/api/admin/categories/empty",

  // Import/Export
  EXPORT: "/api/admin/categories/export",
  IMPORT: "/api/admin/categories/import",
} as const;

/**
 * Category Filter Parameters Interface
 */
export interface CategoryFilterParams {
  parentId?: string | null;
  level?: number;
  isFeatured?: boolean;
  showOnHomepage?: boolean;
  isActive?: boolean;
  hasChildren?: boolean;
  minProductCount?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Category Move Parameters
 */
export interface CategoryMoveParams {
  targetParentId: string | null;
  position?: number;
}

/**
 * Category Merge Parameters
 */
export interface CategoryMergeParams {
  sourceIds: string[];
  targetId: string;
  deleteSource?: boolean;
}

/**
 * Build query string from filter parameters
 */
export const buildCategoryQueryString = (
  params: CategoryFilterParams
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * Build full category URL with filters
 */
export const buildCategoryUrl = (
  endpoint: string,
  params?: CategoryFilterParams
): string => {
  if (!params) return endpoint;
  const queryString = buildCategoryQueryString(params);
  return `${endpoint}${queryString}`;
};
