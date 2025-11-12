"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import type { OrderUI } from "@/schemas/ui/order.ui";

export const dynamic = "force-dynamic";

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user, filters]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      // TODO: Implement ordersService.list when service is ready
      // const data = await ordersService.list(filters);
      // setOrders(data.data || []);
      setOrders([]);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "orderNumber",
      label: "Order ID",
      sortable: true,
      render: (_: any, order: OrderUI) => (
        <button
          onClick={() => router.push(order.url)}
          className="font-medium text-primary hover:underline"
        >
          #{order.orderNumber}
        </button>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (_: any, order: OrderUI) => order.createdAtFormatted,
    },
    {
      key: "itemCount",
      label: "Items",
      render: (_: any, order: OrderUI) => `${order.itemCount} items`,
    },
    {
      key: "total",
      label: "Total",
      sortable: true,
      render: (_: any, order: OrderUI) => order.pricing.total.formatted,
    },
    {
      key: "status",
      label: "Status",
      render: (_: any, order: OrderUI) => (
        <StatusBadge status={order.status.value} />
      ),
    },
    {
      key: "paymentStatus",
      label: "Payment",
      render: (_: any, order: OrderUI) => (
        <StatusBadge status={order.paymentStatus.value} />
      ),
    },
  ];

  if (!user) {
    router.push("/login?redirect=/user/orders");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <EmptyState
              title="No orders found"
              description="You haven't placed any orders yet"
              action={{
                label: "Start Shopping",
                onClick: () => router.push("/"),
              }}
            />
          ) : (
            <DataTable
              data={orders}
              columns={columns}
              keyExtractor={(order) => order.id}
              isLoading={loading}
              onRowClick={(order: OrderUI) => router.push(order.url)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
