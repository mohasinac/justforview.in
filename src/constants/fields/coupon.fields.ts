/**
 * Coupon Field Definitions
 * Field configurations for forms, tables, and filters
 */

export interface FieldDefinition {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "boolean" | "date";
  placeholder?: string;
  validation: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
  options?: Array<{ label: string; value: string | boolean }>;
  display: {
    showInTable?: boolean;
    showInCard?: boolean;
    showInForm?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    searchable?: boolean;
  };
}

export const COUPON_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "code",
    label: "Coupon Code",
    type: "text",
    placeholder: "SAVE20",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      sortable: true,
      searchable: true,
    },
  },
  {
    key: "name",
    label: "Coupon Name",
    type: "text",
    placeholder: "20% Off Summer Sale",
    validation: {
      required: true,
      maxLength: 200,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      sortable: true,
      searchable: true,
    },
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Get 20% off on all products",
    validation: {
      required: false,
      maxLength: 1000,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "type",
    label: "Discount Type",
    type: "select",
    options: [
      { label: "Percentage Off", value: "percentage" },
      { label: "Flat Discount", value: "flat" },
      { label: "Buy One Get One", value: "bogo" },
      { label: "Tiered Discount", value: "tiered" },
      { label: "Free Shipping", value: "free-shipping" },
    ],
    validation: {
      required: true,
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
    key: "discountValue",
    label: "Discount Value",
    type: "number",
    placeholder: "20",
    validation: {
      required: false,
      min: 0,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      sortable: true,
    },
  },
  {
    key: "maxDiscountAmount",
    label: "Max Discount Amount",
    type: "number",
    placeholder: "500",
    validation: {
      required: false,
      min: 0,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
];

export const COUPON_REQUIREMENT_FIELDS: FieldDefinition[] = [
  {
    key: "minPurchaseAmount",
    label: "Min Purchase Amount",
    type: "number",
    placeholder: "0",
    validation: {
      required: true,
      min: 0,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      sortable: true,
    },
  },
  {
    key: "minQuantity",
    label: "Min Quantity",
    type: "number",
    placeholder: "0",
    validation: {
      required: true,
      min: 0,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
];

export const COUPON_APPLICABILITY_FIELDS: FieldDefinition[] = [
  {
    key: "applicability",
    label: "Applies To",
    type: "select",
    options: [
      { label: "All Products", value: "all" },
      { label: "Specific Categories", value: "category" },
      { label: "Specific Products", value: "product" },
    ],
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      filterable: true,
    },
  },
];

export const COUPON_USAGE_FIELDS: FieldDefinition[] = [
  {
    key: "usageLimit",
    label: "Total Usage Limit",
    type: "number",
    placeholder: "100",
    validation: {
      required: false,
      min: 1,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "usageLimitPerUser",
    label: "Usage Limit Per User",
    type: "number",
    placeholder: "1",
    validation: {
      required: true,
      min: 1,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "usageCount",
    label: "Usage Count",
    type: "number",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: false,
      sortable: true,
    },
  },
];

export const COUPON_VALIDITY_FIELDS: FieldDefinition[] = [
  {
    key: "startDate",
    label: "Start Date",
    type: "date",
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      sortable: true,
    },
  },
  {
    key: "endDate",
    label: "End Date",
    type: "date",
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      sortable: true,
    },
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Expired", value: "expired" },
      { label: "Used Up", value: "used-up" },
    ],
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      sortable: true,
      filterable: true,
    },
  },
];

export const COUPON_RESTRICTION_FIELDS: FieldDefinition[] = [
  {
    key: "firstOrderOnly",
    label: "First Order Only",
    type: "boolean",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
      filterable: true,
    },
  },
  {
    key: "newUsersOnly",
    label: "New Users Only",
    type: "boolean",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
      filterable: true,
    },
  },
  {
    key: "canCombineWithOtherCoupons",
    label: "Can Combine With Other Coupons",
    type: "boolean",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
];

export const COUPON_DISPLAY_FIELDS: FieldDefinition[] = [
  {
    key: "autoApply",
    label: "Auto Apply",
    type: "boolean",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      filterable: true,
    },
  },
  {
    key: "isPublic",
    label: "Public",
    type: "boolean",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
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
      showInForm: true,
      filterable: true,
    },
  },
];

export const COUPON_FILTER_FIELDS: FieldDefinition[] = [
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      { label: "All Types", value: "" },
      { label: "Percentage Off", value: "percentage" },
      { label: "Flat Discount", value: "flat" },
      { label: "Buy One Get One", value: "bogo" },
      { label: "Tiered Discount", value: "tiered" },
      { label: "Free Shipping", value: "free-shipping" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "All Statuses", value: "" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Expired", value: "expired" },
      { label: "Used Up", value: "used-up" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "isFeatured",
    label: "Featured",
    type: "select",
    options: [
      { label: "All", value: "" },
      { label: "Featured Only", value: true },
    ],
    validation: {},
    display: {},
  },
];

export const COUPON_BULK_ACTION_FIELDS: FieldDefinition[] = [
  {
    key: "action",
    label: "Bulk Action",
    type: "select",
    options: [
      { label: "Activate Coupons", value: "activate" },
      { label: "Deactivate Coupons", value: "deactivate" },
      { label: "Delete Coupons", value: "delete" },
      { label: "Feature Coupons", value: "feature" },
      { label: "Export Selected", value: "export" },
    ],
    validation: {
      required: true,
    },
    display: {},
  },
];

export const ALL_COUPON_FIELDS: FieldDefinition[] = [
  ...COUPON_BASIC_FIELDS,
  ...COUPON_REQUIREMENT_FIELDS,
  ...COUPON_APPLICABILITY_FIELDS,
  ...COUPON_USAGE_FIELDS,
  ...COUPON_VALIDITY_FIELDS,
  ...COUPON_RESTRICTION_FIELDS,
  ...COUPON_DISPLAY_FIELDS,
];
