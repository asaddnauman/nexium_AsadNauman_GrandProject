// src/app/ai/history.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Summary = {
  id: number;
  created_at: string;
  summary: string;
  translated: string;
};

export default function History() {
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      const { data, error } = await supabase
        .from("summaries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setSummaries(data);
      }
    };

    fetchSummaries();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 font-[Gabriola]">
        Summary History
      </h1>
      <ul className="space-y-6">
        {summaries.map((summary) => (
          <li
            key={summary.id}
            className="bg-white/20 dark:bg-black/40 p-4 rounded-xl shadow"
          >
            <p className="text-xl font-[Gabriola]">
              <strong>Summary:</strong> {summary.summary}
            </p>
            <p className="text-xl font-[Gabriola] mt-2">
              <strong>Urdu:</strong> {summary.translated}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Created: {new Date(summary.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
