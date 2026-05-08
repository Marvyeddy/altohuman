import { backendApiUrl, readApiError } from "@/lib/backend-api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// processAiAction.ts
export async function processAiAction(text: string, action: "score") {
  const cookieStore = await cookies();
  const session = cookieStore.get("session"); 
  
  if (!session) {
    redirect("/login"); 
  }

  // 1. Declare a variable to store the response status
  let responseStatus = 200;

  try {
    const response = await fetch(backendApiUrl("/api/v1/humanize"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ text, action }),
    });

    responseStatus = response.status;

    if (response.ok) {
      const data = await response.json();
      return { success: true, text: data.text, message: data.message };
    }

    // Don't call redirect inside try/catch!
    if (responseStatus !== 401) {
       return {
        success: false,
        error: await readApiError(response, "Scoring Error"),
      };
    }
  } catch (error) {
    console.error("AI score request failed:", error);
    return { success: false, error: "Scoring Error, Login to continue" };
  }

  // 3. Trigger redirect outside the try/catch
  if (responseStatus === 401) {
    redirect("/login");
  }
}
