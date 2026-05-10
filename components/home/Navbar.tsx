"use client";

import Image from "next/image";
import Logo from "@/public/assets/Logo.svg";
import Menu from "@/public/assets/menu.svg";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

const Navbar = ({ Session }: { Session: any }) => {
  const { signOut } = authClient;
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Track if mobile menu is open

  const session = Session;
  const router = useRouter();

  const Navlinks = [
    { text: "Features", link: "#features" },
    { text: "How it goes", link: "#how" },
    { text: "Pricing", link: "#pricing" },
    { text: "FAQs", link: "#faqs" },
  ];

  return (
    <div>
      {/* MOBILE NAV */}
      <nav className="flex justify-between items-center mb-[59px] lg:hidden pt-9">
        <Link href={"/"}>
          <Image src={Logo} alt="logo" width={24} height={24} loading="eager" />
        </Link>

        {session && (
          <Link
            href={"/dashboard"}
            className="text-white hover:opacity-50 transition-colors text-xs"
          >
            Dashboard
          </Link>
        )}

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <div className="cursor-pointer">
              <Image src={Menu} alt="hamburger-menu" loading="eager" />
            </div>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="[&>button]:hidden py-4 mx-6 mt-3 rounded-lg"
            // FIX: Prevents the page from jumping to the top when the sheet closes
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation menu</SheetTitle>
              <SheetDescription>
                Links to the features, pricing, and account management sections.
              </SheetDescription>
            </SheetHeader>

            <ul className="flex flex-col text-center gap-6 text-lg px-8">
              {Navlinks.map((item, idx) => (
                <li
                  key={idx}
                  className="hover:bg-gray-100 rounded-lg transition-colors"
                  // FIX: Closes the menu when a link is clicked
                  onClick={() => setIsOpen(false)}
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

            {session ? (
              <div className="flex flex-col gap-4 mt-4">
                {isLoading ? (
                  <div className="flex justify-center">
                    <Loader2Icon className="animate-spin text-red-500" />
                  </div>
                ) : (
                  <Button
                    variant="link"
                    className="text-black font-semibold text-lg px-0 justify-center"
                    onClick={async () => {
                      setIsLoading(true);
                      try {
                        await logoutAction();
                        setIsOpen(false);
                      } catch (error) {
                        setIsLoading(false);
                      }
                    }}
                  >
                    Log out
                  </Button>
                )}

                <Button
                  className="bg-black text-white rounded-full font-extrabold text-lg py-2 w-fit mx-auto"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/account">My account</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <Button
                  asChild
                  variant="link"
                  className="text-black font-semibold text-lg px-0 justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  className="bg-black text-white rounded-full font-extrabold text-lg py-2 w-fit mx-auto"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/register">Get started</Link>
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </nav>

      {/* DESKTOP NAV */}
      <nav className="flex justify-between mb-[85px] max-lg:hidden pt-6">
        <Link className="flex-1" href={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>

        {session ? (
          <ul className="flex justify-center items-center">
            <li className="text-white hover:opacity-50 transition-colors">
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        ) : (
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
        )}

        <div className="justify-end space-x-2 flex items-center flex-1">
          {session ? (
            <>
              {isLoading ? (
                <Loader2Icon className="animate-spin text-red-500" />
              ) : (
                <Button
                  variant={"link"}
                  className="text-white"
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
              <Button
                className="font-extrabold bg-white rounded-full text-black hover:bg-gray-200"
                asChild
              >
                <Link href={"/account"}>My Account</Link>
              </Button>
            </>
          ) : (
            <>
              <Button className="text-white" variant={"link"} asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                className="bg-white rounded-full font-extrabold text-black hover:bg-gray-200"
                asChild
              >
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
