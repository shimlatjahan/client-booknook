"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function RegisterForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Email & Password Registration

  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(
      formData.get("name") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    ).trim();

    const image = String(
      formData.get("image") || ""
    ).trim();

    const password = String(
      formData.get("password") || ""
    );

    // Password Validation

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error(
        "Password must contain an uppercase letter"
      );
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error(
        "Password must contain a lowercase letter"
      );
      return;
    }

    try {
      setLoading(true);

      // BetterAuth Registration

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
      });

      if (error) {
        toast.error(
          error.message || "Registration failed"
        );
        return;
      }

      toast.success(
        "Registration successful! Please login."
      );

      // Redirect to Login Page

      router.push("/login");

    } catch (error) {
      console.error("Registration Error:", error);

      toast.error(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[85vh] items-center justify-center bg-[#FAF8F4] px-4 py-16">

      <Card className="w-full max-w-md rounded-3xl border-[#EDE5D8] bg-white shadow-xl">

        {/* REGISTER HEADER */}

        <CardHeader className="items-center space-y-3 pb-6 text-center">

          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#18392B] text-white">
            <BookOpen size={32} />
          </div>

          <CardTitle className="text-3xl font-bold text-[#18392B]">
            Create Account
          </CardTitle>

          <CardDescription className="text-sm text-gray-500">
            Join BookNook and start your reading journey.
          </CardDescription>

        </CardHeader>

        {/* REGISTER CONTENT */}

        <CardContent className="px-6 sm:px-8">

          {/* REGISTER FORM */}

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* NAME */}

            <div className="space-y-2">

              <Label htmlFor="name">
                Full Name
              </Label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="h-12 rounded-xl"
              />

            </div>

            {/* EMAIL */}

            <div className="space-y-2">

              <Label htmlFor="email">
                Email Address
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                required
                className="h-12 rounded-xl"
              />

            </div>

            {/* PHOTO URL */}

            <div className="space-y-2">

              <Label htmlFor="image">
                Photo URL
              </Label>

              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="h-12 rounded-xl"
              />

            </div>

            {/* PASSWORD */}

            <div className="space-y-2">

              <Label htmlFor="password">
                Password
              </Label>

              <div className="relative">

                <Input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  minLength={6}
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

              <p className="text-xs leading-5 text-gray-500">
                Minimum 6 characters with uppercase
                and lowercase letters.
              </p>

            </div>

            {/* REGISTER BUTTON */}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full cursor-pointer rounded-xl bg-[#18392B] font-semibold text-white hover:bg-[#28533F]"
            >

              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}

            </Button>

          </form>

          {/* SOCIAL REGISTRATION SEPARATOR */}

          <div className="my-6 flex items-center gap-4">

            <Separator className="flex-1" />

            <span className="whitespace-nowrap text-xs text-gray-400">
              OR CONTINUE WITH
            </span>

            <Separator className="flex-1" />

          </div>

          {/* GOOGLE REGISTRATION BUTTON */}

          <GoogleAuthButton
            callbackUrl="/"
            label="Continue with Google"
          />

        </CardContent>

        {/* REGISTER FOOTER */}

        <CardFooter className="justify-center pb-8 pt-4">

          <p className="text-sm text-gray-600">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-[#18392B] hover:underline"
            >
              Login
            </Link>

          </p>

        </CardFooter>

      </Card>

    </section>
  );
}