/**
 * Order Mapper
 * Transforms Order backend schema to UI schema
 */

import type { Order, OrderItem, Address } from "../resources/order.schema";
import type {
  OrderUI,
  OrderCardUI,
  OrderListItemUI,
  OrderItemDisplay,
  OrderPricingDisplay,
  ShippingInfoDisplay,
  OrderStatusDisplay,
  OrderTimelineEvent,
  OrderBadge,
  PriceDisplay,
  AddressDisplay,
} from "../ui/order.ui";

/**
 * Format price to Indian currency
 */
function formatPrice(amount: number): PriceDisplay {
  return {
    raw: amount,
    formatted: new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount),
    currency: "INR",
  };
}

/**
 * Format date to Indian format
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

/**
 * Format address for display
 */
function formatAddressDisplay(address: Address): string {
  const parts = [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.pincode,
  ].filter(Boolean);
  return parts.join(", ");
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
 * Get order status display
 */
function getOrderStatusDisplay(status: Order["status"]): OrderStatusDisplay {
  const statusMap: Record<
    Order["status"],
    { value: Order["status"]; label: string; color: string; className: string }
  > = {
    pending: {
      value: "pending",
      label: "Pending",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
    },
    confirmed: {
      value: "confirmed",
      label: "Confirmed",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
    },
    processing: {
      value: "processing",
      label: "Processing",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
    },
    shipped: {
      value: "shipped",
      label: "Shipped",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
    },
    delivered: {
      value: "delivered",
      label: "Delivered",
      color: "#059669",
      className: "bg-emerald-100 text-emerald-800",
    },
    cancelled: {
      value: "cancelled",
      label: "Cancelled",
      color: "#EF4444",
      className: "bg-red-100 text-red-800",
    },
    refunded: {
      value: "refunded",
      label: "Refunded",
      color: "#EC4899",
      className: "bg-pink-100 text-pink-800",
    },
  };

  return statusMap[status];
}

/**
 * Get payment method display
 */
function getPaymentMethodDisplay(method: Order["paymentMethod"]): string {
  const methodMap: Record<Order["paymentMethod"], string> = {
    razorpay: "Razorpay",
    paypal: "PayPal",
    cod: "Cash on Delivery",
  };

  return methodMap[method];
}

/**
 * Generate order timeline events
 */
function generateTimeline(order: Order): OrderTimelineEvent[] {
  const events: OrderTimelineEvent[] = [
    {
      status: "pending",
      label: "Order Placed",
      timestamp: order.createdAt,
      timestampFormatted: formatDate(order.createdAt),
      isCompleted: true,
      isCurrent: order.status === "pending",
    },
  ];

  // Only add confirmed event if status reached confirmed+
  if (
    ["confirmed", "processing", "shipped", "delivered"].includes(order.status)
  ) {
    events.push({
      status: "confirmed",
      label: "Order Confirmed",
      isCompleted: true,
      isCurrent: order.status === "confirmed",
    });
  }

  // Only add shipped event if status reached shipped+
  if (["shipped", "delivered"].includes(order.status)) {
    events.push({
      status: "shipped",
      label: "Order Shipped",
      isCompleted: true,
      isCurrent: order.status === "shipped",
    });
  }

  // Only add delivered event if delivered
  if (order.status === "delivered" && order.deliveredAt) {
    events.push({
      status: "delivered",
      label: "Order Delivered",
      timestamp: order.deliveredAt,
      timestampFormatted: formatDate(order.deliveredAt),
      isCompleted: true,
      isCurrent: true,
    });
  }

  // Add cancelled event if cancelled
  if (order.status === "cancelled") {
    events.push({
      status: "cancelled",
      label: "Order Cancelled",
      isCompleted: true,
      isCurrent: true,
    });
  }

  return events;
}

/**
 * Generate order badges
 */
function generateBadges(order: Order): OrderBadge[] {
  const badges: OrderBadge[] = [];

  if (order.paymentMethod === "cod") {
    badges.push({
      text: "COD",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "local_shipping",
    });
  }

  if (order.paymentStatus === "paid") {
    badges.push({
      text: "Paid",
      color: "#059669",
      className: "bg-emerald-100 text-emerald-800",
      icon: "check_circle",
    });
  }

  if (order.status === "delivered") {
    badges.push({
      text: "Delivered",
      color: "#059669",
      className: "bg-emerald-100 text-emerald-800",
      icon: "verified",
    });
  }

  if (order.trackingNumber) {
    badges.push({
      text: "Tracked",
      color: "#8B5CF6",
      className: "bg-purple-100 text-purple-800",
      icon: "location_on",
    });
  }

  return badges;
}

/**
 * Map OrderItem to OrderItemDisplay
 */
function mapOrderItemToDisplay(item: OrderItem): OrderItemDisplay {
  return {
    id: item.id,
    orderId: item.orderId,
    productId: item.productId,
    productName: item.productName,
    productImage: item.productImage,
    sku: item.sku,
    price: formatPrice(item.price),
    quantity: item.quantity,
    total: formatPrice(item.total),
    variant: item.variant,
    shopId: item.shopId,
    shopName: item.shopName,
    url: `/products/${item.productId}`,
    createdAt: item.createdAt,
  };
}

/**
 * Map Order pricing to display
 */
function mapPricingToDisplay(order: Order): OrderPricingDisplay {
  return {
    subtotal: formatPrice(order.subtotal),
    shipping: formatPrice(order.shipping),
    tax: formatPrice(order.tax),
    discount: formatPrice(order.discount),
    total: formatPrice(order.total),
    hasCoupon: !!order.couponCode,
    couponCode: order.couponCode,
    couponDiscount: order.couponDiscount
      ? formatPrice(order.couponDiscount)
      : undefined,
  };
}

/**
 * Map shipping info to display
 */
function mapShippingInfoToDisplay(order: Order): ShippingInfoDisplay {
  return {
    hasTracking: !!order.trackingNumber,
    trackingNumber: order.trackingNumber,
    shippingProvider: order.shippingProvider,
    estimatedDelivery: order.estimatedDelivery,
    estimatedDeliveryFormatted: order.estimatedDelivery
      ? formatDate(order.estimatedDelivery)
      : undefined,
    deliveredAt: order.deliveredAt,
    deliveredAtFormatted: order.deliveredAt
      ? formatDate(order.deliveredAt)
      : undefined,
    isDelivered: order.status === "delivered",
    trackingUrl:
      order.trackingNumber && order.shippingProvider
        ? `/track/${order.shippingProvider}/${order.trackingNumber}`
        : undefined,
  };
}

/**
 * Format address for display
 */
function mapAddressToDisplay(address: Address): AddressDisplay {
  const formatted = formatAddressDisplay(address);
  const shortFormat = `${address.city}, ${address.state} ${address.pincode}`;

  return {
    name: address.name,
    phone: address.phone,
    phoneFormatted: formatPhone(address.phone),
    line1: address.line1,
    line2: address.line2,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    country: address.country,
    formatted,
    shortFormat,
  };
}

/**
 * Map Order to OrderUI
 */
export function mapOrderToUI(order: Order): OrderUI {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    customerId: order.customerId,

    items: order.items.map(mapOrderItemToDisplay),
    itemCount: order.items.length,
    shopCount: new Set(order.items.map((item) => item.shopId)).size,

    pricing: mapPricingToDisplay(order),

    shippingAddress: mapAddressToDisplay(order.shippingAddress),
    billingAddress: order.billingAddress
      ? mapAddressToDisplay(order.billingAddress)
      : undefined,
    hasBillingAddress: !!order.billingAddress,

    status: getOrderStatusDisplay(order.status),
    paymentStatus: {
      value: order.paymentStatus,
      label:
        order.paymentStatus.charAt(0).toUpperCase() +
        order.paymentStatus.slice(1),
      color: order.paymentStatus === "paid" ? "#10B981" : "#F59E0B",
      className:
        order.paymentStatus === "paid"
          ? "bg-green-100 text-green-800"
          : "bg-amber-100 text-amber-800",
    },

    paymentMethod: order.paymentMethod,
    paymentMethodLabel: getPaymentMethodDisplay(order.paymentMethod),
    paymentId: order.paymentId,

    shipping: mapShippingInfoToDisplay(order),

    customerNotes: order.customerNotes,
    internalNotes: order.internalNotes,
    hasCustomerNotes: !!order.customerNotes,
    hasInternalNotes: !!order.internalNotes,

    timeline: generateTimeline(order),

    badges: generateBadges(order),

    url: `/user/orders/${order.id}`,
    invoiceUrl: `/user/orders/${order.id}/invoice`,
    trackingUrl:
      order.trackingNumber && order.shippingProvider
        ? `/track/${order.shippingProvider}/${order.trackingNumber}`
        : undefined,

    createdAt: order.createdAt,
    createdAtFormatted: formatDate(order.createdAt),
    updatedAt: order.updatedAt,
    updatedAtFormatted: formatDate(order.updatedAt),
  };
}

/**
 * Map Order to OrderCardUI
 */
export function mapOrderToCard(order: Order): OrderCardUI {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    itemCount: order.items.length,
    total: formatPrice(order.total),
    status: getOrderStatusDisplay(order.status),
    paymentStatus: {
      value: order.paymentStatus,
      label:
        order.paymentStatus.charAt(0).toUpperCase() +
        order.paymentStatus.slice(1),
      color: order.paymentStatus === "paid" ? "#10B981" : "#F59E0B",
      className:
        order.paymentStatus === "paid"
          ? "bg-green-100 text-green-800"
          : "bg-amber-100 text-amber-800",
    },
    createdAtFormatted: formatDate(order.createdAt),
    badges: generateBadges(order),
    url: `/user/orders/${order.id}`,
  };
}

/**
 * Map Order to OrderListItemUI
 */
export function mapOrderToListItem(order: Order): OrderListItemUI {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    itemCount: order.items.length,
    total: formatPrice(order.total),
    status: getOrderStatusDisplay(order.status),
    paymentStatus: {
      value: order.paymentStatus,
      label:
        order.paymentStatus.charAt(0).toUpperCase() +
        order.paymentStatus.slice(1),
      color: order.paymentStatus === "paid" ? "#10B981" : "#F59E0B",
      className:
        order.paymentStatus === "paid"
          ? "bg-green-100 text-green-800"
          : "bg-amber-100 text-amber-800",
    },
    createdAt: order.createdAt,
    url: `/user/orders/${order.id}`,
  };
}
