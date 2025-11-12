# Shop Resource

Multi-vendor shop management with ratings, products, and seller profiles.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/shop.schema.ts` - Firestore shop documents
- Snake_case fields (seller_id, total_sales, average_rating)
- References: seller_id

### UI Schema

- `src/schemas/ui/shop.ui.ts` - Frontend display with stats
- CamelCase fields (sellerId, totalSales, averageRating)
- Nested objects: seller, stats, contact, social, seo
- Computed fields: formattedRating, productCount, reviewCount

### Mapper

- `src/schemas/mappers/shop.mapper.ts` - Backend → UI transformation
- Functions: mapShopToUI, mapShopsToUI

## API Endpoints

- GET `/api/shops` - List with filters
- GET `/api/shops/[slug]` - Shop detail
- GET `/api/shops/[slug]/products` - Shop products
- GET `/api/shops/[slug]/reviews` - Shop reviews
- POST `/api/seller/shop` - Create/update shop

## Service Layer

- `src/services/shops.service.ts` - Returns ShopUI types
- Methods: list(), getBySlug(), getProducts(), getReviews()

## Fields Reference

**Core**: id, slug, name, description, tagline
**Seller**: sellerId, sellerName, sellerEmail
**Stats**: totalSales, totalOrders, averageRating, reviewCount, productCount
**Contact**: email, phone, address, city, state, country, zipCode
**Social**: website, facebook, instagram, twitter
**Media**: logo, banner, images[]
**Settings**: isActive, isVerified, isFeatured
**SEO**: metaTitle, metaDescription, metaKeywords
**Timestamps**: createdAt, updatedAt

## Filters

- Verified, featured, rating, location, seller

## Related Resources

- User (shop owner/seller)
- Product (shop products)
- Review (shop reviews)
- Order (shop orders)
