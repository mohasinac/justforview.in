# Hero Slide Resource

Homepage carousel/banner management with scheduling and targeting.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/hero-slide.schema.ts` - Firestore hero_slides collection
- Snake_case fields (image_url, cta_text, cta_url, display_order)

### UI Schema

- `src/schemas/ui/hero-slide.ui.ts` - Frontend display with formatted fields
- CamelCase fields (imageUrl, ctaText, ctaUrl, displayOrder)
- Nested objects: media{image, mobileImage, video}, cta{text, url, variant}
- Computed fields: isActive, isScheduled

### Mapper

- `src/schemas/mappers/hero-slide.mapper.ts` - Backend → UI transformation
- Functions: mapHeroSlideToUI, mapHeroSlidesToUI

## API Endpoints

- GET `/api/homepage/hero-slides` - Active homepage slides (ordered)
- GET `/api/admin/hero-slides` - Admin list
- GET `/api/admin/hero-slides/[id]` - Admin detail
- POST `/api/admin/hero-slides` - Create slide
- PATCH `/api/admin/hero-slides/[id]` - Update slide
- DELETE `/api/admin/hero-slides/[id]` - Delete slide

## Service Layer

- `src/services/hero-slide.service.ts` - Returns HeroSlideUI types
- Methods: getActive(), list(), getById(), create(), update(), delete()

## Fields Reference

**Core**: id, title, subtitle, description
**Media**: imageUrl, mobileImageUrl, videoUrl, altText
**CTA**: ctaText, ctaUrl, ctaVariant (primary/secondary/outline)
**Display**: displayOrder, showOnMobile, showOnDesktop
**Scheduling**: startDate, endDate
**Targeting**: targetAudience (all/new/registered), targetLocation[]
**Status**: isActive, isPublished
**Timestamps**: createdAt, updatedAt

## Filters

- Active, published, date range, target audience

## Related Resources

- None (standalone content)
