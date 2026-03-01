/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useDeleteFeedbackProduct } from "@/tanstack/feedback.mutation";
import { toast } from "react-hot-toast";
import { CustomToast } from "../custom/custom-toast";

interface FeedbackProductFormDeleteProps {
  id: number;
}
export default function FeedbackProductFormDelete({
  id,
}: FeedbackProductFormDeleteProps) {
  const deleteFeedbackProductMutation = useDeleteFeedbackProduct();
  const handleDelete = async (id: number) => {
    try {
      await CustomToast(
        deleteFeedbackProductMutation.mutateAsync({ id }),
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
        disabled={deleteFeedbackProductMutation.isPending}
      >
        {deleteFeedbackProductMutation.isPending
          ? "Deleting..."
          : "Yes, I want to delete this feedback"}
      </Button>
    </div>
  );
}
