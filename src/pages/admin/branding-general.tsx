import AdminBrandingLayout from "@/components/layout/admin-branding-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const BrandingGeneral = () => {
  return (
    <AdminBrandingLayout>
      <main>
        <div className="space-y-2">
          <Label className="text-2xl">Landing Page Image</Label>
          <Card>
            <CardContent></CardContent>
          </Card>
        </div>
      </main>
    </AdminBrandingLayout>
  );
};

export default BrandingGeneral;
