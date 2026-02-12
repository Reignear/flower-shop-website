// import * as z from "zod";

// export const gcashValidation = z.object({
//   gcash_number: z.string().regex(/^09-?\d{9}$/, "Invalid GCash number format"),
//   gcash_name: z.string().min(2, "Name must be at least 2 characters long"),
// });

// export const paypalValidation = z.object({
//   paypal_email: z.email("Invalid email address"),
// });

// export const bankTransferValidation = z.object({
//   bank_name: z.string().min(2, "Bank name must be at least 2 characters long"),
//   bank_account_name: z
//     .string()
//     .min(2, "Account name must be at least 2 characters long"),
//   bank_account_number: z
//     .string()
//     .regex(/^\d+$/, "Account number must contain only numbers")
//     .min(5, "Account number must be at least 5 characters long"),
// });

// export const codValidation = z.object({
//   cod_enabled: z.boolean(),
// });
