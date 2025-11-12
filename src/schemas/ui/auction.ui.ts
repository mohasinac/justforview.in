/**
 * Auction UI Schema
 * Frontend display models with formatted fields
 */

/**
 * Price Display
 */
export interface PriceDisplay {
  raw: number;
  formatted: string;
  currency: string;
}

/**
 * Time Display
 */
export interface TimeDisplay {
  raw: Date;
  formatted: string;
  relative: string;
  timestamp: number;
}

/**
 * Time Remaining
 */
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  isEnded: boolean;
  display: string;
  shortDisplay: string;
}

/**
 * Auction Status Display
 */
export interface AuctionStatusDisplay {
  value: "draft" | "scheduled" | "live" | "ended" | "cancelled";
  label: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Bid Info
 */
export interface BidInfo {
  current: PriceDisplay;
  starting: PriceDisplay;
  reserve?: PriceDisplay;
  count: number;
  countLabel: string;
  hasReserve: boolean;
  reserveMet: boolean;
}

/**
 * Winner Info
 */
export interface WinnerInfo {
  hasWinner: boolean;
  winnerId?: string;
  winnerName?: string;
  finalBid?: PriceDisplay;
}

/**
 * Auction Badge
 */
export interface AuctionBadge {
  text: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Auction Image
 */
export interface AuctionImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

/**
 * Complete Auction UI Schema
 */
export interface AuctionUI {
  id: string;
  shopId: string;

  // Basic info
  name: string;
  slug: string;
  description: string;
  shortDescription: string;

  // Media
  images: AuctionImage[];
  primaryImage: string;
  videos: string[];

  // Bidding
  bid: BidInfo;

  // Timing
  startTime: TimeDisplay;
  endTime: TimeDisplay;
  timeRemaining: TimeRemaining;
  isStarted: boolean;
  isEnded: boolean;
  isLive: boolean;

  // Winner
  winner: WinnerInfo;

  // Status
  status: AuctionStatusDisplay;

  // Badges
  badges: AuctionBadge[];

  // Flags
  isFeatured: boolean;
  showOnHomepage: boolean;
  featuredPriority: number;

  // Backward compatibility for pages/tests
  currentBid: number; // alias for bid.current.raw
  startingBid: number; // alias for bid.starting.raw
  bidCount: number; // alias for bid.count

  // Timestamps
  createdAt: TimeDisplay;
  updatedAt: TimeDisplay;

  // URLs
  url: string;
  bidUrl: string;
}

/**
 * Simplified Auction Card UI
 */
export interface AuctionCardUI {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  primaryImage: string;
  bid: {
    current: PriceDisplay;
    count: number;
    countLabel: string;
  };
  timeRemaining: TimeRemaining;
  status: AuctionStatusDisplay;
  badges: AuctionBadge[];
  isLive: boolean;
  url: string;
}

/**
 * Simplified Auction List Item UI
 */
export interface AuctionListItemUI {
  id: string;
  name: string;
  slug: string;
  primaryImage: string;
  currentBid: PriceDisplay;
  bidCount: number;
  timeRemaining: string;
  status: AuctionStatusDisplay;
  isLive: boolean;
  url: string;
}

/**
 * Auction Form Data
 */
export interface AuctionFormData {
  shopId: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  videos?: string[];
  startingBid: number;
  reservePrice?: number;
  startTime: string;
  endTime: string;
  status: "draft" | "scheduled" | "live" | "ended" | "cancelled";
  isFeatured: boolean;
  showOnHomepage: boolean;
  featuredPriority?: number;
}

/**
 * Bid UI Schema
 */
export interface BidUI {
  id: string;
  auctionId: string;
  auctionName: string;
  userId: string;
  userName: string;
  bidAmount: PriceDisplay;
  bidTime: TimeDisplay;
  isWinning: boolean;
  isAutoBid: boolean;
  maxAutoBid?: PriceDisplay;
  status: {
    label: string;
    color: string;
    className: string;
  };
}

/**
 * Place Bid Form Data
 */
export interface PlaceBidFormData {
  auctionId: string;
  bidAmount: number;
  isAutoBid: boolean;
  maxAutoBid?: number;
}
