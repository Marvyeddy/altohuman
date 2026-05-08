"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { backendApiUrl, readApiError } from "@/lib/backend-api";

export async function processAiAction(text: string, action: "score") {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }

  try {
    const response = await fetch(backendApiUrl("/api/v1/humanize"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ text, action }),
    });

    // 1. Handle Unauthorised separately (must be outside try/catch to redirect)
    if (response.status === 401) {
      // We will handle the actual redirect outside the catch
      return { success: false, error: "UNAUTHORIZED" };
    }

    // 2. Handle specific credit errors (402)
    if (response.status === 402) {
      return { success: false, error: "Insufficient credits!" };
    }

    if (!response.ok) {
      const errorMsg = await readApiError(response, "Scoring Error");
      return { success: false, error: errorMsg };
    }

    const data = await response.json();
    return { success: true, text: data.text, message: data.message };

  } catch (error) {
    // If it's a redirect error from a nested function, rethrow it
    if (error && typeof error === 'object' && 'digest' in error) throw error;
    
    return { success: false, error: "Backend connection failed" };
  }
}
