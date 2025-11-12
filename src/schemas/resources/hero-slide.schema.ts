/**
 * Hero Slide Resource Schema (Backend/Firestore)
 *
 * Defines the structure of Hero Slide documents as stored in Firestore.
 * Used for validation, type inference, and database operations.
 */

import { z } from "zod";

/**
 * Slide Type Enum
 */
export const SlideTypeEnum = z.enum(["image", "video", "product", "category"]);
export type SlideType = z.infer<typeof SlideTypeEnum>;

/**
 * Slide Status Enum
 */
export const SlideStatusEnum = z.enum([
  "draft",
  "active",
  "scheduled",
  "inactive",
]);
export type SlideStatus = z.infer<typeof SlideStatusEnum>;

/**
 * Button Action Schema
 */
export const ButtonActionSchema = z.object({
  text: z.string().min(1, "Button text is required"),
  url: z.string().url("Invalid URL"),
  openInNewTab: z.boolean().default(false),
});
export type ButtonAction = z.infer<typeof ButtonActionSchema>;

/**
 * Complete Hero Slide Schema (Firestore Document)
 */
export const HeroSlideSchema = z.object({
  // IDs
  id: z.string(),

  // Basic Info
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  subtitle: z.string().max(200).optional(),
  description: z.string().max(500).optional(),

  // Type & Content
  type: SlideTypeEnum,
  imageUrl: z.string().url("Invalid image URL"),
  mobileImageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),

  // Links
  linkUrl: z.string().url().optional(),
  buttonAction: ButtonActionSchema.optional(),

  // Related Entities
  productId: z.string().optional(),
  categoryId: z.string().optional(),
  shopId: z.string().optional(),

  // Display Settings
  textPosition: z.enum(["left", "center", "right"]).default("left"),
  textColor: z.string().default("#FFFFFF"),
  overlayColor: z.string().optional(),
  overlayOpacity: z.number().min(0).max(1).default(0.3),

  // Ordering
  order: z.number().int().min(0).default(0),

  // Status & Scheduling
  status: SlideStatusEnum,
  startDate: z.date().optional(),
  endDate: z.date().optional(),

  // Flags
  isActive: z.boolean().default(true),
  showOnMobile: z.boolean().default(true),

  // Stats
  viewCount: z.number().int().min(0).default(0),
  clickCount: z.number().int().min(0).default(0),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type HeroSlide = z.infer<typeof HeroSlideSchema>;

/**
 * Create Hero Slide Schema
 */
export const CreateHeroSlideSchema = HeroSlideSchema.omit({
  id: true,
  viewCount: true,
  clickCount: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  status: SlideStatusEnum.default("draft"),
});

export type CreateHeroSlide = z.infer<typeof CreateHeroSlideSchema>;

/**
 * Update Hero Slide Schema
 */
export const UpdateHeroSlideSchema = HeroSlideSchema.partial().required({
  id: true,
});

export type UpdateHeroSlide = z.infer<typeof UpdateHeroSlideSchema>;

/**
 * Hero Slide Filter Schema
 */
export const HeroSlideFilterSchema = z.object({
  status: SlideStatusEnum.optional(),
  type: SlideTypeEnum.optional(),
  isActive: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sort: z.enum(["order", "newest", "oldest", "clicks"]).default("order"),
});

export type HeroSlideFilter = z.infer<typeof HeroSlideFilterSchema>;

/**
 * Validation helper functions
 */
export function validateHeroSlide(data: unknown): HeroSlide {
  return HeroSlideSchema.parse(data);
}

export function validateCreateHeroSlide(data: unknown): CreateHeroSlide {
  return CreateHeroSlideSchema.parse(data);
}

export function validateUpdateHeroSlide(data: unknown): UpdateHeroSlide {
  return UpdateHeroSlideSchema.parse(data);
}

export function validateHeroSlideFilter(data: unknown): HeroSlideFilter {
  return HeroSlideFilterSchema.parse(data);
}
