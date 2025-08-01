"use client";
import { useState } from "react";

export default function ResumeForm() {
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [updatedResume, setUpdatedResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://asadnauman1.app.n8n.cloud/webhook/resume-tailor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume: resumeText,
            jobRole: jobRole,
          }),
        }
      );

      const data = await response.json();
      if (data.updatedResume) {
        setUpdatedResume(data.updatedResume);
      } else {
        alert("No tailored resume received.");
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Error connecting to resume generator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <textarea
        placeholder="Paste your resume here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        className="w-full h-40 p-2 border border-gray-300 mb-4"
      />
      <input
        placeholder="Enter job role..."
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        className="w-full p-2 border border-gray-300 mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Tailor Resume"}
      </button>

      {updatedResume && (
        <div className="mt-6 p-4 bg-gray-100 border">
          <h2 className="text-xl font-bold mb-2">AI-Tailored Resume</h2>
          <pre>{updatedResume}</pre>
        </div>
      )}
    </div>
  );
}
