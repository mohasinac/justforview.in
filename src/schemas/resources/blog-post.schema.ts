/**
 * Blog Post Resource Schema (Backend/Firestore)
 *
 * Defines the structure of Blog Post documents as stored in Firestore.
 * Used for validation, type inference, and database operations.
 */

import { z } from "zod";

/**
 * Post Status Enum
 */
export const PostStatusEnum = z.enum([
  "draft",
  "published",
  "scheduled",
  "archived",
]);
export type PostStatus = z.infer<typeof PostStatusEnum>;

/**
 * Post Category Enum
 */
export const PostCategoryEnum = z.enum([
  "guides",
  "tips",
  "news",
  "updates",
  "announcements",
  "tutorials",
]);
export type PostCategory = z.infer<typeof PostCategoryEnum>;

/**
 * Author Schema
 */
export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
});
export type Author = z.infer<typeof AuthorSchema>;

/**
 * Complete Blog Post Schema (Firestore Document)
 */
export const BlogPostSchema = z.object({
  // IDs
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Invalid slug format"),

  // Content
  title: z.string().min(10, "Title must be at least 10 characters"),
  excerpt: z.string().min(50, "Excerpt must be at least 50 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),

  // Media
  featuredImage: z.string().url(),
  images: z.array(z.string().url()).optional(),

  // Categorization
  category: PostCategoryEnum,
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed"),

  // Author
  author: AuthorSchema,

  // SEO
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).optional(),

  // Status
  status: PostStatusEnum,
  publishedAt: z.date().optional(),
  scheduledFor: z.date().optional(),

  // Engagement
  viewCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),

  // Reading
  readingTime: z.number().int().positive(),

  // Flags
  isFeatured: z.boolean().default(false),
  allowComments: z.boolean().default(true),

  // Related
  relatedPostIds: z.array(z.string()).optional(),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

/**
 * Create Blog Post Schema
 */
export const CreateBlogPostSchema = BlogPostSchema.omit({
  id: true,
  slug: true,
  viewCount: true,
  likeCount: true,
  commentCount: true,
  shareCount: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  status: PostStatusEnum.default("draft"),
});

export type CreateBlogPost = z.infer<typeof CreateBlogPostSchema>;

/**
 * Update Blog Post Schema
 */
export const UpdateBlogPostSchema = BlogPostSchema.partial().required({
  id: true,
});

export type UpdateBlogPost = z.infer<typeof UpdateBlogPostSchema>;

/**
 * Blog Post Filter Schema
 */
export const BlogPostFilterSchema = z.object({
  status: PostStatusEnum.optional(),
  category: PostCategoryEnum.optional(),
  tag: z.string().optional(),
  authorId: z.string().optional(),
  isFeatured: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sort: z.enum(["newest", "oldest", "popular", "trending"]).default("newest"),
});

export type BlogPostFilter = z.infer<typeof BlogPostFilterSchema>;

/**
 * Validation helper functions
 */
export function validateBlogPost(data: unknown): BlogPost {
  return BlogPostSchema.parse(data);
}

export function validateCreateBlogPost(data: unknown): CreateBlogPost {
  return CreateBlogPostSchema.parse(data);
}

export function validateUpdateBlogPost(data: unknown): UpdateBlogPost {
  return UpdateBlogPostSchema.parse(data);
}

export function validateBlogPostFilter(data: unknown): BlogPostFilter {
  return BlogPostFilterSchema.parse(data);
}
