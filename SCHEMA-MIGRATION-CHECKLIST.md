# Schema System Migration Checklist

**Project**: JustForView.in  
**Started**: November 12, 2025  
**Status**: In Progress 🚧

---

## Overview

Migration to a comprehensive resource schema system to eliminate data inconsistencies between UI and backend by introducing:

1. **Resource Schemas** - Database entity definitions
2. **UI Schemas** - Frontend display models
3. **Mappers** - Backend-to-UI data transformation
4. **Constants** - Resource-specific endpoints and fields
5. **Centralized Types** - All TypeScript types in one location
6. **Resource Documentation** - AI-agent readable feature guides

---

## Directory Structure

```
src/
├── schemas/
│   ├── resources/          # Ba**Total Tasks**: ~200+
**Completed**: 58 (29%)**Total Tasks**: ~200+
**Completed**: 103 (52%)
**In Progress**: 0
**Remaining**: ~97n Progress**: 0
**Remaining**: ~142d database schemas
│   │   ├── product.schema.ts
│   │   ├── auction.schema.ts
│   │   ├── category.schema.ts
│   │   ├── shop.schema.ts
│   │   ├── order.schema.ts
│   │   ├── user.schema.ts
│   │   ├── review.schema.ts
│   │   ├── coupon.schema.ts
│   │   ├── support.schema.ts
│   │   ├── return.schema.ts
│   │   └── ... (all resources)
│   │
│   ├── ui/                 # Frontend UI schemas
│   │   ├── product.ui.ts
│   │   ├── auction.ui.ts
│   │   ├── category.ui.ts
│   │   ├── shop.ui.ts
│   │   ├── order.ui.ts
│   │   ├── user.ui.ts
│   │   ├── review.ui.ts
│   │   ├── coupon.ui.ts
│   │   ├── support.ui.ts
│   │   ├── return.ui.ts
│   │   └── ... (all resources)
│   │
│   └── mappers/            # Backend to UI transformation
│       ├── product.mapper.ts
│       ├── auction.mapper.ts
│       ├── category.mapper.ts
│       ├── shop.mapper.ts
│       ├── order.mapper.ts
│       ├── user.mapper.ts
│       ├── review.mapper.ts
│       ├── coupon.mapper.ts
│       ├── support.mapper.ts
│       ├── return.mapper.ts
│       └── ... (all resources)
│
├── constants/
│   ├── endpoints/          # Resource-specific API endpoints
│   │   ├── product.endpoints.ts
│   │   ├── auction.endpoints.ts
│   │   ├── category.endpoints.ts
│   │   ├── shop.endpoints.ts
│   │   ├── order.endpoints.ts
│   │   └── ... (all resources)
│   │
│   └── fields/             # Resource-specific field definitions
│       ├── product.fields.ts
│       ├── auction.fields.ts
│       ├── category.fields.ts
│       ├── shop.fields.ts
│       ├── order.fields.ts
│       └── ... (all resources)
│
└── types/                  # Centralized TypeScript types
    ├── entities/           # Database entity types
    │   ├── product.types.ts
    │   ├── auction.types.ts
    │   └── ...
    │
    ├── ui/                 # UI component types
    │   ├── product.ui.types.ts
    │   ├── auction.ui.types.ts
    │   └── ...
    │
    ├── api/                # API request/response types
    │   ├── product.api.types.ts
    │   ├── auction.api.types.ts
    │   └── ...
    │
    ├── components/         # Component prop types
    │   ├── cards.types.ts
    │   ├── forms.types.ts
    │   ├── modals.types.ts
    │   └── ...
    │
    └── shared/             # Shared/common types
        ├── pagination.types.ts
        ├── filters.types.ts
        ├── responses.types.ts
        └── ...

docs/
└── resources/              # AI-agent documentation
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

- [ ] Update `src/app/api/products/route.ts` to use mapper
- [ ] Update `src/services/products.service.ts` to use UI schema

**Documentation**:

- [ ] `docs/resources/product.md`

#### 2.2 Auction Resource ✅

**Backend**:

- [x] `src/schemas/resources/auction.schema.ts`
- [x] `src/constants/endpoints/auction.endpoints.ts`
- [x] `src/constants/fields/auction.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/auction.ui.ts`
- [x] `src/schemas/mappers/auction.mapper.ts`

**API Integration**:

- [ ] Update `src/app/api/auctions/route.ts`
- [ ] Update `src/services/auctions.service.ts`

**Documentation**:

- [ ] `docs/resources/auction.md`

#### 2.3 Category Resource ✅

**Backend**:

- [x] `src/schemas/resources/category.schema.ts`
- [x] `src/constants/endpoints/category.endpoints.ts`
- [x] `src/constants/fields/category.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/category.ui.ts`
- [x] `src/schemas/mappers/category.mapper.ts`

**API Integration**:

- [ ] Update `src/app/api/categories/route.ts`
- [ ] Update `src/services/categories.service.ts`

**Documentation**:

- [ ] `docs/resources/category.md`

#### 2.4 Shop Resource ✅

**Backend**:

- [x] `src/schemas/resources/shop.schema.ts`
- [x] `src/constants/endpoints/shop.endpoints.ts`
- [x] `src/constants/fields/shop.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/shop.ui.ts`
- [x] `src/schemas/mappers/shop.mapper.ts`

**API Integration**:

- [ ] Update `src/app/api/shops/route.ts`
- [ ] Update `src/services/shops.service.ts`

**Documentation**:

- [ ] `docs/resources/shop.md`

#### 2.5 Order Resource ✅

**Backend**:

- [x] `src/schemas/resources/order.schema.ts`
- [x] `src/constants/endpoints/order.endpoints.ts`
- [x] `src/constants/fields/order.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/order.ui.ts`
- [x] `src/schemas/mappers/order.mapper.ts`

**API Integration**:

- [ ] Update `src/app/api/orders/route.ts`
- [ ] Update `src/services/orders.service.ts`

**Documentation**:

- [ ] `docs/resources/order.md`

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

- [ ] Update `src/app/api/user/route.ts`
- [ ] Update `src/services/users.service.ts`

**Documentation**:

- [ ] `docs/resources/user.md`

#### 3.2 Address Resource ✅

**Backend**:

- [x] `src/schemas/resources/address.schema.ts`
- [x] `src/constants/endpoints/address.endpoints.ts`
- [x] `src/constants/fields/address.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/address.ui.ts`
- [x] `src/schemas/mappers/address.mapper.ts`

**API Integration**:

- [ ] Update `src/app/api/user/addresses/route.ts`
- [ ] Update `src/services/addresses.service.ts`

**Documentation**:

- [ ] `docs/resources/address.md`

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

- [ ] Update `src/app/api/reviews/route.ts`
- [ ] Update `src/services/reviews.service.ts`

**Documentation**:

- [ ] `docs/resources/review.md`

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

- [ ] Update `src/app/api/coupons/route.ts`
- [ ] Update `src/services/coupons.service.ts`

**Documentation**:

- [ ] `docs/resources/coupon.md`

#### 3.5 Hero Slide Resource ✅

**Backend**:

- [x] `src/schemas/resources/hero-slide.schema.ts`
- [x] `src/constants/endpoints/hero-slide.endpoints.ts`
- [x] `src/constants/fields/hero-slide.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/hero-slide.ui.ts`
- [x] `src/schemas/mappers/hero-slide.mapper.ts`

**API Integration**:

- [ ] Update `src/app/api/hero-slides/route.ts`
- [ ] Update `src/services/hero-slides.service.ts`

**Documentation**:

- [ ] `docs/resources/hero-slide.md`

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

- [ ] Update `src/app/api/support/route.ts`
- [ ] Update `src/services/support.service.ts`

**Documentation**:

- [ ] `docs/resources/support.md`

#### 3.7 Return Resource ✅

**Backend**:

- [x] `src/schemas/resources/return.schema.ts`
- [x] `src/constants/endpoints/return.endpoints.ts`
- [x] `src/constants/fields/return.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/return.ui.ts`
- [x] `src/schemas/mappers/return.mapper.ts`

**API Integration**:

- [ ] Update `src/app/api/returns/route.ts`
- [ ] Update `src/services/returns.service.ts`

**Documentation**:

- [ ] `docs/resources/return.md`

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

- [ ] Update `src/app/api/payments/route.ts`
- [ ] Update `src/services/payments.service.ts`

**Documentation**:

- [ ] `docs/resources/payment.md`

#### 3.9 Payout Resource ✅

**Backend**:

- [x] `src/schemas/resources/payout.schema.ts`
- [x] `src/constants/endpoints/payout.endpoints.ts`
- [x] `src/constants/fields/payout.fields.ts`

**Frontend**:

- [x] `src/schemas/ui/payout.ui.ts`
- [x] `src/schemas/mappers/payout.mapper.ts`

**API Integration**:

- [ ] Update `src/app/api/seller/payouts/route.ts`
- [ ] Update `src/services/payouts.service.ts`

**Documentation**:

- [ ] `docs/resources/payout.md`

### Content Resources

#### 3.10 Blog Post Resource

- [ ] Backend schema, types, constants
- [ ] Frontend UI schema, types, mapper
- [ ] API integration
- [ ] Documentation

---

## Phase 4: Component Migration

### 4.1 Update Components to Use UI Schemas

**Product Components**:

- [ ] `src/components/product/ProductCard.tsx`
- [ ] `src/components/product/ProductGrid.tsx`
- [ ] `src/components/product/ProductDetails.tsx`
- [ ] `src/components/product/ProductForm.tsx`
- [ ] All other product components

**Auction Components**:

- [ ] `src/components/auction/AuctionCard.tsx`
- [ ] `src/components/auction/AuctionGrid.tsx`
- [ ] `src/components/auction/AuctionDetails.tsx`
- [ ] `src/components/auction/BidForm.tsx`
- [ ] All other auction components

**Category Components**:

- [ ] `src/components/category/CategoryCard.tsx`
- [ ] `src/components/category/CategoryTree.tsx`
- [ ] `src/components/category/CategoryForm.tsx`
- [ ] All other category components

**Shop Components**:

- [ ] `src/components/shop/ShopCard.tsx`
- [ ] `src/components/shop/ShopProfile.tsx`
- [ ] `src/components/shop/ShopForm.tsx`
- [ ] All other shop components

**Order Components**:

- [ ] `src/components/order/OrderCard.tsx`
- [ ] `src/components/order/OrderList.tsx`
- [ ] `src/components/order/OrderDetails.tsx`
- [ ] All other order components

**Cart & Checkout Components**:

- [ ] `src/components/cart/CartItem.tsx`
- [ ] `src/components/cart/CartSummary.tsx`
- [ ] `src/components/checkout/CheckoutForm.tsx`
- [ ] All other cart/checkout components

### 4.2 Create Component Type Files

- [ ] `src/types/components/cards.types.ts` - Card component props
- [ ] `src/types/components/forms.types.ts` - Form component props
- [ ] `src/types/components/modals.types.ts` - Modal component props
- [ ] `src/types/components/tables.types.ts` - Table component props
- [ ] `src/types/components/layouts.types.ts` - Layout component props

---

## Phase 5: Page Migration

### 5.1 Update Pages to Use UI Schemas

**Product Pages**:

- [ ] `src/app/products/page.tsx`
- [ ] `src/app/products/[slug]/page.tsx`
- [ ] `src/app/seller/products/page.tsx`
- [ ] `src/app/seller/products/[id]/page.tsx`
- [ ] `src/app/admin/products/page.tsx`

**Auction Pages**:

- [ ] `src/app/auctions/page.tsx`
- [ ] `src/app/auctions/[slug]/page.tsx`
- [ ] `src/app/seller/auctions/page.tsx`
- [ ] `src/app/admin/auctions/page.tsx`

**Category Pages**:

- [ ] `src/app/categories/page.tsx`
- [ ] `src/app/categories/[slug]/page.tsx`
- [ ] `src/app/admin/categories/page.tsx`

**Shop Pages**:

- [ ] `src/app/shops/page.tsx`
- [ ] `src/app/shops/[slug]/page.tsx`
- [ ] `src/app/seller/shop/page.tsx`
- [ ] `src/app/admin/shops/page.tsx`

**Order Pages**:

- [ ] `src/app/user/orders/page.tsx`
- [ ] `src/app/user/orders/[id]/page.tsx`
- [ ] `src/app/seller/orders/page.tsx`
- [ ] `src/app/admin/orders/page.tsx`

**Checkout Pages**:

- [ ] `src/app/cart/page.tsx`
- [ ] `src/app/checkout/page.tsx`

---

## Phase 6: Service Layer Updates

### 6.1 Update Services to Use Endpoints Constants

- [ ] `src/services/products.service.ts` → use `product.endpoints.ts`
- [ ] `src/services/auctions.service.ts` → use `auction.endpoints.ts`
- [ ] `src/services/categories.service.ts` → use `category.endpoints.ts`
- [ ] `src/services/shops.service.ts` → use `shop.endpoints.ts`
- [ ] `src/services/orders.service.ts` → use `order.endpoints.ts`
- [ ] `src/services/cart.service.ts` → use cart endpoints
- [ ] `src/services/users.service.ts` → use user endpoints
- [ ] `src/services/reviews.service.ts` → use review endpoints
- [ ] `src/services/coupons.service.ts` → use coupon endpoints
- [ ] `src/services/support.service.ts` → use support endpoints
- [ ] `src/services/returns.service.ts` → use return endpoints

### 6.2 Update Services to Return UI Schemas

- [ ] All services should return UI schema types, not raw backend types
- [ ] Services should handle mapper transformation internally
- [ ] Update all service method signatures

---

## Phase 7: API Route Updates

### 7.1 Update API Routes to Use Mappers

**Product APIs**:

- [ ] `src/app/api/products/route.ts`
- [ ] `src/app/api/products/[id]/route.ts`
- [ ] `src/app/api/admin/products/route.ts`
- [ ] `src/app/api/seller/products/route.ts`

**Auction APIs**:

- [ ] `src/app/api/auctions/route.ts`
- [ ] `src/app/api/auctions/[id]/route.ts`
- [ ] `src/app/api/admin/auctions/route.ts`
- [ ] `src/app/api/seller/auctions/route.ts`

**Category APIs**:

- [ ] `src/app/api/categories/route.ts`
- [ ] `src/app/api/categories/[id]/route.ts`
- [ ] `src/app/api/admin/categories/route.ts`

**Shop APIs**:

- [ ] `src/app/api/shops/route.ts`
- [ ] `src/app/api/shops/[id]/route.ts`
- [ ] `src/app/api/admin/shops/route.ts`
- [ ] `src/app/api/seller/shop/route.ts`

**Order APIs**:

- [ ] `src/app/api/orders/route.ts`
- [ ] `src/app/api/orders/[id]/route.ts`
- [ ] `src/app/api/admin/orders/route.ts`
- [ ] `src/app/api/seller/orders/route.ts`

### 7.2 Update API Routes to Use Resource Schemas for Validation

- [ ] All POST/PATCH/PUT endpoints validate input with resource schemas
- [ ] All responses use mappers to transform to UI schemas

---

## Phase 8: Hook Updates

### 8.1 Update Custom Hooks to Use UI Schemas

- [ ] `src/hooks/useProduct.ts`
- [ ] `src/hooks/useProducts.ts`
- [ ] `src/hooks/useAuction.ts`
- [ ] `src/hooks/useAuctions.ts`
- [ ] `src/hooks/useCategories.ts`
- [ ] `src/hooks/useCart.ts`
- [ ] `src/hooks/useOrders.ts`
- [ ] All other custom hooks

---

## Phase 9: Context Updates

### 9.1 Update Contexts to Use UI Schemas

- [ ] `src/contexts/AuthContext.tsx` → use User UI schema
- [ ] `src/contexts/UploadContext.tsx` → use Media UI schema
- [ ] Any other contexts

---

## Phase 10: Deprecation & Cleanup

### 10.1 Remove Old Type Files

- [ ] Mark `src/types/index.ts` as deprecated
- [ ] Create migration notice in old type files
- [ ] Gradually remove old type definitions as they're replaced

### 10.2 Update API Routes Constants

- [ ] Review `src/constants/api-routes.ts`
- [ ] Mark deprecated in favor of resource-specific endpoint files
- [ ] Keep for backward compatibility initially

### 10.3 Code Cleanup

- [ ] Remove unused imports
- [ ] Remove duplicate type definitions
- [ ] Fix all TypeScript errors
- [ ] Update all JSDoc comments

---

## Phase 11: Testing & Validation

### 11.1 Type Safety Validation

- [ ] Run `npm run type-check` - should pass with 0 errors
- [ ] Verify all components use correct UI schemas
- [ ] Verify all services use correct endpoints
- [ ] Verify all API routes use mappers

### 11.2 Runtime Testing

- [ ] Test all product CRUD operations
- [ ] Test all auction operations
- [ ] Test all category operations
- [ ] Test all shop operations
- [ ] Test all order operations
- [ ] Test cart & checkout flows
- [ ] Test admin operations
- [ ] Test seller operations
- [ ] Test user profile operations

### 11.3 Integration Testing

- [ ] Run all test workflows: `npm run test:workflows:all`
- [ ] Verify all tests pass
- [ ] Fix any broken tests
- [ ] Add new tests for mapper functions

---

## Phase 12: Documentation Updates

### 12.1 Update AI Agent Documentation

- [ ] Update `docs/ai/AI-AGENT-GUIDE.md` with schema system
- [ ] Update `docs/project/00-QUICK-START.md` with new patterns
- [ ] Update `docs/project/02-SERVICE-LAYER-GUIDE.md` with UI schema usage

### 12.2 Complete Resource Documentation

- [ ] Verify all resource docs in `docs/resources/` are complete
- [ ] Include examples for each resource
- [ ] Include schema definitions
- [ ] Include API endpoint examples

### 12.3 Add Migration Guide

- [ ] Create `docs/project/SCHEMA-MIGRATION-GUIDE.md`
- [ ] Document how to migrate existing code
- [ ] Document common pitfalls
- [ ] Document best practices

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

**Total Tasks**: ~200+  
**Completed**: 103 (52%)  
**In Progress**: 0  
**Remaining**: ~97

**Estimated Time**: 2-3 weeks (working incrementally)

---

## Notes

- **No Re-exports**: Each file should import exactly what it needs
- **Explicit Imports**: Always use full paths, never index re-exports
- **Type Safety First**: No `any` types allowed
- **Mapper Consistency**: All API responses must use mappers
- **Documentation Required**: Every resource must have complete docs
- **Test Everything**: No changes without testing

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
16. 🚧 Implement Blog Post resource
17. 🚧 Create services for new resources (address, support, return, payment, payout)
18. 🚧 Update API routes to use mappers

---

**Last Updated**: November 12, 2025  
**Maintainer**: Development Team  
**Status**: Phase 2 Complete ✅ | Phase 3 In Progress 🚧 | 8 Resources Complete
