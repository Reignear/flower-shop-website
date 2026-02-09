/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const handleLogout = async () => {
    const { error } = await signOutFunction();
    if (error) {
      console.error("Logout failed:", error);
    } else {
      navigate(redirectPath);
    }
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border max-h-screen flex flex-col sticky z-10 top-0">
      <div className="px-6 py-5  h-25 border-b border-sidebar-border">
        <h2 className="text-2xl font-bold text-sidebar-foreground">
          {brandName}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{roleDashboard}</p>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item: any) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-sidebar-border  ">
        <button
          onClick={handleLogout}
          className="w-full flex hover:cursor-pointer items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
