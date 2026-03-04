/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { CustomToast } from "../custom/custom-toast";
import { useUserUpdateOrderStatus } from "@/tanstack/order-mutation";
import { useNavigate } from "react-router-dom";

interface OrderFormUpdateProps {
  id: number;
}
export default function OrderFormUpdate({ id }: OrderFormUpdateProps) {
  const navigate = useNavigate();
  const updateOrderStatus = useUserUpdateOrderStatus();
  const handleCancel = async () => {
    try {
      await CustomToast(
        updateOrderStatus.mutateAsync({
          id: id,
          status: "cancelled",
        }),
      );
      setTimeout(() => {
        navigate("/user/order/pending");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Button variant={"destructive"} onClick={handleCancel}>
      {updateOrderStatus.isPending
        ? "Cancelling..."
        : "Yes, I want to cancel this order"}
    </Button>
  );
}
