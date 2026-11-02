"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BookPlus, Loader2 } from "lucide-react";

// Props Type
interface AddBookFormProps {
  name: string;
  email: string;
}

// Book Categories
const categories = [
  { label: "Fiction", value: "Fiction" },
  { label: "Science", value: "Science" },
  { label: "History", value: "History" },
  { label: "Kids", value: "Kids" },
  { label: "Others", value: "Others" },
];

export default function AddBookForm({
  name,
  email,
}: AddBookFormProps) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  // Handle Add Book
  const handleAddBook = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Get Form Values
    const title = String(
      formData.get("title") || ""
    ).trim();

    const author = String(
      formData.get("author") || ""
    ).trim();

    const image = String(
      formData.get("image") || ""
    ).trim();

    const description = String(
      formData.get("description") || ""
    ).trim();

    const totalCopies = Number(
      formData.get("totalCopies")
    );

    // Form Validation
    if (!title || !author || !image || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!category) {
      toast.error("Please select a book category");
      return;
    }

    if (
      !Number.isInteger(totalCopies) ||
      totalCopies < 1
    ) {
      toast.error("Enter a valid number of copies");
      return;
    }

    // Check Backend API URL
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL?.trim();

    if (!apiUrl) {
      toast.error(
        "Backend API URL is missing in .env.local"
      );
      return;
    }

    try {
      setLoading(true);

      // STEP 1: Get JWT Token
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error(
          "Authentication failed. Please login again."
        );
        return;
      }

      // STEP 2: Prepare Book Data
      const bookData = {
        title,
        author,
        category,
        image,
        description,
        totalCopies,
      };

      // STEP 3: Send Data to Express Backend
      const response = await fetch(
        `${apiUrl.replace(/\/+$/, "")}/books`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },

          body: JSON.stringify(bookData),
        }
      );

      // STEP 4: Check Response Content Type
      const contentType =
        response.headers.get("content-type") || "";

      let result: { message?: string } | null = null;

      if (contentType.includes("application/json")) {
        try {
          result = await response.json();
        } catch {
          console.error("Invalid JSON response");
        }
      } else {
        const responseText = await response.text();

        console.error(
          "Unexpected server response:",
          response.status,
          responseText.slice(0, 300)
        );
      }

      // STEP 5: Handle API Errors
      if (!response.ok) {
        toast.error(
          result?.message ||
            `Failed to add book (HTTP ${response.status})`
        );
        return;
      }

      // STEP 6: Success Message
      toast.success("Book added successfully!");

      // STEP 7: Reset Form
      form.reset();
      setCategory("");

    } catch (error) {
      console.error("Add Book Error:", error);

      toast.error(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] bg-[#FAF8F4] px-4 py-16">
      <div className="mx-auto max-w-3xl">

        <Card className="rounded-3xl border-[#EDE5D8] bg-white shadow-lg">

          {/* HEADER */}

          <CardHeader className="space-y-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18392B] text-white">
              <BookPlus size={28} />
            </div>

            <CardTitle className="text-3xl font-bold text-[#18392B]">
              Add New Book
            </CardTitle>

            <CardDescription>
              Add a new book to the BookNook library.
            </CardDescription>

          </CardHeader>

          <CardContent>

            <form
              onSubmit={handleAddBook}
              className="space-y-6"
            >

              {/* BOOK TITLE */}

              <div className="space-y-2">

                <Label htmlFor="title">
                  Book Title
                </Label>

                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter book title"
                  required
                  className="h-12 rounded-xl"
                />

              </div>

              {/* AUTHOR NAME */}

              <div className="space-y-2">

                <Label htmlFor="author">
                  Author Name
                </Label>

                <Input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Enter author name"
                  required
                  className="h-12 rounded-xl"
                />

              </div>

              {/* CATEGORY */}

              <div className="space-y-2">

                <Label>
                  Book Category
                </Label>

                <Select
                  items={categories}
                  value={category}
                  onValueChange={(value) =>
                    setCategory(value ?? "")
                  }
                >

                  <SelectTrigger className="h-12 w-full rounded-xl">

                    <SelectValue placeholder="Select a category" />

                  </SelectTrigger>

                  <SelectContent>

                    <SelectGroup>

                      {categories.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </SelectItem>
                      ))}

                    </SelectGroup>

                  </SelectContent>

                </Select>

              </div>

              {/* BOOK COVER IMAGE */}

              <div className="space-y-2">

                <Label htmlFor="image">
                  Book Cover Image URL
                </Label>

                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/book-cover.jpg"
                  required
                  className="h-12 rounded-xl"
                />

                <p className="text-xs text-gray-500">
                  Upload your image to ImgBB or Postimages
                  and paste the direct image URL.
                </p>

              </div>

              {/* DESCRIPTION */}

              <div className="space-y-2">

                <Label htmlFor="description">
                  Book Description
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write a short description about the book..."
                  required
                  rows={5}
                  className="rounded-xl"
                />

              </div>

              

              <div className="space-y-2">

                <Label htmlFor="totalCopies">
                  Total Copies
                </Label>

                <Input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min={1}
                  step={1}
                  placeholder="Enter number of copies"
                  required
                  className="h-12 rounded-xl"
                />

              </div>

              

              <div className="grid gap-5 sm:grid-cols-2">

              

                <div className="space-y-2">

                  <Label htmlFor="addedByName">
                    Added By Name
                  </Label>

                  <Input
                    id="addedByName"
                    value={name}
                    readOnly
                    className="h-12 rounded-xl bg-gray-100"
                  />

                </div>

                {/* ADDED BY EMAIL */}

                <div className="space-y-2">

                  <Label htmlFor="addedByEmail">
                    Added By Email
                  </Label>

                  <Input
                    id="addedByEmail"
                    value={email}
                    readOnly
                    className="h-12 rounded-xl bg-gray-100"
                  />

                </div>

              </div>

              {/* SUBMIT BUTTON */}

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full cursor-pointer rounded-xl bg-[#18392B] font-semibold text-white hover:bg-[#28533F] disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding Book...
                  </>
                ) : (
                  <>
                    <BookPlus className="h-4 w-4" />
                    Add Book
                  </>
                )}

              </Button>

            </form>

          </CardContent>

        </Card>

      </div>
    </section>
  );
}