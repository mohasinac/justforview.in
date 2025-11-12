/**
 * Hero Slide Field Definitions
 * Field configurations for forms, tables, and filters
 */

export interface FieldDefinition {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "number"
    | "boolean"
    | "file"
    | "color"
    | "date";
  placeholder?: string;
  validation: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
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

export const HERO_SLIDE_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "title",
    label: "Title",
    type: "text",
    placeholder: "Slide title",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
    },
  },
  {
    key: "subtitle",
    label: "Subtitle",
    type: "text",
    placeholder: "Slide subtitle",
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
    key: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Slide description",
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
    key: "type",
    label: "Slide Type",
    type: "select",
    options: [
      { label: "Image", value: "image" },
      { label: "Video", value: "video" },
      { label: "Product", value: "product" },
      { label: "Category", value: "category" },
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
];

export const HERO_SLIDE_MEDIA_FIELDS: FieldDefinition[] = [
  {
    key: "imageUrl",
    label: "Image",
    type: "file",
    validation: {
      required: true,
    },
    display: {
      showInTable: false,
      showInCard: true,
      showInForm: true,
    },
  },
  {
    key: "mobileImageUrl",
    label: "Mobile Image",
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
  {
    key: "videoUrl",
    label: "Video URL",
    type: "text",
    placeholder: "https://...",
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

export const HERO_SLIDE_DISPLAY_FIELDS: FieldDefinition[] = [
  {
    key: "textPosition",
    label: "Text Position",
    type: "select",
    options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" },
    ],
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "textColor",
    label: "Text Color",
    type: "color",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "overlayColor",
    label: "Overlay Color",
    type: "color",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "overlayOpacity",
    label: "Overlay Opacity",
    type: "number",
    validation: {
      required: false,
      min: 0,
      max: 1,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
];

export const HERO_SLIDE_ORDER_FIELDS: FieldDefinition[] = [
  {
    key: "order",
    label: "Display Order",
    type: "number",
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
];

export const HERO_SLIDE_STATUS_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Draft", value: "draft" },
      { label: "Active", value: "active" },
      { label: "Scheduled", value: "scheduled" },
      { label: "Inactive", value: "inactive" },
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
    key: "startDate",
    label: "Start Date",
    type: "date",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "endDate",
    label: "End Date",
    type: "date",
    validation: {
      required: false,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
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
      showInForm: true,
      filterable: true,
    },
  },
  {
    key: "showOnMobile",
    label: "Show on Mobile",
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

export const ALL_HERO_SLIDE_FIELDS: FieldDefinition[] = [
  ...HERO_SLIDE_BASIC_FIELDS,
  ...HERO_SLIDE_MEDIA_FIELDS,
  ...HERO_SLIDE_DISPLAY_FIELDS,
  ...HERO_SLIDE_ORDER_FIELDS,
  ...HERO_SLIDE_STATUS_FIELDS,
];
