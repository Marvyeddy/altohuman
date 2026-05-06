import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const body = await req.json();

  const response = await fetch("https://humped-footwork-dividing.ngrok-free.dev/api/v1/humanize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": allCookies,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
  });

  if (response.status === 402) {
    return new Response(JSON.stringify({ error: "Insufficient credits" }), { status: 402 });
  }

  if (!response.ok) {
    return new Response("Backend Error", { status: response.status });
  }

  // Forward the stream from FastAPI to the browser
  return new Response(response.body, {
    headers: { "Content-Type": "text/plain" },
  });
}
