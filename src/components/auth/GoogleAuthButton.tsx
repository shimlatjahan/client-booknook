"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";

import { FcGoogle } from "react-icons/fc";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

// Component Props

interface GoogleAuthButtonProps {
  callbackUrl?: string;
  label?: string;
}

export default function GoogleAuthButton({
  callbackUrl = "/",
  label = "Continue with Google",
}: GoogleAuthButtonProps) {

  const [loading, setLoading] = useState(false);

  // Handle Google Authentication

  const handleGoogleLogin = async () => {

    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
        errorCallbackURL: "/login",
      });

      if (error) {
        toast.error(
          error.message || "Google authentication failed"
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong with Google Login"
      );

    } finally {
      setLoading(false);
    }

  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-gray-200 bg-white font-medium text-gray-700 transition hover:bg-gray-50"
    >

      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Connecting to Google...
        </>
      ) : (
        <>
          <FcGoogle className="h-5 w-5" />
          {label}
        </>
      )}

    </Button>
  );
}