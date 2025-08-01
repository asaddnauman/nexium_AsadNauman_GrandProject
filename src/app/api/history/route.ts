// src/app/api/summarise/route.ts
import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { translateToUrdu } from "@/lib/translate";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { url, summary } = await req.json();
  const translated = translateToUrdu(summary);

  const supabase = createClient();
  const session = await supabase.auth.getSession();

  const userEmail = session?.data.session?.user?.email;

  if (userEmail) {
    const client = await clientPromise;
    const db = client.db("ai_app");
    const collection = db.collection("blogs");
    await collection.insertOne({ url, summary, email: userEmail });
  }

  return new Response(JSON.stringify({ summary, translated }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
