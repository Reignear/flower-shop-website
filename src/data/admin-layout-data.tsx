import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  BarChart3,
  ChartColumnStacked,
  Tag,
  Cuboid,
} from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Category",
    href: "/admin/category",
    icon: ChartColumnStacked,
  },
  {
    label: "Order",
    href: "/admin/order",
    items: [
      { label: "All Orders", href: "/admin/order/all" },
      { label: "Pending", href: "/admin/order/pending" },
      { label: "On Process", href: "/admin/order/on-process" },
      { label: "For Pick Up", href: "/admin/order/for-pickup" },
      { label: "Delivered", href: "/admin/order/delivered" },
      { label: "Declined", href: "/admin/order/declined" },
    ],
    icon: Cuboid,
  },
  {
    label: "Feedback",
    href: "/admin/feedback",
    items: [
      { label: "Order Feedback", href: "/admin/feedback/order" },
      { label: "Product Feedback", href: "/admin/feedback/product" },
    ],
    icon: MessageSquare,
  },
  { label: "Branding", href: "/admin/branding", icon: Tag },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export const roleDashboard = "Admin Dashboard";
export const brandName = "Celestial Bloom";

export const dashboardBreadCrumb = [
  { label: "Dashboard", href: "/admin/dashboard" },
];

export const categoryBreadCrumb = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Category", href: "/admin/category" },
];
export const productBreadCrumb = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Product", href: "/admin/products" },
];
