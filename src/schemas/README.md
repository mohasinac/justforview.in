# Schema System

This directory contains the comprehensive schema system for JustForView.in, ensuring data consistency between backend and frontend.

## Directory Structure

```
schemas/
├── resources/      # Backend database schemas (Firestore documents)
├── ui/             # Frontend UI schemas (display models)
└── mappers/        # Backend-to-UI data transformation
```

## Purpose

The schema system eliminates data inconsistencies by:

1. **Defining Clear Contracts** - Explicit backend and frontend data shapes
2. **Validation** - Zod schemas validate data at boundaries
3. **Transformation** - Mappers handle BE→UI conversion consistently
4. **Type Safety** - Full TypeScript support across layers
5. **Single Source of Truth** - No duplicate or conflicting definitions

## Usage

### Backend (API Routes)

```typescript
// Import resource schema for validation
import { ProductSchema } from '@/schemas/resources/product.schema';
// Import mapper to transform to UI format
import { mapProductToUI } from '@/schemas/mappers/product.mapper';

// Validate input
const validatedData = ProductSchema.parse(input);

// Store in Firestore
await db.collection('products').add(validatedData);

// Transform for response
const uiProduct = mapProductToUI(validatedData);
return NextResponse.json({ product: uiProduct });
```

### Frontend (Components)

```typescript
// Import UI schema type
import type { ProductUI } from '@/schemas/ui/product.ui';

// Use in component
interface Props {
  product: ProductUI; // Always use UI schema types
}

export function ProductCard({ product }: Props) {
  return (
    <div>
      <h3>{product.displayName}</h3>
      <p>{product.formattedPrice}</p>
      <span className={product.stockStatus.className}>
        {product.stockStatus.label}
      </span>
    </div>
  );
}
```

### Services

```typescript
// Services always return UI schema types
import type { ProductUI } from '@/schemas/ui/product.ui';

class ProductService {
  async getProduct(id: string): Promise<ProductUI> {
    // API route returns mapped UI schema
    const response = await apiService.get(`/products/${id}`);
    return response.product; // Already in UI format
  }
}
```

## Key Principles

### 1. Never Use Raw Backend Types in Frontend

```typescript
// ❌ WRONG - Using backend schema in component
import { Product } from '@/schemas/resources/product.schema';

interface Props {
  product: Product; // Backend type
}

// ✅ CORRECT - Using UI schema in component
import type { ProductUI } from '@/schemas/ui/product.ui';

interface Props {
  product: ProductUI; // UI type
}
```

### 2. Always Map in API Routes

```typescript
// ❌ WRONG - Returning raw Firestore data
export async function GET(req: Request) {
  const doc = await db.collection('products').doc(id).get();
  return NextResponse.json({ product: doc.data() }); // Raw backend data
}

// ✅ CORRECT - Using mapper
import { mapProductToUI } from '@/schemas/mappers/product.mapper';

export async function GET(req: Request) {
  const doc = await db.collection('products').doc(id).get();
  const product = mapProductToUI(doc.data());
  return NextResponse.json({ product }); // Mapped UI data
}
```

### 3. Validate All Inputs

```typescript
// ✅ Always validate API inputs with schema
import { CreateProductSchema } from '@/schemas/resources/product.schema';

export async function POST(req: Request) {
  const body = await req.json();
  
  // Validate - throws if invalid
  const validData = CreateProductSchema.parse(body);
  
  // Now safe to use
  await db.collection('products').add(validData);
}
```

### 4. Keep UI Schemas Display-Focused

UI schemas should include computed/formatted values for display:

```typescript
// Backend schema - raw data
{
  price: 1999.99,
  stockCount: 5,
  status: 'published'
}

// UI schema - display-ready data
{
  price: 1999.99,
  formattedPrice: '₹1,999.99',
  originalPrice: 2499.99,
  formattedOriginalPrice: '₹2,499.99',
  discount: {
    amount: 500,
    percentage: 20,
    label: '20% OFF'
  },
  stockCount: 5,
  stockStatus: {
    isLow: true,
    label: 'Only 5 left',
    className: 'text-orange-600'
  },
  status: {
    value: 'published',
    label: 'Published',
    color: 'green'
  }
}
```

## File Naming Convention

### Resource Schemas (Backend)
- `{resource}.schema.ts` - Full schema with all fields
- Export main schema as `{Resource}Schema`
- Export create schema as `Create{Resource}Schema`
- Export update schema as `Update{Resource}Schema`

Example: `product.schema.ts` exports `ProductSchema`, `CreateProductSchema`, `UpdateProductSchema`

### UI Schemas (Frontend)
- `{resource}.ui.ts` - UI display models
- Export main type as `{Resource}UI`
- Export related types as needed

Example: `product.ui.ts` exports `ProductUI`, `ProductCardUI`, `ProductListItemUI`

### Mappers
- `{resource}.mapper.ts` - Transformation functions
- Export mapper as `map{Resource}ToUI`
- Export reverse mapper as `map{Resource}FromUI` (if needed)

Example: `product.mapper.ts` exports `mapProductToUI`, `mapProductFromUI`

## Creating New Resources

Follow this checklist when adding a new resource:

1. **Create Resource Schema** (`schemas/resources/{resource}.schema.ts`)
   - Define Zod schema matching Firestore structure
   - Export create/update variants
   - Add validation rules

2. **Create Entity Types** (`types/entities/{resource}.types.ts`)
   - Define TypeScript interfaces from schemas
   - Export all related types

3. **Create UI Schema** (`schemas/ui/{resource}.ui.ts`)
   - Define display-focused data model
   - Include computed/formatted fields
   - Add helper types (CardUI, ListItemUI, etc.)

4. **Create UI Types** (`types/ui/{resource}.ui.types.ts`)
   - Define TypeScript interfaces for UI schemas
   - Export all UI-related types

5. **Create Mapper** (`schemas/mappers/{resource}.mapper.ts`)
   - Implement BE→UI transformation
   - Format dates, prices, etc.
   - Add computed fields
   - Handle missing/null values

6. **Create Endpoints Constants** (`constants/endpoints/{resource}.endpoints.ts`)
   - Define all API endpoints
   - Use template functions for dynamic routes

7. **Create Fields Constants** (`constants/fields/{resource}.fields.ts`)
   - Define field names, labels, validation rules
   - Form field configurations
   - Filter field definitions

8. **Update API Routes** - Use schema validation and mappers

9. **Update Services** - Return UI schema types

10. **Create Documentation** (`docs/resources/{resource}.md`)
    - Complete resource guide for AI agents

## Best Practices

### ✅ DO

- Always validate inputs with Zod schemas
- Always use mappers in API routes
- Always use UI types in frontend
- Keep UI schemas display-focused
- Include null/undefined handling in mappers
- Add JSDoc comments to schemas
- Use consistent naming conventions

### ❌ DON'T

- Don't use backend types in components
- Don't return raw Firestore data from APIs
- Don't skip validation
- Don't duplicate type definitions
- Don't mix backend and UI concerns
- Don't use `any` types

## Examples

See the first implementations:
- `resources/product.schema.ts` - Resource schema example
- `ui/product.ui.ts` - UI schema example  
- `mappers/product.mapper.ts` - Mapper example

## Related Documentation

- [Migration Checklist](../../../SCHEMA-MIGRATION-CHECKLIST.md)
- [Type Organization](../types/README.md)
- [Resource Documentation](../../../docs/resources/README.md)
- [Service Layer Guide](../../../docs/project/02-SERVICE-LAYER-GUIDE.md)
