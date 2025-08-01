"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { saveToMongoDB } from "@/lib/mongo"; // your MongoDB save function
import saveToSupabase from "@/lib/supabase"; // default import assumed for supabase save
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
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
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

    setLoading(true);

    try {
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        const base64Pdf = fileReader.result as string;

        const n8nWebhookUrl =
          process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
          "https://your-n8n-webhook-url.com/webhook";

        const response = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resume: base64Pdf,
            role: jobRole,
            email: userEmail,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          toast.error("Failed to generate AI resume. Try again later.");
          console.error("n8n webhook error:", errorText);
          setLoading(false);
          return;
        }

        const result = await response.json();
        const tailoredResume = result.tailoredResume || "No resume returned.";

        setAiResume(tailoredResume);

        await saveToMongoDB(base64Pdf, userEmail);
        await saveToSupabase(tailoredResume, jobRole, userEmail);

        toast.success("AI Resume generated & saved!");
        setLoading(false);
      };

      fileReader.readAsDataURL(pdfFile);
    } catch (error) {
      toast.error("Unexpected error occurred. Please try again.");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-10 font-[Gabriola] text-white"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <h1 className="text-[72px] text-center mb-8">Resume Tailor</h1>

      <div className="max-w-xl mx-auto space-y-6">
        <Input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          className="text-[20px] font-[Gabriola]"
          disabled={loading}
        />
        <Input
          placeholder="Enter job role (e.g., Software Engineer)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="text-[20px] font-[Gabriola]"
          disabled={loading}
        />
        <Button
          onClick={handleUpload}
          className="w-full text-[24px] font-[Gabriola]"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate AI Resume"}
        </Button>
      </div>

      {aiResume && (
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-white/10 rounded-xl shadow-xl backdrop-blur text-[20px] whitespace-pre-wrap">
          <h2 className="text-[40px] mb-4">Tailored Resume:</h2>
          <pre>{aiResume}</pre>
        </div>
      )}
    </div>
  );
}
