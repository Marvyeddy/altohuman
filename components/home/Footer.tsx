import Image from "next/image";
import Logo from "@/public/assets/logo-dark.svg";
import Linkedin from "@/public/assets/linkedin.svg";
import Twitter from "@/public/assets/Twitter.svg";
import { Button } from "../ui/button";
import Typography from "../ui/Typography";

const Footer = () => {
  const Navlinks = [
    {
      text: "Features",
      link: "#features",
    },
    {
      text: "How it goes",
      link: "#how",
    },
    {
      text: "Pricing",
      link: "#pricing",
    },
    {
      text: "FAQs",
      link: "#faqs",
    },
  ];

  return (
    <footer className="lg:pb-[113px]">
      <div className="max-w-[1120px] mx-auto px-6 max-lg:py-[27px]">
        <div className="flex max-lg:flex-col lg:items-center justify-between border-b border-t border-[#E8E8E8] py-8 gap-8">
          <Image src={Logo} alt="logo-image" />

          <ul className="flex max-lg:flex-col lg:items-center gap-8">
            {Navlinks.map((link, idx) => (
              <li key={idx} className="hover:underline underline-offset-4">
                <a href={link.link}>{link.text}</a>
              </li>
            ))}
          </ul>

          <div className="gap-6 flex">
            <Button
              size={"icon-lg"}
              className="bg-[#0014330A] rounded-full max-lg:w-full flex-1"
            >
              <Image src={Linkedin} alt="linkedin" />
            </Button>

            <Button
              size={"icon-lg"}
              className="bg-[#0014330A] rounded-full max-lg:w-full flex-1"
            >
              <Image src={Twitter} alt="twitter" />
            </Button>
          </div>
        </div>

        <Typography.P size="sm" className="font-medium text-center mt-8">
          &copy; 2025 Altohuman, Inc. All Rights Reserved{" "}
        </Typography.P>
      </div>
    </footer>
  );
};

export default Footer;
