"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-6 bg-white bg-opacity-70 shadow-md fixed top-0 z-50 font-[Gabriola]">
      <h1 className="text-[42px] font-bold text-black">
        <Link href="/">AI Resume Builder</Link>
      </h1>
      <div className="flex gap-8 items-center text-[28px] text-black">
        <Link href="/about" className="hover:underline">
          About Us
        </Link>
        <Link href="/login" className="hover:underline">
          Sign In
        </Link>
        <Link href="/signup" className="hover:underline">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
