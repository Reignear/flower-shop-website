import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  BarChart3,
  ChartColumnStacked,
  Tag,
} from "lucide-react";
export const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Category", href: "/admin/category", icon: ChartColumnStacked },
  { label: "Feedback", href: "/admin/feedback", icon: MessageSquare },
  { label: "Branding", href: "/admin/branding", icon: Tag },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const roleDashboard = "Admin Dashboard";
export const brandName = "Celestial Bloom";
