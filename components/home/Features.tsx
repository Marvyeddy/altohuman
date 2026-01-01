import Image from "next/image";
import Typography from "../ui/Typography";
import Image1 from "@/public/images/img1.png";
import Vector1 from "@/public/assets/vector1.svg";
import Vector2 from "@/public/assets/vector2.svg";
import Phsparkle from "@/public/assets/ph_sparkle.svg";
import Skeleton from "@/public/images/skeleteon.png";
import Failed from "@/public/assets/button-failed.svg";
import Success from "@/public/assets/button-success.svg";

const How = () => {
  return (
    <section id="how" className="lg:py-[120px] py-[60px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="w-fit mx-auto text-center space-y-3 lg:mb-10 mb-6">
          <Typography.H2>How Altohuman Works</Typography.H2>
          <Typography.P>Get your result instantly</Typography.P>
        </div>

        <div className="flex max-lg:flex-col lg:gap-x-6 gap-3 md:max-w-sm lg:max-w-none md:mx-auto">
          {/* Card 1 */}
          <div className="bg-[#F7F7F7] flex-1 h-[446px]">
            <div className="space-y-3 px-[21px] pt-[32px]">
              <Typography.H3>Paste or upload AI content</Typography.H3>
              <Typography.P color="custom-1">
                Easily paste your text or upload a file to get started from any
                AI
              </Typography.P>
            </div>

            <Image
              src={Image1}
              alt="img-1"
              className="lg:mt-[63px] mt-10 w-full h-auto"
            />
          </div>

          {/* Card 2 */}
          <div className="bg-[#F7F7F7] relative flex-1 flex flex-col h-[446px]">
            <div className="space-y-3 px-[21px] pt-[32px]">
              <Typography.H3>Choose an option</Typography.H3>
              <Typography.P>
                Select whether you want to humanize the text or check for AI
                content
              </Typography.P>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="relative my-[64px] lg:my-[106px] w-full flex justify-center">
                <figure className="relative">
                  <Image src={Vector2} alt="vector-2" className="absolute" />
                  <Image src={Vector1} alt="vector-1" />
                </figure>

                <figure className="absolute inset-0 flex justify-center items-center">
                  <Image
                    src={Phsparkle}
                    alt="sparkle"
                    className="max-lg:size-[89px]"
                  />
                </figure>
              </div>
            </div>

            <div className="flex gap-5 justify-center mb-[25px]">
              {/* Primary buttons */}
              <div className="bg-white rounded-full font-extrabold text-center px-4 py-2 text-sm">
                Check Ai Score
              </div>

              <div className="text-white font-extrabold bg-black rounded-full text-center px-3 py-2 text-sm">
                Humanize
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F7F7F7] flex-1 flex flex-col h-[446px]">
            <div className="space-y-3 px-[21px] pt-[32px]">
              <Typography.H3>Get instant results</Typography.H3>
              <Typography.P>
                Receive your transformed or analyzed text within seconds
              </Typography.P>
            </div>

            <div className="flex flex-col lg:mt-[63px] mt-10 overflow-hidden">
              <div className="flex items-center gap-3 justify-center">
                <Image
                  src={Failed}
                  alt="button-failed"
                  className="max-lg:w-[120px] max-2xl:w-[140px]"
                />
                <Image
                  src={Success}
                  alt="button-success"
                  className="max-lg:w-[117px] max-2xl:w-[130px]"
                />
              </div>

              <Image
                src={Skeleton}
                alt="skeleton"
                className="w-full px-4 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default How;
