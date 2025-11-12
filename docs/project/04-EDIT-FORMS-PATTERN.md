# Edit Forms Pattern

## Overview

Edit forms require special handling because they need to work with **backend data types** for form state, but **display UI schemas** for initial population and related data (shops, categories, etc.).

## The Problem

- **UI Schemas** (ProductUI, OrderUI, etc.) are **display-only** - they have formatted fields, computed values, and nested objects
- **Backend Schemas** (Product, Order, etc.) have **raw editable values** - plain numbers, strings, IDs
- Edit forms need **backend format** for state management and submission
- But services return **UI format** for consistency

## The Solution

### Pattern 1: Service Layer Returns Both Formats (Recommended)

```typescript
// Service method returns both UI (for display) and raw (for editing)
interface ProductEditData {
  ui: ProductUI;      // For display (shop name, category name, formatted price)
  raw: Product;       // For form state (raw values, IDs)
}

// In service
async getForEdit(id: string): Promise<ProductEditData> {
  const raw = await this.getBackendProduct(id);  // Firestore query
  const ui = mapProductToUI(raw);                  // Transform for display

  return { ui, raw };
}
```

### Pattern 2: Extract From UI (Current - Needs Fixing)

```typescript
// ❌ PROBLEM: UI schemas don't preserve all backend fields
const productUI = await productsService.getById(id);  // Returns ProductUI
setState({
  price: productUI.price.amount,      // ✅ Works
  costPrice: productUI.costPrice?,    // ❌ Field doesn't exist in UI!
  compareAtPrice: ???,                 // ❌ Not in UI schema!
  lowStockThreshold: ???               // ❌ Not in UI schema!
});
```

## Recommended Implementation

### Step 1: Add Edit Methods to Services

```typescript
// src/services/products.service.ts

/**
 * Get product for editing (returns both UI and raw formats)
 */
async getForEdit(id: string): Promise<{ ui: ProductUI; raw: Product }> {
  const doc = await getDoc(doc(this.collection, id));
  if (!doc.exists()) throw new Error("Product not found");

  const raw = { id: doc.id, ...doc.data() } as Product;
  const ui = mapProductToUI(raw);

  return { ui, raw };
}

/**
 * Update product (accepts raw backend format)
 */
async update(id: string, data: Partial<Product>): Promise<ProductUI> {
  await updateDoc(doc(this.collection, id), data);
  const updated = await this.getById(id);  // Returns ProductUI
  return updated;
}
```

### Step 2: Edit Page Implementation

```typescript
// src/app/admin/products/[id]/edit/page.tsx

export default function ProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  // UI data for displaying related info (shop name, category name)
  const [productUI, setProductUI] = useState<ProductUI | null>(null);

  // Raw backend data for form state
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    async function load() {
      // Get both formats from service
      const { ui, raw } = await productsService.getForEdit(params.id);

      setProductUI(ui); // For display
      setFormData(raw); // For form state
    }
    load();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Submit raw backend format directly
    await productsService.update(params.id, formData);

    // Refresh UI display
    const { ui } = await productsService.getForEdit(params.id);
    setProductUI(ui);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Display shop name from UI */}
      <div>Shop: {productUI?.shop.name}</div>

      {/* Form fields use raw backend values */}
      <input
        type="number"
        value={formData.price || 0}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
      />

      <input
        type="number"
        value={formData.costPrice || 0}
        onChange={(e) =>
          setFormData({ ...formData, costPrice: Number(e.target.value) })
        }
      />

      <input
        type="number"
        value={formData.stockCount || 0}
        onChange={(e) =>
          setFormData({ ...formData, stockCount: Number(e.target.value) })
        }
      />

      <select
        value={formData.status || "draft"}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value as ProductStatus })
        }
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <button type="submit">Save</button>
    </form>
  );
}
```

## Key Principles

### ✅ DO:

1. **Service methods for editing return raw backend format** (or both UI + raw)
2. **Form state uses backend types** (Product, Order, Shop, etc.)
3. **Submit backend format to API** - no transformation needed
4. **Use UI format for display-only fields** (shop.name, category.name, formatted values)

### ❌ DON'T:

1. **Don't try to extract backend format from UI schemas** - they don't preserve all fields
2. **Don't use UI schemas for form state** - they have nested objects, computed fields
3. **Don't transform UI → backend in components** - services should provide both

## Migration Checklist

### For Each Edit Form:

- [ ] Add `getForEdit(id)` method to service returning `{ ui, raw }`
- [ ] Change form state from UI type to backend type
- [ ] Use `raw` for form field values
- [ ] Use `ui` for display-only fields (related entity names)
- [ ] Submit `formData` directly without transformation
- [ ] Update type imports (Product, not ProductUI)

### Example Migration:

```diff
// Before (BROKEN)
- const [product, setProduct] = useState<ProductUI | null>(null);
+ const [productUI, setProductUI] = useState<ProductUI | null>(null);
+ const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
-   const data = await productsService.getById(id);  // Returns ProductUI
-   setProduct(data);
+   const { ui, raw } = await productsService.getForEdit(id);
+   setProductUI(ui);
+   setFormData(raw);
  }, []);

  const handleSubmit = async () => {
-   // ❌ Can't extract backend format from ProductUI
-   const data = {
-     price: product.price.amount,
-     costPrice: ???,  // Doesn't exist in UI!
-   };
+   // ✅ Already have backend format
+   await productsService.update(id, formData);
  };

  return (
    <div>
-     <div>Shop: {product.shop?.name}</div>
+     <div>Shop: {productUI?.shop.name}</div>

      <input
-       value={product?.price.amount || 0}
+       value={formData.price || 0}
-       onChange={(e) => setProduct({ ...product, price: { amount: Number(e.target.value) } })}  // ❌ Wrong structure!
+       onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}  // ✅ Simple
      />
    </div>
  );
```

## Testing

After migration, verify:

1. ✅ Form loads with correct initial values
2. ✅ Form fields update state correctly
3. ✅ Form submits valid backend format
4. ✅ Display fields show UI format (formatted prices, entity names)
5. ✅ TypeScript has no errors
6. ✅ No console errors about missing fields

## Files to Update

### Services (Add `getForEdit` methods):

- [ ] `src/services/products.service.ts`
- [ ] `src/services/auctions.service.ts`
- [ ] `src/services/shops.service.ts`
- [ ] `src/services/categories.service.ts`
- [ ] `src/services/orders.service.ts`

### Edit Pages:

- [ ] `src/app/admin/products/[id]/edit/page.tsx`
- [ ] `src/app/seller/products/[id]/edit/page.tsx`
- [ ] `src/app/admin/auctions/[id]/edit/page.tsx`
- [ ] `src/app/seller/auctions/[id]/edit/page.tsx`
- [ ] `src/app/admin/shops/[id]/edit/page.tsx`
- [ ] `src/app/seller/shop/edit/page.tsx`
- [ ] `src/app/admin/categories/[id]/edit/page.tsx`
- [ ] `src/app/admin/categories/create/page.tsx`

### Inline Edit Components:

- [ ] `src/components/common/InlineEditTable.tsx` - Needs backend format for updates

## Related Documentation

- [Service Layer Guide](./02-SERVICE-LAYER-GUIDE.md) - How services handle UI vs backend formats
- [Schema System](../../schemas/README.md) - Understanding UI vs backend schemas
- [API Integration](./01-ARCHITECTURE-OVERVIEW.md) - How APIs use mappers
