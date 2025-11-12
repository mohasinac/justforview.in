/**
 * Hero Slide UI Schema (Frontend)
 *
 * Defines the structure of Hero Slide data as displayed in the UI.
 * Includes formatted values, computed fields, and display helpers.
 */

import type {
  SlideType,
  SlideStatus,
} from "@/schemas/resources/hero-slide.schema";

/**
 * Slide Type Display
 */
export interface SlideTypeDisplay {
  value: SlideType;
  label: string;
  icon: string;
}

/**
 * Slide Status Display
 */
export interface SlideStatusDisplay {
  value: SlideStatus;
  label: string;
  color: string;
  className: string;
  icon: string;
}

/**
 * Button Action UI
 */
export interface ButtonActionUI {
  text: string;
  url: string;
  openInNewTab: boolean;
}

/**
 * Slide Stats Display
 */
export interface SlideStatsDisplay {
  viewCount: number;
  clickCount: number;
  clickRate: number;
  viewCountFormatted: string;
  clickCountFormatted: string;
  clickRateFormatted: string;
}

/**
 * Complete Hero Slide UI Schema
 */
export interface HeroSlideUI {
  // IDs
  id: string;

  // Basic Info
  title: string;
  subtitle?: string;
  description?: string;

  // Type & Content
  type: SlideTypeDisplay;
  imageUrl: string;
  mobileImageUrl?: string;
  videoUrl?: string;
  hasVideo: boolean;

  // Links
  linkUrl?: string;
  buttonAction?: ButtonActionUI;
  hasButton: boolean;

  // Related Entities
  productId?: string;
  categoryId?: string;
  shopId?: string;

  // Display Settings
  textPosition: "left" | "center" | "right";
  textColor: string;
  overlayColor?: string;
  overlayOpacity: number;
  style: {
    textAlign: string;
    color: string;
    background?: string;
  };

  // Ordering
  order: number;

  // Status & Scheduling
  status: SlideStatusDisplay;
  startDate?: Date;
  startDateFormatted?: string;
  endDate?: Date;
  endDateFormatted?: string;
  isScheduled: boolean;
  isExpired: boolean;
  schedulingInfo?: string;

  // Flags
  isActive: boolean;
  showOnMobile: boolean;

  // Stats
  stats: SlideStatsDisplay;

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  updatedAt: Date;
}

/**
 * Hero Slide Card UI (Simplified for cards)
 */
export interface HeroSlideCardUI {
  id: string;
  title: string;
  imageUrl: string;
  type: SlideTypeDisplay;
  status: SlideStatusDisplay;
  order: number;
  isActive: boolean;
}

/**
 * Hero Slide Form Data
 */
export interface HeroSlideFormData {
  title: string;
  subtitle?: string;
  description?: string;
  type: SlideType;
  imageUrl: string;
  mobileImageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  buttonAction?: {
    text: string;
    url: string;
    openInNewTab: boolean;
  };
  productId?: string;
  categoryId?: string;
  shopId?: string;
  textPosition: "left" | "center" | "right";
  textColor: string;
  overlayColor?: string;
  overlayOpacity: number;
  order: number;
  status: SlideStatus;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
  showOnMobile: boolean;
}
