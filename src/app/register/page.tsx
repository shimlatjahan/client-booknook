import type { Metadata } from "next";

import RegisterForm from "@/components/auth/register/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your BookNook account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}