import { supabase } from "@/supabase/client";

export const fetchFeedback = async () => {
  const { data, error } = await supabase
    .from("product_feedback_table")
    .select(
      "id, feedback, rating, created_at, user: user_table (id, first_name, middle_name, last_name), product: product_table (id, name, image )",
    )
    .order("created_at", { ascending: false });
  return { data, error };
};
