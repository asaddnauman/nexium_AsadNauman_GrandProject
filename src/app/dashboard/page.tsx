"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
  };

  const handleGenerate = async () => {
    if (!resumeFile || !role) {
      alert("Upload resume and enter role.");
      return;
    }
    setGeneratedResume(`AI generated resume for role: ${role}`);
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert("Error sending magic link: " + error.message);
    } else {
      alert("Check your email for the magic link!");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <nav className="w-full flex justify-end p-6 space-x-6 text-white text-xl">
        <button onClick={() => (window.location.href = "/about")}>
          About Us
        </button>
        <button onClick={() => (window.location.href = "/signup")}>
          Sign Up
        </button>
        <button onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </button>
      </nav>
      <h1 className="text-7xl font-gabriola text-white text-center mt-4">
        AI Resume Tailor
      </h1>
      <div className="flex flex-col items-center justify-center mt-16">
        {!generatedResume && (
          <div className="bg-white/10 backdrop-blur p-8 rounded-xl w-96">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleLogin} className="w-full mb-6">
              Sign In via Magic Link
            </Button>
            {email && (
              <>
                <Input type="file" onChange={handleUpload} className="mb-4" />
                <Input
                  type="text"
                  placeholder="Enter Job Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mb-4"
                />
                <Button onClick={handleGenerate} className="w-full">
                  Generate AI Resume
                </Button>
              </>
            )}
          </div>
        )}
        {generatedResume && (
          <div className="mt-8 p-6 bg-white/20 text-white rounded-xl w-1/2 text-center">
            {generatedResume}
          </div>
        )}
      </div>
    </div>
  );
}
