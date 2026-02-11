import Image from "next/image";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/constants";

const navItems = [
  { label: "Brands", href: "/#brands-section" },
  { label: "Market Dates", href: "/market-dates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[var(--surface-overlay)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" aria-label="Buttercup Bebe home" className="inline-flex items-center py-1">
            <Image
              src="/brand/buttercup-bebe-logo.png"
              alt="Buttercup Bebe Logo"
              width={1180}
              height={450}
              priority
              className="h-auto w-[190px] sm:w-[240px] lg:w-[280px]"
            />
          </Link>
        </div>

        <nav aria-label="Primary" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-2 text-sm sm:gap-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={buttonStyles({
                    variant: "ghost",
                    size: "sm",
                    className: "normal-case tracking-wide",
                  })}
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
                className={buttonStyles({
                  variant: "secondary",
                  size: "sm",
                  className: "normal-case tracking-wide",
                })}
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
