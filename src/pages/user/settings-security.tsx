import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserSettingsLayout from "@/components/layout/user-settings-layout";

const SettingsSecurity = () => {
  return (
    <UserSettingsLayout>
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Security</h2>
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
    </UserSettingsLayout>
  );
};

export default SettingsSecurity;
