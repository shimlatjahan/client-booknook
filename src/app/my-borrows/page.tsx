import type { Metadata } from "next";

import { requireAuth } from "@/lib/require-auth";

import MyBorrowsClient from "@/components/books/my-borrows/MyBorrowsClient";

export const metadata: Metadata = {
  title: "My Borrows | BookNook",
  description: "View and manage your borrowed books.",
};

export default async function MyBorrowsPage() {
  // Check logged-in user
  const session = await requireAuth("/my-borrows");

  return (
    <section className="min-h-[70vh] bg-[#FAF8F4] px-4 py-16">

      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-[#18392B]">
            My Borrows
          </h1>

          <p className="mt-4 text-gray-600">
            Welcome, {session.user.name}!
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Manage your borrowed books and return them anytime.
          </p>

        </div>

        {/* Dynamic Borrowed Books */}
        <MyBorrowsClient />

      </div>

    </section>
  );
}