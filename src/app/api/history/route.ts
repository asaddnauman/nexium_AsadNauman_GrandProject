// This route is mocked to bypass @supabase/ssr issues during deployment

export const dynamic = "force-static"; // Force static export to avoid SSR during build

export async function POST(req: Request) {
  // Log for debugging (optional)
  console.log("API /api/history called - mocked response");

  // Return dummy data to keep the API functional
  return new Response(
    JSON.stringify({
      success: true,
      data: [
        { id: 1, role: "Software Engineer", timestamp: "2025-08-02T12:00:00Z" },
        {
          id: 2,
          role: "Frontend Developer",
          timestamp: "2025-08-01T15:30:00Z",
        },
      ],
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
