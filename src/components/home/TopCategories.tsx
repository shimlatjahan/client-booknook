import Link from "next/link";

import {
  BookOpen,
  FlaskConical,
  Landmark,
  Baby,
  ArrowUpRight,
} from "lucide-react";

import Container from "@/components/shared/Container";

const categories = [
  {
    id: 1,
    name: "Fiction",
    description: "Stories that spark imagination",
    icon: BookOpen,
    color: "bg-[#E8EFE7]",
  },
  {
    id: 2,
    name: "Science",
    description: "Explore knowledge and discovery",
    icon: FlaskConical,
    color: "bg-[#E8EEF5]",
  },
  {
    id: 3,
    name: "History",
    description: "Discover stories from the past",
    icon: Landmark,
    color: "bg-[#F5EBDD]",
  },
  {
    id: 4,
    name: "Kids",
    description: "Fun adventures for young readers",
    icon: Baby,
    color: "bg-[#F4E8EE]",
  },
];

export default function TopCategories() {
  return (
    <section className="bg-white py-20 md:py-24">

      <Container>

        {/* HEADER */}

        <div className="mb-12 text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B68B52]">
            Find Your Interest
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#18392B] md:text-4xl">
            Explore Popular Categories
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Whatever you love reading, there is a book
            waiting for you.
          </p>

        </div>

        {/* CATEGORY CARDS */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {

            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={`/books?category=${category.name}`}
                className={`group relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${category.color}`}
              >

                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80">

                  <Icon
                    size={30}
                    className="text-[#18392B]"
                  />

                </div>

                <h3 className="text-2xl font-bold text-[#18392B]">
                  {category.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>

                <ArrowUpRight
                  size={22}
                  className="absolute right-7 top-8 text-[#18392B] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </Link>
            );
          })}

        </div>

      </Container>

    </section>
  );
}