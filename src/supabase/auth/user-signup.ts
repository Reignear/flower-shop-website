import { supabase } from "@/supabase/client";
import type { SignUp } from "@/utils/interface";

export const SignUpUser = async (data: SignUp) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    throw authError;
  }
  if (authData.user) {
    const { error: profileError } = await supabase.from("user_table").insert({
      email: data.email,
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      birthdate: data.birthdate,
      role: "user",
    });
    if (profileError) {
      throw profileError;
    }
  }
  return authData;
};
