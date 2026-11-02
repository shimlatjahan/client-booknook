import {
  Search,
  BookOpenCheck,
  RotateCcw,
} from "lucide-react";

import Container from "@/components/shared/Container";

const steps = [
  {
    id: 1,
    icon: Search,
    number: "01",
    title: "Explore Books",
    description:
      "Browse our book collection and discover your next favorite read.",
  },
  {
    id: 2,
    icon: BookOpenCheck,
    number: "02",
    title: "Borrow a Book",
    description:
      "Choose your favorite book and borrow it with a few simple clicks.",
  },
  {
    id: 3,
    icon: RotateCcw,
    number: "03",
    title: "Return Easily",
    description:
      "Manage your borrowed books and return them when you're finished.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#FAF8F4] py-20 md:py-24">

      <Container>

        

        <div className="mb-14 text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B68B52]">
            Simple & Easy
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#18392B] md:text-4xl">
            How Borrowing Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Your next great read is just three simple steps away.
          </p>

        </div>

      

        <div className="grid gap-8 md:grid-cols-3">

          {steps.map((step) => {

            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative rounded-3xl border border-[#EDE5D8] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >

                <span className="absolute right-6 top-5 text-5xl font-bold text-[#18392B]/10">
                  {step.number}
                </span>

                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E8EFE7]">

                  <Icon
                    size={34}
                    className="text-[#18392B]"
                  />

                </div>

                <h3 className="mb-4 text-xl font-semibold text-[#18392B]">
                  {step.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </Container>

    </section>
  );
}