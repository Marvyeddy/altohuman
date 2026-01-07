"use client";

import Logo from "@/public/assets/logo-dark.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Typography from "../ui/Typography";
import Lock from "@/public/assets/lock.svg";
import { useRouter } from "next/navigation";
import {
  ResetPasswordData,
  resetpasswordschema,
} from "@/schema/reset-password";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const ResetPassword = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetpasswordschema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordData) => {
    console.log(data);
  };

  const onVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <section className="min-h-screen w-full">
      <div className="max-w-[1200px] px-6 mx-auto py-[21px]">
        <Image src={Logo} alt="logo-dark" />
        <div className=" max-w-[480px] mx-auto mt-[72px] py-6 px-4 rounded-[18px] shadow-2xl border border-[#00000012] shadow-[#00000012] relative">
          <Image src={Lock} alt="lock" className="mx-auto mt-" />
          <h2 className="font-bold lg:text-[32px] text-[24px] text-center mt-6 mb-5">
            Reset Password
          </h2>
          <Typography.P className="text-center">
            Change your password at your taste
          </Typography.P>

          <form
            className="flex flex-col gap-6 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <label htmlFor="password">Password</label>
                  <div className="relative">
                    <Input
                      className="py-3.5 px-4 rounded-full"
                      id="password"
                      type={visible ? "text" : "password"}
                      placeholder="***********"
                      {...field}
                    />
                    <Button
                      size={"icon"}
                      className="absolute top-0 right-4"
                      type="button"
                      onClick={onVisible}
                    >
                      {visible ? (
                        <EyeClosedIcon className="text-[#00000063]" />
                      ) : (
                        <EyeIcon className="text-[#00000063]" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <Typography.P size="xs" className="text-red-500">
                      {errors.password?.message}
                    </Typography.P>
                  )}
                </div>
              )}
            />

            <Button className="bg-black text-white font-bold rounded-full mt-6 max-lg:mt-3">
              Reset
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
