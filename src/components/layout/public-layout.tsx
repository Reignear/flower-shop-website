import Footer from "@/components/custom/footer";
import Navbar from "@/components/custom/navbar";
import { title as headerData, brandLogoUrl, NavItems, ExtraItems } from "@/data/header-data";

interface GuestLayoutProps {
  children: React.ReactNode;
  className?: string;
    title?: string
  description?: string
}
const PublicLayout = ({ children, className, title, description }: GuestLayoutProps) => {
  return (
    <div>
      <header>
        <Navbar
          title={headerData}
          brandLogoUrl={brandLogoUrl}
          navItems={NavItems}
          extraItems={ExtraItems}
        ></Navbar>
      </header>
      <main className={`min-h-screen ${className}`}>
        {(title || description) && (
          <div className="bg-secondary text-secondary-foreground py-8 md:py-16">
              <div className="max-w-6xl mx-auto px-5">
              {title && (
                <h1 className="text-2xl md:text-5xl font-bold mb-4 text-balance">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-base md:text-lg text-secondary-foreground/80 max-w-2xl text-pretty">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PublicLayout;
