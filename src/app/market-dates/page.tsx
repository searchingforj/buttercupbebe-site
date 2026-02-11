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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="max-w-2xl space-y-4">
        <p className="section-eyebrow">2026 Market Dates</p>
        <h1 className="font-display text-5xl text-[var(--ink-strong)] sm:text-6xl">Plan your buying calendar.</h1>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {marketDates.map((market) => (
          <article
            key={market.city}
            className="rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.72)] p-6"
          >
            <h2 className="font-display text-4xl text-[var(--ink-strong)]">{market.city.toUpperCase()}</h2>
            <ul className="mt-4 space-y-3">
              {market.events.map((event) => (
                <li key={`${market.city}-${event.date}`} className="flex items-start justify-between gap-4 text-sm">
                  <span className="font-medium text-[var(--ink-strong)]">{event.date}</span>
                  <span className="text-right text-[var(--ink-muted)]">{event.show}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-strong)] p-6 text-center sm:p-8">
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
