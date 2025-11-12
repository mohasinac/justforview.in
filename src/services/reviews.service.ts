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
}

export const reviewsService = new ReviewsService();
