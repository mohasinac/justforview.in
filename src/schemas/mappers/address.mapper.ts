/**
 * Address Mapper
 *
 * Transforms Address data between backend (Firestore) and frontend (UI) formats.
 */

import type { Address } from "@/schemas/resources/address.schema";
import type {
  AddressUI,
  AddressCardUI,
  AddressTypeDisplay,
} from "@/schemas/ui/address.ui";

/**
 * Format date
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
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
 * Get address type display
 */
function getAddressTypeDisplay(type: Address["label"]): AddressTypeDisplay {
  const typeMap: Record<
    Address["label"],
    { label: string; icon: string; color: string }
  > = {
    home: {
      label: "Home",
      icon: "home",
      color: "#3B82F6",
    },
    work: {
      label: "Work",
      icon: "work",
      color: "#8B5CF6",
    },
    other: {
      label: "Other",
      icon: "location_on",
      color: "#9CA3AF",
    },
  };

  return {
    value: type,
    ...typeMap[type],
  };
}

/**
 * Format full address
 */
function formatFullAddress(address: Address): string {
  const parts = [
    address.line1,
    address.line2,
    address.landmark,
    address.city,
    address.state,
    address.pincode,
    address.country,
  ].filter(Boolean);

  return parts.join(", ");
}

/**
 * Format short address
 */
function formatShortAddress(address: Address): string {
  return `${address.city}, ${address.state} - ${address.pincode}`;
}

/**
 * Map Address to AddressUI
 */
export function mapAddressToUI(address: Address): AddressUI {
  return {
    id: address.id,
    userId: address.userId,
    label: getAddressTypeDisplay(address.label),
    line1: address.line1,
    line2: address.line2,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    country: address.country,
    landmark: address.landmark,
    recipientName: address.recipientName,
    recipientPhone: address.recipientPhone,
    recipientPhoneFormatted: formatPhone(address.recipientPhone),
    isDefault: address.isDefault,
    formattedAddress: formatFullAddress(address),
    shortAddress: formatShortAddress(address),
    fullAddress: formatFullAddress(address),
    createdAt: address.createdAt,
    createdAtFormatted: formatDate(address.createdAt),
    updatedAt: address.updatedAt,
  };
}

/**
 * Map Address to AddressCardUI
 */
export function mapAddressToCard(address: Address): AddressCardUI {
  return {
    id: address.id,
    label: getAddressTypeDisplay(address.label),
    recipientName: address.recipientName,
    recipientPhone: formatPhone(address.recipientPhone),
    formattedAddress: formatFullAddress(address),
    isDefault: address.isDefault,
  };
}
