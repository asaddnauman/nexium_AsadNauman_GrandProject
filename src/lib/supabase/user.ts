// src/lib/supabase/user.ts
import { supabase } from "./client";

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Supabase auth error:", error.message);
    return null;
  }
  return data?.user ?? null;
}
