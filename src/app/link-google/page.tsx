"use client";

import { useState } from "react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";

import { FcGoogle } from "react-icons/fc";
import { Loader2, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function LinkGooglePage() {
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Connect Google Account
  const handleLinkGoogle = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.linkSocial({
        provider: "google",
        callbackURL: "/link-google",
      });

      if (error) {
        toast.error(error.message || "Google linking failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }

      toast.success("Logged out successfully!");

      window.location.replace("/login");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLogoutLoading(false);
    }
  };

  // Loading Session
  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#18392B]" />
      </div>
    );
  }

  // User Not Logged In
  if (!session) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-[#FAF8F4] px-4">

        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

          <h1 className="mb-4 text-2xl font-bold text-[#18392B]">
            Login Required
          </h1>

          <p className="mb-6 text-gray-600">
            Please login with your email and password first.
          </p>

          <Link
            href="/login?callbackUrl=%2Flink-google"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#18392B] px-8 font-semibold text-white hover:bg-[#28533F]"
          >
            Login First
          </Link>

        </div>

      </section>
    );
  }

  // User Logged In
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[#FAF8F4] px-4 py-16">

      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg">

        <h1 className="mb-4 text-3xl font-bold text-[#18392B]">
          Link Google Account
        </h1>

        <p className="mb-2 text-gray-500">
          Currently logged in as
        </p>

        <p className="mb-8 font-semibold text-[#18392B]">
          {session.user.email}
        </p>

        {/* GOOGLE LINK BUTTON */}

        <Button
          type="button"
          onClick={handleLinkGoogle}
          disabled={loading}
          className="mb-4 h-12 w-full cursor-pointer rounded-xl bg-[#18392B] text-white hover:bg-[#28533F]"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <FcGoogle className="h-5 w-5" />
              Connect Google Account
            </>
          )}
        </Button>

        {/* LOGOUT BUTTON */}

        <Button
          type="button"
          variant="outline"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="h-12 w-full cursor-pointer rounded-xl"
        >
          {logoutLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}

          Logout & Test Google Login
        </Button>

      </div>

    </section>
  );
}