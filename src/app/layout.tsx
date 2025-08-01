import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AI Resume Builder",
  description: "Tailor your resume for specific job roles with AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className="font-[Gabriola] bg-cover bg-center min-h-screen"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <Toaster richColors />
        <Navbar />
        <main className="pt-28 px-4">{children}</main>
      </body>
    </html>
  );
}
