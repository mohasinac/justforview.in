# Schema System Quick Reference

**Quick lookup guide for the new schema system**

---

## File Locations

### For a Resource Named "Product"

```
Backend Schema:       src/schemas/resources/product.schema.ts
UI Schema:           src/schemas/ui/product.ui.ts
Mapper:              src/schemas/mappers/product.mapper.ts
Endpoints:           src/constants/endpoints/product.endpoints.ts
Fields:              src/constants/fields/product.fields.ts

Entity Types:        src/types/entities/product.types.ts
UI Types:            src/types/ui/product.ui.types.ts
API Types:           src/types/api/product.api.types.ts
```

---

## Import Patterns

### Backend (API Routes)

```typescript
// Schema for validation
import {
  ProductSchema,
  CreateProductSchema,
} from "@/schemas/resources/product.schema";

// Mapper for transformation
import { mapProductToUI } from "@/schemas/mappers/product.mapper";

// Entity type
import type { Product } from "@/types/entities/product.types";
```

### Frontend (Components)

```typescript
// UI schema type (ALWAYS use this in components)
import type { ProductUI, ProductCardUI } from "@/schemas/ui/product.ui";

// Never import backend schema in components!
```

### Services

```typescript
// UI schema type (services return UI types)
import type { ProductUI } from "@/schemas/ui/product.ui";

// Endpoints
import { PRODUCT_ENDPOINTS } from "@/constants/endpoints/product.endpoints";

// API types
import type {
  CreateProductRequest,
  ProductFilters,
} from "@/types/api/product.api.types";
```

### Forms

```typescript
// Field definitions
import {
  PRODUCT_FIELDS,
  PRODUCT_BASIC_FIELDS,
} from "@/constants/fields/product.fields";

// Form data type
import type { ProductFormData } from "@/schemas/ui/product.ui";
```

---

## Common Code Snippets

### API Route (GET)

```typescript
import { ProductSchema } from "@/schemas/resources/product.schema";
import { mapProductToUI } from "@/schemas/mappers/product.mapper";

export async function GET(req: Request, { params }) {
  const doc = await db.collection("products").doc(params.id).get();
  const product = ProductSchema.parse(doc.data());
  const uiProduct = mapProductToUI(product);
  return NextResponse.json({ product: uiProduct });
}
```

### API Route (POST)

```typescript
import { CreateProductSchema } from "@/schemas/resources/product.schema";
import { mapProductToUI } from "@/schemas/mappers/product.mapper";

export async function POST(req: Request) {
  const body = await req.json();
  const validData = CreateProductSchema.parse(body);

  const docRef = await db.collection("products").add({
    ...validData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const product = { id: docRef.id, ...validData };
  const uiProduct = mapProductToUI(product);

  return NextResponse.json({ product: uiProduct });
}
```

### Service Method

```typescript
import type { ProductUI } from "@/schemas/ui/product.ui";
import { PRODUCT_ENDPOINTS } from "@/constants/endpoints/product.endpoints";

class ProductService {
  async getProduct(id: string): Promise<ProductUI> {
    const url = PRODUCT_ENDPOINTS.BY_ID(id);
    const response = await apiService.get<{ product: ProductUI }>(url);
    return response.product;
  }

  async getProducts(filters?: ProductFilters): Promise<ProductUI[]> {
    const url = buildProductUrl(PRODUCT_ENDPOINTS.LIST, filters);
    const response = await apiService.get<{ products: ProductUI[] }>(url);
    return response.products;
  }
}
```

### Component (Card)

```typescript
import type { ProductCardUI } from "@/schemas/ui/product.ui";

interface Props {
  product: ProductCardUI;
}

export function ProductCard({ product }: Props) {
  return (
    <div>
      <img src={product.primaryImage.url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price.formatted}</p>
      {product.discount && <span>{product.discount.label}</span>}
      <span className={product.stock.className}>{product.stock.label}</span>
    </div>
  );
}
```

### Component (List with Hook)

```typescript
"use client";
import { useState, useEffect } from "react";
import type { ProductUI } from "@/schemas/ui/product.ui";
import { productService } from "@/services/products.service";

export function ProductList() {
  const [products, setProducts] = useState<ProductUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getProducts({ status: "published" })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Form Component

```typescript
import { useForm } from "react-hook-form";
import { PRODUCT_BASIC_FIELDS } from "@/constants/fields/product.fields";
import type { ProductFormData } from "@/schemas/ui/product.ui";

interface Props {
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export function ProductForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {PRODUCT_BASIC_FIELDS.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            {...register(field.name, {
              required: field.required,
              minLength: field.validation?.minLength,
              maxLength: field.validation?.maxLength,
            })}
            type={field.type}
            placeholder={field.placeholder}
          />
          {errors[field.name] && <span>{errors[field.name]?.message}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Validation Examples

### Validate Input (API Route)

```typescript
import { CreateProductSchema } from "@/schemas/resources/product.schema";

try {
  const validData = CreateProductSchema.parse(input);
  // Use validData...
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Validation failed", details: error.errors },
      { status: 400 }
    );
  }
}
```

### Validate Filters (Service)

```typescript
import { ProductFilterSchema } from '@/schemas/resources/product.schema';

async getProducts(filters?: any): Promise<ProductUI[]> {
  const validFilters = ProductFilterSchema.parse(filters || {});
  // Use validFilters...
}
```

---

## Mapper Examples

### Full Product Mapping

```typescript
const uiProduct = mapProductToUI(backendProduct);
```

### Card Mapping (Simplified)

```typescript
const cardProduct = mapProductToCard(backendProduct);
```

### List Item Mapping

```typescript
const listItem = mapProductToListItem(backendProduct, shopName);
```

### Bulk Mapping

```typescript
const uiProducts = mapProductsToUI(backendProducts);
const cardProducts = mapProductsToCards(backendProducts);
```

---

## Endpoint Usage

### Get Endpoint

```typescript
import { PRODUCT_ENDPOINTS } from "@/constants/endpoints/product.endpoints";

const url = PRODUCT_ENDPOINTS.BY_ID("product-123");
// Result: '/products/product-123'
```

### Build URL with Filters

```typescript
import { buildProductUrl } from "@/constants/endpoints/product.endpoints";

const url = buildProductUrl(PRODUCT_ENDPOINTS.LIST, {
  status: "published",
  categoryId: "electronics",
  minPrice: 1000,
  page: 1,
  limit: 20,
});
// Result: '/products?status=published&categoryId=electronics&minPrice=1000&page=1&limit=20'
```

---

## Field Usage

### Render Form Fields

```typescript
import { PRODUCT_BASIC_FIELDS } from "@/constants/fields/product.fields";

PRODUCT_BASIC_FIELDS.map((field) => (
  <FormField
    key={field.name}
    label={field.label}
    name={field.name}
    type={field.type}
    required={field.required}
    placeholder={field.placeholder}
    helperText={field.helperText}
    validation={field.validation}
  />
));
```

### Render Table Columns

```typescript
import { PRODUCT_TABLE_COLUMNS } from "@/constants/fields/product.fields";

PRODUCT_TABLE_COLUMNS.map((column) => (
  <TableHeader key={column.key} sortable={column.sortable}>
    {column.label}
  </TableHeader>
));
```

### Render Filters

```typescript
import { PRODUCT_FILTER_FIELDS } from "@/constants/fields/product.fields";

<select name={PRODUCT_FILTER_FIELDS.STATUS.name}>
  {PRODUCT_FILTER_FIELDS.STATUS.options?.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>;
```

---

## Type Patterns

### Component Props

```typescript
// Card component
interface ProductCardProps {
  product: ProductCardUI;
  onAddToCart?: (id: string) => void;
}

// List component
interface ProductListProps {
  products: ProductUI[];
  loading?: boolean;
  error?: string;
}

// Form component
interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel?: () => void;
}
```

### API Response Types

```typescript
interface GetProductResponse {
  product: ProductUI;
}

interface GetProductsResponse {
  products: ProductUI[];
  pagination: PaginationMeta;
}

interface CreateProductResponse {
  product: ProductUI;
  message: string;
}
```

---

## Common Mistakes to Avoid

### ❌ DON'T Use Backend Schema in Components

```typescript
// ❌ WRONG
import { Product } from "@/schemas/resources/product.schema";
interface Props {
  product: Product;
}

// ✅ CORRECT
import type { ProductUI } from "@/schemas/ui/product.ui";
interface Props {
  product: ProductUI;
}
```

### ❌ DON'T Skip Mapping in API Routes

```typescript
// ❌ WRONG
return NextResponse.json({ product: doc.data() });

// ✅ CORRECT
const uiProduct = mapProductToUI(doc.data());
return NextResponse.json({ product: uiProduct });
```

### ❌ DON'T Hardcode Endpoints

```typescript
// ❌ WRONG
const response = await fetch("/products/" + id);

// ✅ CORRECT
const url = PRODUCT_ENDPOINTS.BY_ID(id);
const response = await apiService.get(url);
```

### ❌ DON'T Skip Validation

```typescript
// ❌ WRONG
const product = await db.collection("products").add(body);

// ✅ CORRECT
const validData = CreateProductSchema.parse(body);
const product = await db.collection("products").add(validData);
```

---

## Cheat Sheet

| Task                  | Import From            | Use                           |
| --------------------- | ---------------------- | ----------------------------- |
| Validate backend data | `schemas/resources/`   | `ProductSchema.parse()`       |
| Transform to UI       | `schemas/mappers/`     | `mapProductToUI()`            |
| Component props type  | `schemas/ui/`          | `ProductUI`                   |
| API endpoint          | `constants/endpoints/` | `PRODUCT_ENDPOINTS.BY_ID(id)` |
| Form fields           | `constants/fields/`    | `PRODUCT_BASIC_FIELDS`        |
| Entity type           | `types/entities/`      | `Product`                     |
| UI type               | `types/ui/`            | `ProductUI`                   |
| API request type      | `types/api/`           | `CreateProductRequest`        |

---

**Last Updated**: November 12, 2025  
**Version**: 1.0
