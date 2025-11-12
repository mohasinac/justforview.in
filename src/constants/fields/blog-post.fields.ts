/**
 * Blog Post Field Definitions
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
    max?: number;
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

export const BLOG_POST_BASIC_FIELDS: FieldDefinition[] = [
  {
    key: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter post title",
    validation: {
      required: true,
      minLength: 10,
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
    key: "excerpt",
    label: "Excerpt",
    type: "textarea",
    placeholder: "Brief summary of the post",
    validation: {
      required: true,
      minLength: 50,
      maxLength: 300,
    },
    display: {
      showInTable: false,
      showInCard: true,
      showInForm: true,
    },
  },
  {
    key: "content",
    label: "Content",
    type: "textarea",
    placeholder: "Write your post content...",
    validation: {
      required: true,
      minLength: 100,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
];

export const BLOG_POST_MEDIA_FIELDS: FieldDefinition[] = [
  {
    key: "featuredImage",
    label: "Featured Image",
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
    key: "images",
    label: "Additional Images",
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

export const BLOG_POST_CATEGORY_FIELDS: FieldDefinition[] = [
  {
    key: "category",
    label: "Category",
    type: "select",
    options: [
      { label: "Guides", value: "guides" },
      { label: "Tips & Tricks", value: "tips" },
      { label: "News", value: "news" },
      { label: "Updates", value: "updates" },
      { label: "Announcements", value: "announcements" },
      { label: "Tutorials", value: "tutorials" },
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
    key: "tags",
    label: "Tags",
    type: "text",
    placeholder: "Enter tags (comma separated)",
    validation: {
      required: false,
      max: 10,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
];

export const BLOG_POST_SEO_FIELDS: FieldDefinition[] = [
  {
    key: "metaTitle",
    label: "Meta Title",
    type: "text",
    placeholder: "SEO title (max 60 characters)",
    validation: {
      required: false,
      maxLength: 60,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
  {
    key: "metaDescription",
    label: "Meta Description",
    type: "textarea",
    placeholder: "SEO description (max 160 characters)",
    validation: {
      required: false,
      maxLength: 160,
    },
    display: {
      showInTable: false,
      showInCard: false,
      showInForm: true,
    },
  },
];

export const BLOG_POST_STATUS_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Draft", value: "draft" },
      { label: "Published", value: "published" },
      { label: "Scheduled", value: "scheduled" },
      { label: "Archived", value: "archived" },
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
    key: "readingTime",
    label: "Reading Time (minutes)",
    type: "number",
    validation: {
      required: true,
      min: 1,
    },
    display: {
      showInTable: true,
      showInCard: true,
      showInForm: true,
    },
  },
];

export const BLOG_POST_FILTER_FIELDS: FieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "All Statuses", value: "" },
      { label: "Draft", value: "draft" },
      { label: "Published", value: "published" },
      { label: "Scheduled", value: "scheduled" },
      { label: "Archived", value: "archived" },
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
      { label: "Guides", value: "guides" },
      { label: "Tips", value: "tips" },
      { label: "News", value: "news" },
      { label: "Updates", value: "updates" },
      { label: "Announcements", value: "announcements" },
      { label: "Tutorials", value: "tutorials" },
    ],
    validation: {},
    display: {},
  },
];

export const ALL_BLOG_POST_FIELDS: FieldDefinition[] = [
  ...BLOG_POST_BASIC_FIELDS,
  ...BLOG_POST_MEDIA_FIELDS,
  ...BLOG_POST_CATEGORY_FIELDS,
  ...BLOG_POST_SEO_FIELDS,
  ...BLOG_POST_STATUS_FIELDS,
];
