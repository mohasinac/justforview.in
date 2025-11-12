"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import type { CartItemUI } from "@/schemas/ui/cart.ui";

interface CartItemProps {
  item: CartItemUI;
  onUpdateQuantity: (itemId: string, quantity: number) => Promise<void>;
  onRemove: (itemId: string) => Promise<void>;
  disabled?: boolean;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  disabled = false,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [updating, setUpdating] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99 || disabled) return;

    try {
      setUpdating(true);
      setQuantity(newQuantity);
      await onUpdateQuantity(item.id, newQuantity);
    } catch (error) {
      // Revert on error
      setQuantity(item.quantity);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      await onRemove(item.id);
      setShowDeleteDialog(false);
    } catch (error) {
      alert("Failed to remove item. Please try again.");
    }
  };

  const subtotal = item.subtotal;
  const hasDiscount = !!item.discount;

  return (
    <>
      <div className="flex gap-4 py-4 border-b border-gray-200">
        {/* Product Image */}
        <Link href={`/products/${item.productSlug}`} className="flex-shrink-0">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
            {item.productImage ? (
              <Image
                src={item.productImage}
                alt={item.productName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                No image
              </div>
            )}
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.productSlug}`}
                className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
              >
                {item.productName}
              </Link>

              <div className="mt-1 text-xs text-gray-600">
                <Link
                  href={`/shops/${item.shopSlug}`}
                  className="hover:text-blue-600"
                >
                  {item.shopName}
                </Link>
              </div>

              {item.variant && (
                <div className="mt-1 text-xs text-gray-600">
                  Variant: {item.variant}
                </div>
              )}

              {item.isLowStock && (
                <div className="mt-1 text-xs text-red-600">
                  Only {item.stockCount} left in stock
                </div>
              )}
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-bold text-gray-900">
                {item.price.formatted}
              </div>
              {hasDiscount && item.originalPrice && (
                <>
                  <div className="text-xs text-gray-500 line-through">
                    {item.originalPrice.formatted}
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    {item.discount?.label}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quantity Controls & Remove */}
          <div className="mt-3 flex items-center justify-between">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || disabled || updating}
                className="p-1 rounded border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>

              <input
                type="number"
                min="1"
                max={item.maxQuantity}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  handleQuantityChange(val);
                }}
                disabled={disabled || updating}
                className="w-14 text-center text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= item.maxQuantity || disabled || updating}
                className="p-1 rounded border border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>

              {updating && (
                <Loader2 className="h-4 w-4 animate-spin text-blue-600 ml-2" />
              )}
            </div>

            {/* Subtotal & Remove */}
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold text-gray-900">
                {subtotal.formatted}
              </div>

              <button
                onClick={() => setShowDeleteDialog(true)}
                disabled={disabled}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                title="Remove from cart"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleRemove}
        title="Remove from Cart"
        description={`Are you sure you want to remove "${item.productName}" from your cart?`}
        confirmLabel="Remove"
        variant="danger"
      />
    </>
  );
}
