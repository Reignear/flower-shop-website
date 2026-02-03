import { supabase } from "@/supabase/client";

export async function fetchProduct() {
  const { data: products } = await supabase.from("product_table").select(
    `*, 
        category_id (id, name)`,
  );
  const productWithImages = products?.map(async (product) => {
    const { data: imageUrl } = await supabase.storage
      .from("product-images")
      .createSignedUrl(product.image, 60 * 60 * 24 * 7); // 7 days
    return {
      ...product,
      category_id: product.category_id?.name,
      image: product.image,
      image_url: imageUrl?.signedUrl || "",
    };
  });
  return Promise.all(productWithImages || []);
}
