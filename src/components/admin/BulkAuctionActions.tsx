"use client";
import { useState } from "react";
import { auctionsService } from "@/services/auctions.service";

interface Props {
  selectedIds: string[];
  onSuccess: () => void;
  userRole: "admin" | "seller";
}

export function BulkAuctionActions({
  selectedIds,
  onSuccess,
  userRole,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");

  const handleBulkAction = async () => {
    if (!action || selectedIds.length === 0) return;

    setLoading(true);
    try {
      await auctionsService.bulkAction(action, selectedIds);
      onSuccess();
      setAction("");
    } catch (error) {
      console.error("Bulk action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const adminActions = [
    { value: "feature", label: "Feature Auctions" },
    { value: "unfeature", label: "Unfeature Auctions" },
    { value: "approve", label: "Approve Auctions" },
    { value: "reject", label: "Reject Auctions" },
  ];

  const sellerActions = [
    { value: "start", label: "Start Auctions" },
    { value: "end", label: "End Auctions" },
    { value: "cancel", label: "Cancel Auctions" },
    { value: "delete", label: "Delete Auctions" },
  ];

  const actions = userRole === "admin" ? adminActions : sellerActions;

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-gray-600">
        {selectedIds.length} selected
      </span>

      <select
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className="border p-2 rounded"
        disabled={loading || selectedIds.length === 0}
      >
        <option value="">Select action...</option>
        {actions.map((a) => (
          <option key={a.value} value={a.value}>
            {a.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleBulkAction}
        disabled={!action || loading || selectedIds.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {loading ? "Processing..." : "Apply"}
      </button>
    </div>
  );
}
