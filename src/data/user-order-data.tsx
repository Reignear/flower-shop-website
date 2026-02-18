import { Package, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

export const getOrderStats = (
  totalOrders: number,
  onGoingOrders: number,
  completedOrders: number,
  totalSpent: string,
) => [
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
    value: onGoingOrders,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: CheckCircle2,
    label: "Delivered",
    value: completedOrders,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: TrendingUp,
    label: "Total Spent",
    value: totalSpent,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
];

export const orderBreadCrumb = [
  { label: "Dashboard", href: "/user/dashboard" },
  { label: "Orders", href: "/user/order" },
];
