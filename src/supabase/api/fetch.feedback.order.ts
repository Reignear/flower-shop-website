import { supabase } from "@/supabase/client";

export const fetchFeedbackOrder = async ({ status }: { status: string }) => {
  let query = supabase
    .from("order_feedback_table")
    .select(
      ` id, feedback, rating, created_at, status,
        user: user_table (id, first_name, middle_name, last_name), 
        order: orders_table (id, reference_number,
                                user: user_table(id, first_name, middle_name, last_name) )`,
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (status !== "all") {
    query = query.eq("status", status);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching feedback:", error);
  }
  return data;
};
