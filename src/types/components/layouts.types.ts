/**
 * Layout Component Types
 * Shared prop types for layout components
 */

/**
 * Base Layout Props
 */
export interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Admin Layout Props
 */
export interface AdminLayoutProps extends BaseLayoutProps {
  title?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  showSidebar?: boolean;
}

/**
 * Seller Layout Props
 */
export interface SellerLayoutProps extends BaseLayoutProps {
  title?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  showSidebar?: boolean;
}

/**
 * Page Layout Props
 */
export interface PageLayoutProps extends BaseLayoutProps {
  title?: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  sidebar?: React.ReactNode;
  showSidebar?: boolean;
  sidebarPosition?: "left" | "right";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

/**
 * Breadcrumb
 */
export interface Breadcrumb {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  current?: boolean;
}

/**
 * Container Props
 */
export interface ContainerProps extends BaseLayoutProps {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

/**
 * Section Props
 */
export interface SectionProps extends BaseLayoutProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  variant?: "default" | "card" | "bordered";
  spacing?: "sm" | "md" | "lg";
}

/**
 * Grid Props
 */
export interface GridProps extends BaseLayoutProps {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg";
  responsive?: boolean;
}

/**
 * Flex Props
 */
export interface FlexProps extends BaseLayoutProps {
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: "sm" | "md" | "lg";
  wrap?: boolean;
}

/**
 * Stack Props
 */
export interface StackProps extends BaseLayoutProps {
  spacing?: "sm" | "md" | "lg";
  divider?: boolean;
}

/**
 * Sidebar Props
 */
export interface SidebarProps extends BaseLayoutProps {
  isOpen: boolean;
  onClose?: () => void;
  position?: "left" | "right";
  variant?: "fixed" | "sticky" | "static";
}

/**
 * Header Props
 */
export interface HeaderProps extends BaseLayoutProps {
  sticky?: boolean;
  transparent?: boolean;
  showAuth?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
}

/**
 * Footer Props
 */
export interface FooterProps extends BaseLayoutProps {
  showNewsletter?: boolean;
  showSocial?: boolean;
  variant?: "simple" | "detailed";
}
