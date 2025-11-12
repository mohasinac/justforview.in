/**
 * Shop Mapper
 * Transform backend Shop to UI format
 */

import type {
  Shop,
  ShopAddress,
  ShopBankDetails,
} from "@/schemas/resources/shop.schema";
import type {
  ShopUI,
  ShopCardUI,
  ShopListItemUI,
  ShopAddressDisplay,
  ShopContactDisplay,
  ShopSocialLinks,
  ShopRatingDisplay,
  ShopStatsDisplay,
  ShopStatusDisplay,
  ShopBadge,
  ShopBusinessInfo,
  ShopBankDetailsDisplay,
  ShopPaymentInfo,
} from "@/schemas/ui/shop.ui";

/**
 * Format shop address
 */
export const formatAddress = (address: ShopAddress): ShopAddressDisplay => {
  const parts = [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.pincode,
  ].filter(Boolean);

  const shortParts = [address.city, address.state].filter(Boolean);

  return {
    ...address,
    formatted: parts.join(", "),
    shortFormat: shortParts.join(", "),
  };
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Simple formatting: +91-XXXXX-XXXXX
  if (phone.length === 10) {
    return `+91-${phone.slice(0, 5)}-${phone.slice(5)}`;
  }
  return phone;
};

/**
 * Get contact display
 */
export const getContactDisplay = (shop: Shop): ShopContactDisplay => {
  return {
    email: shop.email,
    phone: shop.phone,
    phoneFormatted: shop.phone ? formatPhoneNumber(shop.phone) : undefined,
    location: shop.location,
    hasEmail: !!shop.email,
    hasPhone: !!shop.phone,
    hasLocation: !!shop.location,
  };
};

/**
 * Get social links
 */
export const getSocialLinks = (shop: Shop): ShopSocialLinks => {
  const links = [
    shop.website,
    shop.facebook,
    shop.instagram,
    shop.twitter,
  ].filter(Boolean);

  return {
    website: shop.website,
    facebook: shop.facebook,
    instagram: shop.instagram,
    twitter: shop.twitter,
    hasSocial: links.length > 0,
    socialCount: links.length,
  };
};

/**
 * Get rating display
 */
export const getRatingDisplay = (
  rating: number,
  reviewCount: number
): ShopRatingDisplay => {
  return {
    rating,
    ratingFormatted: rating.toFixed(1),
    reviewCount,
    reviewCountLabel: `${reviewCount} review${reviewCount !== 1 ? "s" : ""}`,
    stars: Math.round(rating),
    hasReviews: reviewCount > 0,
  };
};

/**
 * Get stats display
 */
export const getStatsDisplay = (shop: Shop): ShopStatsDisplay => {
  return {
    productCount: shop.productCount,
    productCountLabel: `${shop.productCount} product${
      shop.productCount !== 1 ? "s" : ""
    }`,
    followerCount: shop.follower_count || 0,
    followerCountLabel: `${shop.follower_count || 0} follower${
      (shop.follower_count || 0) !== 1 ? "s" : ""
    }`,
    rating: getRatingDisplay(shop.rating, shop.reviewCount),
  };
};

/**
 * Get status display
 */
export const getStatusDisplay = (shop: Shop): ShopStatusDisplay => {
  let statusLabel = "Active";
  let statusColor = "green";
  let statusClassName = "bg-green-100 text-green-800";

  if (shop.isBanned) {
    statusLabel = "Banned";
    statusColor = "red";
    statusClassName = "bg-red-100 text-red-800";
  } else if (!shop.isVerified) {
    statusLabel = "Pending Verification";
    statusColor = "yellow";
    statusClassName = "bg-yellow-100 text-yellow-800";
  }

  return {
    isVerified: shop.isVerified,
    isFeatured: shop.isFeatured,
    showOnHomepage: shop.showOnHomepage,
    isBanned: shop.isBanned,
    statusLabel,
    statusColor,
    statusClassName,
  };
};

/**
 * Generate shop badges
 */
export const generateShopBadges = (shop: Shop): ShopBadge[] => {
  const badges: ShopBadge[] = [];

  if (shop.isVerified) {
    badges.push({
      text: "Verified",
      color: "blue",
      className: "bg-blue-100 text-blue-800",
      icon: "✓",
    });
  }

  if (shop.isFeatured) {
    badges.push({
      text: "Featured",
      color: "yellow",
      className: "bg-yellow-100 text-yellow-800",
      icon: "⭐",
    });
  }

  if (shop.showOnHomepage) {
    badges.push({
      text: "Homepage",
      color: "purple",
      className: "bg-purple-100 text-purple-800",
      icon: "🏠",
    });
  }

  if (shop.isBanned) {
    badges.push({
      text: "Banned",
      color: "red",
      className: "bg-red-100 text-red-800",
      icon: "🚫",
    });
  }

  if (shop.rating >= 4.5 && shop.reviewCount >= 10) {
    badges.push({
      text: "Top Rated",
      color: "green",
      className: "bg-green-100 text-green-800",
      icon: "🏆",
    });
  }

  return badges;
};

/**
 * Get business info
 */
export const getBusinessInfo = (shop: Shop): ShopBusinessInfo => {
  return {
    gst: shop.gst,
    pan: shop.pan,
    hasGst: !!shop.gst,
    hasPan: !!shop.pan,
    isRegistered: !!shop.gst || !!shop.pan,
  };
};

/**
 * Format bank details
 */
export const formatBankDetails = (
  bankDetails: ShopBankDetails
): ShopBankDetailsDisplay => {
  const accountNumberMasked =
    "XXXX-XXXX-" + bankDetails.accountNumber.slice(-4);

  const formatted = `${bankDetails.bankName} - ${accountNumberMasked}`;

  return {
    ...bankDetails,
    accountNumberMasked,
    formatted,
  };
};

/**
 * Get payment info
 */
export const getPaymentInfo = (shop: Shop): ShopPaymentInfo => {
  return {
    hasBankDetails: !!shop.bankDetails,
    hasUpi: !!shop.upiId,
    upiId: shop.upiId,
    bankDetails: shop.bankDetails
      ? formatBankDetails(shop.bankDetails)
      : undefined,
  };
};

/**
 * Main Mapper: Backend Shop to UI
 */
export const mapShopToUI = (shop: Shop): ShopUI => {
  return {
    id: shop.id,
    ownerId: shop.ownerId,
    name: shop.name,
    slug: shop.slug,
    description: shop.description || "",

    // Media
    logo: shop.logo,
    banner: shop.banner,
    hasLogo: !!shop.logo,
    hasBanner: !!shop.banner,

    // Contact
    contact: getContactDisplay(shop),

    // Address
    address: shop.address ? formatAddress(shop.address) : undefined,
    hasAddress: !!shop.address,

    // Categories
    categories: shop.categories || [],
    categoryCount: (shop.categories || []).length,

    // Social
    social: getSocialLinks(shop),

    // Business
    business: getBusinessInfo(shop),

    // Payment
    payment: getPaymentInfo(shop),

    // Policies
    returnPolicy: shop.returnPolicy,
    shippingPolicy: shop.shippingPolicy,
    hasReturnPolicy: !!shop.returnPolicy,
    hasShippingPolicy: !!shop.shippingPolicy,

    // Stats
    stats: getStatsDisplay(shop),

    // Status
    status: getStatusDisplay(shop),

    // Badges
    badges: generateShopBadges(shop),

    // URLs
    url: `/shops/${shop.slug}`,
    productsUrl: `/shops/${shop.slug}/products`,
    auctionsUrl: `/shops/${shop.slug}/auctions`,
    adminUrl: `/admin/shops/${shop.id}`,

    // Timestamps
    createdAt: shop.createdAt,
    updatedAt: shop.updatedAt,
  };
};

/**
 * Simplified Mapper: Backend Shop to Card UI
 */
export const mapShopToCard = (shop: Shop): ShopCardUI => {
  return {
    id: shop.id,
    name: shop.name,
    slug: shop.slug,
    description: shop.description || "",
    logo: shop.logo,
    location: shop.location,
    rating: getRatingDisplay(shop.rating, shop.reviewCount),
    productCount: shop.productCount,
    productCountLabel: `${shop.productCount} product${
      shop.productCount !== 1 ? "s" : ""
    }`,
    badges: generateShopBadges(shop),
    isVerified: shop.isVerified,
    url: `/shops/${shop.slug}`,
  };
};

/**
 * Simplified Mapper: Backend Shop to List Item UI
 */
export const mapShopToListItem = (shop: Shop): ShopListItemUI => {
  return {
    id: shop.id,
    name: shop.name,
    slug: shop.slug,
    logo: shop.logo,
    rating: shop.rating,
    reviewCount: shop.reviewCount,
    productCount: shop.productCount,
    isVerified: shop.isVerified,
    isBanned: shop.isBanned,
    url: `/shops/${shop.slug}`,
  };
};

/**
 * Bulk Mapper: Array of Shops to UI
 */
export const mapShopsToUI = (shops: Shop[]): ShopUI[] => {
  return shops.map(mapShopToUI);
};

/**
 * Bulk Mapper: Array of Shops to Cards
 */
export const mapShopsToCards = (shops: Shop[]): ShopCardUI[] => {
  return shops.map(mapShopToCard);
};

/**
 * Bulk Mapper: Array of Shops to List Items
 */
export const mapShopsToListItems = (shops: Shop[]): ShopListItemUI[] => {
  return shops.map(mapShopToListItem);
};
