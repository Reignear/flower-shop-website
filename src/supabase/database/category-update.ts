import type { Category } from "@/utils/interface";
import { supabase } from "@/supabase/client";

export const updateCategory = async (
  id: number,
  data?: Category,
  image?: File,
  image_old_path?: string,
) => {
  let filePath = image_old_path;

  // Only upload if a new image is provided
  if (image) {
    filePath = `category-${crypto.randomUUID()}-${image?.name}`;
    await supabase.storage.from("category-images").upload(filePath, image!);

    // Then Remove old image
    if (image_old_path) {
      await supabase.storage.from("category-images").remove([image_old_path]);
    }
  }
  //   Finally, update the category data
  const { data: updatedData } = await supabase
    .from("category_table")
    .update({
      name: data?.name,
      description: data?.description,
      image: filePath,
    })
    .eq("id", id)
    .select("*");

  // Fetch signed URLs for updated categories
  const categoryWithImages = updatedData?.map(async (category) => {
    const { data: imageUrl } = await supabase.storage
      .from("category-images")
      .createSignedUrl(category.image, 60 * 60 * 24 * 7);
    return {
      ...category,
      image_url: imageUrl?.signedUrl || "",
    };
  });

  return Promise.all(categoryWithImages || []);
};
