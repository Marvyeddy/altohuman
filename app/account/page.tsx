"use client";

import Typography from "@/components/ui/Typography";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logo-dark.svg";
import { Button } from "@/components/ui/button";
import Profile from "@/public/assets/profile.svg";
import { logoutAction } from "@/actions/auth";
import { useState } from "react";

const AccountPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="w-full">
      <nav className="flex items-center justify-between lg:px-[120px] py-6 pt-[15px] border-b border-[#E8E8E8] mb-[77px]">
        <div className="lg:flex-1">
          <Link
            href={"/dashboard"}
            className="flex items-center w-fit gap-1 hover:underline underline-offset-4"
          >
            <ChevronLeft className="size-6" />
            <Typography.P className="max-md:hidden">
              Back to humanizer
            </Typography.P>
          </Link>
        </div>

        <Image src={Logo} alt="dark-logo" className="max-md:hidden" />

        <div className="lg:flex-1 flex justify-end ">
          {isLoading ? (
            <Loader2Icon className="animate-spin text-red-500" />
          ) : (
            <Button
              variant={"link"}
              onClick={async () => {
                setIsLoading(true);
                try {
                  await logoutAction();
                } catch (error) {
                  setIsLoading(false);
                }
              }}
            >
              Log out
            </Button>
          )}
        </div>
      </nav>

      <div className="mb-8">
        <Image src={Profile} alt="profile" className="mx-auto" />
        <h2 className="font-bold lg:text-[32px] text-[24px] text-center mt-[23px]">
          My account
        </h2>
      </div>
    </div>
  );
};

export default AccountPage;
