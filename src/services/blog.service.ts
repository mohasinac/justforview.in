/**
 * Blog Service
 * Handles all blog-related API calls
 */

import { apiService } from "./api.service";
import {
  BLOG_POST_ENDPOINTS,
  ADMIN_BLOG_POST_ENDPOINTS,
} from "@/constants/endpoints/blog-post.endpoints";
import type { BlogPostUI } from "@/schemas/ui/blog-post.ui";
import type {
  CreateBlogPost,
  UpdateBlogPost,
  BlogPostFilter,
} from "@/schemas/resources/blog-post.schema";

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export type BlogFilters = Partial<BlogPostFilter>;
export type { BlogPostUI as BlogPost };

/**
 * Public Blog Operations
 */
export const blogService = {
  /**
   * Get blog posts
   */
  async list(filters?: Partial<BlogPostFilter>): Promise<BlogPostUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<BlogPostUI[]>(
      `${BLOG_POST_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get blog post by slug
   */
  async getBySlug(slug: string): Promise<BlogPostUI> {
    return apiService.get<BlogPostUI>(BLOG_POST_ENDPOINTS.bySlug(slug));
  },

  /**
   * Get posts by category
   */
  async getByCategory(category: string): Promise<BlogPostUI[]> {
    return apiService.get<BlogPostUI[]>(
      BLOG_POST_ENDPOINTS.byCategory(category)
    );
  },

  /**
   * Get posts by tag
   */
  async getByTag(tag: string): Promise<BlogPostUI[]> {
    return apiService.get<BlogPostUI[]>(BLOG_POST_ENDPOINTS.byTag(tag));
  },

  /**
   * Get posts by author
   */
  async getByAuthor(authorId: string): Promise<BlogPostUI[]> {
    return apiService.get<BlogPostUI[]>(BLOG_POST_ENDPOINTS.byAuthor(authorId));
  },

  /**
   * Get featured posts
   */
  async getFeatured(): Promise<BlogPostUI[]> {
    return apiService.get<BlogPostUI[]>(BLOG_POST_ENDPOINTS.featured);
  },

  /**
   * Get popular posts
   */
  async getPopular(): Promise<BlogPostUI[]> {
    return apiService.get<BlogPostUI[]>(BLOG_POST_ENDPOINTS.popular);
  },

  /**
   * Get trending posts
   */
  async getTrending(): Promise<BlogPostUI[]> {
    return apiService.get<BlogPostUI[]>(BLOG_POST_ENDPOINTS.trending);
  },

  /**
   * Get related posts
   */
  async getRelated(id: string): Promise<BlogPostUI[]> {
    return apiService.get<BlogPostUI[]>(BLOG_POST_ENDPOINTS.related(id));
  },

  /**
   * Increment view count
   */
  async incrementView(id: string): Promise<void> {
    return apiService.post(BLOG_POST_ENDPOINTS.incrementView(id), {});
  },

  /**
   * Like post
   */
  async like(id: string): Promise<void> {
    return apiService.post(BLOG_POST_ENDPOINTS.like(id), {});
  },

  /**
   * Unlike post
   */
  async unlike(id: string): Promise<void> {
    return apiService.post(BLOG_POST_ENDPOINTS.unlike(id), {});
  },

  /**
   * Search posts
   */
  async search(query: string): Promise<BlogPostUI[]> {
    return apiService.get<BlogPostUI[]>(
      `${BLOG_POST_ENDPOINTS.search}?q=${query}`
    );
  },
};

/**
 * Admin Blog Operations
 */
export const adminBlogService = {
  /**
   * Get all posts (admin) - Returns paginated response
   */
  async list(
    filters?: Partial<BlogPostFilter>
  ): Promise<PaginatedResponse<BlogPostUI> | BlogPostUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<PaginatedResponse<BlogPostUI> | BlogPostUI[]>(
      `${ADMIN_BLOG_POST_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get post by ID (admin)
   */
  async getById(id: string): Promise<BlogPostUI> {
    return apiService.get<BlogPostUI>(ADMIN_BLOG_POST_ENDPOINTS.byId(id));
  },

  /**
   * Create post
   */
  async create(data: CreateBlogPost): Promise<BlogPostUI> {
    return apiService.post<BlogPostUI>(ADMIN_BLOG_POST_ENDPOINTS.create, data);
  },

  /**
   * Update post
   */
  async update(id: string, data: Partial<UpdateBlogPost>): Promise<BlogPostUI> {
    return apiService.patch<BlogPostUI>(
      ADMIN_BLOG_POST_ENDPOINTS.update(id),
      data
    );
  },

  /**
   * Delete post
   */
  async delete(id: string): Promise<void> {
    return apiService.delete(ADMIN_BLOG_POST_ENDPOINTS.delete(id));
  },

  /**
   * Publish post
   */
  async publish(id: string): Promise<BlogPostUI> {
    return apiService.post<BlogPostUI>(
      ADMIN_BLOG_POST_ENDPOINTS.publish(id),
      {}
    );
  },

  /**
   * Unpublish post
   */
  async unpublish(id: string): Promise<BlogPostUI> {
    return apiService.post<BlogPostUI>(
      ADMIN_BLOG_POST_ENDPOINTS.unpublish(id),
      {}
    );
  },

  /**
   * Archive post
   */
  async archive(id: string): Promise<BlogPostUI> {
    return apiService.post<BlogPostUI>(
      ADMIN_BLOG_POST_ENDPOINTS.archive(id),
      {}
    );
  },

  /**
   * Schedule post
   */
  async schedule(id: string, scheduledFor: Date): Promise<BlogPostUI> {
    return apiService.post<BlogPostUI>(ADMIN_BLOG_POST_ENDPOINTS.schedule(id), {
      scheduledFor,
    });
  },

  /**
   * Feature post
   */
  async feature(id: string): Promise<BlogPostUI> {
    return apiService.post<BlogPostUI>(
      ADMIN_BLOG_POST_ENDPOINTS.feature(id),
      {}
    );
  },

  /**
   * Unfeature post
   */
  async unfeature(id: string): Promise<BlogPostUI> {
    return apiService.post<BlogPostUI>(
      ADMIN_BLOG_POST_ENDPOINTS.unfeature(id),
      {}
    );
  },

  /**
   * Bulk publish
   */
  async bulkPublish(postIds: string[]): Promise<void> {
    return apiService.post(ADMIN_BLOG_POST_ENDPOINTS.bulkPublish, { postIds });
  },

  /**
   * Bulk archive
   */
  async bulkArchive(postIds: string[]): Promise<void> {
    return apiService.post(ADMIN_BLOG_POST_ENDPOINTS.bulkArchive, { postIds });
  },

  /**
   * Bulk delete
   */
  async bulkDelete(postIds: string[]): Promise<void> {
    return apiService.post(ADMIN_BLOG_POST_ENDPOINTS.bulkDelete, { postIds });
  },

  /**
   * Bulk feature
   */
  async bulkFeature(postIds: string[]): Promise<void> {
    return apiService.post(ADMIN_BLOG_POST_ENDPOINTS.bulkFeature, { postIds });
  },

  /**
   * Get statistics
   */
  async stats(): Promise<any> {
    return apiService.get(ADMIN_BLOG_POST_ENDPOINTS.stats);
  },

  /**
   * Get analytics
   */
  async analytics(filters?: {
    startDate?: string;
    endDate?: string;
  }): Promise<any> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get(
      `${ADMIN_BLOG_POST_ENDPOINTS.analytics}${queryParams}`
    );
  },

  /**
   * Export posts
   */
  async export(filters?: Partial<BlogPostFilter>): Promise<any> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get(`${ADMIN_BLOG_POST_ENDPOINTS.export}${queryParams}`);
  },
};

// Export combined service with admin methods
export const combinedBlogService = {
  ...blogService,
  ...adminBlogService,
};

// Default export for compatibility
export default combinedBlogService;
