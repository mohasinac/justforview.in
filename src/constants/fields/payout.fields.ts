/**
 * Payout Field Definitions
 * Field configurations for forms, tables, and filters
 */

export interface FieldDefinition {
  key: string;
  label: string;
  type: "text" | "select" | "number" | "date";
  placeholder?: string;
  validation: {
    required?: boolean;
    min?: number;
    pattern?: string;
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

export const PAYOUT_PERIOD_FIELDS: FieldDefinition[] = [
  {
    key: "periodStart",
    label: "Period Start",
    type: "date",
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
    key: "periodEnd",
    label: "Period End",
    type: "date",
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
    },
  },
];

export const PAYOUT_AMOUNT_FIELDS: FieldDefinition[] = [
  {
    key: "salesAmount",
    label: "Sales Amount",
    type: "number",
    validation: {
      required: true,
      min: 0,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      sortable: true,
    },
  },
  {
    key: "payoutAmount",
    label: "Payout Amount",
    type: "number",
    validation: {
      required: true,
      min: 0,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: false,
      sortable: true,
    },
  },
];

export const PAYOUT_METHOD_FIELDS: FieldDefinition[] = [
  {
    key: "method",
    label: "Payout Method",
    type: "select",
    options: [
      { label: "Bank Transfer", value: "bank-transfer" },
      { label: "UPI", value: "upi" },
      { label: "Wallet", value: "wallet" },
      { label: "Cheque", value: "cheque" },
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

export const PAYOUT_BANK_FIELDS: FieldDefinition[] = [
  {
    key: "accountHolderName",
    label: "Account Holder Name",
    type: "text",
    placeholder: "Full name as per bank",
    validation: {
      required: true,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "accountNumber",
    label: "Account Number",
    type: "text",
    placeholder: "Bank account number",
    validation: {
      required: true,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "ifscCode",
    label: "IFSC Code",
    type: "text",
    placeholder: "IFSC code",
    validation: {
      required: true,
      pattern: "^[A-Z]{4}0[A-Z0-9]{6}$",
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "bankName",
    label: "Bank Name",
    type: "text",
    placeholder: "Name of the bank",
    validation: {
      required: true,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
];

export const PAYOUT_STATUS_FIELDS: FieldDefinition[] = [
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
      { label: "On Hold", value: "on-hold" },
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

export const PAYOUT_FILTER_FIELDS: FieldDefinition[] = [
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
      { label: "On Hold", value: "on-hold" },
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
      { label: "Bank Transfer", value: "bank-transfer" },
      { label: "UPI", value: "upi" },
      { label: "Wallet", value: "wallet" },
      { label: "Cheque", value: "cheque" },
    ],
    validation: {},
    display: {},
  },
];

export const ALL_PAYOUT_FIELDS: FieldDefinition[] = [
  ...PAYOUT_PERIOD_FIELDS,
  ...PAYOUT_AMOUNT_FIELDS,
  ...PAYOUT_METHOD_FIELDS,
  ...PAYOUT_BANK_FIELDS,
  ...PAYOUT_STATUS_FIELDS,
];
