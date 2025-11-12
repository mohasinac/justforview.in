/**
 * Review Mapper
 * Transforms Review backend schema to UI schema
 */

import type { Review } from "../resources/review.schema";
import type {
  ReviewUI,
  ReviewCardUI,
  ReviewListItemUI,
  ReviewRatingDisplay,
  ReviewAuthorDisplay,
  ReviewTargetDisplay,
  ReviewStatusDisplay,
  ReviewBadge,
} from "../ui/review.ui";

/**
 * Format date to Indian format
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Get time ago string
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return formatDate(date);
}

/**
 * Get rating display
 */
function getRatingDisplay(rating: number): ReviewRatingDisplay {
  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
  const colors = ["#EF4444", "#F59E0B", "#F59E0B", "#10B981", "#059669"];
  const classNames = [
    "bg-red-100 text-red-800",
    "bg-amber-100 text-amber-800",
    "bg-amber-100 text-amber-800",
    "bg-green-100 text-green-800",
    "bg-emerald-100 text-emerald-800",
  ];

  return {
    rating,
    stars: rating,
    label: labels[rating - 1] || "Unknown",
    className: classNames[rating - 1] || classNames[2],
    color: colors[rating - 1] || colors[2],
  };
}

/**
 * Get review status display
 */
function getStatusDisplay(review: Review): ReviewStatusDisplay {
  const isApproved = review.isApproved === true;
  const isPending = review.isApproved === undefined;
  const isRejected = review.isApproved === false;

  let label = "Pending";
  let color = "#F59E0B";
  let className = "bg-amber-100 text-amber-800";

  if (isApproved) {
    label = "Approved";
    color = "#10B981";
    className = "bg-green-100 text-green-800";
  } else if (isRejected) {
    label = "Rejected";
    color = "#EF4444";
    className = "bg-red-100 text-red-800";
  }

  return {
    isApproved,
    isPending,
    isRejected,
    label,
    color,
    className,
  };
}

/**
 * Generate review badges
 */
function generateBadges(review: Review): ReviewBadge[] {
  const badges: ReviewBadge[] = [];

  if (review.verifiedPurchase) {
    badges.push({
      text: "Verified Purchase",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "verified",
    });
  }

  if (review.isFeatured) {
    badges.push({
      text: "Featured",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
      icon: "star",
    });
  }

  if (review.media && review.media.length > 0) {
    badges.push({
      text: `${review.media.length} ${
        review.media.length === 1 ? "Photo" : "Photos"
      }`,
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "photo_camera",
    });
  }

  if (review.helpfulCount > 10) {
    badges.push({
      text: "Helpful",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "thumb_up",
    });
  }

  return badges;
}

/**
 * Get helpful count label
 */
function getHelpfulCountLabel(count: number): string {
  if (count === 0) return "No helpful votes";
  if (count === 1) return "1 person found this helpful";
  return `${count} people found this helpful`;
}

/**
 * Get comment excerpt
 */
function getCommentExcerpt(comment: string, maxLength = 150): string {
  if (comment.length <= maxLength) return comment;
  return comment.slice(0, maxLength).trim() + "...";
}

/**
 * Map Review to ReviewUI
 */
export function mapReviewToUI(
  review: Review,
  authorName?: string,
  authorAvatar?: string,
  targetName?: string,
  targetType?: "product" | "shop" | "auction" | "category"
): ReviewUI {
  const author: ReviewAuthorDisplay = {
    userId: review.userId,
    userName: authorName || "Anonymous",
    userAvatar: authorAvatar,
    isVerified: review.verifiedPurchase,
  };

  let target: ReviewTargetDisplay | undefined;
  if (targetName && targetType) {
    const targetId =
      review.productId ||
      review.shopId ||
      review.auctionId ||
      review.categoryId ||
      "";
    const urlPaths = {
      product: "products",
      shop: "shops",
      auction: "auctions",
      category: "categories",
    };
    target = {
      type: targetType,
      id: targetId,
      name: targetName,
      url: `/${urlPaths[targetType]}/${targetId}`,
    };
  }

  return {
    id: review.id,
    userId: review.userId,
    target,
    productId: review.productId,
    shopId: review.shopId,
    auctionId: review.auctionId,
    categoryId: review.categoryId,
    orderItemId: review.orderItemId,
    rating: getRatingDisplay(review.rating),
    title: review.title,
    comment: review.comment,
    media: review.media || [],
    hasMedia: (review.media?.length || 0) > 0,
    author,
    verifiedPurchase: review.verifiedPurchase,
    helpfulCount: review.helpfulCount,
    helpfulCountLabel: getHelpfulCountLabel(review.helpfulCount),
    isFeatured: review.isFeatured,
    showOnHomepage: review.showOnHomepage,
    status: getStatusDisplay(review),
    moderatedAt: review.moderatedAt,
    moderatedAtFormatted: review.moderatedAt
      ? formatDate(review.moderatedAt)
      : undefined,
    moderatedBy: review.moderatedBy,
    badges: generateBadges(review),
    createdAt: review.createdAt,
    createdAtFormatted: formatDate(review.createdAt),
    timeAgo: getTimeAgo(review.createdAt),
    updatedAt: review.updatedAt,
  };
}

/**
 * Map Review to ReviewCardUI
 */
export function mapReviewToCard(
  review: Review,
  authorName?: string,
  authorAvatar?: string
): ReviewCardUI {
  const author: ReviewAuthorDisplay = {
    userId: review.userId,
    userName: authorName || "Anonymous",
    userAvatar: authorAvatar,
    isVerified: review.verifiedPurchase,
  };

  return {
    id: review.id,
    rating: getRatingDisplay(review.rating),
    title: review.title,
    comment: review.comment,
    commentExcerpt: getCommentExcerpt(review.comment),
    author,
    verifiedPurchase: review.verifiedPurchase,
    helpfulCount: review.helpfulCount,
    hasMedia: (review.media?.length || 0) > 0,
    mediaCount: review.media?.length || 0,
    badges: generateBadges(review),
    timeAgo: getTimeAgo(review.createdAt),
  };
}

/**
 * Map Review to ReviewListItemUI
 */
export function mapReviewToListItem(
  review: Review,
  authorName?: string
): ReviewListItemUI {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    author: authorName || "Anonymous",
    verifiedPurchase: review.verifiedPurchase,
    isApproved: review.isApproved === true,
    createdAt: review.createdAt,
  };
}
