/**
 * Blog Post Mapper
 *
 * Transforms Blog Post data between backend (Firestore) and frontend (UI) formats.
 */

import type { BlogPost } from "@/schemas/resources/blog-post.schema";
import type {
  BlogPostUI,
  BlogPostCardUI,
  BlogPostListItemUI,
  PostStatusDisplay,
  PostCategoryDisplay,
  EngagementStats,
} from "@/schemas/ui/blog-post.ui";

/**
 * Format number
 */
function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

/**
 * Format date
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Get time ago
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

  return formatDate(date);
}

/**
 * Get post status display
 */
function getPostStatusDisplay(status: BlogPost["status"]): PostStatusDisplay {
  const statusMap: Record<
    BlogPost["status"],
    {
      label: string;
      color: string;
      className: string;
      icon: string;
      description: string;
    }
  > = {
    draft: {
      label: "Draft",
      color: "#9CA3AF",
      className: "bg-gray-100 text-gray-800",
      icon: "edit",
      description: "Not published yet",
    },
    published: {
      label: "Published",
      color: "#10B981",
      className: "bg-green-100 text-green-800",
      icon: "check_circle",
      description: "Live on website",
    },
    scheduled: {
      label: "Scheduled",
      color: "#3B82F6",
      className: "bg-blue-100 text-blue-800",
      icon: "schedule",
      description: "Scheduled for future",
    },
    archived: {
      label: "Archived",
      color: "#F59E0B",
      className: "bg-amber-100 text-amber-800",
      icon: "archive",
      description: "Archived post",
    },
  };

  return {
    value: status,
    ...statusMap[status],
  };
}

/**
 * Get post category display
 */
function getPostCategoryDisplay(
  category: BlogPost["category"]
): PostCategoryDisplay {
  const categoryMap: Record<
    BlogPost["category"],
    { label: string; icon: string; color: string }
  > = {
    guides: { label: "Guides", icon: "book", color: "#3B82F6" },
    tips: {
      label: "Tips & Tricks",
      icon: "tips_and_updates",
      color: "#F59E0B",
    },
    news: { label: "News", icon: "newspaper", color: "#EF4444" },
    updates: { label: "Updates", icon: "update", color: "#10B981" },
    announcements: {
      label: "Announcements",
      icon: "campaign",
      color: "#8B5CF6",
    },
    tutorials: { label: "Tutorials", icon: "school", color: "#06B6D4" },
  };

  return {
    value: category,
    ...categoryMap[category],
  };
}

/**
 * Get engagement stats
 */
function getEngagementStats(post: BlogPost): EngagementStats {
  const total =
    post.viewCount + post.likeCount + post.commentCount + post.shareCount;
  const rate =
    post.viewCount > 0
      ? ((post.likeCount + post.commentCount) / post.viewCount) * 100
      : 0;

  return {
    viewCount: post.viewCount,
    viewCountFormatted: formatNumber(post.viewCount),
    likeCount: post.likeCount,
    likeCountFormatted: formatNumber(post.likeCount),
    commentCount: post.commentCount,
    commentCountFormatted: formatNumber(post.commentCount),
    shareCount: post.shareCount,
    shareCountFormatted: formatNumber(post.shareCount),
    totalEngagement: total,
    totalEngagementFormatted: formatNumber(total),
    engagementRate: `${rate.toFixed(1)}%`,
  };
}

/**
 * Get reading time label
 */
function getReadingTimeLabel(minutes: number): string {
  if (minutes === 1) return "1 min read";
  return `${minutes} min read`;
}

/**
 * Get content preview
 */
function getContentPreview(content: string, maxLength: number = 200): string {
  const stripped = content.replace(/<[^>]*>/g, "").trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength).trim() + "...";
}

/**
 * Generate badges
 */
function generateBadges(post: BlogPost): string[] {
  const badges: string[] = [];

  if (post.isFeatured) badges.push("Featured");
  if (post.status === "published" && post.publishedAt) {
    const daysSincePublish = Math.floor(
      (new Date().getTime() - post.publishedAt.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (daysSincePublish <= 7) badges.push("New");
  }
  if (post.viewCount >= 10000) badges.push("Popular");
  if (post.commentCount >= 50) badges.push("Trending");

  return badges;
}

/**
 * Map BlogPost to BlogPostUI
 */
export function mapBlogPostToUI(post: BlogPost): BlogPostUI {
  const publishAge = post.publishedAt
    ? getTimeAgo(post.publishedAt)
    : undefined;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    contentPreview: getContentPreview(post.content),
    featuredImage: post.featuredImage,
    images: post.images,
    hasImages: !!(post.images && post.images.length > 0),
    category: getPostCategoryDisplay(post.category),
    tags: post.tags,
    tagCount: post.tags.length,
    author: post.author,
    authorName: post.author.name,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    keywords: post.keywords,
    status: getPostStatusDisplay(post.status),
    publishedAt: post.publishedAt,
    publishedAtFormatted: post.publishedAt
      ? formatDate(post.publishedAt)
      : undefined,
    scheduledFor: post.scheduledFor,
    scheduledForFormatted: post.scheduledFor
      ? formatDate(post.scheduledFor)
      : undefined,
    isPublished: post.status === "published",
    isScheduled: post.status === "scheduled",
    isDraft: post.status === "draft",
    isArchived: post.status === "archived",
    stats: getEngagementStats(post),
    readingTime: post.readingTime,
    readingTimeLabel: getReadingTimeLabel(post.readingTime),
    
    // Backward compatibility
    views: post.viewCount,
    likes: post.likeCount,
    showOnHomepage: post.showOnHomepage,
    
    isFeatured: post.isFeatured,
    allowComments: post.allowComments,
    relatedPostIds: post.relatedPostIds,
    hasRelatedPosts: !!(post.relatedPostIds && post.relatedPostIds.length > 0),
    url: `/blog/${post.slug}`,
    editUrl: `/admin/blog/${post.id}/edit`,
    shareUrl: `https://justforview.in/blog/${post.slug}`,
    badges: generateBadges(post),
    createdAt: post.createdAt,
    createdAtFormatted: formatDate(post.createdAt),
    updatedAt: post.updatedAt,
    updatedAtFormatted: formatDate(post.updatedAt),
    age: getTimeAgo(post.createdAt),
    publishAge,
  };
}

/**
 * Map BlogPost to BlogPostCardUI
 */
export function mapBlogPostToCard(post: BlogPost): BlogPostCardUI {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    category: getPostCategoryDisplay(post.category),
    author: post.author,
    status: getPostStatusDisplay(post.status),
    stats: {
      viewCount: post.viewCount,
      viewCountFormatted: formatNumber(post.viewCount),
      commentCount: post.commentCount,
    },
    readingTime: post.readingTime,
    readingTimeLabel: getReadingTimeLabel(post.readingTime),
    isFeatured: post.isFeatured,
    publishedAt: post.publishedAt,
    publishedAtFormatted: post.publishedAt
      ? formatDate(post.publishedAt)
      : undefined,
    url: `/blog/${post.slug}`,
  };
}

/**
 * Map BlogPost to BlogPostListItemUI
 */
export function mapBlogPostToListItem(post: BlogPost): BlogPostListItemUI {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: getPostCategoryDisplay(post.category),
    status: getPostStatusDisplay(post.status),
    author: post.author,
    viewCount: post.viewCount,
    publishedAt: post.publishedAt,
    publishedAtFormatted: post.publishedAt
      ? formatDate(post.publishedAt)
      : undefined,
    url: `/blog/${post.slug}`,
  };
}
