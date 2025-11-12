/**
 * Modal Component Types
 * Shared prop types for modal components
 */

/**
 * Base Modal Props
 */
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}

/**
 * Confirm Modal Props
 */
export interface ConfirmModalProps extends BaseModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "danger" | "success";
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

/**
 * Form Modal Props
 */
export interface FormModalProps extends BaseModalProps {
  children: React.ReactNode;
  onSubmit?: (data: any) => void | Promise<void>;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * Alert Modal Props
 */
export interface AlertModalProps extends BaseModalProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  confirmText?: string;
  onConfirm?: () => void;
}

/**
 * Image Preview Modal Props
 */
export interface ImagePreviewModalProps extends BaseModalProps {
  images: string[];
  currentIndex: number;
  onNavigate?: (index: number) => void;
}

/**
 * Video Modal Props
 */
export interface VideoModalProps extends BaseModalProps {
  videoUrl: string;
  autoPlay?: boolean;
}

/**
 * Quick View Modal Props
 */
export interface QuickViewModalProps extends BaseModalProps {
  productId: string;
  onAddToCart?: (productId: string, quantity: number) => void;
}

/**
 * Sheet Modal Props (Mobile Drawer)
 */
export interface SheetModalProps extends BaseModalProps {
  children: React.ReactNode;
  position?: "left" | "right" | "bottom";
  size?: "sm" | "md" | "lg" | "full";
}

/**
 * Modal Actions
 */
export interface ModalAction {
  label: string;
  onClick: () => void | Promise<void>;
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * Action Modal Props
 */
export interface ActionModalProps extends BaseModalProps {
  children: React.ReactNode;
  actions: ModalAction[];
  showFooter?: boolean;
}
