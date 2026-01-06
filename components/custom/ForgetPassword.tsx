"use client";

import Logo from "@/public/assets/logo-dark.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgetPasswordData,
  forgetpasswordschema,
} from "@/schema/forget-password";
import { Input } from "../ui/input";
import Typography from "../ui/Typography";
import Lock from "@/public/assets/lock.svg";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetpasswordschema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordData) => {
    console.log(data);
  };

  return (
    <section className="min-h-screen w-full">
      <div className="max-w-[1200px] px-6 mx-auto py-[21px]">
        <Image src={Logo} alt="logo-dark" />
        <div className=" max-w-[480px] mx-auto mt-[72px] py-6 px-4 rounded-[18px] shadow-2xl border border-[#00000012] shadow-[#00000012] relative">
          <Image src={Lock} alt="lock" className="mx-auto mt-" />
          <h2 className="font-bold lg:text-[32px] text-[24px] text-center mt-6 mb-5">
            Forgot Password
          </h2>
          <Typography.P className="text-center">
            A verification code will be sent to mail
          </Typography.P>

          <form
            className="flex flex-col gap-6 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <div className="space-y-2">
                  <label htmlFor="email">Email address</label>
                  <Input
                    className="py-3.5 px-4 rounded-full"
                    id="email"
                    placeholder="name@email.com"
                    type="email"
                    {...field}
                  />
                  {errors.email && (
                    <Typography.P size="xs" className="text-red-500">
                      {errors.email?.message}
                    </Typography.P>
                  )}
                </div>
              )}
            />

            <Button className="bg-black text-white font-bold rounded-full mt-6 max-lg:mt-3">
              Next
            </Button>

            <Button
              variant={"link"}
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
