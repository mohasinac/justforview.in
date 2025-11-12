/**
 * Card Component Types
 * Shared prop types for card components
 */

import type { ProductUI } from "@/schemas/ui/product.ui";
import type { AuctionUI } from "@/schemas/ui/auction.ui";
import type { CategoryUI } from "@/schemas/ui/category.ui";
import type { ShopUI, ShopCardUI } from "@/schemas/ui/shop.ui";
import type { OrderUI } from "@/schemas/ui/order.ui";
import type { ReviewUI, ReviewCardUI } from "@/schemas/ui/review.ui";

/**
 * Base Card Props
 */
export interface BaseCardProps {
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

/**
 * Product Card Props
 */
export interface ProductCardProps extends BaseCardProps {
  product: ProductUI;
  showQuickView?: boolean;
  showCompare?: boolean;
  showWishlist?: boolean;
  variant?: "default" | "compact" | "grid" | "list";
}

/**
 * Auction Card Props
 */
export interface AuctionCardProps extends BaseCardProps {
  auction: AuctionUI;
  showBidButton?: boolean;
  showWatchButton?: boolean;
  variant?: "default" | "compact" | "grid" | "list";
}

/**
 * Category Card Props
 */
export interface CategoryCardProps extends BaseCardProps {
  category: CategoryUI;
  showProductCount?: boolean;
  showSubcategories?: boolean;
  variant?: "default" | "compact" | "icon" | "image";
}

/**
 * Shop Card Props
 */
export interface ShopCardProps extends BaseCardProps {
  shop: ShopCardUI;
  showFollowButton?: boolean;
  showStats?: boolean;
  variant?: "default" | "compact" | "grid" | "list";
}

/**
 * Order Card Props
 */
export interface OrderCardProps extends BaseCardProps {
  order: OrderUI;
  showActions?: boolean;
  variant?: "default" | "compact";
}

/**
 * Review Card Props
 */
export interface ReviewCardProps extends BaseCardProps {
  review: ReviewCardUI;
  showHelpful?: boolean;
  showReply?: boolean;
  variant?: "default" | "compact";
}

/**
 * Card Grid Props
 */
export interface CardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 5;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Card Skeleton Props
 */
export interface CardSkeletonProps {
  count?: number;
  variant?: "product" | "auction" | "category" | "shop" | "order";
}
