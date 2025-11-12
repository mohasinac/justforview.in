"use client";

import { useState } from "react";
import { Eye, Edit, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { DataTable, Column } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { FormModal } from "@/components/common/FormModal";
import { ProductInlineForm } from "./ProductInlineForm";
import type { ProductUI } from "@/schemas/ui/product.ui";

interface ProductTableProps {
  products: ProductUI[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onDelete?: (slug: string) => Promise<void>;
}

export default function ProductTable({
  products,
  isLoading = false,
  onRefresh,
  onDelete,
}: ProductTableProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductUI | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedProduct || !onDelete) return;

    try {
      setIsDeleting(true);
      await onDelete(selectedProduct.slug);
      setShowDeleteDialog(false);
      setSelectedProduct(null);
      onRefresh?.();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleQuickEditSuccess = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
    onRefresh?.();
  };

  const columns: Column<ProductUI>[] = [
    {
      key: "image",
      label: "Image",
      width: "80px",
      render: (_, product) => (
        <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
          {product.primaryImage?.url ? (
            <img
              src={product.primaryImage.url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name",
      label: "Product Name",
      sortable: true,
      render: (_, product) => (
        <div className="min-w-[200px]">
          <div className="font-medium text-gray-900">{product.name}</div>
          <div className="text-xs text-gray-500 mt-1">
            SKU: {product.sku || "N/A"}
          </div>
        </div>
      ),
    },
    {
      key: "categoryId",
      label: "Category",
      sortable: true,
      render: (_, product) => (
        <div className="text-sm text-gray-900">
          {product.category?.name || "Uncategorized"}
        </div>
      ),
    },
    {
      key: "slug",
      label: "Slug",
      render: (slug) => (
        <div className="text-xs text-gray-500 font-mono max-w-[150px] truncate">
          {slug}
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (_, product) => (
        <div className="min-w-[100px]">
          <div className="font-medium text-gray-900">
            {product.price.formatted}
          </div>
          {product.originalPrice && (
            <div className="text-xs text-gray-500 line-through">
              {product.originalPrice.formatted}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      sortable: true,
      render: (_, product) => {
        const { stock } = product;

        return (
          <div className="min-w-[80px]">
            <span
              className={`font-medium ${
                stock.outOfStock
                  ? "text-red-600"
                  : stock.isLow
                  ? "text-yellow-600"
                  : "text-gray-900"
              }`}
            >
              {stock.count}
            </span>
            {stock.isLow && !stock.outOfStock && (
              <div className="text-xs text-yellow-600 mt-1">Low stock</div>
            )}
            {stock.outOfStock && (
              <div className="text-xs text-red-600 mt-1">Out of stock</div>
            )}
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (_, product) => <StatusBadge status={product.status.value} />,
    },
    {
      key: "actions",
      label: "Actions",
      width: "160px",
      render: (_, product) => (
        <div className="flex items-center gap-2">
          {/* View Public Page */}
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View public page"
          >
            <Eye className="h-4 w-4" />
          </Link>

          {/* Quick Edit */}
          <button
            onClick={() => {
              setSelectedProduct(product);
              setShowEditModal(true);
            }}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Quick edit"
          >
            <Edit className="h-4 w-4" />
          </button>

          {/* Edit Page */}
          <Link
            href={`/seller/products/${product.slug}/edit`}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Full edit page"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>

          {/* Delete */}
          <button
            onClick={() => {
              setSelectedProduct(product);
              setShowDeleteDialog(true);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete product"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={products}
        columns={columns}
        keyExtractor={(product) => product.id || product.slug}
        isLoading={isLoading}
        emptyMessage="No products found. Create your first product to get started."
        className="border border-gray-200 rounded-lg"
      />

      {/* Quick Edit Modal */}
      {/* TODO: Update ProductInlineForm to use ProductUI schema */}
      <FormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        title="Quick Edit Product"
      >
        {/* Temporarily disabled until ProductInlineForm is migrated to UI schema */}
        {/* <ProductInlineForm
          product={selectedProduct || undefined}
          onSuccess={handleQuickEditSuccess}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
        /> */}
        <div className="p-4 text-center text-gray-600">
          Quick edit feature will be available after ProductInlineForm migration
        </div>
      </FormModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDelete}
        title="Delete Product"
        description={
          selectedProduct
            ? `Are you sure you want to delete "${selectedProduct.name}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Product"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}
