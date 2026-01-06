import { z } from "zod";

export const forgetpasswordschema = z.object({
  email: z.email({ message: "Enter a valid email address" }),
});

export type ForgetPasswordData = z.infer<typeof forgetpasswordschema>;
