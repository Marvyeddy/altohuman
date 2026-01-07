"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const personalschema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(60, { message: "Full name can't exceed 60 characters" }),
  email: z.email({ message: "Enter a valid email address" }),
});

const PersonalInfo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof personalschema>>({
    resolver: zodResolver(personalschema),
    defaultValues: {
      fullname: "",
      email: "",
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
              />
              {errors.email && (
                <Typography.P className="text-sm text-red-500 mt-1">
                  {errors.email.message as string}
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

export default PersonalInfo;
