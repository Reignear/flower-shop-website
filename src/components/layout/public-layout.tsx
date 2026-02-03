import Footer from "@/components/custom/footer";
import Navbar from "@/components/custom/navbar";
import { title, brandLogoUrl, NavItems, ExtraItems } from "@/data/header-data";

interface GuestLayoutProps {
  children: React.ReactNode;
}
const PublicLayout = ({ children }: GuestLayoutProps) => {
  return (
    <div>
      <header>
        <Navbar
          title={title}
          brandLogoUrl={brandLogoUrl}
          navItems={NavItems}
          extraItems={ExtraItems}
        ></Navbar>
      </header>
      <main className="min-h-screen">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PublicLayout;
