import type { Metadata } from "next";

import { BookingExperience } from "@/components/booking-experience";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Reserve a market appointment or virtual showroom walkthrough with Buttercup Bebe.",
};

export default function BookingPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-6 lg:px-10 lg:pb-20 lg:pt-6">
        <div className="mb-4 space-y-2">
          <h1 className="font-display text-[2rem] leading-[1.08] text-[var(--ink-strong)] sm:text-5xl">
            Find your next favorites.
          </h1>
          <p className="text-sm leading-6 text-[var(--ink-muted)]">
            Book a market or virtual appointment.
          </p>
        </div>
        <BookingExperience />
      </div>
    </section>
  );
}
