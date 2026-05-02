"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/Typography";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const personalschema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(60, { message: "Full name can't exceed 60 characters" }),
  email: z.email({ message: "Enter a valid email address" }),
});

const PersonalInfo = () => {
  const { data: session } = authClient.useSession();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof personalschema>>({
    resolver: zodResolver(personalschema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  });

  useEffect(() => {
    if (session?.user) {
      reset({
        fullname: session.user.name,
        email: session.user.email,
      });
    }
  }, [session, reset]);

  const onsubmit = async (data: z.infer<typeof personalschema>) => {
    const { error } = await authClient.updateUser(
      {
        name: data.fullname,
      },
      {
        onSuccess: () => {
          toast.success("Name updated successfully...");
        },
      },
    );
  };

  return (
    <div className="border border-[#E8E8E8] rounded-[20px] p-6 flex justify-between mb-[13px] gap-5">
      <Typography.P size="sm" className="uppercase flex-1" weight="extrabold">
        personal info
      </Typography.P>

      <form onSubmit={handleSubmit(onsubmit)} className="flex-2 space-y-6">
        <Controller
          control={control}
          name="fullname"
          render={({ field }) => (
            <div>
              <label htmlFor="fullname">Fullname</label>
              <Input
                {...field}
                id="fullname"
                type="text"
                placeholder="John Doe"
                className="rounded-full border-[#00000030]"
              />
              {errors.fullname && (
                <Typography.P className="text-sm text-red-500 mt-1">
                  {errors.fullname.message as string}
                </Typography.P>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <div>
              <label htmlFor="email">Email address</label>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="name@email.com"
                className="rounded-full border-[#00000030]"
                disabled
              />
              {errors.email && (
                <Typography.P className="text-sm text-red-500 mt-1">
                  {errors.email.message as string}
                </Typography.P>
              )}
            </div>
          )}
        />

        <Button
          className={`rounded-full w-fit text-white font-extrabold bg-black `}
        >
          {isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Save change"
          )}
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfo;
