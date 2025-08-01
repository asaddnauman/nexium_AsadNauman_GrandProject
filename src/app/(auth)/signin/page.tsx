"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) {
      alert("Check your email for the magic link");
      router.push("/");
    } else {
      alert("Error signing in");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6">
      <h1 className="text-4xl font-bold">Sign In</h1>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSignIn}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Send Magic Link
      </button>
    </div>
  );
}
