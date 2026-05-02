import type { Metadata } from "next";
import "./globals.css";

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
        <div>{children}</div>
        <Toaster richColors position="top-center"/>
      </body>
      
    </html>
  );
}
