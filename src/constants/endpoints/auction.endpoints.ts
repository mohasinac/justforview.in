/**
 * Auction API Endpoints
 * Centralized auction endpoint constants
 */

/**
 * Public Auction Endpoints
 */
export const AUCTION_ENDPOINTS = {
  // List & Search
  LIST: "/api/auctions",
  SEARCH: "/api/auctions/search",
  FEATURED: "/api/auctions/featured",
  LIVE: "/api/auctions/live",
  UPCOMING: "/api/auctions/upcoming",
  ENDED: "/api/auctions/ended",

  // Single Auction
  BY_ID: (id: string) => `/api/auctions/${id}`,
  BY_SLUG: (slug: string) => `/api/auctions/slug/${slug}`,

  // Bidding
  BIDS: (auctionId: string) => `/api/auctions/${auctionId}/bids`,
  PLACE_BID: (auctionId: string) => `/api/auctions/${auctionId}/bid`,
  AUTO_BID: (auctionId: string) => `/api/auctions/${auctionId}/auto-bid`,
  BID_HISTORY: (auctionId: string) => `/api/auctions/${auctionId}/bid-history`,

  // Watchlist
  WATCHLIST: "/api/auctions/watchlist",
  ADD_TO_WATCHLIST: (auctionId: string) =>
    `/api/auctions/${auctionId}/watchlist`,
  REMOVE_FROM_WATCHLIST: (auctionId: string) =>
    `/api/auctions/${auctionId}/watchlist`,

  // Related
  RELATED: (auctionId: string) => `/api/auctions/${auctionId}/related`,
  BY_SHOP: (shopId: string) => `/api/auctions/shop/${shopId}`,

  // Interactions
  VIEW: (auctionId: string) => `/api/auctions/${auctionId}/view`,
} as const;

/**
 * Seller Auction Endpoints
 */
export const SELLER_AUCTION_ENDPOINTS = {
  // CRUD
  LIST: "/api/seller/auctions",
  CREATE: "/api/seller/auctions",
  GET: (id: string) => `/api/seller/auctions/${id}`,
  UPDATE: (id: string) => `/api/seller/auctions/${id}`,
  DELETE: (id: string) => `/api/seller/auctions/${id}`,

  // Bulk Operations
  BULK_UPDATE: "/api/seller/auctions/bulk/update",
  BULK_DELETE: "/api/seller/auctions/bulk/delete",
  BULK_STATUS: "/api/seller/auctions/bulk/status",

  // Media
  UPLOAD_IMAGE: (id: string) => `/api/seller/auctions/${id}/images`,
  DELETE_IMAGE: (id: string, imageUrl: string) =>
    `/api/seller/auctions/${id}/images?url=${encodeURIComponent(imageUrl)}`,
  REORDER_IMAGES: (id: string) => `/api/seller/auctions/${id}/images/reorder`,

  // Bidding Management
  BIDS: (id: string) => `/api/seller/auctions/${id}/bids`,
  ACCEPT_BID: (id: string, bidId: string) =>
    `/api/seller/auctions/${id}/bids/${bidId}/accept`,
  REJECT_BID: (id: string, bidId: string) =>
    `/api/seller/auctions/${id}/bids/${bidId}/reject`,

  // Analytics
  ANALYTICS: (id: string) => `/api/seller/auctions/${id}/analytics`,
  STATS: "/api/seller/auctions/stats",
  PERFORMANCE: "/api/seller/auctions/performance",
} as const;

/**
 * Admin Auction Endpoints
 */
export const ADMIN_AUCTION_ENDPOINTS = {
  // CRUD
  LIST: "/api/admin/auctions",
  CREATE: "/api/admin/auctions",
  GET: (id: string) => `/api/admin/auctions/${id}`,
  UPDATE: (id: string) => `/api/admin/auctions/${id}`,
  DELETE: (id: string) => `/api/admin/auctions/${id}`,

  // Bulk Operations
  BULK_UPDATE: "/api/admin/auctions/bulk/update",
  BULK_DELETE: "/api/admin/auctions/bulk/delete",
  BULK_STATUS: "/api/admin/auctions/bulk/status",
  BULK_FEATURE: "/api/admin/auctions/bulk/feature",

  // Moderation
  PENDING: "/api/admin/auctions/pending",
  APPROVE: (id: string) => `/api/admin/auctions/${id}/approve`,
  REJECT: (id: string) => `/api/admin/auctions/${id}/reject`,
  FLAG: (id: string) => `/api/admin/auctions/${id}/flag`,
  UNFLAG: (id: string) => `/api/admin/auctions/${id}/unflag`,

  // Analytics
  STATS: "/api/admin/auctions/stats",
  REPORTS: "/api/admin/auctions/reports",
  PERFORMANCE: "/api/admin/auctions/performance",
  TOP_AUCTIONS: "/api/admin/auctions/top",
  REVENUE: "/api/admin/auctions/revenue",

  // Import/Export
  EXPORT: "/api/admin/auctions/export",
  IMPORT: "/api/admin/auctions/import",
} as const;

/**
 * Auction Filter Parameters Interface
 */
export interface AuctionFilterParams {
  shopId?: string;
  status?: "draft" | "scheduled" | "live" | "ended" | "cancelled";
  isFeatured?: boolean;
  showOnHomepage?: boolean;
  minBid?: number;
  maxBid?: number;
  startAfter?: string;
  endBefore?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Build query string from filter parameters
 */
export const buildAuctionQueryString = (
  params: AuctionFilterParams
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * Build full auction URL with filters
 */
export const buildAuctionUrl = (
  endpoint: string,
  params?: AuctionFilterParams
): string => {
  if (!params) return endpoint;
  const queryString = buildAuctionQueryString(params);
  return `${endpoint}${queryString}`;
};
