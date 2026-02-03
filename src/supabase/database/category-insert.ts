import { supabase } from "@/supabase/client";
import type { Category } from "@/utils/interface";

export const insertCategory = async ({
  data,
  image,
}: {
  data: Category;
  image: File | null;
}) => {
  const filePath = `category-${crypto.randomUUID()}-${image?.name}`;

  await supabase.storage.from("category-images").upload(filePath, image);
  await supabase.from("category_table").insert({
    name: data.name,
    description: data.description,
    image: filePath,
  });

  // Fetch after insertion to get updated data
  const { data: allData } = await supabase.from("category_table").select("*");

  const allDataWithImages = allData?.map(async (category) => {
    const { data: imageUrl } = await supabase.storage
      .from("category-images")
      .createSignedUrl(category.image, 60 * 60 * 24 * 7); // 7 hours
    return {
      ...category,
      image: category.image,
      image_url: imageUrl?.signedUrl || "",
    };
  });

  return Promise.all(allDataWithImages || []);
};
