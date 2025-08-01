"use client";

import React, { useState } from "react";

const TailorForm = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [tailoredResume, setTailoredResume] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText || !jobRole) return alert("Please fill in all fields");

    const response = await fetch("/api/tailor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resume: resumeText, role: jobRole }),
    });

    const data = await response.json();
    setTailoredResume(data.tailored);
  };

  const handleDownload = () => {
    const blob = new Blob([tailoredResume], {
      type: "text/plain;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "tailored_resume.txt";
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-xl shadow-xl text-black mt-10">
      <h2 className="text-4xl font-bold mb-6 text-center">AI Resume Tailor</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Paste your resume here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={10}
          className="w-full p-4 border rounded"
        />

        <input
          type="text"
          placeholder="Desired Job Role (e.g., Frontend Developer)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="w-full p-4 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded"
        >
          Tailor Resume
        </button>
      </form>

      {tailoredResume && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-2">Tailored Resume:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
            {tailoredResume}
          </pre>
          <button
            onClick={handleDownload}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Download as .txt
          </button>
        </div>
      )}
    </div>
  );
};

export default TailorForm;
