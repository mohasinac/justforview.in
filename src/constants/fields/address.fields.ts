/**
 * Address Field Definitions
 * Field configurations for forms, tables, and filters
 */

export interface FieldDefinition {
  key: string;
  label: string;
  type: "text" | "select" | "boolean";
  placeholder?: string;
  validation: {
    required?: boolean;
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
  };
}

export const ADDRESS_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "label",
    label: "Address Type",
    type: "select",
    options: [
      { label: "Home", value: "home" },
      { label: "Work", value: "work" },
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
    key: "recipientName",
    label: "Recipient Name",
    type: "text",
    placeholder: "John Doe",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
    },
  },
  {
    key: "recipientPhone",
    label: "Phone Number",
    type: "text",
    placeholder: "9876543210",
    validation: {
      required: true,
      pattern: /^[6-9]\d{9}$/,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
    },
  },
];

export const ADDRESS_LOCATION_FIELDS: FieldDefinition[] = [
  {
    key: "line1",
    label: "Address Line 1",
    type: "text",
    placeholder: "House/Flat No., Building Name",
    validation: {
      required: true,
      minLength: 5,
      maxLength: 200,
    },
    display: {
      showInTable: false,
      showInCard: true,
      showInForm: true,
    },
  },
  {
    key: "line2",
    label: "Address Line 2",
    type: "text",
    placeholder: "Area, Colony, Street",
    validation: {
      required: false,
      maxLength: 200,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "landmark",
    label: "Landmark",
    type: "text",
    placeholder: "Near Park, Opposite Mall",
    validation: {
      required: false,
      maxLength: 100,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "city",
    label: "City",
    type: "text",
    placeholder: "Mumbai",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
    },
  },
  {
    key: "state",
    label: "State",
    type: "text",
    placeholder: "Maharashtra",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
    },
  },
  {
    key: "pincode",
    label: "Pincode",
    type: "text",
    placeholder: "400001",
    validation: {
      required: true,
      pattern: /^\d{6}$/,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
    },
  },
  {
    key: "country",
    label: "Country",
    type: "text",
    placeholder: "India",
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

export const ADDRESS_FLAG_FIELDS: FieldDefinition[] = [
  {
    key: "isDefault",
    label: "Set as Default Address",
    type: "boolean",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
    },
  },
];

export const ALL_ADDRESS_FIELDS: FieldDefinition[] = [
  ...ADDRESS_BASIC_FIELDS,
  ...ADDRESS_LOCATION_FIELDS,
  ...ADDRESS_FLAG_FIELDS,
];
