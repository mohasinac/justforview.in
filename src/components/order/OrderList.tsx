"use client";

import { OrderCard } from "./OrderCard";
import { EmptyState } from "@/components/common/EmptyState";
import type { OrderCardUI } from "@/schemas/ui/order.ui";

interface OrderListProps {
  orders: OrderCardUI[];
  loading?: boolean;
  emptyMessage?: string;
  onOrderClick?: (orderId: string) => void;
}

export function OrderList({
  orders,
  loading = false,
  emptyMessage = "No orders found",
  onOrderClick,
}: OrderListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onClick={() => onOrderClick?.(order.id)}
        />
      ))}
    </div>
  );
}
