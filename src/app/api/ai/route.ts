/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { resume, role, email } = body;

  // Your AI logic here...

  return NextResponse.json({
    tailoredResume: `AI generated resume for role: ${role}`,
  });
}
