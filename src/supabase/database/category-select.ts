import { supabase } from "@/supabase/client";

export const selectCategories = async () => {
  const { data, error } = await supabase.from("category_table").select("*");
  if (error) {
    throw error;
  }

  const categoriesWithImages = data.map(async (category) => {
    const { data: imageUrl } = await supabase.storage
      .from("category-images")
      .createSignedUrl(category.image_url, 60 * 60 * 24 * 7); // 7 days
    return {
      ...category,
      image: category.image,
      image_url: imageUrl?.signedUrl || "",
    };
  });
  return Promise.all(categoriesWithImages);
};
