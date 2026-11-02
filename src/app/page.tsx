import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

import HeroSlider from "@/components/home/HeroSlider";

import NewArrivals from "@/components/home/NewArrivals";

import HowItWorks from "@/components/home/HowItWorks";

import TopCategories from "@/components/home/TopCategories";

import Container from "@/components/shared/Container";

export default function HomePage() {
  return (
    <main className="min-h-screen">

      {/* 1. HERO BANNER */}

      <HeroSlider />

      {/* 2. NEW ARRIVALS */}

      <NewArrivals />

      {/* 3. HOW BORROWING WORKS */}

      <HowItWorks />

      {/* 4. POPULAR CATEGORIES */}

      <TopCategories />

      {/* 5. CALL TO ACTION */}

      <section className="bg-[#FAF8F4] py-16 md:py-20">

        <Container>

          <div className="relative overflow-hidden rounded-3xl bg-[#18392B] px-8 py-16 text-center md:px-16 md:py-20">

            {/* DECORATIVE ICON */}

            <div className="absolute -right-10 -top-10 opacity-10">

              <BookOpen
                size={250}
                className="text-white"
              />

            </div>

            <div className="relative z-10">

              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D9A85F]">
                Your Reading Adventure
              </span>

              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight text-white md:text-5xl">
                Every Great Story Begins With a Book.
              </h2>

              <p className="mx-auto mt-6 max-w-xl leading-8 text-gray-300">
                Explore our growing collection and discover
                your next favorite story with BookNook.
              </p>

              <Link
                href="/books"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#D9A85F] px-8 py-4 font-semibold text-[#18392B] transition-all hover:bg-[#E8BA75]"
              >

                Explore All Books

                <ArrowRight size={19} />

              </Link>

            </div>

          </div>

        </Container>

      </section>

    </main>
  );
}