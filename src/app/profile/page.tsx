import type { Metadata } from "next";

import { requireAuth } from "@/lib/require-auth";

export const metadata: Metadata = {
  title: "My Profile | BookNook",
};

export default async function ProfilePage() {
  const session = await requireAuth("/profile");

  const user = session.user;

  return (
    <section className="min-h-[70vh] bg-[#FAF8F4] px-4 py-16">

      <div className="mx-auto max-w-3xl">

        <h1 className="mb-8 text-4xl font-bold text-[#18392B]">
          My Profile
        </h1>

        <div className="rounded-3xl border border-[#EDE5D8] bg-white p-8 shadow-sm">

          <div className="space-y-6">

            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <h2 className="mt-2 text-xl font-bold text-[#18392B]">
                {user.name}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email Address
              </p>

              <p className="mt-2 font-medium text-gray-800">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email Verification
              </p>

              <p className="mt-2 font-medium text-gray-800">
                {user.emailVerified
                  ? "Verified"
                  : "Not Verified"}
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}