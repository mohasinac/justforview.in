/**
 * Hero Slide Mapper
 *
 * Transforms Hero Slide data between backend (Firestore) and frontend (UI) formats.
 */

import type { HeroSlide } from "@/schemas/resources/hero-slide.schema";
import type {
  HeroSlideUI,
  HeroSlideCardUI,
  SlideTypeDisplay,
  SlideStatusDisplay,
  SlideStatsDisplay,
} from "@/schemas/ui/hero-slide.ui";

/**
 * Format date
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Format count
 */
function formatCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

/**
 * Get slide type display
 */
function getSlideTypeDisplay(type: HeroSlide["type"]): SlideTypeDisplay {
  const typeMap: Record<HeroSlide["type"], { label: string; icon: string }> = {
    image: { label: "Image", icon: "image" },
    video: { label: "Video", icon: "videocam" },
    product: { label: "Product", icon: "inventory" },
    category: { label: "Category", icon: "category" },
  };

  return {
    value: type,
    ...typeMap[type],
  };
}

/**
 * Get slide status display
 */
function getSlideStatusDisplay(slide: HeroSlide): SlideStatusDisplay {
  const now = new Date();
  let status = slide.status;

  // Auto-detect status based on schedule
  if (status === "scheduled" && slide.startDate && slide.startDate <= now) {
    status = "active";
  }
  if (status === "active" && slide.endDate && slide.endDate < now) {
    status = "inactive";
  }

  const statusMap: Record<
    HeroSlide["status"],
    { label: string; color: string; className: string; icon: string }
  > = {
    draft: {
      label: "Draft",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "edit",
    },
    active: {
      label: "Active",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "check_circle",
    },
    scheduled: {
      label: "Scheduled",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "schedule",
    },
    inactive: {
      label: "Inactive",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "cancel",
    },
  };

  return {
    value: status,
    ...statusMap[status],
  };
}

/**
 * Get stats display
 */
function getStatsDisplay(slide: HeroSlide): SlideStatsDisplay {
  const clickRate =
    slide.viewCount > 0 ? (slide.clickCount / slide.viewCount) * 100 : 0;

  return {
    viewCount: slide.viewCount,
    clickCount: slide.clickCount,
    clickRate,
    viewCountFormatted: formatCount(slide.viewCount),
    clickCountFormatted: formatCount(slide.clickCount),
    clickRateFormatted: `${clickRate.toFixed(1)}%`,
  };
}

/**
 * Get scheduling info
 */
function getSchedulingInfo(slide: HeroSlide): string | undefined {
  const now = new Date();

  if (slide.startDate && slide.startDate > now) {
    return `Starts ${formatDate(slide.startDate)}`;
  }
  if (slide.endDate && slide.endDate > now) {
    return `Ends ${formatDate(slide.endDate)}`;
  }
  if (slide.endDate && slide.endDate < now) {
    return "Expired";
  }
  return undefined;
}

/**
 * Get inline styles
 */
function getInlineStyles(slide: HeroSlide) {
  const textAlignMap = {
    left: "left",
    center: "center",
    right: "right",
  };

  const style: any = {
    textAlign: textAlignMap[slide.textPosition],
    color: slide.textColor,
  };

  if (slide.overlayColor) {
    style.background = `rgba(${slide.overlayColor}, ${slide.overlayOpacity})`;
  }

  return style;
}

/**
 * Map HeroSlide to HeroSlideUI
 */
export function mapHeroSlideToUI(slide: HeroSlide): HeroSlideUI {
  const now = new Date();

  return {
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    description: slide.description,
    type: getSlideTypeDisplay(slide.type),
    imageUrl: slide.imageUrl,
    mobileImageUrl: slide.mobileImageUrl,
    videoUrl: slide.videoUrl,
    hasVideo: !!slide.videoUrl,
    linkUrl: slide.linkUrl,
    buttonAction: slide.buttonAction,
    hasButton: !!slide.buttonAction,
    productId: slide.productId,
    categoryId: slide.categoryId,
    shopId: slide.shopId,
    textPosition: slide.textPosition,
    textColor: slide.textColor,
    overlayColor: slide.overlayColor,
    overlayOpacity: slide.overlayOpacity,
    style: getInlineStyles(slide),
    order: slide.order,
    status: getSlideStatusDisplay(slide),
    startDate: slide.startDate,
    startDateFormatted: slide.startDate
      ? formatDate(slide.startDate)
      : undefined,
    endDate: slide.endDate,
    endDateFormatted: slide.endDate ? formatDate(slide.endDate) : undefined,
    isScheduled: !!slide.startDate && slide.startDate > now,
    isExpired: !!slide.endDate && slide.endDate < now,
    schedulingInfo: getSchedulingInfo(slide),
    isActive: slide.isActive,
    showOnMobile: slide.showOnMobile,
    stats: getStatsDisplay(slide),
    createdAt: slide.createdAt,
    createdAtFormatted: formatDate(slide.createdAt),
    updatedAt: slide.updatedAt,
  };
}

/**
 * Map HeroSlide to HeroSlideCardUI
 */
export function mapHeroSlideToCard(slide: HeroSlide): HeroSlideCardUI {
  return {
    id: slide.id,
    title: slide.title,
    imageUrl: slide.imageUrl,
    type: getSlideTypeDisplay(slide.type),
    status: getSlideStatusDisplay(slide),
    order: slide.order,
    isActive: slide.isActive,
  };
}
