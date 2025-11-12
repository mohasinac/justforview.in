/**
 * User Field Definitions
 * Field configurations for forms, tables, and filters
 */

export interface FieldDefinition {
  key: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "textarea"
    | "select"
    | "boolean"
    | "file"
    | "password";
  placeholder?: string;
  validation: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
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

export const USER_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "user@example.com",
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
    key: "name",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    validation: {
      required: false,
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
    key: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "9876543210",
    validation: {
      required: false,
      minLength: 10,
      maxLength: 15,
      pattern: /^[0-9]{10,15}$/,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      searchable: true,
    },
  },
  {
    key: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "Guest", value: "guest" },
      { label: "User", value: "user" },
      { label: "Seller", value: "seller" },
      { label: "Admin", value: "admin" },
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
    key: "avatar",
    label: "Avatar",
    type: "file",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: true,
      showInForm: true,
    },
  },
];

export const USER_PROFILE_FIELDS: FieldDefinition[] = [
  {
    key: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Tell us about yourself...",
    validation: {
      required: false,
      maxLength: 500,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "location",
    label: "Location",
    type: "text",
    placeholder: "Mumbai, India",
    validation: {
      required: false,
      maxLength: 200,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      searchable: true,
    },
  },
];

export const USER_VERIFICATION_FIELDS: FieldDefinition[] = [
  {
    key: "emailVerified",
    label: "Email Verified",
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
    key: "phoneVerified",
    label: "Phone Verified",
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

export const USER_STATUS_FIELDS: FieldDefinition[] = [
  {
    key: "isActive",
    label: "Active",
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
    key: "isBanned",
    label: "Banned",
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

export const USER_FILTER_FIELDS: FieldDefinition[] = [
  {
    key: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "All Roles", value: "" },
      { label: "Guest", value: "guest" },
      { label: "User", value: "user" },
      { label: "Seller", value: "seller" },
      { label: "Admin", value: "admin" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "emailVerified",
    label: "Email Verified",
    type: "select",
    options: [
      { label: "All", value: "" },
      { label: "Verified", value: true },
      { label: "Unverified", value: false },
    ],
    validation: {},
    display: {},
  },
  {
    key: "isActive",
    label: "Status",
    type: "select",
    options: [
      { label: "All", value: "" },
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
    validation: {},
    display: {},
  },
  {
    key: "isBanned",
    label: "Banned Status",
    type: "select",
    options: [
      { label: "All", value: "" },
      { label: "Banned", value: true },
      { label: "Not Banned", value: false },
    ],
    validation: {},
    display: {},
  },
];

export const USER_BULK_ACTION_FIELDS: FieldDefinition[] = [
  {
    key: "action",
    label: "Bulk Action",
    type: "select",
    options: [
      { label: "Ban Users", value: "ban" },
      { label: "Unban Users", value: "unban" },
      { label: "Activate Users", value: "activate" },
      { label: "Deactivate Users", value: "deactivate" },
      { label: "Delete Users", value: "delete" },
      { label: "Export Selected", value: "export" },
    ],
    validation: {
      required: true,
    },
    display: {},
  },
];

export const ALL_USER_FIELDS: FieldDefinition[] = [
  ...USER_BASIC_FIELDS,
  ...USER_PROFILE_FIELDS,
  ...USER_VERIFICATION_FIELDS,
  ...USER_STATUS_FIELDS,
];
