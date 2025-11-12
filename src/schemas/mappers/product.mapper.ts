/**
 * Product Mapper
 * 
 * Transforms Product data between backend (Firestore) and frontend (UI) formats.
 * Handles formatting, computed fields, and data enrichment.
 */

import type { Product } from '@/schemas/resources/product.schema';
import type {
  ProductUI,
  ProductCardUI,
  ProductListItemUI,
  PriceDisplay,
  DiscountInfo,
  StockStatus,
  StatusDisplay,
  RatingDisplay,
  ProductBadge,
  ProductImage,
  ShippingInfo,
  ReturnPolicyDisplay,
  ProductSpecificationUI,
  ProductVariantUI,
} from '@/schemas/ui/product.ui';

/**
 * Format price with currency
 */
function formatPrice(amount: number, currencyCode: string = 'INR'): PriceDisplay {
  const currency = currencyCode === 'INR' ? '₹' : '$';
  const formatted = `${currency}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return {
    amount,
    formatted,
    currency,
    currencyCode,
  };
}

/**
 * Calculate discount information
 */
function calculateDiscount(price: number, originalPrice?: number): DiscountInfo | undefined {
  if (!originalPrice || originalPrice <= price) return undefined;

  const amount = originalPrice - price;
  const percentage = Math.round((amount / originalPrice) * 100);

  return {
    amount,
    percentage,
    label: `${percentage}% OFF`,
    savingsFormatted: formatPrice(amount).formatted,
  };
}

/**
 * Generate stock status information
 */
function getStockStatus(stockCount: number, lowStockThreshold: number): StockStatus {
  const inStock = stockCount > 0;
  const isLow = inStock && stockCount <= lowStockThreshold;
  const outOfStock = stockCount === 0;

  let label: string;
  let className: string;
  let badgeVariant: 'success' | 'warning' | 'danger' | 'default';

  if (outOfStock) {
    label = 'Out of Stock';
    className = 'text-red-600 bg-red-50';
    badgeVariant = 'danger';
  } else if (isLow) {
    label = `Only ${stockCount} left`;
    className = 'text-orange-600 bg-orange-50';
    badgeVariant = 'warning';
  } else {
    label = 'In Stock';
    className = 'text-green-600 bg-green-50';
    badgeVariant = 'success';
  }

  return {
    count: stockCount,
    inStock,
    isLow,
    outOfStock,
    label,
    className,
    badgeVariant,
  };
}

/**
 * Get status display information
 */
function getStatusDisplay(status: string): StatusDisplay {
  const statusMap: Record<string, { label: string; color: string; className: string; icon?: string }> = {
    draft: {
      label: 'Draft',
      color: 'gray',
      className: 'text-gray-600 bg-gray-50',
      icon: 'pencil',
    },
    published: {
      label: 'Published',
      color: 'green',
      className: 'text-green-600 bg-green-50',
      icon: 'check-circle',
    },
    archived: {
      label: 'Archived',
      color: 'orange',
      className: 'text-orange-600 bg-orange-50',
      icon: 'archive',
    },
    'out-of-stock': {
      label: 'Out of Stock',
      color: 'red',
      className: 'text-red-600 bg-red-50',
      icon: 'x-circle',
    },
  };

  return {
    value: status as any,
    ...(statusMap[status] || statusMap.draft),
  };
}

/**
 * Get rating display information
 */
function getRatingDisplay(rating: number, reviewCount: number): RatingDisplay {
  const formatted = rating.toFixed(1);
  const reviewCountFormatted =
    reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1)}k reviews` : `${reviewCount} review${reviewCount !== 1 ? 's' : ''}`;

  // Generate star array for display (e.g., [1, 1, 1, 0.5, 0])
  const stars: number[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(1);
    } else if (rating > i - 1) {
      stars.push(rating - (i - 1));
    } else {
      stars.push(0);
    }
  }

  return {
    average: rating,
    formatted,
    reviewCount,
    reviewCountFormatted,
    stars,
    hasReviews: reviewCount > 0,
  };
}

/**
 * Generate product badges
 */
function generateBadges(product: Product): ProductBadge[] {
  const badges: ProductBadge[] = [];

  // Featured badge
  if (product.isFeatured) {
    badges.push({
      text: 'Featured',
      color: 'blue',
      className: 'text-blue-600 bg-blue-50',
      icon: 'star',
    });
  }

  // New badge (within last 7 days)
  const daysSinceCreation = Math.floor((Date.now() - product.createdAt.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceCreation <= 7) {
    badges.push({
      text: 'New',
      color: 'green',
      className: 'text-green-600 bg-green-50',
      icon: 'sparkles',
    });
  }

  // Best seller badge (high sales count)
  if (product.salesCount >= 100) {
    badges.push({
      text: 'Best Seller',
      color: 'purple',
      className: 'text-purple-600 bg-purple-50',
      icon: 'fire',
    });
  }

  // Low stock badge
  if (product.stockCount > 0 && product.stockCount <= product.lowStockThreshold) {
    badges.push({
      text: `Only ${product.stockCount} left`,
      color: 'orange',
      className: 'text-orange-600 bg-orange-50',
      icon: 'alert-circle',
    });
  }

  return badges;
}

/**
 * Format product images
 */
function formatImages(images: string[], name: string): ProductImage[] {
  return images.map((url, index) => ({
    url,
    thumbnail: url, // TODO: Generate thumbnail URLs
    alt: `${name} - Image ${index + 1}`,
    isPrimary: index === 0,
  }));
}

/**
 * Get shipping information
 */
function getShippingInfo(shippingClass?: string): ShippingInfo {
  const shippingMap: Record<string, { label: string; estimatedDays: number; isFree: boolean }> = {
    standard: { label: 'Standard Shipping (5-7 days)', estimatedDays: 7, isFree: false },
    express: { label: 'Express Shipping (2-3 days)', estimatedDays: 3, isFree: false },
    heavy: { label: 'Heavy Item Shipping (7-10 days)', estimatedDays: 10, isFree: false },
    fragile: { label: 'Fragile Item Shipping (5-7 days)', estimatedDays: 7, isFree: false },
  };

  const info = shippingMap[shippingClass || 'standard'] || shippingMap.standard;

  return {
    class: shippingClass,
    ...info,
  };
}

/**
 * Get return policy display
 */
function getReturnPolicyDisplay(isReturnable: boolean, windowDays: number): ReturnPolicyDisplay {
  return {
    isReturnable,
    windowDays,
    label: isReturnable ? `${windowDays}-day return policy` : 'No returns',
    icon: isReturnable ? 'rotate-ccw' : 'x-circle',
  };
}

/**
 * Format condition label
 */
function getConditionLabel(condition: string): string {
  const conditionMap: Record<string, string> = {
    new: 'Brand New',
    used: 'Used',
    refurbished: 'Refurbished',
  };
  return conditionMap[condition] || 'New';
}

/**
 * Format large numbers
 */
function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

/**
 * Format date
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Generate product URL
 */
function generateProductUrl(slug: string): string {
  return `/products/${slug}`;
}

/**
 * Generate share URL
 */
function generateShareUrl(slug: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || 'https://justforview.in';
  return `${baseUrl}/products/${slug}`;
}

/**
 * Map backend Product to UI ProductUI
 */
export function mapProductToUI(product: Product): ProductUI {
  const images = formatImages(product.images, product.name);
  const price = formatPrice(product.price);
  const originalPrice = product.originalPrice ? formatPrice(product.originalPrice) : undefined;
  const discount = calculateDiscount(product.price, product.originalPrice);

  return {
    // IDs
    id: product.id,
    shopId: product.shopId,
    categoryId: product.categoryId,

    // Basic Info
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription,

    // Pricing
    price,
    originalPrice,
    discount,

    // Inventory
    stock: getStockStatus(product.stockCount, product.lowStockThreshold),
    sku: product.sku,

    // Details
    condition: {
      value: product.condition,
      label: getConditionLabel(product.condition),
    },
    brand: product.brand,
    manufacturer: product.manufacturer,
    countryOfOrigin: product.countryOfOrigin,

    // Media
    images,
    videos: product.videos,
    primaryImage: images[0],

    // Specifications
    specifications: product.specifications,
    variants: product.variants as ProductVariantUI[] | undefined,
    dimensions: product.dimensions
      ? {
          ...product.dimensions,
          formatted: `${product.dimensions.length}×${product.dimensions.width}×${product.dimensions.height} ${product.dimensions.unit}, ${product.dimensions.weight} ${product.dimensions.weightUnit}`,
        }
      : undefined,

    // Shipping
    shipping: getShippingInfo(product.shippingClass),

    // Tags
    tags: product.tags,

    // Policies
    returnPolicy: getReturnPolicyDisplay(product.isReturnable, product.returnWindowDays),
    warranty: product.warranty,

    // SEO
    metaTitle: product.metaTitle,
    metaDescription: product.metaDescription,

    // Stats
    rating: getRatingDisplay(product.rating, product.reviewCount),
    salesCount: product.salesCount,
    salesCountFormatted: formatCount(product.salesCount),
    viewCount: product.viewCount,
    viewCountFormatted: formatCount(product.viewCount),

    // Status
    status: getStatusDisplay(product.status),

    // Flags
    isFeatured: product.isFeatured,
    showOnHomepage: product.showOnHomepage,

    // Badges
    badges: generateBadges(product),

    // URLs
    url: generateProductUrl(product.slug),
    shareUrl: generateShareUrl(product.slug),

    // Timestamps
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    createdAtFormatted: formatDate(product.createdAt),
    updatedAtFormatted: formatDate(product.updatedAt),
    publishDate: product.publishDate,
    publishDateFormatted: product.publishDate ? formatDate(product.publishDate) : undefined,
  };
}

/**
 * Map backend Product to simplified ProductCardUI
 */
export function mapProductToCard(product: Product): ProductCardUI {
  const images = formatImages(product.images, product.name);
  const price = formatPrice(product.price);
  const originalPrice = product.originalPrice ? formatPrice(product.originalPrice) : undefined;
  const discount = calculateDiscount(product.price, product.originalPrice);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price,
    originalPrice,
    discount,
    primaryImage: images[0],
    rating: getRatingDisplay(product.rating, product.reviewCount),
    stock: getStockStatus(product.stockCount, product.lowStockThreshold),
    badges: generateBadges(product),
    url: generateProductUrl(product.slug),
    isFeatured: product.isFeatured,
  };
}

/**
 * Map backend Product to simplified ProductListItemUI
 */
export function mapProductToListItem(product: Product, shopName: string): ProductListItemUI {
  const images = formatImages(product.images, product.name);
  const price = formatPrice(product.price);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price,
    primaryImage: images[0],
    stock: getStockStatus(product.stockCount, product.lowStockThreshold),
    status: getStatusDisplay(product.status),
    url: generateProductUrl(product.slug),
    shop: {
      id: product.shopId,
      name: shopName,
    },
  };
}

/**
 * Map array of Products to UI
 */
export function mapProductsToUI(products: Product[]): ProductUI[] {
  return products.map(mapProductToUI);
}

/**
 * Map array of Products to Cards
 */
export function mapProductsToCards(products: Product[]): ProductCardUI[] {
  return products.map(mapProductToCard);
}
