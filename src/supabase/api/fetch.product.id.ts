import { supabase } from "@/supabase/client";

export const fetchProductById = async (productId: number) => {
  // Fetch the product details along with its category information
  const { data: product, error: productError } = await supabase
    .from("product_table")
    .select(`*, category_id (id, name)`)
    .eq("id", productId)
    .single();

  if (productError || !product) return null;
  // Fetch feedback for the product and related products in parallel (parallel means both requests are made at the same time, and we wait for both to complete)
  const [feedbackRes, relatedRes] = await Promise.all([
    supabase
      .from("feedback_table")
      .select(`*, user_id (id, email, first_name, middle_name, last_name)`)
      .eq("product_id", productId)
      .limit(5),
    supabase
      .from("product_table")
      .select(`*`)
      .eq("category_id", product.category_id?.id)
      .neq("id", productId)
      .limit(4),
  ]);

  const feedback = feedbackRes.data || [];
  const relatedProducts = relatedRes.data || [];

  // Get signed URL for main product image
  let image_url = "";
  if (product.image) {
    const { data } = await supabase.storage
      .from("product-images")
      .createSignedUrl(product.image, 60 * 60 * 24 * 7);
    image_url = data?.signedUrl || "";
  }

  // For each related product, fetch its feedback and image URL in parallel
  const related_products = await Promise.all(
    relatedProducts.map(async (relatedProduct) => {
      const [{ data: relatedFeedback }, { data: imgData }] = await Promise.all([
        supabase
          .from("feedback_table")
          .select(`*, user_id (id, email, first_name, middle_name, last_name)`)
          .eq("product_id", relatedProduct.id)
          .limit(5),
        // If the related product has an image, fetch its signed URL; otherwise, return an empty string
        relatedProduct.image
          ? supabase.storage
              .from("product-images")
              .createSignedUrl(relatedProduct.image, 60 * 60 * 24 * 7)
          : Promise.resolve({ data: { signedUrl: "" } }),
      ]);
      // Return the related product details along with its image URL and feedback
      return {
        ...relatedProduct,
        image_url: imgData?.signedUrl || "",
        feedback: relatedFeedback || [],
      };
    }),
  );
  // Return the main product details along with its category name, image URL, feedback, and related products
  return {
    ...product,
    category_id: product.category_id?.name,
    category: product.category_id,
    image_url,
    feedback,
    related_products,
  };
};
