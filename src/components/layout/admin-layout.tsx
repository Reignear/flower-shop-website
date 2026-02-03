import SideBar from "@/components/custom/sidebar";
import { navItems, roleDashboard, brandName } from "@/data/admin-layout-data";
import { AdminSignOut } from "@/supabase/auth/admin-signout";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen ">
      <SideBar
        signOutFunction={AdminSignOut}
        redirectPath="/admin/signin"
        navItems={navItems}
        roleDashboard={roleDashboard}
        brandName={brandName}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
