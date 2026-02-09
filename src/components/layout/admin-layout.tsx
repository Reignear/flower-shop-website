import SideBar from "@/components/custom/sidebar";
import { navItems, roleDashboard, brandName } from "@/data/admin-layout-data";
import { AdminSignOut } from "@/supabase/auth/admin-signout";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  breadCrumbs?: { label: string; href: string }[];
}

const AdminLayout = ({ children, breadCrumbs }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen ">
      <SideBar
        signOutFunction={AdminSignOut}
        redirectPath="/admin/signin"
        navItems={navItems}
        roleDashboard={roleDashboard}
        brandName={brandName}
      />

      <main className="flex-1">
        <div className="p-6 flex items-center border-b  h-25 bg-sidebar sticky z-10 top-0 border-sidebar-border">
          <div className="flex items-center gap-2 text-sm">
            {breadCrumbs?.map((item, index) => {
              const isLast = index === breadCrumbs.length - 1;
              return (
                <div key={item.href} className=" text-muted-foreground">
                  <Link
                    to={item.href}
                    className="hover:underline flex items-center gap-2 "
                  >
                    {item.label}
                    {!isLast ? <ChevronRight className="h-5 w-5" /> : null}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
