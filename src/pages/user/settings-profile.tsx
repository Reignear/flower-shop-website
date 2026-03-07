/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserSettingsLayout from "@/components/layout/user-settings-layout";
import { useUser } from "@/tanstack/fetch.hook";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { useUpdateProfile } from "@/tanstack/settings.mutation";
import { CustomToast } from "@/components/custom/custom-toast";
import { Toaster } from "react-hot-toast";
import { useUserSettingProfile } from "@/hooks/use-user-setting-profile";
import { profileBreadcrumbs } from "@/data/user-settings-data";

const SettingsProfile = () => {
  const { data: userData } = useUser();
  const updateProfileMutation = useUpdateProfile();
  const { register, handleSubmit } = useUserSettingProfile();
  const submitUpdate = async (data: any) => {
    console.log("Updated Profile Data:", data);
    await CustomToast(updateProfileMutation.mutateAsync(data), "edit");
  };
  return (
    <UserSettingsLayout breadCrumbs={profileBreadcrumbs}>
      <Toaster position="bottom-right" />
      <Card className="p-6 mb-6">
        <form onSubmit={handleSubmit(submitUpdate)}>
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label className="text-xs md:text-sm">First Name</Label>
              <Input
                type="text"
                defaultValue={capitalizeFirstLetter(userData?.first_name)}
                {...register("first_name")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs md:text-sm">Middle Name</Label>
              <Input
                type="text"
                defaultValue={capitalizeFirstLetter(userData?.middle_name)}
                {...register("middle_name")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs md:text-sm">Last Name</Label>
              <Input
                type="text"
                defaultValue={capitalizeFirstLetter(userData?.last_name)}
                {...register("last_name")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs md:text-sm">Birthdate</Label>
              <Input
                type="date"
                defaultValue={userData?.birthdate}
                {...register("birthdate")}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-2 block">
                Email
              </label>
              <Input
                type="email"
                defaultValue={userData?.email}
                {...register("email")}
                required
                disabled
              />
            </div>
          </div>
          <Button
            variant={"customized"}
            disabled={updateProfileMutation.isPending}
            type="submit"
            className="w-full"
          >
            {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </UserSettingsLayout>
  );
};

export default SettingsProfile;
