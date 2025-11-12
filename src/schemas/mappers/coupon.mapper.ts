/**
 * Coupon Mapper
 * Transforms Coupon backend schema to UI schema
 */

import type { Coupon } from "../resources/coupon.schema";
import type {
  CouponUI,
  CouponCardUI,
  CouponListItemUI,
  CouponTypeDisplay,
  CouponStatusDisplay,
  CouponDiscountDisplay,
  CouponValidityDisplay,
  CouponUsageDisplay,
  CouponRequirementsDisplay,
  CouponBadge,
} from "../ui/coupon.ui";

/**
 * Format price to Indian currency
 */
function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date to Indian format
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Get coupon type display
 */
function getCouponTypeDisplay(type: Coupon["type"]): CouponTypeDisplay {
  const typeMap: Record<
    Coupon["type"],
    { label: string; icon: string; color: string; className: string }
  > = {
    percentage: {
      label: "Percentage Off",
      icon: "percent",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
    },
    flat: {
      label: "Flat Discount",
      icon: "currency_rupee",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
    },
    bogo: {
      label: "Buy One Get One",
      icon: "redeem",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
    },
    tiered: {
      label: "Tiered Discount",
      icon: "trending_up",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
    },
    "free-shipping": {
      label: "Free Shipping",
      icon: "local_shipping",
      color: "#EC4899",
      className: "bg-pink-100 text-pink-800",
    },
  };

  return {
    value: type,
    ...typeMap[type],
  };
}

/**
 * Get coupon status display
 */
function getCouponStatusDisplay(coupon: Coupon): CouponStatusDisplay {
  const now = new Date();
  let status: Coupon["status"] = coupon.status;

  // Auto-detect expired
  if (status === "active" && coupon.endDate < now) {
    status = "expired";
  }

  // Auto-detect used up
  if (
    status === "active" &&
    coupon.usageLimit &&
    coupon.usageCount >= coupon.usageLimit
  ) {
    status = "used-up";
  }

  const statusMap: Record<
    Coupon["status"],
    { label: string; color: string; className: string; icon?: string }
  > = {
    active: {
      label: "Active",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "check_circle",
    },
    inactive: {
      label: "Inactive",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "pause_circle",
    },
    expired: {
      label: "Expired",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "cancel",
    },
    "used-up": {
      label: "Used Up",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
      icon: "inventory",
    },
  };

  return {
    value: status,
    ...statusMap[status],
  };
}

/**
 * Get discount display
 */
function getDiscountDisplay(coupon: Coupon): CouponDiscountDisplay {
  let formatted = "";
  let description = "";

  switch (coupon.type) {
    case "percentage":
      formatted = `${coupon.discountValue}% OFF`;
      description = `Get ${coupon.discountValue}% discount`;
      if (coupon.maxDiscountAmount) {
        description += ` (max ${formatPrice(coupon.maxDiscountAmount)})`;
      }
      break;

    case "flat":
      formatted = `${formatPrice(coupon.discountValue || 0)} OFF`;
      description = `Get ${formatPrice(coupon.discountValue || 0)} discount`;
      break;

    case "bogo":
      if (coupon.bogoConfig) {
        formatted = `Buy ${coupon.bogoConfig.buyQuantity} Get ${coupon.bogoConfig.getQuantity}`;
        description = `Buy ${coupon.bogoConfig.buyQuantity}, Get ${coupon.bogoConfig.getQuantity} at ${coupon.bogoConfig.discountPercentage}% off`;
      }
      break;

    case "tiered":
      formatted = "Tiered Discount";
      if (coupon.tiers && coupon.tiers.length > 0) {
        const maxTier = coupon.tiers[coupon.tiers.length - 1];
        description = `Up to ${maxTier.discountPercentage}% off based on cart value`;
      }
      break;

    case "free-shipping":
      formatted = "FREE SHIPPING";
      description = "Free shipping on this order";
      break;
  }

  return {
    type: coupon.type,
    value: String(coupon.discountValue || 0),
    formatted,
    description,
  };
}

/**
 * Get validity display
 */
function getValidityDisplay(coupon: Coupon): CouponValidityDisplay {
  const now = new Date();
  const isUpcoming = coupon.startDate > now;
  const isExpired = coupon.endDate < now;
  const isValid = !isUpcoming && !isExpired && coupon.status === "active";

  let daysRemaining: number | undefined;
  if (!isExpired) {
    daysRemaining = Math.floor(
      (coupon.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  let validityText = "";
  if (isExpired) {
    validityText = "Expired";
  } else if (isUpcoming) {
    validityText = `Starts ${formatDate(coupon.startDate)}`;
  } else if (daysRemaining !== undefined) {
    if (daysRemaining === 0) {
      validityText = "Expires today";
    } else if (daysRemaining === 1) {
      validityText = "Expires tomorrow";
    } else if (daysRemaining <= 7) {
      validityText = `${daysRemaining} days left`;
    } else {
      validityText = `Valid until ${formatDate(coupon.endDate)}`;
    }
  }

  return {
    startDate: coupon.startDate,
    endDate: coupon.endDate,
    startDateFormatted: formatDate(coupon.startDate),
    endDateFormatted: formatDate(coupon.endDate),
    isValid,
    isUpcoming,
    isExpired,
    daysRemaining,
    validityText,
  };
}

/**
 * Get usage display
 */
function getUsageDisplay(coupon: Coupon): CouponUsageDisplay {
  const isUnlimited = !coupon.usageLimit;
  const remainingUses = coupon.usageLimit
    ? Math.max(0, coupon.usageLimit - coupon.usageCount)
    : undefined;
  const usagePercentage = coupon.usageLimit
    ? (coupon.usageCount / coupon.usageLimit) * 100
    : undefined;
  const isUsedUp = coupon.usageLimit
    ? coupon.usageCount >= coupon.usageLimit
    : false;

  let usageText = "";
  if (isUnlimited) {
    usageText = "Unlimited uses";
  } else if (isUsedUp) {
    usageText = "All uses claimed";
  } else {
    usageText = `${remainingUses} of ${coupon.usageLimit} uses left`;
  }

  return {
    usageCount: coupon.usageCount,
    usageLimit: coupon.usageLimit,
    usageLimitPerUser: coupon.usageLimitPerUser,
    remainingUses,
    usagePercentage,
    usageText,
    isUnlimited,
    isUsedUp,
  };
}

/**
 * Get requirements display
 */
function getRequirementsDisplay(coupon: Coupon): CouponRequirementsDisplay {
  const hasMinPurchase = coupon.minPurchaseAmount > 0;
  const hasMinQuantity = coupon.minQuantity > 0;

  let requirementsText = "";
  const parts: string[] = [];

  if (hasMinPurchase) {
    parts.push(`Min purchase: ${formatPrice(coupon.minPurchaseAmount)}`);
  }

  if (hasMinQuantity) {
    parts.push(`Min ${coupon.minQuantity} items`);
  }

  if (parts.length === 0) {
    requirementsText = "No minimum requirements";
  } else {
    requirementsText = parts.join(" | ");
  }

  return {
    minPurchaseAmount: coupon.minPurchaseAmount,
    minPurchaseFormatted: formatPrice(coupon.minPurchaseAmount),
    minQuantity: coupon.minQuantity,
    hasMinPurchase,
    hasMinQuantity,
    requirementsText,
  };
}

/**
 * Get applicability text
 */
function getApplicabilityText(coupon: Coupon): string {
  switch (coupon.applicability) {
    case "all":
      return "All products";
    case "category":
      const catCount = coupon.applicableCategories?.length || 0;
      return `${catCount} ${catCount === 1 ? "category" : "categories"}`;
    case "product":
      const prodCount = coupon.applicableProducts?.length || 0;
      return `${prodCount} ${prodCount === 1 ? "product" : "products"}`;
    default:
      return "All products";
  }
}

/**
 * Generate coupon badges
 */
function generateBadges(coupon: Coupon): CouponBadge[] {
  const badges: CouponBadge[] = [];

  if (coupon.isFeatured) {
    badges.push({
      text: "Featured",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
      icon: "star",
    });
  }

  if (coupon.firstOrderOnly) {
    badges.push({
      text: "First Order",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "new_releases",
    });
  }

  if (coupon.newUsersOnly) {
    badges.push({
      text: "New Users",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "person_add",
    });
  }

  if (coupon.autoApply) {
    badges.push({
      text: "Auto-applied",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "autorenew",
    });
  }

  return badges;
}

/**
 * Map Coupon to CouponUI
 */
export function mapCouponToUI(coupon: Coupon): CouponUI {
  const hasRestrictions =
    coupon.firstOrderOnly ||
    coupon.newUsersOnly ||
    !coupon.canCombineWithOtherCoupons ||
    coupon.applicability !== "all";

  return {
    id: coupon.id,
    shopId: coupon.shopId,
    code: coupon.code,
    name: coupon.name,
    description: coupon.description,
    type: getCouponTypeDisplay(coupon.type),
    discount: getDiscountDisplay(coupon),
    maxDiscountAmount: coupon.maxDiscountAmount,
    maxDiscountFormatted: coupon.maxDiscountAmount
      ? formatPrice(coupon.maxDiscountAmount)
      : undefined,
    validity: getValidityDisplay(coupon),
    usage: getUsageDisplay(coupon),
    requirements: getRequirementsDisplay(coupon),
    applicability: coupon.applicability,
    applicabilityText: getApplicabilityText(coupon),
    hasRestrictions,
    status: getCouponStatusDisplay(coupon),
    firstOrderOnly: coupon.firstOrderOnly,
    newUsersOnly: coupon.newUsersOnly,
    canCombineWithOtherCoupons: coupon.canCombineWithOtherCoupons,
    autoApply: coupon.autoApply,
    isPublic: coupon.isPublic,
    isFeatured: coupon.isFeatured,
    badges: generateBadges(coupon),
    url: `/coupons/${coupon.id}`,
    applyUrl: `/checkout?coupon=${coupon.code}`,
    createdAt: coupon.createdAt,
    createdAtFormatted: formatDate(coupon.createdAt),
    updatedAt: coupon.updatedAt,
  };
}

/**
 * Map Coupon to CouponCardUI
 */
export function mapCouponToCard(coupon: Coupon): CouponCardUI {
  return {
    id: coupon.id,
    code: coupon.code,
    name: coupon.name,
    discount: getDiscountDisplay(coupon),
    validity: getValidityDisplay(coupon),
    requirements: getRequirementsDisplay(coupon),
    status: getCouponStatusDisplay(coupon),
    badges: generateBadges(coupon),
    applyUrl: `/checkout?coupon=${coupon.code}`,
  };
}

/**
 * Map Coupon to CouponListItemUI
 */
export function mapCouponToListItem(coupon: Coupon): CouponListItemUI {
  return {
    id: coupon.id,
    code: coupon.code,
    name: coupon.name,
    type: coupon.type,
    status: coupon.status,
    isActive: coupon.status === "active",
    validUntil: coupon.endDate,
    usageCount: coupon.usageCount,
  };
}
