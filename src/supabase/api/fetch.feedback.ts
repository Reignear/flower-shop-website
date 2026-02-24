/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/supabase/client";

export const fetchFeedback = async () => {
  const { data, error } = await supabase
    .from("product_feedback_table")
    .select(
      "id, feedback, rating, created_at, user: user_table (id, first_name, middle_name, last_name), product: product_table (id, name, image )",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching feedback:", error);
  }

  const formattedFeedback = await Promise.all(
    (data || []).map(async (feedback: any) => {
      if (!feedback.product.image) {
        return { ...feedback, product: { ...feedback.product, image_url: "" } };
      }

      const { data: imageUrl } = await supabase.storage
        .from("product-images")
        .createSignedUrl(feedback.product.image, 60 * 60 * 24 * 7);

      return {
        ...feedback,
        product: {
          ...feedback.product,
          image_url: imageUrl?.signedUrl || "",
        },
      };
    }),
  );

  return formattedFeedback;
};
