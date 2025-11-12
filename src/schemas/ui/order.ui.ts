/**
 * Order UI Schema
 * Frontend display models with formatted fields
 */

/**
 * Price Display
 */
export interface PriceDisplay {
  raw: number;
  formatted: string;
  currency: string;
}

/**
 * Order Status Display
 */
export interface OrderStatusDisplay {
  value:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  label: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Payment Status Display
 */
export interface PaymentStatusDisplay {
  value: "pending" | "paid" | "failed" | "refunded";
  label: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Address Display
 */
export interface AddressDisplay {
  name: string;
  phone: string;
  phoneFormatted: string;
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
 * Order Item Display
 */
export interface OrderItemDisplay {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  sku?: string;
  price: PriceDisplay;
  quantity: number;
  total: PriceDisplay;
  variant?: string;
  shopId: string;
  shopName: string;
  url: string;
  createdAt: Date;
}

/**
 * Order Pricing Display
 */
export interface OrderPricingDisplay {
  subtotal: PriceDisplay;
  shipping: PriceDisplay;
  tax: PriceDisplay;
  discount: PriceDisplay;
  total: PriceDisplay;
  hasCoupon: boolean;
  couponCode?: string;
  couponDiscount?: PriceDisplay;
}

/**
 * Shipping Info Display
 */
export interface ShippingInfoDisplay {
  hasTracking: boolean;
  trackingNumber?: string;
  shippingProvider?: string;
  estimatedDelivery?: Date;
  estimatedDeliveryFormatted?: string;
  deliveredAt?: Date;
  deliveredAtFormatted?: string;
  isDelivered: boolean;
  trackingUrl?: string;
}

/**
 * Order Badge
 */
export interface OrderBadge {
  text: string;
  color: string;
  className: string;
  icon?: string;
}

/**
 * Order Timeline Event
 */
export interface OrderTimelineEvent {
  status: string;
  label: string;
  timestamp?: Date;
  timestampFormatted?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

/**
 * Complete Order UI Schema
 */
export interface OrderUI {
  id: string;
  orderNumber: string;
  customerId: string;

  // Items
  items: OrderItemDisplay[];
  itemCount: number;
  shopCount: number;

  // Pricing
  pricing: OrderPricingDisplay;

  // Address
  shippingAddress: AddressDisplay;
  billingAddress?: AddressDisplay;
  hasBillingAddress: boolean;

  // Status
  status: OrderStatusDisplay;
  paymentStatus: PaymentStatusDisplay;

  // Payment
  paymentMethod: "razorpay" | "paypal" | "cod";
  paymentMethodLabel: string;
  paymentId?: string;

  // Shipping
  shipping: ShippingInfoDisplay;

  // Notes
  customerNotes?: string;
  internalNotes?: string;
  hasCustomerNotes: boolean;
  hasInternalNotes: boolean;

  // Timeline
  timeline: OrderTimelineEvent[];

  // Badges
  badges: OrderBadge[];

  // URLs
  url: string;
  invoiceUrl: string;
  trackingUrl?: string;

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  updatedAt: Date;
  updatedAtFormatted: string;
}

/**
 * Simplified Order Card UI
 */
export interface OrderCardUI {
  id: string;
  orderNumber: string;
  itemCount: number;
  total: PriceDisplay;
  status: OrderStatusDisplay;
  paymentStatus: PaymentStatusDisplay;
  createdAtFormatted: string;
  badges: OrderBadge[];
  url: string;
}

/**
 * Simplified Order List Item UI
 */
export interface OrderListItemUI {
  id: string;
  orderNumber: string;
  itemCount: number;
  total: PriceDisplay;
  status: OrderStatusDisplay;
  paymentStatus: PaymentStatusDisplay;
  createdAt: Date;
  url: string;
}

/**
 * Order Form Data
 */
export interface OrderFormData {
  customerId: string;
  items: Array<{
    productId: string;
    productName: string;
    productImage: string;
    sku?: string;
    price: number;
    quantity: number;
    total: number;
    variant?: string;
    shopId: string;
    shopName: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
  shippingAddress: {
    name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  billingAddress?: {
    name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  paymentMethod: "razorpay" | "paypal" | "cod";
  customerNotes?: string;
}

/**
 * Order Stats Summary
 */
export interface OrderStatsSummary {
  totalOrders: number;
  totalRevenue: PriceDisplay;
  averageOrderValue: PriceDisplay;
  pendingOrders: number;
  processingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  refundedOrders: number;
}
