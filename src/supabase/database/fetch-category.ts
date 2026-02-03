import { supabase } from "@/supabase/client";

export const fetchCategory = async () => {
  const { data: category } = await supabase.from("category_table").select("*");

  const categoryWithImages = category?.map(async (cat) => {
    const { data: imageUrl } = await supabase.storage
      .from("category-images")
      .createSignedUrl(cat.image, 60 * 60 * 24 * 7);
    return {
      ...cat,
      image: cat.image,
      image_url: imageUrl?.signedUrl || "",
    };
  });
  console.log("Fetched Categories:", categoryWithImages);
  return Promise.all(categoryWithImages || []);
};
