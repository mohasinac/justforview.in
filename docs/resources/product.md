# Product Resource

Product catalog management with variants, media, inventory, and multi-vendor support.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/product.schema.ts` - Firestore product documents with Zod validation
- Snake_case fields (product_type, is_featured, created_at)
- References: category_id, seller_id, shop_id

### UI Schema

- `src/schemas/ui/product.ui.ts` - Frontend display model with formatted fields
- CamelCase fields (productType, isFeatured, createdAt)
- Nested objects: pricing, inventory, media, seo, metadata
- Computed fields: formattedPrice, discountPercentage, stockStatus

### Mapper

- `src/schemas/mappers/product.mapper.ts` - Backend → UI transformation
- Functions: mapProductToUI, mapProductsToUI

## API Endpoints

- GET `/api/products` - List with filters/pagination
- GET `/api/products/[slug]` - Product detail
- GET `/api/products/[slug]/variants` - Product variants
- GET `/api/products/[slug]/similar` - Similar products
- GET `/api/products/[slug]/seller-items` - Other items from seller
- POST `/api/admin/products` - Create product (admin/seller)
- PATCH `/api/admin/products/[id]` - Update product
- DELETE `/api/admin/products/[id]` - Delete product

## Service Layer

- `src/services/products.service.ts` - Returns ProductUI types
- Methods: list(), getBySlug(), getSimilar(), getSellerItems(), getVariants()

## Fields Reference

**Core**: id, slug, name, description, productType (simple/variable)
**Pricing**: price, salePrice, costPrice, currency, taxClass
**Inventory**: sku, stockCount, stockStatus, lowStockThreshold, manageStock
**Media**: images[], videos[], thumbnail
**Categories**: categoryId, categorySlug, categoryName
**Seller**: sellerId, sellerName, shopId, shopSlug, shopName
**SEO**: metaTitle, metaDescription, metaKeywords, ogImage
**Status**: isActive, isFeatured, isPublished, visibility
**Timestamps**: createdAt, updatedAt, publishedAt

## Filters

- Category, shop, seller, price range, stock status, product type, featured, search query

## Related Resources

- Category (parent category)
- Shop (seller's shop)
- User (seller)
- Review (product reviews)
- Order (order items)
