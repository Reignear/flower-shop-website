import { supabase } from "@/supabase/client";

export const deleteFeedbackProduct = async ({ id }: { id: number }) => {
  const { data, error } = await supabase
    .from("product_feedback_table")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error deleting feedback:", error);
  }
  return data;
};
