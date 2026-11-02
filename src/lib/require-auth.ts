import { auth } from "@/lib/auth";

import { headers } from "next/headers";

import { redirect } from "next/navigation";

export async function requireAuth(returnTo: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(returnTo)}`
    );
  }

  return session;
}