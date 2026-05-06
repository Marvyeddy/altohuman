"use server";

import { cookies } from "next/headers";

// Keep this in your actions.ts
export async function processAiAction(text: string, action: "score") {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const response = await fetch("https://humped-footwork-dividing.ngrok-free.dev/api/v1/humanize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": allCookies,
      },
      body: JSON.stringify({ text, action: "score" }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Request failed");

    return { success: true, text: data.text, message: data.message };
  } catch (error) {
    return { success: false, error: "Scoring Error" };
  }
}

