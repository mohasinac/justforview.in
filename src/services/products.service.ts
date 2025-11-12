import { apiService } from "./api.service";
import { PRODUCT_ENDPOINTS } from "@/constants/endpoints/product.endpoints";
import type { ProductUI } from "@/schemas/ui/product.ui";
import type { Product } from "@/schemas/resources/product.schema";
import type {
  ProductFilter,
  CreateProduct,
  UpdateProduct,
} from "@/schemas/resources/product.schema";

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

class ProductsService {
  async list(
    filters?: Partial<ProductFilter>
  ): Promise<PaginatedResponse<ProductUI>> {
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
    const endpoint = qs
      ? `${PRODUCT_ENDPOINTS.LIST}?${qs}`
      : PRODUCT_ENDPOINTS.LIST;
    return apiService.get<PaginatedResponse<ProductUI>>(endpoint);
  }

  async getById(id: string): Promise<ProductUI> {
    return apiService.get<ProductUI>(PRODUCT_ENDPOINTS.BY_ID(id));
  }

  async getBySlug(slug: string): Promise<ProductUI> {
    return apiService.get<ProductUI>(PRODUCT_ENDPOINTS.BY_SLUG(slug));
  }

  async create(data: CreateProduct): Promise<ProductUI> {
    return apiService.post<ProductUI>(PRODUCT_ENDPOINTS.LIST, data);
  }

  async update(id: string, data: Partial<UpdateProduct>): Promise<ProductUI> {
    return apiService.patch<ProductUI>(PRODUCT_ENDPOINTS.BY_ID(id), data);
  }

  async delete(id: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(PRODUCT_ENDPOINTS.BY_ID(id));
  }

  async getFeatured(): Promise<ProductUI[]> {
    return apiService.get<ProductUI[]>(PRODUCT_ENDPOINTS.FEATURED);
  }

  async getHomepage(): Promise<ProductUI[]> {
    return apiService.get<ProductUI[]>(PRODUCT_ENDPOINTS.HOMEPAGE);
  }

  async getSimilar(id: string): Promise<ProductUI[]> {
    return apiService.get<ProductUI[]>(PRODUCT_ENDPOINTS.SIMILAR(id));
  }

  async getForEdit(id: string): Promise<{ ui: ProductUI; raw: Product }> {
    return apiService.get<{ ui: ProductUI; raw: Product }>(
      PRODUCT_ENDPOINTS.FOR_EDIT(id)
    );
  }

  async search(query: string): Promise<ProductUI[]> {
    return apiService.get<ProductUI[]>(
      `${PRODUCT_ENDPOINTS.LIST}?search=${encodeURIComponent(query)}`
    );
  }

  async bulkAction(
    action: string,
    ids: string[],
    data?: any
  ): Promise<{ success: boolean }> {
    return apiService.post("/api/products/bulk", {
      action,
      ids,
      data,
    });
  }
}

export const productsService = new ProductsService();

// Export types for external use
export type {
  ProductFilter,
  CreateProduct,
  UpdateProduct,
} from "@/schemas/resources/product.schema";
export type ProductFilters = Partial<ProductFilter>;
export type CreateProductData = CreateProduct;
export type UpdateProductData = Partial<UpdateProduct>;
