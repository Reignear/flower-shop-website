import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/tanstack/fetch.hook";
import type { Order } from "@/utils/interface";
import {
  getOrderStats,
  orderBreadCrumb,
  tabItems,
} from "@/data/user-order-data";
import { Link, useLocation } from "react-router-dom";
interface OrderProps {
  
  children: React.ReactNode;
}
export default function Order({ children }: OrderProps) {
  const { data: orders } = useOrder();

  const location = useLocation();
  const pathname = location.pathname;
  // Filtering logic

  // Stats calculations
  const totalOrders = orders?.length || 0;
  const completedOrders =
    orders?.filter((o) => o.status.toLowerCase() === "delivered").length || 0;
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
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex gap-2 flex-wrap">
                {tabItems.map((tab, index) => {
                  const isActive =
                    pathname === tab.href ||
                    pathname.startsWith(tab.href + "/");
                  return (
                    <Link to={tab.href} key={index}>
                      <Button
                        variant={`${isActive ? "customized" : "outline"}`}
                      >
                        {tab.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">{children}</div>
        </div>
      </div>
    </UserLayout>
  );
}
