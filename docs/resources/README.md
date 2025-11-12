# Resource Documentation

This directory contains comprehensive documentation for each resource/feature in JustForView.in, specifically designed for AI agents to quickly understand and work with the codebase.

## Purpose

Each resource document provides:

1. **Complete Schema Definitions** - Backend and UI schemas with all fields
2. **Relationships** - How the resource relates to other resources
3. **API Endpoints** - All available endpoints with examples
4. **Service Methods** - How to use the service layer
5. **Component Patterns** - Common UI patterns for the resource
6. **Field Definitions** - Complete field list with types and validation
7. **Filters & Sorting** - Available filters and sort options
8. **Bulk Actions** - Supported bulk operations
9. **Business Logic** - Important rules and constraints
10. **Examples** - Real-world usage examples

## Available Resources

### Core Business Resources

- **[product.md](./product.md)** - Product catalog management
- **[auction.md](./auction.md)** - Auction system with real-time bidding
- **[category.md](./category.md)** - Hierarchical product categories
- **[shop.md](./shop.md)** - Multi-vendor shop management
- **[order.md](./order.md)** - Order lifecycle and fulfillment

### User & Auth Resources

- **[user.md](./user.md)** - User profiles and authentication
- **[address.md](./address.md)** - User address management

### Review & Rating Resources

- **[review.md](./review.md)** - Product and shop reviews

### Marketing Resources

- **[coupon.md](./coupon.md)** - Discount codes and promotions
- **[hero-slide.md](./hero-slide.md)** - Homepage hero carousel

### Support Resources

- **[support-ticket.md](./support-ticket.md)** - Customer support system
- **[return.md](./return.md)** - Return and refund requests

### Financial Resources

- **[payment.md](./payment.md)** - Payment processing
- **[payout.md](./payout.md)** - Seller payout management

### Content Resources

- **[blog-post.md](./blog-post.md)** - Blog content management

## Document Template

Each resource document follows this structure:

```markdown
# {Resource Name} Resource

Brief description of the resource and its purpose.

## Schema Definitions

### Backend Schema (Firestore)
Complete Zod schema with all fields

### UI Schema (Frontend)
Display-focused schema with computed fields

### Type Definitions
TypeScript interfaces

## Relationships

How this resource relates to others

## API Endpoints

### List Endpoints
GET /api/{resources}

### CRUD Endpoints  
GET, POST, PATCH, DELETE

### Action Endpoints
Special actions for this resource

## Service Methods

How to use the service layer

## Components

Common UI patterns and components

## Fields Reference

Complete field list with:
- Field name
- Type
- Required/Optional
- Validation rules
- Description
- UI label

## Filters & Sorting

Available filter options and sort fields

## Bulk Actions

Supported bulk operations

## Business Logic & Rules

Important constraints and validation rules

## Examples

Real-world usage examples

## Related Resources

Links to related documentation
```

## For AI Agents

When working with a specific resource:

1. **Read the resource doc first** - Get complete context
2. **Check schema definitions** - Understand data structure
3. **Review relationships** - See how it connects to other resources
4. **Use correct schemas** - Backend in API routes, UI in components
5. **Follow patterns** - Use existing component patterns
6. **Consult examples** - See real implementations

## Quick Reference

### Finding Documentation

**By Feature**:
- User registration → `user.md`
- Product listing → `product.md`
- Auction bidding → `auction.md`
- Order processing → `order.md`
- Shop management → `shop.md`

**By Operation**:
- CRUD operations → Check resource's "API Endpoints" section
- Filtering → Check resource's "Filters & Sorting" section
- Bulk actions → Check resource's "Bulk Actions" section
- Validation → Check resource's "Fields Reference" section

**By Component Type**:
- Cards → Check resource's "Components" section
- Forms → Check resource's "Components" section
- Lists → Check resource's "Components" section

## Contributing

When adding a new resource:

1. Copy the template structure
2. Fill in all sections completely
3. Include real code examples
4. Add relationship diagram if complex
5. Keep examples up-to-date with actual code

## Maintenance

Resource documentation should be updated when:

- Schema changes (fields added/removed/modified)
- New endpoints added
- New filters or sort options added
- New bulk actions added
- Business rules change
- Component patterns evolve

## Related Documentation

- [Schema System](../../src/schemas/README.md)
- [Type Organization](../../src/types/README.md)
- [Migration Checklist](../../SCHEMA-MIGRATION-CHECKLIST.md)
- [AI Agent Guide](../ai/AI-AGENT-GUIDE.md)
- [Service Layer Guide](../project/02-SERVICE-LAYER-GUIDE.md)

---

**Last Updated**: November 12, 2025  
**Maintainer**: Development Team
