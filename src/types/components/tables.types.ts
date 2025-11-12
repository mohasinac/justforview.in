/**
 * Table Component Types
 * Shared prop types for table components
 */

/**
 * Table Column Definition
 */
export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T, index: number) => React.ReactNode;
  className?: string;
}

/**
 * Table Sort
 */
export interface TableSort {
  column: string;
  direction: "asc" | "desc";
}

/**
 * Table Props
 */
export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  keyField?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  onSort?: (sort: TableSort) => void;
  currentSort?: TableSort;
  className?: string;
}

/**
 * Data Table Props (with pagination & search)
 */
export interface DataTableProps<T = any> extends Omit<TableProps<T>, "data"> {
  data: T[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showPagination?: boolean;
  pageSizeOptions?: number[];
}

/**
 * Table Row Props
 */
export interface TableRowProps<T = any> {
  row: T;
  columns: TableColumn<T>[];
  index: number;
  isSelected?: boolean;
  onSelect?: (row: T) => void;
  onClick?: (row: T) => void;
  className?: string;
}

/**
 * Table Header Props
 */
export interface TableHeaderProps {
  columns: TableColumn[];
  currentSort?: TableSort;
  onSort?: (column: string) => void;
  showCheckbox?: boolean;
  allSelected?: boolean;
  onSelectAll?: (selected: boolean) => void;
}

/**
 * Table Pagination Props
 */
export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

/**
 * Table Skeleton Props
 */
export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

/**
 * Table Bulk Actions
 */
export interface TableBulkAction {
  label: string;
  icon?: React.ReactNode;
  onClick: (selectedRows: any[]) => void | Promise<void>;
  variant?: "default" | "danger";
  requiresConfirm?: boolean;
  confirmMessage?: string;
}

/**
 * Selectable Table Props
 */
export interface SelectableTableProps<T = any> extends DataTableProps<T> {
  selectedRows: string[];
  onSelectRows: (ids: string[]) => void;
  bulkActions?: TableBulkAction[];
  rowKeyField?: string;
}
