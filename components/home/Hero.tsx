import Image from "next/image";
import Typography from "../ui/Typography";
import Navbar from "./Navbar";
import Sparkle from "@/public/assets/hero-sparkle.svg";
import HumanizerField from "../custom/HumanizerField";

const Hero = () => {
  return (
    <section className="bg-black min-h-screen">
      <div className="max-w-[1200px] px-6 mx-auto lg:pt-[62px] pt-[30px] lg:pb-[103px] pb-[42px]">
        <Navbar />

        <div className="max-w-[823px] mx-auto text-white text-center lg:mb-16 mb-8">
          <Typography.H1 color="white">
            Make Your AI Content <br />
            Feel Human{" "}
            <span className="inline-block">
              <Image src={Sparkle} alt="sparkle" className="max-lg:size-6" />
            </span>
          </Typography.H1>

          <Typography.P
            color="white"
            className="opacity-90 max-w-[644px] mx-auto mt-5 max-lg:text-[13px]"
          >
            Say goodbye to robotic text and hello to genuine communication. Our
            app detects AI content and humanizes it, giving your words a
            personal touch.
          </Typography.P>
        </div>

        <HumanizerField />
      </div>
    </section>
  );
};

export default Hero;
