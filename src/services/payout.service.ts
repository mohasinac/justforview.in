/**
 * Payout Service
 * Handles all payout-related API calls
 */

import { apiService } from "./api.service";
import {
  SELLER_PAYOUT_ENDPOINTS,
  ADMIN_PAYOUT_ENDPOINTS,
} from "@/constants/endpoints/payout.endpoints";
import type { PayoutUI } from "@/schemas/ui/payout.ui";
import type {
  CreatePayout,
  UpdatePayout,
  PayoutFilter,
} from "@/schemas/resources/payout.schema";

/**
 * Seller Payout Operations
 */
export const sellerPayoutService = {
  /**
   * Get seller payouts
   */
  async list(filters?: Partial<PayoutFilter>): Promise<PayoutUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<PayoutUI[]>(
      `${SELLER_PAYOUT_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get payout by ID
   */
  async getById(id: string): Promise<PayoutUI> {
    return apiService.get<PayoutUI>(SELLER_PAYOUT_ENDPOINTS.byId(id));
  },

  /**
   * Get statistics
   */
  async stats(): Promise<any> {
    return apiService.get(SELLER_PAYOUT_ENDPOINTS.stats);
  },

  /**
   * Get pending payouts
   */
  async pending(): Promise<PayoutUI[]> {
    return apiService.get<PayoutUI[]>(SELLER_PAYOUT_ENDPOINTS.pending);
  },

  /**
   * Update bank account
   */
  async updateBankAccount(data: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branchName?: string;
  }): Promise<any> {
    return apiService.post(SELLER_PAYOUT_ENDPOINTS.updateBankAccount, data);
  },
};

/**
 * Admin Payout Operations
 */
export const adminPayoutService = {
  /**
   * Get all payouts (admin)
   */
  async list(filters?: Partial<PayoutFilter>): Promise<PayoutUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<PayoutUI[]>(
      `${ADMIN_PAYOUT_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get payout by ID (admin)
   */
  async getById(id: string): Promise<PayoutUI> {
    return apiService.get<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.byId(id));
  },

  /**
   * Create payout
   */
  async create(data: CreatePayout): Promise<PayoutUI> {
    return apiService.post<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.create, data);
  },

  /**
   * Update payout
   */
  async update(id: string, data: Partial<UpdatePayout>): Promise<PayoutUI> {
    return apiService.patch<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.update(id), data);
  },

  /**
   * Get payouts by shop
   */
  async byShop(shopId: string): Promise<PayoutUI[]> {
    return apiService.get<PayoutUI[]>(ADMIN_PAYOUT_ENDPOINTS.byShop(shopId));
  },

  /**
   * Get payouts by seller
   */
  async bySeller(sellerId: string): Promise<PayoutUI[]> {
    return apiService.get<PayoutUI[]>(
      ADMIN_PAYOUT_ENDPOINTS.bySeller(sellerId)
    );
  },

  /**
   * Approve payout
   */
  async approve(id: string): Promise<PayoutUI> {
    return apiService.post<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.approve(id), {});
  },

  /**
   * Process payout
   */
  async process(id: string): Promise<PayoutUI> {
    return apiService.post<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.process(id), {});
  },

  /**
   * Complete payout
   */
  async complete(
    id: string,
    transactionId: string,
    utr?: string
  ): Promise<PayoutUI> {
    return apiService.post<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.complete(id), {
      transactionId,
      utr,
    });
  },

  /**
   * Fail payout
   */
  async fail(id: string, reason: string, code?: string): Promise<PayoutUI> {
    return apiService.post<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.fail(id), {
      reason,
      code,
    });
  },

  /**
   * Hold payout
   */
  async hold(id: string, reason: string, holdUntil?: Date): Promise<PayoutUI> {
    return apiService.post<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.hold(id), {
      reason,
      holdUntil,
    });
  },

  /**
   * Release payout
   */
  async release(id: string): Promise<PayoutUI> {
    return apiService.post<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.release(id), {});
  },

  /**
   * Cancel payout
   */
  async cancel(id: string, reason: string): Promise<PayoutUI> {
    return apiService.post<PayoutUI>(ADMIN_PAYOUT_ENDPOINTS.cancel(id), {
      reason,
    });
  },

  /**
   * Bulk approve
   */
  async bulkApprove(payoutIds: string[]): Promise<void> {
    return apiService.post(ADMIN_PAYOUT_ENDPOINTS.bulkApprove, { payoutIds });
  },

  /**
   * Bulk process
   */
  async bulkProcess(payoutIds: string[]): Promise<void> {
    return apiService.post(ADMIN_PAYOUT_ENDPOINTS.bulkProcess, { payoutIds });
  },

  /**
   * Bulk hold
   */
  async bulkHold(payoutIds: string[], reason: string): Promise<void> {
    return apiService.post(ADMIN_PAYOUT_ENDPOINTS.bulkHold, {
      payoutIds,
      reason,
    });
  },

  /**
   * Bulk cancel
   */
  async bulkCancel(payoutIds: string[], reason: string): Promise<void> {
    return apiService.post(ADMIN_PAYOUT_ENDPOINTS.bulkCancel, {
      payoutIds,
      reason,
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
    return apiService.get(`${ADMIN_PAYOUT_ENDPOINTS.stats}${queryParams}`);
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
    return apiService.get(`${ADMIN_PAYOUT_ENDPOINTS.analytics}${queryParams}`);
  },

  /**
   * Export payouts
   */
  async export(filters?: Partial<PayoutFilter>): Promise<any> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get(`${ADMIN_PAYOUT_ENDPOINTS.export}${queryParams}`);
  },
};
