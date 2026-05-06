"use server";

import { cookies } from "next/headers";

export async function initializePaymentAction(planName: string) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString(); // This grabs the better-auth session cookie

  try {
    const response = await fetch(
      `https://humped-footwork-dividing.ngrok-free.dev/api/v1/payment/initialize/${planName.toLowerCase()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "Cookie": allCookies, // Manually passing the cookie from server to server
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Backend connection failed" };
  }
}
