"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-gabriola">
      {/* Top Left Navigation */}
      <div className="absolute top-6 left-8 flex space-x-10 text-[36px]">
        <Link href="/about" className="hover:underline">
          About Us
        </Link>
        <Link href="/signin" className="hover:underline">
          Sign In
        </Link>
        <Link href="/signup" className="hover:underline">
          Sign Up
        </Link>
      </div>

      {/* About Title */}
      <h1 className="text-[72px] font-bold mb-10 text-center">About Us</h1>

      {/* About Content */}
      <p className="max-w-4xl text-center text-[38px] leading-snug">
        Welcome to{" "}
        <span className="text-cyan-400 font-bold">AI Resume Tailor</span>, where
        technology meets opportunity. We help job seekers create perfectly
        tailored resumes using AI-powered optimization based on their desired
        job roles. Our platform ensures your resume stands out with the right
        keywords, structure, and formatting to match employer expectations.
        <br />
        <br />
        Powered by <span className="text-emerald-400 font-bold">
          Supabase
        </span>{" "}
        and <span className="text-blue-400 font-bold">n8n AI Automation</span>.
      </p>
    </div>
  );
}
