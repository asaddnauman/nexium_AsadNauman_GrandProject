"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  const handleGenerate = async () => {
    if (!file || !role) {
      alert("Please upload a resume and enter a job role.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("role", role);

    const response = await fetch(
      "https://your-n8n-url.com/webhook/resume-tailor",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setGeneratedResume(data.generatedResume || "Failed to generate resume.");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-white/10 backdrop-blur p-10 rounded-xl w-full max-w-md text-center">
        <h2 className="text-4xl mb-6 font-gabriola">
          Upload Resume & Job Role
        </h2>
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
        {generatedResume && (
          <div className="mt-6 p-4 bg-white/20 rounded">
            <h3 className="text-2xl mb-2">AI Generated Resume:</h3>
            <p>{generatedResume}</p>
          </div>
        )}
      </div>
    </div>
  );
}
