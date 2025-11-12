/**
 * Shop UI Schema
 * Frontend display models with formatted fields
 */

/**
 * Shop Address Display
 */
export interface ShopAddressDisplay {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  formatted: string;
  shortFormat: string;
}

/**
 * Shop Contact Display
 */
export interface ShopContactDisplay {
  email?: string;
  phone?: string;
  phoneFormatted?: string;
  location?: string;
  hasEmail: boolean;
  hasPhone: boolean;
  hasLocation: boolean;
}

/**
 * Shop Social Links
 */
export interface ShopSocialLinks {
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  hasSocial: boolean;
  socialCount: number;
}

/**
 * Shop Rating Display
 */
export interface ShopRatingDisplay {
  rating: number;
  ratingFormatted: string;
  reviewCount: number;
  reviewCountLabel: string;
  stars: number;
  hasReviews: boolean;
}

/**
 * Shop Stats Display
 */
export interface ShopStatsDisplay {
  productCount: number;
  productCountLabel: string;
  followerCount: number;
  followerCountLabel: string;
  rating: ShopRatingDisplay;
}

/**
 * Shop Status Display
 */
export interface ShopStatusDisplay {
  isVerified: boolean;
  isFeatured: boolean;
  showOnHomepage: boolean;
  isBanned: boolean;
  statusLabel: string;
  statusColor: string;
  statusClassName: string;
}

/**
 * Shop Badge
 */
export interface ShopBadge {
  text: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Shop Business Info Display
 */
export interface ShopBusinessInfo {
  gst?: string;
  pan?: string;
  hasGst: boolean;
  hasPan: boolean;
  isRegistered: boolean;
}

/**
 * Shop Bank Details Display
 */
export interface ShopBankDetailsDisplay {
  accountHolderName: string;
  accountNumber: string;
  accountNumberMasked: string;
  ifscCode: string;
  bankName: string;
  branchName?: string;
  formatted: string;
}

/**
 * Shop Payment Info
 */
export interface ShopPaymentInfo {
  hasBankDetails: boolean;
  hasUpi: boolean;
  upiId?: string;
  bankDetails?: ShopBankDetailsDisplay;
}

/**
 * Shop Owner Info
 */
export interface ShopOwnerInfo {
  ownerId: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
}

/**
 * Complete Shop UI Schema
 */
export interface ShopUI {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;

  // Media
  logo?: string;
  banner?: string;
  hasLogo: boolean;
  hasBanner: boolean;

  // Contact
  contact: ShopContactDisplay;

  // Address
  address?: ShopAddressDisplay;
  hasAddress: boolean;

  // Categories
  categories: string[];
  categoryCount: number;

  // Social
  social: ShopSocialLinks;

  // Business
  business: ShopBusinessInfo;

  // Payment
  payment: ShopPaymentInfo;

  // Policies
  returnPolicy?: string;
  shippingPolicy?: string;
  hasReturnPolicy: boolean;
  hasShippingPolicy: boolean;

  // Stats
  stats: ShopStatsDisplay;

  // Status
  status: ShopStatusDisplay;

  // Badges
  badges: ShopBadge[];

  // URLs
  url: string;
  productsUrl: string;
  auctionsUrl: string;
  adminUrl: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Simplified Shop Card UI
 */
export interface ShopCardUI {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  location?: string;
  rating: ShopRatingDisplay;
  productCount: number;
  productCountLabel: string;
  badges: ShopBadge[];
  isVerified: boolean;
  url: string;
}

/**
 * Simplified Shop List Item UI
 */
export interface ShopListItemUI {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  isVerified: boolean;
  isBanned: boolean;
  url: string;
}

/**
 * Shop Form Data
 */
export interface ShopFormData {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  banner?: string;
  email?: string;
  phone?: string;
  location?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  categories?: string[];
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  gst?: string;
  pan?: string;
  bankDetails?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branchName?: string;
  };
  upiId?: string;
  returnPolicy?: string;
  shippingPolicy?: string;
  isFeatured: boolean;
  showOnHomepage: boolean;
}

/**
 * Shop Profile Summary
 */
export interface ShopProfileSummary {
  shop: ShopUI;
  recentProducts: any[];
  featuredProducts: any[];
  totalSales: number;
  totalRevenue: number;
}
