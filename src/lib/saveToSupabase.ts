// src/lib/saveToSupabase.ts
import { supabase } from "./supabase"; // ✅ named import, not default

export async function saveToSupabase(userId: string, summary: string) {
  const { error } = await supabase.from("summaries").insert([
    {
      user_id: userId,
      summary: summary,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
  }
}
