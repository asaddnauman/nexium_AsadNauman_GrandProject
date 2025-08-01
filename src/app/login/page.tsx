// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert("Login failed: " + error.message);
    else alert("Check your email for the login link.");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 mb-4 w-full rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sign In
      </button>
    </div>
  );
}
