import { supabase } from "@/supabase/client";
import type { Product } from "@/utils/interface";

export const updateProduct = async ({
  product_id,
  product,
  image,
  old_path,
}: {
  product_id: string;
  product: Product;
  image: File | null;
  old_path: string | null;
}) => {
  let filePath = product.image;

  if (image instanceof File) {
    filePath = `product-${crypto.randomUUID()}-${image.name}`;
    await supabase.storage.from("product-images").upload(filePath, image);

    if (old_path) {
      await supabase.storage.from("product-images").remove([old_path]);
    }
  }

  const { data: products } = await supabase
    .from("product_table")
    .update({
      name: product.name,
      description: product.description,
      code: product.code,
      image: filePath,
      price: Number(product.price),
      status: product.status,
      category_id: product.category,
    })
    .eq("id", product_id)
    .select("*, category_id (id, name)");

  if (!products) return [];

  const formattedProducts = await Promise.all(
    products.map(async (product) => {
      if (!product.image) {
        return { ...product, image_url: "" };
      }
      const { data: imageUrl } = await supabase.storage
        .from("product-images")
        .createSignedUrl(product.image, 60 * 60 * 24 * 7);
      return {
        ...product,
        category_id: product.category?.name,
        image: product.image,
        image_url: imageUrl?.signedUrl || "",
      };
    }),
  );

  return formattedProducts;
};
