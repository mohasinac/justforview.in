/**
 * Return Field Definitions
 * Field configurations for forms, tables, and filters
 */

export interface FieldDefinition {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "file";
  placeholder?: string;
  validation: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
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

export const RETURN_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "primaryReason",
    label: "Primary Reason",
    type: "select",
    options: [
      { label: "Defective Product", value: "defective" },
      { label: "Damaged in Transit", value: "damaged" },
      { label: "Wrong Item Received", value: "wrong-item" },
      { label: "Not as Described", value: "not-as-described" },
      { label: "Size Issue", value: "size-issue" },
      { label: "Quality Issue", value: "quality-issue" },
      { label: "Changed Mind", value: "changed-mind" },
      { label: "Other Reason", value: "other" },
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
    key: "reasonDetails",
    label: "Details",
    type: "textarea",
    placeholder: "Please describe the issue in detail",
    validation: {
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "attachments",
    label: "Photos/Documents",
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

export const RETURN_METHOD_FIELDS: FieldDefinition[] = [
  {
    key: "returnMethod",
    label: "Return Method",
    type: "select",
    options: [
      { label: "Pickup from Address", value: "pickup" },
      { label: "Drop-off at Location", value: "drop-off" },
      { label: "Courier Service", value: "courier" },
    ],
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "pickupAddress",
    label: "Pickup Address",
    type: "textarea",
    placeholder: "Full address for pickup",
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

export const RETURN_STATUS_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Requested", value: "requested" },
      { label: "Approved", value: "approved" },
      { label: "Rejected", value: "rejected" },
      { label: "Pickup Scheduled", value: "pickup-scheduled" },
      { label: "Picked Up", value: "picked-up" },
      { label: "Received", value: "received" },
      { label: "Inspecting", value: "inspecting" },
      { label: "Completed", value: "completed" },
      { label: "Refunded", value: "refunded" },
      { label: "Cancelled", value: "cancelled" },
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

export const RETURN_FILTER_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "All Statuses", value: "" },
      { label: "Requested", value: "requested" },
      { label: "Approved", value: "approved" },
      { label: "Rejected", value: "rejected" },
      { label: "In Progress", value: "picked-up" },
      { label: "Completed", value: "completed" },
      { label: "Refunded", value: "refunded" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "primaryReason",
    label: "Reason",
    type: "select",
    options: [
      { label: "All Reasons", value: "" },
      { label: "Defective", value: "defective" },
      { label: "Damaged", value: "damaged" },
      { label: "Wrong Item", value: "wrong-item" },
      { label: "Quality Issue", value: "quality-issue" },
      { label: "Other", value: "other" },
    ],
    validation: {},
    display: {},
  },
];

export const ALL_RETURN_FIELDS: FieldDefinition[] = [
  ...RETURN_BASIC_FIELDS,
  ...RETURN_METHOD_FIELDS,
  ...RETURN_STATUS_FIELDS,
];
