"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function UploadForm() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState("");
  const [updatedResume, setUpdatedResume] = useState("");

  const handleUpload = async () => {
    if (!resumeFile || !jobRole) {
      alert("Please upload a resume and enter a job role.");
      return;
    }

    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("role", jobRole);

    const res = await fetch("/api/ai-tailor", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUpdatedResume(data.updatedResume);
  };

  return (
    <div className="bg-white bg-opacity-70 rounded-2xl p-6 shadow-xl w-full max-w-2xl">
      <h2
        className="text-[48px] font-bold text-center mb-4"
        style={{ fontFamily: "Gabriola" }}
      >
        Upload Resume & Tailor
      </h2>

      <Label className="text-[24px]" style={{ fontFamily: "Gabriola" }}>
        Upload Resume (PDF or DOCX)
      </Label>
      <Input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <Label className="text-[24px]" style={{ fontFamily: "Gabriola" }}>
        Enter Target Job Role
      </Label>
      <Input
        type="text"
        placeholder="e.g. Frontend Developer"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        className="mb-4"
      />

      <Button
        onClick={handleUpload}
        className="w-full text-[24px]"
        style={{ fontFamily: "Gabriola" }}
      >
        Tailor Resume
      </Button>

      {updatedResume && (
        <div className="mt-6">
          <Label className="text-[24px]" style={{ fontFamily: "Gabriola" }}>
            AI-Tailored Resume
          </Label>
          <Textarea
            value={updatedResume}
            readOnly
            rows={10}
            className="text-[20px] font-medium mt-2"
            style={{ fontFamily: "Gabriola" }}
          />
        </div>
      )}
    </div>
  );
}
