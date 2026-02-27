import { supabase } from "@/supabase/client";
export const updateOrderStatus = async ({
  id,
  status,
  remarks,
}: {
  id: number;
  status: string;
  remarks?: string;
}) => {
  console.log("Updating order status with:", { id, status });
  try {
    const { data, error } = await supabase
      .from("orders_table")
      .update({ status: status, remarks: remarks ? remarks : null })
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
