"use client";
import { useState } from "react";

const fakeUrduDictionary = {
  This: "یہ",
  is: "ہے",
  a: "ایک",
  summary: "خلاصہ",
  of: "کا",
  the: "دی",
  blog: "بلاگ",
  from: "سے",
};

function translateToUrdu(text: string): string {
  return text
    .split(" ")
    .map((word) => fakeUrduDictionary[word] || word)
    .join(" ");
}

export default function AIPage() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/summarise", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setUrdu("");
    setLoading(false);
  };

  const handleTranslate = () => {
    setUrdu(translateToUrdu(summary));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-gabriola mb-6">AI Blog Summariser</h1>
      <input
        type="text"
        placeholder="Enter blog URL"
        className="p-3 text-black rounded-lg w-full max-w-2xl mb-4"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-white text-black px-6 py-2 rounded-full"
        disabled={loading}
      >
        {loading ? "Summarising..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="bg-white text-black text-2xl font-gabriola p-6 rounded-xl max-w-3xl mt-6">
          <p>{summary}</p>
          <button
            onClick={handleTranslate}
            className="mt-4 bg-black text-white px-4 py-2 rounded-full"
          >
            Translate to Urdu
          </button>
          {urdu && (
            <p className="mt-4 text-right text-2xl font-gabriola text-green-600">
              {urdu}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
