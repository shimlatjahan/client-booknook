"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import {
  LogOut,
  UserRound,
  BookPlus,
  LibraryBig,
  BookMarked,
  Loader2,
} from "lucide-react";

// Shadcn Avatar
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

// Shadcn Base UI Dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// User Type
interface UserMenuProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);

  // User Initials
  const initials =
    user.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || "U";

  // Handle Logout
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }

      toast.success("Logged out successfully!");

      // Redirect to Login Page
      router.replace("/login");
      router.refresh();

    } catch (error) {
      console.error("Logout Error:", error);

      toast.error("Something went wrong");

    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>

      {/* PROFILE PICTURE */}

      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open user menu"
            className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#18392B]"
          />
        }
      >
        <Avatar className="h-11 w-11 border-2 border-[#18392B]">

          <AvatarImage
            src={user.image || undefined}
            alt={user.name}
          />

          <AvatarFallback className="bg-[#18392B] font-semibold text-white">
            {initials}
          </AvatarFallback>

        </Avatar>
      </DropdownMenuTrigger>

      {/* DROPDOWN CONTENT */}

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl border border-[#EDE5D8] bg-white p-2 shadow-xl"
      >

        {/* USER INFORMATION */}

        <DropdownMenuGroup>

          <DropdownMenuLabel className="px-3 py-3">

            <p className="truncate text-base font-bold text-[#18392B]">
              {user.name}
            </p>

            <p className="mt-1 truncate text-xs font-normal text-gray-500">
              {user.email}
            </p>

          </DropdownMenuLabel>

        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* NAVIGATION ITEMS */}

        <DropdownMenuGroup>

          {/* MY PROFILE */}

          <DropdownMenuItem
            onClick={() => router.push("/profile")}
            className="cursor-pointer gap-3 rounded-lg px-3 py-2.5"
          >
            <UserRound className="h-4 w-4" />
            My Profile
          </DropdownMenuItem>

          {/* ADD BOOK */}

          <DropdownMenuItem
            onClick={() => router.push("/add-book")}
            className="cursor-pointer gap-3 rounded-lg px-3 py-2.5"
          >
            <BookPlus className="h-4 w-4" />
            Add Book
          </DropdownMenuItem>

         

          <DropdownMenuItem
            onClick={() => router.push("/my-books")}
            className="cursor-pointer gap-3 rounded-lg px-3 py-2.5"
          >
            <LibraryBig className="h-4 w-4" />
            My Books
          </DropdownMenuItem>

          
          <DropdownMenuItem
            onClick={() => router.push("/my-borrows")}
            className="cursor-pointer gap-3 rounded-lg px-3 py-2.5"
          >
            <BookMarked className="h-4 w-4" />
            My Borrows
          </DropdownMenuItem>

        </DropdownMenuGroup>

        <DropdownMenuSeparator />

       

        <DropdownMenuGroup>

          <DropdownMenuItem
            disabled={loggingOut}
            onClick={handleLogout}
            className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-red-600 focus:text-red-600"
          >

            {loggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}

            {loggingOut ? "Logging out..." : "Logout"}

          </DropdownMenuItem>

        </DropdownMenuGroup>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}