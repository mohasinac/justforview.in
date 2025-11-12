# Payment Resource

Payment transaction management with Razorpay integration and refund processing.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/payment.schema.ts` - Firestore payments collection
- Snake_case fields (razorpay_order_id, razorpay_payment_id, payment_method)
- Status: pending, processing, completed, failed, refunded
- Gateway: razorpay (primary), cod, wallet

### UI Schema

- `src/schemas/ui/payment.ui.ts` - Frontend display with formatted amounts
- CamelCase fields (razorpayOrderId, razorpayPaymentId, paymentMethod)
- Nested objects: order, user, gateway
- Computed fields: formattedAmount, statusLabel, canRefund

### Mapper

- `src/schemas/mappers/payment.mapper.ts` - Backend → UI transformation
- Functions: mapPaymentToUI, mapPaymentsToUI

## API Endpoints

- GET `/api/admin/payments` - Admin payment list
- POST `/api/checkout/verify-payment` - Verify Razorpay payment
- POST `/api/admin/payments/[id]/refund` - Process refund

## Service Layer

- `src/services/payment.service.ts` - Returns PaymentUI types
- Methods: list(), getById(), verify(), refund()

## Fields Reference

**Core**: id, orderId, orderNumber, amount, currency
**Gateway**: gateway (razorpay/cod/wallet), razorpayOrderId, razorpayPaymentId, razorpaySignature
**Method**: paymentMethod (card/upi/netbanking/wallet/cod)
**Status**: status (pending/processing/completed/failed/refunded)
**Customer**: userId, userName, userEmail
**Refund**: refundAmount, refundReason, refundedAt, refundId
**Timestamps**: createdAt, updatedAt, paidAt, failedAt

## Filters

- Status, gateway, payment method, date range, amount range

## Related Resources

- Order (payment for order)
- User (customer)
- Return (refund processing)
