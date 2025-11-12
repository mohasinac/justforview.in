/**
 * Address Service
 * Handles all address-related API calls
 */

import { apiService } from "./api.service";
import {
  ADDRESS_ENDPOINTS,
  ADMIN_ADDRESS_ENDPOINTS,
} from "@/constants/endpoints/address.endpoints";
import type { AddressUI } from "@/schemas/ui/address.ui";
import type {
  CreateAddress,
  UpdateAddress,
  AddressFilter,
} from "@/schemas/resources/address.schema";

/**
 * User Address Operations
 */
export const addressService = {
  /**
   * Get user addresses
   */
  async list(filters?: Partial<AddressFilter>): Promise<AddressUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<AddressUI[]>(
      `${ADDRESS_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get address by ID
   */
  async getById(id: string): Promise<AddressUI> {
    return apiService.get<AddressUI>(ADDRESS_ENDPOINTS.byId(id));
  },

  /**
   * Create new address
   */
  async create(data: CreateAddress): Promise<AddressUI> {
    return apiService.post<AddressUI>(ADDRESS_ENDPOINTS.create, data);
  },

  /**
   * Update address
   */
  async update(id: string, data: Partial<UpdateAddress>): Promise<AddressUI> {
    return apiService.patch<AddressUI>(ADDRESS_ENDPOINTS.update(id), data);
  },

  /**
   * Delete address
   */
  async delete(id: string): Promise<void> {
    return apiService.delete(ADDRESS_ENDPOINTS.delete(id));
  },

  /**
   * Set default address
   */
  async setDefault(id: string): Promise<AddressUI> {
    return apiService.patch<AddressUI>(ADDRESS_ENDPOINTS.setDefault(id));
  },
};

/**
 * Admin Address Operations
 */
export const adminAddressService = {
  /**
   * Get all addresses (admin)
   */
  async list(filters?: Partial<AddressFilter>): Promise<AddressUI[]> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get<AddressUI[]>(
      `${ADMIN_ADDRESS_ENDPOINTS.list}${queryParams}`
    );
  },

  /**
   * Get addresses by user ID
   */
  async byUserId(userId: string): Promise<AddressUI[]> {
    return apiService.get<AddressUI[]>(
      ADMIN_ADDRESS_ENDPOINTS.byUserId(userId)
    );
  },

  /**
   * Get address by ID (admin)
   */
  async getById(id: string): Promise<AddressUI> {
    return apiService.get<AddressUI>(ADMIN_ADDRESS_ENDPOINTS.byId(id));
  },

  /**
   * Delete address (admin)
   */
  async delete(id: string): Promise<void> {
    return apiService.delete(ADMIN_ADDRESS_ENDPOINTS.delete(id));
  },
};
