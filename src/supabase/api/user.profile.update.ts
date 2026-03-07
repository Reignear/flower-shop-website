import type { User } from "@/utils/interface";
import { supabase } from "@/supabase/client";

export const updateProfile = async ({ data }: { data: User }) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData, error } = await supabase
    .from("user_table")
    .update({
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      birthdate: data.birthdate,
      email: data.email,
    })
    .eq("id", user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return userData;
};
