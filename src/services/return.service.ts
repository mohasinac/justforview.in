/**
 * Return Service
 * Handles all return-related API calls
 */

import { apiService } from "./api.service";
import {
  RETURN_ENDPOINTS,
  SELLER_RETURN_ENDPOINTS,
  ADMIN_RETURN_ENDPOINTS,
} from "@/constants/endpoints/return.endpoints";
import type { ReturnUI } from "@/schemas/ui/return.ui";
import type {
  CreateReturn,
  UpdateReturn,
  ReturnFilter,
} from "@/schemas/resources/return.schema";

/**
 * User Return Operations
 */
export const returnService = {
  /**
   * Get user returns
   */
  async list(filters?: Partial<ReturnFilter>): Promise<ReturnUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<ReturnUI[]>(`${RETURN_ENDPOINTS.list}${queryParams}`);
  },

  /**
   * Get return by ID
   */
  async getById(id: string): Promise<ReturnUI> {
    return apiService.get<ReturnUI>(RETURN_ENDPOINTS.byId(id));
  },

  /**
   * Create new return
   */
  async create(data: CreateReturn): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(RETURN_ENDPOINTS.create, data);
  },

  /**
   * Cancel return
   */
  async cancel(id: string): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(RETURN_ENDPOINTS.cancel(id), {});
  },

  /**
   * Get returns by order
   */
  async byOrder(orderId: string): Promise<ReturnUI[]> {
    return apiService.get<ReturnUI[]>(RETURN_ENDPOINTS.byOrder(orderId));
  },
};

/**
 * Seller Return Operations
 */
export const sellerReturnService = {
  /**
   * Get seller returns
   */
  async list(filters?: Partial<ReturnFilter>): Promise<ReturnUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<ReturnUI[]>(
      `${SELLER_RETURN_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get return by ID
   */
  async getById(id: string): Promise<ReturnUI> {
    return apiService.get<ReturnUI>(SELLER_RETURN_ENDPOINTS.byId(id));
  },

  /**
   * Approve return
   */
  async approve(id: string): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(SELLER_RETURN_ENDPOINTS.approve(id), {});
  },

  /**
   * Reject return
   */
  async reject(id: string, reason: string): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(SELLER_RETURN_ENDPOINTS.reject(id), {
      reason,
    });
  },

  /**
   * Schedule pickup
   */
  async schedulePickup(
    id: string,
    pickupDate: Date,
    address: string
  ): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(
      SELLER_RETURN_ENDPOINTS.schedulePickup(id),
      { pickupDate, address }
    );
  },

  /**
   * Mark as picked up
   */
  async markPickedUp(id: string): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(
      SELLER_RETURN_ENDPOINTS.markPickedUp(id),
      {}
    );
  },

  /**
   * Mark as received
   */
  async markReceived(id: string): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(
      SELLER_RETURN_ENDPOINTS.markReceived(id),
      {}
    );
  },

  /**
   * Add inspection notes
   */
  async addInspection(
    id: string,
    notes: string,
    photos?: string[]
  ): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(
      SELLER_RETURN_ENDPOINTS.addInspection(id),
      { notes, photos }
    );
  },

  /**
   * Complete return
   */
  async complete(id: string): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(SELLER_RETURN_ENDPOINTS.complete(id), {});
  },

  /**
   * Process refund
   */
  async processRefund(
    id: string,
    refundAmount: number,
    method: string
  ): Promise<ReturnUI> {
    return apiService.post<ReturnUI>(
      SELLER_RETURN_ENDPOINTS.processRefund(id),
      { refundAmount, method }
    );
  },

  /**
   * Get statistics
   */
  async stats(): Promise<any> {
    return apiService.get(SELLER_RETURN_ENDPOINTS.stats);
  },
};

/**
 * Admin Return Operations
 */
export const adminReturnService = {
  /**
   * Get all returns (admin)
   */
  async list(filters?: Partial<ReturnFilter>): Promise<ReturnUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<ReturnUI[]>(
      `${ADMIN_RETURN_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get return by ID (admin)
   */
  async getById(id: string): Promise<ReturnUI> {
    return apiService.get<ReturnUI>(ADMIN_RETURN_ENDPOINTS.byId(id));
  },

  /**
   * Update return
   */
  async update(id: string, data: Partial<UpdateReturn>): Promise<ReturnUI> {
    return apiService.patch<ReturnUI>(ADMIN_RETURN_ENDPOINTS.update(id), data);
  },

  /**
   * Get returns by user
   */
  async byUser(userId: string): Promise<ReturnUI[]> {
    return apiService.get<ReturnUI[]>(ADMIN_RETURN_ENDPOINTS.byUser(userId));
  },

  /**
   * Get returns by shop
   */
  async byShop(shopId: string): Promise<ReturnUI[]> {
    return apiService.get<ReturnUI[]>(ADMIN_RETURN_ENDPOINTS.byShop(shopId));
  },

  /**
   * Bulk approve
   */
  async bulkApprove(returnIds: string[]): Promise<void> {
    return apiService.post(ADMIN_RETURN_ENDPOINTS.bulkApprove, { returnIds });
  },

  /**
   * Bulk reject
   */
  async bulkReject(returnIds: string[], reason: string): Promise<void> {
    return apiService.post(ADMIN_RETURN_ENDPOINTS.bulkReject, {
      returnIds,
      reason,
    });
  },

  /**
   * Bulk delete
   */
  async bulkDelete(returnIds: string[]): Promise<void> {
    return apiService.post(ADMIN_RETURN_ENDPOINTS.bulkDelete, { returnIds });
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
    return apiService.get(`${ADMIN_RETURN_ENDPOINTS.stats}${queryParams}`);
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
    return apiService.get(`${ADMIN_RETURN_ENDPOINTS.analytics}${queryParams}`);
  },

  /**
   * Export returns
   */
  async export(filters?: Partial<ReturnFilter>): Promise<any> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get(`${ADMIN_RETURN_ENDPOINTS.export}${queryParams}`);
  },
};
