import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/admin-layout";
import { tabItems } from "@/data/admin-branding-layout-data";
import { Link } from "react-router-dom";

interface SystemProps {
  children?: React.ReactNode;
}

export default function System({ children }: SystemProps) {
  const pathname = location.pathname;

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Branding</h1>
          <p className="text-muted-foreground">
            General brand settings and preferences
          </p>
        </div>
        <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
          {tabItems.map((tab) => {
            const isActive =
              pathname === tab.url || pathname.startsWith(tab.url + "/");
            return (
              <Link
                key={tab.id}
                to={tab.url}
                className={cn(
                  "px-6 py-3 font-medium border-b-2 transition whitespace-nowrap flex items-center gap-2   min-w-40 ",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
        {children}
      </div>
    </DashboardLayout>
  );
}
