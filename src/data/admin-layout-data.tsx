import { useProductID } from "@/tanstack/fetch.hook";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  BarChart3,
  ChartColumnStacked,
  Tag,
  Truck,
} from "lucide-react";
import { useParams } from "react-router-dom";
export const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    disabled: false,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    disabled: true,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
    disabled: false,
  },
  {
    label: "Category",
    href: "/admin/category",
    icon: ChartColumnStacked,
    disabled: false,
  },
  {
    label: "Order",
    href: "/admin/order",
    items: [
      { label: "All Orders", href: "/admin/order/all", disabled: false },
      { label: "Pending", href: "/admin/order/pending", disabled: true },
      { label: "On Process", href: "/admin/order/on-process", disabled: true },
      { label: "For Pick Up", href: "/admin/order/for-pickup", disabled: true },
      { label: "Delivered", href: "/admin/order/delivered", disabled: false },
      { label: "Declined", href: "/admin/order/declined", disabled: true },
    ],
    icon: Truck,
    disabled: false,
  },
  {
    label: "Feedback",
    href: "/admin/feedback",
    icon: MessageSquare,
    disabled: true,
  },
  { label: "Branding", href: "/admin/branding", icon: Tag, disabled: true },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    disabled: true,
  },
];

export const roleDashboard = "Admin Dashboard";
export const brandName = "Celestial Bloom";

export const dashboardBreadCrumb = [
  { label: "Admin", href: "/admin/dashboard" },
  { label: "Dashboard", href: "/admin/dashboard" },
];

export const categoryBreadCrumb = [
  { label: "Admin", href: "/admin/dashboard" },
  { label: "Category", href: "/admin/category" },
];
export const productBreadCrumb = [
  { label: "Admin", href: "/admin/dashboard" },
  { label: "Product", href: "/admin/products" },
];

export function useViewProductBreadCrumb() {
  const { id: productId } = useParams();
  const { data: product } = useProductID(Number(productId));

  return [
    { label: "Admin", href: "/admin/dashboard" },
    { label: "Product", href: "/admin/products" },
    {
      label: `${product?.name || "Loading..."}`,
      href: `/admin/product/${productId}`,
    },
  ];
}
