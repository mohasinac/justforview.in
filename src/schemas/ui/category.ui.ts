/**
 * Category UI Schema
 * Frontend display models with formatted fields
 */

/**
 * Category Badge
 */
export interface CategoryBadge {
  text: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Category Hierarchy Info
 */
export interface CategoryHierarchy {
  parentId?: string | null; // Legacy single parent
  parentIds: string[]; // Multiple parents support
  parentBreadcrumbs: CategoryBreadcrumbItem[][]; // Array of breadcrumb paths (one per parent)
  path: string;
  pathSegments: string[];
  level: number;
  hasChildren: boolean;
  childCount: number;
  breadcrumbs: Array<{
    id: string;
    name: string;
    slug: string;
    url: string;
  }>;
}

/**
 * Category Stats Display
 */
export interface CategoryStatsDisplay {
  productCount: number;
  productCountLabel: string;
  childCount: number;
  childCountLabel: string;
  commissionRate: number;
  commissionRateFormatted: string;
}

/**
 * Category Status Display
 */
export interface CategoryStatusDisplay {
  isActive: boolean;
  label: string;
  color: string;
  className: string;
}

/**
 * Category Media
 */
export interface CategoryMedia {
  icon?: string;
  image?: string;
  banner?: string;
  color?: string;
  hasIcon: boolean;
  hasImage: boolean;
  hasBanner: boolean;
}

/**
 * Complete Category UI Schema
 */
export interface CategoryUI {
  id: string;
  name: string;
  slug: string;
  description: string;

  // Hierarchy
  hierarchy: CategoryHierarchy;

  // Review Status
  reviewStatus: CategoryReviewStatus;

  // Media
  media: CategoryMedia;

  // Stats
  stats: CategoryStatsDisplay;

  // Status
  status: CategoryStatusDisplay;

  // Display
  sortOrder: number;

  // Badges
  badges: CategoryBadge[];

  // Flags
  isFeatured: boolean;
  showOnHomepage: boolean;
  isActive: boolean;

  // Backward compatibility for admin pages
  parentId?: string | null; // alias for hierarchy.parentId
  image?: string; // alias for media.image
  is_active: boolean; // snake_case alias for isActive
  is_featured: boolean; // snake_case alias for isFeatured
  show_on_homepage: boolean; // snake_case alias for showOnHomepage
  parent_id?: string | null; // snake_case alias for parentId

  // SEO
  metaTitle: string;
  metaDescription: string;

  // URLs
  url: string;
  adminUrl: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Simplified Category Card UI
 */
export interface CategoryCardUI {
  id: string;
  name: string;
  slug: string;
  description: string;
  media: {
    icon?: string;
    image?: string;
    color?: string;
  };
  productCount: number;
  productCountLabel: string;
  childCount: number;
  hasChildren: boolean;
  badges: CategoryBadge[];
  url: string;
}

/**
 * Simplified Category List Item UI
 */
export interface CategoryListItemUI {
  id: string;
  name: string;
  slug: string;
  level: number;
  productCount: number;
  childCount: number;
  hasChildren: boolean;
  isActive: boolean;
  url: string;
}

/**
 * Category Tree Node UI
 */
export interface CategoryTreeNodeUI {
  id: string;
  name: string;
  slug: string;
  level: number;
  parentId?: string | null;
  hasChildren: boolean;
  childCount: number;
  productCount: number;
  icon?: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  children?: CategoryTreeNodeUI[];
  url: string;
}

/**
 * Category Breadcrumb Item
 */
export interface CategoryBreadcrumbItem {
  id: string;
  name: string;
  slug: string;
  url: string;
}

/**
 * Category Review Status (for seller-created categories)
 */
export interface CategoryReviewStatus {
  needsReview: boolean;
  createdBy: "admin" | "seller";
  reviewedAt?: Date;
  reviewedBy?: string;
  statusLabel: string;
  statusColor: string;
  statusClassName: string;
}

/**
 * Category Form Data
 */
export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  icon?: string;
  image?: string;
  banner?: string;
  color?: string;
  sortOrder: number;
  isFeatured: boolean;
  showOnHomepage: boolean;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  commissionRate: number;
}

/**
 * Category with Children UI
 */
export interface CategoryWithChildrenUI extends CategoryUI {
  children: CategoryCardUI[];
}

/**
 * Category Stats Summary
 */
export interface CategoryStatsSummary {
  totalCategories: number;
  activeCategories: number;
  inactiveCategories: number;
  featuredCategories: number;
  totalProducts: number;
  averageProductsPerCategory: number;
  categoriesByLevel: Record<number, number>;
}
