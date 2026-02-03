import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <UserLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                First Name
              </label>
              <input
                type="text"
                defaultValue="Sarah"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Johnson"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-2 block">
                Email
              </label>
              <input
                type="email"
                defaultValue="sarah.johnson@example.com"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-2 block">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground">
            Save Changes
          </Button>
        </Card>

        {/* Address Settings */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Shipping Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-2 block">
                Street Address
              </label>
              <input
                type="text"
                defaultValue="123 Main Street"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                City
              </label>
              <input
                type="text"
                defaultValue="New York"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                State
              </label>
              <input
                type="text"
                defaultValue="NY"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Zip Code
              </label>
              <input
                type="text"
                defaultValue="10001"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Country
              </label>
              <input
                type="text"
                defaultValue="United States"
                className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              />
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground">
            Save Address
          </Button>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Order Updates</p>
                <p className="text-sm text-muted-foreground">
                  Get notified about your order status
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">
                  Promotional Emails
                </p>
                <p className="text-sm text-muted-foreground">
                  Receive special offers and discounts
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Newsletter</p>
                <p className="text-sm text-muted-foreground">
                  Weekly newsletter with new products
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive updates via SMS
                </p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" />
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground mt-6">
            Save Preferences
          </Button>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-foreground font-medium">Password</p>
                <p className="text-sm text-muted-foreground">
                  Last changed 6 months ago
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            {/* <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-foreground font-medium">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-muted-foreground">
                  Add extra security to your account
                </p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div> */}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-500/20 bg-red-50 dark:bg-red-950/20">
          <h2 className="text-lg font-semibold text-red-600 mb-6">
            Danger Zone
          </h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="text-red-600 hover:bg-red-50 bg-transparent"
            >
              Delete Account
            </Button>
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}
