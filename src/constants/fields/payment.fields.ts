/**
 * Payment Field Definitions
 * Field configurations for forms, tables, and filters
 */

export interface FieldDefinition {
  key: string;
  label: string;
  type: "text" | "select" | "number";
  placeholder?: string;
  validation: {
    required?: boolean;
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

export const PAYMENT_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "amount",
    label: "Amount",
    type: "number",
    validation: {
      required: true,
      min: 1,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
      sortable: true,
    },
  },
  {
    key: "method",
    label: "Payment Method",
    type: "select",
    options: [
      { label: "Card", value: "card" },
      { label: "UPI", value: "upi" },
      { label: "Net Banking", value: "netbanking" },
      { label: "Wallet", value: "wallet" },
      { label: "Cash on Delivery", value: "cod" },
      { label: "EMI", value: "emi" },
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
    key: "gateway",
    label: "Payment Gateway",
    type: "select",
    options: [
      { label: "Razorpay", value: "razorpay" },
      { label: "Stripe", value: "stripe" },
      { label: "Paytm", value: "paytm" },
      { label: "PhonePe", value: "phonepe" },
      { label: "Manual", value: "manual" },
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

export const PAYMENT_STATUS_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Processing", value: "processing" },
      { label: "Completed", value: "completed" },
      { label: "Failed", value: "failed" },
      { label: "Cancelled", value: "cancelled" },
      { label: "Refunded", value: "refunded" },
      { label: "Partially Refunded", value: "partially-refunded" },
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

export const PAYMENT_FILTER_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "All Statuses", value: "" },
      { label: "Pending", value: "pending" },
      { label: "Processing", value: "processing" },
      { label: "Completed", value: "completed" },
      { label: "Failed", value: "failed" },
      { label: "Refunded", value: "refunded" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "method",
    label: "Method",
    type: "select",
    options: [
      { label: "All Methods", value: "" },
      { label: "Card", value: "card" },
      { label: "UPI", value: "upi" },
      { label: "Net Banking", value: "netbanking" },
      { label: "Wallet", value: "wallet" },
      { label: "Cash on Delivery", value: "cod" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "gateway",
    label: "Gateway",
    type: "select",
    options: [
      { label: "All Gateways", value: "" },
      { label: "Razorpay", value: "razorpay" },
      { label: "Stripe", value: "stripe" },
      { label: "Paytm", value: "paytm" },
      { label: "PhonePe", value: "phonepe" },
    ],
    validation: {},
    display: {},
  },
];

export const ALL_PAYMENT_FIELDS: FieldDefinition[] = [
  ...PAYMENT_BASIC_FIELDS,
  ...PAYMENT_STATUS_FIELDS,
];
