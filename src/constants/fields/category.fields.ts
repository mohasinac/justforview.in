/**
 * Category Field Definitions
 * Field configurations for forms, tables, and filters
 */

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
    | "boolean"
    | "file"
    | "color";
  required: boolean;
  placeholder?: string;
  helperText?: string;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  options?: Array<{ label: string; value: string | number | boolean | null }>;
  defaultValue?: any;
}

/**
 * Basic Information Fields
 */
export const CATEGORY_BASIC_FIELDS: Record<string, FieldDefinition> = {
  NAME: {
    name: "name",
    label: "Category Name",
    type: "text",
    required: true,
    placeholder: "Enter category name",
    helperText: "A clear, descriptive name for the category",
    validation: {
      minLength: 1,
      maxLength: 100,
    },
  },
  SLUG: {
    name: "slug",
    label: "URL Slug",
    type: "text",
    required: true,
    placeholder: "category-name",
    helperText: "URL-friendly version (auto-generated from name)",
    validation: {
      minLength: 1,
      maxLength: 150,
      pattern: "^[a-z0-9-]+$",
    },
  },
  DESCRIPTION: {
    name: "description",
    label: "Description",
    type: "textarea",
    required: false,
    placeholder: "Brief description of the category",
    helperText: "Optional description shown on category page",
    validation: {
      maxLength: 1000,
    },
  },
  PARENT_ID: {
    name: "parentId",
    label: "Parent Category",
    type: "select",
    required: false,
    helperText: "Select parent category (leave empty for root category)",
    options: [{ label: "None (Root Category)", value: null }],
  },
};

/**
 * Media Fields
 */
export const CATEGORY_MEDIA_FIELDS: Record<string, FieldDefinition> = {
  ICON: {
    name: "icon",
    label: "Icon",
    type: "text",
    required: false,
    placeholder: "🛍️",
    helperText: "Emoji or icon class (e.g., 'fa-shopping-cart')",
    validation: {
      maxLength: 50,
    },
  },
  IMAGE: {
    name: "image",
    label: "Category Image",
    type: "file",
    required: false,
    helperText: "Square image for cards (recommended: 400x400px)",
  },
  BANNER: {
    name: "banner",
    label: "Banner Image",
    type: "file",
    required: false,
    helperText: "Wide banner for category page (recommended: 1920x400px)",
  },
  COLOR: {
    name: "color",
    label: "Brand Color",
    type: "color",
    required: false,
    helperText: "Hex color code for category theme",
    validation: {
      pattern: "^#[0-9A-Fa-f]{6}$",
    },
  },
};

/**
 * Display Fields
 */
export const CATEGORY_DISPLAY_FIELDS: Record<string, FieldDefinition> = {
  SORT_ORDER: {
    name: "sortOrder",
    label: "Sort Order",
    type: "number",
    required: false,
    placeholder: "0",
    helperText: "Lower numbers appear first",
    validation: {
      min: 0,
    },
    defaultValue: 0,
  },
  IS_FEATURED: {
    name: "isFeatured",
    label: "Featured",
    type: "boolean",
    required: false,
    helperText: "Show in featured sections",
    defaultValue: false,
  },
  SHOW_ON_HOMEPAGE: {
    name: "showOnHomepage",
    label: "Show on Homepage",
    type: "boolean",
    required: false,
    helperText: "Display on the homepage",
    defaultValue: false,
  },
  IS_ACTIVE: {
    name: "isActive",
    label: "Active",
    type: "boolean",
    required: false,
    helperText: "Active categories are visible to customers",
    defaultValue: true,
  },
};

/**
 * SEO Fields
 */
export const CATEGORY_SEO_FIELDS: Record<string, FieldDefinition> = {
  META_TITLE: {
    name: "metaTitle",
    label: "Meta Title",
    type: "text",
    required: false,
    placeholder: "SEO title (defaults to category name)",
    helperText: "Recommended: 50-60 characters",
    validation: {
      maxLength: 60,
    },
  },
  META_DESCRIPTION: {
    name: "metaDescription",
    label: "Meta Description",
    type: "textarea",
    required: false,
    placeholder: "SEO description for search engines",
    helperText: "Recommended: 150-160 characters",
    validation: {
      maxLength: 160,
    },
  },
};

/**
 * Business Fields
 */
export const CATEGORY_BUSINESS_FIELDS: Record<string, FieldDefinition> = {
  COMMISSION_RATE: {
    name: "commissionRate",
    label: "Commission Rate (%)",
    type: "number",
    required: false,
    placeholder: "10",
    helperText: "Platform commission percentage for products in this category",
    validation: {
      min: 0,
      max: 100,
    },
    defaultValue: 10,
  },
};

/**
 * All Category Fields Combined
 */
export const CATEGORY_FIELDS = {
  BASIC: CATEGORY_BASIC_FIELDS,
  MEDIA: CATEGORY_MEDIA_FIELDS,
  DISPLAY: CATEGORY_DISPLAY_FIELDS,
  SEO: CATEGORY_SEO_FIELDS,
  BUSINESS: CATEGORY_BUSINESS_FIELDS,
};

/**
 * Filter Field Definitions
 */
export const CATEGORY_FILTER_FIELDS: Record<string, FieldDefinition> = {
  PARENT_ID: {
    name: "parentId",
    label: "Parent Category",
    type: "select",
    required: false,
    options: [
      { label: "All Categories", value: null },
      { label: "Root Categories", value: null },
    ],
  },
  LEVEL: {
    name: "level",
    label: "Level",
    type: "select",
    required: false,
    options: [
      { label: "All Levels", value: null },
      { label: "Level 0 (Root)", value: 0 },
      { label: "Level 1", value: 1 },
      { label: "Level 2", value: 2 },
      { label: "Level 3", value: 3 },
      { label: "Level 4", value: 4 },
      { label: "Level 5", value: 5 },
    ],
  },
  IS_FEATURED: {
    name: "isFeatured",
    label: "Featured Only",
    type: "boolean",
    required: false,
  },
  SHOW_ON_HOMEPAGE: {
    name: "showOnHomepage",
    label: "Homepage Only",
    type: "boolean",
    required: false,
  },
  IS_ACTIVE: {
    name: "isActive",
    label: "Status",
    type: "select",
    required: false,
    options: [
      { label: "All Statuses", value: null },
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
  },
  HAS_CHILDREN: {
    name: "hasChildren",
    label: "Has Children",
    type: "select",
    required: false,
    options: [
      { label: "All", value: null },
      { label: "With Children", value: true },
      { label: "No Children", value: false },
    ],
  },
  MIN_PRODUCT_COUNT: {
    name: "minProductCount",
    label: "Min Products",
    type: "number",
    required: false,
    placeholder: "0",
    validation: {
      min: 0,
    },
  },
};

/**
 * Sort Options
 */
export const CATEGORY_SORT_OPTIONS = [
  { label: "Sort Order", value: "sortOrder:asc" },
  { label: "Name (A-Z)", value: "name:asc" },
  { label: "Name (Z-A)", value: "name:desc" },
  { label: "Most Products", value: "productCount:desc" },
  { label: "Least Products", value: "productCount:asc" },
  { label: "Most Children", value: "childCount:desc" },
  { label: "Recently Created", value: "createdAt:desc" },
  { label: "Oldest First", value: "createdAt:asc" },
];

/**
 * Table Column Definitions
 */
export interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export const CATEGORY_TABLE_COLUMNS: TableColumn[] = [
  {
    key: "icon",
    label: "Icon",
    sortable: false,
    width: "60px",
    align: "center",
  },
  { key: "name", label: "Name", sortable: true },
  { key: "path", label: "Path", sortable: false },
  { key: "level", label: "Level", sortable: true, align: "center" },
  { key: "productCount", label: "Products", sortable: true, align: "center" },
  { key: "childCount", label: "Children", sortable: true, align: "center" },
  { key: "sortOrder", label: "Order", sortable: true, align: "center" },
  { key: "isFeatured", label: "Featured", sortable: true, align: "center" },
  { key: "isActive", label: "Status", sortable: true, align: "center" },
  { key: "createdAt", label: "Created", sortable: true },
  { key: "actions", label: "Actions", sortable: false, align: "center" },
];

/**
 * Bulk Action Definitions
 */
export interface BulkAction {
  id: string;
  label: string;
  icon?: string;
  requiresConfirmation: boolean;
  confirmationMessage?: string;
}

export const CATEGORY_BULK_ACTIONS: BulkAction[] = [
  {
    id: "activate",
    label: "Activate",
    icon: "✓",
    requiresConfirmation: false,
  },
  {
    id: "deactivate",
    label: "Deactivate",
    icon: "○",
    requiresConfirmation: false,
  },
  {
    id: "feature",
    label: "Mark as Featured",
    icon: "⭐",
    requiresConfirmation: false,
  },
  {
    id: "unfeature",
    label: "Remove Featured",
    icon: "☆",
    requiresConfirmation: false,
  },
  {
    id: "show-homepage",
    label: "Show on Homepage",
    icon: "🏠",
    requiresConfirmation: false,
  },
  {
    id: "hide-homepage",
    label: "Hide from Homepage",
    icon: "👁️‍🗨️",
    requiresConfirmation: false,
  },
  {
    id: "delete",
    label: "Delete Categories",
    icon: "🗑️",
    requiresConfirmation: true,
    confirmationMessage:
      "Are you sure you want to delete the selected categories? This will also affect their subcategories.",
  },
];

/**
 * Tree View Configuration
 */
export interface TreeViewConfig {
  expandedByDefault: boolean;
  showProductCount: boolean;
  showChildCount: boolean;
  showInactive: boolean;
  maxDepth: number;
  dragAndDrop: boolean;
}

export const DEFAULT_TREE_VIEW_CONFIG: TreeViewConfig = {
  expandedByDefault: false,
  showProductCount: true,
  showChildCount: true,
  showInactive: true,
  maxDepth: 5,
  dragAndDrop: true,
};
