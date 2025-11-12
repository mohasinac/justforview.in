/**
 * Hero Slide Service
 * Handles all hero slide-related API calls
 */

import { apiService } from "./api.service";
import {
  HERO_SLIDE_ENDPOINTS,
  ADMIN_HERO_SLIDE_ENDPOINTS,
} from "@/constants/endpoints/hero-slide.endpoints";
import type { HeroSlideUI } from "@/schemas/ui/hero-slide.ui";
import type {
  CreateHeroSlide,
  UpdateHeroSlide,
  HeroSlideFilter,
} from "@/schemas/resources/hero-slide.schema";

/**
 * Public Hero Slide Operations
 */
export const heroSlideService = {
  /**
   * Get active hero slides
   */
  async list(): Promise<HeroSlideUI[]> {
    return apiService.get<HeroSlideUI[]>(HERO_SLIDE_ENDPOINTS.list);
  },

  /**
   * Get hero slide by ID
   */
  async getById(id: string): Promise<HeroSlideUI> {
    return apiService.get<HeroSlideUI>(HERO_SLIDE_ENDPOINTS.byId(id));
  },

  /**
   * Get active slides
   */
  async active(): Promise<HeroSlideUI[]> {
    return apiService.get<HeroSlideUI[]>(HERO_SLIDE_ENDPOINTS.active);
  },

  /**
   * Track click
   */
  async trackClick(id: string): Promise<void> {
    return apiService.post(HERO_SLIDE_ENDPOINTS.trackClick(id), {});
  },

  /**
   * Track view
   */
  async trackView(id: string): Promise<void> {
    return apiService.post(HERO_SLIDE_ENDPOINTS.trackView(id), {});
  },
};

/**
 * Admin Hero Slide Operations
 */
export const adminHeroSlideService = {
  /**
   * Get all hero slides (admin)
   */
  async list(filters?: Partial<HeroSlideFilter>): Promise<HeroSlideUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<HeroSlideUI[]>(
      `${ADMIN_HERO_SLIDE_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get hero slide by ID (admin)
   */
  async getById(id: string): Promise<HeroSlideUI> {
    return apiService.get<HeroSlideUI>(ADMIN_HERO_SLIDE_ENDPOINTS.byId(id));
  },

  /**
   * Create hero slide
   */
  async create(data: CreateHeroSlide): Promise<HeroSlideUI> {
    return apiService.post<HeroSlideUI>(
      ADMIN_HERO_SLIDE_ENDPOINTS.create,
      data
    );
  },

  /**
   * Update hero slide
   */
  async update(
    id: string,
    data: Partial<UpdateHeroSlide>
  ): Promise<HeroSlideUI> {
    return apiService.patch<HeroSlideUI>(
      ADMIN_HERO_SLIDE_ENDPOINTS.update(id),
      data
    );
  },

  /**
   * Delete hero slide
   */
  async delete(id: string): Promise<void> {
    return apiService.delete(ADMIN_HERO_SLIDE_ENDPOINTS.delete(id));
  },

  /**
   * Reorder slides
   */
  async reorder(slideOrders: { id: string; order: number }[]): Promise<void> {
    return apiService.post(ADMIN_HERO_SLIDE_ENDPOINTS.reorder, { slideOrders });
  },

  /**
   * Activate slide
   */
  async activate(id: string): Promise<HeroSlideUI> {
    return apiService.post<HeroSlideUI>(
      ADMIN_HERO_SLIDE_ENDPOINTS.activate(id),
      {}
    );
  },

  /**
   * Deactivate slide
   */
  async deactivate(id: string): Promise<HeroSlideUI> {
    return apiService.post<HeroSlideUI>(
      ADMIN_HERO_SLIDE_ENDPOINTS.deactivate(id),
      {}
    );
  },

  /**
   * Publish slide
   */
  async publish(id: string): Promise<HeroSlideUI> {
    return apiService.post<HeroSlideUI>(
      ADMIN_HERO_SLIDE_ENDPOINTS.publish(id),
      {}
    );
  },

  /**
   * Bulk delete
   */
  async bulkDelete(slideIds: string[]): Promise<void> {
    return apiService.post(ADMIN_HERO_SLIDE_ENDPOINTS.bulkDelete, { slideIds });
  },

  /**
   * Bulk activate
   */
  async bulkActivate(slideIds: string[]): Promise<void> {
    return apiService.post(ADMIN_HERO_SLIDE_ENDPOINTS.bulkActivate, {
      slideIds,
    });
  },

  /**
   * Bulk deactivate
   */
  async bulkDeactivate(slideIds: string[]): Promise<void> {
    return apiService.post(ADMIN_HERO_SLIDE_ENDPOINTS.bulkDeactivate, {
      slideIds,
    });
  },

  /**
   * Get statistics
   */
  async stats(filters?: {
    startDate?: string;
    endDate?: string;
  }): Promise<any> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get(`${ADMIN_HERO_SLIDE_ENDPOINTS.stats}${queryParams}`);
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
      `${ADMIN_HERO_SLIDE_ENDPOINTS.analytics}${queryParams}`
    );
  },
};
