/**
 * Shop Field Definitions
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
    | "email"
    | "tel"
    | "url"
    | "number"
    | "select"
    | "boolean"
    | "file"
    | "multi-select";
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
export const SHOP_BASIC_FIELDS: Record<string, FieldDefinition> = {
  NAME: {
    name: "name",
    label: "Shop Name",
    type: "text",
    required: true,
    placeholder: "Enter shop name",
    helperText: "Your shop's display name",
    validation: {
      minLength: 1,
      maxLength: 200,
    },
  },
  SLUG: {
    name: "slug",
    label: "URL Slug",
    type: "text",
    required: true,
    placeholder: "shop-name",
    helperText: "URL-friendly version (auto-generated)",
    validation: {
      minLength: 1,
      maxLength: 250,
      pattern: "^[a-z0-9-]+$",
    },
  },
  DESCRIPTION: {
    name: "description",
    label: "Description",
    type: "textarea",
    required: false,
    placeholder: "Describe your shop and what you sell",
    helperText: "Brief description of your shop",
    validation: {
      maxLength: 2000,
    },
  },
  OWNER_ID: {
    name: "ownerId",
    label: "Owner",
    type: "select",
    required: true,
    helperText: "Shop owner user ID",
  },
};

/**
 * Media Fields
 */
export const SHOP_MEDIA_FIELDS: Record<string, FieldDefinition> = {
  LOGO: {
    name: "logo",
    label: "Shop Logo",
    type: "file",
    required: false,
    helperText: "Square logo (recommended: 400x400px)",
  },
  BANNER: {
    name: "banner",
    label: "Shop Banner",
    type: "file",
    required: false,
    helperText: "Wide banner for shop page (recommended: 1920x400px)",
  },
};

/**
 * Contact Fields
 */
export const SHOP_CONTACT_FIELDS: Record<string, FieldDefinition> = {
  EMAIL: {
    name: "email",
    label: "Email",
    type: "email",
    required: false,
    placeholder: "shop@example.com",
    helperText: "Shop contact email",
  },
  PHONE: {
    name: "phone",
    label: "Phone",
    type: "tel",
    required: false,
    placeholder: "9876543210",
    helperText: "10-digit phone number",
    validation: {
      minLength: 10,
      maxLength: 15,
    },
  },
  LOCATION: {
    name: "location",
    label: "Location",
    type: "text",
    required: false,
    placeholder: "Mumbai, Maharashtra",
    helperText: "City and state",
    validation: {
      maxLength: 200,
    },
  },
};

/**
 * Address Fields
 */
export const SHOP_ADDRESS_FIELDS: Record<string, FieldDefinition> = {
  LINE1: {
    name: "address.line1",
    label: "Address Line 1",
    type: "text",
    required: false,
    placeholder: "Building/Street",
    validation: {
      maxLength: 200,
    },
  },
  LINE2: {
    name: "address.line2",
    label: "Address Line 2",
    type: "text",
    required: false,
    placeholder: "Area/Landmark",
    validation: {
      maxLength: 200,
    },
  },
  CITY: {
    name: "address.city",
    label: "City",
    type: "text",
    required: false,
    placeholder: "Mumbai",
    validation: {
      maxLength: 100,
    },
  },
  STATE: {
    name: "address.state",
    label: "State",
    type: "text",
    required: false,
    placeholder: "Maharashtra",
    validation: {
      maxLength: 100,
    },
  },
  PINCODE: {
    name: "address.pincode",
    label: "Pincode",
    type: "text",
    required: false,
    placeholder: "400001",
    validation: {
      minLength: 6,
      maxLength: 6,
      pattern: "^[0-9]{6}$",
    },
  },
  COUNTRY: {
    name: "address.country",
    label: "Country",
    type: "text",
    required: false,
    placeholder: "India",
    defaultValue: "India",
    validation: {
      maxLength: 100,
    },
  },
};

/**
 * Social Media Fields
 */
export const SHOP_SOCIAL_FIELDS: Record<string, FieldDefinition> = {
  WEBSITE: {
    name: "website",
    label: "Website",
    type: "url",
    required: false,
    placeholder: "https://example.com",
    helperText: "Your shop's website",
  },
  FACEBOOK: {
    name: "facebook",
    label: "Facebook",
    type: "url",
    required: false,
    placeholder: "https://facebook.com/yourshop",
  },
  INSTAGRAM: {
    name: "instagram",
    label: "Instagram",
    type: "url",
    required: false,
    placeholder: "https://instagram.com/yourshop",
  },
  TWITTER: {
    name: "twitter",
    label: "Twitter",
    type: "url",
    required: false,
    placeholder: "https://twitter.com/yourshop",
  },
};

/**
 * Business Fields
 */
export const SHOP_BUSINESS_FIELDS: Record<string, FieldDefinition> = {
  GST: {
    name: "gst",
    label: "GST Number",
    type: "text",
    required: false,
    placeholder: "22AAAAA0000A1Z5",
    helperText: "15-character GST number",
    validation: {
      minLength: 15,
      maxLength: 15,
    },
  },
  PAN: {
    name: "pan",
    label: "PAN Number",
    type: "text",
    required: false,
    placeholder: "AAAAA0000A",
    helperText: "10-character PAN number",
    validation: {
      minLength: 10,
      maxLength: 10,
      pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
    },
  },
};

/**
 * Bank Details Fields
 */
export const SHOP_BANK_FIELDS: Record<string, FieldDefinition> = {
  ACCOUNT_HOLDER_NAME: {
    name: "bankDetails.accountHolderName",
    label: "Account Holder Name",
    type: "text",
    required: false,
    placeholder: "Full name as per bank",
    validation: {
      maxLength: 200,
    },
  },
  ACCOUNT_NUMBER: {
    name: "bankDetails.accountNumber",
    label: "Account Number",
    type: "text",
    required: false,
    placeholder: "XXXXXXXXXXXX",
    validation: {
      minLength: 9,
      maxLength: 18,
    },
  },
  IFSC_CODE: {
    name: "bankDetails.ifscCode",
    label: "IFSC Code",
    type: "text",
    required: false,
    placeholder: "SBIN0001234",
    helperText: "11-character IFSC code",
    validation: {
      minLength: 11,
      maxLength: 11,
    },
  },
  BANK_NAME: {
    name: "bankDetails.bankName",
    label: "Bank Name",
    type: "text",
    required: false,
    placeholder: "State Bank of India",
    validation: {
      maxLength: 200,
    },
  },
  BRANCH_NAME: {
    name: "bankDetails.branchName",
    label: "Branch Name",
    type: "text",
    required: false,
    placeholder: "Mumbai Main",
    validation: {
      maxLength: 200,
    },
  },
  UPI_ID: {
    name: "upiId",
    label: "UPI ID",
    type: "text",
    required: false,
    placeholder: "yourshop@paytm",
    helperText: "Alternative payment method",
    validation: {
      maxLength: 100,
    },
  },
};

/**
 * Policy Fields
 */
export const SHOP_POLICY_FIELDS: Record<string, FieldDefinition> = {
  RETURN_POLICY: {
    name: "returnPolicy",
    label: "Return Policy",
    type: "textarea",
    required: false,
    placeholder: "Describe your return policy",
    helperText: "Your shop's return and refund policy",
    validation: {
      maxLength: 5000,
    },
  },
  SHIPPING_POLICY: {
    name: "shippingPolicy",
    label: "Shipping Policy",
    type: "textarea",
    required: false,
    placeholder: "Describe your shipping policy",
    helperText: "Your shop's shipping terms",
    validation: {
      maxLength: 5000,
    },
  },
};

/**
 * Display Fields
 */
export const SHOP_DISPLAY_FIELDS: Record<string, FieldDefinition> = {
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
  CATEGORIES: {
    name: "categories",
    label: "Categories",
    type: "multi-select",
    required: false,
    helperText: "Categories your shop sells in",
  },
};

/**
 * All Shop Fields Combined
 */
export const SHOP_FIELDS = {
  BASIC: SHOP_BASIC_FIELDS,
  MEDIA: SHOP_MEDIA_FIELDS,
  CONTACT: SHOP_CONTACT_FIELDS,
  ADDRESS: SHOP_ADDRESS_FIELDS,
  SOCIAL: SHOP_SOCIAL_FIELDS,
  BUSINESS: SHOP_BUSINESS_FIELDS,
  BANK: SHOP_BANK_FIELDS,
  POLICY: SHOP_POLICY_FIELDS,
  DISPLAY: SHOP_DISPLAY_FIELDS,
};

/**
 * Filter Field Definitions
 */
export const SHOP_FILTER_FIELDS: Record<string, FieldDefinition> = {
  IS_VERIFIED: {
    name: "isVerified",
    label: "Verification Status",
    type: "select",
    required: false,
    options: [
      { label: "All Shops", value: null },
      { label: "Verified Only", value: true },
      { label: "Unverified Only", value: false },
    ],
  },
  IS_FEATURED: {
    name: "isFeatured",
    label: "Featured Only",
    type: "boolean",
    required: false,
  },
  IS_BANNED: {
    name: "isBanned",
    label: "Show Banned",
    type: "boolean",
    required: false,
  },
  MIN_RATING: {
    name: "minRating",
    label: "Min Rating",
    type: "number",
    required: false,
    placeholder: "4.0",
    validation: {
      min: 0,
      max: 5,
    },
  },
  MIN_PRODUCTS: {
    name: "minProducts",
    label: "Min Products",
    type: "number",
    required: false,
    placeholder: "10",
    validation: {
      min: 0,
    },
  },
  CITY: {
    name: "city",
    label: "City",
    type: "select",
    required: false,
  },
  STATE: {
    name: "state",
    label: "State",
    type: "select",
    required: false,
  },
};

/**
 * Sort Options
 */
export const SHOP_SORT_OPTIONS = [
  { label: "Top Rated", value: "rating:desc" },
  { label: "Most Products", value: "productCount:desc" },
  { label: "Most Reviews", value: "reviewCount:desc" },
  { label: "Recently Joined", value: "createdAt:desc" },
  { label: "Name (A-Z)", value: "name:asc" },
  { label: "Name (Z-A)", value: "name:desc" },
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

export const SHOP_TABLE_COLUMNS: TableColumn[] = [
  { key: "logo", label: "Logo", sortable: false, width: "80px" },
  { key: "name", label: "Name", sortable: true },
  { key: "owner", label: "Owner", sortable: false },
  { key: "rating", label: "Rating", sortable: true, align: "center" },
  { key: "products", label: "Products", sortable: true, align: "center" },
  { key: "reviews", label: "Reviews", sortable: true, align: "center" },
  { key: "isVerified", label: "Verified", sortable: true, align: "center" },
  { key: "isFeatured", label: "Featured", sortable: true, align: "center" },
  { key: "status", label: "Status", sortable: true, align: "center" },
  { key: "createdAt", label: "Joined", sortable: true },
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

export const SHOP_BULK_ACTIONS: BulkAction[] = [
  {
    id: "verify",
    label: "Verify Shops",
    icon: "✓",
    requiresConfirmation: true,
    confirmationMessage: "Are you sure you want to verify the selected shops?",
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
    id: "ban",
    label: "Ban Shops",
    icon: "🚫",
    requiresConfirmation: true,
    confirmationMessage:
      "Are you sure you want to ban the selected shops? This will prevent them from selling.",
  },
  {
    id: "unban",
    label: "Unban Shops",
    icon: "✓",
    requiresConfirmation: false,
  },
  {
    id: "delete",
    label: "Delete Shops",
    icon: "🗑️",
    requiresConfirmation: true,
    confirmationMessage:
      "Are you sure you want to delete the selected shops? This action cannot be undone.",
  },
];
