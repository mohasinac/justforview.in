# Review Resource

Product and shop reviews with ratings, verification, and moderation.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/review.schema.ts` - Firestore review documents
- Snake_case fields (product_id, shop_id, user_id, is_verified)
- References: product_id, shop_id, user_id

### UI Schema

- `src/schemas/ui/review.ui.ts` - Frontend display with user info
- CamelCase fields (productId, shopId, userId, isVerified)
- Nested objects: user, product, shop
- Computed fields: formattedRating, timeAgo

### Mapper

- `src/schemas/mappers/review.mapper.ts` - Backend → UI transformation
- Functions: mapReviewToUI, mapReviewsToUI

## API Endpoints

- GET `/api/reviews` - List reviews
- POST `/api/reviews` - Create review
- PATCH `/api/reviews/[id]` - Update review
- DELETE `/api/reviews/[id]` - Delete review

## Service Layer

- `src/services/reviews.service.ts` - Returns ReviewUI types
- Methods: list(), create(), update(), delete()

## Fields Reference

**Core**: id, rating (1-5), title, comment
**References**: productId, productName, shopId, shopName, userId, userName
**Media**: images[], videos[]
**Verification**: isVerified, isPurchased, orderId
**Moderation**: isApproved, isFlagged, flagReason
**Timestamps**: createdAt, updatedAt

## Filters

- Rating, verified, approved, product, shop, user, date range

## Related Resources

- Product (reviewed product)
- Shop (reviewed shop)
- User (reviewer)
- Order (verified purchase)
