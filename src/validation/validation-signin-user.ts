import * as z from "zod";

export const signInFormValidationUser = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
