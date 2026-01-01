"use client";

import Image from "next/image";
import Typography from "../ui/Typography";
import CtaImage from "@/public/images/cta.png";
import CtaMobile from "@/public/images/cta-mobile.png";
import { Button } from "../ui/button";
import { useMobile } from "@/hooks/useMobile";

const Cta = () => {
  const isMobile = useMobile();
  return (
    <section className="min-h-screen bg-black pb-[88px]">
      <div className="max-w-[1200px] mx-auto lg:pt-[167px] pt-[88px] flex max-lg:flex-col items-center px-6 ">
        <div className="lg:w-fit max-lg:w-full">
          <Typography.H1 color="white">
            Start Humanizing <br className="max-lg:hidden" />
            Your AI Content <br /> <span className="opacity-50">Now</span>
          </Typography.H1>

          <Button className="bg-white text-black font-extrabold rounded-full mt-8 max-lg:w-full">
            Try for free
          </Button>
        </div>

        <div className="flex-1 max-lg:hidden">
          <Image src={CtaImage} alt="cta_image" className="w-full h-auto" />
        </div>

        {isMobile && (
          <div className="flex-1 mt-[38px]">
            <Image src={CtaMobile} alt="cta-mobile" className="w-full h-auto" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Cta;
