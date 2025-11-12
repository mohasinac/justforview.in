/**
 * Review Resource Schema
 * Backend database schema with Zod validation
 */

import { z } from "zod";

/**
 * Main Review Schema (Firestore Document)
 */
export const ReviewSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  productId: z.string().min(1).optional(),
  shopId: z.string().min(1).optional(),
  auctionId: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  orderItemId: z.string().min(1).optional(),

  // Content
  rating: z.number().int().min(1).max(5),
  title: z.string().max(200).optional(),
  comment: z.string().min(10).max(2000),
  media: z.array(z.string().url()).max(5).optional(),

  // Verification
  verifiedPurchase: z.boolean(),

  // Engagement
  helpfulCount: z.number().int().nonnegative(),

  // Flags
  isFeatured: z.boolean(),
  showOnHomepage: z.boolean(),

  // Moderation
  isApproved: z.boolean(),
  moderatedAt: z.date().optional(),
  moderatedBy: z.string().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Review = z.infer<typeof ReviewSchema>;

/**
 * Create Review Schema (for POST requests)
 */
export const CreateReviewSchema = ReviewSchema.omit({
  id: true,
  helpfulCount: true,
  isFeatured: true,
  showOnHomepage: true,
  isApproved: true,
  moderatedAt: true,
  moderatedBy: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  helpfulCount: z.number().int().nonnegative().default(0),
  isFeatured: z.boolean().default(false),
  showOnHomepage: z.boolean().default(false),
  isApproved: z.boolean().default(false),
});

export type CreateReview = z.infer<typeof CreateReviewSchema>;

/**
 * Update Review Schema (for PATCH requests)
 */
export const UpdateReviewSchema = ReviewSchema.partial().extend({
  id: z.string().min(1),
});

export type UpdateReview = z.infer<typeof UpdateReviewSchema>;

/**
 * Review Filter Schema
 */
export const ReviewFilterSchema = z.object({
  userId: z.string().optional(),
  productId: z.string().optional(),
  shopId: z.string().optional(),
  auctionId: z.string().optional(),
  categoryId: z.string().optional(),
  minRating: z.number().int().min(1).max(5).optional(),
  maxRating: z.number().int().min(1).max(5).optional(),
  verifiedPurchase: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isApproved: z.boolean().optional(),
});

export type ReviewFilter = z.infer<typeof ReviewFilterSchema>;

/**
 * Validation Helpers
 */

export const validateReview = (data: unknown) => {
  return ReviewSchema.parse(data);
};

export const validateCreateReview = (data: unknown) => {
  return CreateReviewSchema.parse(data);
};

export const validateUpdateReview = (data: unknown) => {
  return UpdateReviewSchema.parse(data);
};

export const validateReviewFilter = (data: unknown) => {
  return ReviewFilterSchema.parse(data);
};
