// src/components/FileUploader.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`public/${file.name}`, file);

    if (error) {
      console.error("Upload error:", error.message);
    } else {
      console.log("File uploaded:", data);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
