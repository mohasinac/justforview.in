/**
 * Blog Post UI Schema (Frontend)
 *
 * Defines the structure of Blog Post data as displayed in the UI.
 * Includes formatted values, computed fields, and display helpers.
 */

import type {
  PostStatus,
  PostCategory,
  Author,
} from "@/schemas/resources/blog-post.schema";

/**
 * Post Status Display
 */
export interface PostStatusDisplay {
  value: PostStatus;
  label: string;
  color: string;
  className: string;
  icon: string;
  description: string;
}

/**
 * Post Category Display
 */
export interface PostCategoryDisplay {
  value: PostCategory;
  label: string;
  icon: string;
  color: string;
}

/**
 * Engagement Stats
 */
export interface EngagementStats {
  viewCount: number;
  viewCountFormatted: string;
  likeCount: number;
  likeCountFormatted: string;
  commentCount: number;
  commentCountFormatted: string;
  shareCount: number;
  shareCountFormatted: string;
  totalEngagement: number;
  totalEngagementFormatted: string;
  engagementRate: string;
}

/**
 * Complete Blog Post UI Schema
 */
export interface BlogPostUI {
  // IDs
  id: string;
  slug: string;

  // Content
  title: string;
  excerpt: string;
  content: string;
  contentPreview: string;

  // Media
  featuredImage: string;
  images?: string[];
  hasImages: boolean;

  // Categorization
  category: PostCategoryDisplay;
  tags: string[];
  tagCount: number;

  // Author
  author: Author;
  authorName: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  // Status
  status: PostStatusDisplay;
  publishedAt?: Date;
  publishedAtFormatted?: string;
  scheduledFor?: Date;
  scheduledForFormatted?: string;
  isPublished: boolean;
  isScheduled: boolean;
  isDraft: boolean;
  isArchived: boolean;

  // Engagement
  stats: EngagementStats;
  readingTime: number;
  readingTimeLabel: string;

  // Backward compatibility for admin pages
  views: number; // alias for stats.viewCount
  likes: number; // alias for stats.likeCount
  showOnHomepage?: boolean; // flag for homepage display

  // Flags
  isFeatured: boolean;
  allowComments: boolean;

  // Related
  relatedPostIds?: string[];
  hasRelatedPosts: boolean;

  // URLs
  url: string;
  editUrl: string;
  shareUrl: string;

  // Badges
  badges: string[];

  // Timestamps
  createdAt: Date;
  createdAtFormatted: string;
  updatedAt: Date;
  updatedAtFormatted: string;
  age: string;
  publishAge?: string;
}

/**
 * Blog Post Card UI (Simplified for cards)
 */
export interface BlogPostCardUI {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: PostCategoryDisplay;
  author: Author;
  status: PostStatusDisplay;
  stats: {
    viewCount: number;
    viewCountFormatted: string;
    commentCount: number;
  };
  readingTime: number;
  readingTimeLabel: string;
  isFeatured: boolean;
  publishedAt?: Date;
  publishedAtFormatted?: string;
  url: string;
}

/**
 * Blog Post List Item UI
 */
export interface BlogPostListItemUI {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategoryDisplay;
  status: PostStatusDisplay;
  author: Author;
  viewCount: number;
  publishedAt?: Date;
  publishedAtFormatted?: string;
  url: string;
}

/**
 * Blog Post Form Data
 */
export interface BlogPostFormData {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  images?: string[];
  category: PostCategory;
  tags: string[];
  author: Author;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  status: PostStatus;
  scheduledFor?: Date;
  isFeatured?: boolean;
  allowComments?: boolean;
  readingTime: number;
}
