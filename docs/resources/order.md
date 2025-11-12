# Order Resource

Order lifecycle management with payment, fulfillment, and multi-shop support.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/order.schema.ts` - Firestore order documents
- Snake_case fields (user_id, payment_status, shipping_address)
- References: user_id, shop_id, seller_id

### UI Schema

- `src/schemas/ui/order.ui.ts` - Frontend display with formatted amounts
- CamelCase fields (userId, paymentStatus, shippingAddress)
- Nested objects: customer, seller, shop, items[], pricing{subtotal, tax, shipping, discount, total}
- Computed fields: formattedTotal, itemCount, statusLabel

### Mapper

- `src/schemas/mappers/order.mapper.ts` - Backend → UI transformation
- Functions: mapOrderToUI, mapOrdersToUI

## API Endpoints

- GET `/api/orders` - User orders
- GET `/api/orders/[id]` - Order detail
- GET `/api/seller/orders` - Seller orders
- POST `/api/checkout/create-order` - Create order
- PATCH `/api/orders/[id]` - Update order status

## Service Layer

- `src/services/orders.service.ts` - Returns OrderUI types
- Methods: list(), getById(), create(), updateStatus()

## Fields Reference

**Core**: id, orderNumber, status (pending/processing/shipped/delivered/cancelled)
**Customer**: userId, userName, userEmail, shippingAddress
**Seller**: sellerId, sellerName, shopId, shopName
**Items**: items[]{productId, name, quantity, price, total}
**Pricing**: subtotal, tax, shipping, discount, total, currency
**Payment**: paymentMethod, paymentStatus (pending/paid/failed), razorpayOrderId, razorpayPaymentId
**Shipping**: shippingMethod, trackingNumber, shippedAt, deliveredAt
**Coupon**: couponCode, couponDiscount
**Timestamps**: createdAt, updatedAt, paidAt, shippedAt, deliveredAt

## Filters

- Status, payment status, date range, customer, seller, shop

## Related Resources

- User (customer)
- Shop (seller shop)
- Product (order items)
- Payment (order payment)
- Coupon (applied discount)
