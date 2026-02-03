// import { supabase } from "@/supabase/client";

// export const fetchCategory = async () => {
//   const { data: category } = await supabase.from("category_table").select("*");

//   const categoryWithImages = category?.map(async (cat) => {
//     const { data: imageUrl } = await supabase.storage
//       .from("category-images")
//       .createSignedUrl(cat.image, 60 * 60 * 24 * 7);
//     return {
//       ...cat,
//       image: cat.image,
//       image_url: imageUrl?.signedUrl || "",
//     };
//   });
//   console.log("Fetched Categories:", categoryWithImages);
//   return Promise.all(categoryWithImages || []);
// };

import { supabase } from "@/supabase/client";

export const fetchCategory = async () => {
  const { data: categories, error } = await supabase
    .from("category_table")
    .select("*");
  // Throw error if any
  if (error) throw error;

  // Return empty array if no categories found
  if (!categories) return [];

  const formattedCategory = await Promise.all(
    categories.map(async (cat) => {
      // Handle case where there is no image
      if (!cat.image) {
        return { ...cat, image_url: "" };
      }
      const { data, error: imageError } = await supabase.storage
        .from("category-images")
        .createSignedUrl(cat.image, 60 * 60 * 24 * 7);

      // Return empty string if there's an error fetching the image
      if (imageError) {
        return { ...cat, image_url: "" };
      }
      return {
        ...cat,
        image: cat.image,
        image_url: data.signedUrl,
      };
    }),
  );

  return formattedCategory;
};
