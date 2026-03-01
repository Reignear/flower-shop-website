import { supabase } from "@/supabase/client";

export const updateFeedbackProductStatus = async ({
  id,
  status,
}: {
  id: number;
  status: string;
}) => {
  const { data, error } = await supabase
    .from("product_feedback_table")
    .update({ status: status })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating feedback status:", error);
  }
  return data;
};
