"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Pencil, Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { authClient } from "@/lib/auth-client";
import type { Book } from "@/types/book";

type BookDetailsActionsProps = {
  book: Book;
};

type BookForm = {
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: string;
};

const categories = [
  { label: "Fiction", value: "Fiction" },
  { label: "Science", value: "Science" },
  { label: "History", value: "History" },
  { label: "Kids", value: "Kids" },
  { label: "Others", value: "Others" },
];

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://server-booknook.vercel.app/"
).replace(/\/+$/, "");

const getInitialForm = (book: Book): BookForm => ({
  title: book.title,
  author: book.author,
  category: book.category,
  image: book.image,
  description: book.description,
  totalCopies: String(book.totalCopies),
});

export default function BookDetailsActions({
  book,
}: BookDetailsActionsProps) {
  const router = useRouter();

  // Dialog States
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Loading States
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Message States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Edit Form
  const [form, setForm] = useState<BookForm>(
    getInitialForm(book)
  );

  const isBusy = isUpdating || isDeleting;

  // =====================================
  // UPDATE FORM FIELD
  // =====================================

  const updateField = (
    field: keyof BookForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  
  const getToken = async () => {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error(
        "Authentication failed. Please log in again."
      );
    }

    return data.token;
  };

 
  const handleOpenEdit = () => {
    setForm(getInitialForm(book));

    setError("");
    setSuccess("");

    setEditOpen(true);
  };

  

  const handleUpdate = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isBusy) return;

    setIsUpdating(true);
    setError("");

    try {
      const token = await getToken();

      const response = await fetch(
        `${API_URL}/books/${book._id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: form.title.trim(),
            author: form.author.trim(),
            category: form.category,
            image: form.image.trim(),
            description: form.description.trim(),
            totalCopies: Number(form.totalCopies),
          }),
        }
      );

      const result = await response.json().catch(
        () => null
      );

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to update book"
        );
      }

      // Success
      setEditOpen(false);

      setSuccess("Book updated successfully!");

      // Refresh Server Component
      router.refresh();

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  

  const handleDelete = async () => {
    if (isBusy) return;

    setIsDeleting(true);
    setError("");

    try {
      const token = await getToken();

      const response = await fetch(
        `${API_URL}/books/${book._id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json().catch(
        () => null
      );

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to delete book"
        );
      }

      // Close Dialog
      setDeleteOpen(false);

      // Redirect to My Books
      router.replace("/my-books");

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">

      

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        {/* Edit Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleOpenEdit}
          disabled={isBusy}
          className="h-12 border-[#17382c] text-[#17382c] hover:bg-[#e8f4ec]"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Book
        </Button>

        {/* Delete Button */}
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            setError("");
            setDeleteOpen(true);
          }}
          disabled={isBusy}
          className="h-12"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Book
        </Button>

      </div>

      {/* Success Message */}
      {success && (
        <p
          role="status"
          className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {success}
        </p>
      )}

      

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          if (!isUpdating) {
            setEditOpen(open);
          }
        }}
      >

        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">

          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl text-[#17382c]">
              <Pencil className="h-5 w-5" />
              Edit Book
            </DialogTitle>

            <DialogDescription>
              Update your book information below.
            </DialogDescription>
          </DialogHeader>

          {/* Edit Form */}
          <form
            onSubmit={handleUpdate}
            className="space-y-5"
          >

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="edit-title">
                Book Title
              </Label>

              <Input
                id="edit-title"
                required
                value={form.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="edit-author">
                Author
              </Label>

              <Input
                id="edit-author"
                required
                value={form.author}
                onChange={(e) =>
                  updateField("author", e.target.value)
                }
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>

              <Select
                items={categories}
                value={form.category}
                onValueChange={(value) => {
                  if (value) {
                    updateField("category", value);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="edit-image">
                Book Cover URL
              </Label>

              <Input
                id="edit-image"
                type="url"
                required
                value={form.image}
                onChange={(e) =>
                  updateField("image", e.target.value)
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="edit-description">
                Description
              </Label>

              <Textarea
                id="edit-description"
                rows={4}
                required
                value={form.description}
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Total Copies */}
            <div className="space-y-2">
              <Label htmlFor="edit-copies">
                Total Copies
              </Label>

              <Input
                id="edit-copies"
                type="number"
                min={1}
                step={1}
                required
                value={form.totalCopies}
                onChange={(e) =>
                  updateField(
                    "totalCopies",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Dialog Footer */}
            <DialogFooter className="gap-2">

              <Button
                type="button"
                variant="outline"
                disabled={isUpdating}
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-[#17382c] hover:bg-[#245540]"
              >

                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}

              </Button>

            </DialogFooter>

          </form>

        </DialogContent>

      </Dialog>

      {/* =====================================
          DELETE CONFIRMATION DIALOG
      ===================================== */}

      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          if (!isDeleting) {
            setDeleteOpen(open);
          }
        }}
      >

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle className="flex items-center gap-2 text-xl text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Book?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {book.title}
              </span>
              ?
              <br />
              <br />
              This action cannot be undone.
            </AlertDialogDescription>

          </AlertDialogHeader>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <AlertDialogFooter>

            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>

            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >

              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Yes, Delete
                </>
              )}

            </Button>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

    </div>
  );
}