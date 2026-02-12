import UserSettingsLayout from "@/components/layout/user-settings-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SettingsDelete = () => {
  return (
    <UserSettingsLayout>
      <Card className="p-6 border-red-500/20 bg-red-50 dark:bg-red-950/20">
        <h2 className="text-lg font-semibold text-red-600 mb-6">Danger Zone</h2>
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
    </UserSettingsLayout>
  );
};

export default SettingsDelete;
