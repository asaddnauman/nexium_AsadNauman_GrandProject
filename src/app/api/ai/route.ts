import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Mock AI logic (replace with real AI/n8n logic if available)
function simulateAIResume(resume: string, jobRole: string): string {
  return `📄 Tailored Resume for Role: ${jobRole}\n\n${resume}\n\n🧠 AI Suggestions:\n- Emphasize experience relevant to ${jobRole}\n- Highlight soft skills and leadership\n- Add metrics and accomplishments.`;
}

export async function POST(req: NextRequest) {
  try {
    const { resume, jobRole } = await req.json();

    if (!resume || !jobRole) {
      return NextResponse.json(
        { error: "Missing resume or job role" },
        { status: 400 }
      );
    }

    // Generate AI resume
    const tailoredResume = simulateAIResume(resume, jobRole);

    // Save to Supabase
    const { data, error } = await supabase.from("tailored_resumes").insert([
      {
        job_role: jobRole,
        original_resume: resume,
        tailored_resume: tailoredResume,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save resume" },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: tailoredResume });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
