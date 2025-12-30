"use client";

import Image from "next/image";
import Logo from "@/public/assets/Logo.svg";
import Menu from "@/public/assets/menu.svg";
import { Button } from "../ui/button";
import Link from "next/link";
import { useMobile } from "@/hooks/useMobile";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { X } from "lucide-react";

const Navbar = () => {
  const isMobile = useMobile();
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

  return isMobile ? (
    <nav className="flex justify-between items-center mb-[59px]">
      <Link className="flex-1" href={"/"}>
        <Image src={Logo} alt="logo" width={24} height={24} />
      </Link>

      <Sheet>
        <SheetTrigger>
          <div>
            <Image src={Menu} alt="hamburger-menu" />
          </div>
        </SheetTrigger>
        <SheetContent
          side="top"
          className="[&>button]:hidden py-4 mx-6 mt-3 rounded-lg"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation menu</SheetTitle>
          </SheetHeader>

          <ul className="flex flex-col text-center gap-6 text-lg px-8">
            {Navlinks.map((item, idx) => (
              <li
                key={idx}
                className="hover:bg-gray-100 rounded-lg transition-colors"
              >
                <a
                  href={item.link}
                  className="text-black hover:text-blue-600 hover:opacity-70 transition-colors text-xl font-semibold py-3 px-2 block"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  ) : (
    <nav className="flex justify-between mb-[85px]">
      <Link className="flex-1" href={"/"}>
        <Image src={Logo} alt="logo" />
      </Link>

      <ul className="flex justify-center items-center space-x-8 flex-2">
        {Navlinks.map((item, idx) => (
          <li
            key={idx}
            className="text-white hover:opacity-50 transition-colors"
          >
            <a href={item.link}>{item.text}</a>
          </li>
        ))}
      </ul>

      <div className="justify-end space-x-2 flex items-center flex-1">
        <Button className="text-white" variant={"link"}>
          Log in
        </Button>
        <Button className="bg-white rounded-full font-extrabold">
          Get started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
