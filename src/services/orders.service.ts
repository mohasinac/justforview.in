import { apiService } from "./api.service";
import { ORDER_ENDPOINTS } from "@/constants/endpoints/order.endpoints";
import type { OrderUI } from "@/schemas/ui/order.ui";
import type {
  OrderFilter,
  CreateOrder,
  UpdateOrder,
} from "@/schemas/resources/order.schema";

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

class OrdersService {
  async list(
    filters?: Partial<OrderFilter>
  ): Promise<PaginatedResponse<OrderUI>> {
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
      ? `${ORDER_ENDPOINTS.list}?${qs}`
      : ORDER_ENDPOINTS.list;
    return apiService.get<PaginatedResponse<OrderUI>>(endpoint);
  }

  async getById(id: string): Promise<OrderUI> {
    return apiService.get<OrderUI>(ORDER_ENDPOINTS.byId(id));
  }

  async create(data: CreateOrder): Promise<OrderUI> {
    return apiService.post<OrderUI>(ORDER_ENDPOINTS.create, data);
  }

  async update(id: string, data: Partial<UpdateOrder>): Promise<OrderUI> {
    return apiService.patch<OrderUI>(ORDER_ENDPOINTS.byId(id), data);
  }

  async cancel(id: string): Promise<OrderUI> {
    return apiService.post<OrderUI>(ORDER_ENDPOINTS.cancel(id), {});
  }

  async getUserOrders(): Promise<OrderUI[]> {
    return apiService.get<OrderUI[]>("/api/user/orders");
  }

  async getSellerOrders(): Promise<OrderUI[]> {
    return apiService.get<OrderUI[]>("/api/seller/orders");
  }
}

export const ordersService = new OrdersService();
