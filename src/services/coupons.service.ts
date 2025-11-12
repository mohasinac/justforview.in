import { apiService } from "./api.service";
import type { PaginatedResponse } from "@/types";
import type { CouponUI } from "@/schemas/ui/coupon.ui";
import {
  COUPON_ENDPOINTS,
  SELLER_COUPON_ENDPOINTS,
  ADMIN_COUPON_ENDPOINTS,
} from "@/constants/endpoints/coupon.endpoints";
import type {
  CouponType,
  CouponStatus,
} from "@/schemas/resources/coupon.schema";

interface CouponFilters {
  shopId?: string;
  type?: CouponType;
  status?: CouponStatus;
  search?: string;
  page?: number;
  limit?: number;
}

interface CreateCouponData {
  shopId: string;
  code: string;
  name: string;
  description?: string;
  type: CouponType;
  discountValue?: number;
  maxDiscountAmount?: number;
  tiers?: {
    minAmount: number;
    discountPercentage: number;
  }[];
  bogoConfig?: {
    buyQuantity: number;
    getQuantity: number;
    discountPercentage: number;
    applicableProducts?: string[];
  };
  minPurchaseAmount: number;
  minQuantity: number;
  applicability: "all" | "category" | "product";
  applicableCategories?: string[];
  applicableProducts?: string[];
  excludedCategories?: string[];
  excludedProducts?: string[];
  usageLimit?: number;
  usageLimitPerUser: number;
  startDate: Date;
  endDate: Date;
  firstOrderOnly: boolean;
  newUsersOnly: boolean;
  canCombineWithOtherCoupons: boolean;
  autoApply: boolean;
  isPublic: boolean;
  isFeatured: boolean;
}

interface UpdateCouponData extends Partial<CreateCouponData> {
  status?: CouponStatus;
}

interface ValidateCouponData {
  code: string;
  cartTotal: number;
  items: {
    productId: string;
    categoryId: string;
    quantity: number;
    price: number;
  }[];
}

interface ValidateCouponResponse {
  valid: boolean;
  discount: number;
  message?: string;
}

class CouponsService {
  // List coupons (public active/owner all)
  async list(filters?: CouponFilters): Promise<PaginatedResponse<CouponUI>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v.toString()));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `${COUPON_ENDPOINTS.list}?${queryString}`
      : COUPON_ENDPOINTS.list;

    return apiService.get<PaginatedResponse<CouponUI>>(endpoint);
  }

  // Get coupon by ID
  async getById(id: string): Promise<CouponUI> {
    return apiService.get<CouponUI>(COUPON_ENDPOINTS.byId(id));
  }

  // Get coupon by code
  async getByCode(code: string): Promise<CouponUI> {
    return apiService.get<CouponUI>(COUPON_ENDPOINTS.byCode(code));
  }

  // Validate coupon
  async validate(data: ValidateCouponData): Promise<ValidateCouponResponse> {
    return apiService.post<ValidateCouponResponse>(
      COUPON_ENDPOINTS.validate,
      data
    );
  }

  // Get featured coupons
  async getFeatured(): Promise<CouponUI[]> {
    return apiService.get<CouponUI[]>(COUPON_ENDPOINTS.featured);
  }

  // Get shop coupons
  async getByShop(shopId: string): Promise<CouponUI[]> {
    return apiService.get<CouponUI[]>(COUPON_ENDPOINTS.byShop(shopId));
  }

  // Seller: List own coupons
  async sellerList(
    filters?: CouponFilters
  ): Promise<PaginatedResponse<CouponUI>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `${SELLER_COUPON_ENDPOINTS.list}?${queryString}`
      : SELLER_COUPON_ENDPOINTS.list;

    return apiService.get<PaginatedResponse<CouponUI>>(endpoint);
  }

  // Seller: Create coupon
  async create(data: CreateCouponData): Promise<CouponUI> {
    return apiService.post<CouponUI>(SELLER_COUPON_ENDPOINTS.create, data);
  }

  // Seller: Update coupon
  async update(id: string, data: UpdateCouponData): Promise<CouponUI> {
    return apiService.patch<CouponUI>(SELLER_COUPON_ENDPOINTS.update(id), data);
  }

  // Seller: Delete coupon
  async delete(id: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(
      SELLER_COUPON_ENDPOINTS.delete(id)
    );
  }

  // Seller: Activate coupon
  async activate(id: string): Promise<CouponUI> {
    return apiService.post<CouponUI>(SELLER_COUPON_ENDPOINTS.activate(id), {});
  }

  // Seller: Deactivate coupon
  async deactivate(id: string): Promise<CouponUI> {
    return apiService.post<CouponUI>(
      SELLER_COUPON_ENDPOINTS.deactivate(id),
      {}
    );
  }

  // Admin: All coupons
  async adminList(
    filters?: CouponFilters
  ): Promise<PaginatedResponse<CouponUI>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `${ADMIN_COUPON_ENDPOINTS.list}?${queryString}`
      : ADMIN_COUPON_ENDPOINTS.list;

    return apiService.get<PaginatedResponse<CouponUI>>(endpoint);
  }

  // Admin: Bulk operations
  async bulkActivate(couponIds: string[]): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      ADMIN_COUPON_ENDPOINTS.bulkActivate,
      { couponIds }
    );
  }

  async bulkDeactivate(couponIds: string[]): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      ADMIN_COUPON_ENDPOINTS.bulkDeactivate,
      { couponIds }
    );
  }

  async bulkDelete(couponIds: string[]): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      ADMIN_COUPON_ENDPOINTS.bulkDelete,
      { couponIds }
    );
  }

  async bulkFeature(couponIds: string[]): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(
      ADMIN_COUPON_ENDPOINTS.bulkFeature,
      { couponIds }
    );
  }

  // Admin: Stats
  async getStats(): Promise<any> {
    return apiService.get<any>(ADMIN_COUPON_ENDPOINTS.stats);
  }
}

export const couponsService = new CouponsService();
export type {
  CouponFilters,
  CreateCouponData,
  UpdateCouponData,
  ValidateCouponData,
  ValidateCouponResponse,
};
