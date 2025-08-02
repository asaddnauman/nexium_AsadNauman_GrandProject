"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-between items-center p-4 bg-white/10 backdrop-blur border-b border-white/20 text-white">
      <div className="text-2xl font-bold">Resume Tailor</div>
      <div className="flex gap-6 text-lg">
        <Link href="/" className={pathname === "/" ? "underline" : ""}>
          Home
        </Link>
        <Link
          href="/about"
          className={pathname === "/about" ? "underline" : ""}
        >
          About
        </Link>
        <Link
          href="/login"
          className={pathname === "/login" ? "underline" : ""}
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className={pathname === "/signup" ? "underline" : ""}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
