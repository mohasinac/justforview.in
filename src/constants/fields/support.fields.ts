/**
 * Support Ticket Field Definitions
 * Field configurations for forms, tables, and filters
 */

export interface FieldDefinition {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "file";
  placeholder?: string;
  validation: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
  options?: Array<{ label: string; value: string }>;
  display: {
    showInTable?: boolean;
    showInCard?: boolean;
    showInForm?: boolean;
    sortable?: boolean;
    filterable?: boolean;
  };
}

export const SUPPORT_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Brief description of your issue",
    validation: {
      required: true,
      minLength: 5,
      maxLength: 200,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      sortable: true,
    },
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Please describe your issue in detail",
    validation: {
      required: true,
      minLength: 20,
      maxLength: 2000,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "category",
    label: "Category",
    type: "select",
    options: [
      { label: "Account", value: "account" },
      { label: "Order", value: "order" },
      { label: "Payment", value: "payment" },
      { label: "Product", value: "product" },
      { label: "Shipping", value: "shipping" },
      { label: "Return", value: "return" },
      { label: "Technical", value: "technical" },
      { label: "Other", value: "other" },
    ],
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      filterable: true,
    },
  },
  {
    key: "priority",
    label: "Priority",
    type: "select",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
      { label: "Urgent", value: "urgent" },
    ],
    validation: {
      required: false,
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

export const SUPPORT_STATUS_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Open", value: "open" },
      { label: "In Progress", value: "in-progress" },
      { label: "Waiting for Customer", value: "waiting-customer" },
      { label: "Resolved", value: "resolved" },
      { label: "Closed", value: "closed" },
    ],
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: false,
      sortable: true,
      filterable: true,
    },
  },
];

export const SUPPORT_ATTACHMENT_FIELDS: FieldDefinition[] = [
  {
    key: "attachments",
    label: "Attachments",
    type: "file",
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

export const SUPPORT_FILTER_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "All Statuses", value: "" },
      { label: "Open", value: "open" },
      { label: "In Progress", value: "in-progress" },
      { label: "Waiting for Customer", value: "waiting-customer" },
      { label: "Resolved", value: "resolved" },
      { label: "Closed", value: "closed" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "priority",
    label: "Priority",
    type: "select",
    options: [
      { label: "All Priorities", value: "" },
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
      { label: "Urgent", value: "urgent" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "category",
    label: "Category",
    type: "select",
    options: [
      { label: "All Categories", value: "" },
      { label: "Account", value: "account" },
      { label: "Order", value: "order" },
      { label: "Payment", value: "payment" },
      { label: "Product", value: "product" },
      { label: "Shipping", value: "shipping" },
      { label: "Return", value: "return" },
      { label: "Technical", value: "technical" },
      { label: "Other", value: "other" },
    ],
    validation: {},
    display: {},
  },
];

export const ALL_SUPPORT_FIELDS: FieldDefinition[] = [
  ...SUPPORT_BASIC_FIELDS,
  ...SUPPORT_STATUS_FIELDS,
  ...SUPPORT_ATTACHMENT_FIELDS,
];
