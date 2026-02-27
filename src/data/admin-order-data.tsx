import { useOrderById } from "@/tanstack/fetch.hook";
import { useParams } from "react-router-dom";

export const orderAllBreadCrumb = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Orders", href: "/admin/order" },
];

export const orderPendingBreadCrumb = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Orders", href: "/admin/order" },
  { label: "Pending Orders", href: "/admin/order/pending" },
];

export const orderDeliveredBreadCrumb = [
  { label: "AdDashboardmin", href: "/admin/dashboard" },
  { label: "Orders", href: "/admin/order" },
  { label: "Delivered Orders", href: "/admin/order/delivered" },
];

export const orderDeclinedBreadCrumb = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Orders", href: "/admin/order" },
  { label: "Declined Orders", href: "/admin/order/declined" },
];

export const orderOnProcessBreadCrumb = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Orders", href: "/admin/order" },
  { label: "On Process Orders", href: "/admin/order/on-process" },
];

export const orderForPickupBreadCrumb = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Orders", href: "/admin/order" },
  { label: "For Pick Up Orders", href: "/admin/order/for-pickup" },
];

export function usePendingBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Order", href: "/admin/order/all" },
    { label: "Pending Orders", href: "/admin/order/pending" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/admin/order/pending/${id}`,
    },
  ];
}

export function useOnProcessBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Order", href: "/admin/order/all" },
    { label: "On Process Orders", href: "/admin/order/on-process" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/admin/order/on-process/${id}`,
    },
  ];
}

export function useForPickupBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Order", href: "/admin/order/all" },
    { label: "For Pickup Orders", href: "/admin/order/for-pickup" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/admin/order/for-pickup/${id}`,
    },
  ];
}
export function useDeliveredBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Order", href: "/admin/order/all" },
    { label: "Delivered Orders", href: "/admin/order/delivered" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/admin/order/delivered/${id}`,
    },
  ];
}

export function useDeclinedBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Order", href: "/admin/order/all" },
    { label: "Declined Orders", href: "/admin/order/declined" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/admin/order/declined/${id}`,
    },
  ];
}
