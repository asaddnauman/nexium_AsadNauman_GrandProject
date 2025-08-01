// src/app/upload/page.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const { error } = await supabase.storage
      .from("uploads")
      .upload(`public/${file.name}`, file);

    if (error) {
      alert("Upload failed: " + error.message);
    } else {
      alert("Upload successful!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Upload File</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
      >
        Upload
      </button>
    </div>
  );
}
