import { supabase } from "@/supabase/client";

export async function fetchProduct() {
  const { data: products } = await supabase
    .from("product_table")
    .select(
      `*, 
        category_id (id, name)`,
    )
    .order("created_at", { ascending: false });

  if (!products) return [];
  // Format the products to include the image URL and category name
  const formmatedProducts = await Promise.all(
    products.map(async (product) => {
      if (!product.image) return { ...product, image_url: "" };

      const { data: imageUrl } = await supabase.storage
        .from("product-images")
        .createSignedUrl(product.image, 60 * 60 * 24 * 7);

      return {
        ...product,
        category_id: product.category_id?.name,
        image: product.image,
        image_url: imageUrl?.signedUrl || "",
      };
    }),
  );
  return formmatedProducts;
}
