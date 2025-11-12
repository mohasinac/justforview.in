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

  async updateStatus(
    id: string,
    data: { status: string; note?: string }
  ): Promise<OrderUI> {
    return apiService.patch<OrderUI>(ORDER_ENDPOINTS.byId(id), data);
  }

  async createShipment(
    id: string,
    data: {
      carrier: string;
      trackingNumber: string;
      estimatedDelivery?: Date;
    }
  ): Promise<OrderUI> {
    return apiService.post<OrderUI>(`${ORDER_ENDPOINTS.byId(id)}/shipment`, data);
  }

  async track(id: string): Promise<any> {
    return apiService.get<any>(`${ORDER_ENDPOINTS.byId(id)}/tracking`);
  }

  async getStats(): Promise<any> {
    return apiService.get<any>("/api/admin/orders/stats");
  }

  async downloadInvoice(id: string): Promise<Blob> {
    return apiService.get<Blob>(`${ORDER_ENDPOINTS.byId(id)}/invoice`);
  }
}

export const ordersService = new OrdersService();

// Export types for external use
export type { OrderFilter, CreateOrder, UpdateOrder } from "@/schemas/resources/order.schema";
export type OrderFilters = Partial<OrderFilter>;
export type CreateOrderData = CreateOrder;
export type UpdateOrderStatusData = { status: string; note?: string };
export type CreateShipmentData = { carrier: string; trackingNumber: string; estimatedDelivery?: Date };
export type CancelOrderData = { reason?: string };
