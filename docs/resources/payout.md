# Payout Resource

Seller payout management with approval workflow and bank transfer processing.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/payout.schema.ts` - Firestore payouts collection
- Snake_case fields (seller_id, payout_amount, bank_account)
- Status: pending, approved, processing, completed, rejected

### UI Schema

- `src/schemas/ui/payout.ui.ts` - Frontend display with formatted amounts
- CamelCase fields (sellerId, payoutAmount, bankAccount)
- Nested objects: seller, shop, bankDetails
- Computed fields: formattedAmount, statusLabel, canProcess

### Mapper

- `src/schemas/mappers/payout.mapper.ts` - Backend → UI transformation
- Functions: mapPayoutToUI, mapPayoutsToUI

## API Endpoints

- GET `/api/seller/payouts` - Seller payout list
- POST `/api/seller/payouts` - Request payout
- GET `/api/admin/payouts` - Admin payout list
- POST `/api/admin/payouts/[id]/process` - Process payout
- POST `/api/admin/payouts/[id]/reject` - Reject payout

## Service Layer

- `src/services/payout.service.ts` - Returns PayoutUI types
- Methods: list(), request(), getById(), process(), reject()

## Fields Reference

**Core**: id, payoutNumber, amount, currency
**Seller**: sellerId, sellerName, shopId, shopName
**Bank**: bankAccount, accountHolder, ifscCode, bankName, accountType
**Status**: status (pending/approved/processing/completed/rejected)
**Period**: periodStart, periodEnd, orderIds[]
**Processing**: transactionId, processedBy, processedAt, rejectionReason
**Amounts**: grossAmount, commission, tax, netAmount
**Timestamps**: createdAt, updatedAt, requestedAt, completedAt

## Filters

- Status, seller, date range, amount range

## Related Resources

- User (seller)
- Shop (seller shop)
- Order (payout orders)
