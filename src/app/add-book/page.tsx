import type { Metadata } from "next";



import { requireAuth } from "@/lib/require-auth";

import AddBookForm from "@/components/books/add-book/AddBookForm";

export const metadata: Metadata = {
  title: "Add Book | BookNook",
  description: "Add a new book to BookNook.",
};

export default async function AddBookPage() {
  // Verify User Session
  const session = await requireAuth("/add-book");

  return (
    <AddBookForm
      name={session.user.name}
      email={session.user.email}
    />
  );
}