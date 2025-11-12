/**
 * Address UI Schema (Frontend)
 *
 * Defines the structure of Address data as displayed in the UI.
 * Includes formatted values, computed fields, and display helpers.
 */

import type { AddressType } from "@/schemas/resources/address.schema";

/**
 * Address Type Display
 */
export interface AddressTypeDisplay {
  value: AddressType;
  label: string;
  icon: string;
  color: string;
}

/**
 * Complete Address UI Schema
 */
export interface AddressUI {
  // IDs
  id: string;
  userId: string;

  // Basic Info
  label: AddressTypeDisplay;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  landmark?: string;

  // Contact
  recipientName: string;
  recipientPhone: string;
  recipientPhoneFormatted: string;

  // Flags
  isDefault: boolean;

  // Formatted Display
  formattedAddress: string;
  shortAddress: string;
  fullAddress: string;

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  updatedAt: Date;
}

/**
 * Address Card UI (Simplified for cards)
 */
export interface AddressCardUI {
  id: string;
  label: AddressTypeDisplay;
  recipientName: string;
  recipientPhone: string;
  formattedAddress: string;
  isDefault: boolean;
}

/**
 * Address Form Data
 */
export interface AddressFormData {
  label: AddressType;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  landmark?: string;
  recipientName: string;
  recipientPhone: string;
  isDefault: boolean;
}
