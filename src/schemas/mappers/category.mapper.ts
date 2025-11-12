/**
 * Category Mapper
 * Transform backend Category to UI format
 */

import type { Category } from "@/schemas/resources/category.schema";
import type {
  CategoryUI,
  CategoryCardUI,
  CategoryListItemUI,
  CategoryTreeNodeUI,
  CategoryBreadcrumbItem,
  CategoryHierarchy,
  CategoryStatsDisplay,
  CategoryStatusDisplay,
  CategoryMedia,
  CategoryBadge,
} from "@/schemas/ui/category.ui";

/**
 * Get category hierarchy info
 */
export const getCategoryHierarchy = (category: Category): CategoryHierarchy => {
  const pathSegments = category.path.split("/").filter((s) => s.length > 0);

  // Build breadcrumbs from path (simplified - in real app would fetch parent data)
  const breadcrumbs: CategoryBreadcrumbItem[] = pathSegments.map(
    (segment, index) => {
      const slug = pathSegments.slice(0, index + 1).join("/");
      return {
        id: "", // Would need to fetch from parent data
        name:
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        slug: segment,
        url: `/categories/${slug}`,
      };
    }
  );

  return {
    parentId: category.parentId,
    path: category.path,
    pathSegments,
    level: category.level,
    hasChildren: category.hasChildren,
    childCount: category.childCount,
    breadcrumbs,
  };
};

/**
 * Get category stats display
 */
export const getCategoryStatsDisplay = (
  category: Category
): CategoryStatsDisplay => {
  return {
    productCount: category.productCount,
    productCountLabel: `${category.productCount} product${
      category.productCount !== 1 ? "s" : ""
    }`,
    childCount: category.childCount,
    childCountLabel: `${category.childCount} subcategor${
      category.childCount !== 1 ? "ies" : "y"
    }`,
    commissionRate: category.commissionRate,
    commissionRateFormatted: `${category.commissionRate.toFixed(1)}%`,
  };
};

/**
 * Get category status display
 */
export const getCategoryStatusDisplay = (
  isActive: boolean
): CategoryStatusDisplay => {
  return {
    isActive,
    label: isActive ? "Active" : "Inactive",
    color: isActive ? "green" : "gray",
    className: isActive
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800",
  };
};

/**
 * Get category media info
 */
export const getCategoryMedia = (category: Category): CategoryMedia => {
  return {
    icon: category.icon,
    image: category.image,
    banner: category.banner,
    color: category.color,
    hasIcon: !!category.icon,
    hasImage: !!category.image,
    hasBanner: !!category.banner,
  };
};

/**
 * Generate category badges
 */
export const generateCategoryBadges = (category: Category): CategoryBadge[] => {
  const badges: CategoryBadge[] = [];

  if (category.isFeatured) {
    badges.push({
      text: "Featured",
      color: "yellow",
      className: "bg-yellow-100 text-yellow-800",
      icon: "⭐",
    });
  }

  if (category.showOnHomepage) {
    badges.push({
      text: "Homepage",
      color: "blue",
      className: "bg-blue-100 text-blue-800",
      icon: "🏠",
    });
  }

  if (!category.isActive) {
    badges.push({
      text: "Inactive",
      color: "gray",
      className: "bg-gray-100 text-gray-800",
      icon: "🚫",
    });
  }

  if (category.level === 0) {
    badges.push({
      text: "Root",
      color: "purple",
      className: "bg-purple-100 text-purple-800",
      icon: "📁",
    });
  }

  if (category.productCount === 0) {
    badges.push({
      text: "Empty",
      color: "orange",
      className: "bg-orange-100 text-orange-800",
      icon: "📭",
    });
  }

  return badges;
};

/**
 * Main Mapper: Backend Category to UI
 */
export const mapCategoryToUI = (category: Category): CategoryUI => {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || "",

    // Hierarchy
    hierarchy: getCategoryHierarchy(category),

    // Media
    media: getCategoryMedia(category),

    // Stats
    stats: getCategoryStatsDisplay(category),

    // Status
    status: getCategoryStatusDisplay(category.isActive),

    // Display
    sortOrder: category.sortOrder,

    // Badges
    badges: generateCategoryBadges(category),

    // Flags
    isFeatured: category.isFeatured,
    showOnHomepage: category.showOnHomepage,
    isActive: category.isActive,

    // Backward compatibility
    parentId: category.parentId,
    image: category.image,
    is_active: category.isActive,
    is_featured: category.isFeatured,
    show_on_homepage: category.showOnHomepage,
    parent_id: category.parentId,

    // SEO
    metaTitle: category.metaTitle || category.name,
    metaDescription: category.metaDescription || category.description || "",

    // URLs
    url: `/categories/${category.slug}`,
    adminUrl: `/admin/categories/${category.id}`,

    // Timestamps
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};

/**
 * Simplified Mapper: Backend Category to Card UI
 */
export const mapCategoryToCard = (category: Category): CategoryCardUI => {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || "",
    media: {
      icon: category.icon,
      image: category.image,
      color: category.color,
    },
    productCount: category.productCount,
    productCountLabel: `${category.productCount} product${
      category.productCount !== 1 ? "s" : ""
    }`,
    childCount: category.childCount,
    hasChildren: category.hasChildren,
    badges: generateCategoryBadges(category),
    url: `/categories/${category.slug}`,
  };
};

/**
 * Simplified Mapper: Backend Category to List Item UI
 */
export const mapCategoryToListItem = (
  category: Category
): CategoryListItemUI => {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    level: category.level,
    productCount: category.productCount,
    childCount: category.childCount,
    hasChildren: category.hasChildren,
    isActive: category.isActive,
    url: `/categories/${category.slug}`,
  };
};

/**
 * Tree Node Mapper: Backend Category to Tree Node UI
 */
export const mapCategoryToTreeNode = (
  category: Category
): CategoryTreeNodeUI => {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    level: category.level,
    parentId: category.parentId,
    hasChildren: category.hasChildren,
    childCount: category.childCount,
    productCount: category.productCount,
    icon: category.icon,
    isActive: category.isActive,
    isFeatured: category.isFeatured,
    sortOrder: category.sortOrder,
    children: undefined, // Populated separately when building tree
    url: `/categories/${category.slug}`,
  };
};

/**
 * Bulk Mapper: Array of Categories to UI
 */
export const mapCategoriesToUI = (categories: Category[]): CategoryUI[] => {
  return categories.map(mapCategoryToUI);
};

/**
 * Bulk Mapper: Array of Categories to Cards
 */
export const mapCategoriesToCards = (
  categories: Category[]
): CategoryCardUI[] => {
  return categories.map(mapCategoryToCard);
};

/**
 * Bulk Mapper: Array of Categories to List Items
 */
export const mapCategoriesToListItems = (
  categories: Category[]
): CategoryListItemUI[] => {
  return categories.map(mapCategoryToListItem);
};

/**
 * Bulk Mapper: Array of Categories to Tree Nodes
 */
export const mapCategoriesToTreeNodes = (
  categories: Category[]
): CategoryTreeNodeUI[] => {
  return categories.map(mapCategoryToTreeNode);
};

/**
 * Build Category Tree from Flat List
 */
export const buildCategoryTree = (
  categories: Category[]
): CategoryTreeNodeUI[] => {
  const nodes = mapCategoriesToTreeNodes(categories);
  const nodeMap = new Map<string, CategoryTreeNodeUI>();
  const rootNodes: CategoryTreeNodeUI[] = [];

  // Create map for quick lookup
  nodes.forEach((node) => {
    nodeMap.set(node.id, { ...node, children: [] });
  });

  // Build tree structure
  nodes.forEach((node) => {
    const mappedNode = nodeMap.get(node.id)!;
    if (node.parentId && nodeMap.has(node.parentId)) {
      const parent = nodeMap.get(node.parentId)!;
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(mappedNode);
    } else {
      rootNodes.push(mappedNode);
    }
  });

  // Sort by sortOrder at each level
  const sortNodes = (nodes: CategoryTreeNodeUI[]) => {
    nodes.sort((a, b) => a.sortOrder - b.sortOrder);
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        sortNodes(node.children);
      }
    });
  };

  sortNodes(rootNodes);
  return rootNodes;
};

/**
 * Get Category Path from Tree
 */
export const getCategoryPath = (
  categoryId: string,
  categories: Category[]
): CategoryBreadcrumbItem[] => {
  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  const path: CategoryBreadcrumbItem[] = [];

  let currentId: string | undefined = categoryId;

  while (currentId) {
    const category = categoryMap.get(currentId);
    if (!category) break;

    path.unshift({
      id: category.id,
      name: category.name,
      slug: category.slug,
      url: `/categories/${category.slug}`,
    });

    currentId = category.parentId || undefined;
  }

  return path;
};
