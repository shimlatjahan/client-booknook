import type { Metadata } from "next";
import Link from "next/link";

import BookCard from "@/components/books/BookCard";
import MyBookActions from "@/components/books/my-books/MyBookActions";

import { requireAuth } from "@/lib/require-auth";
import { getBooks } from "@/lib/books";

export const metadata: Metadata = {
  title: "My Books | BookNook",
  description: "View and manage your added books.",
};

export default async function MyBooksPage() {

  // =====================================
  // GET LOGGED-IN USER
  // =====================================

  const session = await requireAuth("/my-books");

  const user = session.user;

  // =====================================
  // FETCH BOOKS FROM BACKEND
  // =====================================

  const { books, error } = await getBooks();

  // =====================================
  // FILTER USER'S BOOKS
  // =====================================

  const userEmail = user.email.trim().toLowerCase();

  const myBooks = books.filter((book) => {
    const ownerEmail =
      book.addedBy?.email?.trim().toLowerCase();

    return ownerEmail === userEmail;
  });

  return (
    <main className="min-h-[75vh] bg-[#faf8f5]">

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">

        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-4xl font-bold text-[#17382c] md:text-5xl">
              My Books
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Welcome, {user.name}!
            </p>

            {!error && (
              <p className="mt-2 text-sm text-gray-500">
                You have added {myBooks.length} book(s).
              </p>
            )}
          </div>

          {/* Add Book Button */}
          <Link
            href="/add-book"
            className="inline-flex items-center justify-center rounded-xl bg-[#17382c] px-6 py-3 font-medium text-white transition hover:bg-[#245540]"
          >
            + Add New Book
          </Link>

        </div>

        {/* =====================================
            ERROR STATE
        ===================================== */}

        {error ? (

          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
            <h2 className="text-xl font-semibold">
              Something went wrong!
            </h2>

            <p className="mt-3">
              {error}
            </p>
          </div>

        ) : myBooks.length === 0 ? (

          /* =====================================
              EMPTY STATE
          ===================================== */

          <div className="rounded-2xl border border-[#e8e2d8] bg-white px-6 py-16 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-[#17382c]">
              No Books Added Yet
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-600">
              You haven't added any books yet.
              Start building your collection by adding your first book.
            </p>

            <Link
              href="/add-book"
              className="mt-6 inline-flex rounded-xl bg-[#17382c] px-6 py-3 font-medium text-white transition hover:bg-[#245540]"
            >
              Add Your First Book
            </Link>

          </div>

        ) : (

          /* =====================================
              MY BOOKS GRID
          ===================================== */

          <div className="grid grid-cols-1 items-start gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {myBooks.map((book) => (

              <div
                key={book._id}
                className="space-y-3"
              >

                {/* Reusable Book Card */}
                <BookCard book={book} />

                {/* Edit & Delete Buttons */}
                <MyBookActions book={book} />

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}