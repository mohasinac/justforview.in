/**
 * Coupon UI Schema
 * Frontend display models with formatted fields
 */

/**
 * Coupon Type Display
 */
export interface CouponTypeDisplay {
  value: "percentage" | "flat" | "bogo" | "tiered" | "free-shipping";
  label: string;
  icon: string;
  color: string;
  className: string;
}

/**
 * Coupon Status Display
 */
export interface CouponStatusDisplay {
  value: "active" | "inactive" | "expired" | "used-up";
  label: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Coupon Discount Display
 */
export interface CouponDiscountDisplay {
  type: string;
  value: string;
  formatted: string;
  description: string;
}

/**
 * Coupon Validity Display
 */
export interface CouponValidityDisplay {
  startDate: Date;
  endDate: Date;
  startDateFormatted: string;
  endDateFormatted: string;
  isValid: boolean;
  isUpcoming: boolean;
  isExpired: boolean;
  daysRemaining?: number;
  validityText: string;
}

/**
 * Coupon Usage Display
 */
export interface CouponUsageDisplay {
  usageCount: number;
  usageLimit?: number;
  usageLimitPerUser: number;
  remainingUses?: number;
  usagePercentage?: number;
  usageText: string;
  isUnlimited: boolean;
  isUsedUp: boolean;
}

/**
 * Coupon Requirements Display
 */
export interface CouponRequirementsDisplay {
  minPurchaseAmount: number;
  minPurchaseFormatted: string;
  minQuantity: number;
  hasMinPurchase: boolean;
  hasMinQuantity: boolean;
  requirementsText: string;
}

/**
 * Coupon Badge
 */
export interface CouponBadge {
  text: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Complete Coupon UI Schema
 */
export interface CouponUI {
  id: string;
  shopId: string;

  // Basic info
  code: string;
  name: string;
  description?: string;

  // Type & discount
  type: CouponTypeDisplay;
  discount: CouponDiscountDisplay;
  maxDiscountAmount?: number;
  maxDiscountFormatted?: string;

  // Validity
  validity: CouponValidityDisplay;

  // Usage
  usage: CouponUsageDisplay;

  // Requirements
  requirements: CouponRequirementsDisplay;

  // Applicability
  applicability: string;
  applicabilityText: string;
  hasRestrictions: boolean;

  // Status
  status: CouponStatusDisplay;

  // Flags
  firstOrderOnly: boolean;
  newUsersOnly: boolean;
  canCombineWithOtherCoupons: boolean;
  autoApply: boolean;
  isPublic: boolean;
  isFeatured: boolean;

  // Badges
  badges: CouponBadge[];

  // URLs
  url: string;
  applyUrl: string;

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  updatedAt: Date;
}

/**
 * Simplified Coupon Card UI
 */
export interface CouponCardUI {
  id: string;
  code: string;
  name: string;
  discount: CouponDiscountDisplay;
  validity: CouponValidityDisplay;
  requirements: CouponRequirementsDisplay;
  status: CouponStatusDisplay;
  badges: CouponBadge[];
  applyUrl: string;
}

/**
 * Simplified Coupon List Item UI
 */
export interface CouponListItemUI {
  id: string;
  code: string;
  name: string;
  type: string;
  status: string;
  isActive: boolean;
  validUntil: Date;
  usageCount: number;
}

/**
 * Coupon Form Data
 */
export interface CouponFormData {
  shopId: string;
  code: string;
  name: string;
  description?: string;
  type: "percentage" | "flat" | "bogo" | "tiered" | "free-shipping";
  discountValue?: number;
  maxDiscountAmount?: number;
  minPurchaseAmount: number;
  minQuantity: number;
  applicability: "all" | "category" | "product";
  applicableCategories?: string[];
  applicableProducts?: string[];
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  usageLimitPerUser: number;
  firstOrderOnly: boolean;
  newUsersOnly: boolean;
  canCombineWithOtherCoupons: boolean;
  autoApply: boolean;
  isPublic: boolean;
  isFeatured: boolean;
}

/**
 * Coupon Validation Result
 */
export interface CouponValidationResult {
  isValid: boolean;
  code: string;
  discount: number;
  discountFormatted: string;
  message: string;
  errors?: string[];
}
