"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleMagicLink = async () => {
    if (!email) {
      alert("Enter your email!");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      alert("Error sending Magic Link: " + error.message);
    } else {
      alert("Magic Link sent! Check your email.");
    }
  };

  const handleGenerate = async () => {
    if (!resumeFile || !role) {
      alert("Upload Resume & Enter Job Role!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("role", role);

    const response = await fetch(
      "https://asadnauman1.app.n8n.cloud/webhook/resume-tailor",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "AI-Tailored-Resume.pdf";
      link.click();
    } else {
      alert("Failed to generate resume.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-gabriola relative">
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

      {/* Main Title */}
      <h1 className="text-[72px] font-bold mb-10 text-center">
        AI Resume Tailor
      </h1>

      {!user ? (
        <div className="flex flex-col items-center space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[400px] text-[36px] px-6 py-3 rounded-xl text-black"
          />
          <button
            onClick={handleMagicLink}
            className="bg-green-500 text-white text-[36px] px-10 py-4 rounded-full hover:scale-105 transition"
          >
            Send Magic Link
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-12 flex flex-col items-center space-y-10">
          <label className="w-full cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <div className="w-full text-center border border-dashed border-white rounded-xl py-8 text-[36px] hover:bg-white/20 transition">
              {resumeFile ? resumeFile.name : "Upload Your Resume PDF"}
            </div>
          </label>

          {resumeFile && (
            <>
              <input
                type="text"
                placeholder="Enter Job Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-[36px] placeholder-white text-white bg-transparent border-b border-white focus:outline-none"
              />
              <button
                onClick={handleGenerate}
                className="bg-green-500 text-white px-10 py-4 rounded-full text-[36px] hover:scale-105 transition"
              >
                Generate AI Resume
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
