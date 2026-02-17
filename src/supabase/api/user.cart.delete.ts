import { supabase } from "@/supabase/client";

export const deleteCart = async (cart_id: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("cart_table")
    .delete()
    .eq("id", cart_id)
    .eq("user_id", user?.id);

  if (error) {
    console.error("Error deleting cart item:", error);
  }
  return data;
};
