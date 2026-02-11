import Link from "next/link";

import { BOOKING_URL } from "@/lib/constants";

const navItems = [
  { label: "Brands", href: "/#brands-section" },
  { label: "Market Dates", href: "/market-dates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(245,236,223,0.86)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Buttercup Bebe home" className="flex flex-col leading-none">
            <span className="font-display text-3xl tracking-[0.12em] text-[var(--night)]">BUTTERCUP</span>
            <span className="text-[0.63rem] font-semibold tracking-[0.31em] text-[var(--ink-muted)]">BEBE SHOWROOM</span>
          </Link>

          <p className="hidden text-[0.63rem] font-semibold tracking-[0.22em] text-[var(--ink-muted)] lg:block">
            DALLAS + ATLANTA WHOLESALE CHILDREN&apos;S MARKET PARTNER
          </p>

          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2.5">
            Book Now
          </a>
        </div>

        <nav aria-label="Primary" className="mt-3 overflow-x-auto border-t border-[var(--line)] pt-3">
          <ul className="flex min-w-max items-center gap-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-full border border-transparent px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)] transition hover:border-[var(--line-strong)] hover:text-[var(--night)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-[var(--line-strong)] px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)] transition hover:border-[var(--night)] hover:bg-[var(--night)] hover:text-[var(--panel)]"
              >
                Book Now
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
