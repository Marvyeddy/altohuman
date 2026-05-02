"use client";

import Img from "@/public/images/register-img.png";
import Image from "next/image";
import Star from "@/public/assets/star-reg.svg";
import Typography from "../ui/Typography";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import Google from "@/public/assets/google.svg";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // or your preferred toast library


const Register = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter()

  const onVisible = () => {
    setVisible((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const {error} = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.fullname,
      callbackURL: "/dashboard"
    }, {
      onRequest: () => console.log("Sending..."),
      onSuccess: () => {
        setIsEmailSent(true);
        toast.success("Verification email sent! Please check your inbox.");
      },
     })
  };

  //*GOOGLE SIGNIN
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  if (isEmailSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold">Check your email! 📧</h2>
        <p className="mt-2 text-gray-600">
          We've sent a verification link to your email address. 
          Please verify it to continue to your dashboard.
        </p>
        <Button className="mt-4" onClick={() => router.push("/login")}>
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen flex">
      <div className="flex-1 p-5 max-lg:hidden">
        <Image
          src={Img}
          alt="register-img"
          width={Img.width}
          height={Img.height}
          priority
          className="h-auto w-full object-cover"
          style={{ height: "auto" }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-[408px] mx-auto">
          <Image
            src={Star}
            alt="star-asset"
            width={76}
            height={76}
            className="mx-auto max-lg:size-[45px]"
          />
          <h2 className="font-bold lg:text-[32px] text-[24px] text-center mt-8 mb-4">
            Continue humanizing...
          </h2>
          <Typography.P className="text-center mb-8">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="font-normal hover:underline hover:font-extrabold underline-offset-2"
            >
              Log in
            </Link>
          </Typography.P>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="fullname"
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <label htmlFor="fullname">Fullname</label>
                  <Input
                    className="py-3.5 px-4 rounded-full"
                    id="fullname"
                    placeholder="Enter fullname"
                    {...field}
                  />
                  {errors.fullname && (
                    <Typography.P size="xs" className="text-red-500">
                      {errors.fullname?.message}
                    </Typography.P>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
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
            <Controller
              control={control}
              name="acceptTerms"
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="acceptTerms"
                      className="flex items-center gap-4 text-sm select-none cursor-pointer"
                    >
                      <Checkbox
                        id="acceptTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className={`size-6 ${
                          field.value ? "bg-blue-950/35 border-blue-600" : ""
                        }`}
                      />
                    </label>
                    I accept the terms and conditions
                  </div>
                  {errors.acceptTerms && (
                    <Typography.P size="xs" className="text-red-500 ml-2">
                      {errors.acceptTerms.message}
                    </Typography.P>
                  )}
                </div>
              )}
            />

            <Button className="bg-black text-white font-bold rounded-full mt-8 max-lg:mt-3">
              {isSubmitting ? "Creating account...": "Sign up"}
            </Button>
            <Button
              className="font-bold rounded-full border border-[#CDD0D5] mb-8"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <Image src={Google} alt="google-svg" className="mr-4" />
              Sign up with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
