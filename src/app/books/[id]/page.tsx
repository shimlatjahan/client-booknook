import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAuth } from "@/lib/require-auth";
import type { Book } from "@/types/book";
import BorrowBookDialog from "@/components/books/my-books/BorrowBookDialog";

export const metadata: Metadata = {
  title: "Book Details | BookNook",
  description: "Explore book details at BookNook.",
};

type BookDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {

  // Get Book ID
  const { id } = await params;

  // Private Route
  await requireAuth(`/books/${id}`);

  // Backend URL
  const apiUrl = (
    process.env.NEXT_PUBLIC_API_URL ||
    "https://server-booknook.vercel.app/"
  ).replace(/\/+$/, "");

  // Fetch Single Book
  let book: Book | null = null;
  let fetchError = false;

  try {
    const res = await fetch(`${apiUrl}/books/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404 || res.status === 400) {
      notFound();
    }

    if (!res.ok) {
      fetchError = true;
    } else {
      book = (await res.json()) as Book;
    }

  } catch (error) {
    // Let Next.js handle notFound() correctly
    if (
      error instanceof Error &&
      error.message === "NEXT_HTTP_ERROR_FALLBACK;404"
    ) {
      throw error;
    }

    console.error("Book Details Error:", error);
    fetchError = true;
  }

  // Error State
  if (fetchError) {
    return (
      <main className="min-h-[70vh] bg-[#faf8f5] px-5 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-red-600">
            Unable to Load Book
          </h2>

          <p className="mt-4 text-gray-600">
            Something went wrong while fetching book details.
          </p>

          <Link
            href="/books"
            className="mt-6 inline-block rounded-xl bg-[#17382c] px-6 py-3 text-white"
          >
            Back to All Books
          </Link>
        </div>
      </main>
    );
  }

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf8f5]">

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

        {/* Back Button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 font-medium text-[#17382c] hover:underline"
        >
          ← Back to All Books
        </Link>

        {/* Details Card */}
        <div className="grid gap-10 rounded-3xl border border-[#e8e2d8] bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

          {/* Book Cover */}
          <div className="flex items-center justify-center rounded-2xl bg-[#f2eee8] p-6">

            <img
              src={book.image}
              alt={book.title}
              className="max-h-[500px] w-full rounded-xl object-contain"
            />

          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <div>
              <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                {book.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-5 text-4xl font-bold text-[#17382c] md:text-5xl">
              {book.title}
            </h1>

            {/* Author */}
            <p className="mt-4 text-lg text-gray-600">
              By{" "}
              <span className="font-semibold text-[#17382c]">
                {book.author}
              </span>
            </p>

            {/* Description */}
            <div className="mt-8">

              <h2 className="text-xl font-bold text-[#17382c]">
                About This Book
              </h2>

              <p className="mt-3 whitespace-pre-line leading-8 text-gray-600">
                {book.description}
              </p>

            </div>

            {/* Availability Information */}
            <div className="mt-8 rounded-2xl border border-[#e8e2d8] bg-[#faf8f5] p-6">

              <h2 className="mb-5 text-xl font-bold text-[#17382c]">
                Book Availability
              </h2>

              <div className="space-y-4">

                {/* Total Copies */}
                <div className="flex justify-between">

                  <span className="text-gray-600">
                    Total Copies
                  </span>

                  <span className="font-semibold text-[#17382c]">
                    {book.totalCopies}
                  </span>

                </div>

                {/* Available Copies */}
                <div className="flex justify-between">

                  <span className="text-gray-600">
                    Available Copies
                  </span>

                  <span className="font-semibold text-[#17382c]">
                    {book.availableCopies}
                  </span>

                </div>

                {/* Status */}
                <div className="flex items-center justify-between border-t pt-4">

                  <span className="text-gray-600">
                    Status
                  </span>

                  {book.availableCopies > 0 ? (

                    <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                      Available
                    </span>

                  ) : (

                    <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-700">
                      Out of Stock
                    </span>

                  )}

                </div>

              </div>

            </div>

            {/* Added By */}
            <div className="mt-6">

              <p className="text-sm text-gray-500">
                Added By:{" "}
                <span className="font-medium text-[#17382c]">
                  {book.addedBy?.name || "BookNook Member"}
                </span>
              </p>

            </div>

            {/* Borrow Button */}
            <div className="mt-8">

              {/* Borrow Book Button */}
<BorrowBookDialog
  bookId={book._id}
  bookTitle={book.title}
  availableCopies={book.availableCopies}
/>

              <p className="mt-3 text-center text-sm text-gray-500">
                Borrow functionality is coming next.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}