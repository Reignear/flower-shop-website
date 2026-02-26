import { supabase } from "@/supabase/client";
export const updateOrderStatus = async ({
  id,
  status,
  reason,
}: {
  id: number;
  status: string;
  reason?: string;
}) => {
  console.log("Updating order status with:", { id, status });
  try {
    const { data, error } = await supabase
      .from("orders_table")
      .update({ status: status, reason: reason ? reason : null })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating order status:", error);
    }
    return data || [];
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};
