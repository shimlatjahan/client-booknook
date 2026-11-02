"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BookOpen,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import Container from "@/components/shared/Container";

// Public navigation links
const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "All Books",
    href: "/books",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EDE5D8] bg-[#FAF8F4]/95 backdrop-blur-md">

      <Container>

        <div className="flex h-20 items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#18392B] text-white">

              <BookOpen size={25} strokeWidth={2} />

            </div>

            <div className="flex flex-col">

              <span className="text-2xl font-bold tracking-tight text-[#18392B]">
                BookNook
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#B68B52]">
                Your Reading Corner
              </span>

            </div>

          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 lg:flex"
          >

            {navLinks.map((link) => {

              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-[#18392B]"
                      : "text-gray-600 hover:text-[#18392B]"
                  }`}
                >

                  {link.name}

                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#B68B52]" />
                  )}

                </Link>
              );
            })}

          </nav>

          {/* DESKTOP AUTH BUTTONS */}

          <div className="hidden items-center gap-4 lg:flex">

            <Link
              href="/login"
              className="text-sm font-semibold text-[#18392B] transition-colors hover:text-[#B68B52]"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#18392B] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#28533F] hover:shadow-lg"
            >
              Register

              <ArrowRight size={16} />

            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#EDE5D8] text-[#18392B] transition-colors hover:bg-[#EDE5D8] lg:hidden"
          >

            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}

          </button>

        </div>

        {/* MOBILE NAVIGATION */}

        {isMenuOpen && (

          <div
            id="mobile-navigation"
            className="border-t border-[#EDE5D8] pb-6 pt-5 lg:hidden"
          >

            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-2"
            >

              {navLinks.map((link) => {

                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-[#E8EFE7] text-[#18392B]"
                        : "text-gray-600 hover:bg-[#EDE5D8] hover:text-[#18392B]"
                    }`}
                  >

                    {link.name}

                  </Link>
                );
              })}

            </nav>

            {/* MOBILE AUTH BUTTONS */}

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#EDE5D8] pt-5">

              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center justify-center rounded-full border border-[#18392B] px-5 py-3 text-sm font-semibold text-[#18392B] transition-colors hover:bg-[#E8EFE7]"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-full bg-[#18392B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#28533F]"
              >
                Register

                <ArrowRight size={16} />

              </Link>

            </div>

          </div>

        )}

      </Container>

    </header>
  );
}