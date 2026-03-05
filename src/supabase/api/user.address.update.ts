import { supabase } from "@/supabase/client";

export const updateUserAddress = async ({
  id,
  is_default,
}: {
  id: number;
  is_default: boolean;
}) => {
  // If setting as default, first reset all addresses to false
  if (is_default) {
    const { error: resetError } = await supabase
      .from("user_address_table")
      .update({ is_default: false })
      .neq("id", id);

    if (resetError) {
      throw resetError;
    }
  }

  // Then update the selected address
  const { data, error } = await supabase
    .from("user_address_table")
    .update({ is_default: is_default })
    .eq("id", id)
    .select("*");

  if (error) {
    throw error;
  }
  return data;
};
