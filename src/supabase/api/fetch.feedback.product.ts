/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/supabase/client";

export const fetchFeedbackProduct = async ({ status }: { status: string }) => {
  let query = supabase
    .from("product_feedback_table")
    .select(
      "id, feedback, rating, created_at, status, user: user_table (id, first_name, middle_name, last_name), product: product_table (id, name, image )",
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
