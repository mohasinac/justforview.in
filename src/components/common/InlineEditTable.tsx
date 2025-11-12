"use client";

import { useState } from "react";
import { Edit2, X, Check, Loader2 } from "lucide-react";
import type { z } from "zod";

type FieldType = "text" | "number" | "select" | "date";

interface TableField<T> {
  key: keyof T;
  label: string;
  type?: FieldType;
  editable?: boolean;
  options?: { label: string; value: string | number }[];
  render?: (value: any, item: T) => React.ReactNode;
  format?: (value: any) => string;
}

interface InlineEditTableProps<TUI, TBackend> {
  data: TUI[];
  fields: TableField<TUI>[];
  uiSchema: z.ZodType<TUI>;
  backendSchema: z.ZodType<TBackend>;
  onUpdate: (id: string, data: Partial<TBackend>) => Promise<void>;
  toBackend?: (ui: Partial<TUI>) => Partial<TBackend>;
  getIdField?: keyof TUI;
  emptyMessage?: string;
  className?: string;
}

export function InlineEditTable<TUI extends Record<string, any>, TBackend>({
  data,
  fields,
  uiSchema,
  backendSchema,
  onUpdate,
  toBackend,
  getIdField = "id" as keyof TUI,
  emptyMessage = "No items to display",
  className = "",
}: InlineEditTableProps<TUI, TBackend>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TUI>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (item: TUI) => {
    setEditingId(item[getIdField] as string);
    const editableFields = fields
      .filter((f) => f.editable !== false)
      .reduce(
        (acc, f) => ({
          ...acc,
          [f.key]: item[f.key],
        }),
        {}
      );
    setEditData(editableFields);
    setError(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setError(null);
  };

  const handleSave = async (id: string) => {
    try {
      setSaving(true);
      setError(null);

      // Convert to backend schema
      let backendData: Partial<TBackend>;
      if (toBackend) {
        backendData = toBackend(editData);
      } else {
        // If no mapper provided, assume same structure
        backendData = editData as unknown as Partial<TBackend>;
      }

      // Validate backend data
      const backendValidation = backendSchema.safeParse(backendData);
      if (!backendValidation.success) {
        const errorMsg =
          backendValidation.error.issues[0]?.message || "Validation failed";
        setError(errorMsg);
        return;
      }

      await onUpdate(id, backendValidation.data);

      setEditingId(null);
      setEditData({});
    } catch (err) {
      console.error("Failed to save:", err);
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const renderFieldValue = (item: TUI, field: TableField<TUI>) => {
    const value = item[field.key];

    if (field.render) {
      return field.render(value, item);
    }

    if (field.format) {
      return field.format(value);
    }

    if (
      field.type === "date" &&
      value &&
      typeof value === "object" &&
      "toLocaleDateString" in value
    ) {
      return (value as Date).toLocaleDateString();
    }

    if (field.type === "select" && field.options) {
      const option = field.options.find((opt) => opt.value === value);
      return option?.label || value;
    }

    return value?.toString() || "-";
  };

  const renderEditField = (field: TableField<TUI>) => {
    const value = editData[field.key];

    switch (field.type) {
      case "number":
        return (
          <input
            type="number"
            value={(value as number) || 0}
            onChange={(e) =>
              setEditData({
                ...editData,
                [field.key]: parseFloat(e.target.value) || 0,
              })
            }
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        );

      case "select":
        if (!field.options) return null;
        return (
          <select
            value={(value as string | number) || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                [field.key]: e.target.value,
              })
            }
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="">Select...</option>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "date":
        const dateValue =
          value && typeof value === "object" && "toISOString" in value
            ? (value as Date).toISOString().split("T")[0]
            : (value as string) || "";
        return (
          <input
            type="date"
            value={dateValue}
            onChange={(e) =>
              setEditData({
                ...editData,
                [field.key]: new Date(e.target.value),
              })
            }
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        );

      default:
        return (
          <input
            type="text"
            value={(value as string) || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                [field.key]: e.target.value,
              })
            }
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        );
    }
  };

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={`overflow-x-auto rounded-lg border border-gray-200 bg-white ${className}`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {fields.map((field) => (
              <th
                key={String(field.key)}
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                {field.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item) => {
            const id = item[getIdField] as string;
            const isEditing = editingId === id;

            return (
              <tr key={id} className={isEditing ? "bg-purple-50" : ""}>
                {fields.map((field) => (
                  <td key={String(field.key)} className="px-4 py-3 text-sm">
                    {isEditing && field.editable !== false ? (
                      renderEditField(field)
                    ) : (
                      <span className="text-gray-900">
                        {renderFieldValue(item, field)}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  {isEditing ? (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSave(id)}
                        disabled={saving}
                        className="rounded p-1 text-green-600 hover:bg-green-50 disabled:opacity-50"
                        title="Save"
                      >
                        {saving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={saving}
                        className="rounded p-1 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        title="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(item)}
                      className="rounded p-1 text-gray-600 hover:bg-gray-50"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {error && (
        <div className="border-t border-gray-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
