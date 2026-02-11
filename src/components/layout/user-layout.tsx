import SideBar from "@/components/custom/sidebar";
import { navItems, roleDashboard, brandName } from "@/data/user-layout-data";
import { UserSignOut } from "@/supabase/auth/user-signout";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
interface UserLayoutProps {
  children: React.ReactNode;
  breadCrumbs?: { label: string; href: string }[];
}
const UserLayout = ({ children, breadCrumbs }: UserLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <SideBar
        signOutFunction={UserSignOut}
        redirectPath="/"
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

export default UserLayout;
