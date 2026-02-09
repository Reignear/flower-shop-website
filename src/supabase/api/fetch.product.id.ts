import { supabase } from "@/supabase/client";

export const fetchProductById = async (productId: number) => {
  const { data: product } = await supabase
    .from("product_table")
    .select(
      `*, 
        category_id (id, name)`,
    )
    .eq("id", productId)
    .single();

  const { data: feedback } = await supabase
    .from("feedback_table")
    .select("*")
    .eq("product_id", productId);

  const { data: relatedProducts } = await supabase
    .from("product_table")
    .select(`*`)
    .eq("category_id", product?.category_id?.id)
    .neq("id", productId)
    .limit(4);

  if (!product) return null;
  let imageUrl = { signedUrl: "" };

  if (product.image) {
    const { data: data } = await supabase.storage
      .from("product-images")
      .createSignedUrl(product.image, 60 * 60 * 24 * 7);
    imageUrl = data || { signedUrl: "" };
  }

  if (!relatedProducts) return null;

  relatedProducts.forEach((relatedProduct) => {
    if (relatedProduct.image) {
      supabase.storage
        .from("product-images")
        .createSignedUrl(relatedProduct.image, 60 * 60 * 24 * 7)
        .then(({ data }) => {
          relatedProduct.image_url = data?.signedUrl;
        });
    }
  });

  return {
    ...product,
    category_id: product.category_id?.name,
    category: product.category_id,
    image_url: imageUrl.signedUrl,
    feedback: feedback || [],
    related_products: relatedProducts || [],
  };
};
