import { supabase } from "@/supabase/client";
import type { Cart } from "@/utils/interface";

export const fetchCart = async () => {
  // Fetch the current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  //   Fetch the cart items for the authenticated user, including product details
  const { data } = await supabase
    .from("cart_table")
    .select(
      `id,
       quantity,
       product_id (id, code, description, name, price, image),
       created_at`,
    )
    .eq("user_id", user.id);

  if (!data) return [];

  // Format the cart items to include the product image URL
  const formattedData = await Promise.all(
    (data as unknown as Cart[]).map(async (item) => {
      if (!item.product_id.image) {
        return { ...item, image_url: "" };
      }
      const { data: imageData, error: imageError } = await supabase.storage
        .from("product-images")
        .createSignedUrl(item.product_id.image, 60 * 60 * 24 * 7);

      if (imageError) {
        return { ...item, image_url: "" };
      }

      return {
        ...item,
        product_id: { ...item.product_id, image_url: imageData.signedUrl },
      };
    }),
  );

  return formattedData;
};
