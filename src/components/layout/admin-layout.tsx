/* eslint-disable @typescript-eslint/no-explicit-any */
import SideBar from "@/components/custom/sidebar";
import { navItems, roleDashboard, brandName } from "@/data/admin-layout-data";
import { AdminSignOut } from "@/supabase/auth/admin-signout";
import { ChevronRight, Menu, LogOut, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import toast from "react-hot-toast";
import { useState } from "react";

interface AdminLayoutProps {
  className?: string;
  children: React.ReactNode;
  breadCrumbs?: { label: string; href: string }[];
}

const AdminLayout = ({
  className,
  children,
  breadCrumbs,
}: AdminLayoutProps) => {
  // Path
  const location = useLocation();
  const pathname = location.pathname;
  // Logout
  const navigate = useNavigate();
  const handleLogout = async () => {
    const { error } = await AdminSignOut();
    if (error) {
      toast.error(error?.message || "Logout failed");
    } else {
      navigate("/admin/signin");
    }
  };

  // Expanded Items
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    () => {
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
  // Toggle Dropdown for Mobile Menu
  const toggleDropdown = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="md:flex min-h-screen ">
      <SideBar
        logoutFunction={handleLogout}
        redirectPath="/admin/signin"
        navItems={navItems}
        roleDashboard={roleDashboard}
        brandName={brandName}
      />

      <main className="flex-1">
        <div className="p-6 flex flex-col md:flex-row md:items-center  border-b px-6 py-5 h-25 bg-sidebar sticky z-20 top-0 border-sidebar-border">
          {/* Mobile Menu - Only visible on mobile */}
          <div className="md:hidden mr-4 ">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-55 flex flex-col">
                <div className="px-6 py-5 border-b border-sidebar-border">
                  <h2 className="text-2xl font-bold text-sidebar-foreground">
                    {brandName}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {roleDashboard}
                  </p>
                </div>

                {/* Mobile navigation content with dropdown support */}
                <div className="flex flex-col items-start p-5 gap-3 flex-1 overflow-y-auto">
                  {navItems.map((item: any) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/");
                    const hasDropdown = item.items && item.items.length > 0;
                    const isExpanded = expandedItems[item.label];

                    return (
                      <div
                        key={item.label}
                        className={`${isExpanded ? "bg-gray-100 " : ""} `}
                      >
                        {hasDropdown ? (
                          <button
                            onClick={() => toggleDropdown(item.label)}
                            className={`md:text-base text-sm w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-emerald-600 text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-emerald-100"}`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium flex-1 text-left">
                              {item.label}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4  transition-all" ${isExpanded && "rotate-180"}`}
                            />
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            className={`md:text-base text-sm flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-emerald-600 text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-emerald-100"}`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        )}

                        {hasDropdown && (
                          <div
                            className={` md:text-base text-sm ml-6 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
                            style={{
                              transitionProperty: "max-height, opacity",
                            }}
                          >
                            {item.items.map((subItem: any) => {
                              const isSubActive =
                                pathname === subItem.href ||
                                pathname.startsWith(subItem.href + "/");
                              return (
                                <Link
                                  key={subItem.href}
                                  to={subItem.href}
                                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${isSubActive ? "bg-emerald-600 text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-emerald-100"}`}
                                >
                                  <span className="font-medium">
                                    {subItem.label}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 border-t border-sidebar-border mt-auto">
                  <button
                    onClick={handleLogout}
                    className="w-full flex hover:cursor-pointer items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-emerald-100 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium md:text-base text-sm">
                      Logout
                    </span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-2">
            {breadCrumbs?.map((item, index) => {
              const isLast = index === breadCrumbs.length - 1;
              return (
                <div
                  key={item.href}
                  className="text-muted-foreground md:text-base text-xs"
                >
                  <Link
                    to={item.href}
                    className="hover:underline flex items-center gap-2"
                  >
                    {item.label}
                    {!isLast ? <ChevronRight className="h-5 w-5" /> : null}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className={className}>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
