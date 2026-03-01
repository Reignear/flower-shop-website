import type { signUpFormValidationUser } from "@/validation/validation-signup-user";
import type { signInFormValidationAdmin } from "@/validation/validation-signin-admin";
import type { signInFormValidationUser } from "@/validation/validation-signin-user";
import type { Session, User } from "@supabase/supabase-js";
import * as z from "zod";

export type Category =
  | "all"
  | "bouquets"
  | "invitations"
  | "gifts"
  | "arrangements";
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
export type Status =
  | "pending"
  | "on-process"
  | "for-pickup"
  | "delivered"
  | "declined";
export type FeedBackFormValues = {
  productId: number;
  rating: number;
  feedback: string;
};
export type FeedbackStatus = "published" | "pending";
