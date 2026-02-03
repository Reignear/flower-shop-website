import AdminBrandingLayout from "@/components/layout/admin-branding-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
const BrandingShipping = () => {
  return (
    <AdminBrandingLayout>
      <main>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Business Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Currency
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">USD ($)</SelectItem>
                    <SelectItem value="dark">EUR (€)</SelectItem>
                    <SelectItem value="system">GBP (£)</SelectItem>
                    <SelectItem value="system">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Timezone
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      America/New_York (EST)
                    </SelectItem>
                    <SelectItem value="dark">America/Chicago (CST)</SelectItem>
                    <SelectItem value="system">America/Denver (MST)</SelectItem>
                    <SelectItem value="system">
                      America/Los_Angeles (PST)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Shipping Cost
                </label>
                <Input type="number" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Tax Rate (%)
                </label>
                <Input type="number" />
              </div>
            </div>
            <Button>
              <Save />
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </main>
    </AdminBrandingLayout>
  );
};

export default BrandingShipping;
