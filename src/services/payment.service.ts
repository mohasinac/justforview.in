/**
 * Payment Service
 * Handles all payment-related API calls
 */

import { apiService } from "./api.service";
import {
  PAYMENT_ENDPOINTS,
  SELLER_PAYMENT_ENDPOINTS,
  ADMIN_PAYMENT_ENDPOINTS,
} from "@/constants/endpoints/payment.endpoints";
import type { PaymentUI } from "@/schemas/ui/payment.ui";
import type {
  CreatePayment,
  UpdatePayment,
  PaymentFilter,
} from "@/schemas/resources/payment.schema";

/**
 * User Payment Operations
 */
export const paymentService = {
  /**
   * Get user payments
   */
  async list(filters?: Partial<PaymentFilter>): Promise<PaymentUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<PaymentUI[]>(
      `${PAYMENT_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get payment by ID
   */
  async getById(id: string): Promise<PaymentUI> {
    return apiService.get<PaymentUI>(PAYMENT_ENDPOINTS.byId(id));
  },

  /**
   * Create new payment
   */
  async create(data: CreatePayment): Promise<PaymentUI> {
    return apiService.post<PaymentUI>(PAYMENT_ENDPOINTS.create, data);
  },

  /**
   * Get payments by order
   */
  async byOrder(orderId: string): Promise<PaymentUI[]> {
    return apiService.get<PaymentUI[]>(PAYMENT_ENDPOINTS.byOrder(orderId));
  },

  /**
   * Verify payment
   */
  async verify(id: string, verificationData: any): Promise<PaymentUI> {
    return apiService.post<PaymentUI>(
      PAYMENT_ENDPOINTS.verify(id),
      verificationData
    );
  },

  /**
   * Cancel payment
   */
  async cancel(id: string): Promise<PaymentUI> {
    return apiService.post<PaymentUI>(PAYMENT_ENDPOINTS.cancel(id), {});
  },
};

/**
 * Seller Payment Operations
 */
export const sellerPaymentService = {
  /**
   * Get seller payments
   */
  async list(filters?: Partial<PaymentFilter>): Promise<PaymentUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<PaymentUI[]>(
      `${SELLER_PAYMENT_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get payment by ID
   */
  async getById(id: string): Promise<PaymentUI> {
    return apiService.get<PaymentUI>(SELLER_PAYMENT_ENDPOINTS.byId(id));
  },

  /**
   * Get statistics
   */
  async stats(): Promise<any> {
    return apiService.get(SELLER_PAYMENT_ENDPOINTS.stats);
  },

  /**
   * Get settlements
   */
  async settlements(): Promise<any> {
    return apiService.get(SELLER_PAYMENT_ENDPOINTS.settlements);
  },
};

/**
 * Admin Payment Operations
 */
export const adminPaymentService = {
  /**
   * Get all payments (admin)
   */
  async list(filters?: Partial<PaymentFilter>): Promise<PaymentUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<PaymentUI[]>(
      `${ADMIN_PAYMENT_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get payment by ID (admin)
   */
  async getById(id: string): Promise<PaymentUI> {
    return apiService.get<PaymentUI>(ADMIN_PAYMENT_ENDPOINTS.byId(id));
  },

  /**
   * Update payment
   */
  async update(id: string, data: Partial<UpdatePayment>): Promise<PaymentUI> {
    return apiService.patch<PaymentUI>(
      ADMIN_PAYMENT_ENDPOINTS.update(id),
      data
    );
  },

  /**
   * Get payments by user
   */
  async byUser(userId: string): Promise<PaymentUI[]> {
    return apiService.get<PaymentUI[]>(ADMIN_PAYMENT_ENDPOINTS.byUser(userId));
  },

  /**
   * Get payments by shop
   */
  async byShop(shopId: string): Promise<PaymentUI[]> {
    return apiService.get<PaymentUI[]>(ADMIN_PAYMENT_ENDPOINTS.byShop(shopId));
  },

  /**
   * Initiate refund
   */
  async initiateRefund(
    id: string,
    amount: number,
    reason: string
  ): Promise<PaymentUI> {
    return apiService.post<PaymentUI>(
      ADMIN_PAYMENT_ENDPOINTS.initiateRefund(id),
      { amount, reason }
    );
  },

  /**
   * Process refund
   */
  async processRefund(id: string): Promise<PaymentUI> {
    return apiService.post<PaymentUI>(
      ADMIN_PAYMENT_ENDPOINTS.processRefund(id),
      {}
    );
  },

  /**
   * Mark as settled
   */
  async markSettled(id: string, settlementAmount: number): Promise<PaymentUI> {
    return apiService.post<PaymentUI>(ADMIN_PAYMENT_ENDPOINTS.markSettled(id), {
      settlementAmount,
    });
  },

  /**
   * Bulk settle
   */
  async bulkSettle(paymentIds: string[]): Promise<void> {
    return apiService.post(ADMIN_PAYMENT_ENDPOINTS.bulkSettle, { paymentIds });
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
    return apiService.get(`${ADMIN_PAYMENT_ENDPOINTS.stats}${queryParams}`);
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
    return apiService.get(`${ADMIN_PAYMENT_ENDPOINTS.analytics}${queryParams}`);
  },

  /**
   * Get revenue
   */
  async revenue(filters?: {
    startDate?: string;
    endDate?: string;
  }): Promise<any> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get(`${ADMIN_PAYMENT_ENDPOINTS.revenue}${queryParams}`);
  },

  /**
   * Export payments
   */
  async export(filters?: Partial<PaymentFilter>): Promise<any> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get(`${ADMIN_PAYMENT_ENDPOINTS.export}${queryParams}`);
  },
};
