/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomToast } from "@/components/custom/custom-toast";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminSettingsBreadCrumb } from "@/data/admin-settings-data";
import { useAdminSettings } from "@/hooks/use-admin-settings";
import { SignUpAdmin } from "@/supabase/auth/admin-signup";
import type { SignUpFormData } from "@/utils/types";
import { UserRoundPlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Settings() {
  const {
    navigate,
    register,
    handleSubmit,
    errors,
    isLoading,
    setIsLoading,
    reset,
  } = useAdminSettings();

  const submitForm = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);
      await CustomToast(SignUpAdmin(data), "insert");
      reset();
      setIsLoading(false);
      setTimeout(() => {
        navigate("/admin/settings");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <AdminLayout breadCrumbs={AdminSettingsBreadCrumb}>
      <Toaster position="bottom-right" />
      <div className="p-8 max-full">
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            Admin Settings
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Configure your store, business, and admin settings
          </p>
        </div>

        {/* Business Settings */}
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-6">
              Admin Settings (Create New Admin Account)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  First Name
                </label>
                <Input type="text" {...register("firstName")}></Input>{" "}
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Middle Name
                </label>
                <Input type="text" {...register("middleName")}></Input>
                {errors.middleName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.middleName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Last Name
                </label>
                <Input type="text" {...register("lastName")}></Input>{" "}
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="col-span-1  md:col-span-3">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Birthdate
                </label>
                <Input type="date" {...register("birthdate")}></Input>{" "}
                {errors.birthdate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.birthdate.message}
                  </p>
                )}
              </div>
              <div className=" col-span-2 md:col-span-3">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Email
                </label>
                <Input type="email" {...register("email")}></Input>{" "}
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="col-span-1  md:col-span-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Password
                </label>
                <Input type="password" {...register("password")}></Input>{" "}
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className=" col-span-1 md:col-span-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Confirm Password
                </label>
                <Input type="password" {...register("confirmPassword")}></Input>{" "}
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <Button type="submit" disabled={isLoading} variant={"customized"}>
              <UserRoundPlus /> {isLoading ? "Creating..." : "Create Admin"}
            </Button>
          </div>
        </form>

        {/* Notification Settings
        <div className="bg-card rounded-lg border border-border p-6 mb-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-foreground font-medium">New Orders</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when new orders arrive
                </p>
              </div>
              <Input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-border accent-primary"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-foreground font-medium">Low Stock Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Alert when product stock is low
                </p>
              </div>
              <Input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-border accent-primary"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-foreground font-medium">Customer Feedback</p>
                <p className="text-sm text-muted-foreground">
                  New feedback and reviews
                </p>
              </div>
              <Input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-border accent-primary"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-foreground font-medium">Daily Report</p>
                <p className="text-sm text-muted-foreground">
                  Daily sales and analytics report
                </p>
              </div>
              <Input
                type="checkbox"
                className="w-5 h-5 rounded border-border accent-primary"
              />
            </div>
          </div>
          <Button>
            <Save className="w-4 h-4" />
            Save Preferences
          </Button>
        </div> */}

        {/* Security Settings
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Security
          </h2>
          <div className="space-x-3">
            <Button variant="outline">Change Admin Password</Button>
            <Button variant="outline">Enable Two-Factor Authentication</Button>
            <Button variant="outline">View Activity Log</Button>
            <Button variant="outline">Reset All Analytics Data</Button>
          </div>
        </div> */}
      </div>
    </AdminLayout>
  );
}
