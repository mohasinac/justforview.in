/**
 * Form Component Types
 * Shared prop types for form components
 */

import type { ProductFormData } from "@/schemas/ui/product.ui";
import type { AuctionFormData } from "@/schemas/ui/auction.ui";
import type { ShopFormData } from "@/schemas/ui/shop.ui";
import type { ReviewFormData } from "@/schemas/ui/review.ui";
import type { AddressFormData } from "@/schemas/ui/address.ui";

/**
 * Base Form Props
 */
export interface BaseFormProps {
  onSubmit: (data: any) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Product Form Props
 */
export interface ProductFormProps extends BaseFormProps {
  initialData?: Partial<ProductFormData>;
  mode?: "create" | "edit";
  step?: number;
}

/**
 * Auction Form Props
 */
export interface AuctionFormProps extends BaseFormProps {
  initialData?: Partial<AuctionFormData>;
  mode?: "create" | "edit";
}

/**
 * Shop Form Props
 */
export interface ShopFormProps extends BaseFormProps {
  initialData?: Partial<ShopFormData>;
  mode?: "create" | "edit";
}

/**
 * Review Form Props
 */
export interface ReviewFormProps extends BaseFormProps {
  initialData?: Partial<ReviewFormData>;
  productId?: string;
  shopId?: string;
  onSuccess?: () => void;
}

/**
 * Address Form Props
 */
export interface AddressFormProps extends BaseFormProps {
  initialData?: Partial<AddressFormData>;
  mode?: "create" | "edit";
}

/**
 * Form Field Props
 */
export interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "number" | "password" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  value?: string | number;
  onChange?: (value: any) => void;
  className?: string;
}

/**
 * Form Select Props
 */
export interface FormSelectProps extends Omit<FormFieldProps, "type"> {
  options: Array<{ value: string | number; label: string }>;
  multiple?: boolean;
}

/**
 * Form Textarea Props
 */
export interface FormTextareaProps extends Omit<FormFieldProps, "type"> {
  rows?: number;
  maxLength?: number;
}

/**
 * Form Checkbox Props
 */
export interface FormCheckboxProps {
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

/**
 * Form Radio Props
 */
export interface FormRadioProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string; description?: string }>;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

/**
 * Form Step Props
 */
export interface FormStepProps {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  isCurrent: boolean;
}

/**
 * Form Stepper Props
 */
export interface FormStepperProps {
  steps: FormStepProps[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}
