import * as z from "zod";

export const signUpFormValidationUser = z
  .object({
    firstName: z.string().min(1, "Firstname is required"),
    middleName: z.string().min(1, "Middle name is required"),
    lastName: z.string().min(1, "Lastname is required"),
    birthdate: z.string().min(1, "Birthdate is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
