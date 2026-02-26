import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useAdminBranding } from "@/hooks/use-admin-branding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useInsertGcash,
  useInsertPayPal,
  useInsertBankTransfer,
  useInsertCOD,
} from "@/tanstack/billing.method.mutation";
import type {
  BankTransferMethod,
  GcashMethod,
  PayPalMethod,
} from "@/utils/interface";
import { CustomToast } from "@/components/custom/custom-toast";
export function BrandingBillingFormInsert() {
  const {
    activePaymentMethod,
    setActivePaymentMethod,
    registerGcash,
    handleSubmitGcash,
    registerPayPal,
    handleSubmitPayPal,
    registerBank,
    handleSubmitBankTransfer,
    // registerCOD,
    handleSubmitCOD,
  } = useAdminBranding();

  const insertGcashMutation = useInsertGcash();
  const insertPayPalMutation = useInsertPayPal();
  const insertBankTransferMutation = useInsertBankTransfer();
  const insertCODMutation = useInsertCOD();

  const submitGcash = async (data: GcashMethod) => {
    try {
      console.log("Submitting GCash data:", data);
      await CustomToast(
        insertGcashMutation.mutateAsync({ gcash: data }),
        "insert",
      );
    } catch (error) {
      console.log("Error in inserting gcash billing method", error);
    }
  };
  const submitPayPal = async (data: PayPalMethod) => {
    try {
      await CustomToast(
        insertPayPalMutation.mutateAsync({ paypal: data }),
        "insert",
      );
    } catch (error) {
      console.log("Error in inserting PayPal billing method", error);
    }
  };
  const submitBankTransfer = async (data: BankTransferMethod) => {
    try {
      await CustomToast(
        insertBankTransferMutation.mutateAsync({ bank: data }),
        "insert",
      );
    } catch (error) {
      console.log("Error in inserting bank transfer billing method", error);
    }
  };
  const submitCOD = async () => {
    try {
      await CustomToast(insertCODMutation.mutateAsync(), "insert");
    } catch (error) {
      console.log("Error in inserting COD billing method", error);
    }
  };

  return (
    <div className="space-y-5">
      <RadioGroup
        value={activePaymentMethod}
        onValueChange={setActivePaymentMethod}
        className="w-full"
      >
        <div className="grid grid-cols-2 gap-5">
          {/* GCash */}
          <Label
            htmlFor="gcash"
            className="border p-5 flex items-center gap-3 rounded-lg cursor-pointer"
          >
            <RadioGroupItem value="gcash" id="gcash" />
            <span>GCash</span>
          </Label>

          {/* Cash on Delivery */}
          <Label
            htmlFor="cod"
            className="border p-5 flex items-center gap-3 rounded-lg cursor-pointer"
          >
            <RadioGroupItem value="cod" id="cod" />
            <span>Cash on Delivery</span>
          </Label>

          {/* PayPal */}
          <Label
            htmlFor="paypal"
            className="border p-5 flex items-center gap-3 rounded-lg cursor-pointer"
          >
            <RadioGroupItem value="paypal" id="paypal" />
            <span>PayPal</span>
          </Label>

          {/* Bank Transfer */}
          <Label
            htmlFor="bank"
            className="border p-5 flex items-center gap-3 rounded-lg cursor-pointer"
          >
            <RadioGroupItem value="bank" id="bank" />
            <span>Bank Transfer</span>
          </Label>
        </div>
      </RadioGroup>

      <Separator />

      {/* GCash Method */}
      {activePaymentMethod === "gcash" && (
        <form onSubmit={handleSubmitGcash(submitGcash)}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">GCash Method</h2>
            <div className=" grid grid-cols-2 gap-5 space-y-4">
              <div className="space-y-2">
                <Label>GCash Number</Label>
                <Input
                  type="number"
                  placeholder="09XXXXXXXXX"
                  {...registerGcash("gcash_number")}
                />
              </div>
              <div className="space-y-2">
                <Label>Account Name</Label>
                <Input
                  required
                  placeholder="Juan Dela Cruz"
                  {...registerGcash("gcash_name")}
                />
              </div>
            </div>
            <div className="flex justify-end ">
              <Button disabled={insertGcashMutation.isPending}>
                {insertGcashMutation.isPending ? "Saving..." : "Save GCash"}
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* COD Method */}
      {activePaymentMethod === "cod" && (
        <form onSubmit={handleSubmitCOD(submitCOD)}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Cash on Delivery</h2>

            <p className="text-sm text-muted-foreground">
              Enable Cash on Delivery for customers.
            </p>
            <div className="flex justify-end ">
              <Button disabled={insertCODMutation.isPending}>
                {insertCODMutation.isPending ? "Saving..." : "Enable COD"}
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* PayPal Method */}
      {activePaymentMethod === "paypal" && (
        <form onSubmit={handleSubmitPayPal(submitPayPal)}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">PayPal Method</h2>

            <div className="space-y-2">
              <Label>PayPal Email</Label>
              <Input
                placeholder="your@email.com"
                {...registerPayPal("paypal_email")}
              />
            </div>
            <div className="flex justify-end">
              <Button disabled={insertPayPalMutation.isPending}>
                {insertPayPalMutation.isPending ? "Saving..." : "Save PayPal"}
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Bank Transfer Method */}
      {activePaymentMethod === "bank" && (
        <form onSubmit={handleSubmitBankTransfer(submitBankTransfer)}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Bank Transfer Method</h2>
            <div className="grid grid-cols-3 gap-5">
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input
                  placeholder="BDO, BPI, Metrobank"
                  {...registerBank("bank_name")}
                />
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input
                  placeholder="1234 5678 9012"
                  {...registerBank("bank_account_number")}
                />
              </div>
              <div className="space-y-2">
                <Label>Account Name</Label>
                <Input
                  placeholder="Juan Dela Cruz"
                  {...registerBank("bank_account_name")}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button disabled={insertBankTransferMutation.isPending}>
                {insertBankTransferMutation.isPending
                  ? "Saving..."
                  : "Save Bank"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
