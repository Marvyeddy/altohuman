"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Upload from "@/public/assets/upload.svg";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Copy from "@/public/assets/Copy.svg";
import Trash from "@/public/assets/Trash.svg";
import Delete from "@/public/assets/delete.svg";
import Copy_Dark from "@/public/assets/copy-dark.svg";

const HumanizerField = () => {
  const [NoButton, setNoButton] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <>
      <div className="bg-[#FFFFFF1A] p-3 rounded-[37px]">
        <Card className="rounded-3xl h-[427px] flex flex-row py-0">
          {/* Field 1 */}
          <div className="flex-1  flex flex-col justify-between pb-5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={cn(
                `w-full focus:outline-none resize-none placeholder:text-black/80 p-5`,
                input && `flex-1 mb-[15px]`
              )}
              onFocus={() => setNoButton(true)}
              onBlur={() => setNoButton(false)}
              placeholder="Paste your AI-generated content here..."
            />

            {!NoButton && input.trim() === "" && (
              <Button
                className={cn(
                  `flex items-center gap-2 text-black/80 w-fit mx-auto`
                )}
              >
                <Image src={Upload} alt="upload" />
                Upload doc
              </Button>
            )}

            <div className="flex items-center justify-between max-lg:flex-col lg:px-5">
              <p className="text-sm max-sm:text-xs text-[#312F2FD4] max-lg:ml-auto max-lg:pr-[25px]">
                0/300 words
              </p>

              <Separator className="bg-[#939393] lg:hidden opacity-40 my-5" />

              <div className="flex gap-5">
                {/* Primary buttons */}
                <Button className="bg-[#899BAC29] rounded-full font-extrabold">
                  Check Ai Score
                </Button>

                <Button className="text-white font-extrabold bg-black rounded-full">
                  Humanize
                </Button>
              </div>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="bg-[#939393] max-lg:hidden opacity-40"
          />

          {/* Field 2 */}
          <div className="flex-1 p-5 flex flex-col justify-between max-lg:hidden">
            <textarea
              disabled
              value={output}
              className="w-full focus:outline-none resize-none placeholder:text-black/80 mb-[30px] flex-1"
            />

            <div className="flex items-center justify-between ">
              <h1>Error</h1>

              <div className="flex items-center gap-4">
                <Button size={"icon"} className="shadow-sm shadow-[#0000004D]">
                  <Image src={Copy} alt="copy" />
                </Button>

                <Button size={"icon"} className="shadow-sm shadow-[#0000004D]">
                  <Image src={Trash} alt="Trash" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* mobile */}
      <h2 className="text-white font-semibold text-[18px] mt-[18px] mb-3 lg:hidden">
        Result
      </h2>
      <div className="bg-[#FFFFFF1A] p-3 rounded-[37px] lg:hidden">
        <Card className="rounded-3xl h-[427px] flex flex-row py-0">
          {/* Field 2 */}
          <div className="flex-1  flex flex-col justify-between">
            <textarea
              disabled
              value={output}
              className="w-full focus:outline-none resize-none placeholder:text-black/80 mb-[30px] flex-1 p-5"
            />

            <div>
              <Separator className="bg-[#939393] lg:hidden opacity-40 my-5" />

              <div className="flex gap-7 items-center justify-center mb-5">
                {/* Primary buttons */}
                <Button className="text-red-500 shadow-sm shadow-[#0000004D] rounded-full font-extrabold">
                  Delete
                  <span>
                    <Image src={Delete} alt="trash" />
                  </span>
                </Button>

                <Button className="shadow-sm shadow-[#0000004D] font-extrabold rounded-full">
                  Copy
                  <span>
                    <Image src={Copy_Dark} alt="trash" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default HumanizerField;
