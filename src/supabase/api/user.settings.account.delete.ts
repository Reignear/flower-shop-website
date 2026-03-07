/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/supabase/client";
export const deleteAccount = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  try {
    const { error: deleteError } = await supabase
      .from("user_table")
      .delete()
      .eq("id", user?.id);
    if (deleteError) {
      throw new Error(deleteError.message);
    }
    const { error } = await supabase.auth.admin.deleteUser(`${user?.id}`);
    if (error) {
      throw new Error(error.message);
    }
    // Sign out the user after deletion
    await supabase.auth.signOut();
  } catch (error) {
    throw new Error("Failed to delete account. Please try again later.");
  }
};
