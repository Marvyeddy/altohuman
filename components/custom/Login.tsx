"use client";

import Image from "next/image";

import Logo from "@/public/assets/logo-dark.svg";
import Contact from "@/public/assets/contact.svg";
import Google from "@/public/assets/google.svg";
import { Controller, useForm } from "react-hook-form";
import { LoginFormData, loginschema } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Typography from "../ui/Typography";
import { Button } from "../ui/button";
import { CircleXIcon, EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const onVisible = () => {
    setVisible((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    console.log(data);
  }

  return (
    <section className="min-h-screen w-full">
      <div className="max-w-[1200px] px-6 mx-auto py-[21px]">
        <Image src={Logo} alt="logo-dark" />
        <div className=" max-w-[480px] mx-auto mt-[112px] py-6 px-4 rounded-[18px] shadow-2xl border border-[#00000012] shadow-[#00000012] relative">
          <Button
            size={"icon-sm"}
            className="absolute right-3"
            onClick={() => router.back()}
          >
            <CircleXIcon size={24} className="text-[#5258667A]" />
          </Button>

          <Image src={Contact} alt="contact" className="mx-auto mt-" />
          <h2 className="font-bold lg:text-[32px] text-[24px] text-center mt-6 mb-10">
            Welcome back
          </h2>

          <form
            className="flex flex-col gap-6 p-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
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

            <div className="w-fit ml-auto">
              <Link
                className="text-sm opacity-80 hover:text-blue-500"
                href="/forget-password"
              >
                Forgot Password?
              </Link>
            </div>

            <Button className="bg-black text-white font-bold rounded-full mt-6 max-lg:mt-3">
              Log in
            </Button>
            <Button
              className="font-bold rounded-full border border-[#CDD0D5]"
              type="button"
            >
              <Image src={Google} alt="google-svg" className="mr-4" />
              Continue with Google
            </Button>

            <Typography.P className="text-center">
              Don&apos;t have an account?{" "}
              <Link
                href={"/register"}
                className="font-normal hover:underline underline-offset-2 hover:font-extrabold"
              >
                Sign up
              </Link>
            </Typography.P>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
