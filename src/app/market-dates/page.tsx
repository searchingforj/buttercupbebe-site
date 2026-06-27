import type { Metadata } from "next";

import { buttonStyles } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Market Dates",
  description: "Buttercup Bebe market schedule for 2026.",
};

type MarketEvent = {
  date: string;
  show: string;
};

type MarketCity = {
  city: string;
  events: MarketEvent[];
};

const marketDates: MarketCity[] = [
  {
    city: "Dallas",
    events: [
      { date: "Jun 24-27", show: "Kidsworld" },
      { date: "Jun 24-30", show: "Gift" },
      { date: "Aug 18-21", show: "Apparel + Kidsworld" },
      { date: "Sep 15-17", show: "Gift + Kidsworld" },
      { date: "Oct 20-23", show: "Apparel" },
    ],
  },
  {
    city: "Atlanta",
    events: [
      { date: "Aug 3-6", show: "Apparel" },
      { date: "Oct 6-9", show: "Apparel" },
    ],
  },
  {
    city: "Nashville",
    events: [
      { date: "Aug 14-16", show: "Dixie Children's Show" },
    ],
  },
];

export default function MarketDatesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-10 lg:pb-20 lg:pt-14">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="section-eyebrow">2026 Market Dates</p>
        <h1 className="font-display text-4xl text-[var(--ink-strong)] sm:text-5xl">Plan your buying calendar.</h1>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
          Confirm dates early so your appointments stay focused, intentional, and easy to navigate in market.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "secondary", size: "sm", className: "mt-1" })}
        >
          Book Appointment
        </a>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {marketDates.map((market) => (
          <article
            key={market.city}
            className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface)] p-4 shadow-[0_14px_35px_rgba(37,31,24,0.06)] sm:p-5"
          >
            <h2 className="text-center font-display text-3xl text-[var(--ink-strong)] sm:text-4xl">
              {market.city}
            </h2>
            <ul className="mt-4 divide-y divide-[var(--border-soft)] rounded-xl border border-[var(--border-soft)] bg-[var(--surface)]">
              {market.events.map((event) => (
                <li
                  key={`${market.city}-${event.show}-${event.date}`}
                  className="grid grid-cols-1 gap-0.5 px-3 py-2.5 text-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-3 sm:px-4 sm:py-3"
                >
                  <span className="font-semibold text-[var(--ink-strong)] sm:text-[0.95rem]">{event.date}</span>
                  <span className="text-[var(--ink-muted)] sm:text-right">{event.show}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-strong)] p-6 text-center sm:p-8">
        <p className="mb-4 text-sm text-[var(--ink-muted)]">
          Reserve your market time in advance for a focused walkthrough.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "primary", size: "lg" })}
        >
          Book Market Appointment
        </a>
      </div>
    </section>
  );
}
