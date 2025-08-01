export async function saveToMongoDB(pdfBase64: string, email: string) {
  try {
    const response = await fetch("/api/save-to-mongo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pdfBase64, email }),
    });

    if (!response.ok) {
      throw new Error("MongoDB save failed");
    }
  } catch (error) {
    console.error("MongoDB save error:", error);
  }
}
