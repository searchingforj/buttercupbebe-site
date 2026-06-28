import type { Metadata } from "next";

import { buttonStyles } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Market Dates",
  description: "Buttercup Bebe market schedule for 2026.",
};

type MarketEvent = {
  city: string;
  address?: string;
  date: string;
  note?: string;
  show: string;
};

const marketEvents: MarketEvent[] = [
  {
    date: "June 24-30",
    show: "Kidsworld + Gift",
    city: "Dallas, TX",
    address: "Dallas Market Center, Showroom #8404",
  },
  {
    date: "July 26-28",
    show: "Playtime New York",
    city: "New York City, NY",
    address: "Metropolitan Pavilion",
    note: "(Courtside Kids only)",
  },
  {
    date: "August 3-6",
    show: "Apparel",
    city: "Atlanta, GA",
    address: "AmericasMart Atlanta, Building 3, Showroom #13S346B",
  },
  {
    date: "August 9-10",
    show: "Lafayette Show",
    city: "Lafayette, LA",
    address: "CAJUNDOME Convention Center",
  },
  {
    date: "August 14-15",
    show: "Dixie Children's Show",
    city: "Nashville, TN",
    address: "Tennessee State Fairgrounds",
  },
  {
    date: "August 18-21",
    show: "Apparel + Kidsworld",
    city: "Dallas, TX",
    address: "Dallas Market Center, Showroom #8404",
  },
  {
    date: "September 15-17",
    show: "Gift + Kidsworld",
    city: "Dallas, TX",
    address: "Dallas Market Center, Showroom #8404",
  },
  {
    date: "October 6-9",
    show: "Apparel",
    city: "Atlanta, GA",
    address: "AmericasMart Atlanta, Building 3, Showroom #13S346B",
  },
  {
    date: "October 20-23",
    show: "Apparel",
    city: "Dallas, TX",
    address: "Dallas Market Center, Showroom #8404",
  },
];

export default function MarketDatesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-10 lg:pb-20 lg:pt-14">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="section-eyebrow">2026 Market Dates</p>
        <h1 className="font-display text-4xl text-[var(--ink-strong)] sm:text-5xl">Plan your buying calendar.</h1>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "secondary", size: "sm", className: "mt-1" })}
        >
          Book Appointment
        </a>
      </div>

      <div className="mt-12 overflow-hidden rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface)] shadow-[0_18px_42px_rgba(37,31,24,0.08)]">
        <ol className="divide-y divide-[var(--border-soft)]">
          {marketEvents.map((event) => (
            <li
              key={`${event.city}-${event.show}-${event.date}`}
              className="grid gap-4 px-4 py-5 sm:grid-cols-[10rem_minmax(0,1fr)_minmax(12rem,0.75fr)] sm:items-center sm:px-6"
            >
              <div className="inline-flex w-fit rounded-full bg-[var(--surface-strong)] px-3 py-1.5 text-sm font-semibold text-[var(--ink-strong)]">
                {event.date}
              </div>
              <div>
                <h2 className="font-display text-3xl leading-none text-[var(--ink-strong)]">
                  {event.city}
                  {event.note ? (
                    <span className="ml-2 align-middle font-sans text-xs font-semibold text-[var(--ink-muted)] sm:text-sm">
                      {event.note}
                    </span>
                  ) : null}
                </h2>
                {event.address ? (
                  <p className="mt-1 text-xs leading-5 text-[var(--ink-muted)] sm:text-sm">{event.address}</p>
                ) : null}
              </div>
              <div className="text-sm sm:text-right sm:text-base">
                <p className="font-semibold text-[var(--ink-strong)]">{event.show}</p>
              </div>
            </li>
          ))}
        </ol>
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
