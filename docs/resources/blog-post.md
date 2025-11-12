# Blog Post Resource

Blog content management with categories, tags, and SEO optimization.

## Schema Definitions

### Backend Schema

- `src/schemas/resources/blog-post.schema.ts` - Firestore blog_posts collection
- Snake_case fields (author_id, featured_image, publish_date)
- Status: draft, published, scheduled, archived

### UI Schema

- `src/schemas/ui/blog-post.ui.ts` - Frontend display with author info
- CamelCase fields (authorId, featuredImage, publishDate)
- Nested objects: author, category, tags[], seo, metadata
- Computed fields: excerpt, readTime, formattedDate, isPublished

### Mapper

- `src/schemas/mappers/blog-post.mapper.ts` - Backend → UI transformation
- Functions: mapBlogPostToUI, mapBlogPostsToUI

## API Endpoints

- GET `/api/blog` - List blog posts
- GET `/api/blog/[slug]` - Blog post detail
- POST `/api/admin/blog` - Create post
- PATCH `/api/admin/blog/[id]` - Update post
- DELETE `/api/admin/blog/[id]` - Delete post

## Service Layer

- `src/services/blog.service.ts` - Returns BlogPostUI types
- Methods: list(), getBySlug(), create(), update(), delete()

## Fields Reference

**Core**: id, slug, title, content, excerpt
**Author**: authorId, authorName, authorAvatar
**Media**: featuredImage, images[], videos[]
**Categorization**: categoryId, categoryName, tags[]
**SEO**: metaTitle, metaDescription, metaKeywords, ogImage
**Status**: status (draft/published/scheduled/archived), isFeatured
**Engagement**: viewCount, likeCount, commentCount
**Scheduling**: publishDate, scheduledAt
**Timestamps**: createdAt, updatedAt, publishedAt

## Filters

- Status, category, tags, author, featured, date range

## Related Resources

- User (author)
- Category (blog categories)
