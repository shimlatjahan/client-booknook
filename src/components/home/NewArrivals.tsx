import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

import Container from "@/components/shared/Container";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image?: string;
  imageUrl?: string;
};

// Temporary preview data.
// Real books will come from MongoDB.

const demoBooks: Book[] = [
  {
    _id: "demo-1",
    title: "The Silent Forest",
    author: "Sample Author",
    category: "Fiction",
  },
  {
    _id: "demo-2",
    title: "Exploring Science",
    author: "Sample Author",
    category: "Science",
  },
  {
    _id: "demo-3",
    title: "Pages of History",
    author: "Sample Author",
    category: "History",
  },
  {
    _id: "demo-4",
    title: "The Little Explorer",
    author: "Sample Author",
    category: "Kids",
  },
  {
    _id: "demo-5",
    title: "Beyond the Stars",
    author: "Sample Author",
    category: "Science",
  },
  {
    _id: "demo-6",
    title: "A Journey Within",
    author: "Sample Author",
    category: "Fiction",
  },
];

const coverColors = [
  "from-[#214E3B] to-[#10271E]",
  "from-[#365A71] to-[#182D43]",
  "from-[#A06E43] to-[#593920]",
  "from-[#946C88] to-[#49384C]",
  "from-[#426B72] to-[#183C43]",
  "from-[#806647] to-[#3F3024]",
];

async function getLatestBooks(): Promise<Book[]> {
  const apiUrl = process.env.API_URL;

  // No backend connection yet.
  if (!apiUrl) return [];

  try {
    const response = await fetch(
      `${apiUrl}/books?sort=latest&limit=6`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) return [];

    const data: unknown = await response.json();

    if (!Array.isArray(data)) return [];

    return data.slice(0, 6) as Book[];

  } catch {
    return [];
  }
}

export default async function NewArrivals() {
  const latestBooks = await getLatestBooks();

  const isPreview = latestBooks.length === 0;

  const books = isPreview
    ? demoBooks
    : latestBooks;

  return (
    <section className="bg-white py-20 md:py-24">

      <Container>

        {/* SECTION HEADER */}

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B68B52]">
              Fresh From Our Library
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#18392B] md:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-4 max-w-xl text-gray-600">
              Discover the latest books added to our library
              and find something exciting to read.
            </p>

            {isPreview && (
              <p className="mt-3 text-sm text-amber-700">
                Demo preview — live books will appear
                after the database is connected.
              </p>
            )}

          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 font-semibold text-[#18392B] hover:text-[#B68B52]"
          >

            See All Books

            <ArrowRight size={18} />

          </Link>

        </div>

        {/* BOOK GRID */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {books.map((book, index) => {

            const bookImage =
              book.imageUrl || book.image;

            return (
              <div
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-[#EDE5D8] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* BOOK COVER */}

                <div className="relative h-[270px] overflow-hidden bg-[#EDE5D8]">

                  {bookImage ? (

                    <Image
                      src={bookImage}
                      alt={`${book.title} book cover`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                  ) : (

                    <div
                      className={`flex h-full flex-col items-center justify-center bg-gradient-to-br ${
                        coverColors[index % coverColors.length]
                      } px-6 text-center text-white`}
                    >

                      <BookOpen
                        size={42}
                        className="mb-6 text-[#E4C38B]"
                      />

                      <h3 className="max-w-[220px] text-2xl font-semibold">
                        {book.title}
                      </h3>

                      <p className="mt-5 text-sm text-white/70">
                        BookNook Library
                      </p>

                    </div>

                  )}

                </div>

                {/* BOOK INFORMATION */}

                <div className="p-6">

                  <span className="rounded-full bg-[#E8EFE7] px-3 py-1 text-xs font-medium text-[#18392B]">
                    {book.category}
                  </span>

                  <h3 className="mt-4 line-clamp-1 text-xl font-semibold text-[#18392B]">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    By {book.author}
                  </p>

                  {isPreview ? (

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-400">
                      Preview Only
                    </span>

                  ) : (

                    <Link
                      href={`/books/${book._id}`}
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-[#18392B] transition-colors hover:text-[#B68B52]"
                    >

                      View Details

                      <ArrowRight size={17} />

                    </Link>

                  )}

                </div>

              </div>
            );
          })}

        </div>

      </Container>

    </section>
  );
}