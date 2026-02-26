import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
interface NavbarProps {
  title: string;
  brandLogoUrl: string;
  navItems: { label: string; href: string }[];
  extraItems?: { label: string; href: string }[];
}

const Navbar = ({ title, brandLogoUrl, navItems, extraItems }: NavbarProps) => {
  return (
    <header className=" bg-background border-b border-border z-10 sticky ">
      <div className=" max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 grid grid-cols-5">
        <div className="col-span-1 flex items-center justify-start gap-3">
          <img
            src={brandLogoUrl}
            alt={title}
            className="h-12 w-12 object-cover rounded-full"
          />
          <h1 className="text-3xl hidden md:flex font-extrabold text-foreground love-light-regular">
            {title}
          </h1>
        </div>
        <div className="h-full w-full flex col-span-3 md:hidden items-center justify-center">
          <h1 className="text-3xl  text-center font-extrabold text-foreground love-light-regular">
            {title}
          </h1>
        </div>
        <nav className="hidden md:flex items-center justify-center gap-8 md:col-span-3">
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
        <div className="hidden md:flex items-center justify-end gap-5">
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
        <div className="col-span-1 flex justify-end  md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-5 w-5 mr-2" />
            </SheetTrigger>
            <SheetContent className="w-48">
              <div className="p-5 flex flex-col justify-between h-full">
                <div className="flex flex-col items-start">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="text-sm text-foreground hover:text-primary transition "
                    >
                      <Button variant={"ghost"}>{item.label}</Button>
                    </Link>
                  ))}
                </div>
                <div>
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
