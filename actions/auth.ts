"use server";

import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  // 1. Tell Better Auth to kill the session on the server
  await auth.api.signOut({
    headers: await headers(),
  });

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  // 2. Nuclear option: Overwrite every better-auth cookie
  allCookies.forEach((cookie) => {
    if (cookie.name.includes("better-auth")) {
      cookieStore.set(cookie.name, "", {
        path: "/",                // MUST match the path it was created on
        maxAge: 0,                // Expires it immediately
        secure: process.env.NODE_ENV === "production", // Secure only in production
        sameSite: "lax",
      });
    }
  });

  // 3. Force redirect to login
  redirect("/login");
}
