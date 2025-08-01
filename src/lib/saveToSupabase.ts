import supabase from "./supabase";

export async function saveToSupabase(userId: string, summary: string) {
  const { error } = await supabase.from("summaries").insert([
    {
      user_id: userId,
      summary: summary,
    },
  ]);

  if (error) {
    throw new Error("Failed to save to Supabase: " + error.message);
  }
}
