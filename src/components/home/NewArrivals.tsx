"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ArrowRight, BookOpen, Loader2 } from "lucide-react";

import BookCard from "@/components/books/BookCard";
import type { Book } from "@/types/book";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000"
).replace(/\/+$/, "");

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // FETCH LATEST 6 BOOKS
  // =====================================

  useEffect(() => {
    const controller = new AbortController();

    const fetchLatestBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/books?limit=6`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load latest books");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid book data received");
        }

        if (!controller.signal.aborted) {
          setBooks(data as Book[]);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchLatestBooks();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section className="bg-[#FAF8F4] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADER */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B7773C]">
              Discover Something New
            </p>

            <h2 className="text-3xl font-bold text-[#18392B] md:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-3 text-gray-600">
              Explore the latest books added to our library.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 font-semibold text-[#18392B] transition hover:text-[#B7773C]"
          >
            View All Books
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* LOADING STATE */}

        {loading && (
          <div
            role="status"
            className="flex min-h-64 items-center justify-center gap-3"
          >
            <Loader2 className="h-7 w-7 animate-spin text-[#18392B]" />

            <span className="text-gray-600">
              Loading latest books...
            </span>
          </div>
        )}

        {/* ERROR STATE */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-medium text-red-600">
              {error}
            </p>
          </div>
        )}

        

        {!loading && !error && books.length === 0 && (
          <div className="rounded-2xl border border-[#EDE5D8] bg-white p-12 text-center shadow-sm">
            <BookOpen className="mx-auto h-12 w-12 text-[#18392B]" />

            <h3 className="mt-5 text-2xl font-bold text-[#18392B]">
              No Books Available
            </h3>

            <p className="mt-3 text-gray-600">
              New books will appear here once they are added.
            </p>
          </div>
        )}

       

        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
              />
            ))}
          </div>
        )}

       
        {!loading && !error && books.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/books"
              className="inline-flex items-center gap-3 rounded-xl bg-[#18392B] px-8 py-4 font-semibold text-white transition hover:bg-[#245540]"
            >
              Explore All Books
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}