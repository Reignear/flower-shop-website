import { supabase } from "@/supabase/client";
import type { Product } from "@/utils/interface";

export const deleteProduct = async ({ product }: { product: Product }) => {
  if (product.image) {
    await supabase.storage.from("product-images").remove([product.image]);
  }
  const {data, error} = await supabase
    .from("product_table")
    .delete()
    .eq("id", product.id)
    .select("*");

   if (error) {
    throw error;
  }
  return data;
  
};
