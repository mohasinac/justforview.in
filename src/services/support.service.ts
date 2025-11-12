/**
 * Support Service
 * Handles all support ticket-related API calls
 */

import { apiService } from "./api.service";
import {
  SUPPORT_ENDPOINTS,
  ADMIN_SUPPORT_ENDPOINTS,
} from "@/constants/endpoints/support.endpoints";
import type { SupportTicketUI } from "@/schemas/ui/support.ui";
import type {
  CreateSupportTicket,
  UpdateSupportTicket,
  AddMessage,
} from "@/schemas/resources/support.schema";
import type { PaginatedResponse } from "@/types";

interface TicketFilters {
  status?: string;
  category?: string;
  priority?: string;
  shopId?: string;
  orderId?: string;
  assignedTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * User Support Operations
 */
export const supportService = {
  /**
   * Get user tickets
   */
  async list(
    filters?: TicketFilters
  ): Promise<PaginatedResponse<SupportTicketUI>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const qs = params.toString();
    const endpoint = qs
      ? `${SUPPORT_ENDPOINTS.list}?${qs}`
      : SUPPORT_ENDPOINTS.list;
    return apiService.get<PaginatedResponse<SupportTicketUI>>(endpoint);
  },

  /**
   * Get ticket by ID
   */
  async getById(id: string): Promise<SupportTicketUI> {
    return apiService.get<SupportTicketUI>(SUPPORT_ENDPOINTS.byId(id));
  },

  /**
   * Create new ticket
   */
  async create(data: CreateSupportTicket): Promise<SupportTicketUI> {
    return apiService.post<SupportTicketUI>(SUPPORT_ENDPOINTS.create, data);
  },

  /**
   * Update ticket
   */
  async update(
    id: string,
    data: Partial<UpdateSupportTicket>
  ): Promise<SupportTicketUI> {
    return apiService.patch<SupportTicketUI>(
      SUPPORT_ENDPOINTS.update(id),
      data
    );
  },

  /**
   * Add message to ticket
   */
  async addMessage(id: string, data: AddMessage): Promise<SupportTicketUI> {
    return apiService.post<SupportTicketUI>(
      SUPPORT_ENDPOINTS.addMessage(id),
      data
    );
  },

  /**
   * Close ticket
   */
  async close(id: string): Promise<SupportTicketUI> {
    return apiService.post<SupportTicketUI>(SUPPORT_ENDPOINTS.close(id), {});
  },

  /**
   * Create ticket (legacy alias)
   */
  async createTicket(data: CreateSupportTicket): Promise<SupportTicketUI> {
    return this.create(data);
  },

  /**
   * Get ticket (legacy alias)
   */
  async getTicket(id: string): Promise<SupportTicketUI> {
    return this.getById(id);
  },

  /**
   * Reply to ticket (legacy alias)
   */
  async replyToTicket(id: string, data: AddMessage): Promise<SupportTicketUI> {
    return this.addMessage(id, data);
  },

  /**
   * Get ticket messages
   */
  async getMessages(id: string): Promise<any[]> {
    return apiService.get<any[]>(`${SUPPORT_ENDPOINTS.byId(id)}/messages`);
  },

  /**
   * Assign ticket
   */
  async assignTicket(
    id: string,
    data: { assignedTo: string }
  ): Promise<SupportTicketUI> {
    return apiService.patch<SupportTicketUI>(
      `${SUPPORT_ENDPOINTS.byId(id)}/assign`,
      data
    );
  },

  /**
   * Update ticket status
   */
  async updateTicket(
    id: string,
    data: Partial<UpdateSupportTicket>
  ): Promise<SupportTicketUI> {
    return this.update(id, data);
  },

  /**
   * Close ticket (legacy alias)
   */
  async closeTicket(id: string): Promise<SupportTicketUI> {
    return this.close(id);
  },
};

/**
 * Admin Support Operations
 */
export const adminSupportService = {
  /**
   * Get all tickets (admin)
   */
  async list(
    filters?: TicketFilters
  ): Promise<PaginatedResponse<SupportTicketUI>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const qs = params.toString();
    const endpoint = qs
      ? `${ADMIN_SUPPORT_ENDPOINTS.list}?${qs}`
      : ADMIN_SUPPORT_ENDPOINTS.list;
    return apiService.get<PaginatedResponse<SupportTicketUI>>(endpoint);
  },

  /**
   * Get ticket by ID (admin)
   */
  async getById(id: string): Promise<SupportTicketUI> {
    return apiService.get<SupportTicketUI>(ADMIN_SUPPORT_ENDPOINTS.byId(id));
  },

  /**
   * Assign ticket
   */
  async assign(id: string, assignedTo: string): Promise<SupportTicketUI> {
    return apiService.post<SupportTicketUI>(
      ADMIN_SUPPORT_ENDPOINTS.assign(id),
      { assignedTo }
    );
  },

  /**
   * Unassign ticket
   */
  async unassign(id: string): Promise<SupportTicketUI> {
    return apiService.post<SupportTicketUI>(
      ADMIN_SUPPORT_ENDPOINTS.unassign(id),
      {}
    );
  },

  /**
   * Resolve ticket
   */
  async resolve(id: string, resolution: string): Promise<SupportTicketUI> {
    return apiService.post<SupportTicketUI>(
      ADMIN_SUPPORT_ENDPOINTS.resolve(id),
      { resolution }
    );
  },

  /**
   * Reopen ticket
   */
  async reopen(id: string, reason: string): Promise<SupportTicketUI> {
    return apiService.post<SupportTicketUI>(
      ADMIN_SUPPORT_ENDPOINTS.reopen(id),
      { reason }
    );
  },

  /**
   * Update priority
   */
  async updatePriority(id: string, priority: string): Promise<SupportTicketUI> {
    return apiService.patch<SupportTicketUI>(
      ADMIN_SUPPORT_ENDPOINTS.updatePriority(id),
      { priority }
    );
  },

  /**
   * Bulk assign tickets
   */
  async bulkAssign(ticketIds: string[], assignedTo: string): Promise<void> {
    return apiService.post(ADMIN_SUPPORT_ENDPOINTS.bulkAssign, {
      ticketIds,
      assignedTo,
    });
  },

  /**
   * Bulk close tickets
   */
  async bulkClose(ticketIds: string[]): Promise<void> {
    return apiService.post(ADMIN_SUPPORT_ENDPOINTS.bulkClose, { ticketIds });
  },

  /**
   * Bulk delete tickets
   */
  async bulkDelete(ticketIds: string[]): Promise<void> {
    return apiService.post(ADMIN_SUPPORT_ENDPOINTS.bulkDelete, { ticketIds });
  },

  /**
   * Get statistics
   */
  async stats(filters?: {
    startDate?: string;
    endDate?: string;
  }): Promise<any> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get(`${ADMIN_SUPPORT_ENDPOINTS.stats}${queryParams}`);
  },

  /**
   * Export tickets
   */
  async export(filters?: TicketFilters): Promise<any> {
    const queryParams = filters
      ? `?${new URLSearchParams(filters as any).toString()}`
      : "";
    return apiService.get(`${ADMIN_SUPPORT_ENDPOINTS.export}${queryParams}`);
  },
};

// Export types for external use
export type { TicketFilters };
export type CreateTicketData = CreateSupportTicket;
export type UpdateTicketData = Partial<UpdateSupportTicket>;
export type ReplyToTicketData = AddMessage;
export type AssignTicketData = { assignedTo: string };
export type EscalateTicketData = { priority: string; reason?: string };
