"use server";

import { cookies } from "next/headers";
import {
  backendApiUrl,
  // NGROK_SKIP_BROWSER_WARNING_HEADER,
  readApiError,
} from "@/lib/backend-api";

export async function processAiAction(text: string, action: "score") {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const response = await fetch(backendApiUrl("/api/v1/humanize"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
        // ...NGROK_SKIP_BROWSER_WARNING_HEADER,
      },
      body: JSON.stringify({ text, action }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: await readApiError(response, "Scoring Error, Login to continue"),
      };
    }

    const data = await response.json();

    return { success: true, text: data.text, message: data.message };
  } catch (error) {
    console.error("AI score request failed:", error);
    return { success: false, error: "Scoring Error, Login to continue" };
  }
}

