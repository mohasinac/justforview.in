/**
 * Return UI Schema (Frontend)
 *
 * Defines the structure of Return data as displayed in the UI.
 * Includes formatted values, computed fields, and display helpers.
 */

import type {
  ReturnStatus,
  ReturnReason,
  ReturnMethod,
} from "@/schemas/resources/return.schema";

/**
 * Return Status Display
 */
export interface ReturnStatusDisplay {
  value: ReturnStatus;
  label: string;
  color: string;
  className: string;
  icon: string;
  description: string;
}

/**
 * Return Reason Display
 */
export interface ReturnReasonDisplay {
  value: ReturnReason;
  label: string;
  icon: string;
}

/**
 * Return Method Display
 */
export interface ReturnMethodDisplay {
  value: ReturnMethod;
  label: string;
  icon: string;
}

/**
 * Return Item UI
 */
export interface ReturnItemUI {
  orderItemId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  priceFormatted: string;
  totalFormatted: string;
  reason: ReturnReasonDisplay;
  condition: string;
}

/**
 * Return Amount Display
 */
export interface ReturnAmountDisplay {
  itemsTotal: number;
  itemsTotalFormatted: string;
  shippingRefund: number;
  shippingRefundFormatted: string;
  restockingFee: number;
  restockingFeeFormatted: string;
  refundAmount: number;
  refundAmountFormatted: string;
}

/**
 * Return Timeline Event
 */
export interface ReturnTimelineEvent {
  status: string;
  label: string;
  date?: Date;
  dateFormatted?: string;
  completed: boolean;
  current: boolean;
}

/**
 * Complete Return UI Schema
 */
export interface ReturnUI {
  // IDs
  id: string;
  returnNumber: string;
  orderId: string;
  userId: string;
  shopId: string;

  // Items
  items: ReturnItemUI[];
  itemCount: number;

  // Reason
  primaryReason: ReturnReasonDisplay;
  reasonDetails: string;
  attachments?: string[];
  hasAttachments: boolean;

  // Status
  status: ReturnStatusDisplay;
  timeline: ReturnTimelineEvent[];

  // Return Method
  returnMethod: ReturnMethodDisplay;
  pickupAddress?: string;
  trackingNumber?: string;
  hasTracking: boolean;

  // Amounts
  amounts: ReturnAmountDisplay;

  // Approval
  approvedAt?: Date;
  approvedAtFormatted?: string;
  approvedBy?: string;
  isApproved: boolean;
  rejectedAt?: Date;
  rejectedAtFormatted?: string;
  rejectionReason?: string;
  isRejected: boolean;

  // Pickup
  pickupScheduledDate?: Date;
  pickupScheduledDateFormatted?: string;
  pickedUpAt?: Date;
  pickedUpAtFormatted?: string;

  // Received & Inspection
  receivedAt?: Date;
  receivedAtFormatted?: string;
  inspectionNotes?: string;
  inspectionPhotos?: string[];

  // Completion
  completedAt?: Date;
  completedAtFormatted?: string;
  refundedAt?: Date;
  refundedAtFormatted?: string;
  refundMethod?: string;
  refundTransactionId?: string;
  isCompleted: boolean;
  isRefunded: boolean;

  // Communication
  notes?: string;
  customerNotes?: string;
  sellerNotes?: string;

  // URLs
  url: string;
  orderUrl: string;

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  updatedAt: Date;
  age: string;
}

/**
 * Return Card UI (Simplified for cards)
 */
export interface ReturnCardUI {
  id: string;
  returnNumber: string;
  orderId: string;
  status: ReturnStatusDisplay;
  itemCount: number;
  refundAmount: number;
  refundAmountFormatted: string;
  createdAt: Date;
  url: string;
}

/**
 * Return Form Data
 */
export interface ReturnFormData {
  orderId: string;
  items: Array<{
    orderItemId: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    reason: ReturnReason;
    condition: "unopened" | "opened" | "used" | "damaged";
  }>;
  primaryReason: ReturnReason;
  reasonDetails: string;
  attachments?: string[];
  returnMethod: ReturnMethod;
  pickupAddress?: string;
}
