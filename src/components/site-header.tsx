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
    <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[color:var(--surface-overlay)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="font-display text-xl tracking-[0.2em] text-[var(--ink-strong)] transition-colors hover:text-[var(--ink-muted)]"
            aria-label="Buttercup Bebe home"
          >
            BUTTERCUP BEBE
          </Link>
        </div>

        <nav aria-label="Primary" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-2 text-sm sm:gap-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-transparent px-3 py-1.5 tracking-wide text-[var(--ink-muted)] transition hover:border-[var(--border-soft)] hover:text-[var(--ink-strong)]"
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
                className="inline-flex items-center rounded-full border border-[var(--ink-strong)] px-3 py-1.5 tracking-wide text-[var(--ink-strong)] transition hover:bg-[var(--ink-strong)] hover:text-[var(--surface)]"
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
