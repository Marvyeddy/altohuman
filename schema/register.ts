import { z } from "zod";

export const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters" })
      .max(60, { message: "Full name can't exceed 60 characters" }),
    email: z.email({ message: "Enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must have at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must have at least one lowercase letter",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.acceptTerms == true, {
    path: ["acceptTerms"],
    message: "You must accept the terms",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
