import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface NavbarProps {
  title: string;
  brandLogoUrl: string;
  navItems: { label: string; href: string }[];
  extraItems?: { label: string; href: string }[];
}

const Navbar = ({ title, brandLogoUrl, navItems, extraItems }: NavbarProps) => {
  return (
    <header className="bg-background border-b border-border z-10 sticky ">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={brandLogoUrl}
            alt={title}
            className="h-12 w-12 object-cover rounded-full"
          />
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm text-foreground hover:text-primary transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-5">
          {extraItems?.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm text-foreground hover:text-primary transition"
            >
              <Button variant={"link"}>{item.label}</Button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
