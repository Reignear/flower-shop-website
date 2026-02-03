import { supabase } from "@/supabase/client";
import type { Category } from "@/utils/interface";

export const deleteCategory = async (category: Category) => {
  if (category.image) {
    await supabase.storage.from("category-images").remove([category.image]);
  }
  const { data: deletedCategory, error } = await supabase
    .from("category_table")
    .delete()
    .eq("id", category.id)
    .select("*");
  if (error) {
    throw error;
  }
  return deletedCategory;
};
