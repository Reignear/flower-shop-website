import { supabase } from "@/supabase/client";
export const updateOrderStatus = async ({
  id,
  status,
  payment_gateway,
  remarks,
}: {
  id: number;
  status: string;
  payment_gateway?: string;
  remarks?: string;
}) => {
  try {
    if (payment_gateway === "COD" || payment_gateway === "cod") {
      const [orderRes, paymentRes] = await Promise.all([
        supabase
          .from("orders_table")
          .update({
            status: status,
            remarks: remarks ? remarks : null,
          })
          .eq("id", id)
          .select(),

        supabase
          .from("payment_table")
          .update({
            status: "completed",
          })
          .eq("order_id", id)
          .select(),
      ]);
      return {
        data: orderRes.data,
        error: orderRes.error,
        paymentData: paymentRes.data,
        paymentError: paymentRes.error,
      };
    }
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};
