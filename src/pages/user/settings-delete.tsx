import CustomDialog from "@/components/custom/custom-dialog";
import SettingsFormDelete from "@/components/form/settings-form-delete";
import UserSettingsLayout from "@/components/layout/user-settings-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  deleteDescription,
  deleteTitle,
  deletionBreadcrumbs,
} from "@/data/user-settings-data";

const SettingsDelete = () => {
  return (
    <UserSettingsLayout breadCrumbs={deletionBreadcrumbs}>
      <Card className="p-6 border-red-500/20 bg-red-50 dark:bg-red-950/20">
        <h2 className="text-lg font-semibold text-red-600 mb-6">Danger Zone</h2>
        <div className="space-y-3">
          <CustomDialog
            title={deleteTitle}
            description={deleteDescription}
            trigger={<Button variant="destructive">Delete Account</Button>}
          >
            <SettingsFormDelete />
          </CustomDialog>

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
