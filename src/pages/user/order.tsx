import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomOrderCard } from "@/components/custom/custom-order-card";
import { Filter, Package } from "lucide-react";
import { useOrder } from "@/tanstack/fetch.hook";
import type { Order } from "@/utils/interface";
import { getOrderStats, orderBreadCrumb } from "@/data/user-order-data";
import { useUserOrder } from "@/hooks/use-user-order";
import Skeleton from "react-loading-skeleton";

export default function Order() {
  const { filterStatus, setFilterStatus } = useUserOrder();
  const { data: orders, isLoading: isOrderLoading } = useOrder();

  // Filtering logic
  const filteredOrders =
    orders?.filter((order) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "pending")
        return order.status.toLowerCase() === "pending";
      if (filterStatus === "on-going")
        return order.status.toLowerCase() === "on-going";
      if (filterStatus === "ready-for-pick")
        return order.status.toLowerCase() === "ready-for-pick";
      if (filterStatus === "completed")
        return order.status.toLowerCase() === "completed";
      if (filterStatus === "declined")
        return order.status.toLowerCase() === "declined";
      return false;
    }) ?? [];

  // Stats calculations
  const totalOrders = orders?.length || 0;
  const completedOrders =
    orders?.filter((o) => o.status.toLowerCase() === "completed").length || 0;
  const onGoingOrders =
    orders?.filter((o) => o.status.toLowerCase() === "on-going").length || 0;
  const totalSpent =
    orders?.reduce((sum, o) => sum + o.total_amount, 0).toFixed(2) || "0.00";

  const stats = getOrderStats(
    totalOrders,
    onGoingOrders,
    completedOrders,
    totalSpent,
  );

  console.log("Orders:", orders);

  return (
    <UserLayout breadCrumbs={orderBreadCrumb}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-8">
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Orders
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track and manage all your orders in one place
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={stat.label}
                    className="border-0 overflow-hidden bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {stat.label}
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                        </div>
                        <div className={`${stat.bg} p-3 rounded-lg`}>
                          <Icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-8">
          {/* Filters and Search */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => setFilterStatus("all")}
                  className={`gap-2 ${
                    filterStatus === "all"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  All Orders
                </Button>
                <Button
                  onClick={() => setFilterStatus("pending")}
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  className={
                    filterStatus === "pending"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : ""
                  }
                >
                  Pending
                </Button>
                <Button
                  onClick={() => setFilterStatus("on-going")}
                  variant={filterStatus === "on-going" ? "default" : "outline"}
                  className={
                    filterStatus === "on-going"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : ""
                  }
                >
                  On Going
                </Button>
                <Button
                  onClick={() => setFilterStatus("declined")}
                  variant={filterStatus === "declined" ? "default" : "outline"}
                  className={
                    filterStatus === "declined"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : ""
                  }
                >
                  Declined
                </Button>
                <Button
                  onClick={() => setFilterStatus("ready-for-pick")}
                  variant={
                    filterStatus === "ready-for-pick" ? "default" : "outline"
                  }
                  className={
                    filterStatus === "ready-for-pick"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : ""
                  }
                >
                  For Pick Up
                </Button>
                <Button
                  onClick={() => setFilterStatus("completed")}
                  variant={filterStatus === "completed" ? "default" : "outline"}
                  className={
                    filterStatus === "completed"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : ""
                  }
                >
                  Completed
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Orders Grid */}
            {filteredOrders?.map((order: Order) => (
              <CustomOrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Loading State */}
          {isOrderLoading && (
            <div className="grid grid-cols-1 gap-5">
              <div className="col-span-2 space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 w-full h-96 rounded-lg skeleton-effect "
                  >
                    <Skeleton width={100} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isOrderLoading && filteredOrders?.length === 0 && (
            <Card className="border-0 bg-white dark:bg-gray-800 text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or search terms
              </p>
            </Card>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
