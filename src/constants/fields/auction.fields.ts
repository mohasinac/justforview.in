/**
 * Auction Field Definitions
 * Field configurations for forms, tables, and filters
 */

/**
 * Field Definition Interface
 */
export interface FieldDefinition {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "boolean"
    | "date"
    | "datetime"
    | "file"
    | "multi-file";
  required: boolean;
  placeholder?: string;
  helperText?: string;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  options?: Array<{ label: string; value: string | number }>;
  defaultValue?: any;
}

/**
 * Basic Information Fields
 */
export const AUCTION_BASIC_FIELDS: Record<string, FieldDefinition> = {
  NAME: {
    name: "name",
    label: "Auction Name",
    type: "text",
    required: true,
    placeholder: "Enter auction name",
    helperText: "A clear, descriptive name for your auction",
    validation: {
      minLength: 1,
      maxLength: 200,
    },
  },
  SLUG: {
    name: "slug",
    label: "URL Slug",
    type: "text",
    required: true,
    placeholder: "auction-name",
    helperText: "URL-friendly version of the name (auto-generated)",
    validation: {
      minLength: 1,
      maxLength: 250,
      pattern: "^[a-z0-9-]+$",
    },
  },
  DESCRIPTION: {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "Detailed description of the item being auctioned",
    helperText: "Provide detailed information about the item",
    validation: {
      minLength: 10,
      maxLength: 5000,
    },
  },
  SHOP_ID: {
    name: "shopId",
    label: "Shop",
    type: "select",
    required: true,
    helperText: "Select the shop hosting this auction",
  },
};

/**
 * Media Fields
 */
export const AUCTION_MEDIA_FIELDS: Record<string, FieldDefinition> = {
  IMAGES: {
    name: "images",
    label: "Images",
    type: "multi-file",
    required: true,
    helperText: "Upload 1-10 images (first image will be primary)",
    validation: {
      min: 1,
      max: 10,
    },
  },
  VIDEOS: {
    name: "videos",
    label: "Videos",
    type: "multi-file",
    required: false,
    helperText: "Upload up to 5 videos (optional)",
    validation: {
      max: 5,
    },
  },
};

/**
 * Bidding Fields
 */
export const AUCTION_BIDDING_FIELDS: Record<string, FieldDefinition> = {
  STARTING_BID: {
    name: "startingBid",
    label: "Starting Bid",
    type: "number",
    required: true,
    placeholder: "1000",
    helperText: "Minimum bid amount to start the auction",
    validation: {
      min: 1,
    },
  },
  RESERVE_PRICE: {
    name: "reservePrice",
    label: "Reserve Price",
    type: "number",
    required: false,
    placeholder: "5000",
    helperText: "Minimum price to sell (optional, hidden from bidders)",
    validation: {
      min: 1,
    },
  },
  CURRENT_BID: {
    name: "currentBid",
    label: "Current Bid",
    type: "number",
    required: false,
    helperText: "Current highest bid (auto-updated)",
    validation: {
      min: 0,
    },
    defaultValue: 0,
  },
  BID_COUNT: {
    name: "bidCount",
    label: "Bid Count",
    type: "number",
    required: false,
    helperText: "Total number of bids (auto-updated)",
    validation: {
      min: 0,
    },
    defaultValue: 0,
  },
};

/**
 * Timing Fields
 */
export const AUCTION_TIMING_FIELDS: Record<string, FieldDefinition> = {
  START_TIME: {
    name: "startTime",
    label: "Start Time",
    type: "datetime",
    required: true,
    helperText: "When the auction will start accepting bids",
  },
  END_TIME: {
    name: "endTime",
    label: "End Time",
    type: "datetime",
    required: true,
    helperText: "When the auction will close",
  },
};

/**
 * Status Fields
 */
export const AUCTION_STATUS_FIELDS: Record<string, FieldDefinition> = {
  STATUS: {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    helperText: "Current auction status",
    options: [
      { label: "Draft", value: "draft" },
      { label: "Scheduled", value: "scheduled" },
      { label: "Live", value: "live" },
      { label: "Ended", value: "ended" },
      { label: "Cancelled", value: "cancelled" },
    ],
    defaultValue: "draft",
  },
  IS_FEATURED: {
    name: "isFeatured",
    label: "Featured",
    type: "boolean",
    required: false,
    helperText: "Show in featured sections",
    defaultValue: false,
  },
  SHOW_ON_HOMEPAGE: {
    name: "showOnHomepage",
    label: "Show on Homepage",
    type: "boolean",
    required: false,
    helperText: "Display on the homepage",
    defaultValue: false,
  },
  FEATURED_PRIORITY: {
    name: "featuredPriority",
    label: "Featured Priority",
    type: "number",
    required: false,
    placeholder: "0",
    helperText: "Higher numbers appear first (0-100)",
    validation: {
      min: 0,
      max: 100,
    },
    defaultValue: 0,
  },
};

/**
 * Winner Fields
 */
export const AUCTION_WINNER_FIELDS: Record<string, FieldDefinition> = {
  WINNER_ID: {
    name: "winnerId",
    label: "Winner",
    type: "text",
    required: false,
    helperText: "User ID of the auction winner",
  },
  FINAL_BID: {
    name: "finalBid",
    label: "Final Bid",
    type: "number",
    required: false,
    helperText: "Final winning bid amount",
    validation: {
      min: 1,
    },
  },
};

/**
 * All Auction Fields Combined
 */
export const AUCTION_FIELDS = {
  BASIC: AUCTION_BASIC_FIELDS,
  MEDIA: AUCTION_MEDIA_FIELDS,
  BIDDING: AUCTION_BIDDING_FIELDS,
  TIMING: AUCTION_TIMING_FIELDS,
  STATUS: AUCTION_STATUS_FIELDS,
  WINNER: AUCTION_WINNER_FIELDS,
};

/**
 * Filter Field Definitions
 */
export const AUCTION_FILTER_FIELDS: Record<string, FieldDefinition> = {
  STATUS: {
    name: "status",
    label: "Status",
    type: "select",
    required: false,
    options: [
      { label: "All Statuses", value: "" },
      { label: "Draft", value: "draft" },
      { label: "Scheduled", value: "scheduled" },
      { label: "Live", value: "live" },
      { label: "Ended", value: "ended" },
      { label: "Cancelled", value: "cancelled" },
    ],
  },
  SHOP_ID: {
    name: "shopId",
    label: "Shop",
    type: "select",
    required: false,
  },
  MIN_BID: {
    name: "minBid",
    label: "Min Bid",
    type: "number",
    required: false,
    placeholder: "Min bid",
    validation: {
      min: 0,
    },
  },
  MAX_BID: {
    name: "maxBid",
    label: "Max Bid",
    type: "number",
    required: false,
    placeholder: "Max bid",
    validation: {
      min: 0,
    },
  },
  IS_FEATURED: {
    name: "isFeatured",
    label: "Featured Only",
    type: "boolean",
    required: false,
  },
  SHOW_ON_HOMEPAGE: {
    name: "showOnHomepage",
    label: "Homepage Only",
    type: "boolean",
    required: false,
  },
};

/**
 * Sort Options
 */
export const AUCTION_SORT_OPTIONS = [
  { label: "Ending Soon", value: "endTime:asc" },
  { label: "Recently Listed", value: "createdAt:desc" },
  { label: "Highest Bid", value: "currentBid:desc" },
  { label: "Lowest Bid", value: "currentBid:asc" },
  { label: "Most Bids", value: "bidCount:desc" },
  { label: "Least Bids", value: "bidCount:asc" },
  { label: "Name (A-Z)", value: "name:asc" },
  { label: "Name (Z-A)", value: "name:desc" },
];

/**
 * Table Column Definitions
 */
export interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export const AUCTION_TABLE_COLUMNS: TableColumn[] = [
  { key: "image", label: "Image", sortable: false, width: "80px" },
  { key: "name", label: "Name", sortable: true },
  { key: "currentBid", label: "Current Bid", sortable: true, align: "right" },
  { key: "bidCount", label: "Bids", sortable: true, align: "center" },
  { key: "timeRemaining", label: "Time Left", sortable: false },
  { key: "status", label: "Status", sortable: true, align: "center" },
  { key: "startTime", label: "Start Time", sortable: true },
  { key: "endTime", label: "End Time", sortable: true },
  { key: "isFeatured", label: "Featured", sortable: true, align: "center" },
  { key: "createdAt", label: "Created", sortable: true },
  { key: "actions", label: "Actions", sortable: false, align: "center" },
];

/**
 * Bulk Action Definitions
 */
export interface BulkAction {
  id: string;
  label: string;
  icon?: string;
  requiresConfirmation: boolean;
  confirmationMessage?: string;
}

export const AUCTION_BULK_ACTIONS: BulkAction[] = [
  {
    id: "feature",
    label: "Mark as Featured",
    icon: "⭐",
    requiresConfirmation: false,
  },
  {
    id: "unfeature",
    label: "Remove Featured",
    icon: "☆",
    requiresConfirmation: false,
  },
  {
    id: "show-homepage",
    label: "Show on Homepage",
    icon: "🏠",
    requiresConfirmation: false,
  },
  {
    id: "hide-homepage",
    label: "Hide from Homepage",
    icon: "👁️‍🗨️",
    requiresConfirmation: false,
  },
  {
    id: "cancel",
    label: "Cancel Auctions",
    icon: "🚫",
    requiresConfirmation: true,
    confirmationMessage:
      "Are you sure you want to cancel the selected auctions?",
  },
  {
    id: "delete",
    label: "Delete Auctions",
    icon: "🗑️",
    requiresConfirmation: true,
    confirmationMessage:
      "Are you sure you want to delete the selected auctions? This action cannot be undone.",
  },
];

/**
 * Bid Form Fields
 */
export const BID_FORM_FIELDS: Record<string, FieldDefinition> = {
  BID_AMOUNT: {
    name: "bidAmount",
    label: "Bid Amount",
    type: "number",
    required: true,
    placeholder: "Enter your bid",
    helperText: "Must be higher than current bid",
    validation: {
      min: 1,
    },
  },
  IS_AUTO_BID: {
    name: "isAutoBid",
    label: "Auto Bid",
    type: "boolean",
    required: false,
    helperText: "Automatically bid up to your maximum",
    defaultValue: false,
  },
  MAX_AUTO_BID: {
    name: "maxAutoBid",
    label: "Maximum Auto Bid",
    type: "number",
    required: false,
    placeholder: "Maximum you're willing to pay",
    helperText: "System will auto-bid for you up to this amount",
    validation: {
      min: 1,
    },
  },
};
