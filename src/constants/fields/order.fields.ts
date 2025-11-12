/**
 * Order Field Definitions
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
    | "color"
    | "date"
    | "daterange"
    | "tel";
  placeholder?: string;
  validation: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
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
 * Order Basic Fields
 */
export const ORDER_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "orderNumber",
    label: "Order Number",
    type: "text",
    placeholder: "ORD-2024-001",
    validation: {
      required: true,
      maxLength: 50,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: false,
      sortable: true,
      searchable: true,
    },
  },
  {
    key: "customerId",
    label: "Customer",
    type: "text",
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      sortable: true,
      searchable: true,
    },
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Confirmed", value: "confirmed" },
      { label: "Processing", value: "processing" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
      { label: "Cancelled", value: "cancelled" },
      { label: "Refunded", value: "refunded" },
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
    key: "paymentStatus",
    label: "Payment Status",
    type: "select",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Paid", value: "paid" },
      { label: "Failed", value: "failed" },
      { label: "Refunded", value: "refunded" },
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
    key: "paymentMethod",
    label: "Payment Method",
    type: "select",
    options: [
      { label: "Razorpay", value: "razorpay" },
      { label: "PayPal", value: "paypal" },
      { label: "Cash on Delivery", value: "cod" },
    ],
    validation: {
      required: true,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      sortable: true,
      filterable: true,
    },
  },
];

/**
 * Order Pricing Fields
 */
export const ORDER_PRICING_FIELDS: FieldDefinition[] = [
  {
    key: "subtotal",
    label: "Subtotal",
    type: "number",
    placeholder: "0.00",
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
  {
    key: "shipping",
    label: "Shipping Cost",
    type: "number",
    placeholder: "0.00",
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
    key: "tax",
    label: "Tax",
    type: "number",
    placeholder: "0.00",
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
    key: "discount",
    label: "Discount",
    type: "number",
    placeholder: "0.00",
    validation: {
      required: false,
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
    key: "total",
    label: "Total",
    type: "number",
    placeholder: "0.00",
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
  {
    key: "couponCode",
    label: "Coupon Code",
    type: "text",
    placeholder: "SAVE20",
    validation: {
      required: false,
      maxLength: 50,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
      searchable: true,
    },
  },
];

/**
 * Order Address Fields
 */
export const ORDER_ADDRESS_FIELDS: FieldDefinition[] = [
  {
    key: "shippingAddress.name",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    validation: {
      required: true,
      maxLength: 200,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "shippingAddress.phone",
    label: "Phone",
    type: "tel",
    placeholder: "9876543210",
    validation: {
      required: true,
      minLength: 10,
      maxLength: 15,
      pattern: /^[0-9]{10,15}$/,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "shippingAddress.line1",
    label: "Address Line 1",
    type: "text",
    placeholder: "House/Flat No., Street",
    validation: {
      required: true,
      maxLength: 200,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "shippingAddress.line2",
    label: "Address Line 2",
    type: "text",
    placeholder: "Landmark, Area",
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
    key: "shippingAddress.city",
    label: "City",
    type: "text",
    placeholder: "Mumbai",
    validation: {
      required: true,
      maxLength: 100,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "shippingAddress.state",
    label: "State",
    type: "text",
    placeholder: "Maharashtra",
    validation: {
      required: true,
      maxLength: 100,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "shippingAddress.pincode",
    label: "Pincode",
    type: "text",
    placeholder: "400001",
    validation: {
      required: true,
      minLength: 6,
      maxLength: 6,
      pattern: /^[0-9]{6}$/,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "shippingAddress.country",
    label: "Country",
    type: "text",
    placeholder: "India",
    validation: {
      required: true,
      maxLength: 100,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
];

/**
 * Order Shipping Fields
 */
export const ORDER_SHIPPING_FIELDS: FieldDefinition[] = [
  {
    key: "trackingNumber",
    label: "Tracking Number",
    type: "text",
    placeholder: "TR1234567890",
    validation: {
      required: false,
      maxLength: 100,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      searchable: true,
    },
  },
  {
    key: "shippingProvider",
    label: "Shipping Provider",
    type: "select",
    options: [
      { label: "India Post", value: "indiapost" },
      { label: "DTDC", value: "dtdc" },
      { label: "Blue Dart", value: "bluedart" },
      { label: "Delhivery", value: "delhivery" },
      { label: "FedEx", value: "fedex" },
      { label: "DHL", value: "dhl" },
    ],
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
    key: "estimatedDelivery",
    label: "Estimated Delivery",
    type: "date",
    validation: {
      required: false,
    },
    display: {
      showInTable: true,
      showInCard: false,
      showInForm: true,
      sortable: true,
    },
  },
  {
    key: "deliveredAt",
    label: "Delivered At",
    type: "date",
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

/**
 * Order Notes Fields
 */
export const ORDER_NOTES_FIELDS: FieldDefinition[] = [
  {
    key: "customerNotes",
    label: "Customer Notes",
    type: "textarea",
    placeholder: "Any special instructions?",
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
    key: "internalNotes",
    label: "Internal Notes",
    type: "textarea",
    placeholder: "Internal notes (not visible to customer)",
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
];

/**
 * Order Filter Fields
 */
export const ORDER_FILTER_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "All Statuses", value: "" },
      { label: "Pending", value: "pending" },
      { label: "Confirmed", value: "confirmed" },
      { label: "Processing", value: "processing" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
      { label: "Cancelled", value: "cancelled" },
      { label: "Refunded", value: "refunded" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "paymentStatus",
    label: "Payment Status",
    type: "select",
    options: [
      { label: "All Payment Statuses", value: "" },
      { label: "Pending", value: "pending" },
      { label: "Paid", value: "paid" },
      { label: "Failed", value: "failed" },
      { label: "Refunded", value: "refunded" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "paymentMethod",
    label: "Payment Method",
    type: "select",
    options: [
      { label: "All Payment Methods", value: "" },
      { label: "Razorpay", value: "razorpay" },
      { label: "PayPal", value: "paypal" },
      { label: "Cash on Delivery", value: "cod" },
    ],
    validation: {},
    display: {},
  },
  {
    key: "dateRange",
    label: "Date Range",
    type: "daterange",
    validation: {},
    display: {},
  },
];

/**
 * Order Bulk Action Fields
 */
export const ORDER_BULK_ACTION_FIELDS: FieldDefinition[] = [
  {
    key: "action",
    label: "Bulk Action",
    type: "select",
    options: [
      { label: "Confirm Orders", value: "confirm" },
      { label: "Mark as Shipped", value: "ship" },
      { label: "Cancel Orders", value: "cancel" },
      { label: "Export Selected", value: "export" },
    ],
    validation: {
      required: true,
    },
    display: {},
  },
];

/**
 * All Order Fields Combined
 */
export const ALL_ORDER_FIELDS: FieldDefinition[] = [
  ...ORDER_BASIC_FIELDS,
  ...ORDER_PRICING_FIELDS,
  ...ORDER_ADDRESS_FIELDS,
  ...ORDER_SHIPPING_FIELDS,
  ...ORDER_NOTES_FIELDS,
];
