import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resume, role } = await req.json();
  const webhookURL = "https://your-n8n-domain/webhook/resume-tailor";

  const response = await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume, role }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
