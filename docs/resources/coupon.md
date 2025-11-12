# Coupon Resource

Discount codes with validation, usage limits, and conditions.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/coupon.schema.ts` - Firestore coupon documents
- Snake_case fields (discount_type, discount_value, usage_limit, used_count)
- Types: percentage, fixed, free_shipping

### UI Schema

- `src/schemas/ui/coupon.ui.ts` - Frontend display with formatted discount
- CamelCase fields (discountType, discountValue, usageLimit, usedCount)
- Computed fields: formattedDiscount, remainingUses, isExpired, canUse

### Mapper

- `src/schemas/mappers/coupon.mapper.ts` - Backend → UI transformation
- Functions: mapCouponToUI, mapCouponsToUI

## API Endpoints

- GET `/api/coupons` - List coupons
- GET `/api/coupons/[code]` - Get by code
- POST `/api/coupons/validate` - Validate coupon
- POST `/api/admin/coupons` - Create coupon
- PATCH `/api/admin/coupons/[id]` - Update coupon

## Service Layer

- `src/services/coupons.service.ts` - Returns CouponUI types
- Methods: list(), getByCode(), validate(), getFeatured()

## Fields Reference

**Core**: id, code, description
**Discount**: discountType (percentage/fixed/free_shipping), discountValue, maxDiscount
**Conditions**: minPurchase, applicableProducts[], applicableCategories[], applicableShops[]
**Limits**: usageLimit, usedCount, perUserLimit, validFrom, validUntil
**Status**: isActive, isFeatured, isPublic
**Timestamps**: createdAt, updatedAt

## Filters

- Active, featured, valid date range, discount type

## Related Resources

- Order (applied coupon)
- Product (applicable products)
- Category (applicable categories)
- Shop (applicable shops)
