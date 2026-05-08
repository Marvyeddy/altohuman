"use server";

import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  const cookieStore = await cookies();
  cookieStore.delete("__Secure-better-auth.session_token");

  redirect("/");
}