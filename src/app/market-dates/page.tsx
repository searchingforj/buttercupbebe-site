import type { Metadata } from "next";

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
      { date: "Jan 7-13", show: "Gift" },
      { date: "Jan 19-23", show: "Kidsworld" },
      { date: "Mar 24-27", show: "Kidsworld" },
      { date: "Jun 16-19", show: "Kidsworld" },
      { date: "Jun 24-30", show: "Gift" },
      { date: "Aug 18-21", show: "Kidsworld" },
      { date: "Sep 15-17", show: "Gift" },
      { date: "Oct 20-24", show: "Apparel" },
    ],
  },
  {
    city: "Atlanta",
    events: [
      { date: "Jan 13-19", show: "Gift" },
      { date: "Feb 3-5", show: "Apparel" },
      { date: "Mar 30-Apr 1", show: "Apparel" },
      { date: "Jun 9-15", show: "Gift" },
      { date: "Aug 4-7", show: "Apparel" },
      { date: "Oct 6-9", show: "Apparel" },
    ],
  },
  {
    city: "Nashville",
    events: [
      { date: "Mar 13-15", show: "Dixie Children's Show" },
      { date: "Aug 14-16", show: "Dixie Children's Show" },
    ],
  },
];

export default function MarketDatesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div className="space-y-4">
          <p className="eyebrow">2026 Market Dates</p>
          <h1 className="font-display text-6xl leading-[0.92] text-[var(--night)] sm:text-7xl">Plan buying windows before market gets crowded.</h1>
        </div>
        <div className="panel px-5 py-5 text-sm leading-7 text-[var(--ink-muted)] sm:px-6">
          Dallas and Atlanta are permanent showrooms. Nashville dates support seasonal planning with Dixie Children&apos;s
          Show appointments.
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {marketDates.map((market) => (
          <article key={market.city} className="panel overflow-hidden">
            <div className="border-b border-[var(--line)] bg-[rgba(255,255,255,0.65)] px-5 py-5 sm:px-6">
              <h2 className="font-display text-5xl leading-none text-[var(--night)]">{market.city.toUpperCase()}</h2>
            </div>
            <ul className="space-y-3 px-5 py-5 sm:px-6">
              {market.events.map((event) => (
                <li key={`${market.city}-${event.date}`} className="flex items-start justify-between gap-4 text-sm">
                  <span className="font-semibold text-[var(--ink)]">{event.date}</span>
                  <span className="text-right text-[var(--ink-muted)]">{event.show}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[1.7rem] border border-[rgba(248,241,228,0.22)] bg-[var(--night)] p-7 text-center sm:p-9">
        <p className="mb-5 text-sm text-[rgba(248,241,228,0.82)]">Reserve your market appointment now for a focused line review.</p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-[rgba(248,241,228,0.78)] px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--panel)] transition hover:bg-[var(--panel)] hover:text-[var(--night)]"
        >
          Book Market Appointment
        </a>
      </div>
    </section>
  );
}
