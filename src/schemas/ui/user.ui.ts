/**
 * User UI Schema
 * Frontend display models with formatted fields
 */

/**
 * User Role Display
 */
export interface UserRoleDisplay {
  value: "guest" | "user" | "seller" | "admin";
  label: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * User Badge
 */
export interface UserBadge {
  text: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * User Stats Display
 */
export interface UserStatsDisplay {
  orderCount: number;
  reviewCount: number;
  wishlistCount: number;
  orderCountLabel: string;
  reviewCountLabel: string;
  wishlistCountLabel: string;
}

/**
 * User Preferences Display
 */
export interface UserPreferencesDisplay {
  language: string;
  languageLabel: string;
  currency: string;
  currencyLabel: string;
  theme: "light" | "dark" | "auto";
  themeLabel: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

/**
 * Complete User UI Schema
 */
export interface UserUI {
  id: string;
  email: string;
  name?: string;
  displayName: string;
  initials: string;

  // Role
  role: UserRoleDisplay;

  // Profile
  avatar?: string;
  avatarUrl: string;
  phone?: string;
  phoneFormatted?: string;
  bio?: string;
  location?: string;

  // Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  isVerified: boolean;

  // Preferences
  preferences?: UserPreferencesDisplay;

  // Stats
  stats: UserStatsDisplay;

  // Flags
  isActive: boolean;
  isBanned: boolean;
  canShop: boolean;
  canSell: boolean;
  isAdmin: boolean;

  // Badges
  badges: UserBadge[];

  // URLs
  profileUrl: string;
  editProfileUrl: string;

  // Timestamps
  lastLoginAt?: Date;
  lastLoginFormatted?: string;
  timeAgo?: string;
  createdAt: Date;
  createdAtFormatted: string;
  memberSince: string;
  updatedAt: Date;
}

/**
 * Simplified User Card UI
 */
export interface UserCardUI {
  id: string;
  displayName: string;
  initials: string;
  avatar?: string;
  avatarUrl: string;
  role: UserRoleDisplay;
  badges: UserBadge[];
  profileUrl: string;
}

/**
 * Simplified User List Item UI
 */
export interface UserListItemUI {
  id: string;
  email: string;
  displayName: string;
  role: string;
  isActive: boolean;
  isBanned: boolean;
  createdAt: Date;
}

/**
 * User Profile Form Data
 */
export interface UserProfileFormData {
  name?: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
}

/**
 * User Preferences Form Data
 */
export interface UserPreferencesFormData {
  language: string;
  currency: string;
  theme: "light" | "dark" | "auto";
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}
