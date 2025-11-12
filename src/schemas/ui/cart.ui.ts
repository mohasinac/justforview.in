/**
 * Cart UI Schema
 * Frontend display models for cart functionality
 */

import type { PriceDisplay } from "./product.ui";

/**
 * Cart Item UI
 */
export interface CartItemUI {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  shopId: string;
  shopName: string;
  shopSlug: string;
  variant?: string;
  variantId?: string;
  quantity: number;
  price: PriceDisplay;
  originalPrice?: PriceDisplay;
  discount?: {
    amount: number;
    percentage: number;
    label: string;
  };
  subtotal: PriceDisplay;
  stockCount: number;
  inStock: boolean;
  isLowStock: boolean;
  maxQuantity: number;
  addedAt: Date;
  addedAtFormatted: string;
}

/**
 * Cart Summary UI
 */
export interface CartSummaryUI {
  itemCount: number;
  subtotal: PriceDisplay;
  discount: PriceDisplay;
  shipping: PriceDisplay;
  tax: PriceDisplay;
  total: PriceDisplay;
  couponCode?: string;
  couponDiscount?: PriceDisplay;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  hasFreeShipping: boolean;
  items: CartItemUI[];
}

/**
 * Cart UI (Complete)
 */
export interface CartUI {
  id: string;
  userId: string;
  items: CartItemUI[];
  summary: CartSummaryUI;
  updatedAt: Date;
  updatedAtFormatted: string;
}
