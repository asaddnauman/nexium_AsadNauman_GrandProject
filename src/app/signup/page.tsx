"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✨ Dummy Sign Up logic – replace with Supabase later
    alert(`Registered with Email: ${email}`);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-[Gabriola] bg-black bg-opacity-60 text-white">
      <form
        onSubmit={handleSignUp}
        className="bg-white bg-opacity-90 text-black p-10 rounded-lg shadow-xl w-full max-w-md"
      >
        <h1 className="text-[48px] font-[Gabriola] mb-6 text-center">
          Create an Account
        </h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-[24px]">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-[24px]">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-[24px]"
        >
          Sign Up
        </button>

        <p className="text-center text-[20px] mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-700 underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
