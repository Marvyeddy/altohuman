import Image from "next/image";
import Logo from "@/public/assets/Logo.svg";
import { Button } from "../ui/button";
import Typography from "../ui/Typography";
import Star from "@/public/assets/hero-sparkle.svg";
import HumanizerField from "./HumanizerField";

const Dashboard = () => {
  return (
    <section className="min-h-screen bg-black w-full">
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <nav className="flex items-center justify-between mb-[85px]">
          <Image src={Logo} alt="logo-image" />

          <div className="space-x-3">
            <Button variant={"link"} className="text-white">
              Log out
            </Button>
            <Button className="font-extrabold bg-white rounded-full">
              My Account
            </Button>
          </div>
        </nav>

        <div className="flex max-lg:flex-col lg:justify-between lg:items-center gap-4 mb-[76px]">
          <div>
            <Typography.H1 color="white">
              Hey Mark
              <Image src={Star} alt="star" className="inline-block ml-6" />
            </Typography.H1>
            <Typography.P color="white" className="max-w-[644px] mt-5">
              Say goodbye to robotic text and hello to genuine communication.
              Our app detects AI content and humanizes it, giving your words a
              personal touch.
            </Typography.P>
          </div>

          <div className="flex items-center gap-3 bg-[#FFFFFF1A] py-2 px-3 rounded-full max-lg:w-fit">
            <Typography.P color="white" className="font-semibold">
              200 credits
            </Typography.P>
            <Button className="bg-white rounded-full py-1 px-2 text-xs font-extrabold ">
              Buy
            </Button>
          </div>
        </div>

        <HumanizerField />
      </div>
    </section>
  );
};

export default Dashboard;
