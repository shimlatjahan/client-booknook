import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

import {
  Mail,
  ArrowRight,
  BookOpen,
} from "lucide-react";

import Container from "@/components/shared/Container";

// Social Media Links
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com",
    icon: FaInstagram,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: FaGithub,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#18392B] text-white">
      <Container>

        {/* FOOTER MAIN */}

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

          {/* WEBSITE INFORMATION */}

          <div className="lg:col-span-2">

            {/* LOGO */}

            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D9A85F] text-[#18392B]">
                <BookOpen size={27} />
              </span>

              <span className="text-3xl font-bold">
                BookNook
              </span>
            </Link>

           
            <p className="max-w-sm leading-8 text-gray-300">
              Your cozy online library where stories come alive.
              Discover amazing books, explore new ideas,
              and enjoy a simple borrowing experience.
            </p>

           
            <div className="mt-8 flex items-center gap-4">

              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#D9A85F] hover:text-[#18392B] hover:shadow-lg"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}

            </div>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                href="/"
                className="text-gray-300 transition-colors hover:text-[#D9A85F]"
              >
                Home
              </Link>

              <Link
                href="/books"
                className="text-gray-300 transition-colors hover:text-[#D9A85F]"
              >
                All Books
              </Link>

              <Link
                href="/login"
                className="text-gray-300 transition-colors hover:text-[#D9A85F]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-gray-300 transition-colors hover:text-[#D9A85F]"
              >
                Register
              </Link>

            </div>

          </div>

          
          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Get In Touch
            </h3>

            <p className="mb-6 leading-7 text-gray-300">
              Have questions or suggestions?
              We would love to hear from you.
            </p>

            <a
              href="mailto:contact@booknook.example"
              className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-[#D9A85F]"
            >
              <Mail
                size={19}
                className="shrink-0 text-[#D9A85F]"
              />

              contact@booknook.example
            </a>

            <Link
              href="/books"
              className="mt-7 inline-flex items-center gap-2 font-medium text-[#D9A85F] transition-colors hover:text-white"
            >
              Explore Our Library

              <ArrowRight size={17} />
            </Link>

          </div>

        </div>

      

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 py-7 text-center md:flex-row md:text-left">

          <p className="text-sm text-gray-300">
            © 2026 BookNook. All Rights Reserved.
          </p>

          <p className="text-sm text-gray-400">
            Discover • Read • Borrow
          </p>

        </div>

      </Container>
    </footer>
  );
}