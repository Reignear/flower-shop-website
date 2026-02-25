import { supabase } from "@/supabase/client";
import type { Product } from "@/utils/interface";

export const insertProduct = async ({
  product,
  image,
}: {
  product: Product;
  image: File | null;
}) => {
  const fileName = `product-${crypto.randomUUID()}-${image?.name}`;

  if (image) {
    await supabase.storage.from("product-images").upload(fileName, image);
  }

  const { data: products } = await supabase
    .from("product_table")
    .insert({
      name: product.name,
      description: product.description,
      code: product.code,
      image: image ? fileName : "",
      price: Number(product.price),
      status: product.status,
      category_id: product.category,
    })
    .select(`*, category_id (id, name)`);

  if (!products) return [];

  const formattedProducts = await Promise.all(
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
  return formattedProducts;
};
