# Schema System Migration Checklist

**Project**: JustForView.in  
**Started**: November 12, 2025  
**Current Status**: 91% Complete (33 tasks remaining)

---

## Overview

Migration to a comprehensive resource schema system with:

1. **Resource Schemas** - Backend entity definitions (Zod validation)
2. **UI Schemas** - Frontend display models
3. **Mappers** - Backend-to-UI transformation
4. **Constants** - Resource-specific endpoints and fields
5. **Services** - Call API endpoints (never Firebase directly)

---

## Architecture

```
src/
├── schemas/
│   ├── resources/        # Backend Firestore schemas (Product, Auction, etc.)
│   ├── ui/              # Frontend UI schemas (ProductUI, AuctionUI, etc.)
│   └── mappers/         # Backend → UI transformation
├── constants/
│   ├── endpoints/       # Resource-specific API endpoints
│   └── fields/          # Resource-specific field definitions
├── services/            # Call API endpoints (NOT Firebase)
├── app/api/            # API routes (access Firebase here)
└── types/              # Centralized TypeScript types

docs/resources/          # AI-agent readable documentation
```

---

## ✅ Completed Work (Phases 1-9)

### Phase 1-3: All 11 Resources Implemented

**Resources**: Product, Auction, Category, Shop, Order, User, Address, Review, Coupon, Hero Slide, Support, Return, Payment, Payout, Blog Post

Each resource has:

- ✅ Backend schema with Zod validation
- ✅ UI schema for display
- ✅ Mapper (Backend → UI)
- ✅ Endpoint constants
- ✅ Field constants
- ✅ Documentation in `docs/resources/`

**Example - Product Resource Architecture**:

```typescript
// 1. Backend Schema (src/schemas/resources/product.schema.ts)
export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  stockCount: z.number(),
  categoryId: z.string(),
  shopId: z.string(),
  // ...other fields
});
export type Product = z.infer<typeof productSchema>;

// 2. UI Schema (src/schemas/ui/product.ui.ts)
export interface ProductUI {
  id: string;
  title: string;
  price: {
    raw: number;
    formatted: string;
    currency: string;
  };
  stock: {
    count: number;
    status: "in-stock" | "low-stock" | "out-of-stock";
    label: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  shop: {
    id: string;
    name: string;
    slug: string;
  };
  // ...other formatted fields
}

// 3. Mapper (src/schemas/mappers/product.mapper.ts)
export function mapProductToUI(product: Product): ProductUI {
  return {
    id: product.id,
    title: product.title,
    price: {
      raw: product.price,
      formatted: `₹${product.price.toLocaleString()}`,
      currency: "INR",
    },
    stock: {
      count: product.stockCount,
      status:
        product.stockCount > 10
          ? "in-stock"
          : product.stockCount > 0
          ? "low-stock"
          : "out-of-stock",
      label:
        product.stockCount > 0
          ? `${product.stockCount} available`
          : "Out of stock",
    },
    // ...map other fields
  };
}

// 4. Service (src/services/products.service.ts)
class ProductsService {
  async getAll(): Promise<PaginatedResponse<ProductUI>> {
    // Call API endpoint (NOT Firebase)
    return apiService.get(PRODUCT_ENDPOINTS.LIST);
  }

  async getForEdit(id: string): Promise<{ ui: ProductUI; raw: Product }> {
    // Returns BOTH formats for editing
    return apiService.get(PRODUCT_ENDPOINTS.FOR_EDIT(id));
  }

  async update(id: string, data: Partial<Product>): Promise<void> {
    // Accepts backend format
    return apiService.patch(PRODUCT_ENDPOINTS.DETAIL(id), data);
  }
}

// 5. API Route (src/app/api/products/[id]/edit/route.ts)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Access Firebase here
  const doc = await Collections.products().doc(params.id).get();
  const raw: Product = { id: doc.id, ...doc.data() };

  // Use mapper to create UI format
  const ui = mapProductToUI(raw);

  // Return both formats
  return NextResponse.json({ success: true, ui, raw });
}
```

### Phase 4-9: Component, Page, Hook, Context Updates

**Completed**:

- ✅ All card components use UI schemas (ProductCard, AuctionCard, etc.)
- ✅ All display components use UI schemas
- ✅ All services return UI schemas from read operations
- ✅ All API routes use mappers for responses
- ✅ All hooks updated (useCart, useAuctionSocket, etc.)
- ✅ Most pages updated to use UI schemas

**Example - Component Pattern**:

```typescript
// ✅ CORRECT - Uses UI schema for display
import { ProductUI } from "@/schemas/ui/product.ui";

export function ProductCard({ product }: { product: ProductUI }) {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.price.formatted}</p>
      <span>{product.stock.label}</span>
      <p>Sold by: {product.shop.name}</p>
      <p>Category: {product.category.name}</p>
    </div>
  );
}
```

### Phase 10.1: getForEdit Methods (COMPLETE)

All 7 services now have `getForEdit()` methods that return both UI and backend formats.

**Pattern**:

```typescript
// Service calls API endpoint
async getForEdit(id: string): Promise<{ ui: ProductUI; raw: Product }> {
  return apiService.get(PRODUCT_ENDPOINTS.FOR_EDIT(id));
}

// API route returns both formats
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const doc = await Collections.products().doc(params.id).get();
  const raw: Product = { id: doc.id, ...doc.data() };
  const ui = mapProductToUI(raw);
  return NextResponse.json({ success: true, ui, raw });
}
```

---

## 🚧 Active Work (Phases 10-13)

### Phase 10.2: Fix Edit/Create Forms

**RULE**: Edit forms need TWO separate states:

- `ProductUI` (UI type) - for DISPLAY ONLY (shop name, category name)
- `Partial<Product>` (backend type) - for FORM INPUTS (editable fields)

**Completed**:

- ✅ `src/app/seller/products/[slug]/edit/page.tsx` - Uses getForEdit() with TWO states
- ✅ `src/app/seller/products/create/page.tsx` - Uses backend schema
- ✅ `src/app/seller/auctions/create/page.tsx` - Uses backend schema
- ✅ `src/app/api/products/[id]/edit/route.ts` - Returns both ui and raw
- ✅ `src/app/api/auctions/[id]/edit/route.ts` - Returns both ui and raw
- ✅ `src/app/api/categories/[id]/edit/route.ts` - Returns both ui and raw

**Remaining Files** (3 files - all need to be created if missing):

Edit Pages (only if admin/seller dashboards need them):

- ✅ `src/app/admin/products/[id]/edit/page.tsx` (exists, verified)
- ✅ `src/app/seller/auctions/[id]/edit/page.tsx` (exists, verified)
- ✅ `src/app/admin/categories/[slug]/edit/page.tsx` (exists, verified)

---

**WORKING EXAMPLE - Product Edit Page (REFERENCE)**:

This is a complete, working example from the actual codebase. Use as reference:

```typescript
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { productsService } from "@/services/products.service";
import type { ProductUI } from "@/schemas/ui/product.ui";
import type { Product } from "@/schemas/resources/product.schema";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  // TWO separate states - UI for display, backend for editing
  const [productUI, setProductUI] = useState<ProductUI | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const productBySlug = await productsService.getBySlug(slug);
      const { ui, raw } = await productsService.getForEdit(productBySlug.id);

      setProductUI(ui); // UI format for display
      setFormData(raw); // Backend format for form inputs
    } catch (error) {
      console.error("Failed to load product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.id) return;

    try {
      setSaving(true);
      await productsService.update(formData.id, formData);
      router.push("/seller/products");
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      {/* Display fields - use UI format (READ ONLY) */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p>
          <strong>Shop:</strong> {productUI?.shop?.name}
        </p>
        <p>
          <strong>Category:</strong> {productUI?.category?.name}
        </p>
        <p>
          <strong>Stock Status:</strong> {productUI?.stock?.label}
        </p>
      </div>

      {/* Form inputs - use backend format (EDITABLE) */}
      <div className="mb-4">
        <label>Product Name</label>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full"
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
          className="border p-2 w-full"
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
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-blue-500 text-white px-4 py-2"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
```

**Key Points**:

1. ✅ TWO states: `productUI` (UI) and `formData` (backend)
2. ✅ Call `getForEdit()` which returns `{ ui, raw }`
3. ✅ UI format shows formatted data (shop.name, category.name)
4. ✅ Backend format directly in inputs (price, stockCount)
5. ✅ No transformation on submit - send `formData` as-is

---

**EXAMPLE 2 - Create Page Pattern**:

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
      <div className="mb-4">
        <label>Title</label>
        <input
          type="text"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label>Price</label>
        <input
          type="number"
          value={formData.price || 0}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          className="border p-2 w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Create Product
      </button>
    </form>
  );
}
```

---

**EXAMPLE 3 - Inline Edit (within a page)**:

```typescript
"use client";
import { useState } from "react";
import { Product } from "@/schemas/resources/product.schema";
import { ProductUI } from "@/schemas/ui/product.ui";
import { productsService } from "@/services/products.service";

export default function ProductListWithInlineEdit() {
  const [products, setProducts] = useState<ProductUI[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});

  const handleEdit = async (productUI: ProductUI) => {
    // Option 1: Convert UI → Backend for editing
    setEditingId(productUI.id);
    setEditData({
      title: productUI.title,
      price: productUI.price.raw, // Extract raw value
      stockCount: productUI.stock.count, // Extract nested value
      categoryId: productUI.category.id, // Extract ID
    });

    // Option 2: Fetch fresh data with getForEdit (RECOMMENDED)
    // const { raw } = await productsService.getForEdit(productUI.id);
    // setEditData(raw);
  };

  const handleSave = async () => {
    if (!editingId) return;

    // Save backend format
    await productsService.update(editingId, editData);

    // Refresh list
    const updated = await productsService.getAll();
    setProducts(updated.data);
    setEditingId(null);
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="border p-4 mb-2">
          {editingId === product.id ? (
            // Edit mode - use backend format
            <div>
              <input
                value={editData.title || ""}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
              <input
                type="number"
                value={editData.price || 0}
                onChange={(e) =>
                  setEditData({ ...editData, price: Number(e.target.value) })
                }
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            // Display mode - use UI format
            <div>
              <h3>{product.title}</h3>
              <p>{product.price.formatted}</p>
              <p>{product.stock.label}</p>
              <p>Shop: {product.shop.name}</p>
              <button onClick={() => handleEdit(product)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

**KEY POINTS FOR AI AGENTS**:

1. ✅ Edit pages: Call `getForEdit()` → Returns `{ ui, raw }` → Two separate states
2. ✅ Edit pages: Use `ui` for display, `raw` for form state
3. ✅ Create pages: Use `Partial<Product>` directly → One state → No UI needed
4. ✅ Inline edits: Convert UI → backend when entering edit mode OR fetch with getForEdit()
5. ✅ Submit: Send backend format → Service handles API call
6. ❌ NEVER transform UI → backend in form submit handler
7. ❌ NEVER use `productUI.price.raw` in form inputs - extract to separate state first

---

### Phase 10.3: Fix Inline Edit Table Component (COMPLETE ✅)

- ✅ `src/components/common/InlineEditTable.tsx` (functional with generics)

Component accepts both UI and backend types via generics and handles conversion.

---

### Phase 10.4: Move Bulk Action Routes (COMPLETE)

**RULE**: Bulk actions at resource level with permission checks inside handler.

**Completed**:

- ✅ `src/app/api/products/bulk/route.ts` - Public, seller, and admin actions
- ✅ `src/app/api/auctions/bulk/route.ts` - Seller (with ownership) and admin actions
- ✅ `src/app/api/categories/bulk/route.ts` - Admin-only actions
- ✅ `src/app/api/shops/bulk/route.ts` - Admin-only actions
- ✅ `src/app/api/orders/bulk/route.ts` - Seller (shop orders) and admin actions
- ✅ `src/app/api/reviews/bulk/route.ts` - User (flag) and admin actions

**Pattern Summary**:

1. ✅ Check action type first (public vs authenticated vs admin)
2. ✅ Public actions: No auth check (addToCart, addToWishlist)
3. ✅ Seller actions: Verify ownership of ALL resources
4. ✅ Admin actions: Check `user.role === "admin"`
5. ✅ Use Firestore batch operations
6. ✅ Return consistent JSON responses

---

### Phase 10.5: Bulk Action Services & UI Components (COMPLETE)

**RULE**: Add `bulkAction` methods to services and create UI components.

**Service Methods** (5 items):

- ✅ Add `bulkAction()` to `src/services/products.service.ts` - Call `/api/products/bulk`
- ✅ Add `bulkAction()` to `src/services/categories.service.ts` - Call `/api/categories/bulk`
- ✅ Add `bulkAction()` to `src/services/shops.service.ts` - Call `/api/shops/bulk`
- ✅ Add `bulkAction()` to `src/services/orders.service.ts` - Call `/api/orders/bulk`
- ✅ Add `bulkAction()` to `src/services/reviews.service.ts` - Call `/api/reviews/bulk`

**UI Components** (6 items):

- ✅ `src/components/admin/BulkProductActions.tsx` - Handle bulk product operations
- ✅ `src/components/admin/BulkAuctionActions.tsx` - Handle bulk auction operations
- ✅ `src/components/admin/BulkCategoryActions.tsx` - Handle bulk category operations
- ✅ `src/components/admin/BulkShopActions.tsx` - Handle bulk shop operations
- ✅ `src/components/admin/BulkOrderActions.tsx` - Handle bulk order operations
- ✅ `src/components/admin/BulkReviewActions.tsx` - Handle bulk review operations

**Note**: All services and UI components complete ✅

**Service Pattern**:

```typescript
// Add to each service (products, categories, shops, orders, reviews)
async bulkAction(
  action: string,
  ids: string[],
  data?: any
): Promise<{ success: boolean }> {
  return apiService.post('/api/[resource]/bulk', {
    action,
    ids,
    data,
  });
}
```

**UI Component Pattern**:

```typescript
// src/components/admin/BulkProductActions.tsx
"use client";
import { useState } from "react";
import { productsService } from "@/services/products.service";

interface Props {
  selectedIds: string[];
  onSuccess: () => void;
  userRole: "admin" | "seller";
}

export function BulkProductActions({
  selectedIds,
  onSuccess,
  userRole,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");

  const handleBulkAction = async () => {
    if (!action || selectedIds.length === 0) return;

    setLoading(true);
    try {
      await productsService.bulkAction(action, selectedIds);
      onSuccess();
      setAction("");
    } catch (error) {
      console.error("Bulk action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const adminActions = [
    { value: "feature", label: "Feature Products" },
    { value: "unfeature", label: "Unfeature Products" },
    { value: "ban", label: "Ban Products" },
    { value: "unban", label: "Unban Products" },
    { value: "verify", label: "Verify Products" },
    { value: "delete", label: "Delete Products" },
  ];

  const sellerActions = [
    { value: "update-stock", label: "Update Stock" },
    { value: "delete", label: "Delete Products" },
  ];

  const actions = userRole === "admin" ? adminActions : sellerActions;

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-gray-600">
        {selectedIds.length} selected
      </span>

      <select
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className="border p-2 rounded"
        disabled={loading || selectedIds.length === 0}
      >
        <option value="">Select action...</option>
        {actions.map((a) => (
          <option key={a.value} value={a.value}>
            {a.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleBulkAction}
        disabled={!action || loading || selectedIds.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {loading ? "Processing..." : "Apply"}
      </button>
    </div>
  );
}
```

---

### Phase 10.6: Documentation Updates (3 files)

- [ ] Add examples to `docs/project/02-SERVICE-LAYER-GUIDE.md`
- [ ] Update `docs/ai/AI-AGENT-GUIDE.md` with edit form pattern
- [ ] Add inline edit examples to component docs

---

### Phase 10.7: Category System Enhancements (COMPLETE ✅)

**RULE**: Categories need multiple parent support + auto product counts + seller creation.

All 6 items completed:

- ✅ **Multiple Parents Support**: Updated schema with `parentIds: string[]`
- ✅ **Circular Reference Prevention**: Created `category-utils.ts` with validation
- ✅ **Product Count Field**: Added to Category schema (auto-update via Cloud Function)
- ✅ **Seller Quick Create**: Created `CategoryQuickCreate.tsx` component
- ✅ **Review System**: Added `createdBy`, `needsReview`, `reviewedAt` fields
- ✅ **Updated Mappers**: Enhanced category.mapper.ts for new fields

**Example - Using Category Quick Create in Product Form**:

```typescript
"use client";
import { useState } from "react";
import { CategoryQuickCreate } from "@/components/seller/CategoryQuickCreate";

export default function ProductCreatePage() {
  const [formData, setFormData] = useState({ categoryId: "" });
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <form>
      <div className="mb-4">
        <label>Category</label>
        <div className="flex gap-2">
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            className="border p-2 flex-1"
          >
            <option value="">Select category...</option>
            {/* Existing categories */}
          </select>
          <button
            type="button"
            onClick={() => setShowCategoryModal(true)}
            className="bg-green-500 text-white px-4 py-2"
          >
            + New
          </button>
        </div>
      </div>

      {showCategoryModal && (
        <CategoryQuickCreate
          onCreated={(categoryId) => {
            setFormData({ ...formData, categoryId });
            setShowCategoryModal(false);
          }}
          onCancel={() => setShowCategoryModal(false)}
        />
      )}
    </form>
  );
}
```

**Example - Circular Reference Validation**:

```typescript
import { checkCircularReference } from "@/lib/category-utils";

// In API route: /api/categories/[id]/route.ts
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { parentIds } = await req.json();

  // Fetch all categories
  const categoriesSnapshot = await Collections.categories().get();
  const allCategories = categoriesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Validate no circular reference
  const validation = await checkCircularReference(
    params.id,
    parentIds,
    allCategories
  );

  if (!validation.isValid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Update category
  await Collections.categories().doc(params.id).update({ parentIds });

  return NextResponse.json({ success: true });
}
```

**Cloud Function - Auto Product Count** (deploy separately):

```typescript
// functions/src/updateCategoryProductCount.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const updateCategoryProductCount = functions.firestore
  .document("products/{productId}")
  .onWrite(async (change, context) => {
    const before = change.before.exists ? change.before.data() : null;
    const after = change.after.exists ? change.after.data() : null;
    const db = admin.firestore();

    // Product created
    if (!before && after) {
      await db.doc(`categories/${after.categoryId}`).update({
        productCount: admin.firestore.FieldValue.increment(1),
      });
    }

    // Product deleted
    if (before && !after) {
      await db.doc(`categories/${before.categoryId}`).update({
        productCount: admin.firestore.FieldValue.increment(-1),
      });
    }

    // Category changed
    if (before && after && before.categoryId !== after.categoryId) {
      await db.doc(`categories/${before.categoryId}`).update({
        productCount: admin.firestore.FieldValue.increment(-1),
      });
      await db.doc(`categories/${after.categoryId}`).update({
        productCount: admin.firestore.FieldValue.increment(1),
      });
    }
  });
```

---

### Phase 11: Cleanup (1 item)

- [ ] Run final `npm run type-check` and fix remaining errors

---

### Phase 12: Testing (20 items)

#### 12.1 Type Safety Validation

- [ ] Fix admin/seller edit form type errors
- [ ] Fix inline edit component type errors
- [ ] Verify all components use correct UI schemas

#### 12.3 Test Workflow Modernization (19 items)

- [ ] Update all workflows to use UI schemas
- [ ] Update all workflows to use service layer
- [ ] Create comprehensive dummy data for ALL resources:

  - [ ] Users (buyer, seller, admin)
  - [ ] Shops (verified, unverified)
  - [ ] Categories (with hierarchy, multiple parents)
  - [ ] Products (various statuses, with variants)
  - [ ] Auctions (live, upcoming, ended)
  - [ ] Orders (all statuses, with items)
  - [ ] Reviews (verified purchase, ratings)
  - [ ] Coupons (active, expired)
  - [ ] Addresses (shipping, billing)
  - [ ] Support tickets
  - [ ] Returns
  - [ ] Payments
  - [ ] Blog posts

- [ ] Create centralized dummy data registry (`tests/fixtures/dummy-data.ts`)
- [ ] Test category product count auto-update
- [ ] Test multi-parent category support
- [ ] Test circular reference prevention
- [ ] Run `npm run test:workflows:all`

---

### Phase 13: Final Documentation (5 items)

- [ ] Update `docs/ai/AI-AGENT-GUIDE.md` with schema system
- [ ] Update `docs/project/00-QUICK-START.md`
- [ ] Update `docs/project/02-SERVICE-LAYER-GUIDE.md`
- [ ] Verify all resource docs are complete
- [ ] Create migration guide

---

## Progress Summary

**Remaining**: 22 tasks (94% complete)

**Breakdown**:

- Phase 10.6: 3 documentation updates
- Phase 11: 1 cleanup task
- Phase 12: 13 testing tasks
- Phase 13: 5 final documentation tasks

**Next Priority**: Documentation updates (Phase 10.6) OR Testing (Phase 12)

---

## Key Architecture Rules

### Data Flow

```
Components/Pages (UI Schema)
    ↓ call service
Services (return UI, accept Backend)
    ↓ HTTP request
API Routes (use mappers, access Firebase)
    ↓ Firestore
Firebase (Backend Schema)
```

### Form Pattern

```typescript
// Edit: TWO states
const [ui, setUI] = useState<ProductUI>(null); // Display
const [form, setForm] = useState<Partial<Product>>({}); // Inputs

// Create: ONE state
const [form, setForm] = useState<Partial<Product>>({}); // Inputs only
```

### Service Pattern

```typescript
// Services NEVER access Firebase
// Services ONLY call API endpoints

class ProductsService {
  // Returns UI format
  async getAll(): Promise<ProductUI[]> {
    return apiService.get(ENDPOINTS.LIST);
  }

  // Returns both formats for editing
  async getForEdit(id: string): Promise<{ ui: ProductUI; raw: Product }> {
    return apiService.get(ENDPOINTS.FOR_EDIT(id));
  }

  // Accepts backend format
  async update(id: string, data: Partial<Product>): Promise<void> {
    return apiService.patch(ENDPOINTS.DETAIL(id), data);
  }
}
```

### Mapper Pattern

```typescript
// Mappers transform Backend → UI (one direction only)
// NEVER transform UI → Backend in mappers

export function mapProductToUI(product: Product): ProductUI {
  return {
    // Transform backend fields to display format
    price: {
      raw: product.price,
      formatted: `₹${product.price.toLocaleString()}`,
    },
    // ...
  };
}
```

---

**Last Updated**: November 13, 2025  
**Status**: 94% Complete (22 tasks) | Documentation & Testing Next
