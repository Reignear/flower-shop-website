import CustomDialog from "@/components/custom/custom-dialog";
import {BrandingBillingFormInsert} from "@/components/form/branding-billing-form-insert";
import AdminBrandingLayout from "@/components/layout/admin-branding-layout";
import { Button } from "@/components/ui/button";
import { addPaymentMethodData } from "@/data/admin-branding-data";
const AdminBrandingBilling = () => {
  return (
    <AdminBrandingLayout>
      <div className="space-y-6">
        <div className="flex  items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payment Methods</h1>
            <p className="text-muted-foreground mt-2">
              Manage your payment options for customer transactions
            </p>
          </div>
          <div>
            <CustomDialog
              width="md:max-w-4xl"
              title={addPaymentMethodData.title}
              description={addPaymentMethodData.description}
              trigger={<Button>Add Payment Method</Button>}
            >
              <BrandingBillingFormInsert />
            </CustomDialog>
          </div>
        </div>
      </div>
    </AdminBrandingLayout>
  );
};

export default AdminBrandingBilling;
