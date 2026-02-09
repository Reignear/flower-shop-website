import type { Category } from "@/utils/interface";
import { supabase } from "@/supabase/client";

export const updateCategory = async ({
  id,
  category,
  image,
  old_path,
}: {
  id: string;
  category: Category;
  image: File | string | null;
  old_path: string | null;
}) => {
  let filePath = category.image;

  if (image instanceof File) {
    filePath = `category-${crypto.randomUUID()}-${image.name}`;
    await supabase.storage.from("category-images").upload(filePath, image);

    if (old_path) {
      await supabase.storage.from("category-images").remove([old_path]);
    }
  }
  const { data } = await supabase
    .from("category_table")
    .update({
      name: category.name,
      description: category.description,
      image: filePath,
    })
    .eq("id", id)
    .select("*");

  if (!data) return [];

  const formattedCategory = await Promise.all(
    data.map(async (category) => {
      if (!category.image) {
        return { ...category, image_url: "" };
      }
      const { data, error } = await supabase.storage
        .from("category-images")
        .createSignedUrl(category.image, 60 * 60 * 24 * 7);
      if (error) {
        return { ...category, image_url: "" };
      }
      return {
        ...category,
        image: category.image,
        image_url: data.signedUrl,
      };
    }),
  );
  return formattedCategory;
};
