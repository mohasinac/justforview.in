/**
 * Review Field Definitions
 * Field configurations for forms, tables, and filters
 */

/**
 * Field Definition Interface
 */
export interface FieldDefinition {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "boolean"
    | "file"
    | "rating";
  placeholder?: string;
  validation: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
  options?: Array<{ label: string; value: string | number | boolean }>;
  display: {
    showInTable?: boolean;
    showInCard?: boolean;
    showInForm?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
  };
}

/**
 * Review Basic Fields
 */
export const REVIEW_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "rating",
    label: "Rating",
    type: "rating",
    validation: {
      required: true,
      min: 1,
      max: 5,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      sortable: true,
      filterable: true,
    },
  },
  {
    key: "title",
    label: "Review Title",
    type: "text",
    placeholder: "Summarize your review",
    validation: {
      required: false,
      maxLength: 200,
    },
    display: {
      showInTable: false,
      showInCard: true,
      showInForm: true,
      searchable: true,
    },
  },
  {
    key: "comment",
    label: "Review",
    type: "textarea",
    placeholder: "Share your experience with this product",
    validation: {
      required: true,
      minLength: 20,
      maxLength: 2000,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      searchable: true,
    },
  },
];

/**
 * Review Media Fields
 */
export const REVIEW_MEDIA_FIELDS: FieldDefinition[] = [
  {
    key: "media",
    label: "Photos/Videos",
    type: "file",
    validation: {
      required: false,
      max: 5,
    },
    display: {
      showInTable: false,
      showInCard: true,
      showInForm: true,
    },
  },
];

/**
 * Review Verification Fields
 */
export const REVIEW_VERIFICATION_FIELDS: FieldDefinition[] = [
  {
    key: "verifiedPurchase",
    label: "Verified Purchase",
    type: "boolean",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: false,
      filterable: true,
    },
  },
  {
    key: "isApproved",
    label: "Approval Status",
    type: "select",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Approved", value: true },
      { label: "Rejected", value: false },
    ],
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: false,
      filterable: true,
    },
  },
  {
    key: "isFeatured",
    label: "Featured",
    type: "boolean",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: false,
      filterable: true,
    },
  },
  {
    key: "showOnHomepage",
    label: "Show on Homepage",
    type: "boolean",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: false,
      filterable: true,
    },
  },
];

/**
 * Review Target Fields
 */
export const REVIEW_TARGET_FIELDS: FieldDefinition[] = [
  {
    key: "productId",
    label: "Product",
    type: "text",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      searchable: true,
    },
  },
  {
    key: "shopId",
    label: "Shop",
    type: "text",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      searchable: true,
    },
  },
  {
    key: "auctionId",
    label: "Auction",
    type: "text",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
      searchable: true,
    },
  },
  {
    key: "categoryId",
    label: "Category",
    type: "text",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
      searchable: true,
    },
  },
  {
    key: "orderItemId",
    label: "Order Item",
    type: "text",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: false,
      searchable: true,
    },
  },
];

/**
 * Review Filter Fields
 */
export const REVIEW_FILTER_FIELDS: FieldDefinition[] = [
  {
    key: "rating",
    label: "Rating",
    type: "select",
    options: [
      { label: "All Ratings", value: "" },
      { label: "5 Stars", value: 5 },
      { label: "4 Stars", value: 4 },
      { label: "3 Stars", value: 3 },
      { label: "2 Stars", value: 2 },
      { label: "1 Star", value: 1 },
    ],
    validation: {},
    display: {},
  },
  {
    key: "verifiedPurchase",
    label: "Verified Purchase",
    type: "select",
    options: [
      { label: "All Reviews", value: "" },
      { label: "Verified Only", value: true },
      { label: "Unverified Only", value: false },
    ],
    validation: {},
    display: {},
  },
  {
    key: "isApproved",
    label: "Approval Status",
    type: "select",
    options: [
      { label: "All Reviews", value: "" },
      { label: "Approved", value: true },
      { label: "Pending", value: "pending" },
      { label: "Rejected", value: false },
    ],
    validation: {},
    display: {},
  },
  {
    key: "isFeatured",
    label: "Featured",
    type: "select",
    options: [
      { label: "All Reviews", value: "" },
      { label: "Featured Only", value: true },
    ],
    validation: {},
    display: {},
  },
  {
    key: "hasMedia",
    label: "Has Media",
    type: "select",
    options: [
      { label: "All Reviews", value: "" },
      { label: "With Photos/Videos", value: true },
      { label: "No Media", value: false },
    ],
    validation: {},
    display: {},
  },
];

/**
 * Review Bulk Action Fields
 */
export const REVIEW_BULK_ACTION_FIELDS: FieldDefinition[] = [
  {
    key: "action",
    label: "Bulk Action",
    type: "select",
    options: [
      { label: "Approve Reviews", value: "approve" },
      { label: "Reject Reviews", value: "reject" },
      { label: "Feature Reviews", value: "feature" },
      { label: "Delete Reviews", value: "delete" },
      { label: "Export Selected", value: "export" },
    ],
    validation: {
      required: true,
    },
    display: {},
  },
];

/**
 * Review Form Fields for Customer
 */
export const REVIEW_FORM_FIELDS: FieldDefinition[] = [
  ...REVIEW_BASIC_FIELDS,
  ...REVIEW_MEDIA_FIELDS,
];

/**
 * Review Form Fields for Admin
 */
export const ADMIN_REVIEW_FORM_FIELDS: FieldDefinition[] = [
  ...REVIEW_BASIC_FIELDS,
  ...REVIEW_MEDIA_FIELDS,
  ...REVIEW_VERIFICATION_FIELDS,
  ...REVIEW_TARGET_FIELDS,
];

/**
 * All Review Fields Combined
 */
export const ALL_REVIEW_FIELDS: FieldDefinition[] = [
  ...REVIEW_BASIC_FIELDS,
  ...REVIEW_MEDIA_FIELDS,
  ...REVIEW_VERIFICATION_FIELDS,
  ...REVIEW_TARGET_FIELDS,
];
