# TypeScript Types Organization

This directory contains all TypeScript type definitions for JustForView.in, organized by concern.

## Directory Structure

```
types/
├── entities/       # Backend database entity types
├── ui/             # Frontend UI component types
├── api/            # API request/response types
├── components/     # Component prop types
└── shared/         # Shared/common types
```

## Purpose

Centralized type management provides:

1. **Single Source of Truth** - All types in one place
2. **Clear Separation** - Backend vs Frontend types are distinct
3. **Easy Discovery** - Know exactly where to find types
4. **No Duplication** - Reuse types across the application
5. **Better Maintainability** - Update types in one location

## Type Categories

### Entities (`entities/`)

**Backend database entity types** - Represent data as stored in Firestore.

```typescript
// types/entities/product.types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  stockCount: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductStatus = 'draft' | 'published' | 'archived';
```

**When to use**: In API routes, Firestore operations, backend services

**Do not use**: In components, UI logic, or frontend pages

### UI (`ui/`)

**Frontend display types** - Represent data as shown to users.

```typescript
// types/ui/product.ui.types.ts
export interface ProductUI {
  id: string;
  displayName: string;
  formattedPrice: string;
  discount?: {
    percentage: number;
    label: string;
  };
  stockStatus: {
    isLow: boolean;
    label: string;
    className: string;
  };
  badge?: {
    text: string;
    color: string;
  };
}
```

**When to use**: In components, pages, hooks, contexts

**Do not use**: In API routes, backend services

### API (`api/`)

**API request/response types** - Represent data sent/received via HTTP.

```typescript
// types/api/product.api.types.ts
export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
}

export interface GetProductsResponse {
  products: ProductUI[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface ProductFilters {
  status?: ProductStatus;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}
```

**When to use**: In services, API route handlers, form submissions

### Components (`components/`)

**Component-specific prop types** - Represent React component interfaces.

```typescript
// types/components/cards.types.ts
export interface CardProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface ProductCardProps extends CardProps {
  product: ProductUI;
  onAddToCart?: (productId: string) => void;
  onFavorite?: (productId: string) => void;
  showActions?: boolean;
}

// types/components/forms.types.ts
export interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: CreateProductRequest) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}
```

**When to use**: For component props, event handlers, component state

### Shared (`shared/`)

**Common types used across layers** - Generic, reusable types.

```typescript
// types/shared/pagination.types.ts
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// types/shared/filters.types.ts
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
  icon?: string;
}

export interface SortOption {
  label: string;
  value: string;
  order: 'asc' | 'desc';
}

// types/shared/responses.types.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: Record<string, any>;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}
```

**When to use**: Everywhere - these are generic utilities

## Import Guidelines

### ✅ DO - Use Explicit Imports

```typescript
// ✅ Import specific types
import type { ProductUI } from '@/types/ui/product.ui.types';
import type { CreateProductRequest } from '@/types/api/product.api.types';
import type { PaginatedResponse } from '@/types/shared/pagination.types';
```

### ❌ DON'T - Use Index Re-exports

```typescript
// ❌ Don't use barrel exports
import { ProductUI } from '@/types'; // No re-exports allowed
```

## File Naming Convention

### Entity Types
- `{resource}.types.ts` - Main entity type
- Example: `product.types.ts`, `auction.types.ts`, `shop.types.ts`

### UI Types
- `{resource}.ui.types.ts` - UI display types
- Example: `product.ui.types.ts`, `auction.ui.types.ts`

### API Types
- `{resource}.api.types.ts` - API request/response types
- Example: `product.api.types.ts`, `auction.api.types.ts`

### Component Types
- `{component-category}.types.ts` - Component prop types
- Example: `cards.types.ts`, `forms.types.ts`, `modals.types.ts`

### Shared Types
- `{concept}.types.ts` - Generic utility types
- Example: `pagination.types.ts`, `filters.types.ts`, `responses.types.ts`

## Type Derivation

Types can be derived from Zod schemas:

```typescript
// schemas/resources/product.schema.ts
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  status: z.enum(['draft', 'published', 'archived']),
});

// types/entities/product.types.ts
import { z } from 'zod';
import { ProductSchema } from '@/schemas/resources/product.schema';

export type Product = z.infer<typeof ProductSchema>;
```

## Best Practices

### ✅ DO

- Keep types in the correct category directory
- Use explicit imports (no barrel exports)
- Add JSDoc comments for complex types
- Derive types from schemas when possible
- Use `type` for unions/primitives, `interface` for objects
- Export types with descriptive names

### ❌ DON'T

- Don't mix entity and UI types in same file
- Don't create barrel exports (index.ts files)
- Don't use `any` type (use `unknown` if needed)
- Don't duplicate type definitions
- Don't use inline types in components (extract to types files)

## Migration from Old Structure

The old `src/types/index.ts` is deprecated. Types should be moved to appropriate directories:

```typescript
// Old (deprecated)
import { Product, ProductUI, CreateProductRequest } from '@/types';

// New (correct)
import type { Product } from '@/types/entities/product.types';
import type { ProductUI } from '@/types/ui/product.ui.types';
import type { CreateProductRequest } from '@/types/api/product.api.types';
```

## Examples

### Example 1: Component with Multiple Type Sources

```typescript
// Component using types from multiple sources
import type { ProductUI } from '@/types/ui/product.ui.types';
import type { ProductCardProps } from '@/types/components/cards.types';
import type { FilterOption } from '@/types/shared/filters.types';

interface Props extends ProductCardProps {
  filters: FilterOption[];
}

export function FilterableProductCard({ product, filters, ...props }: Props) {
  // Component implementation
}
```

### Example 2: Service with API Types

```typescript
// Service using API types
import type { ProductUI } from '@/types/ui/product.ui.types';
import type { 
  CreateProductRequest, 
  GetProductsResponse,
  ProductFilters 
} from '@/types/api/product.api.types';

class ProductService {
  async getProducts(filters?: ProductFilters): Promise<GetProductsResponse> {
    // Implementation
  }

  async createProduct(data: CreateProductRequest): Promise<ProductUI> {
    // Implementation
  }
}
```

### Example 3: API Route with Entity Types

```typescript
// API route using entity types and mapper
import type { Product } from '@/types/entities/product.types';
import { ProductSchema } from '@/schemas/resources/product.schema';
import { mapProductToUI } from '@/schemas/mappers/product.mapper';

export async function GET(req: Request) {
  const doc = await db.collection('products').doc(id).get();
  const product = doc.data() as Product;
  
  const uiProduct = mapProductToUI(product);
  return NextResponse.json({ product: uiProduct });
}
```

## Related Documentation

- [Schema System](../schemas/README.md)
- [Migration Checklist](../../SCHEMA-MIGRATION-CHECKLIST.md)
- [Service Layer Guide](../../docs/project/02-SERVICE-LAYER-GUIDE.md)
