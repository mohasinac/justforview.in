"use client";

import Link from "next/link";
import { Package, Clock } from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { OrderCardUI } from "@/schemas/ui/order.ui";

interface OrderCardProps {
  order: OrderCardUI;
  onClick?: () => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={order.url}
      onClick={handleClick}
      className="block bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">#{order.orderNumber}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <Clock className="w-4 h-4" />
            <span>{order.createdAtFormatted}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">
            {order.total.formatted}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <StatusBadge status={order.status.value} />
        <StatusBadge status={order.paymentStatus.value} />
      </div>

      {order.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {order.badges.map((badge, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded ${badge.className}`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
