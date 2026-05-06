"use server";

import { cookies } from "next/headers";
import {
  backendApiUrl,
  NGROK_SKIP_BROWSER_WARNING_HEADER,
  readApiError,
} from "@/lib/backend-api";

export async function initializePaymentAction(planName: string) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString(); // This grabs the better-auth session cookie

  try {
    const response = await fetch(
      backendApiUrl(
        `/api/v1/payment/initialize/${planName.toLowerCase()}`,
      ),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
          ...NGROK_SKIP_BROWSER_WARNING_HEADER,
        },
      },
    );

    if (!response.ok) {
      return {
        error: await readApiError(response, "Failed to initialize payment"),
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Payment initialization failed:", error);
    return { error: "Backend connection failed" };
  }
}
