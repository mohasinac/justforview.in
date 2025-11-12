import { apiService } from "./api.service";
import {
  AUCTION_ENDPOINTS,
  SELLER_AUCTION_ENDPOINTS,
} from "@/constants/endpoints/auction.endpoints";
import type { AuctionUI } from "@/schemas/ui/auction.ui";
import type {
  CreateAuction,
  UpdateAuction,
  AuctionFilter,
} from "@/schemas/resources/auction.schema";

class AuctionsService {
  async list(filters?: Partial<AuctionFilter>): Promise<AuctionUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    const response = await apiService.get<{
      success: boolean;
      data: AuctionUI[];
    }>(`${AUCTION_ENDPOINTS.LIST}${queryParams}`);
    return response.data;
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
