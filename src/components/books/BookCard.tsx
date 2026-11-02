import Link from "next/link";
import type { Book } from "@/types/book";
import Image from "next/image";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">

      {/* Book Image */}
      <div className="h-64 overflow-hidden bg-gray-100">
        <Image
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>

     
      <div className="space-y-3 p-5">

        
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          {book.category}
        </span>

        
        <h2 className="text-2xl font-bold text-[#17382c]">
          {book.title}
        </h2>

        <p className="text-sm text-gray-600">
          By {book.author}
        </p>

       
        <p className="line-clamp-3 text-sm text-gray-500">
          {book.description}
        </p>

        
        <div className="flex items-center justify-between border-t pt-4">

          <span className="text-sm text-gray-600">
            Available Copies
          </span>

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-800">
            {book.availableCopies} / {book.totalCopies}
          </span>

        </div>

       
        <Link
          href={`/books/${book._id}`}
          className="flex w-full items-center justify-center rounded-xl bg-[#17382c] px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#245540]"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
}