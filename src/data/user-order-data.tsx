import { useOrderById } from "@/tanstack/fetch.hook";
import { Package, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";

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

export const tabItems = [
  { label: "All Orders", href: "/user/order/all" },
  { label: "Pending", href: "/user/order/pending" },
  { label: "On Process", href: "/user/order/on-process" },
  { label: "For Pick Up", href: "/user/order/for-pickup" },
  { label: "Delivered", href: "/user/order/delivered" },
  { label: "Declined", href: "/user/order/declined" },
  { label: "Cancelled", href: "/user/order/cancelled" },
];

export const usePendingBreadCrumb = [
  { label: "Dashboard", href: "/user/dashboard" },
  { label: "Orders", href: "/user/order/all" },
  { label: "Pending Orders", href: "/user/order/pending" },
];
export const useOnProcessBreadCrumb = [
  { label: "Dashboard", href: "/user/dashboard" },
  { label: "Orders", href: "/user/order/all" },
  { label: "On Process Orders", href: "/user/order/on-process" },
];
export const useForPickupBreadCrumb = [
  { label: "Dashboard", href: "/user/dashboard" },
  { label: "Orders", href: "/user/order/all" },
  { label: "For Pick Up Orders", href: "/user/order/for-pickup" },
];
export const useDeliveredBreadCrumb = [
  { label: "Dashboard", href: "/user/dashboard" },
  { label: "Orders", href: "/user/order/all" },
  { label: "Delivered Orders", href: "/user/order/delivered" },
];
export const useDeclinedBreadCrumb = [
  { label: "Dashboard", href: "/user/dashboard" },
  { label: "Orders", href: "/user/order/all" },
  { label: "Declined Orders", href: "/user/order/declined" },
];
export const useCancelledBreadCrumb = [
  { label: "Dashboard", href: "/user/dashboard" },
  { label: "Orders", href: "/user/order/all" },
  { label: "Cancelled Orders", href: "/user/order/cancelled" },
];

export function useViewForPickupBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/user/dashboard" },
    { label: "Order", href: "/user/order/all" },
    { label: "For Pickup Orders", href: "/user/order/for-pickup" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/user/order/for-pickup/${id}`,
    },
  ];
}
export function useViewDeliveredBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/user/dashboard" },
    { label: "Order", href: "/user/order/all" },
    { label: "Delivered Orders", href: "/user/order/delivered" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/user/order/delivered/${id}`,
    },
  ];
}

export function useViewDeclinedBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/user/dashboard" },
    { label: "Order", href: "/user/order/all" },
    { label: "Declined Orders", href: "/user/order/declined" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/user/order/declined/${id}`,
    },
  ];
}

export const cancelTitle = "Are you sure you want to cancel this order?";
export const cancelDescription =
  "This action cannot be undone. Please confirm if you want to proceed with canceling your order.";

export function useViewPendingBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/user/dashboard" },
    { label: "Order", href: "/user/order/all" },
    { label: "Pending Orders", href: "/user/order/pending" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/user/order/pending/${id}`,
    },
  ];
}
export function useViewOnProcessBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/user/dashboard" },
    { label: "Order", href: "/user/order/all" },
    { label: "On Process Orders", href: "/user/order/on-process" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/user/order/pending/${id}`,
    },
  ];
}
