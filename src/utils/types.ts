// import type { signUpFormValidationAdmin } from "@/validation/validation-signup-admin";
import type { signUpFormValidationUser } from "@/validation/validation-signup-user";
import type { signInFormValidationAdmin } from "@/validation/validation-signin-admin";
import type { signInFormValidationUser } from "@/validation/validation-signin-user";
import type { Session, User } from "@supabase/supabase-js";
import * as z from "zod";
// import type {
//   bankTransferValidation,
//   gcashValidation,
//   paypalValidation,
// } from "@/validation/validation-billing-method-admin";

export type Category =
  | "all"
  | "bouquets"
  | "invitations"
  | "gifts"
  | "arrangements";

// For admin
// export type SignUpFormData = z.infer<typeof signUpFormValidationAdmin>;
export type SignInFormData = z.infer<typeof signInFormValidationAdmin>;

export type SignUpFormDataUser = z.infer<typeof signUpFormValidationUser>;
export type SignInFormDataUser = z.infer<typeof signInFormValidationUser>;

export type UserRole = "admin" | "user";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  role: UserRole | null;
  loading: boolean;
};

// export type GcashMethod = z.infer<typeof gcashValidation>;
// export type PayPalMethod = z.infer<typeof paypalValidation>;
// export type BankTransferMethod = z.infer<typeof bankTransferValidation>;
