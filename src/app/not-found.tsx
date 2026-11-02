import Link from "next/link";
import { BookOpen, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FAF8F4] px-4 py-16">
      <div className="max-w-xl text-center">

        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#E8F4EC]">
          <SearchX className="h-12 w-12 text-[#18392B]" />
        </div>

        <h1 className="text-7xl font-bold text-[#18392B]">
          404
        </h1>

        <h2 className="mt-5 text-3xl font-bold text-[#18392B]">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-600">
          Oops! The page you are looking for doesn't exist.
          Let's get you back to your reading journey.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#18392B] px-6 py-3 font-semibold text-white transition hover:bg-[#245540]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-xl border border-[#18392B] px-6 py-3 font-semibold text-[#18392B] transition hover:bg-[#E8F4EC]"
          >
            <BookOpen className="h-4 w-4" />
            Explore Books
          </Link>

        </div>
      </div>
    </main>
  );
}