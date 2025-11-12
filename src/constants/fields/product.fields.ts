/**
 * Product Field Definitions
 *
 * Centralized field configurations for Product resource.
 * Used in forms, tables, filters, and validation.
 */

import type {
  ProductStatus,
  ProductCondition,
} from "@/schemas/resources/product.schema";

/**
 * Field Definition Interface
 */
export interface FieldDefinition {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "multiselect"
    | "boolean"
    | "date"
    | "file"
    | "rich-text"
    | "array";
  required: boolean;
  placeholder?: string;
  helperText?: string;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: string;
  };
  defaultValue?: any;
  options?: Array<{ label: string; value: string | number }>;
  multiple?: boolean;
  accept?: string; // For file inputs
}

/**
 * Product Basic Info Fields
 */
export const PRODUCT_BASIC_FIELDS: FieldDefinition[] = [
  {
    name: "name",
    label: "Product Name",
    type: "text",
    required: true,
    placeholder: "Enter product name",
    helperText: "Clear, descriptive name for your product",
    validation: {
      minLength: 3,
      maxLength: 200,
    },
  },
  {
    name: "slug",
    label: "URL Slug",
    type: "text",
    required: false,
    placeholder: "auto-generated-from-name",
    helperText: "Leave empty to auto-generate from product name",
    validation: {
      minLength: 3,
      pattern: "^[a-z0-9-]+$",
    },
  },
  {
    name: "shortDescription",
    label: "Short Description",
    type: "textarea",
    required: false,
    placeholder: "Brief description (max 200 characters)",
    helperText: "Short summary shown in cards and listings",
    validation: {
      maxLength: 200,
    },
  },
  {
    name: "description",
    label: "Full Description",
    type: "rich-text",
    required: true,
    placeholder: "Detailed product description",
    helperText: "Complete product details, features, and specifications",
    validation: {
      minLength: 20,
    },
  },
  {
    name: "categoryId",
    label: "Category",
    type: "select",
    required: true,
    placeholder: "Select category",
    helperText: "Choose the most appropriate category",
  },
];

/**
 * Product Pricing Fields
 */
export const PRODUCT_PRICING_FIELDS: FieldDefinition[] = [
  {
    name: "price",
    label: "Selling Price",
    type: "number",
    required: true,
    placeholder: "0.00",
    helperText: "Current selling price",
    validation: {
      min: 0,
    },
  },
  {
    name: "originalPrice",
    label: "Original Price",
    type: "number",
    required: false,
    placeholder: "0.00",
    helperText: "MRP or original price (for showing discount)",
    validation: {
      min: 0,
    },
  },
  {
    name: "costPrice",
    label: "Cost Price",
    type: "number",
    required: false,
    placeholder: "0.00",
    helperText: "Your purchase/manufacturing cost (not shown to customers)",
    validation: {
      min: 0,
    },
  },
];

/**
 * Product Inventory Fields
 */
export const PRODUCT_INVENTORY_FIELDS: FieldDefinition[] = [
  {
    name: "stockCount",
    label: "Stock Quantity",
    type: "number",
    required: true,
    placeholder: "0",
    helperText: "Available quantity",
    validation: {
      min: 0,
    },
    defaultValue: 0,
  },
  {
    name: "lowStockThreshold",
    label: "Low Stock Threshold",
    type: "number",
    required: false,
    placeholder: "10",
    helperText: "Alert when stock falls below this number",
    validation: {
      min: 0,
    },
    defaultValue: 10,
  },
  {
    name: "sku",
    label: "SKU",
    type: "text",
    required: false,
    placeholder: "ABC-12345",
    helperText: "Stock Keeping Unit (internal reference)",
  },
];

/**
 * Product Details Fields
 */
export const PRODUCT_DETAILS_FIELDS: FieldDefinition[] = [
  {
    name: "condition",
    label: "Condition",
    type: "select",
    required: true,
    placeholder: "Select condition",
    defaultValue: "new",
    options: [
      { label: "Brand New", value: "new" },
      { label: "Used", value: "used" },
      { label: "Refurbished", value: "refurbished" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    type: "text",
    required: false,
    placeholder: "Enter brand name",
    helperText: "Product manufacturer or brand",
  },
  {
    name: "manufacturer",
    label: "Manufacturer",
    type: "text",
    required: false,
    placeholder: "Enter manufacturer name",
  },
  {
    name: "countryOfOrigin",
    label: "Country of Origin",
    type: "text",
    required: true,
    placeholder: "India",
    defaultValue: "India",
  },
];

/**
 * Product Media Fields
 */
export const PRODUCT_MEDIA_FIELDS: FieldDefinition[] = [
  {
    name: "images",
    label: "Product Images",
    type: "file",
    required: true,
    helperText:
      "Upload at least one image (max 10). First image will be primary.",
    multiple: true,
    accept: "image/*",
  },
  {
    name: "videos",
    label: "Product Videos",
    type: "file",
    required: false,
    helperText: "Upload product videos (max 3, 100MB each)",
    multiple: true,
    accept: "video/*",
  },
];

/**
 * Product Shipping Fields
 */
export const PRODUCT_SHIPPING_FIELDS: FieldDefinition[] = [
  {
    name: "shippingClass",
    label: "Shipping Class",
    type: "select",
    required: false,
    defaultValue: "standard",
    options: [
      { label: "Standard", value: "standard" },
      { label: "Express", value: "express" },
      { label: "Heavy Item", value: "heavy" },
      { label: "Fragile", value: "fragile" },
    ],
  },
];

/**
 * Product Dimensions Fields
 */
export const PRODUCT_DIMENSIONS_FIELDS: FieldDefinition[] = [
  {
    name: "dimensions.length",
    label: "Length",
    type: "number",
    required: false,
    placeholder: "0",
    validation: { min: 0 },
  },
  {
    name: "dimensions.width",
    label: "Width",
    type: "number",
    required: false,
    placeholder: "0",
    validation: { min: 0 },
  },
  {
    name: "dimensions.height",
    label: "Height",
    type: "number",
    required: false,
    placeholder: "0",
    validation: { min: 0 },
  },
  {
    name: "dimensions.unit",
    label: "Dimension Unit",
    type: "select",
    required: false,
    defaultValue: "cm",
    options: [
      { label: "Centimeters (cm)", value: "cm" },
      { label: "Inches (in)", value: "inch" },
    ],
  },
  {
    name: "dimensions.weight",
    label: "Weight",
    type: "number",
    required: false,
    placeholder: "0",
    validation: { min: 0 },
  },
  {
    name: "dimensions.weightUnit",
    label: "Weight Unit",
    type: "select",
    required: false,
    defaultValue: "kg",
    options: [
      { label: "Kilograms (kg)", value: "kg" },
      { label: "Grams (g)", value: "g" },
      { label: "Pounds (lb)", value: "lb" },
    ],
  },
];

/**
 * Product Policy Fields
 */
export const PRODUCT_POLICY_FIELDS: FieldDefinition[] = [
  {
    name: "isReturnable",
    label: "Returnable",
    type: "boolean",
    required: true,
    defaultValue: true,
    helperText: "Allow customers to return this product",
  },
  {
    name: "returnWindowDays",
    label: "Return Window (Days)",
    type: "number",
    required: true,
    defaultValue: 7,
    placeholder: "7",
    helperText: "Number of days customers can return the product",
    validation: {
      min: 0,
      max: 90,
    },
  },
  {
    name: "warranty",
    label: "Warranty",
    type: "textarea",
    required: false,
    placeholder: "e.g., 1 year manufacturer warranty",
    helperText: "Warranty information",
  },
];

/**
 * Product SEO Fields
 */
export const PRODUCT_SEO_FIELDS: FieldDefinition[] = [
  {
    name: "metaTitle",
    label: "Meta Title",
    type: "text",
    required: false,
    placeholder: "SEO title (max 60 characters)",
    helperText: "Title tag for search engines",
    validation: {
      maxLength: 60,
    },
  },
  {
    name: "metaDescription",
    label: "Meta Description",
    type: "textarea",
    required: false,
    placeholder: "SEO description (max 160 characters)",
    helperText: "Description for search engine results",
    validation: {
      maxLength: 160,
    },
  },
];

/**
 * Product Status Fields
 */
export const PRODUCT_STATUS_FIELDS: FieldDefinition[] = [
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    defaultValue: "draft",
    options: [
      { label: "Draft", value: "draft" },
      { label: "Published", value: "published" },
      { label: "Archived", value: "archived" },
      { label: "Out of Stock", value: "out-of-stock" },
    ],
  },
  {
    name: "publishDate",
    label: "Publish Date",
    type: "date",
    required: false,
    helperText: "Schedule product publication",
  },
  {
    name: "isFeatured",
    label: "Featured",
    type: "boolean",
    required: false,
    defaultValue: false,
    helperText: "Show in featured products",
  },
  {
    name: "showOnHomepage",
    label: "Show on Homepage",
    type: "boolean",
    required: false,
    defaultValue: false,
    helperText: "Display on homepage",
  },
];

/**
 * Product Tags Fields
 */
export const PRODUCT_TAGS_FIELDS: FieldDefinition[] = [
  {
    name: "tags",
    label: "Tags",
    type: "multiselect",
    required: false,
    helperText: "Add tags for better searchability",
    multiple: true,
  },
];

/**
 * All Product Fields Grouped
 */
export const PRODUCT_FIELDS = {
  BASIC: PRODUCT_BASIC_FIELDS,
  PRICING: PRODUCT_PRICING_FIELDS,
  INVENTORY: PRODUCT_INVENTORY_FIELDS,
  DETAILS: PRODUCT_DETAILS_FIELDS,
  MEDIA: PRODUCT_MEDIA_FIELDS,
  SHIPPING: PRODUCT_SHIPPING_FIELDS,
  DIMENSIONS: PRODUCT_DIMENSIONS_FIELDS,
  POLICY: PRODUCT_POLICY_FIELDS,
  SEO: PRODUCT_SEO_FIELDS,
  STATUS: PRODUCT_STATUS_FIELDS,
  TAGS: PRODUCT_TAGS_FIELDS,
} as const;

/**
 * Product Filter Field Definitions
 */
export const PRODUCT_FILTER_FIELDS = {
  STATUS: {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "All", value: "" },
      { label: "Published", value: "published" },
      { label: "Draft", value: "draft" },
      { label: "Archived", value: "archived" },
      { label: "Out of Stock", value: "out-of-stock" },
    ],
  },
  CONDITION: {
    name: "condition",
    label: "Condition",
    type: "select",
    options: [
      { label: "All", value: "" },
      { label: "New", value: "new" },
      { label: "Used", value: "used" },
      { label: "Refurbished", value: "refurbished" },
    ],
  },
  PRICE_RANGE: {
    name: "priceRange",
    label: "Price Range",
    type: "range",
    min: 0,
    max: 100000,
  },
  RATING: {
    name: "minRating",
    label: "Minimum Rating",
    type: "select",
    options: [
      { label: "All", value: "" },
      { label: "4+ Stars", value: "4" },
      { label: "3+ Stars", value: "3" },
      { label: "2+ Stars", value: "2" },
      { label: "1+ Stars", value: "1" },
    ],
  },
  IN_STOCK: {
    name: "inStock",
    label: "Availability",
    type: "boolean",
  },
  FEATURED: {
    name: "isFeatured",
    label: "Featured Only",
    type: "boolean",
  },
} as const;

/**
 * Product Sort Options
 */
export const PRODUCT_SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Highest Rated", value: "rating" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
] as const;

/**
 * Product Table Columns (for admin/seller lists)
 */
export const PRODUCT_TABLE_COLUMNS = [
  { key: "image", label: "Image", sortable: false },
  { key: "name", label: "Product Name", sortable: true },
  { key: "sku", label: "SKU", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "stock", label: "Stock", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "category", label: "Category", sortable: false },
  { key: "rating", label: "Rating", sortable: true },
  { key: "sales", label: "Sales", sortable: true },
  { key: "createdAt", label: "Created", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
] as const;

/**
 * Product Bulk Action Options
 */
export const PRODUCT_BULK_ACTIONS = [
  { label: "Publish", value: "publish", icon: "check" },
  { label: "Archive", value: "archive", icon: "archive" },
  { label: "Delete", value: "delete", icon: "trash", danger: true },
  { label: "Feature", value: "feature", icon: "star" },
  { label: "Unfeature", value: "unfeature", icon: "star-off" },
  { label: "Update Stock", value: "update-stock", icon: "package" },
  { label: "Update Price", value: "update-price", icon: "dollar-sign" },
  { label: "Export", value: "export", icon: "download" },
] as const;
