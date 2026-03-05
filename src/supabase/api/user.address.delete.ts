import { supabase } from "@/supabase/client";
export const deleteUserAddress = async (id: number) => {
  const { data, error } = await supabase
    .from("user_address_table")
    .delete()
    .eq("id", id)
    .select("*");
  if (error) {
    throw error;
  }
  return data;
};
