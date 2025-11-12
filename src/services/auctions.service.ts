import { apiService } from "./api.service";
import {
  AUCTION_ENDPOINTS,
  SELLER_AUCTION_ENDPOINTS,
} from "@/constants/endpoints/auction.endpoints";
import type { AuctionUI } from "@/schemas/ui/auction.ui";
import type { Auction } from "@/schemas/resources/auction.schema";
import type {
  CreateAuction,
  UpdateAuction,
  AuctionFilter,
} from "@/schemas/resources/auction.schema";

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

class AuctionsService {
  async list(
    filters?: Partial<AuctionFilter>
  ): Promise<PaginatedResponse<AuctionUI>> {
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
      ? `${AUCTION_ENDPOINTS.LIST}?${qs}`
      : AUCTION_ENDPOINTS.LIST;
    return apiService.get<PaginatedResponse<AuctionUI>>(endpoint);
  }

  async getById(id: string): Promise<AuctionUI> {
    return apiService.get<AuctionUI>(AUCTION_ENDPOINTS.BY_ID(id));
  }

  async getBySlug(slug: string): Promise<AuctionUI> {
    return apiService.get<AuctionUI>(AUCTION_ENDPOINTS.BY_SLUG(slug));
  }

  async create(data: CreateAuction): Promise<AuctionUI> {
    const response = await apiService.post<{
      success: boolean;
      data: AuctionUI;
    }>(AUCTION_ENDPOINTS.LIST, data);
    return response.data;
  }

  async update(id: string, data: Partial<UpdateAuction>): Promise<AuctionUI> {
    return apiService.patch<AuctionUI>(AUCTION_ENDPOINTS.BY_ID(id), data);
  }

  async delete(id: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(AUCTION_ENDPOINTS.BY_ID(id));
  }

  async getLive(): Promise<AuctionUI[]> {
    return apiService.get<AuctionUI[]>(AUCTION_ENDPOINTS.LIVE);
  }

  async getFeatured(): Promise<AuctionUI[]> {
    return apiService.get<AuctionUI[]>(AUCTION_ENDPOINTS.FEATURED);
  }

  async placeBid(id: string, bidAmount: number): Promise<AuctionUI> {
    return apiService.post<AuctionUI>(AUCTION_ENDPOINTS.PLACE_BID(id), {
      bidAmount,
    });
  }

  async getBids(id: string): Promise<any[]> {
    return apiService.get<any[]>(AUCTION_ENDPOINTS.BIDS(id));
  }

  async getForEdit(id: string): Promise<{ ui: AuctionUI; raw: Auction }> {
    return apiService.get<{ ui: AuctionUI; raw: Auction }>(
      AUCTION_ENDPOINTS.FOR_EDIT(id)
    );
  }

  async bulkAction(
    action: string,
    ids: string[],
    data?: any
  ): Promise<{ success: boolean }> {
    return apiService.post(SELLER_AUCTION_ENDPOINTS.BULK_UPDATE, {
      action,
      ids,
      data,
    });
  }
}

export const auctionsService = new AuctionsService();

// Export types for external use
export type {
  AuctionFilter,
  CreateAuction,
  UpdateAuction,
} from "@/schemas/resources/auction.schema";
export type AuctionFilters = Partial<AuctionFilter>;
export type CreateAuctionData = CreateAuction;
export type UpdateAuctionData = Partial<UpdateAuction>;
export type PlaceBidData = { bidAmount: number; maxAutoBid?: number };
