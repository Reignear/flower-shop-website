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

  const { data: categories, error } = await supabase
    .from("category_table")
    .select("*");
  if (error) throw error;
  if (!categories) return [];

  const formattedCategory = await Promise.all(
    categories.map(async (category) => {
      // Handle case where there is no image
      if (!category.image) {
        return { ...category, image_url: "" };
      }
      const { data, error: imageError } = await supabase.storage
        .from("category-images")
        .createSignedUrl(category.image, 60 * 60 * 24 * 7);

      // Return empty string if there's an error fetching the image
      if (imageError) {
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
