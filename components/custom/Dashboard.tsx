"use client";

import Image from "next/image";
import Logo from "@/public/assets/Logo.svg";
import { Button } from "../ui/button";
import Typography from "../ui/Typography";
import Star from "@/public/assets/hero-sparkle.svg";
import HumanizerField from "./HumanizerField";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogOutIcon, User2, UserCheck2Icon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { logoutAction } from "@/actions/auth";
import type { BackendUserData } from "@/lib/backend-api";

type DashboardSession = {
  user: {
    name: string;
  };
} | null;

const Dashboard = ({
  Session,
  userData,
}: {
  Session: DashboardSession;
  userData: BackendUserData;
}) => {
  const router = useRouter();
  const session = Session;

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("status") === "success") {
      toast.success("Payment Successful! Your credits are being updated.");
      router.replace("/dashboard");
    }
  }, [searchParams, router]);

  return (
    <section className="min-h-screen bg-black w-full">
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <nav className="flex items-center justify-between mb-[85px]">
          <Link href="/">
            <Image src={Logo} alt="logo-image" />
          </Link>

          <div className="space-x-3 flex items-center">
            <Button
              variant={"link"}
              className="text-white hover:text-red-400 max-md:hidden"
              onClick={async () => {
                await logoutAction();
              }}
            >
              Log out
            </Button>
            <Button
              className="bg-white rounded-full md:hidden"
              size={"icon"}
              title="Exit"
              onClick={async () => {
                await logoutAction();
              }}
            >
              <LogOutIcon className="text-red-400" />
            </Button>
            <Button className="font-extrabold bg-white rounded-full" asChild>
              <Link href={"/account"}>My Account</Link>
            </Button>
            <Button
              className="font-extrabold bg-white rounded-full"
              size={"icon"}
              asChild
            >
              <Link href={"/account"}>
                <User2 color="black" />
              </Link>
            </Button>
          </div>
        </nav>

        <div className="flex max-lg:flex-col lg:justify-between lg:items-center gap-4 mb-[76px]">
          <div>
            <Typography.H1 color="white" className="flex items-center">
              Hey {session?.user.name.split(" ")[0]}
              <Image
                src={Star}
                alt="star"
                className="inline-block ml-3 max-md:size-8"
              />
            </Typography.H1>
            <Typography.P color="white" className="max-w-[644px] mt-5">
              Say goodbye to robotic text and hello to genuine communication.
              Our app detects AI content and humanizes it, giving your words a
              personal touch.
            </Typography.P>
          </div>

          <div className="flex items-center gap-3 bg-[#FFFFFF1A] py-2 px-3 rounded-full max-lg:w-fit">
            <Typography.P color="white" className="font-semibold">
              {userData?.credit ?? 0} credits
            </Typography.P>
            <Button
              className="bg-white rounded-full py-1 px-2 text-xs font-extrabold "
              asChild
            >
              <Link href={"/pricing"}>Buy</Link>
            </Button>
          </div>
        </div>

        <HumanizerField wordLimit={userData?.wordLimit} />
      </div>
    </section>
  );
};

export default Dashboard;
