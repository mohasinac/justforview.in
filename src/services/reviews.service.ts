import { apiService } from "./api.service";
import { REVIEW_ENDPOINTS } from "@/constants/endpoints/review.endpoints";
import type { ReviewUI } from "@/schemas/ui/review.ui";
import type {
  ReviewFilter,
  CreateReview,
  UpdateReview,
} from "@/schemas/resources/review.schema";

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

class ReviewsService {
  async list(
    filters?: Partial<ReviewFilter>
  ): Promise<PaginatedResponse<ReviewUI>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const qs = params.toString();
    const endpoint = qs
      ? `${REVIEW_ENDPOINTS.list}?${qs}`
      : REVIEW_ENDPOINTS.list;
    return apiService.get<PaginatedResponse<ReviewUI>>(endpoint);
  }

  async getById(id: string): Promise<ReviewUI> {
    return apiService.get<ReviewUI>(REVIEW_ENDPOINTS.byId(id));
  }

  async create(data: CreateReview): Promise<ReviewUI> {
    return apiService.post<ReviewUI>(REVIEW_ENDPOINTS.create, data);
  }

  async update(id: string, data: Partial<UpdateReview>): Promise<ReviewUI> {
    return apiService.patch<ReviewUI>(REVIEW_ENDPOINTS.byId(id), data);
  }

  async delete(id: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(REVIEW_ENDPOINTS.byId(id));
  }

  async getProductReviews(productId: string): Promise<ReviewUI[]> {
    return apiService.get<ReviewUI[]>(REVIEW_ENDPOINTS.byProduct(productId));
  }

  async getShopReviews(shopId: string): Promise<ReviewUI[]> {
    return apiService.get<ReviewUI[]>(REVIEW_ENDPOINTS.byShop(shopId));
  }

  async moderate(
    id: string,
    data: { isApproved?: boolean; isFeatured?: boolean }
  ): Promise<ReviewUI> {
    return apiService.patch<ReviewUI>(
      `${REVIEW_ENDPOINTS.byId(id)}/moderate`,
      data
    );
  }

  async markHelpful(id: string): Promise<{ success: boolean }> {
    return apiService.post<{ success: boolean }>(
      `${REVIEW_ENDPOINTS.byId(id)}/helpful`,
      {}
    );
  }

  async getSummary(params: {
    productId?: string;
    shopId?: string;
  }): Promise<any> {
    const qs = new URLSearchParams(params as any).toString();
    return apiService.get<any>(`/api/reviews/summary?${qs}`);
  }

  async canReview(
    productId: string
  ): Promise<{ canReview: boolean; reason?: string }> {
    return apiService.get<{ canReview: boolean; reason?: string }>(
      `/api/reviews/can-review/${productId}`
    );
  }
}

export const reviewsService = new ReviewsService();

// Export types for external use
export type {
  ReviewFilter,
  CreateReview,
  UpdateReview,
} from "@/schemas/resources/review.schema";
export type ReviewFilters = Partial<ReviewFilter>;
export type CreateReviewData = CreateReview;
export type UpdateReviewData = Partial<UpdateReview>;
export type ModerateReviewData = { isApproved?: boolean; isFeatured?: boolean };
