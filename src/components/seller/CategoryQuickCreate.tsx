"use client";

import { useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { categoriesService } from "@/services/categories.service";
import SlugInput from "@/components/common/SlugInput";

interface Props {
  onCreated: (categoryId: string) => void;
  onCancel: () => void;
}

export function CategoryQuickCreate({ onCreated, onCancel }: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newCategory = await categoriesService.create({
        name: name.trim(),
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        description: description.trim() || undefined,
        parentIds: [],
        path: `/${slug || name.toLowerCase().replace(/\s+/g, "-")}`,
        level: 0,
        hasChildren: false,
        childCount: 0,
        sortOrder: 0,
        isFeatured: false,
        showOnHomepage: false,
        isActive: false,
        productCount: 0,
        commissionRate: 0,
        createdBy: "seller",
        needsReview: true,
      } as any);

      onCreated(newCategory.id);
    } catch (err: any) {
      console.error("Failed to create category:", err);
      setError(err.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">
            Quick Create Category
          </h2>
          <button
            onClick={onCancel}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-4">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Info Message */}
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-700">
              Your category will be reviewed by an admin before appearing
              publicly.
            </p>
          </div>

          {/* Category Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Vintage Watches"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category URL
            </label>
            <SlugInput value={slug} sourceText={name} onChange={setSlug} />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Brief description of the category..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Category"
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
