"use server";

import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  allCookies.forEach((cookie) => {
    if (cookie.name.includes("better-auth.session_token")) {
      cookieStore.delete(cookie.name);
    }
  });

  // 3. Redirect to the home page
  redirect("/");
}
