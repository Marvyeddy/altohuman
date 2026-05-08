"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Upload from "@/public/assets/upload.svg";
import { Button } from "../ui/button";
import { useState, useRef, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import Copy from "@/public/assets/Copy.svg";
import Trash from "@/public/assets/Trash.svg";
import Delete from "@/public/assets/delete.svg";
import Copy_Dark from "@/public/assets/copy-dark.svg";
import { toast } from "sonner";
import { processAiAction } from "@/actions/humanize";
import { LoaderIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

const HumanizerField = ({ wordLimit }: { wordLimit?: number }) => {
  const router = useRouter();
  const [NoButton, setNoButton] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState<"humanize" | "score" | null>(
    null,
  );
  const [activeAction, setActiveAction] = useState<"humanize" | "score" | null>(
    null,
  );

  const WORD_LIMIT = wordLimit || 300;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getWordCount = (text: string) =>
    text.trim() ? text.trim().split(/\s+/).length : 0;

  const wordCount = getWordCount(input);

  const restrictToWordLimit = (text: string) => {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length > WORD_LIMIT) {
      return words.slice(0, WORD_LIMIT).join(" ");
    }
    return text;
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newWordCount = getWordCount(newValue);

    if (
      wordCount >= WORD_LIMIT &&
      newValue.length > input.length &&
      newWordCount >= WORD_LIMIT
    ) {
      return;
    }

    if (newWordCount > WORD_LIMIT) {
      setInput(restrictToWordLimit(newValue));
    } else {
      setInput(newValue);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      toast.warning("Please upload a .txt file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        setInput(restrictToWordLimit(content));
      }
    };
    reader.readAsText(file);

    e.target.value = "";
  };

  const handleAiAction = async (action: "humanize" | "score") => {
    if (!input.trim()) return;
    setIsProcessing(action);
    setActiveAction(action);

    try {
      if (action === "score") {
        const result = await processAiAction(input, "score");
        if (result.success) {
          setOutput(result.text);
          setStatus(result.message);

          router.refresh();
        } else {
          toast.error(result.error || "Checking failed");
        }
      } else {
        setOutput("");
        const response = await fetch("/api/humanize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input, action: "humanize" }),
        });

        // 1. Check for Unauthorized (No Session)
        if (response.status === 401) {
          toast.error("Session expired. Please login.");
          router.push("/login");
          return;
        }

        if (response.status === 402) {
          toast.error("Insufficient credits!");
          return;
        }

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || "Streaming failed");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response stream available");

        const decoder = new TextDecoder();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            router.refresh();
            break;
          }

          const chunk = decoder.decode(value);
          setOutput((prev) => prev + chunk.replace(/\*/g, ""));
          setStatus("Humanized 99%");
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Request failed. Check backend connection.",
      );
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        accept=".txt"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      <div className="bg-[#FFFFFF1A] p-3 rounded-[37px]">
        <Card className="rounded-3xl h-[427px] flex flex-row py-0 overflow-hidden">
          {/* Field 1 (Input Area) */}
          <div className="flex-1 flex flex-col justify-between pb-5">
            <textarea
              value={input}
              onChange={handleInputChange}
              className={cn(
                `w-full focus:outline-none resize-none placeholder:text-black/80 p-5`,
                input && `flex-1 mb-[15px]`,
                wordCount >= WORD_LIMIT && "caret-red-500",
              )}
              onFocus={() => setNoButton(true)}
              onBlur={() => setNoButton(false)}
              placeholder="Paste your AI-generated content here..."
            />

            {!NoButton && input.trim() === "" && (
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  `flex items-center gap-2 text-black/80 w-fit mx-auto`,
                )}
              >
                <Image src={Upload} alt="upload" />
                Upload doc
              </Button>
            )}

            <div className="flex items-center justify-between max-lg:flex-col lg:px-5">
              <p
                className={cn(
                  "text-sm max-sm:text-xs max-lg:ml-auto max-lg:pr-[25px]",
                  wordCount >= WORD_LIMIT
                    ? "text-red-500 font-bold"
                    : "text-[#312F2FD4]",
                )}
              >
                {wordCount}/{WORD_LIMIT} words
              </p>

              <Separator className="bg-[#939393] lg:hidden opacity-40 my-5" />

              <div className="flex gap-5">
                <Button
                  type="button"
                  className="bg-[#899BAC29] rounded-full font-extrabold"
                  disabled={!input || isProcessing !== null}
                  onClick={() => handleAiAction("score")}
                >
                  {isProcessing === "score" ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    "Check Ai Score"
                  )}
                </Button>

                <Button
                  type="button"
                  className="text-white font-extrabold bg-black rounded-full"
                  disabled={!input || isProcessing !== null}
                  onClick={() => handleAiAction("humanize")}
                >
                  {isProcessing === "humanize" ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    "Humanize"
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="bg-[#939393] max-lg:hidden opacity-40"
          />

          {/* Field 2 (Desktop Result Area) */}
          <div className="flex-1 p-5 flex flex-col justify-between max-lg:hidden">
            {isProcessing === "score" || isProcessing === "humanize" ? (
              <div className="flex-1 mb-[30px] space-y-2">
                <Skeleton className="h-4 w-full bg-gray-400" />
                <Skeleton className="h-4 w-full bg-gray-400" />
                <Skeleton className="h-4 w-full bg-gray-400" />
                <Skeleton className="h-4 w-full bg-gray-400" />
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                className={cn(
                  "w-full focus:outline-none resize-none placeholder:text-black/80 mb-[30px] flex-1 transition-colors duration-300",
                  activeAction === "humanize"
                    ? "text-green-600 font-medium"
                    : "text-black",
                )}
                placeholder="Results will appear here..."
              />
            )}

            <div className="flex items-center justify-between ">
              <div className="flex items-center justify-between ">
                {isProcessing ? (
                  <Skeleton className="h-5 w-32 bg-gray-300" />
                ) : (
                  <h1
                    className={cn(
                      "font-semibold",
                      activeAction === "humanize"
                        ? "text-green-500"
                        : "text-red-600",
                    )}
                  >
                    {status}
                  </h1>
                )}
                {/* Buttons... */}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  size={"icon"}
                  className="shadow-sm shadow-[#0000004D]"
                  title="copy"
                  onClick={() => {
                    navigator.clipboard.writeText(output);
                    toast.success("Text copied to clipboard!");
                  }}
                >
                  <Image src={Copy} alt="copy" />
                </Button>

                <Button
                  size={"icon"}
                  className="shadow-sm shadow-[#0000004D]"
                  title="delete"
                  onClick={() => {
                    setOutput("");
                    setStatus("");
                    setActiveAction(null);
                  }}
                >
                  <Image src={Trash} alt="Trash" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Result Section */}
      {activeAction && (
        <>
          <h2 className="text-white font-semibold text-[18px] mt-[18px] mb-3 lg:hidden">
            Result
          </h2>
          <div className="bg-[#FFFFFF1A] p-3 rounded-[37px] lg:hidden">
            <Card className="rounded-3xl h-[427px] flex flex-row p-5">
              <div className="flex-1 flex flex-col justify-between">
                {isProcessing === "score" || isProcessing === "humanize" ? (
                  <div className="flex-1 mb-[30px] space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-400" />
                    <Skeleton className="h-4 w-[90%] bg-gray-400" />
                    <Skeleton className="h-4 w-[95%] bg-gray-400" />
                    <Skeleton className="h-4 w-[40%] bg-gray-400" />
                  </div>
                ) : (
                  <textarea
                    readOnly
                    value={output}
                    className={cn(
                      "w-full focus:outline-none resize-none placeholder:text-black/80 mb-[10px] flex-1 transition-colors duration-300",
                      activeAction === "humanize"
                        ? "text-green-600 font-medium"
                        : "text-black",
                    )}
                    placeholder="Results will appear here..."
                  />
                )}

                <div className="flex items-center justify-center">
                  {isProcessing ? (
                    <Skeleton className="h-5 w-32 bg-gray-300" />
                  ) : (
                    <h1
                      className={cn(
                        "font-semibold text-sm",
                        activeAction === "humanize"
                          ? "text-green-500"
                          : "text-red-600",
                      )}
                    >
                      {status}
                    </h1>
                  )}
                  {/* Buttons... */}
                </div>
                <div>
                  <Separator className="bg-[#939393] lg:hidden opacity-40 mt-2 mb-5" />

                  <div className="flex gap-7 items-center justify-center mb-5">
                    <Button
                      onClick={() => {
                        setOutput("");
                        setActiveAction(null);
                      }}
                      className="text-red-500 shadow-sm shadow-[#0000004D] rounded-full font-extrabold"
                    >
                      Delete
                      <span>
                        <Image src={Delete} alt="trash" />
                      </span>
                    </Button>

                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(output);
                        toast.success("Text copied to clipboard!");
                      }}
                      className="shadow-sm shadow-[#0000004D] font-extrabold rounded-full"
                    >
                      Copy
                      <span>
                        <Image src={Copy_Dark} alt="copy" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default HumanizerField;
