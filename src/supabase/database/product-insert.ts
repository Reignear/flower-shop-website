import { supabase } from "@/supabase/client";
import { capitalizeAll } from "@/utils/capitalize";
import type { Product } from "@/utils/interface";

export const insertProduct = async (data: Product, image: File | null) => {
  const fileName = `product-${crypto.randomUUID()}-${image?.name}`;

  if (image) {
    await supabase.storage.from("product-images").upload(fileName, image);
  }

  const { data: allData } = await supabase
    .from("product_table")
    .insert({
      name: data.name,
      description: data.description,
      code: capitalizeAll(data.code),
      image: image ? fileName : "",
      price: data.price,
      status: data.status,
      category_id: data.category_id,
    })
    .select(`*, category_id (id, name)`);

  // Assign signed URLs to each product
  const allDataWithImages = allData?.map(async (product) => {
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
  return Promise.all(allDataWithImages || []);
};
