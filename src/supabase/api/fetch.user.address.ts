import { supabase } from "@/supabase/client";

export const fetchUserAddress = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data } = await supabase
    .from("user_address_table")
    .select(
      ` id, 
        address_line1, 
        address_line2, 
        barangay, 
        city, 
        province, 
        region, 
        postal_code, 
        is_default`,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data;
};
