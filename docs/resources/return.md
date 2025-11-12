# Return Resource

Return and refund request management with approval workflow.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/return.schema.ts` - Firestore returns collection
- Snake_case fields (order_id, return_reason, refund_amount)
- Status: requested, approved, rejected, refunded, completed

### UI Schema

- `src/schemas/ui/return.ui.ts` - Frontend display with order info
- CamelCase fields (orderId, returnReason, refundAmount)
- Nested objects: order, user, items[]
- Computed fields: formattedRefund, statusLabel, canCancel

### Mapper

- `src/schemas/mappers/return.mapper.ts` - Backend → UI transformation
- Functions: mapReturnToUI, mapReturnsToUI

## API Endpoints

- GET `/api/returns` - User returns
- POST `/api/returns` - Create return request
- GET `/api/returns/[id]` - Return detail
- PATCH `/api/returns/[id]` - Update return
- GET `/api/admin/returns` - Admin return list
- POST `/api/admin/returns/[id]/approve` - Approve return
- POST `/api/admin/returns/[id]/reject` - Reject return

## Service Layer

- `src/services/return.service.ts` - Returns ReturnUI types
- Methods: list(), getById(), create(), update(), approve(), reject()

## Fields Reference

**Core**: id, returnNumber, orderId, orderNumber
**Reason**: returnReason, reasonDetails, returnType (refund/exchange)
**Items**: items[]{productId, productName, quantity, reason}
**Amounts**: itemsTotal, refundAmount, refundMethod
**Status**: status (requested/approved/rejected/refunded/completed)
**Customer**: userId, userName, userEmail
**Admin**: reviewedBy, reviewedAt, adminNotes
**Images**: images[] (proof of damage/defect)
**Timestamps**: createdAt, updatedAt, approvedAt, refundedAt

## Filters

- Status, return type, date range, user, order

## Related Resources

- Order (original order)
- User (requester)
- Payment (refund processing)
