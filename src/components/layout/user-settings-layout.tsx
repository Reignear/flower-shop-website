import UserLayout from "@/components/layout/user-layout";
import { Button } from "@/components/ui/button";
import { tabItems } from "@/data/user-settings-data";
import { Link } from "react-router-dom";
interface SettingsPageProps {
  children: React.ReactNode;
  className?: string;
  breadCrumbs?: { label: string; href: string }[];
}

export default function UserSettingsLayout({
  children,
  className,
  breadCrumbs,
}: SettingsPageProps) {
  const pathname = location.pathname;

  return (
    <UserLayout breadCrumbs={breadCrumbs}>
      <div className="p-8 space-y-2">
        <div className="mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="md:text-base text-sm text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        <div className="grid grid-cols-2 md:flex gap-3 ">
          {tabItems.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link to={item.href} key={index}>
                <Button
                  className={`w-full ${isActive ? "underline underline-offset-4" : ""}`}
                  variant="link"
                >
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
        <div className={className}>{children}</div>
      </div>
    </UserLayout>
  );
}
