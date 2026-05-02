"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/Typography";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "better-auth/api";
import { Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const securityschema = z.object({
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
  oldpassword: z.string().min(1, { message: "Current password is required" }),
});

const SecurityPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof securityschema>>({
    resolver: zodResolver(securityschema),
    defaultValues: {
      newpassword: "",
      oldpassword: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof securityschema>) => {
    const { error } = await authClient.changePassword(
      {
        newPassword: data.newpassword, // required
        currentPassword: data.oldpassword, // required
        revokeOtherSessions: true,
      },
      {
        onSuccess: () => {
          toast.success("Password changed successfully");
          reset();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="border border-[#E8E8E8] rounded-[20px] p-6 flex justify-between mb-[13px] gap-5">
      <Typography.P size="sm" className="uppercase flex-1" weight="extrabold">
        security
      </Typography.P>

      <form onSubmit={handleSubmit(onsubmit)} className="flex-2 space-y-6">
        <Controller
          control={control}
          name="newpassword"
          render={({ field }) => (
            <div>
              <label htmlFor="newpassword">New password</label>
              <Input
                {...field}
                id="newpassword"
                type="password"
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
          name="oldpassword"
          render={({ field }) => (
            <div>
              <label htmlFor="oldpassword">Old password</label>
              <Input
                {...field}
                id="oldpassword"
                type="password"
                placeholder="********"
                className="rounded-full border-[#00000030]"
              />
              {errors.oldpassword && (
                <Typography.P className="text-sm text-red-500 mt-1">
                  {errors.oldpassword.message as string}
                </Typography.P>
              )}
            </div>
          )}
        />

        <Button
          className={`rounded-full w-fit text-white font-extrabold bg-black
          `}
        >
          {isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </div>
  );
};

export default SecurityPage;
