import { supabase } from "@/supabase/client";
export const insertCart = async ({
  product_id,
  quantity,
}: {
  product_id: number;
  quantity: number;
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data } = await supabase.from("cart_table").insert({
    user_id: user.id,
    product_id: product_id,
    quantity: quantity,
  });

  return data;
};
