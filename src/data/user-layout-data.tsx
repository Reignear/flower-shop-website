import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Settings,
  Truck,
} from "lucide-react";
export const navItems = [
  { label: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/user/products", icon: Package },
  { label: "Cart", href: "/user/cart", icon: ShoppingCart },
  { label: "Orders", href: "/user/order", icon: Truck },
  { label: "Settings", href: "/user/settings", icon: Settings },
];

export const roleDashboard = "User Dashboard";
export const brandName = "Celestial Bloom";
