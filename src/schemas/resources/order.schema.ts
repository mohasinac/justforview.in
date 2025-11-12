/**
 * Order Resource Schema
 * Backend database schema with Zod validation
 */

import { z } from "zod";

/**
 * Order Status Enum
 */
export const OrderStatusEnum = z.enum([
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
]);

export type OrderStatus = z.infer<typeof OrderStatusEnum>;

/**
 * Payment Status Enum
 */
export const PaymentStatusEnum = z.enum([
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;

/**
 * Payment Method Enum
 */
export const PaymentMethodEnum = z.enum(["razorpay", "paypal", "cod"]);

export type PaymentMethod = z.infer<typeof PaymentMethodEnum>;

/**
 * Address Schema
 */
export const AddressSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(10).max(15),
  line1: z.string().min(1).max(200),
  line2: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  pincode: z.string().min(6).max(6),
  country: z.string().min(1).max(100),
});

export type Address = z.infer<typeof AddressSchema>;

/**
 * Order Item Schema
 */
export const OrderItemSchema = z.object({
  id: z.string().min(1),
  orderId: z.string().min(1),
  productId: z.string().min(1),
  productName: z.string().min(1).max(500),
  productImage: z.string().url(),
  sku: z.string().max(100).optional(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  total: z.number().positive(),
  variant: z.string().max(200).optional(),
  shopId: z.string().min(1),
  shopName: z.string().min(1).max(200),
  createdAt: z.date(),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

/**
 * Main Order Schema (Firestore Document)
 */
export const OrderSchema = z.object({
  id: z.string().min(1),
  orderNumber: z.string().min(1).max(50),
  customerId: z.string().min(1),

  // Items
  items: z.array(OrderItemSchema).min(1),

  // Pricing
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  total: z.number().positive(),

  // Coupon
  couponCode: z.string().max(50).optional(),
  couponDiscount: z.number().nonnegative().optional(),

  // Address
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema.optional(),

  // Status
  status: OrderStatusEnum,
  paymentStatus: PaymentStatusEnum,

  // Payment
  paymentMethod: PaymentMethodEnum,
  paymentId: z.string().max(200).optional(),

  // Shipping
  trackingNumber: z.string().max(100).optional(),
  shippingProvider: z.string().max(100).optional(),
  estimatedDelivery: z.date().optional(),
  deliveredAt: z.date().optional(),

  // Notes
  customerNotes: z.string().max(1000).optional(),
  internalNotes: z.string().max(1000).optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Order = z.infer<typeof OrderSchema>;

/**
 * Create Order Schema (for POST requests)
 */
export const CreateOrderSchema = OrderSchema.omit({
  id: true,
  orderNumber: true,
  status: true,
  paymentStatus: true,
  trackingNumber: true,
  shippingProvider: true,
  estimatedDelivery: true,
  deliveredAt: true,
  internalNotes: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  status: OrderStatusEnum.default("pending"),
  paymentStatus: PaymentStatusEnum.default("pending"),
});

export type CreateOrder = z.infer<typeof CreateOrderSchema>;

/**
 * Update Order Schema (for PATCH requests)
 */
export const UpdateOrderSchema = OrderSchema.partial().extend({
  id: z.string().min(1),
});

export type UpdateOrder = z.infer<typeof UpdateOrderSchema>;

/**
 * Order Filter Schema
 */
export const OrderFilterSchema = z.object({
  customerId: z.string().optional(),
  shopId: z.string().optional(),
  status: OrderStatusEnum.optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  paymentMethod: PaymentMethodEnum.optional(),
  minTotal: z.number().nonnegative().optional(),
  maxTotal: z.number().nonnegative().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type OrderFilter = z.infer<typeof OrderFilterSchema>;

/**
 * Validation Helpers
 */

export const validateOrder = (data: unknown) => {
  return OrderSchema.parse(data);
};

export const validateCreateOrder = (data: unknown) => {
  return CreateOrderSchema.parse(data);
};

export const validateUpdateOrder = (data: unknown) => {
  return UpdateOrderSchema.parse(data);
};

export const validateOrderFilter = (data: unknown) => {
  return OrderFilterSchema.parse(data);
};
