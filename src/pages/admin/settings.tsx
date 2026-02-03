import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, UserRoundPlus } from "lucide-react";
export default function Settings() {
  return (
    <AdminLayout>
      <div className="p-8 max-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Settings
          </h1>
          <p className="text-muted-foreground">
            Configure your store, business, and admin settings
          </p>
        </div>

       
        {/* Business Settings */}
        
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Admin Settings (Create New Admin Account)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  First Name
                </label>

                <Input type="text"></Input>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Middle Name
                </label>
                <Input type="text"></Input>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Last Name
                </label>
                <Input type="text"></Input>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Email
              </label>

              <Input type="email"></Input>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Password
              </label>
              <Input type="password"></Input>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Confirm Password
              </label>
              <Input type="password"></Input>
            </div>
          </div>
          <Button>
            <UserRoundPlus /> Create Admin
          </Button>
        </div>

        {/* Notification Settings */}
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
        </div>

        {/* Security Settings */}
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
        </div>
      </div>
    </AdminLayout>
  );
}
