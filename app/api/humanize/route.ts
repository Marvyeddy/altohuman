import {
  backendApiUrl,
  NGROK_SKIP_BROWSER_WARNING_HEADER,
  readApiError,
} from "@/lib/backend-api";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    const body = await req.json();

    const response = await fetch(backendApiUrl("/api/v1/humanize"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
        ...NGROK_SKIP_BROWSER_WARNING_HEADER,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 402) {
      return Response.json({ error: "Insufficient credits" }, { status: 402 });
    }

    if (!response.ok) {
      const error = await readApiError(response, "Backend Error");
      return Response.json({ error }, { status: response.status });
    }

    // Forward the stream from FastAPI to the browser.
    return new Response(response.body, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Humanize backend request failed:", error);
    return Response.json(
      { error: "Backend connection failed" },
      { status: 503 },
    );
  }
}
