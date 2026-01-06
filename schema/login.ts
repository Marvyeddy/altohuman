import { email, z } from "zod";

export const loginschema = z.object({
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
});

export type LoginFormData = z.infer<typeof loginschema>;
