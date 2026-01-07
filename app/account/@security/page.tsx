"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const securityschema = z
  .object({
    newpassword: z
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
    confirmpassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    path: ["confirmpassword"],
    message: "Passwords do not match",
  });

const SecurityPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof securityschema>>({
    resolver: zodResolver(securityschema),
    defaultValues: {
      newpassword: "",
      confirmpassword: "",
    },
  });
  return (
    <div className="border border-[#E8E8E8] rounded-[20px] p-6 flex justify-between mb-[13px] gap-5">
      <Typography.P size="sm" className="uppercase flex-1" weight="extrabold">
        personal info
      </Typography.P>

      <form onSubmit={handleSubmit(() => {})} className="flex-2 space-y-6">
        <Controller
          control={control}
          name="newpassword"
          render={({ field }) => (
            <div>
              <label htmlFor="newpassword">New password</label>
              <Input
                {...field}
                id="newpassword"
                type="text"
                placeholder="*********"
                className="rounded-full border-[#00000030]"
              />
              {errors.newpassword && (
                <Typography.P className="text-sm text-red-500 mt-1">
                  {errors.newpassword.message as string}
                </Typography.P>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="confirmpassword"
          render={({ field }) => (
            <div>
              <label htmlFor="confirmpassword">Confirm new password</label>
              <Input
                {...field}
                id="confirmpassword"
                type="text"
                placeholder="********"
                className="rounded-full border-[#00000030]"
              />
              {errors.confirmpassword && (
                <Typography.P className="text-sm text-red-500 mt-1">
                  {errors.confirmpassword.message as string}
                </Typography.P>
              )}
            </div>
          )}
        />

        <Button className="rounded-full w-fit bg-[#0000004D] text-white font-extrabold">
          Save changes
        </Button>
      </form>
    </div>
  );
};

export default SecurityPage;
