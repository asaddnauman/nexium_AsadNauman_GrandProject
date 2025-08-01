// src/app/history/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Summary = {
  id: number;
  text: string;
  created_at: string;
};

export default function HistoryPage() {
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      const { data } = await supabase.from("summaries").select("*");
      if (data) setSummaries(data as Summary[]);
    };
    fetchSummaries();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Summary History</h1>
      <ul>
        {summaries.map((summary) => (
          <li key={summary.id} className="border p-3 my-2 rounded">
            <p>{summary.text}</p>
            <small className="text-gray-500">{summary.created_at}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
