/**
 * Support Ticket UI Schema (Frontend)
 *
 * Defines the structure of Support Ticket data as displayed in the UI.
 * Includes formatted values, computed fields, and display helpers.
 */

import type {
  TicketStatus,
  TicketPriority,
  TicketCategory,
} from "@/schemas/resources/support.schema";

/**
 * Status Display
 */
export interface StatusDisplay {
  value: TicketStatus;
  label: string;
  color: string;
  className: string;
  icon: string;
}

/**
 * Priority Display
 */
export interface PriorityDisplay {
  value: TicketPriority;
  label: string;
  color: string;
  className: string;
  icon: string;
}

/**
 * Category Display
 */
export interface CategoryDisplay {
  value: TicketCategory;
  label: string;
  icon: string;
}

/**
 * Ticket Message UI
 */
export interface TicketMessageUI {
  id: string;
  userId: string;
  userType: "customer" | "support" | "admin";
  message: string;
  attachments?: string[];
  isInternal: boolean;
  createdAt: Date;
  createdAtFormatted: string;
  timeAgo: string;
}

/**
 * Ticket Badge
 */
export interface TicketBadge {
  text: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Complete Support Ticket UI Schema
 */
export interface SupportTicketUI {
  // IDs
  id: string;
  ticketNumber: string;
  userId: string;

  // Basic Info
  subject: string;
  description: string;
  category: CategoryDisplay;

  // Status & Priority
  status: StatusDisplay;
  priority: PriorityDisplay;

  // Related Entities
  orderId?: string;
  productId?: string;

  // Attachments
  attachments?: string[];
  hasAttachments: boolean;

  // Messages
  messages?: TicketMessageUI[];
  messageCount: number;
  lastMessage?: TicketMessageUI;

  // Assignment
  assignedTo?: string;
  assignedAt?: Date;
  assignedAtFormatted?: string;
  isAssigned: boolean;

  // Resolution
  resolvedAt?: Date;
  resolvedAtFormatted?: string;
  resolutionNote?: string;
  closedAt?: Date;
  closedAtFormatted?: string;
  isResolved: boolean;
  isClosed: boolean;

  // Stats
  responseTime?: number;
  responseTimeFormatted?: string;
  resolutionTime?: number;
  resolutionTimeFormatted?: string;
  age: string;

  // Badges
  badges: TicketBadge[];

  // URLs
  url: string;

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  updatedAt: Date;
  lastMessageAt?: Date;
  lastMessageAtFormatted?: string;
}

/**
 * Support Ticket Card UI (Simplified for cards)
 */
export interface SupportTicketCardUI {
  id: string;
  ticketNumber: string;
  subject: string;
  status: StatusDisplay;
  priority: PriorityDisplay;
  category: CategoryDisplay;
  messageCount: number;
  lastMessageAt?: Date;
  badges: TicketBadge[];
  url: string;
}

/**
 * Support Ticket List Item UI (Simplified for lists)
 */
export interface SupportTicketListItemUI {
  id: string;
  ticketNumber: string;
  subject: string;
  status: StatusDisplay;
  priority: PriorityDisplay;
  category: string;
  createdAt: Date;
}

/**
 * Support Ticket Form Data
 */
export interface SupportTicketFormData {
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  orderId?: string;
  productId?: string;
  attachments?: string[];
}
