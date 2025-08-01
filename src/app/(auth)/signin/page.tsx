"use client";

import { useState } from "react";
import supabase from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error(error);
        setMessage("Error sending magic link.");
      } else {
        setMessage("Check your email for the magic link.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("Unexpected error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold mb-6">Sign In</h1>
      <Input
        type="email"
        placeholder="Enter your email"
        className="mb-4 w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSignIn} className="w-80">
        Send Magic Link
      </Button>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
