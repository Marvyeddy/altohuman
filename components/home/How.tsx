import Typography from "../ui/Typography";
import Gpt from "@/public/assets/gpt.svg";
import Gemini from "@/public/assets/gemini.svg";
import Brain from "@/public/assets/brain.svg";
import Coursera from "@/public/assets/coursera.svg";
import Alexa from "@/public/assets/alexa.svg";
import Meta from "@/public/assets/meta.svg";
import Glow from "@/public/assets/glow.svg";
import Image from "next/image";
import Ai from "@/public/assets/ai.svg";
import Lock from "@/public/assets/lock-check.svg";
import Click from "@/public/assets/click.svg";
import Humanize from "@/public/assets/humanize-ai.svg";
import Img2 from "@/public/images/img2.png";
import Img3 from "@/public/images/img3.png";
import Img4 from "@/public/images/img4.png";
import Img5 from "@/public/images/img5.png";

const How = () => {
  const Svg = [Gpt, Gemini, Brain, Coursera, Alexa, Meta, Glow];

  return (
    <section className="min-h-screen">
      <div className="max-w-[1200px] px-6 mx-auto lg:mb-[100px] mb-[88px]">
        <div className="w-fit text-center space-y-3 mx-auto mt-[100px] mb-10">
          <Typography.H2>Why Choose Altohuman </Typography.H2>
          <Typography.P color="custom-1">
            Get your result instantly
          </Typography.P>
        </div>

        <ul className="flex items-center space-x-2 w-fit mx-auto mb-10">
          {Svg.map((img, idx) => (
            <figure key={idx}>
              <Image src={img} alt="image" />
            </figure>
          ))}
        </ul>

        <div className="flex flex-row space-x-6 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-6">
          {/* first */}
          <div className="flex-2 bg-[#F7F7F7] pt-8 flex flex-col">
            <div className="flex gap-3 items-start mb-6 px-7 max-sm:flex-col max-sm:px-4 max-sm:gap-2">
              <Image
                src={Ai}
                alt="ai"
                className="w-10 h-10 max-sm:w-8 max-sm:h-8"
              />
              <div className="space-y-3 w-[464px] max-w-full max-sm:w-full">
                <Typography.H3>AI content detection</Typography.H3>
                <Typography.P>
                  Identify AI-generated text with high precision, ensuring your
                  content is original and credible.
                </Typography.P>
              </div>
            </div>
            <Image src={Img2} alt="img2" className="w-full h-auto" />
          </div>

          {/* second */}
          <div className="flex-1 bg-[#f7f7f7] pt-8 px-7 max-sm:px-4 flex flex-col">
            <div className="flex gap-3 items-start mb-[17px] max-sm:flex-col max-sm:gap-2">
              <Image
                src={Lock}
                alt="lock"
                className="w-10 h-10 max-sm:w-8 max-sm:h-8"
              />
              <div className="space-y-3 w-[371px] max-w-full max-sm:w-full">
                <Typography.H3>Secure and reliable</Typography.H3>
                <Typography.P>
                  Simply paste or upload your text, and let our app do the
                  magic. No technical expertise required
                </Typography.P>
              </div>
            </div>
            <Image src={Img3} alt="img3" className="w-full h-auto" />
          </div>
        </div>

        <div className="flex flex-row space-x-6 mt-6 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-6">
          {/* third */}
          <div className="flex-1 bg-[#f7f7f7] pt-8 px-7 max-sm:px-4 flex flex-col">
            <div className="flex gap-3 items-start mb-[41px] max-sm:flex-col max-sm:gap-2">
              <Image
                src={Click}
                alt="click"
                className="w-10 h-10 max-sm:w-8 max-sm:h-8"
              />
              <div className="space-y-3 w-[371px] max-w-full max-sm:w-full">
                <Typography.H3>Easy to use</Typography.H3>
                <Typography.P>
                  Easily paste your text or upload a file to get started from
                  any AI
                </Typography.P>
              </div>
            </div>
            <Image src={Img4} alt="img4" className="w-full h-auto" />
          </div>

          {/* fourth */}
          <div className="flex-2 bg-[#F7F7F7] pt-8 flex flex-col">
            <div className="flex gap-3 items-start mb-6 px-7 max-sm:flex-col max-sm:px-4 max-sm:gap-2">
              <Image
                src={Humanize}
                alt="humanize"
                className="w-10 h-10 max-sm:w-8 max-sm:h-8"
              />
              <div className="space-y-3 w-[464px] max-w-full max-sm:w-full">
                <Typography.H3>Humanized AI text</Typography.H3>
                <Typography.P>
                  Identify AI-generated text with high precision, ensuring your
                  content is original and credible.
                </Typography.P>
              </div>
            </div>
            <Image src={Img5} alt="img5" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default How;
