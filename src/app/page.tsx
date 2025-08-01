"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { saveToMongoDB } from "@/lib/mongo";
// Removed: import { saveToSupabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState<string>("");
  const [aiResume, setAiResume] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user?.email) {
        router.push("/login");
      } else {
        setUserEmail(data.user.email);
      }
    };
    getUser();
  }, [router]);

  const handleUpload = async () => {
    if (!pdfFile || !jobRole || !userEmail) {
      toast.error("Please upload resume, enter job role, and log in.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const base64Pdf = fileReader.result as string;

      const response = await fetch("https://your-n8n-webhook-url.com/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume: base64Pdf,
          role: jobRole,
          email: userEmail,
        }),
      });

      const result = (await response.json()) as { tailoredResume?: string };
      const tailoredResume = result.tailoredResume || "No resume returned.";

      setAiResume(tailoredResume);

      await saveToMongoDB(base64Pdf, userEmail);
      // Removed: await saveToSupabase(tailoredResume, jobRole, userEmail);

      toast.success("AI Resume generated & saved!");
    };

    fileReader.readAsDataURL(pdfFile);
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-10 font-[Gabriola] bg-[url('/bg.jpg')] text-white">
      <h1 className="text-[72px] text-center mb-8">Resume Tailor</h1>

      <div className="max-w-xl mx-auto space-y-6">
        <Input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          className="text-[20px] font-[Gabriola]"
        />
        <Input
          placeholder="Enter job role (e.g., Software Engineer)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="text-[20px] font-[Gabriola]"
        />
        <Button
          onClick={handleUpload}
          className="w-full text-[24px] font-[Gabriola]"
        >
          Generate AI Resume
        </Button>
      </div>

      {aiResume && (
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-white/10 rounded-xl shadow-xl backdrop-blur text-[20px] whitespace-pre-wrap">
          <h2 className="text-[40px] mb-4">Tailored Resume:</h2>
          <p>{aiResume}</p>
        </div>
      )}
    </div>
  );
}
