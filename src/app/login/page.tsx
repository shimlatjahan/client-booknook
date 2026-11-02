import type { Metadata } from "next";

import LoginForm from "@/components/auth/login/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your BookNook account.",
};

interface LoginPageProps {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {

  const params = await searchParams;

  const requestedUrl = params.callbackUrl;

  const callbackUrl =
    typeof requestedUrl === "string" &&
    requestedUrl.startsWith("/") &&
    !requestedUrl.startsWith("//") &&
    !requestedUrl.includes("\\")
      ? requestedUrl
      : "/";

  return <LoginForm callbackUrl={callbackUrl} />;
}