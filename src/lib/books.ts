import type { Book } from "@/types/book";

type BooksResult = {
  books: Book[];
  error: string | null;
};

export async function getBooks(): Promise<BooksResult> {
  const apiUrl = (
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000"
  ).replace(/\/+$/, "");

  try {
    const response = await fetch(`${apiUrl}/books`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        books: [],
        error: "Failed to fetch books from server.",
      };
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return {
        books: [],
        error: "Invalid books data received.",
      };
    }

    return {
      books: data as Book[],
      error: null,
    };
  } catch (error) {
    console.error("Fetch Books Error:", error);

    return {
      books: [],
      error: "Unable to connect to the backend server.",
    };
  }
}