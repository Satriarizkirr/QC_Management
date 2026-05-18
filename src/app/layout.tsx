import type { Metadata } from "next";
import { Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serif = Lora({ variable: "--font-serif", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quality Control Management System",
  description: "Industrial quality control defect tracking and reporting system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${serif.variable} ${mono.variable} font-serif antialiased bg-slate-950 text-slate-100`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
