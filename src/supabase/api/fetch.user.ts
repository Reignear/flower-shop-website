import { supabase } from "@/supabase/client";
export const fetchUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("user_table")
    .select(`*`)
    .eq("id", user?.id)
    .single();
  return data;
};
