# Category Resource

Hierarchical product categorization with unlimited depth, featured categories, and SEO.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/category.schema.ts` - Firestore category documents
- Snake_case fields (parent_id, product_count, is_featured)
- Hierarchy: parent_id, level, path

### UI Schema

- `src/schemas/ui/category.ui.ts` - Frontend display with tree structure
- CamelCase fields (parentId, productCount, isFeatured)
- Nested objects: hierarchy{parentId, level, path, ancestors[]}, seo, metadata
- Computed fields: fullPath, breadcrumbs, hasChildren, childCount

### Mapper

- `src/schemas/mappers/category.mapper.ts` - Backend → UI + tree building
- Functions: mapCategoryToUI, buildCategoryTree

## API Endpoints

- GET `/api/categories` - List with filters
- GET `/api/categories/[slug]` - Category detail
- GET `/api/categories/tree` - Full category tree
- GET `/api/categories/featured` - Featured categories
- GET `/api/categories/homepage` - Homepage display categories
- GET `/api/categories/leaves` - Leaf categories (no children)
- GET `/api/categories/search` - Search by name/description

## Service Layer

- `src/services/categories.service.ts` - Returns CategoryUI types
- Methods: list(), getBySlug(), getTree(), getFeatured(), getLeaves()

## Fields Reference

**Core**: id, slug, name, description
**Hierarchy**: parentId, level, path, ancestors[], children[]
**Counts**: productCount, childCount
**Media**: image, icon
**Display**: displayOrder, showOnHomepage, isFeatured
**SEO**: metaTitle, metaDescription, metaKeywords
**Status**: isActive, isPublished
**Timestamps**: createdAt, updatedAt

## Filters

- Parent category, level, featured, active, has products

## Related Resources

- Product (categorized products)
- Category (parent/children)
