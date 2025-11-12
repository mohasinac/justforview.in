/**
 * Categories Service
 * Handles all category-related API calls
 */

import { apiService } from "./api.service";
import { CATEGORY_ENDPOINTS } from "@/constants/endpoints/category.endpoints";
import type { CategoryUI } from "@/schemas/ui/category.ui";
import type { CategoryFilter } from "@/schemas/resources/category.schema";

/**
 * Category Service
 */
class CategoriesService {
  /**
   * Get all categories
   */
  async list(filters?: Partial<CategoryFilter>): Promise<CategoryUI[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const queryString = params.toString();
    const url = queryString
      ? `${CATEGORY_ENDPOINTS.LIST}?${queryString}`
      : CATEGORY_ENDPOINTS.LIST;
    return apiService.get<CategoryUI[]>(url);
  }

  /**
   * Get category by slug
   */
  async getBySlug(slug: string): Promise<CategoryUI> {
    return apiService.get<CategoryUI>(CATEGORY_ENDPOINTS.BY_SLUG(slug));
  }

  /**
   * Get category tree
   */
  async getTree(): Promise<CategoryUI[]> {
    return apiService.get<CategoryUI[]>(CATEGORY_ENDPOINTS.TREE);
  }

  /**
   * Get featured categories
   */
  async getFeatured(): Promise<CategoryUI[]> {
    return apiService.get<CategoryUI[]>(CATEGORY_ENDPOINTS.FEATURED);
  }

  /**
   * Get homepage categories
   */
  async getHomepage(): Promise<CategoryUI[]> {
    return apiService.get<CategoryUI[]>(CATEGORY_ENDPOINTS.HOMEPAGE);
  }

  /**
   * Get leaf categories (no children)
   */
  async getLeaves(): Promise<CategoryUI[]> {
    return apiService.get<CategoryUI[]>(CATEGORY_ENDPOINTS.ROOTS);
  }

  /**
   * Search categories
   */
  async search(query: string): Promise<CategoryUI[]> {
    return apiService.get<CategoryUI[]>(
      `${CATEGORY_ENDPOINTS.LIST}?search=${encodeURIComponent(query)}`
    );
  }

  /**
   * Create category (admin)
   */
  async create(data: any): Promise<CategoryUI> {
    return apiService.post<CategoryUI>("/api/admin/categories", data);
  }

  /**
   * Update category (admin)
   */
  async update(slug: string, data: any): Promise<CategoryUI> {
    return apiService.patch<CategoryUI>(`/api/admin/categories/${slug}`, data);
  }

  /**
   * Delete category (admin)
   */
  async delete(slug: string): Promise<void> {
    return apiService.delete(`/api/admin/categories/${slug}`);
  }
}

export const categoriesService = new CategoriesService();

// Export types for external use
export type { CategoryFilter } from "@/schemas/resources/category.schema";
export type CategoryFilters = Partial<CategoryFilter>;
export type CreateCategoryData = any;
export type UpdateCategoryData = any;
export type CategoryTree = CategoryUI;
