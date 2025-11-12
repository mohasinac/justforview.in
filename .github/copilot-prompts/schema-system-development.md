# Schema System Development Prompt

Use this prompt when working with AI assistants (GitHub Copilot, ChatGPT, Claude, etc.) to implement the resource schema system.

---

## 🎯 Primary Prompt

```
I'm working on JustForView.in, a Next.js auction platform with a new resource schema system.

PROJECT CONTEXT:
- Next.js 14+ with TypeScript and App Router
- Firebase (Firestore, Storage, Realtime DB, Auth)
- Service layer pattern (NO direct API calls in components)
- Zero mocks - all real APIs

SCHEMA SYSTEM ARCHITECTURE:
1. Backend Schema (src/schemas/resources/) - Firestore documents with Zod validation
2. UI Schema (src/schemas/ui/) - Frontend display models with formatted fields
3. Mapper (src/schemas/mappers/) - Backend → UI transformation
4. Endpoints (src/constants/endpoints/) - API endpoint constants
5. Fields (src/constants/fields/) - Field configurations for forms/tables
6. Types (src/types/) - Centralized TypeScript types

GOLDEN RULES:
- ✅ Frontend ALWAYS uses UI schemas (ProductUI, not Product)
- ✅ Backend uses resource schemas + mappers before responding
- ✅ Services return UI types and use endpoint constants
- ✅ All inputs validated with Zod schemas
- ✅ No hardcoded endpoints - use constants
- ✅ No re-exports - explicit imports only
- ✅ No `any` types

EXAMPLE STRUCTURE (Product resource completed as reference):
- src/schemas/resources/product.schema.ts
- src/schemas/ui/product.ui.ts
- src/schemas/mappers/product.mapper.ts
- src/constants/endpoints/product.endpoints.ts
- src/constants/fields/product.fields.ts

TASK: [Describe your specific task here]

Please follow the Product resource pattern and implement according to SCHEMA-MIGRATION-CHECKLIST.md.
```

---

## 📋 Specific Task Prompts

### For Creating a New Resource Schema

```
TASK: Create complete schema system for [RESOURCE_NAME] resource

REQUIREMENTS:
1. Backend Schema (src/schemas/resources/[resource].schema.ts):
   - Zod schema matching Firestore structure
   - Separate Create, Update, Filter schemas
   - All validation rules
   - Type inference

2. UI Schema (src/schemas/ui/[resource].ui.ts):
   - Display-focused interface
   - Formatted fields (prices, dates, status)
   - Computed fields (badges, displays)
   - Multiple variants (Full, Card, ListItem)

3. Mapper (src/schemas/mappers/[resource].mapper.ts):
   - mapResourceToUI() function
   - Format prices, dates, numbers
   - Generate badges and status displays
   - Handle null/undefined values

4. Endpoints (src/constants/endpoints/[resource].endpoints.ts):
   - Public, Seller, Admin endpoints
   - Route builder functions
   - Query string helpers
   - Filter types

5. Fields (src/constants/fields/[resource].fields.ts):
   - Form field definitions
   - Validation rules
   - Filter configurations
   - Sort options
   - Table columns
   - Bulk actions

REFERENCE: Use Product resource as template (src/schemas/resources/product.schema.ts)

DATABASE FIELDS FOR [RESOURCE_NAME]:
[Paste relevant fields from existing types/index.ts or database]
```

### For Updating API Routes

````
TASK: Update API route to use mapper and UI schema

FILE: src/app/api/[resource]/[route]/route.ts

CURRENT PATTERN (Wrong):
- Returns raw Firestore data
- No validation
- No UI transformation

REQUIRED PATTERN:
1. Import resource schema and mapper
2. Validate input with Zod schema (for POST/PATCH)
3. Perform Firestore operation
4. Map result to UI schema using mapper
5. Return UI schema in response

EXAMPLE:
```typescript
import { ProductSchema } from '@/schemas/resources/product.schema';
import { mapProductToUI } from '@/schemas/mappers/product.mapper';

export async function GET(req: Request, { params }) {
  const doc = await db.collection('products').doc(params.id).get();
  const product = ProductSchema.parse(doc.data());
  const uiProduct = mapProductToUI(product);
  return NextResponse.json({ product: uiProduct });
}
````

Please update the route following this pattern.

```

### For Updating Services

```

TASK: Update service to use endpoint constants and return UI types

FILE: src/services/[resource].service.ts

REQUIREMENTS:

1. Import endpoint constants:
   import { RESOURCE_ENDPOINTS } from '@/constants/endpoints/[resource].endpoints';

2. Import UI types:
   import type { ResourceUI } from '@/schemas/ui/[resource].ui';

3. Replace hardcoded routes with constants:

   - Before: `/products/${id}`
   - After: PRODUCT_ENDPOINTS.BY_ID(id)

4. Update return types to UI schemas:

   - Before: Promise<Product>
   - After: Promise<ProductUI>

5. Keep service layer abstraction:
   - Services don't do mapping (API does that)
   - Services just call APIs and return results

REFERENCE: See Product service pattern

```

### For Updating Components

```

TASK: Update component to use UI schema

FILE: src/components/[resource]/[Component].tsx

REQUIREMENTS:

1. Import UI type (not backend type):
   import type { ProductCardUI } from '@/schemas/ui/product.ui';

2. Update props interface:
   interface Props {
   product: ProductCardUI; // Use UI type
   }

3. Use formatted fields from UI schema:

   - product.price.formatted (not manual formatting)
   - product.stock.label (not conditional logic)
   - product.badges (pre-computed)
   - product.status.className (pre-computed styles)

4. Remove manual formatting logic:
   - No price formatting in component
   - No date formatting in component
   - No status label mapping in component

BENEFITS:

- Simpler components
- Consistent formatting
- Easier to maintain

Please update the component to use UI schema.

```

### For Creating Mapper Functions

```

TASK: Create mapper for [RESOURCE_NAME]

REQUIREMENTS:

1. Main mapper function:

   - mapResourceToUI(backend: Resource): ResourceUI
   - Transform all fields
   - Format dates with formatDate()
   - Format prices with formatPrice()
   - Generate badges with generateBadges()
   - Calculate computed fields

2. Helper functions:

   - formatPrice(amount: number): PriceDisplay
   - formatDate(date: Date): string
   - getStatusDisplay(status: string): StatusDisplay
   - generateBadges(resource: Resource): Badge[]

3. Simplified mappers:

   - mapResourceToCard(): Simplified for cards
   - mapResourceToListItem(): Simplified for lists

4. Bulk mappers:
   - mapResourcesToUI(resources: Resource[]): ResourceUI[]

FORMATTING PATTERNS:

- Prices: ₹1,999.99 format
- Dates: "Nov 12, 2025" format
- Status: { value, label, color, className }
- Stock: { count, inStock, isLow, label, className }
- Badges: Array of { text, color, className, icon }

REFERENCE: src/schemas/mappers/product.mapper.ts

```

### For Creating Field Constants

```

TASK: Create field constants for [RESOURCE_NAME]

FILE: src/constants/fields/[resource].fields.ts

REQUIREMENTS:

1. Field Definition Groups:

   - RESOURCE_BASIC_FIELDS - Basic info fields
   - RESOURCE_PRICING_FIELDS - Pricing fields (if applicable)
   - RESOURCE_STATUS_FIELDS - Status and flags
   - etc. (organize logically)

2. Each field definition includes:

   - name: string
   - label: string (UI label)
   - type: 'text' | 'textarea' | 'number' | 'select' | 'boolean' | 'date' | 'file'
   - required: boolean
   - placeholder?: string
   - helperText?: string
   - validation?: { min, max, minLength, maxLength, pattern }
   - options?: Array<{ label, value }> (for select)

3. Filter Fields:

   - RESOURCE_FILTER_FIELDS - Filter configurations

4. Sort Options:

   - RESOURCE_SORT_OPTIONS - Sort dropdown options

5. Table Columns:

   - RESOURCE_TABLE_COLUMNS - Column definitions

6. Bulk Actions:
   - RESOURCE_BULK_ACTIONS - Bulk operation options

REFERENCE: src/constants/fields/product.fields.ts

```

---

## 🔍 Debugging Prompts

### When Getting Type Errors

```

I'm getting TypeScript errors in the schema system migration.

ERROR: [Paste error message]

FILE: [File path]

CONTEXT:

- Using schema system with backend/UI separation
- Backend uses Product, UI uses ProductUI
- Services should return UI types
- Components should use UI types
- API routes should map backend → UI

Please help me fix this following the schema system rules:

- Frontend = UI schemas
- Backend = resource schemas + mappers
- No mixing backend types in frontend

```

### When Data Isn't Displaying Correctly

```

Data is not displaying correctly after schema migration.

ISSUE: [Describe the issue]

COMPONENT: [Component name]
SERVICE: [Service name]
API ROUTE: [API route]

CHECKLIST:

- [ ] API route uses mapper before responding?
- [ ] Service returns UI type?
- [ ] Component imports UI type?
- [ ] Component uses formatted fields (price.formatted not manual format)?

Please help me debug this following the data flow:
Firestore → API (validate + map) → Service (pass through) → Component (display)

```

---

## 📚 Reference Files to Include

When asking for help, mention these files:

```

REFERENCE FILES:

- SCHEMA-MIGRATION-CHECKLIST.md - Overall plan
- docs/SCHEMA-SYSTEM-SUMMARY.md - Quick overview
- docs/SCHEMA-QUICK-REFERENCE.md - Code examples
- src/schemas/README.md - Schema system guide
- src/schemas/resources/product.schema.ts - Example backend schema
- src/schemas/ui/product.ui.ts - Example UI schema
- src/schemas/mappers/product.mapper.ts - Example mapper

```

---

## ✅ Checklist for AI Assistant

When working with AI, ensure it:

- [ ] Reads the Product example first
- [ ] Follows exact file naming conventions
- [ ] Uses explicit imports (no re-exports)
- [ ] Adds JSDoc comments
- [ ] Validates all inputs with Zod
- [ ] Maps all API responses to UI schemas
- [ ] Uses endpoint constants (no hardcoded strings)
- [ ] Returns UI types from services
- [ ] Uses UI types in components
- [ ] Formats all display values in mappers
- [ ] Handles null/undefined properly
- [ ] Includes all required sections (Basic, Pricing, Status, etc.)

---

## 🚀 Quick Start for AI Assistant

```

Read these files in order:

1. docs/SCHEMA-SYSTEM-SUMMARY.md - Understand the system
2. src/schemas/resources/product.schema.ts - Backend schema example
3. src/schemas/ui/product.ui.ts - UI schema example
4. src/schemas/mappers/product.mapper.ts - Mapper example
5. SCHEMA-MIGRATION-CHECKLIST.md - Find my current task

Then implement [RESOURCE_NAME] following the exact Product pattern.

```

---

## 📝 Template Request

```

Create complete schema system for [RESOURCE_NAME] following the Product example.

RESOURCE DETAILS:
Database Collection: [collection_name]
Existing Type: src/types/index.ts - [TypeName]
Priority: [High/Medium/Low]

DELIVERABLES:

1. Backend schema with Zod validation
2. UI schema with display types
3. Mapper with formatters
4. Endpoint constants
5. Field constants

Follow these exactly:

- File naming: [resource].schema.ts, [resource].ui.ts, etc.
- No re-exports
- Explicit imports
- JSDoc comments
- Product as reference

Start with backend schema, then UI schema, then mapper, then constants.

```

---

**Last Updated**: November 12, 2025
**For**: AI-Assisted Development of Schema System
```
