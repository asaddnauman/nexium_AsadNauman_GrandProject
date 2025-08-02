"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Enter Email and Password");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("Signed In Successfully.");
      router.push("/"); // Redirect to Home Page
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-gabriola">
      <h1 className="text-[72px] mb-10">Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-96 text-[32px] placeholder-white text-white bg-transparent border-b border-white focus:outline-none mb-6"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-96 text-[32px] placeholder-white text-white bg-transparent border-b border-white focus:outline-none mb-10"
      />
      <button
        onClick={handleSignIn}
        className="bg-green-500 px-10 py-4 rounded-full text-[32px] hover:scale-105 transition"
      >
        Sign In
      </button>
    </div>
  );
}
