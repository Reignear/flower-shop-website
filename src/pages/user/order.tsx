import { useState } from "react";
import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomOrderCard } from "@/components/custom/custom-order-card";
import {
  Filter,
  Search,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";
import type { Status } from "@/utils/types";

const orderss = [
  {
    id: "#12345",
    product: "Rose Elegance Bouquet",
    quantity: 1,
    date: "2024-01-15",
    amount: "$70.99",
    status: "delivered",
    trackingNumber: "TRACK123456",
    image: "/products/rose-elegance.jpg",
  },
  {
    id: "#12344",
    product: "Tulip Paradise Bundle",
    quantity: 2,
    date: "2024-01-10",
    amount: "$89.99",
    status: "delivered",
    trackingNumber: "TRACK123455",
    image: "/products/tulip-paradise.jpg",
  },
  {
    id: "#12343",
    product: "Wedding Invitation Cards",
    quantity: 150,
    date: "2024-01-05",
    amount: "$120.00",
    status: "declined",
    trackingNumber: "TRACK123454",
    image: "/products/wedding-cards.jpg",
  },
  {
    id: "#12342",
    product: "Gift Hamper Deluxe",
    quantity: 1,
    date: "2024-01-01",
    amount: "$150.00",
    status: "delivered",
    trackingNumber: "TRACK123453",
    image: "/products/gift-hamper.jpg",
  },
  {
    id: "#12341",
    product: "Special Mixed Bouquet",
    quantity: 1,
    date: "2023-12-28",
    amount: "$95.99",
    status: "delivered",
    trackingNumber: "TRACK123452",
    image: "/products/mixed-bouquet.jpg",
  },
  {
    id: "#12340",
    product: "Aster Delight Bouquet",
    quantity: 3,
    date: "2023-12-24",
    amount: "$212.97",
    status: "delivered",
    trackingNumber: "TRACK123451",
    image: "/products/aster-delight.jpg",
  },
  {
    id: "#12339",
    product: "Debut Invitation Cards",
    quantity: 200,
    date: "2023-12-20",
    amount: "$180.00",
    status: "delivered",
    trackingNumber: "TRACK123450",
    image: "/products/debut-cards.jpg",
  },
  {
    id: "#12338",
    product: "Subscription Service",
    quantity: 1,
    date: "2023-12-15",
    amount: "$49.99",
    status: "on-going",
    trackingNumber: "SUB123449",
    image: "/products/subscription.jpg",
  },
];

export default function Order() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders =
    filterStatus === "all"
      ? orderss
      : orderss.filter((order) =>
          order.status.toLowerCase().includes(filterStatus.toLowerCase()),
        );

  const totalOrders = orderss.length;
  const deliveredOrders = orderss.filter(
    (o) => o.status.toLowerCase() === "delivered",
  ).length;
  const processingOrders = orderss.filter(
    (o) => o.status.toLowerCase() === "on-going",
  ).length;

  const stats = [
    {
      icon: Package,
      label: "Total Orders",
      value: totalOrders,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Clock,
      label: "Processing",
      value: processingOrders,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      icon: CheckCircle2,
      label: "Delivered",
      value: deliveredOrders,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      icon: TrendingUp,
      label: "Total Spent",
      value: `$${orderss.reduce((sum, o) => sum + parseFloat(o.amount.slice(1)), 0).toFixed(2)}`,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <UserLayout>
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
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

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
                  onClick={() => setFilterStatus("delivered")}
                  variant={filterStatus === "delivered" ? "default" : "outline"}
                  className={
                    filterStatus === "delivered"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : ""
                  }
                >
                  delivered
                </Button>
                <Button
                  onClick={() => setFilterStatus("processing")}
                  variant={
                    filterStatus === "processing" ? "default" : "outline"
                  }
                  className={
                    filterStatus === "processing"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : ""
                  }
                >
                  Processing
                </Button>
              </div>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredOrders.map((order) => (
              <CustomOrderCard
                key={order.id}
                {...order}
                status={order.status as Status}
                isExpanded={expandedOrder === order.id}
                onViewDetails={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
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
