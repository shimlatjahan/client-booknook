import type { Metadata } from "next";

import BookCard from "@/components/books/BookCard";
import { getBooks } from "@/lib/books";

export const metadata: Metadata = {
  title: "All Books | BookNook",
  description: "Explore all books available at BookNook.",
};

export default async function AllBooksPage() {
  const { books, error } = await getBooks();

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

       
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#17382c] md:text-5xl">
            Explore All Books
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Discover your next favorite book.
          </p>

          {!error && (
            <p className="mt-3 text-sm text-gray-500">
              Total Books: {books.length}
            </p>
          )}
        </div>

       
        {error ? (
          <div className="rounded-xl bg-red-50 p-8 text-center text-red-600">
            {error}
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-[#17382c]">
              No Books Available
            </h2>

            <p className="mt-3 text-gray-500">
              Books will appear here once they are added.
            </p>
          </div>
        ) : (
          /* Book Cards */
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}