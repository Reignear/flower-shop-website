/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useDeleteFeedbackOrder } from "@/tanstack/feedback.mutation";
import { toast } from "react-hot-toast";
import { CustomToast } from "../custom/custom-toast";

interface FeedbackOrderFormDeleteProps {
  id: number;
}
export default function FeedbackOrderFormDelete({
  id,
}: FeedbackOrderFormDeleteProps) {
  const deleteFeedbackOrderMutation = useDeleteFeedbackOrder();
  const handleDelete = async (id: number) => {
    try {
      await CustomToast(
        deleteFeedbackOrderMutation.mutateAsync({ id }),
        "delete",
      );
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while deleting feedback.",
      );
    }
  };

  return (
    <div className="w-full">
      <Button
        variant={"destructive"}
        className="w-full"
        onClick={() => handleDelete(id)}
        disabled={deleteFeedbackOrderMutation.isPending}
      >
        {deleteFeedbackOrderMutation.isPending
          ? "Deleting..."
          : "Yes, I want to delete this feedback"}
      </Button>
    </div>
  );
}
