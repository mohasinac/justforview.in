/**
 * User Mapper
 * Transforms User backend schema to UI schema
 */

import type { User } from "../resources/user.schema";
import type {
  UserUI,
  UserCardUI,
  UserListItemUI,
  UserRoleDisplay,
  UserBadge,
  UserStatsDisplay,
  UserPreferencesDisplay,
} from "../ui/user.ui";

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
 * Get time ago string
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
}

/**
 * Get display name from user
 */
function getDisplayName(user: User): string {
  if (user.name) return user.name;
  const emailName = user.email.split("@")[0];
  return emailName.charAt(0).toUpperCase() + emailName.slice(1);
}

/**
 * Get initials from user
 */
function getInitials(user: User): string {
  if (user.name) {
    const parts = user.name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return user.name.slice(0, 2).toUpperCase();
  }
  return user.email.slice(0, 2).toUpperCase();
}

/**
 * Get avatar URL with fallback
 */
function getAvatarUrl(user: User): string {
  if (user.avatar) return user.avatar;
  const initials = getInitials(user);
  return `https://ui-avatars.com/api/?name=${initials}&background=random`;
}

/**
 * Format phone number
 */
function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91-${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Get user role display
 */
function getUserRoleDisplay(role: User["role"]): UserRoleDisplay {
  const roleMap: Record<
    User["role"],
    { label: string; color: string; className: string; icon?: string }
  > = {
    guest: {
      label: "Guest",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "person_outline",
    },
    user: {
      label: "User",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "person",
    },
    seller: {
      label: "Seller",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "storefront",
    },
    admin: {
      label: "Admin",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "admin_panel_settings",
    },
  };

  return {
    value: role,
    ...roleMap[role],
  };
}

/**
 * Generate user badges
 */
function generateBadges(user: User): UserBadge[] {
  const badges: UserBadge[] = [];

  if (user.emailVerified && user.phoneVerified) {
    badges.push({
      text: "Verified",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "verified",
    });
  }

  if (user.role === "seller") {
    badges.push({
      text: "Seller",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "storefront",
    });
  }

  if (user.role === "admin") {
    badges.push({
      text: "Admin",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "admin_panel_settings",
    });
  }

  if (user.isBanned) {
    badges.push({
      text: "Banned",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
      icon: "block",
    });
  }

  if (!user.isActive) {
    badges.push({
      text: "Inactive",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "visibility_off",
    });
  }

  return badges;
}

/**
 * Map user stats to display
 */
function mapStatsToDisplay(user: User): UserStatsDisplay {
  return {
    orderCount: user.orderCount,
    reviewCount: user.reviewCount,
    wishlistCount: user.wishlistCount,
    orderCountLabel: `${user.orderCount} ${
      user.orderCount === 1 ? "Order" : "Orders"
    }`,
    reviewCountLabel: `${user.reviewCount} ${
      user.reviewCount === 1 ? "Review" : "Reviews"
    }`,
    wishlistCountLabel: `${user.wishlistCount} ${
      user.wishlistCount === 1 ? "Item" : "Items"
    }`,
  };
}

/**
 * Map preferences to display
 */
function mapPreferencesToDisplay(
  preferences?: User["preferences"]
): UserPreferencesDisplay | undefined {
  if (!preferences) return undefined;

  const languageMap: Record<string, string> = {
    en: "English",
    hi: "Hindi",
  };

  const currencyMap: Record<string, string> = {
    INR: "Indian Rupee",
    USD: "US Dollar",
  };

  const themeMap: Record<string, string> = {
    light: "Light",
    dark: "Dark",
    auto: "Auto",
  };

  return {
    language: preferences.language,
    languageLabel: languageMap[preferences.language] || preferences.language,
    currency: preferences.currency,
    currencyLabel: currencyMap[preferences.currency] || preferences.currency,
    theme: preferences.theme,
    themeLabel: themeMap[preferences.theme] || preferences.theme,
    notifications: preferences.notifications,
  };
}

/**
 * Map User to UserUI
 */
export function mapUserToUI(user: User): UserUI {
  const displayName = getDisplayName(user);
  const isVerified = user.emailVerified && user.phoneVerified;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    displayName,
    initials: getInitials(user),

    role: getUserRoleDisplay(user.role),

    avatar: user.avatar,
    avatarUrl: getAvatarUrl(user),
    phone: user.phone,
    phoneFormatted: user.phone ? formatPhone(user.phone) : undefined,
    bio: user.bio,
    location: user.location,

    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified,
    isVerified,

    preferences: mapPreferencesToDisplay(user.preferences),

    stats: mapStatsToDisplay(user),

    isActive: user.isActive,
    isBanned: user.isBanned,
    canShop: user.isActive && !user.isBanned,
    canSell: user.role === "seller" && user.isActive && !user.isBanned,
    isAdmin: user.role === "admin",

    badges: generateBadges(user),

    profileUrl: `/user/${user.id}`,
    editProfileUrl: `/user/profile/edit`,

    lastLoginAt: user.lastLoginAt,
    lastLoginFormatted: user.lastLoginAt
      ? formatDate(user.lastLoginAt)
      : undefined,
    timeAgo: user.lastLoginAt ? getTimeAgo(user.lastLoginAt) : undefined,
    createdAt: user.createdAt,
    createdAtFormatted: formatDate(user.createdAt),
    memberSince: `Member since ${formatDate(user.createdAt)}`,
    updatedAt: user.updatedAt,
  };
}

/**
 * Map User to UserCardUI
 */
export function mapUserToCard(user: User): UserCardUI {
  return {
    id: user.id,
    displayName: getDisplayName(user),
    initials: getInitials(user),
    avatar: user.avatar,
    avatarUrl: getAvatarUrl(user),
    role: getUserRoleDisplay(user.role),
    badges: generateBadges(user),
    profileUrl: `/user/${user.id}`,
  };
}

/**
 * Map User to UserListItemUI
 */
export function mapUserToListItem(user: User): UserListItemUI {
  return {
    id: user.id,
    email: user.email,
    displayName: getDisplayName(user),
    role: user.role,
    isActive: user.isActive,
    isBanned: user.isBanned,
    createdAt: user.createdAt,
  };
}
