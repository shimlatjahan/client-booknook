"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  BookOpen,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { authClient } from "@/lib/auth-client";

// =====================================
// PROPS TYPE
// =====================================

type BorrowBookDialogProps = {
  bookId: string;
  bookTitle: string;
  availableCopies: number;
};

// =====================================
// BACKEND API URL
// =====================================

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000"
).replace(/\/+$/, "");

// =====================================
// BORROW BOOK COMPONENT
// =====================================

export default function BorrowBookDialog({
  bookId,
  bookTitle,
  availableCopies,
}: BorrowBookDialogProps) {

  const router = useRouter();

  // Dialog State
  const [open, setOpen] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Error State
  const [error, setError] = useState("");

  // Success State
  const [borrowed, setBorrowed] = useState(false);

  // =====================================
  // HANDLE BORROW
  // =====================================

  const handleBorrow = async () => {
    if (loading || borrowed || availableCopies < 1) {
      return;
    }

    setLoading(true);
    setError("");

    try {

      // =====================================
      // GET BETTERAUTH JWT TOKEN
      // =====================================

      const { data, error: tokenError } =
        await authClient.token();

      if (tokenError || !data?.token) {
        throw new Error(
          "Authentication failed. Please log in again."
        );
      }

      // =====================================
      // SEND BORROW REQUEST
      // =====================================

      const response = await fetch(
        `${API_URL}/borrows`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },

          body: JSON.stringify({
            bookId,
          }),
        }
      );

      const result = await response
        .json()
        .catch(() => null);

      

      if (!response.ok) {
        throw new Error(
          result?.message ||
          `Failed to borrow book (${response.status})`
        );
      }

      // =====================================
      // BORROW SUCCESS
      // =====================================

      setBorrowed(true);

      setOpen(false);

      // Refresh Book Details
      router.refresh();

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  

  return (
    <div className="mt-8 space-y-4">

      
      <Button
        type="button"
        size="lg"
        disabled={
          availableCopies < 1 ||
          loading ||
          borrowed
        }
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className="h-14 w-full bg-[#17382c] text-base font-semibold text-white hover:bg-[#245540] disabled:cursor-not-allowed disabled:opacity-60"
      >

        {borrowed ? (

          <>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Book Borrowed
          </>

        ) : availableCopies < 1 ? (

          "Out of Stock"

        ) : (

          <>
            <BookOpen className="mr-2 h-5 w-5" />
            Borrow Book
          </>

        )}

      </Button>

      

      {borrowed && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="font-semibold">
              Book borrowed successfully!
            </p>

            <p className="mt-1 text-sm">
              Your borrowing record has been saved.
            </p>
          </div>
        </div>
      )}

     

      <AlertDialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!loading) {
            setOpen(nextOpen);
          }
        }}
      >

        <AlertDialogContent>

          {/* Dialog Header */}
          <AlertDialogHeader>

            <AlertDialogTitle className="flex items-center gap-2 text-xl text-[#17382c]">

              <BookOpen className="h-6 w-6" />

              Borrow Book?

            </AlertDialogTitle>

            <AlertDialogDescription className="leading-7">

              Are you sure you want to borrow{" "}

              <span className="font-semibold">
                {bookTitle}
              </span>

              ?

              <br />

              <br />

              This book will be added to your borrowing
              records.

            </AlertDialogDescription>

          </AlertDialogHeader>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="rounded-xl bg-red-50 p-4 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* Dialog Buttons */}
          <AlertDialogFooter>

            <AlertDialogCancel disabled={loading}>
              Cancel
            </AlertDialogCancel>

            <Button
              type="button"
              onClick={handleBorrow}
              disabled={loading}
              className="bg-[#17382c] text-white hover:bg-[#245540]"
            >

              {loading ? (

                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Borrowing...
                </>

              ) : (

                <>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Confirm Borrow
                </>

              )}

            </Button>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

    </div>
  );
}