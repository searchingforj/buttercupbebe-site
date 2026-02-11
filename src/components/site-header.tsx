import Link from "next/link";

import { BOOKING_URL } from "@/lib/constants";
import { buttonStyles } from "@/components/ui/button";

const navItems = [
  { label: "Brands", href: "/#brands-section" },
  { label: "Market Dates", href: "/market-dates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--surface-overlay)] backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="font-display text-[1.35rem] leading-none tracking-[0.12em] text-[var(--ink-strong)] sm:text-[1.6rem]"
            aria-label="Buttercup Bebe home"
          >
            BUTTERCUP BEBE
          </Link>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            Book Now
          </a>
        </div>

        <nav aria-label="Primary" className="mt-4 overflow-x-auto border-t border-[var(--line)] pt-3">
          <ul className="flex min-w-max items-center gap-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={buttonStyles({
                    variant: "ghost",
                    size: "sm",
                    className: "uppercase",
                  })}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
