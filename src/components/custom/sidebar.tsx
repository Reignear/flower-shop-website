/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  navItems: any;
  roleDashboard: string;
  brandName: string;
  redirectPath: string;
  signOutFunction: () => Promise<{ error: Error | null }>;
}

export default function SideBar({
  navItems,
  roleDashboard,
  brandName,
  redirectPath,
  signOutFunction,
}: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    () => {
      // Initialize expanded state based on active routes
      const initialExpanded: Record<string, boolean> = {};
      navItems.forEach((item: any) => {
        if (item.items && item.items.length > 0) {
          const hasActiveChild = item.items.some(
            (subItem: any) =>
              pathname === subItem.href ||
              pathname.startsWith(subItem.href + "/"),
          );
          initialExpanded[item.label] = hasActiveChild;
        }
      });
      return initialExpanded;
    },
  );

  const handleLogout = async () => {
    const { error } = await signOutFunction();
    if (error) {
      console.error("Logout failed:", error);
    } else {
      navigate(redirectPath);
    }
  };

  const toggleDropdown = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border max-h-screen flex flex-col sticky z-10 top-0">
      <div className="px-6 py-5  h-25 border-b border-sidebar-border ">
        <h2 className="text-2xl font-bold text-sidebar-foreground">
          {brandName}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{roleDashboard}</p>
      </div>

      <nav className="flex-1 p-6 overflow-y-auto">
        {navItems.map((item: any) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const hasDropdown = item.items && item.items.length > 0;
          const isExpanded = expandedItems[item.label];

          return (
            <div
              key={item.label}
              className={`${isExpanded ? "bg-emerald-50" : ""} mb-2`}
            >
              {hasDropdown ? (
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={cn(
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-allors ${item.disabled && "cursor-not-allowed opacity-50"}`,
                    isActive
                      ? "bg-emerald-600 text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-emerald-100",
                  )}
                  disabled={item.disabled}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium flex-1 text-left">
                    {item.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4  transition-all",
                      isExpanded && "rotate-180",
                    )}
                  />
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.disabled && "cursor-not-allowed opacity-50"}`,
                    isActive
                      ? "bg-emerald-600 text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-emerald-100",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )}

              {hasDropdown && (
                <div
                  className={cn(
                    "ml-6 mt-2 space-y-1 overflow-hidden transition-all duration-300",
                    isExpanded
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0 pointer-events-none",
                  )}
                  style={{ transitionProperty: "max-height, opacity" }}
                >
                  {item.items.map((subItem: any) => {
                    const isSubActive =
                      pathname === subItem.href ||
                      pathname.startsWith(subItem.href + "/");
                    return (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={cn(
                          `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${subItem.disabled && "cursor-not-allowed opacity-50"}`,
                          isSubActive
                            ? "bg-emerald-600 text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-emerald-100",
                        )}
                      >
                        <span className="font-medium">{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-6 border-t border-sidebar-border  ">
        <button
          onClick={handleLogout}
          className="w-full flex hover:cursor-pointer items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-emerald-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
