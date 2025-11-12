# Bulk Actions Pattern

## Overview

Bulk actions allow users to perform operations on multiple resources at once. Different user types need different permissions:

- **Public Users**: Add to cart, wishlist (products/auctions)
- **Sellers**: Manage their own resources (update, delete, ship)
- **Admins**: All operations on all resources

## Route Structure

### ❌ Old Pattern (Admin-Only)

```
/api/admin/products/bulk
/api/admin/auctions/bulk
/api/admin/orders/bulk
```

**Problem**:

- Sellers can't bulk-manage their own products
- Public users can't bulk add to cart
- Requires duplicate routes for different user types

### ✅ New Pattern (Resource-Level)

```
/api/products/bulk
/api/auctions/bulk
/api/orders/bulk
/api/reviews/bulk
```

**Benefits**:

- Single endpoint per resource
- Permission checks inside route handler
- Supports public, seller, and admin actions
- Consistent with REST principles

## Implementation

### Route Structure

```typescript
// src/app/api/products/bulk/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/server";
import { productsService } from "@/services/products.service";

export async function POST(req: NextRequest) {
  try {
    const { action, ids, data } = await req.json();

    // Get current user (optional - some actions don't need auth)
    const { user } = await getAuthUser(req);

    // Route to specific action handler with permission check
    switch (action) {
      case "addToCart":
        return await handleAddToCart(ids, user);

      case "addToWishlist":
        return await handleAddToWishlist(ids, user);

      case "update":
        return await handleUpdate(ids, data, user);

      case "delete":
        return await handleDelete(ids, user);

      case "updateStatus":
        return await handleUpdateStatus(ids, data, user);

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Bulk action error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Bulk action failed" },
      { status: 500 }
    );
  }
}

// Public action - no auth required
async function handleAddToCart(ids: string[], user: any) {
  // Add products to cart
  const products = await productsService.getByIds(ids);

  // Return products for client-side cart management
  return NextResponse.json({
    success: true,
    products: products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price.amount,
      image: p.primaryImage.url,
    })),
  });
}

// Seller or Admin action
async function handleUpdate(ids: string[], data: Partial<Product>, user: any) {
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // Get products to check ownership
  const products = await productsService.getByIds(ids);

  // Sellers can only update their own products
  if (!user.isAdmin) {
    const allOwnedByUser = products.every((p) => p.shopId === user.shopId);
    if (!allOwnedByUser) {
      return NextResponse.json(
        { error: "You can only update your own products" },
        { status: 403 }
      );
    }
  }

  // Perform bulk update
  const updated = await productsService.bulkUpdate(ids, data);

  return NextResponse.json({
    success: true,
    count: updated.length,
    products: updated,
  });
}

// Admin-only action
async function handleUpdateStatus(
  ids: string[],
  data: { status: ProductStatus },
  user: any
) {
  if (!user?.isAdmin) {
    return NextResponse.json(
      { error: "Admin permission required" },
      { status: 403 }
    );
  }

  const updated = await productsService.bulkUpdateStatus(ids, data.status);

  return NextResponse.json({
    success: true,
    count: updated.length,
  });
}
```

## Permission Matrix

### Products Bulk Actions

| Action          | Public | Seller   | Admin    |
| --------------- | ------ | -------- | -------- |
| `addToCart`     | ✅     | ✅       | ✅       |
| `addToWishlist` | ✅     | ✅       | ✅       |
| `update`        | ❌     | ✅ (own) | ✅ (all) |
| `delete`        | ❌     | ✅ (own) | ✅ (all) |
| `updateStatus`  | ❌     | ❌       | ✅       |
| `feature`       | ❌     | ❌       | ✅       |

### Auctions Bulk Actions

| Action    | Public | Seller   | Admin    |
| --------- | ------ | -------- | -------- |
| `watch`   | ✅     | ✅       | ✅       |
| `unwatch` | ✅     | ✅       | ✅       |
| `update`  | ❌     | ✅ (own) | ✅ (all) |
| `cancel`  | ❌     | ✅ (own) | ✅ (all) |
| `delete`  | ❌     | ❌       | ✅       |

### Orders Bulk Actions

| Action           | Public | Seller   | Admin    |
| ---------------- | ------ | -------- | -------- |
| `updateStatus`   | ❌     | ✅ (own) | ✅ (all) |
| `createShipment` | ❌     | ✅ (own) | ✅ (all) |
| `cancel`         | ❌     | ✅ (own) | ✅ (all) |
| `export`         | ❌     | ✅ (own) | ✅ (all) |

### Reviews Bulk Actions

| Action    | Public | Seller | Admin |
| --------- | ------ | ------ | ----- |
| `approve` | ❌     | ❌     | ✅    |
| `reject`  | ❌     | ❌     | ✅    |
| `feature` | ❌     | ❌     | ✅    |
| `delete`  | ❌     | ❌     | ✅    |

### Categories Bulk Actions

| Action    | Public | Seller | Admin |
| --------- | ------ | ------ | ----- |
| `update`  | ❌     | ❌     | ✅    |
| `delete`  | ❌     | ❌     | ✅    |
| `reorder` | ❌     | ❌     | ✅    |
| `feature` | ❌     | ❌     | ✅    |

### Shops Bulk Actions

| Action            | Public | Seller   | Admin    |
| ----------------- | ------ | -------- | -------- |
| `updateSettings`  | ❌     | ✅ (own) | ✅ (all) |
| `verify`          | ❌     | ❌       | ✅       |
| `ban`             | ❌     | ❌       | ✅       |
| `setFeatureFlags` | ❌     | ❌       | ✅       |

## Client-Side Usage

### Public Users (Add to Cart)

```typescript
// components/ProductList.tsx
const handleBulkAddToCart = async (productIds: string[]) => {
  const response = await fetch("/api/products/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "addToCart",
      ids: productIds,
    }),
  });

  const { products } = await response.json();

  // Add to local cart state
  products.forEach((product) => {
    cart.add({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  });

  toast.success(`Added ${products.length} products to cart`);
};
```

### Sellers (Update Own Products)

```typescript
// app/seller/products/page.tsx
const handleBulkUpdate = async (
  productIds: string[],
  data: Partial<Product>
) => {
  const response = await fetch("/api/products/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "update",
      ids: productIds,
      data,
    }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    toast.error(error);
    return;
  }

  const { count } = await response.json();
  toast.success(`Updated ${count} products`);

  // Refresh list
  await loadProducts();
};
```

### Admins (All Operations)

```typescript
// app/admin/products/page.tsx
const handleBulkAction = async (
  action: string,
  productIds: string[],
  data?: any
) => {
  const response = await fetch("/api/products/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action,
      ids: productIds,
      data,
    }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    toast.error(error);
    return;
  }

  const result = await response.json();
  toast.success(`${action} completed for ${result.count} products`);

  // Refresh list
  await loadProducts();
};

// Usage
<BulkActionMenu
  selectedIds={selectedProductIds}
  onAction={handleBulkAction}
  actions={[
    { label: "Update Status", value: "updateStatus" },
    { label: "Feature", value: "feature" },
    { label: "Delete", value: "delete" },
  ]}
/>;
```

## Service Layer

Services need bulk operation methods:

```typescript
// src/services/products.service.ts

class ProductsService {
  // Get multiple products by IDs
  async getByIds(ids: string[]): Promise<ProductUI[]> {
    const products = await Promise.all(ids.map((id) => this.getById(id)));
    return products.filter(Boolean);
  }

  // Bulk update (sellers can update own, admins can update all)
  async bulkUpdate(
    ids: string[],
    data: Partial<Product>
  ): Promise<ProductUI[]> {
    const batch = writeBatch(db);

    ids.forEach((id) => {
      const ref = doc(this.collection, id);
      batch.update(ref, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    });

    await batch.commit();

    // Return updated products
    return await this.getByIds(ids);
  }

  // Bulk status update (admin-only)
  async bulkUpdateStatus(
    ids: string[],
    status: ProductStatus
  ): Promise<ProductUI[]> {
    return await this.bulkUpdate(ids, { status });
  }

  // Bulk delete (sellers can delete own, admins can delete all)
  async bulkDelete(ids: string[]): Promise<void> {
    const batch = writeBatch(db);

    ids.forEach((id) => {
      const ref = doc(this.collection, id);
      batch.delete(ref);
    });

    await batch.commit();
  }
}
```

## Migration Plan

### 1. Move Route Files

```bash
# Move bulk action routes from admin to resource level
mv src/app/api/admin/products/bulk/route.ts src/app/api/products/bulk/route.ts
mv src/app/api/admin/auctions/bulk/route.ts src/app/api/auctions/bulk/route.ts
mv src/app/api/admin/orders/bulk/route.ts src/app/api/orders/bulk/route.ts
mv src/app/api/admin/categories/bulk/route.ts src/app/api/categories/bulk/route.ts
mv src/app/api/admin/shops/bulk/route.ts src/app/api/shops/bulk/route.ts
mv src/app/api/admin/reviews/bulk/route.ts src/app/api/reviews/bulk/route.ts
```

### 2. Add Permission Checks

For each route, add permission matrix logic based on action type.

### 3. Add Service Methods

Add bulk operation methods to each service (getByIds, bulkUpdate, bulkDelete, etc.).

### 4. Update Client Code

Update all fetch calls from `/api/admin/*/bulk` to `/api/*/bulk`.

### 5. Test Each User Role

- Test public actions (cart, wishlist)
- Test seller actions (own resources only)
- Test admin actions (all resources)
- Test permission denials

## Testing

```typescript
// tests/bulk-actions.test.ts

describe("Products Bulk Actions", () => {
  it("allows public users to add to cart", async () => {
    const response = await fetch("/api/products/bulk", {
      method: "POST",
      body: JSON.stringify({
        action: "addToCart",
        ids: ["product1", "product2"],
      }),
    });

    expect(response.status).toBe(200);
    const { products } = await response.json();
    expect(products).toHaveLength(2);
  });

  it("allows sellers to update own products", async () => {
    const sellerToken = await getSellerToken();

    const response = await fetch("/api/products/bulk", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sellerToken}`,
      },
      body: JSON.stringify({
        action: "update",
        ids: ["ownProduct1", "ownProduct2"],
        data: { price: 999 },
      }),
    });

    expect(response.status).toBe(200);
  });

  it("prevents sellers from updating others' products", async () => {
    const sellerToken = await getSellerToken();

    const response = await fetch("/api/products/bulk", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sellerToken}`,
      },
      body: JSON.stringify({
        action: "update",
        ids: ["otherProduct1"],
        data: { price: 999 },
      }),
    });

    expect(response.status).toBe(403);
  });

  it("allows admins to perform any action", async () => {
    const adminToken = await getAdminToken();

    const response = await fetch("/api/products/bulk", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        action: "updateStatus",
        ids: ["product1", "product2"],
        data: { status: "archived" },
      }),
    });

    expect(response.status).toBe(200);
  });
});
```

## Best Practices

1. **Always validate ownership** for seller actions
2. **Use batch operations** for Firestore writes
3. **Return updated data** so clients can refresh
4. **Log bulk actions** for audit trail
5. **Limit batch size** (max 500 per Firestore batch)
6. **Handle partial failures** gracefully
7. **Rate limit** bulk endpoints

## Related Documentation

- [Service Layer Guide](./02-SERVICE-LAYER-GUIDE.md)
- [API Routes](./01-ARCHITECTURE-OVERVIEW.md)
- [Permission System](../resources/README.md)
