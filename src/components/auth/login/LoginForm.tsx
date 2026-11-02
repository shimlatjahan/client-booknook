"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";

import {
  BookOpen,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

// Google Authentication Component
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

interface LoginFormProps {
  callbackUrl?: string;
}

export default function LoginForm({
  callbackUrl = "/",
}: LoginFormProps) {

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Email & Password Login

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = String(
      formData.get("email") || ""
    ).trim();

    const password = String(
      formData.get("password") || ""
    );

    try {
      setLoading(true);

      // BetterAuth Email Login

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(
          error.message || "Invalid email or password"
        );
        return;
      }

      toast.success("Login successful!");

      // Redirect After Login
      window.location.assign(callbackUrl);

    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        "Login failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[85vh] items-center justify-center bg-[#FAF8F4] px-4 py-16">

      <Card className="w-full max-w-md rounded-3xl border-[#EDE5D8] bg-white shadow-xl">

        {/* LOGIN HEADER */}

        <CardHeader className="items-center space-y-3 pb-6 text-center">

          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#18392B] text-white">
            <BookOpen size={32} />
          </div>

          <CardTitle className="text-3xl font-bold text-[#18392B]">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-sm text-gray-500">
            Login to continue your reading journey.
          </CardDescription>

        </CardHeader>

        {/* LOGIN CONTENT */}

        <CardContent className="px-6 sm:px-8">

          {/* EMAIL PASSWORD LOGIN FORM */}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div className="space-y-2">

              <Label htmlFor="login-email">
                Email Address
              </Label>

              <Input
                id="login-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="h-12 rounded-xl"
              />

            </div>

            {/* PASSWORD */}

            <div className="space-y-2">

              <div className="flex items-center justify-between">

                <Label htmlFor="login-password">
                  Password
                </Label>

                <span className="text-xs text-gray-500">
                  Forgot Password?
                </span>

              </div>

              <div className="relative">

                <Input
                  id="login-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-12 rounded-xl pr-12"
                />

                {/* SHOW / HIDE PASSWORD */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#18392B]"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* LOGIN BUTTON */}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full cursor-pointer rounded-xl bg-[#18392B] font-semibold text-white hover:bg-[#28533F]"
            >

              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging In...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="h-4 w-4" />
                </>
              )}

            </Button>

          </form>

          {/* SOCIAL LOGIN SEPARATOR */}

          <div className="my-6 flex items-center gap-4">

            <Separator className="flex-1" />

            <span className="whitespace-nowrap text-xs text-gray-400">
              OR CONTINUE WITH
            </span>

            <Separator className="flex-1" />

          </div>

          {/* GOOGLE LOGIN BUTTON */}

          <GoogleAuthButton
            callbackUrl={callbackUrl}
            label="Continue with Google"
          />

        </CardContent>

        {/* LOGIN FOOTER */}

        <CardFooter className="justify-center pb-8 pt-4">

          <p className="text-sm text-gray-600">

            Don&apos;t have an account?{" "}

            <Link
              href="/register"
              className="font-semibold text-[#18392B] hover:underline"
            >
              Register
            </Link>

          </p>

        </CardFooter>

      </Card>

    </section>
  );
}