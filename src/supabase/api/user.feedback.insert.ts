import { supabase } from "@/supabase/client";

export const insertFeedback = async ({
  order_id,
  order_rating,
  feedback,
  order_items,
}: {
  order_id: number;
  order_rating: number;
  feedback: string;
  order_items: {
    product_id: number;
    rating: number;
    feedback: string;
  }[];
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  try {
    const { data: orderFeedbackData, error: orderFeedbackError } =
      await supabase
        .from("order_feedback_table")
        .insert({
          order_id: order_id,
          user_id: user.id,
          rating: order_rating,
          feedback: feedback,
          created_at: new Date(),
        })
        .select("*");
    const productFeedbackResults = await Promise.all(
      order_items.map(async (item) => {
        const { data, error } = await supabase
          .from("product_feedback_table")
          .insert({
            user_id: user.id,
            product_id: item.product_id,
            rating: item.rating,
            feedback: item.feedback,
            created_at: new Date(),
          })
          .select("*");
        return { data, error };
      }),
    );

    return { orderFeedbackData, productFeedbackResults, orderFeedbackError };
  } catch (error) {
    console.error("Error inserting order feedback:", error);
    throw error;
  }
};
