import type { Metadata } from "next";
import "./globals.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { gilroy } from "@/public/fonts/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Altohuman",
    template: "%s | Text humanizer",
  },
  description:
    "Altohuman humanizes text, scores AI detection, and boosts writing authenticity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${gilroy.className}`}>
        <Alert className="rounded-none bg-linear-to-r from-[#FF73C3] via-[#7B71FF] to-[#0EC9E2] flex items-center justify-center fixed border-none z-40">
          <AlertDescription className="font-bold transition-all animate-pulse delay-1000 w-fit text-white max-md:text-xs">
            Heads up! Altohuman is still in the testing phase...All features
            will be fully functional soon.
          </AlertDescription>
        </Alert>
        <div>{children}</div>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
