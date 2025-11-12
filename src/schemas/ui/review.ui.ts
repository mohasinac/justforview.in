/**
 * Review UI Schema
 * Frontend display models with formatted fields
 */

/**
 * Review Rating Display
 */
export interface ReviewRatingDisplay {
  rating: number;
  stars: number;
  label: string;
  className: string;
  color: string;
}

/**
 * Review Author Display
 */
export interface ReviewAuthorDisplay {
  userId: string;
  userName: string;
  userAvatar?: string;
  isVerified: boolean;
}

/**
 * Review Target Display
 */
export interface ReviewTargetDisplay {
  type: "product" | "shop" | "auction" | "category";
  id: string;
  name: string;
  url: string;
}

/**
 * Review Status Display
 */
export interface ReviewStatusDisplay {
  isApproved: boolean;
  isPending: boolean;
  isRejected: boolean;
  label: string;
  color: string;
  className: string;
}

/**
 * Review Badge
 */
export interface ReviewBadge {
  text: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Complete Review UI Schema
 */
export interface ReviewUI {
  id: string;
  userId: string;

  // Target
  target?: ReviewTargetDisplay;
  productId?: string;
  shopId?: string;
  auctionId?: string;
  categoryId?: string;
  orderItemId?: string;

  // Content
  rating: ReviewRatingDisplay;
  title?: string;
  comment: string;
  media: string[];
  hasMedia: boolean;

  // Author
  author: ReviewAuthorDisplay;

  // Verification
  verifiedPurchase: boolean;

  // Engagement
  helpfulCount: number;
  helpfulCountLabel: string;

  // Flags
  isFeatured: boolean;
  showOnHomepage: boolean;

  // Status
  status: ReviewStatusDisplay;
  moderatedAt?: Date;
  moderatedAtFormatted?: string;
  moderatedBy?: string;

  // Badges
  badges: ReviewBadge[];

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  timeAgo: string;
  updatedAt: Date;
}

/**
 * Simplified Review Card UI
 */
export interface ReviewCardUI {
  id: string;
  rating: ReviewRatingDisplay;
  title?: string;
  comment: string;
  commentExcerpt: string;
  author: ReviewAuthorDisplay;
  verifiedPurchase: boolean;
  helpfulCount: number;
  hasMedia: boolean;
  mediaCount: number;
  badges: ReviewBadge[];
  timeAgo: string;
}

/**
 * Simplified Review List Item UI
 */
export interface ReviewListItemUI {
  id: string;
  rating: number;
  comment: string;
  author: string;
  verifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: Date;
}

/**
 * Review Form Data
 */
export interface ReviewFormData {
  productId?: string;
  shopId?: string;
  auctionId?: string;
  categoryId?: string;
  orderItemId?: string;
  rating: number;
  title?: string;
  comment: string;
  media?: string[];
  verifiedPurchase: boolean;
}

/**
 * Review Stats Display
 */
export interface ReviewStatsDisplay {
  averageRating: number;
  averageRatingFormatted: string;
  totalReviews: number;
  totalReviewsLabel: string;
  distribution: Array<{
    stars: number;
    count: number;
    percentage: number;
  }>;
  verifiedPurchaseCount: number;
  verifiedPurchasePercentage: number;
}

/**
 * Review Summary
 */
export interface ReviewSummary {
  stats: ReviewStatsDisplay;
  recentReviews: ReviewCardUI[];
  featuredReviews: ReviewCardUI[];
}
