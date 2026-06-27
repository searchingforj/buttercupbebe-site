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
  address: string;
  shortAddress: string;
  events: MarketEvent[];
};

const marketDates: MarketCity[] = [
  {
    city: "Dallas",
    address: "Dallas Market Center, #8404",
    shortAddress: "DMC #8404",
    events: [
      { date: "Jun 24-30", show: "Kidsworld + Gift" },
      { date: "Aug 18-21", show: "Apparel + Kidsworld" },
      { date: "Sep 15-17", show: "Gift + Kidsworld" },
      { date: "Oct 20-23", show: "Apparel" },
    ],
  },
  {
    city: "Atlanta",
    address: "AmericasMart Atlanta, Building 3 #13S346B",
    shortAddress: "Building 3 #13S346B",
    events: [
      { date: "Aug 3-6", show: "Apparel" },
      { date: "Oct 6-9", show: "Apparel" },
    ],
  },
  {
    city: "Nashville",
    address: "Tennessee State Fairgrounds, 401 Wingrove St",
    shortAddress: "Tennessee State Fairgrounds",
    events: [
      { date: "Aug 14-15", show: "Dixie Children's Show" },
    ],
  },
  {
    city: "Lafayette, LA",
    address: "CAJUNDOME Convention Center, 444 Cajundome Blvd",
    shortAddress: "CAJUNDOME Convention Center",
    events: [
      { date: "Aug 9-10", show: "Lafayette Show" },
    ],
  },
];

export default function MarketDatesPage() {
  const featuredMarket = marketDates[0];
  const upcomingMarkets = marketDates.slice(1);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pb-20 lg:pt-12">
      <div className="overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface)] shadow-[0_24px_70px_rgba(37,31,24,0.09)]">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
          <div className="flex min-h-[360px] flex-col justify-between bg-[var(--ink-strong)] px-5 py-7 text-white sm:px-8 sm:py-9 lg:px-10 lg:py-11">
            <div className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/62">2026 Market Dates</p>
              <div className="space-y-4">
                <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                  Plan your buying calendar.
                </h1>
                <p className="max-w-md text-sm leading-7 text-white/74 sm:text-base">
                  A clearer view of where we will be, when to shop, and how to book focused time with the showroom.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-3xl font-semibold">{marketDates.length}</p>
                <p className="mt-1 text-white/62">market cities</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-3xl font-semibold">
                  {marketDates.reduce((total, market) => total + market.events.length, 0)}
                </p>
                <p className="mt-1 text-white/62">show windows</p>
              </div>
            </div>
          </div>

          <div className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f0ea_100%)] p-4 sm:p-6 lg:p-8">
            <div className="grid h-full gap-4">
              <article className="rounded-[22px] border border-[var(--border-soft)] bg-white p-5 shadow-[0_18px_45px_rgba(37,31,24,0.08)] sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="section-eyebrow">Dallas showroom</p>
                    <h2 className="mt-2 font-display text-4xl leading-none text-[var(--ink-strong)] sm:text-5xl">
                      {featuredMarket.city}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{featuredMarket.address}</p>
                  </div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles({ variant: "primary", size: "sm", className: "shrink-0" })}
                  >
                    Book Time
                  </a>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {featuredMarket.events.map((event, index) => (
                    <div
                      key={`${featuredMarket.city}-${event.show}-${event.date}`}
                      className={`rounded-2xl border p-4 ${
                        index === 0
                          ? "border-[var(--ink-strong)] bg-[var(--ink-strong)] text-white sm:col-span-2"
                          : "border-[var(--border-soft)] bg-[var(--surface)]"
                      }`}
                    >
                      <p
                        className={`text-xs font-bold uppercase tracking-[0.16em] ${
                          index === 0 ? "text-white/58" : "text-[var(--ink-muted)]"
                        }`}
                      >
                        {event.show}
                      </p>
                      <p className="mt-2 text-2xl font-semibold leading-none sm:text-3xl">{event.date}</p>
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid gap-4 md:grid-cols-3">
                {upcomingMarkets.map((market) => (
                  <article
                    key={market.city}
                    className="flex min-h-[190px] flex-col justify-between rounded-[22px] border border-[var(--border-soft)] bg-white p-5 shadow-[0_14px_35px_rgba(37,31,24,0.06)]"
                  >
                    <div>
                      <h2 className="font-display text-3xl leading-none text-[var(--ink-strong)]">
                        {market.city}
                      </h2>
                      <p className="mt-2 text-xs leading-5 text-[var(--ink-muted)]">{market.address}</p>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {market.events.map((event) => (
                        <li key={`${market.city}-${event.show}-${event.date}`} className="space-y-1">
                          <div className="inline-flex rounded-full bg-[var(--surface-strong)] px-3 py-1 text-sm font-semibold text-[var(--ink-strong)]">
                            {event.date}
                          </div>
                          <p className="text-sm leading-5 text-[var(--ink-muted)]">{event.show}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-3 lg:grid-cols-4">
        {marketDates.map((market) => (
          <div
            key={`${market.city}-summary`}
            className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-sm shadow-[0_10px_28px_rgba(37,31,24,0.05)]"
          >
            <div>
              <p className="font-semibold text-[var(--ink-strong)]">{market.city}</p>
              <p className="text-xs leading-5 text-[var(--ink-muted)]">{market.shortAddress}</p>
            </div>
            <p className="shrink-0 text-xs font-semibold uppercase text-[var(--accent-strong)]">
              {market.events.length} {market.events.length === 1 ? "show" : "shows"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
