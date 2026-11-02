"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
  BookOpen,
  RotateCcw,
  Loader2,
  CheckCircle2,
  CalendarDays,
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
// BORROW TYPE
// =====================================

type Borrow = {
  _id: string;
  bookId: string;

  userId: string;
  userName: string;
  userEmail: string;

  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  category: string;

  status: "borrowed" | "returned";

  borrowedAt: string;
  returnedAt: string | null;
};

// =====================================
// API URL
// =====================================

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000"
).replace(/\/+$/, "");

// =====================================
// DATE FORMAT
// =====================================

function formatDate(date: string | null) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// =====================================
// MY BORROWS COMPONENT
// =====================================

export default function MyBorrowsClient() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [selectedBorrow, setSelectedBorrow] =
    useState<Borrow | null>(null);

  const [returning, setReturning] = useState(false);

  const [returnError, setReturnError] = useState("");

  // =====================================
  // GET JWT
  // =====================================

  const getToken = async () => {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error(
        "Authentication failed. Please log in again."
      );
    }

    return data.token;
  };

  // =====================================
  // FETCH MY BORROWS
  // =====================================

  const loadBorrows = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: tokenError } =
        await authClient.token();

      if (tokenError || !data?.token) {
        throw new Error("Please log in again.");
      }

      const response = await fetch(
        `${API_URL}/borrows/my`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },

          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to fetch borrowed books"
        );
      }

      if (!Array.isArray(result)) {
        throw new Error("Invalid borrowing data received.");
      }

      setBorrows(result);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================
  // LOAD DATA ON PAGE OPEN
  // =====================================

  useEffect(() => {
    void loadBorrows();
  }, [loadBorrows]);

  // =====================================
  // HANDLE RETURN BOOK
  // =====================================

  const handleReturn = async () => {
    if (!selectedBorrow || returning) return;

    setReturning(true);
    setReturnError("");
    setSuccess("");

    try {
      const token = await getToken();

      const response = await fetch(
        `${API_URL}/borrows/${selectedBorrow._id}/return`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to return book"
        );
      }

      // Show success message
      setSuccess("Book returned successfully!");

      // Close dialog
      setSelectedBorrow(null);

      // Fetch updated records
      await loadBorrows();

    } catch (err) {
      setReturnError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

    } finally {
      setReturning(false);
    }
  };

  // =====================================
  // LOADING STATE
  // =====================================

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">

        <Loader2 className="h-8 w-8 animate-spin text-[#18392B]" />

        <span className="ml-3 text-gray-600">
          Loading borrowed books...
        </span>

      </div>
    );
  }

  // =====================================
  // ERROR STATE
  // =====================================

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

        <p className="text-red-600">
          {error}
        </p>

        <Button
          type="button"
          variant="outline"
          onClick={() => void loadBorrows()}
          className="mt-5"
        >
          Try Again
        </Button>

      </div>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (
    <div className="space-y-8">

      {/* =====================================
          TOTAL BORROWS
      ===================================== */}

      <div className="rounded-2xl border border-[#EDE5D8] bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-[#E8F4EC] p-3">

            <BookOpen className="h-6 w-6 text-[#18392B]" />

          </div>

          <div>
            <p className="text-sm text-gray-500">
              Currently Borrowed Books
            </p>

            <h2 className="text-3xl font-bold text-[#18392B]">
              {
                borrows.filter(
                  (borrow) => borrow.status === "borrowed"
                ).length
              }
            </h2>
          </div>

        </div>

      </div>

      {/* =====================================
          SUCCESS MESSAGE
      ===================================== */}

      {success && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700"
        >
          <CheckCircle2 className="h-5 w-5" />
          {success}
        </div>
      )}

      {/* =====================================
          EMPTY STATE
      ===================================== */}

      {borrows.length === 0 ? (

        <div className="rounded-2xl border border-[#EDE5D8] bg-white p-12 text-center shadow-sm">

          <BookOpen className="mx-auto h-12 w-12 text-[#18392B]" />

          <h2 className="mt-5 text-2xl font-bold text-[#18392B]">
            No Borrowed Books Yet
          </h2>

          <p className="mt-3 text-gray-600">
            You haven't borrowed any books yet.
          </p>

          <Link
            href="/books"
            className="mt-6 inline-flex rounded-xl bg-[#18392B] px-6 py-3 font-semibold text-white transition hover:bg-[#245540]"
          >
            Explore Books
          </Link>

        </div>

      ) : (

        // =====================================
        // BORROWED BOOKS GRID
        // =====================================

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {borrows.map((borrow) => (

            <div
              key={borrow._id}
              className="overflow-hidden rounded-2xl border border-[#EDE5D8] bg-white shadow-sm"
            >

              <div className="flex flex-col gap-5 p-5 sm:flex-row">

                {/* Book Cover */}
                <div className="shrink-0">

                  <img
                    src={borrow.bookImage}
                    alt={borrow.bookTitle}
                    className="h-48 w-full rounded-xl object-cover sm:w-32"
                  />

                </div>

                {/* Book Information */}
                <div className="flex-1 space-y-3">

                  {/* Status */}
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      borrow.status === "borrowed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {borrow.status === "borrowed"
                      ? "Borrowed"
                      : "Returned"}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#18392B]">
                    {borrow.bookTitle}
                  </h3>

                  {/* Author */}
                  <p className="text-sm text-gray-600">
                    By {borrow.bookAuthor}
                  </p>

                  {/* Borrow Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">

                    <CalendarDays className="h-4 w-4" />

                    Borrowed: {formatDate(borrow.borrowedAt)}

                  </div>

                  {/* Return Date */}
                  {borrow.returnedAt && (
                    <p className="text-sm text-gray-500">
                      Returned: {formatDate(borrow.returnedAt)}
                    </p>
                  )}

                  {/* Return Button */}
                  {borrow.status === "borrowed" ? (

                    <Button
                      type="button"
                      onClick={() => {
                        setReturnError("");
                        setSelectedBorrow(borrow);
                      }}
                      className="mt-3 bg-[#18392B] hover:bg-[#245540]"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />

                      Return Book
                    </Button>

                  ) : (

                    <p className="flex items-center gap-2 text-sm font-medium text-green-700">

                      <CheckCircle2 className="h-4 w-4" />

                      Successfully Returned

                    </p>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* =====================================
          RETURN CONFIRMATION POPUP
      ===================================== */}

      <AlertDialog
        open={selectedBorrow !== null}
        onOpenChange={(open) => {
          if (!open && !returning) {
            setSelectedBorrow(null);
          }
        }}
      >

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle className="flex items-center gap-2 text-xl text-[#18392B]">

              <RotateCcw className="h-5 w-5" />

              Return Book?

            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to return{" "}

              <span className="font-semibold">
                {selectedBorrow?.bookTitle}
              </span>

              ?
            </AlertDialogDescription>

          </AlertDialogHeader>

          {/* Error */}
          {returnError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {returnError}
            </p>
          )}

          <AlertDialogFooter>

            <AlertDialogCancel disabled={returning}>
              Cancel
            </AlertDialogCancel>

            <Button
              type="button"
              disabled={returning}
              onClick={handleReturn}
              className="bg-[#18392B] hover:bg-[#245540]"
            >

              {returning ? (

                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                  Returning...
                </>

              ) : (

                <>
                  <RotateCcw className="mr-2 h-4 w-4" />

                  Confirm Return
                </>

              )}

            </Button>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

    </div>
  );
}