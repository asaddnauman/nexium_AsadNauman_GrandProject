"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert("Error sending magic link: " + error.message);
    } else {
      alert("Check your email for the magic link!");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 bg-white/10 p-8 rounded-xl backdrop-blur w-96">
      <h2 className="text-4xl font-gabriola">Sign In</h2>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button className="w-full" onClick={handleLogin}>
        Send Magic Link
      </Button>
    </div>
  );
}
