/**
 * Auction Mapper
 * Transform backend Auction to UI format
 */

import type { Auction } from "@/schemas/resources/auction.schema";
import type {
  AuctionUI,
  AuctionCardUI,
  AuctionListItemUI,
  PriceDisplay,
  TimeDisplay,
  TimeRemaining,
  AuctionStatusDisplay,
  BidInfo,
  WinnerInfo,
  AuctionBadge,
  AuctionImage,
} from "@/schemas/ui/auction.ui";

/**
 * Format price to display format
 */
export const formatPrice = (amount: number): PriceDisplay => {
  return {
    raw: amount,
    formatted: `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    currency: "INR",
  };
};

/**
 * Format date to display format
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

/**
 * Get relative time string
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const seconds = Math.floor(Math.abs(diff) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (diff > 0) {
    if (days > 0) return `in ${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) return `in ${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `in ${minutes} minute${minutes > 1 ? "s" : ""}`;
    return "starting soon";
  } else {
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "just now";
  }
};

/**
 * Format time display
 */
export const formatTimeDisplay = (date: Date): TimeDisplay => {
  return {
    raw: date,
    formatted: formatDate(date),
    relative: getRelativeTime(date),
    timestamp: date.getTime(),
  };
};

/**
 * Calculate time remaining
 */
export const calculateTimeRemaining = (endTime: Date): TimeRemaining => {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();
  const isEnded = diff <= 0;

  if (isEnded) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
      isEnded: true,
      display: "Ended",
      shortDisplay: "Ended",
    };
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const displayDays = days;
  const displayHours = hours % 24;
  const displayMinutes = minutes % 60;
  const displaySeconds = seconds % 60;

  let display = "";
  let shortDisplay = "";

  if (days > 0) {
    display = `${days}d ${displayHours}h ${displayMinutes}m`;
    shortDisplay = `${days}d ${displayHours}h`;
  } else if (hours > 0) {
    display = `${displayHours}h ${displayMinutes}m ${displaySeconds}s`;
    shortDisplay = `${displayHours}h ${displayMinutes}m`;
  } else if (minutes > 0) {
    display = `${displayMinutes}m ${displaySeconds}s`;
    shortDisplay = `${displayMinutes}m`;
  } else {
    display = `${displaySeconds}s`;
    shortDisplay = `${displaySeconds}s`;
  }

  return {
    days: displayDays,
    hours: displayHours,
    minutes: displayMinutes,
    seconds: displaySeconds,
    total: diff,
    isEnded: false,
    display,
    shortDisplay,
  };
};

/**
 * Get auction status display
 */
export const getStatusDisplay = (
  status: string,
  startTime: Date,
  endTime: Date
): AuctionStatusDisplay => {
  const now = new Date();
  const isStarted = now >= startTime;
  const isEnded = now >= endTime;

  switch (status) {
    case "draft":
      return {
        value: "draft",
        label: "Draft",
        color: "gray",
        className: "bg-gray-100 text-gray-800",
        icon: "📝",
      };
    case "scheduled":
      return {
        value: "scheduled",
        label: "Scheduled",
        color: "blue",
        className: "bg-blue-100 text-blue-800",
        icon: "🗓️",
      };
    case "live":
      return {
        value: "live",
        label: "Live",
        color: "green",
        className: "bg-green-100 text-green-800 animate-pulse",
        icon: "🔴",
      };
    case "ended":
      return {
        value: "ended",
        label: "Ended",
        color: "red",
        className: "bg-red-100 text-red-800",
        icon: "🏁",
      };
    case "cancelled":
      return {
        value: "cancelled",
        label: "Cancelled",
        color: "orange",
        className: "bg-orange-100 text-orange-800",
        icon: "🚫",
      };
    default:
      return {
        value: "draft",
        label: "Unknown",
        color: "gray",
        className: "bg-gray-100 text-gray-800",
      };
  }
};

/**
 * Get bid info
 */
export const getBidInfo = (auction: Auction): BidInfo => {
  const hasReserve = auction.reservePrice !== undefined;
  const reserveMet = hasReserve
    ? auction.currentBid >= auction.reservePrice!
    : true;

  return {
    current: formatPrice(auction.currentBid),
    starting: formatPrice(auction.startingBid),
    reserve: hasReserve ? formatPrice(auction.reservePrice!) : undefined,
    count: auction.bidCount,
    countLabel: `${auction.bidCount} bid${auction.bidCount !== 1 ? "s" : ""}`,
    hasReserve,
    reserveMet,
  };
};

/**
 * Get winner info
 */
export const getWinnerInfo = (auction: Auction): WinnerInfo => {
  return {
    hasWinner: !!auction.winnerId,
    winnerId: auction.winnerId,
    finalBid: auction.finalBid ? formatPrice(auction.finalBid) : undefined,
  };
};

/**
 * Generate auction badges
 */
export const generateBadges = (auction: Auction): AuctionBadge[] => {
  const badges: AuctionBadge[] = [];

  if (auction.isFeatured) {
    badges.push({
      text: "Featured",
      color: "yellow",
      className: "bg-yellow-100 text-yellow-800",
      icon: "⭐",
    });
  }

  if (auction.status === "live") {
    badges.push({
      text: "Live Now",
      color: "green",
      className: "bg-green-100 text-green-800 animate-pulse",
      icon: "🔴",
    });
  }

  const now = new Date();
  const timeRemaining = auction.endTime.getTime() - now.getTime();
  if (auction.status === "live" && timeRemaining < 3600000) {
    // Less than 1 hour
    badges.push({
      text: "Ending Soon",
      color: "red",
      className: "bg-red-100 text-red-800",
      icon: "⏰",
    });
  }

  if (auction.bidCount === 0 && auction.status === "live") {
    badges.push({
      text: "No Bids Yet",
      color: "blue",
      className: "bg-blue-100 text-blue-800",
      icon: "🎯",
    });
  }

  if (auction.reservePrice && auction.currentBid >= auction.reservePrice) {
    badges.push({
      text: "Reserve Met",
      color: "green",
      className: "bg-green-100 text-green-800",
      icon: "✓",
    });
  }

  return badges;
};

/**
 * Format auction images
 */
export const formatImages = (
  images: string[],
  name: string
): AuctionImage[] => {
  return images.map((url, index) => ({
    url,
    alt: `${name} - Image ${index + 1}`,
    isPrimary: index === 0,
  }));
};

/**
 * Get short description
 */
export const getShortDescription = (description: string): string => {
  if (description.length <= 150) return description;
  return description.substring(0, 147) + "...";
};

/**
 * Main Mapper: Backend Auction to UI
 */
export const mapAuctionToUI = (auction: Auction): AuctionUI => {
  const now = new Date();
  const isStarted = now >= auction.startTime;
  const isEnded = now >= auction.endTime;
  const isLive = auction.status === "live" && isStarted && !isEnded;

  return {
    id: auction.id,
    shopId: auction.shopId,

    // Basic info
    name: auction.name,
    slug: auction.slug,
    description: auction.description,
    shortDescription: getShortDescription(auction.description),

    // Media
    images: formatImages(auction.images, auction.name),
    primaryImage: auction.images[0] || "",
    videos: auction.videos || [],

    // Bidding
    bid: getBidInfo(auction),

    // Timing
    startTime: formatTimeDisplay(auction.startTime),
    endTime: formatTimeDisplay(auction.endTime),
    timeRemaining: calculateTimeRemaining(auction.endTime),
    isStarted,
    isEnded,
    isLive,

    // Winner
    winner: getWinnerInfo(auction),

    // Status
    status: getStatusDisplay(
      auction.status,
      auction.startTime,
      auction.endTime
    ),

    // Badges
    badges: generateBadges(auction),

    // Flags
    isFeatured: auction.isFeatured,
    showOnHomepage: auction.showOnHomepage,
    featuredPriority: auction.featuredPriority || 0,

    // Timestamps
    createdAt: formatTimeDisplay(auction.createdAt),
    updatedAt: formatTimeDisplay(auction.updatedAt),

    // URLs
    url: `/auctions/${auction.slug}`,
    bidUrl: `/auctions/${auction.slug}#bid`,
  };
};

/**
 * Simplified Mapper: Backend Auction to Card UI
 */
export const mapAuctionToCard = (auction: Auction): AuctionCardUI => {
  const now = new Date();
  const isStarted = now >= auction.startTime;
  const isEnded = now >= auction.endTime;
  const isLive = auction.status === "live" && isStarted && !isEnded;

  return {
    id: auction.id,
    name: auction.name,
    slug: auction.slug,
    shortDescription: getShortDescription(auction.description),
    primaryImage: auction.images[0] || "",
    bid: {
      current: formatPrice(auction.currentBid),
      count: auction.bidCount,
      countLabel: `${auction.bidCount} bid${auction.bidCount !== 1 ? "s" : ""}`,
    },
    timeRemaining: calculateTimeRemaining(auction.endTime),
    status: getStatusDisplay(
      auction.status,
      auction.startTime,
      auction.endTime
    ),
    badges: generateBadges(auction),
    isLive,
    url: `/auctions/${auction.slug}`,
  };
};

/**
 * Simplified Mapper: Backend Auction to List Item UI
 */
export const mapAuctionToListItem = (auction: Auction): AuctionListItemUI => {
  const now = new Date();
  const isStarted = now >= auction.startTime;
  const isEnded = now >= auction.endTime;
  const isLive = auction.status === "live" && isStarted && !isEnded;

  return {
    id: auction.id,
    name: auction.name,
    slug: auction.slug,
    primaryImage: auction.images[0] || "",
    currentBid: formatPrice(auction.currentBid),
    bidCount: auction.bidCount,
    timeRemaining: calculateTimeRemaining(auction.endTime).display,
    status: getStatusDisplay(
      auction.status,
      auction.startTime,
      auction.endTime
    ),
    isLive,
    url: `/auctions/${auction.slug}`,
  };
};

/**
 * Bulk Mapper: Array of Auctions to UI
 */
export const mapAuctionsToUI = (auctions: Auction[]): AuctionUI[] => {
  return auctions.map(mapAuctionToUI);
};

/**
 * Bulk Mapper: Array of Auctions to Cards
 */
export const mapAuctionsToCards = (auctions: Auction[]): AuctionCardUI[] => {
  return auctions.map(mapAuctionToCard);
};

/**
 * Bulk Mapper: Array of Auctions to List Items
 */
export const mapAuctionsToListItems = (
  auctions: Auction[]
): AuctionListItemUI[] => {
  return auctions.map(mapAuctionToListItem);
};
