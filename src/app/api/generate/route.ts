import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const n8nResponse = await fetch(
    "https://asadnauman1.app.n8n.cloud/webhook/R0SdK8TGPqvuQMtj",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!n8nResponse.ok) {
    const errorText = await n8nResponse.text();
    return NextResponse.json({ error: errorText }, { status: 500 });
  }

  const pdfBlob = await n8nResponse.blob();

  return new NextResponse(pdfBlob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="AI-Tailored-Resume.pdf"',
    },
  });
}
