import { supabase } from "@/supabase/client";

export const updateProductStatus = async ({
  id,
  status,
}: {
  id: number;
  status: string;
}) => {
  const { data, error } = await supabase
    .from("product_table")
    .update({ status: status })
    .eq("id", id)
    .select("*")
    .single();

  return { data, error };
};
