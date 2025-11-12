import { apiService } from "./api.service";
import { SHOP_ENDPOINTS } from "@/constants/endpoints/shop.endpoints";
import type { ShopUI } from "@/schemas/ui/shop.ui";
import type {
  ShopFilter,
  CreateShop,
  UpdateShop,
} from "@/schemas/resources/shop.schema";

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

class ShopsService {
  async list(
    filters?: Partial<ShopFilter>
  ): Promise<PaginatedResponse<ShopUI>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, String(v)));
          } else {
            params.append(key, String(value));
          }
        }
      });
    }
    const qs = params.toString();
    const endpoint = qs ? `${SHOP_ENDPOINTS.LIST}?${qs}` : SHOP_ENDPOINTS.LIST;
    return apiService.get<PaginatedResponse<ShopUI>>(endpoint);
  }

  async getById(id: string): Promise<ShopUI> {
    return apiService.get<ShopUI>(SHOP_ENDPOINTS.BY_ID(id));
  }

  async getBySlug(slug: string): Promise<ShopUI> {
    return apiService.get<ShopUI>(SHOP_ENDPOINTS.BY_SLUG(slug));
  }

  async create(data: CreateShop): Promise<ShopUI> {
    return apiService.post<ShopUI>(SHOP_ENDPOINTS.LIST, data);
  }

  async update(id: string, data: Partial<UpdateShop>): Promise<ShopUI> {
    return apiService.patch<ShopUI>(SHOP_ENDPOINTS.BY_ID(id), data);
  }

  async delete(id: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(SHOP_ENDPOINTS.BY_ID(id));
  }

  async getFeatured(): Promise<ShopUI[]> {
    return apiService.get<ShopUI[]>(SHOP_ENDPOINTS.FEATURED);
  }

  async getVerified(): Promise<ShopUI[]> {
    return apiService.get<ShopUI[]>(SHOP_ENDPOINTS.VERIFIED);
  }

  async search(query: string): Promise<ShopUI[]> {
    return apiService.get<ShopUI[]>(
      `${SHOP_ENDPOINTS.LIST}?search=${encodeURIComponent(query)}`
    );
  }

  async getShopProducts(
    shopId: string,
    params?: { page?: number; limit?: number }
  ): Promise<any> {
    const qs = params ? new URLSearchParams(params as any).toString() : "";
    const endpoint = qs
      ? `${SHOP_ENDPOINTS.BY_ID(shopId)}/products?${qs}`
      : `${SHOP_ENDPOINTS.BY_ID(shopId)}/products`;
    return apiService.get<any>(endpoint);
  }

  async getStats(shopId: string): Promise<any> {
    return apiService.get<any>(`${SHOP_ENDPOINTS.BY_ID(shopId)}/stats`);
  }
}

export const shopsService = new ShopsService();

// Export types for external use
export type {
  ShopFilter,
  CreateShop,
  UpdateShop,
} from "@/schemas/resources/shop.schema";
export type ShopFilters = Partial<ShopFilter>;
export type CreateShopData = CreateShop;
export type UpdateShopData = Partial<UpdateShop>;
export type ShopVerificationData = { isVerified: boolean; reason?: string };
export type ShopFeatureData = { isFeatured: boolean };
export type ShopBanData = { isBanned: boolean; reason?: string };
export type ShopPaymentData = any;
