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

**Total Tasks**: 353 (updated - includes forms, bulk routes, categories, test workflows)
**Completed**: 298 (84% - includes all getForEdit service methods + API routes)
**In Progress**: 11 (edit/create form pages)
**Remaining**: 44

**Critical Work**:

1. Edit/create forms need backend format, not UI schemas for form state
2. Bulk action routes should be at resource level with permission checks
3. Category system needs multiple parents support + product count auto-update
4. Test workflows need comprehensive dummy data for all resources

**New Phase 10**: Service layer + forms + bulk routes + categories + tests (55 tasks)

- 7 `getForEdit()` methods in services
- 8 edit form pages to fix
- 3 create form pages to fix (seller-facing)
- 6 bulk action route moves
- 1 inline edit component
- 5 documentation updates (2 done)
- 6 category system enhancements (multiple parents, product count, seller creation)
- 19 test workflow updates (new standards, comprehensive dummy data)

**Estimated Time**: 3 days (service updates + form fixes + route restructuring + category system + test workflows)

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

### 10.1 ✅ COMPLETE - getForEdit Methods Added

All services now have `getForEdit()` methods that return both UI and raw backend data.

### 10.2 Fix Admin/Seller Edit & Create Forms

**RULE**: Edit forms need TWO separate states:

- `ProductUI` (or other UI type) - for DISPLAY ONLY (read-only shop name, category name, formatted prices)
- `Partial<Product>` (or other backend type) - for FORM INPUTS (editable fields that will be submitted)

**Fix These 11 Files**:

Edit Pages (8 files):

- [ ] `src/app/admin/products/[id]/edit/page.tsx`
- [ ] `src/app/seller/products/[slug]/edit/page.tsx`
- [ ] `src/app/admin/auctions/[id]/edit/page.tsx`
- [ ] `src/app/seller/auctions/[id]/edit/page.tsx`
- [ ] `src/app/admin/shops/[id]/edit/page.tsx`
- [ ] `src/app/seller/shop/edit/page.tsx`
- [ ] `src/app/admin/categories/[id]/edit/page.tsx`

Create Pages (3 files):

- [ ] `src/app/seller/products/create/page.tsx`
- [ ] `src/app/seller/auctions/create/page.tsx`
- [ ] `src/app/seller/shop/create/page.tsx`

Admin Category Create (1 file):

- [ ] `src/app/admin/categories/create/page.tsx`

**EXAMPLE - Edit Page Pattern**:

```typescript
"use client";
import { useState, useEffect } from "react";
import { Product } from "@/schemas/resources/product.schema";
import { ProductUI } from "@/schemas/ui/product.ui";
import { productsService } from "@/services/products.service";

export default function ProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  // TWO separate states
  const [productUI, setProductUI] = useState<ProductUI | null>(null); // For display
  const [formData, setFormData] = useState<Partial<Product>>({}); // For form inputs
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      // Call getForEdit() - returns BOTH formats
      const { ui, raw } = await productsService.getForEdit(params.id);
      setProductUI(ui); // UI format for display
      setFormData(raw); // Backend format for editing
      setLoading(false);
    }
    loadProduct();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit backend format directly - NO transformation needed
    await productsService.update(params.id, formData);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      {/* Display fields - use UI format (READ ONLY) */}
      <div className="mb-4">
        <label>Shop Name (read-only)</label>
        <p>{productUI?.shop.name}</p>
      </div>

      <div className="mb-4">
        <label>Category (read-only)</label>
        <p>{productUI?.category.name}</p>
      </div>

      {/* Form inputs - use backend format (EDITABLE) */}
      <div className="mb-4">
        <label>Title</label>
        <input
          type="text"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label>Price (number)</label>
        <input
          type="number"
          value={formData.price || 0}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />
      </div>

      <div className="mb-4">
        <label>Stock Count (number)</label>
        <input
          type="number"
          value={formData.stockCount || 0}
          onChange={(e) =>
            setFormData({ ...formData, stockCount: Number(e.target.value) })
          }
        />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
}
```

**EXAMPLE - Create Page Pattern**:

```typescript
"use client";
import { useState } from "react";
import { Product } from "@/schemas/resources/product.schema";
import { productsService } from "@/services/products.service";

export default function ProductCreatePage() {
  // Only ONE state for create - backend format
  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    price: 0,
    stockCount: 0,
    categoryId: "",
    shopId: "", // From auth context
    status: "draft",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit backend format directly
    await productsService.create(formData as Product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.title || ""}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      {/* ...other fields */}
      <button type="submit">Create Product</button>
    </form>
  );
}
```

**KEY POINTS FOR AI AGENTS**:

1. ✅ Edit pages: Call `getForEdit()` - returns `{ ui, raw }`
2. ✅ Edit pages: Use `ui` for display, `raw` for form state
3. ✅ Create pages: Use `Partial<Product>` directly - no UI needed
4. ✅ Submit: Send backend format - service handles API call
5. ❌ NEVER transform UI → backend in form submit
6. ❌ NEVER use `productUI.price.raw` or nested access in forms

### 10.3 Fix Inline Edit Components

- [ ] `src/components/common/InlineEditTable.tsx`

**RULE**: Component must accept BOTH UI and backend types via generics.

- Use UI type for display columns
- Use backend type for edit values
- Provide mapper function to convert UI → backend when entering edit mode

**EXAMPLE**:

```typescript
interface InlineEditTableProps<TUI, TBackend> {
  data: TUI[]; // Display with UI format
  columns: ColumnDef<TUI>[]; // Table displays UI
  onSave: (id: string, updates: Partial<TBackend>) => Promise<void>; // Save backend format
  toBackend: (ui: TUI) => Partial<TBackend>; // Convert UI → backend for editing
}

function InlineEditTable<TUI extends { id: string }, TBackend>({
  data,
  columns,
  onSave,
  toBackend,
}: InlineEditTableProps<TUI, TBackend>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TBackend>>({});

  const handleEdit = (row: TUI) => {
    setEditingId(row.id);
    setEditData(toBackend(row)); // Convert to backend format
  };

  const handleSave = async () => {
    if (!editingId) return;
    await onSave(editingId, editData); // Save backend format
    setEditingId(null);
  };

  // Render table with UI format for display
  // Render form with backend format for editing
}
```

**USAGE EXAMPLE**:

```typescript
<InlineEditTable<ProductUI, Product>
  data={productsUI}
  columns={productColumns}
  onSave={async (id, updates) => {
    await productsService.update(id, updates);
  }}
  toBackend={(ui) => ({
    title: ui.title,
    price: ui.price.raw, // Extract raw value
    stockCount: ui.stock.count, // Extract nested value
    categoryId: ui.category.id, // Extract ID
  })}
/>
```

### 10.4 Move Bulk Action Routes to Resource Level

**RULE**: Bulk actions must be at resource level with permission checks inside handler.

**Current (WRONG)**: `/api/admin/products/bulk` - admin only
**New (CORRECT)**: `/api/products/bulk` - permission checks inside

**Move These 6 Files**:

- [ ] Move `src/app/api/admin/products/bulk/route.ts` → `src/app/api/products/bulk/route.ts`
- [ ] Move `src/app/api/admin/auctions/bulk/route.ts` → `src/app/api/auctions/bulk/route.ts`
- [ ] Move `src/app/api/admin/categories/bulk/route.ts` → `src/app/api/categories/bulk/route.ts`
- [ ] Move `src/app/api/admin/shops/bulk/route.ts` → `src/app/api/shops/bulk/route.ts`
- [ ] Move `src/app/api/admin/orders/bulk/route.ts` → `src/app/api/orders/bulk/route.ts`
- [ ] Move `src/app/api/admin/reviews/bulk/route.ts` → `src/app/api/reviews/bulk/route.ts`

**PERMISSION LEVELS**:

1. **Public** (no auth): addToCart, addToWishlist
2. **Seller** (owns resource): update, delete, status changes for own resources only
3. **Admin** (full access): all operations on any resource

**EXAMPLE PATTERN**:

```typescript
// src/app/api/products/bulk/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-helpers";
import { Collections } from "@/lib/firebase/collections";

export async function POST(req: NextRequest) {
  const { action, ids, data } = await req.json();

  // PUBLIC ACTIONS - no auth required
  if (action === "addToCart") {
    // Anyone can add products to cart
    return handleAddToCart(ids);
  }

  // All other actions require authentication
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // SELLER ACTIONS - can only modify own products
  if (action === "update" || action === "delete") {
    // Verify seller owns all products
    if (!user.isAdmin) {
      const products = await Collections.products()
        .where("id", "in", ids)
        .get();
      const allOwned = products.docs.every(
        (doc) => doc.data().shopId === user.shopId
      );

      if (!allOwned) {
        return NextResponse.json(
          { error: "Can only modify your own products" },
          { status: 403 }
        );
      }
    }
    // Admin or verified seller - proceed with action
    return handleBulkUpdate(ids, data);
  }

  // ADMIN-ONLY ACTIONS
  if (!user.isAdmin) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  // Execute admin-only bulk operations
  switch (action) {
    case "feature":
      return handleBulkFeature(ids);
    case "ban":
      return handleBulkBan(ids);
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}
```

**KEY POINTS FOR AI AGENTS**:

1. ✅ Check action type first (public vs authenticated vs admin)
2. ✅ Public actions: No auth check needed
3. ✅ Seller actions: Verify ownership of all resources in `ids` array
4. ✅ Admin actions: Check `user.isAdmin === true`
5. ❌ NEVER skip permission checks
6. ❌ NEVER assume user owns resources without verification

- [ ] Move to `src/app/api/reviews/bulk/route.ts`
  - Admins: Approve, feature, delete

**Pattern**:

````typescript
// src/app/api/products/bulk/route.ts
export async function POST(req: Request) {
  const { action, ids, data } = await req.json();
**KEY POINTS FOR AI AGENTS**:
1. ✅ Check action type first (public vs authenticated vs admin)
2. ✅ Public actions: No auth check needed
3. ✅ Seller actions: Verify ownership of all resources in `ids` array
4. ✅ Admin actions: Check `user.isAdmin === true`
5. ❌ NEVER skip permission checks
6. ❌ NEVER assume user owns resources without verification

### 10.5 Document Edit/Create Forms & Bulk Actions Patterns

- [x] Create `docs/project/04-EDIT-FORMS-PATTERN.md`
- [x] Create `docs/project/05-BULK-ACTIONS-PATTERN.md`
- [ ] Add examples to `docs/project/02-SERVICE-LAYER-GUIDE.md`
- [ ] Update `docs/ai/AI-AGENT-GUIDE.md` with edit form pattern
- [ ] Add inline edit examples

### 10.6 Category System Enhancements

**RULE**: Categories need multiple parent support + auto product counts.

**6 Enhancements Needed**:

1. [ ] **Multiple Parents Support**:
   - Update `src/schemas/resources/category.schema.ts`:
     - Change `parentId?: string` to `parentIds: string[]`
   - Update `src/schemas/mappers/category.mapper.ts` to handle array
   - Update UI components to show all parent breadcrumbs

2. [ ] **Circular Reference Prevention**:
   - Add validation in category create/update API
   - Prevent category from being its own parent
   - Prevent infinite loops in parent chain

3. [ ] **Product Count Auto-Update**:
   - Add `productCount: number` to Category schema
   - Create Cloud Function triggered on product create/update/delete
   - Increment count when product added to category
   - Decrement count when product removed or deleted

4. [ ] **Seller Inline Category Creation**:
   - Create `src/components/seller/CategoryQuickCreate.tsx` modal
   - Minimal fields: name, description (optional)
   - Auto-set `createdBy: "seller"` and `needsReview: true`
   - Return new category ID to auto-select in product form

5. [ ] **Category Review System**:
   - Add `createdBy: "admin" | "seller"` field
   - Add `needsReview: boolean` field
   - Admin dashboard shows seller-created categories needing review
   - Admin can approve and assign to parent categories

6. [ ] **Update Category Tree UI**:
   - Handle multiple parent paths in breadcrumbs
   - Show product counts in category cards
   - Mark seller-created categories with badge

**EXAMPLE - Multiple Parents Schema**:

```typescript
// src/schemas/resources/category.schema.ts
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  parentIds: z.array(z.string()).default([]), // Multiple parents
  productCount: z.number().default(0), // Auto-updated
  createdBy: z.enum(["admin", "seller"]).default("admin"),
  needsReview: z.boolean().default(false),
  // ...other fields
});
````

**EXAMPLE - Seller Quick Create**:

```typescript
// src/components/seller/CategoryQuickCreate.tsx
export function CategoryQuickCreate({
  onCreated,
}: {
  onCreated: (categoryId: string) => void;
}) {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    const newCategory = await categoriesService.create({
      name,
      parentIds: [], // No parents - leaf category
      createdBy: "seller",
      needsReview: true,
    });
    onCreated(newCategory.id); // Pass ID back to product form
  };

  return (
    <Modal>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleCreate}>Create Category</button>
    </Modal>
  );
}
```

**EXAMPLE - Cloud Function for Product Count**:

```typescript
// functions/src/updateCategoryProductCount.ts
export const updateCategoryProductCount = functions.firestore
  .document("products/{productId}")
  .onWrite(async (change, context) => {
    const before = change.before.exists ? change.before.data() : null;
    const after = change.after.exists ? change.after.data() : null;

    // Product created
    if (!before && after) {
      await admin
        .firestore()
        .doc(`categories/${after.categoryId}`)
        .update({
          productCount: admin.firestore.FieldValue.increment(1),
        });
    }

    // Product deleted
    if (before && !after) {
      await admin
        .firestore()
        .doc(`categories/${before.categoryId}`)
        .update({
          productCount: admin.firestore.FieldValue.increment(-1),
        });
    }

    // Category changed
    if (before && after && before.categoryId !== after.categoryId) {
      await admin
        .firestore()
        .doc(`categories/${before.categoryId}`)
        .update({
          productCount: admin.firestore.FieldValue.increment(-1),
        });
      await admin
        .firestore()
        .doc(`categories/${after.categoryId}`)
        .update({
          productCount: admin.firestore.FieldValue.increment(1),
        });
    }
  });
```

---

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

### 12.3 Integration Testing & Test Workflows

**Test Workflow Modernization**:

- [ ] **Update to New Standards**:

  - All workflows use UI schemas (ProductUI, OrderUI, etc.)
  - All workflows use service layer (not direct API calls)
  - All workflows handle errors with proper types
  - Follow edit/create form patterns

- [ ] **Comprehensive Dummy Data Creation**:

  - Create dummy data for ALL resource types:
    - ✅ Users (buyer, seller, admin)
    - ✅ Shops (verified, unverified)
    - ✅ Categories (with hierarchy, multiple parents)
    - ✅ Products (various statuses, with variants)
    - ✅ Auctions (live, upcoming, ended)
    - ✅ Orders (all statuses, with items)
    - ✅ Reviews (verified purchase, ratings)
    - ✅ Coupons (active, expired, usage limits)
    - ✅ Addresses (shipping, billing)
    - ✅ Support tickets (various statuses)
    - ✅ Returns (requested, approved, rejected)
    - ✅ Payments (successful, failed, pending)
    - ✅ Blog posts (published, draft)
  - Dummy data must be **interactive** (realistic relationships)
  - Export dummy IDs for use in workflows

- [ ] **Automatic ID Management**:

  - Create centralized dummy data registry:
    ```typescript
    // tests/fixtures/dummy-data.ts
    export const DUMMY_IDS = {
      users: {
        admin: "test-admin-001",
        seller: "test-seller-001",
        buyer: "test-buyer-001",
      },
      shops: {
        verified: "test-shop-001",
        unverified: "test-shop-002",
      },
      products: {
        electronics: "test-product-001",
        clothing: "test-product-002",
      },
      categories: {
        root: "test-cat-root",
        electronics: "test-cat-electronics",
        smartphones: "test-cat-smartphones",
      },
      // ...all resources
    };
    ```
  - Workflows import and use these IDs
  - No hardcoded IDs in workflow files

- [ ] **Category Product Count Tests**:

  - Test auto-increment when product added
  - Test auto-decrement when product removed
  - Test update when product category changes
  - Test counts remain accurate across operations

- [ ] **Multi-Parent Category Tests**:
  - Test category with multiple parents
  - Test breadcrumb generation for all paths
  - Test circular reference prevention
  - Test category tree building with multiple parents

**Updated Test Commands**:

- [ ] `npm run test:workflows:all` - Run all workflows with new standards
- [ ] `npm run test:workflows:setup` - Create all dummy data
- [ ] `npm run test:workflows:cleanup` - Remove all dummy data
- [ ] Verify all workflows pass
- [ ] Fix any broken tests
- [ ] Add new tests for mapper functions

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

**Total Tasks**: 353
**Completed**: 298 (84%)
**In Progress**: 11 (edit/create form pages)
**Remaining**: 44

---

## Next Priority: Phase 10.2 - Fix Edit/Create Forms

**Start Here**: `src/app/seller/products/[slug]/edit/page.tsx`

**What to Do**:

1. Add two states: `ProductUI` for display + `Partial<Product>` for form
2. Call `productsService.getForEdit(slug)` to get both formats
3. Use `ui` for read-only fields (shop name, category name)
4. Use `raw` for form inputs (title, price, stockCount)
5. On submit: send `formData` directly to `productsService.update()`

**Then Fix These 10 More Files**:

- Admin/Seller edit pages (7 files)
- Seller create pages (3 files)
- Admin category create (1 file)

**See Phase 10.2 above for complete list + examples**

---

## Critical Patterns for AI Agents

### ✅ Edit Forms Pattern

```typescript
// TWO states
const [productUI, setProductUI] = useState<ProductUI | null>(null); // Display only
const [formData, setFormData] = useState<Partial<Product>>({}); // Form inputs

// Load with getForEdit()
const { ui, raw } = await productsService.getForEdit(id);
setProductUI(ui);
setFormData(raw);

// Submit raw format
await productsService.update(id, formData);
```

### ✅ Bulk Actions Pattern

```typescript
// Route at resource level: /api/products/bulk
// Check permissions inside handler:
if (action === "addToCart") {
  // Public - no auth
} else if (action === "update") {
  // Verify ownership for sellers
  if (!user.isAdmin && !ownsAllResources) {
    return 403;
  }
} else {
  // Admin only
  if (!user.isAdmin) return 403;
}
```

### ✅ Category System

```typescript
// Multiple parents
parentIds: string[] // Array, not single ID

// Auto product count
productCount: number // Updated by Cloud Function

// Seller creation
createdBy: "admin" | "seller"
needsReview: boolean
```

---

## Key Rules

1. **Edit Forms**: Use `getForEdit()` → Returns `{ ui, raw }` → Two separate states
2. **Create Forms**: Use `Partial<Product>` directly → One state → No UI needed
3. **Bulk Routes**: Move from `/api/admin/*/bulk` to `/api/*/bulk` → Add permission checks
4. **Categories**: Support `parentIds: string[]` → Auto-update `productCount` → Allow seller creation
5. **Services**: Call API endpoints → Never access Firebase directly
6. **API Routes**: Use mappers → Return UI format → Accept backend format

---

## Completed Work

✅ **Phase 1-3**: All 11 resources implemented (schemas, mappers, endpoints, docs)
✅ **Phase 4-9**: Most components, pages, hooks, contexts updated to UI schemas
✅ **Phase 10.1**: All 7 services have `getForEdit()` methods + API routes

---

## Remaining Work (44 tasks)

🚧 **Phase 10.2**: 11 edit/create form pages
🚧 **Phase 10.3**: 1 inline edit component
🚧 **Phase 10.4**: 6 bulk action routes to move
🚧 **Phase 10.5**: 3 documentation files
🚧 **Phase 10.6**: 6 category enhancements
🚧 **Phase 12.1**: Fix type errors in admin/seller pages
🚧 **Phase 12.3**: 19 test workflow updates
🚧 **Phase 13**: Final documentation updates

**Estimated Time**: 3 days

---

## Notes

**Architecture**:

- Services → API Endpoints → Firebase (never Services → Firebase directly)
- UI Schemas for display, Backend Schemas for form state
- Mappers transform Backend → UI (one direction only)

**Type Safety**:

- No `any` types allowed
- Explicit imports (no re-exports)
- All API responses use mappers

**Documentation**:

- Every resource has complete docs in `docs/resources/`
- All patterns have clear examples
- AI agents can understand from examples alone

---

## Next Steps (Immediate)

**Priority 1**: Fix `src/app/seller/products/[slug]/edit/page.tsx` (see Phase 10.2 for pattern)
**Priority 2**: Fix remaining 10 edit/create form pages
**Priority 3**: Move 6 bulk action routes to resource level (see Phase 10.4 for pattern)
**Priority 4**: Implement category enhancements (see Phase 10.6 for examples)

---

**Last Updated**: November 13, 2025
**Maintainer**: Development Team
**Status**: 84% Complete | Phase 10.2 Next Priority

```

```
