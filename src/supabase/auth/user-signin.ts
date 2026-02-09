import { supabase } from "@/supabase/client";

export const SignInUser = async (email: string, password: string) => {
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  return { authData, authError };
};
