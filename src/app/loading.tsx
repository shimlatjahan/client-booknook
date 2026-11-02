import { BookOpen, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#FAF8F4] px-4">
      <div className="flex flex-col items-center text-center">

        {/* Book Icon */}
        <div className="mb-6 rounded-2xl bg-[#E8F4EC] p-6">
          <BookOpen
            size={48}
            className="text-[#18392B]"
          />
        </div>

        {/* Loading Spinner */}
        <Loader2
          size={36}
          className="animate-spin text-[#18392B]"
        />

        {/* Loading Text */}
        <h2 className="mt-6 text-2xl font-bold text-[#18392B]">
          Loading BookNook...
        </h2>

        <p className="mt-2 text-gray-500">
          Preparing your reading experience.
        </p>

      </div>
    </main>
  );
}