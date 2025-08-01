// src/app/api/ai/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText, jobRole } = await req.json();

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeText, jobRole }),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await response.json();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { success: false, error: "AI processing failed" },
      { status: 500 }
    );
  }
}
