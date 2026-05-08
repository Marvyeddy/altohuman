"use server";

import { cookies } from "next/headers";
import { backendApiUrl, readApiError } from "@/lib/backend-api";

export async function processAiAction(text: string, action: "score") {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const response = await fetch(backendApiUrl("/api/v1/humanize"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
      body: JSON.stringify({ text, action }),
    });

    // 1. Return status codes so the client can trigger toasts/redirects
    if (response.status === 401) {
      return { success: false, status: 401, error: "UNAUTHORIZED" };
    }

    if (response.status === 402) {
      return { success: false, status: 402, error: "Insufficient credits!" };
    }

    if (!response.ok) {
      return {
        success: false,
        error: await readApiError(response, "Scoring Error"),
      };
    }

    // 2. Return the data directly
    const data = await response.json();
    return { 
      success: true, 
      text: data.text, 
      message: data.message 
    };

  } catch (error) {
    console.error("AI score request failed:", error);
    return { success: false, error: "Backend connection failed" };
  }
}
