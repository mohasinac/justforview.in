# Schema System Migration Checklist

**Project**: JustForView.in  
**Started**: November 12, 2025  
**Status**: In Progress 🚧

---

## Overview

Migration to a comprehensive resource schema system to eliminate data inconsistencies between UI and backend by introducing:

1. **Resource Schemas** - Backend entity definitions
2. **UI Schemas** - Frontend display models
3. **Mappers** - Backend-to-UI data transformation
4. **Constants** - Resource-specific endpoints and fields
5. **Centralized Types** - All TypeScript types in one location
6. **Resource Documentation** - AI-agent readable feature guides

**Total Tasks**: 337 (updated - includes create forms + bulk routes)
**Completed**: 291 (86% - includes edit/create forms + bulk actions guides)
**In Progress**: 7 (getForEdit service methods)
**Remaining**: 39

**Critical Work**:

1. Edit/create forms need backend format, not UI schemas for form state
2. Bulk action routes should be at resource level with permission checks

**New Phase 10**: Service layer + forms + bulk routes (39 tasks)

- 7 `getForEdit()` methods in services
- 8 edit form pages to fix
- 3 create form pages to fix (seller-facing)
- 6 bulk action route moves
- 1 inline edit component
- 5 documentation updates (2 done)
- Testing and validation

**Estimated Time**: 2 days (service updates + form fixes + route restructuring)

---

## Architecture Overview

```
src/
├── schemas/
│ ├── resources/ # Backend Firestore schemas
│ │ ├── product.schema.ts
│ │ ├── auction.schema.ts
│ │ ├── category.schema.ts**Last Updated**: November 13, 2025
**Maintainer**: Development Team
**Status**: Phase 3 Complete ✅ | Phase 4-8 In Progress 🚧 | 90% Complete │ ├── shop.schema.ts
│ │ ├── order.schema.ts
│ │ ├── user.schema.ts
│ │ ├── review.schema.ts
│ │ ├── coupon.schema.ts
│ │ ├── support.schema.ts
│ │ ├── return.schema.ts
│ │ └── ... (all resources)
│ │
│ ├── ui/ # Frontend UI schemas
│ │ ├── product.ui.ts
│ │ ├── auction.ui.ts
│ │ ├── category.ui.ts
│ │ ├── shop.ui.ts
│ │ ├── order.ui.ts
│ │ ├── user.ui.ts
│ │ ├── review.ui.ts
│ │ ├── coupon.ui.ts
│ │ ├── support.ui.ts
│ │ ├── return.ui.ts
│ │ └── ... (all resources)
│ │
│ └── mappers/ # Backend to UI transformation
│ ├── product.mapper.ts
│ ├── auction.mapper.ts
│ ├── category.mapper.ts
│ ├── shop.mapper.ts
│ ├── order.mapper.ts
│ ├── user.mapper.ts
│ ├── review.mapper.ts
│ ├── coupon.mapper.ts
│ ├── support.mapper.ts
│ ├── return.mapper.ts
│ └── ... (all resources)
│
├── constants/
│ ├── endpoints/ # Resource-specific API endpoints
│ │ ├── product.endpoints.ts
│ │ ├── auction.endpoints.ts
│ │ ├── category.endpoints.ts
│ │ ├── shop.endpoints.ts
│ │ ├── order.endpoints.ts
│ │ └── ... (all resources)
│ │
│ └── fields/ # Resource-specific field definitions
│ ├── product.fields.ts
│ ├── auction.fields.ts
│ ├── category.fields.ts
│ ├── shop.fields.ts
│ ├── order.fields.ts
│ └── ... (all resources)
│
└── types/ # Centralized TypeScript types
├── entities/ # Database entity types
│ ├── product.types.ts
│ ├── auction.types.ts
│ └── ...
│
├── ui/ # UI component types
│ ├── product.ui.types.ts
│ ├── auction.ui.types.ts
│ └── ...
│
├── api/ # API request/response types
│ ├── product.api.types.ts
│ ├── auction.api.types.ts
│ └── ...
│
├── components/ # Component prop types
│ ├── cards.types.ts
│ ├── forms.types.ts
│ ├── modals.types.ts
│ └── ...
│
└── shared/ # Shared/common types
├── pagination.types.ts
├── filters.types.ts
├── responses.types.ts
└── ...

docs/
└── resources/ # AI-agent documentation
├── product.md
├── auction.md
├── category.md
├── shop.md
├── order.md
├── user.md
├── review.md
├── coupon.md
├── support.md
├── return.md
└── ... (all resources)

```

---

## Phase 1: Foundation Setup ✅

### 1.1 Create Directory Structure ✅

- [x] Create `src/schemas/resources/`
- [x] Create `src/schemas/ui/`
- [x] Create `src/schemas/mappers/`
- [x] Create `src/constants/endpoints/`
- [x] Create `src/constants/fields/`
- [x] Create `src/types/entities/`
- [x] Create `src/types/ui/`
- [x] Create `src/types/api/`
- [x] Create `src/types/components/`
- [x] Create `src/types/shared/`
- [x] Create `docs/resources/`

### 1.2 Create Base Files ✅

- [x] Create `src/schemas/README.md` (explains the schema system)
- [x] Create `src/types/README.md` (explains type organization)
- [x] Create `docs/resources/README.md` (AI-agent guide template)
- [x] Create `SCHEMA-MIGRATION-CHECKLIST.md` (this file)

---

## Phase 2: Core Resources Implementation

### Priority Resources (Complete These First)

#### 2.1 Product Resource ✅

**Backend**:

- [x] `src/schemas/resources/product.schema.ts`
- [x] `src/constants/endpoints/product.endpoints.ts`
- [x] `src/constants/fields/product.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/product.ui.ts`
- [x] `src/schemas/mappers/product.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/products/route.ts` to use mapper
- [x] Update `src/app/api/products/[slug]/route.ts`
- [x] Update `src/app/api/products/[slug]/variants/route.ts`
- [x] Update `src/app/api/products/[slug]/similar/route.ts`
- [x] Update `src/app/api/products/[slug]/seller-items/route.ts`
- [x] Update `src/services/products.service.ts` to use UI schema

**Documentation**:

- [x] `docs/resources/product.md`

#### 2.2 Auction Resource ✅

**Backend**:

- [x] `src/schemas/resources/auction.schema.ts`
- [x] `src/constants/endpoints/auction.endpoints.ts`
- [x] `src/constants/fields/auction.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/auction.ui.ts`
- [x] `src/schemas/mappers/auction.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/auctions/route.ts`
- [x] Update `src/app/api/auctions/[id]/route.ts`
- [x] Update `src/app/api/auctions/featured/route.ts`
- [x] Update `src/app/api/auctions/live/route.ts`
- [x] Update `src/app/api/auctions/[id]/bid/route.ts`
- [x] Update `src/app/api/auctions/my-bids/route.ts`
- [x] Update `src/services/auctions.service.ts`

**Documentation**:

- [x] `docs/resources/auction.md`

#### 2.3 Category Resource ✅

**Backend**:

- [x] `src/schemas/resources/category.schema.ts`
- [x] `src/constants/endpoints/category.endpoints.ts`
- [x] `src/constants/fields/category.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/category.ui.ts`
- [x] `src/schemas/mappers/category.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/categories/route.ts`
- [x] Update `src/app/api/categories/[slug]/route.ts`
- [x] Update `src/app/api/categories/tree/route.ts`
- [x] Update `src/app/api/categories/featured/route.ts`
- [x] Update `src/app/api/categories/homepage/route.ts`
- [x] Update `src/app/api/categories/leaves/route.ts`
- [x] Update `src/app/api/categories/search/route.ts`
- [x] Update `src/services/categories.service.ts`

**Documentation**:

- [x] `docs/resources/category.md`

#### 2.4 Shop Resource ✅

**Backend**:

- [x] `src/schemas/resources/shop.schema.ts`
- [x] `src/constants/endpoints/shop.endpoints.ts`
- [x] `src/constants/fields/shop.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/shop.ui.ts`
- [x] `src/schemas/mappers/shop.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/shops/route.ts`
- [x] Update `src/app/api/shops/[slug]/products/route.ts`
- [x] Update `src/app/api/shops/[slug]/reviews/route.ts`
- [x] Update `src/services/shops.service.ts`

**Documentation**:

- [x] `docs/resources/shop.md`

#### 2.5 Order Resource ✅

**Backend**:

- [x] `src/schemas/resources/order.schema.ts`
- [x] `src/constants/endpoints/order.endpoints.ts`
- [x] `src/constants/fields/order.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/order.ui.ts`
- [x] `src/schemas/mappers/order.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/orders/route.ts`
- [x] Update `src/app/api/seller/orders/route.ts`
- [x] Update `src/services/orders.service.ts`

**Documentation**:

- [x] `docs/resources/order.md`

---

## Phase 3: Secondary Resources

### User & Auth Resources

#### 3.1 User Resource ✅

**Backend**:

- [x] `src/schemas/resources/user.schema.ts`
- [x] `src/constants/endpoints/user.endpoints.ts`
- [x] `src/constants/fields/user.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/user.ui.ts`
- [x] `src/schemas/mappers/user.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/user/route.ts`
- [x] Update `src/app/api/user/profile/route.ts`
- [x] Update `src/app/api/admin/users/route.ts`
- [x] Update `src/services/users.service.ts`

**Documentation**:

- [x] `docs/resources/user.md`

#### 3.2 Address Resource ✅

**Backend**:

- [x] `src/schemas/resources/address.schema.ts`
- [x] `src/constants/endpoints/address.endpoints.ts`
- [x] `src/constants/fields/address.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/address.ui.ts`
- [x] `src/schemas/mappers/address.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/user/addresses/route.ts`
- [x] Update `src/app/api/user/addresses/[id]/route.ts`
- [x] Update `src/services/address.service.ts`

**Documentation**:

- [x] `docs/resources/address.md`

### Review & Rating Resources

#### 3.3 Review Resource ✅

**Backend**:

- [x] `src/schemas/resources/review.schema.ts`
- [x] `src/constants/endpoints/review.endpoints.ts`
- [x] `src/constants/fields/review.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/review.ui.ts`
- [x] `src/schemas/mappers/review.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/reviews/route.ts`
- [x] Update `src/services/reviews.service.ts`

**Documentation**:

- [x] `docs/resources/review.md`

### Marketing Resources

#### 3.4 Coupon Resource ✅

**Backend**:

- [x] `src/schemas/resources/coupon.schema.ts`
- [x] `src/constants/endpoints/coupon.endpoints.ts`
- [x] `src/constants/fields/coupon.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/coupon.ui.ts`
- [x] `src/schemas/mappers/coupon.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/coupons/route.ts`
- [x] Update `src/app/api/coupons/[code]/route.ts`
- [x] Update `src/services/coupons.service.ts`

**Documentation**:

- [x] `docs/resources/coupon.md`

#### 3.5 Hero Slide Resource ✅

**Backend**:

- [x] `src/schemas/resources/hero-slide.schema.ts`
- [x] `src/constants/endpoints/hero-slide.endpoints.ts`
- [x] `src/constants/fields/hero-slide.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/hero-slide.ui.ts`
- [x] `src/schemas/mappers/hero-slide.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/hero-slides/route.ts`
- [x] Update `src/app/api/admin/hero-slides/route.ts`
- [x] Update `src/app/api/homepage/hero-slides/route.ts`
- [x] Update `src/services/hero-slide.service.ts`

**Documentation**:

- [x] `docs/resources/hero-slide.md`

### Support Resources

#### 3.6 Support Ticket Resource ✅

**Backend**:

- [x] `src/schemas/resources/support.schema.ts`
- [x] `src/constants/endpoints/support.endpoints.ts`
- [x] `src/constants/fields/support.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/support.ui.ts`
- [x] `src/schemas/mappers/support.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/support/route.ts`
- [x] Update `src/services/support.service.ts`

**Documentation**:

- [x] `docs/resources/support.md`

#### 3.7 Return Resource ✅

**Backend**:

- [x] `src/schemas/resources/return.schema.ts`
- [x] `src/constants/endpoints/return.endpoints.ts`
- [x] `src/constants/fields/return.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/return.ui.ts`
- [x] `src/schemas/mappers/return.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/returns/route.ts`
- [x] Create `src/services/return.service.ts`

**Documentation**:

- [x] `docs/resources/return.md`

### Financial Resources

#### 3.8 Payment Resource ✅

**Backend**:

- [x] `src/schemas/resources/payment.schema.ts`
- [x] `src/constants/endpoints/payment.endpoints.ts`
- [x] `src/constants/fields/payment.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/payment.ui.ts`
- [x] `src/schemas/mappers/payment.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/payments/route.ts`
- [x] Create `src/services/payment.service.ts`

**Documentation**:

- [x] `docs/resources/payment.md`

#### 3.9 Payout Resource ✅

**Backend**:

- [x] `src/schemas/resources/payout.schema.ts`
- [x] `src/constants/endpoints/payout.endpoints.ts`
- [x] `src/constants/fields/payout.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/payout.ui.ts`
- [x] `src/schemas/mappers/payout.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/seller/payouts/route.ts`
- [x] Update `src/app/api/admin/payouts/route.ts`
- [x] Update `src/app/api/admin/payouts/[id]/process/route.ts`
- [x] Update `src/app/api/admin/payouts/[id]/reject/route.ts`
- [x] Create `src/services/payout.service.ts`

**Documentation**:

- [x] `docs/resources/payout.md`

### Content Resources

#### 3.10 Blog Post Resource ✅

**Backend**:

- [x] `src/schemas/resources/blog-post.schema.ts`
- [x] `src/constants/endpoints/blog-post.endpoints.ts`
- [x] `src/constants/fields/blog-post.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/blog-post.ui.ts`
- [x] `src/schemas/mappers/blog-post.mapper.ts`

**API Integration**:

- [x] Update `src/app/api/blog/route.ts`
- [x] Update `src/services/blog.service.ts`

**Documentation**:

- [x] `docs/resources/blog-post.md`

---

## Phase 4: Component Migration

### 4.1 Update Components to Use UI Schemas

**Product Components**:

- [x] `src/components/cards/ProductCard.tsx`
- [x] `src/components/product/ProductInfo.tsx`
- [x] `src/components/product/ProductGallery.tsx`
- [x] `src/components/product/SimilarProducts.tsx`
- [x] `src/components/product/ProductReviews.tsx`
- [x] `src/components/product/ProductDescription.tsx`
- [ ] `src/components/product/ProductForm.tsx`
- [ ] All other product components

**Auction Components**:

- [x] `src/components/cards/AuctionCard.tsx`
- [x] `src/components/auction/AutoBidSetup.tsx`
- [x] `src/components/auction/LiveBidHistory.tsx`
- [x] `src/components/auction/LiveCountdown.tsx`
- [ ] All other auction components

**Category Components**:

- [x] `src/components/cards/CategoryCard.tsx`
- [ ] `src/components/category/CategoryTree.tsx`
- [ ] `src/components/category/CategoryForm.tsx`
- [ ] All other category components

**Shop Components**:

- [x] `src/components/cards/ShopCard.tsx`
- [x] `src/components/shop/ShopHeader.tsx`
- [ ] `src/components/shop/ShopProfile.tsx`
- [ ] `src/components/shop/ShopForm.tsx`
- [ ] All other shop components

**Order Components**:

- [x] `src/components/order/OrderCard.tsx`
- [x] `src/components/order/OrderList.tsx`
- [ ] `src/components/order/OrderDetails.tsx`
- [ ] All other order components

**Cart & Checkout Components**:

- [x] `src/components/cart/CartItem.tsx`
- [x] `src/components/cart/CartSummary.tsx`
- [x] `src/components/checkout/AddressSelector.tsx`
- [x] `src/components/checkout/AddressForm.tsx` (partial - needs service layer fix)
- [ ] `src/components/checkout/CheckoutForm.tsx`
- [ ] All other cart/checkout components

### 4.2 Create Component Type Files

- [x] `src/schemas/ui/cart.ui.ts` - Cart UI schema
- [x] `src/types/components/cards.types.ts` - Card component props
- [x] `src/types/components/forms.types.ts` - Form component props
- [x] `src/types/components/modals.types.ts` - Modal component props
- [x] `src/types/components/tables.types.ts` - Table component props
- [x] `src/types/components/layouts.types.ts` - Layout component props

---

## Phase 5: Page Migration

### 5.1 Update Pages to Use UI Schemas

**Product Pages**:

- [x] `src/app/products/page.tsx`
- [x] `src/app/products/[slug]/page.tsx`
- [x] `src/app/seller/products/page.tsx`
- [x] `src/app/seller/products/create/page.tsx`
- [x] `src/app/seller/products/[id]/page.tsx` (edit page) - Fixed nested field access
- [x] `src/app/admin/products/page.tsx` - Fixed nested field access

**Auction Pages**:

- [x] `src/app/auctions/page.tsx`
- [x] `src/app/auctions/[slug]/page.tsx`
- [ ] `src/app/seller/auctions/page.tsx` (needs nested UI field access)
- [x] `src/app/admin/auctions/page.tsx` (already uses AuctionUI)

**Category Pages**:

- [x] `src/app/categories/page.tsx`
- [x] `src/app/categories/[slug]/page.tsx`
- [ ] `src/app/admin/categories/page.tsx` (needs nested UI field access)

**Shop Pages**:

- [x] `src/app/shops/page.tsx`
- [x] `src/app/shops/[slug]/page.tsx`
- [ ] `src/app/seller/shop/page.tsx` (needs nested UI field access)
- [ ] `src/app/admin/shops/page.tsx` (needs nested UI field access)

**Order Pages**:

- [x] `src/app/user/orders/page.tsx`
- [x] `src/app/user/orders/[id]/page.tsx` (uses OrderUI)
- [x] `src/app/seller/orders/page.tsx` - Fixed nested field access + service method
- [x] `src/app/admin/orders/page.tsx` - Fixed nested field access

**Checkout Pages**:

- [x] `src/app/cart/page.tsx`
- [ ] `src/app/checkout/page.tsx` (needs nested UI field access)

---

## Phase 6: Service Layer Updates

### 6.1 Update Services to Use Endpoints Constants

- [x] `src/services/products.service.ts` → use `product.endpoints.ts`
- [x] `src/services/auctions.service.ts` → use `auction.endpoints.ts`
- [x] `src/services/categories.service.ts` → use `category.endpoints.ts`
- [x] `src/services/shops.service.ts` → use `shop.endpoints.ts`
- [x] `src/services/orders.service.ts` → use `order.endpoints.ts`
- [x] `src/services/cart.service.ts` → use cart endpoints
- [x] `src/services/users.service.ts` → use user endpoints
- [x] `src/services/reviews.service.ts` → use review endpoints
- [x] `src/services/coupons.service.ts` → use coupon endpoints
- [x] `src/services/support.service.ts` → use support endpoints
- [x] `src/services/returns.service.ts` → use return endpoints

### 6.2 Update Services to Return UI Schemas

- [x] Products service returns PaginatedResponse<ProductUI>
- [x] Auctions service returns PaginatedResponse<AuctionUI>
- [x] Shops service returns PaginatedResponse<ShopUI>
- [x] Orders service returns PaginatedResponse<OrderUI>
- [x] Reviews service returns PaginatedResponse<ReviewUI>
- [x] Coupons service returns PaginatedResponse<CouponUI>
- [x] Support service returns PaginatedResponse<SupportTicketUI>
- [x] Services handle mapper transformation internally
- [ ] Update remaining service method signatures

---

## Phase 7: API Route Updates

### 7.1 Update API Routes to Use Mappers

**Product APIs**:

- [x] `src/app/api/products/route.ts`
- [x] `src/app/api/products/[id]/route.ts`
- [x] `src/app/api/admin/products/route.ts` (not found - using main routes)
- [x] `src/app/api/seller/products/route.ts` (not found - using main routes)

**Auction APIs**:

- [x] `src/app/api/auctions/route.ts`
- [x] `src/app/api/auctions/[id]/route.ts`
- [x] `src/app/api/admin/auctions/route.ts` (not found - using main routes)
- [x] `src/app/api/seller/auctions/route.ts` (not found - using main routes)

**Category APIs**:

- [x] `src/app/api/categories/route.ts`
- [x] `src/app/api/categories/[id]/route.ts` (uses [slug])
- [x] `src/app/api/admin/categories/route.ts` (not found - using main routes)

**Shop APIs**:

- [x] `src/app/api/shops/route.ts`
- [x] `src/app/api/shops/[id]/route.ts` (uses [slug])
- [x] `src/app/api/admin/shops/route.ts` (not found - using main routes)
- [x] `src/app/api/seller/shop/route.ts` (not found - using main routes)

**Order APIs**:

- [x] `src/app/api/orders/route.ts`
- [x] `src/app/api/orders/[id]/route.ts`
- [x] `src/app/api/admin/orders/route.ts` (not found - using main routes)
- [x] `src/app/api/seller/orders/route.ts`

**Other APIs**:

- [x] `src/app/api/reviews/route.ts`
- [x] `src/app/api/coupons/route.ts`
- [x] `src/app/api/support/route.ts`
- [x] `src/app/api/returns/route.ts`
- [x] `src/app/api/user/profile/route.ts`
- [x] `src/app/api/user/addresses/route.ts` - [x] `src/app/api/admin/users/route.ts` - [x] `src/app/api/admin/hero-slides/route.ts` - [x] `src/app/api/admin/payouts/route.ts` - [x] `src/app/api/blog/route.ts` - [ ] `src/app/api/cart/route.ts` (doesn't need mapper - simple joins)

                                                      ### 7.2 Update API Routes to Use Resource Schemas for Validation

                                                      - [x] All POST/PATCH endpoints validate with resource schemas

- [x] Added validation to cart routes (POST, PATCH)
- [x] Added validation to blog routes (PATCH)
- [x] Checkout route already has comprehensive validation
- [x] Support route validates with inline checks
- [x] Complete validation audit performed

---

## Phase 8: Hook Updates

### 8.1 Update Custom Hooks to Use UI Schemas

- [x] `src/hooks/useCart.ts` - Updated to use CartItemUI
- [x] `src/hooks/useAuctionSocket.ts` - Updated to use AuctionUI for real-time state
- [x] `src/hooks/useViewingHistory.ts` - Uses navigation constants (no UI schema needed)
- [x] `src/hooks/useFilters.ts` - Generic filter hook (no UI schema needed)
- [x] `src/hooks/useMediaUpload.ts` - Media upload hook (no UI schema needed)
- [x] `src/hooks/useMediaUploadWithCleanup.ts` - Media upload hook (no UI schema needed)
- [x] `src/hooks/useMobile.ts` - Utility hook (no UI schema needed)
- [x] `src/hooks/useNavigationGuard.ts` - Navigation hook (no UI schema needed)
- [x] `src/hooks/useSlugValidation.ts` - Validation hook (no UI schema needed)
- [x] `src/hooks/useUploadQueue.ts` - Upload queue hook (no UI schema needed)
- [x] `src/hooks/useAccessibility.ts` - Accessibility hook (no UI schema needed)

---

## Phase 9: Context Updates

### 9.1 Update Contexts to Use UI Schemas

- [x] `src/contexts/AuthContext.tsx` - Uses auth-specific User type (no UI schema needed)
- [x] `src/contexts/UploadContext.tsx` - Manages upload state (no UI schema needed)

---

## Phase 10: Edit/Create Form Pattern Implementation (UI + Raw Data)

### 10.1 Add `getForEdit` Methods to Services

Services need to return BOTH formats for edit scenarios:

- **UI format** for display (shop.name, category.name, formatted prices)
- **Raw backend format** for form state (editable fields with plain values)

- [ ] `src/services/products.service.ts` - Add `getForEdit(id): Promise<{ ui: ProductUI; raw: Product }>`
- [ ] `src/services/auctions.service.ts` - Add `getForEdit(id): Promise<{ ui: AuctionUI; raw: Auction }>`
- [ ] `src/services/shops.service.ts` - Add `getForEdit(id): Promise<{ ui: ShopUI; raw: Shop }>`
- [ ] `src/services/categories.service.ts` - Add `getForEdit(id): Promise<{ ui: CategoryUI; raw: Category }>`
- [ ] `src/services/orders.service.ts` - Add `getForEdit(id): Promise<{ ui: OrderUI; raw: Order }>`
- [ ] `src/services/reviews.service.ts` - Add `getForEdit(id): Promise<{ ui: ReviewUI; raw: Review }>`
- [ ] `src/services/users.service.ts` - Add `getForEdit(id): Promise<{ ui: UserUI; raw: User }>`

**Pattern**:

```typescript
async getForEdit(id: string): Promise<{ ui: ProductUI; raw: Product }> {
  const doc = await getDoc(doc(this.collection, id));
  if (!doc.exists()) throw new Error("Not found");

  const raw = { id: doc.id, ...doc.data() } as Product;
  const ui = mapProductToUI(raw);

  return { ui, raw };
}
```

### 10.2 Fix Admin/Seller Edit & Create Forms

Edit/Create forms use **backend types for form state**, **UI types for display**:

**Product Edit Forms**:

- [ ] `src/app/admin/products/[id]/edit/page.tsx`
  - Change state from `ProductUI` to `Partial<Product>` for form
  - Keep separate `ProductUI` state for display fields
  - Use `getForEdit()` method
- [ ] `src/app/seller/products/[id]/edit/page.tsx` - Same pattern

**Auction Edit Forms**:

- [ ] `src/app/admin/auctions/[id]/edit/page.tsx` - Use `Partial<Auction>` for form state
- [ ] `src/app/seller/auctions/[id]/edit/page.tsx` - Same pattern

**Shop Edit Forms**:

- [ ] `src/app/admin/shops/[id]/edit/page.tsx` - Use `Partial<Shop>` for form state
- [ ] `src/app/seller/shop/edit/page.tsx` - Same pattern

**Category Edit/Create Forms**:

- [ ] `src/app/admin/categories/[id]/edit/page.tsx` - Use `Partial<Category>` for form state
- [ ] `src/app/admin/categories/create/page.tsx` - Use `Partial<Category>` for form state

**User-Facing Create Forms** (also need backend format):

- [ ] `src/app/seller/products/create/page.tsx` - Use `Partial<Product>` for form state
- [ ] `src/app/seller/auctions/create/page.tsx` - Use `Partial<Auction>` for form state
- [ ] `src/app/seller/shop/create/page.tsx` - Use `Partial<Shop>` for form state

**Pattern**:

```typescript
// Two separate states
const [productUI, setProductUI] = useState<ProductUI | null>(null); // Display
const [formData, setFormData] = useState<Partial<Product>>({}); // Form fields

useEffect(() => {
  const { ui, raw } = await productsService.getForEdit(id);
  setProductUI(ui); // For shop.name, category.name display
  setFormData(raw); // For form inputs
}, []);

// Submit raw format directly
await productsService.update(id, formData);
```

### 10.3 Fix Inline Edit Components

- [ ] `src/components/common/InlineEditTable.tsx`
  - Accept both UI and backend types via generics
  - Use UI type for display, backend type for edit values
  - Map UI → backend when entering edit mode

**Pattern**:

```typescript
interface InlineEditTableProps<TUI, TBackend> {
  data: TUI[]; // Display with UI type
  onSave: (id: string, data: Partial<TBackend>) => Promise<void>; // Save backend format
  toBackend: (ui: TUI) => Partial<TBackend>; // Convert for editing
}
```

### 10.4 Move Bulk Action Routes to Resource Level

Bulk actions should be accessible to multiple user types:

- **Public users**: Add to cart, wishlist (products/auctions)
- **Sellers**: All admin bulk actions for their own resources
- **Admins**: All bulk actions

Current structure (admin-only):

- ❌ `src/app/api/admin/products/bulk/route.ts`
- ❌ `src/app/api/admin/auctions/bulk/route.ts`
- ❌ `src/app/api/admin/categories/bulk/route.ts`

New structure (resource-level with permission checks):

- [ ] Move to `src/app/api/products/bulk/route.ts`
  - Public: Add to cart (multiple products)
  - Sellers: Update own products, delete own products
  - Admins: All operations
- [ ] Move to `src/app/api/auctions/bulk/route.ts`
  - Public: Watch/unwatch multiple
  - Sellers: Update own auctions, cancel own auctions
  - Admins: All operations
- [ ] Move to `src/app/api/categories/bulk/route.ts`
  - Admins only: Bulk edit, delete, reorder
- [ ] Move to `src/app/api/shops/bulk/route.ts`
  - Sellers: Update own shop settings
  - Admins: Verify, ban, feature flags
- [ ] Move to `src/app/api/orders/bulk/route.ts`
  - Sellers: Update status, create shipments for own orders
  - Admins: All operations
- [ ] Move to `src/app/api/reviews/bulk/route.ts`
  - Admins: Approve, feature, delete

**Pattern**:

```typescript
// src/app/api/products/bulk/route.ts
export async function POST(req: Request) {
  const { action, ids, data } = await req.json();
  const { user } = await getAuthUser(req);

  // Permission checks based on action
  if (action === "addToCart") {
    // Public - no auth needed
  } else if (action === "update" || action === "delete") {
    // Sellers can only modify own products
    if (!user.isAdmin) {
      const products = await getProductsByIds(ids);
      const allOwnedByUser = products.every((p) => p.shopId === user.shopId);
      if (!allOwnedByUser) throw new Error("Unauthorized");
    }
  } else {
    // Admin-only actions
    if (!user.isAdmin) throw new Error("Admin only");
  }

  // Execute bulk action
}
```

### 10.5 Document Edit/Create Forms & Bulk Actions Patterns

- [x] Create `docs/project/04-EDIT-FORMS-PATTERN.md`
- [x] Create `docs/project/05-BULK-ACTIONS-PATTERN.md`
- [ ] Add examples to `docs/project/02-SERVICE-LAYER-GUIDE.md`
- [ ] Update `docs/ai/AI-AGENT-GUIDE.md` with edit form pattern
- [ ] Add inline edit examples
- [ ] Document bulk action permissions in resource docs

## Phase 11: Deprecation & Cleanup

### 11.1 Remove Old Type Files

- [x] Mark `src/types/index.ts` as deprecated with migration guide
- [x] Add @deprecated tags to major entity interfaces:
  - [x] User → UserUI
  - [x] Shop → ShopUI
  - [x] Product → ProductUI
  - [x] Category → CategoryUI
  - [x] Order → OrderUI
  - [x] Auction → AuctionUI
  - [x] CartItem → CartItemUI
  - [x] Review → ReviewUI
  - [x] Coupon → CouponUI
  - [x] BlogPost → BlogPostUI
  - [x] Return → ReturnUI
  - [x] SupportTicket → SupportTicketUI
- [ ] Gradually remove old type definitions as usage decreases

### 11.2 Update API Routes Constants

- [x] Resource-specific endpoint files created and in use
- [x] All services use new endpoint constants
- [x] Mark `src/constants/api-routes.ts` as deprecated with migration guide
- [x] Keep for backward compatibility initially

### 11.3 Code Cleanup

- [x] Remove unused imports from updated files
- [x] Remove duplicate type definitions
- [ ] Run final type-check pass
- [ ] Update all JSDoc comments to reference new schemas

---

## Phase 12: Testing & Validation

### 12.1 Type Safety Validation

- [x] Run `npm run type-check` - identifies remaining migration work
- [ ] Fix admin/seller edit form type errors (UI → backend mapping)
- [ ] Fix inline edit component type errors
- [ ] Fix test workflow type errors (service method signatures)
- [ ] Verify all components use correct UI schemas
- [ ] Verify all services use correct endpoints
- [ ] Verify all API routes use mappers
- [ ] Verify all edit forms use reverse mappers

### 12.2 Runtime Testing

**Edit Form Testing** (Critical - test UI → backend mapping):

- [ ] Test product create/edit with nested UI values
- [ ] Test auction create/edit with nested UI values
- [ ] Test shop create/edit with nested UI values
- [ ] Test category create/edit with nested UI values
- [ ] Test inline edits extract raw values correctly
- [ ] Verify backend receives correct format
- [ ] Verify validation works with backend schemas

**CRUD Operations**:

- [ ] Test all product CRUD operations
- [ ] Test all auction operations
- [ ] Test all category operations
- [ ] Test all shop operations
- [ ] Test all order operations
- [ ] Test cart & checkout flows
- [ ] Test admin operations
- [ ] Test seller operations
- [ ] Test user profile operations

### 12.3 Integration Testing

- [ ] Run all test workflows: `npm run test:workflows:all`
- [ ] Verify all tests pass
- [ ] Fix any broken tests
- [ ] Add new tests for mapper functions
- [ ] Add new tests for reverse mapper functions

---

## Phase 13: Documentation Updates

### 13.1 Update AI Agent Documentation

- [ ] Update `docs/ai/AI-AGENT-GUIDE.md` with schema system
- [ ] Update `docs/project/00-QUICK-START.md` with new patterns
- [ ] Update `docs/project/02-SERVICE-LAYER-GUIDE.md` with UI schema usage
- [ ] Create `docs/project/04-EDIT-FORMS-PATTERN.md` with UI ↔ backend mapping

### 13.2 Complete Resource Documentation

- [ ] Verify all resource docs in `docs/resources/` are complete
- [ ] Include examples for each resource
- [ ] Include schema definitions
- [ ] Include API endpoint examples
- [ ] Add reverse mapping examples for edit forms

### 13.3 Add Migration Guide

- [ ] Create `docs/project/SCHEMA-MIGRATION-GUIDE.md`
- [ ] Document how to migrate existing code
- [ ] Document common pitfalls
- [ ] Document best practices
- [ ] Document UI → backend mapping pattern
- [ ] Add inline edit migration examples

---

## Success Criteria

### ✅ Phase Complete When:

1. **All Resources Implemented**:

   - Backend schemas with Zod validation
   - UI schemas with proper types
   - Mappers for BE→UI transformation
   - Resource-specific endpoint constants
   - Resource-specific field constants
   - Complete TypeScript types
   - AI-agent documentation

2. **All Code Updated**:

   - All components use UI schemas
   - All pages use UI schemas
   - All services use endpoint constants and return UI schemas
   - All API routes use mappers
   - All hooks use UI schemas
   - All contexts use UI schemas

3. **Zero TypeScript Errors**:

   - `npm run type-check` passes
   - No `any` types except for external libraries
   - All imports resolved correctly

4. **All Tests Pass**:

   - `npm run test:workflows:all` succeeds
   - All integration tests pass
   - Manual testing complete

5. **Documentation Complete**:
   - All resource docs written
   - AI agent guides updated
   - Migration guide complete

---

## Progress Tracking

**Total Tasks**: 324
**Completed**: 289 (89%)
**In Progress**: 7 (Service `getForEdit` methods)
**Remaining**: 28

**Critical Priority**:

1. **Phase 10.1**: Add `getForEdit()` methods to services (returns both UI + raw)
2. **Phase 10.2**: Fix edit form pages to use dual state (UI for display, raw for form)
3. **Phase 10.3**: Fix inline edit component to handle both formats

**Key Pattern**:

- Services return `{ ui: ProductUI, raw: Product }` for editing
- Forms use `Partial<Product>` state for inputs
- Forms use `ProductUI` state for display fields (shop.name, category.name)
- Submit `raw` format directly - no transformation needed

**Estimated Time**: 1-2 days (service methods + edit form updates)

---

## Notes

- **No Re-exports**: Each file should import exactly what it needs
- **Explicit Imports**: Always use full paths, never index re-exports
- **Type Safety First**: No `any` types allowed
- **Mapper Consistency**: All API responses must use mappers
- **Documentation Required**: Every resource must have complete docs
- **Test Everything**: No changes without testing

### Critical Pattern: UI ↔ Backend Data Flow

**Frontend Components/Pages**:

- ✅ **ALWAYS use UI schemas** (`ProductUI`, `OrderUI`, etc.) for display
- ✅ **NEVER use backend schemas** (`Product`, `Order`) in UI components
- ✅ **Extract raw values from nested UI objects** when submitting to backend:
  - `productUI.price.raw` → `product.price` (number)
  - `productUI.stock.count` → `product.stockCount` (number)
  - `productUI.status.value` → `product.status` (string)
  - `productUI.category.id` → `product.categoryId` (string)

**Backend API Routes**:

- ✅ **Accept backend schemas** for validation (Zod schemas)
- ✅ **Return UI schemas** via mappers for responses
- ✅ **Mappers transform** backend → UI (never UI → backend)

**Services Layer**:

- ✅ **Return UI schemas** from all read operations
- ✅ **Accept backend format** for write operations (create/update)
- ✅ **Components map UI → backend** before calling service methods

---

## Next Steps (Immediate)

1. ✅ Complete foundation setup (directories, base files)
2. ✅ Implement Product resource
3. ✅ Implement Auction resource
4. ✅ Implement Category resource
5. ✅ Implement Shop resource
6. ✅ Implement Order resource
7. ✅ Implement Review resource
8. ✅ Implement User resource
9. ✅ Implement Coupon resource
10. ✅ Implement Address resource
11. ✅ Implement Support Ticket resource
12. ✅ Implement Hero Slide resource
13. ✅ Implement Return resource
14. ✅ Implement Payment resource
15. ✅ Implement Payout resource
16. ✅ Implement Blog Post resource
17. ✅ Update all API routes to use mappers
18. ✅ Complete all resource documentation
19. ✅ Complete Phase 7.2: API validation audit
20. ✅ Phase 4: Component type files created
21. ✅ Phase 4 & 8: Component/Hook migrations (most complete)
22. 🚧 Admin/seller pages need nested field access updates

---

**Last Updated**: November 13, 2025
**Maintainer**: Development Team  
**Status**: Phase 3 Complete ✅ | Phase 4-9 In Progress 🚧 | **Phase 10 Critical** 🔴 | 86% Complete

**🔴 CRITICAL**:

1. Edit/create forms need backend format for form state (via `getForEdit()` or direct `Partial<Product>`)
2. Bulk action routes need to move from `/api/admin/*/bulk` to `/api/*/bulk` with permission checks

```

```
