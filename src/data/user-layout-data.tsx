import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Heart,
  Settings,
} from "lucide-react";
export const navItems = [
  { label: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/user/order", icon: ShoppingCart },
  { label: "Products", href: "/user/products", icon: Package },
  { label: "Favorites", href: "/user/favorites", icon: Heart },
  { label: "Settings", href: "/user/settings", icon: Settings },
];

export const roleDashboard = "User Dashboard";
export const brandName = "Celestial Bloom";
