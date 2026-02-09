import { supabase } from "@/supabase/client";

export const fetchCategory = async () => {
  const { data: categories, error } = await supabase
    .from("category_table")
    .select("*")
    .order("created_at", { ascending: false });

  // Throw error if any
  if (error) throw error;

  // Return empty array if no categories found
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
