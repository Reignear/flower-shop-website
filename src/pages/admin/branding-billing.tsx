/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDialog from "@/components/custom/custom-dialog";
import { BrandingBillingFormInsert } from "@/components/form/branding-billing-form-insert";
import AdminBrandingLayout from "@/components/layout/admin-branding-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addPaymentMethodData } from "@/data/admin-branding-data";
import { useBillingMethod } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { MoreVertical } from "lucide-react";
import { GCashLogo } from "@/components/icons/Gcash";
import { PayPalLogo } from "@/components/icons/Paypal";
import { BankLogo } from "@/components/icons/Bank";
import { CODLogo } from "@/components/icons/COD";

const PaymentMethodCard = ({ method }: { method: any }) => {
  const getLogoComponent = (type: any) => {
    switch (type) {
      case "gcash":
        return <GCashLogo />;
      case "paypal":
        return <PayPalLogo />;
      case "bank":
        return <BankLogo />;
      case "cod":
        return <CODLogo />;
      default:
        return null;
    }
  };

  const renderCardContent = () => {
    switch (method.method_type) {
      case "gcash":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Account Holder</p>
            <p className="font-semibold text-base">
              {method.gcash_name || "N/A"}
            </p>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-muted-foreground mb-1">Phone Number</p>
              <p className="font-mono text-sm">
                {method.gcash_number || "N/A"}
              </p>
            </div>
          </div>
        );
      case "paypal":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="font-semibold text-base truncate">
              {method.paypal_email || "N/A"}
            </p>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-emerald-600 font-medium">✓ Active</p>
            </div>
          </div>
        );
      case "bank":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Bank Name</p>
            <p className="font-semibold text-base">
              {method.bank_name || "N/A"}
            </p>
            <div className="pt-2 border-t border-gray-200 space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Account Number</p>
                <p className="font-mono text-sm">
                  {method.bank_account_number || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account Name</p>
                <p className="text-sm">{method.bank_account_name || "N/A"}</p>
              </div>
            </div>
          </div>
        );
      case "cod":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Cash on Delivery</p>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-base">Status</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  method.cod_enabled
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {method.cod_enabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 bg-gray-50 rounded-lg">
            {getLogoComponent(method.method_type)}
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            {capitalizeFirstLetter(method.method_type)}
          </span>
        </div>

        {renderCardContent()}
      </CardContent>
    </Card>
  );
};

const AdminBrandingBilling = () => {
  const { data: billingMethods } = useBillingMethod();
  console.log(billingMethods);

  return (
    <AdminBrandingLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {billingMethods?.map((method) => (
            <PaymentMethodCard key={method.id} method={method} />
          ))}
        </div>
      </div>
    </AdminBrandingLayout>
  );
};

export default AdminBrandingBilling;
