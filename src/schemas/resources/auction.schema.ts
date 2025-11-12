/**
 * Auction Resource Schema
 * Backend database schema with Zod validation
 */

import { z } from "zod";

/**
 * Auction Status Enum
 */
export const AuctionStatusEnum = z.enum([
  "draft",
  "scheduled",
  "live",
  "ended",
  "cancelled",
]);

export type AuctionStatus = z.infer<typeof AuctionStatusEnum>;

/**
 * Main Auction Schema (Firestore Document)
 */
export const AuctionSchema = z.object({
  id: z.string().min(1),
  shopId: z.string().min(1),

  // Basic info
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(250),
  description: z.string().min(10).max(5000),

  // Media
  images: z.array(z.string().url()).min(1).max(10),
  videos: z.array(z.string().url()).max(5).optional(),

  // Bidding
  startingBid: z.number().positive(),
  reservePrice: z.number().positive().optional(),
  currentBid: z.number().nonnegative(),
  bidCount: z.number().int().nonnegative(),

  // Timing
  startTime: z.date(),
  endTime: z.date(),

  // Winner
  winnerId: z.string().optional(),
  finalBid: z.number().positive().optional(),

  // Status
  status: AuctionStatusEnum,

  // Flags
  isFeatured: z.boolean(),
  showOnHomepage: z.boolean(),
  featuredPriority: z.number().int().min(0).max(100).optional(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Auction = z.infer<typeof AuctionSchema>;

/**
 * Create Auction Schema (for POST requests)
 */
export const CreateAuctionSchema = AuctionSchema.omit({
  id: true,
  currentBid: true,
  bidCount: true,
  winnerId: true,
  finalBid: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  currentBid: z.number().nonnegative().default(0),
  bidCount: z.number().int().nonnegative().default(0),
});

export type CreateAuction = z.infer<typeof CreateAuctionSchema>;

/**
 * Update Auction Schema (for PATCH requests)
 */
export const UpdateAuctionSchema = AuctionSchema.partial().extend({
  id: z.string().min(1),
});

export type UpdateAuction = z.infer<typeof UpdateAuctionSchema>;

/**
 * Auction Filter Schema
 */
export const AuctionFilterSchema = z.object({
  shopId: z.string().optional(),
  status: AuctionStatusEnum.optional(),
  isFeatured: z.boolean().optional(),
  showOnHomepage: z.boolean().optional(),
  minBid: z.number().positive().optional(),
  maxBid: z.number().positive().optional(),
  startAfter: z.date().optional(),
  endBefore: z.date().optional(),
});

export type AuctionFilter = z.infer<typeof AuctionFilterSchema>;

/**
 * Bid Schema
 */
export const BidSchema = z.object({
  id: z.string().min(1),
  auctionId: z.string().min(1),
  userId: z.string().min(1),
  bidAmount: z.number().positive(),
  bidTime: z.date(),
  isWinning: z.boolean(),
  isAutoBid: z.boolean(),
  maxAutoBid: z.number().positive().optional(),
});

export type Bid = z.infer<typeof BidSchema>;

/**
 * Place Bid Schema
 */
export const PlaceBidSchema = z.object({
  auctionId: z.string().min(1),
  bidAmount: z.number().positive(),
  isAutoBid: z.boolean().default(false),
  maxAutoBid: z.number().positive().optional(),
});

export type PlaceBid = z.infer<typeof PlaceBidSchema>;

/**
 * Validation Helpers
 */

export const validateAuction = (data: unknown) => {
  return AuctionSchema.parse(data);
};

export const validateCreateAuction = (data: unknown) => {
  return CreateAuctionSchema.parse(data);
};

export const validateUpdateAuction = (data: unknown) => {
  return UpdateAuctionSchema.parse(data);
};

export const validateAuctionFilter = (data: unknown) => {
  return AuctionFilterSchema.parse(data);
};

export const validatePlaceBid = (data: unknown) => {
  return PlaceBidSchema.parse(data);
};
