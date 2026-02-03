import SideBar from "@/components/custom/sidebar";
import { navItems, roleDashboard, brandName } from "@/data/user-layout-data";
import { UserSignOut } from "@/supabase/auth/user-signout";
interface UserLayoutProps {
  children: React.ReactNode;
}
const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <SideBar
        signOutFunction={UserSignOut}
        redirectPath="/"
        navItems={navItems}
        roleDashboard={roleDashboard}
        brandName={brandName}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default UserLayout;
