"use client";

import { useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  BookOpen,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import UserMenu from "@/components/layout/UserMenu";

export default function Navbar() {
  const pathname = usePathname();

  const { data: session, isPending } =
    authClient.useSession();

  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;

  // Public Navigation
  const publicLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "All Books",
      href: "/books",
    },
  ];

  // Private Navigation
  const privateLinks = [
    {
      label: "Add Book",
      href: "/add-book",
    },
    {
      label: "My Books",
      href: "/my-books",
    },
    {
      label: "My Borrows",
      href: "/my-borrows",
    },
  ];

  const navLinks = [
    ...publicLinks,
    ...(user ? privateLinks : []),
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#EDE5D8] bg-[#FAF8F4]">

      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">

        {/* LOGO */}

        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18392B] text-white">
            <BookOpen size={29} strokeWidth={2} />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold leading-tight text-[#18392B] sm:text-3xl">
              BookNook
            </h1>

            <p className="mt-1 hidden text-[10px] font-semibold tracking-[0.2em] text-[#B78043] sm:block">
              YOUR READING CORNER
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap font-medium transition-colors hover:text-[#18392B] ${
                isActive(link.href)
                  ? "text-[#18392B]"
                  : "text-[#475569]"
              }`}
            >
              {link.label}
            </Link>
          ))}

        </nav>

        {/* DESKTOP AUTH AREA */}

        <div className="ml-auto hidden shrink-0 items-center gap-4 lg:flex">

          {isPending ? (
            <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link
                href="/login"
                className="font-semibold text-[#18392B] transition hover:opacity-70"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 rounded-full bg-[#18392B] px-6 py-3 font-semibold text-white transition hover:bg-[#28533F]"
              >
                Register
                <ArrowRight size={18} />
              </Link>
            </>
          )}

        </div>

        

        <div className="flex items-center gap-3 lg:hidden">

          {!isPending && user && (
            <UserMenu user={user} />
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#EDE5D8] text-[#18392B]"
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>

      </div>

      {/* MOBILE MENU CONTENT */}

      {mobileOpen && (
        <nav className="border-t border-[#EDE5D8] bg-[#FAF8F4] px-5 py-5 lg:hidden">

          <div className="flex flex-col gap-2">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 font-medium transition ${
                  isActive(link.href)
                    ? "bg-[#18392B] text-white"
                    : "text-[#18392B] hover:bg-[#EDE5D8]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {!isPending && !user && (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 font-medium text-[#18392B] hover:bg-[#EDE5D8]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-[#18392B] px-4 py-3 text-center font-semibold text-white"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </nav>
      )}

    </header>
  );
}