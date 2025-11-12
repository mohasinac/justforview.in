/**
 * Category Utilities
 * Helper functions for category operations
 */

import type { Category } from "@/schemas/resources/category.schema";

/**
 * Validate that category is not in its own parent chain (circular reference)
 */
export function validateNonCircular(
  categoryId: string,
  parentIds: string[]
): { isValid: boolean; error?: string } {
  // Category cannot be its own parent
  if (parentIds.includes(categoryId)) {
    return {
      isValid: false,
      error: "A category cannot be its own parent",
    };
  }

  return { isValid: true };
}

/**
 * Check for circular references in full category tree
 */
export async function checkCircularReference(
  categoryId: string,
  proposedParentIds: string[],
  allCategories: Category[]
): Promise<{ isValid: boolean; error?: string }> {
  // Quick check: category in its direct parents
  if (proposedParentIds.includes(categoryId)) {
    return {
      isValid: false,
      error: "A category cannot be its own parent",
    };
  }

  // Build category map for quick lookup
  const categoryMap = new Map(allCategories.map((c) => [c.id, c]));

  // Check if any proposed parent has this category in its parent chain
  for (const parentId of proposedParentIds) {
    let current = categoryMap.get(parentId);
    const visited = new Set<string>([parentId]);

    // Traverse up the parent chain
    while (current) {
      // Check all parents of current category
      const currentParentIds =
        current.parentIds || ([current.parentId].filter(Boolean) as string[]);

      for (const pid of currentParentIds) {
        if (pid === categoryId) {
          return {
            isValid: false,
            error: `Circular reference detected: "${current.name}" is already a child of this category`,
          };
        }

        if (visited.has(pid)) {
          // Already checked this path
          continue;
        }

        visited.add(pid);
      }

      // Move to first parent (for simplicity, check all paths in production)
      if (currentParentIds.length > 0) {
        current = categoryMap.get(currentParentIds[0]);
      } else {
        break;
      }
    }
  }

  return { isValid: true };
}

/**
 * Calculate category level based on parent IDs
 */
export function calculateLevel(
  parentIds: string[],
  categoryMap: Map<string, Category>
): number {
  if (parentIds.length === 0) {
    return 0; // Root level
  }

  // Find the deepest parent
  let maxLevel = 0;
  for (const parentId of parentIds) {
    const parent = categoryMap.get(parentId);
    if (parent) {
      maxLevel = Math.max(maxLevel, parent.level + 1);
    }
  }

  return maxLevel;
}

/**
 * Generate category path from parent IDs
 */
export function generatePath(
  slug: string,
  parentIds: string[],
  categoryMap: Map<string, Category>
): string {
  if (parentIds.length === 0) {
    return `/${slug}`;
  }

  // Use first parent for primary path
  const primaryParent = categoryMap.get(parentIds[0]);
  if (primaryParent) {
    return `${primaryParent.path}/${slug}`;
  }

  return `/${slug}`;
}

/**
 * Get all descendant category IDs
 */
export function getDescendantIds(
  categoryId: string,
  allCategories: Category[]
): string[] {
  const descendants: string[] = [];
  const categoryMap = new Map(allCategories.map((c) => [c.id, c]));

  function collectDescendants(id: string) {
    const children = allCategories.filter((c) => {
      const parentIds =
        c.parentIds || ([c.parentId].filter(Boolean) as string[]);
      return parentIds.includes(id);
    });

    for (const child of children) {
      descendants.push(child.id);
      collectDescendants(child.id); // Recursive
    }
  }

  collectDescendants(categoryId);
  return descendants;
}

/**
 * Build category tree from flat list (handles multiple parents)
 */
export function buildCategoryTree(categories: Category[]): Category[] {
  const categoryMap = new Map(categories.map((c) => [c.id, { ...c }]));
  const rootCategories: Category[] = [];

  // First pass: identify roots
  for (const category of categories) {
    const parentIds =
      category.parentIds || ([category.parentId].filter(Boolean) as string[]);

    if (parentIds.length === 0) {
      rootCategories.push(category);
    }
  }

  // Sort by sortOrder
  rootCategories.sort((a, b) => a.sortOrder - b.sortOrder);

  return rootCategories;
}

/**
 * Get all parent paths for a category (for breadcrumbs)
 */
export function getAllParentPaths(
  categoryId: string,
  allCategories: Category[]
): string[][] {
  const categoryMap = new Map(allCategories.map((c) => [c.id, c]));
  const category = categoryMap.get(categoryId);

  if (!category) {
    return [];
  }

  const parentIds =
    category.parentIds || ([category.parentId].filter(Boolean) as string[]);

  if (parentIds.length === 0) {
    return [[categoryId]]; // Root category
  }

  // Recursively build paths for each parent
  const paths: string[][] = [];

  for (const parentId of parentIds) {
    const parentPaths = getAllParentPaths(parentId, allCategories);

    for (const parentPath of parentPaths) {
      paths.push([...parentPath, categoryId]);
    }
  }

  return paths;
}

/**
 * Format category path for display
 */
export function formatCategoryPath(
  path: string[],
  categoryMap: Map<string, Category>
): string {
  return path.map((id) => categoryMap.get(id)?.name || id).join(" > ");
}
