import { supabase } from "@/supabase/client";
import type { Address } from "@/utils/interface";

export const insertAddress = async ({ address }: { address: Address }) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data } = await supabase.from("user_address_table").insert({
    user_id: user.id,
    address_line1: address.address_line1,
    address_line2: address.address_line2,
    barangay: address.barangay,
    city: address.city,
    province: address.province,
    region: address.region,
    postal_code: address.postal_code,
    is_default: true,
  });

  return data;
};
