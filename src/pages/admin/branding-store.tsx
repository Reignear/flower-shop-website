import AdminBrandingLayout from "@/components/layout/admin-branding-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export default function BrandingStore() {
  return (
    <AdminBrandingLayout>
      <main>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Store Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Store Name
                </label>
                <Input type="text" placeholder="CELESTIAL BLOOM" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Email
                </label>
                <Input type="email" placeholder="support@flo.com" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Phone
                </label>
                <Input type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Country
                </label>
                <Input type="text" placeholder="United States" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Address
                </label>
                <Input
                  type="text"
                  placeholder="123 Flower Street, Garden City, GC 12345"
                />
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </main>
    </AdminBrandingLayout>
  );
}
