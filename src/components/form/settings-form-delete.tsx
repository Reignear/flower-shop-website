/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDeleteAccount } from "@/tanstack/auth.mutation";
import { useUserSettingsAccount } from "@/hooks/use-user-settings-account";
import { CustomToast } from "../custom/custom-toast";

export default function SettingsFormDelete() {
  const deleteAccountMutation = useDeleteAccount();
  const { handleSubmit, confirmText, setConfirmText, navigate } =
    useUserSettingsAccount();

  const isConfirmed = confirmText === "CONFIRM";

  const submitDelete = async () => {
    if (isConfirmed) {
      try {
        await CustomToast(deleteAccountMutation.mutateAsync(), "delete");
        setTimeout(() => {
          navigate("/user/signin");
        }, 1000);
      } catch (error: any) {
        console.log("Error deleting account:");
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(submitDelete)}>
      <div className="space-y-2">
        <h1>
          Type <span className="text-red-500">"CONFIRM"</span> to delete
        </h1>
        <Input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
      </div>
      <div>
        <Button
          variant="destructive"
          className="w-full"
          type="submit"
          disabled={!isConfirmed || deleteAccountMutation.isPending}
        >
          {deleteAccountMutation.isPending
            ? "Deleting..."
            : "Proceed To Delete"}
        </Button>
      </div>
    </form>
  );
}
