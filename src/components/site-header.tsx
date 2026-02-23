"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/constants";

const navItems = [
  { label: "Brands", href: "/#brands-section" },
  { label: "Market Dates", href: "/market-dates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
    window.scrollTo({ top: 0, behavior });
  };

  const scrollToBrandsSection = (behavior: ScrollBehavior = "smooth") => {
    const brandsSection = document.getElementById("brands-section");

    if (!brandsSection) {
      return;
    }

    const headerElement = document.querySelector<HTMLElement>("[data-site-header]");
    const headerHeight = headerElement?.getBoundingClientRect().height ?? 0;
    const targetPosition =
      brandsSection.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior,
    });
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.history.replaceState(null, "", "/");
    scrollToTop();
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[number],
  ) => {
    setMobileMenuOpen(false);

    if (item.label === "Brands") {
      if (pathname !== "/") {
        return;
      }

      event.preventDefault();
      window.history.replaceState(null, "", "/#brands-section");
      scrollToBrandsSection("smooth");
      return;
    }

    if (pathname === item.href) {
      event.preventDefault();
      window.history.replaceState(null, "", item.href);
      scrollToTop();
    }
  };

  useEffect(() => {
    if (pathname !== "/") {
      scrollToTop("auto");
      return;
    }

    if (window.location.hash === "#brands-section") {
      requestAnimationFrame(() => {
        scrollToBrandsSection("auto");
      });
      return;
    }

    scrollToTop("auto");
  }, [pathname]);

  return (
    <header
      data-site-header
      className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[var(--surface-overlay)] backdrop-blur-md"
    >
      <div className="border-b border-[var(--border-soft)] bg-[rgba(19,24,32,0.04)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p className="py-2 text-center text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)] sm:text-[0.66rem]">
            Dallas Market Center + AmericasMart Atlanta Showrooms
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3 py-3 sm:gap-4">
          <Link
            href="/"
            scroll
            onClick={handleLogoClick}
            aria-label="Buttercup Bebe home"
            className="inline-flex shrink-0 items-center"
          >
            <Image
              src="/brand/buttercup-bebe-logo.svg"
              alt="Buttercup Bebe Logo"
              width={1180}
              height={450}
              priority
              className="h-auto w-[175px] sm:w-[225px] lg:w-[280px]"
            />
          </Link>

          <nav aria-label="Primary" className="ml-1 hidden min-w-0 overflow-x-auto md:block">
            <ul className="flex min-w-max items-center gap-2 text-sm sm:gap-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    scroll={item.label !== "Brands"}
                    onClick={(event) => handleNavClick(event, item)}
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

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className={buttonStyles({
              variant: "ghost",
              size: "sm",
              className:
                "ml-auto gap-2 normal-case tracking-wide text-[var(--ink-strong)] hover:text-[var(--ink-strong)] md:hidden",
            })}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 block h-px w-4 bg-current transition-transform duration-200 ${
                  mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-px w-4 bg-current transition-opacity duration-200 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] block h-px w-4 bg-current transition-transform duration-200 ${
                  mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
            <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[var(--border-soft)] bg-[var(--surface)] md:hidden">
          <nav aria-label="Mobile primary" className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            <ul className="grid gap-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    scroll={item.label !== "Brands"}
                    onClick={(event) => handleNavClick(event, item)}
                    className={buttonStyles({
                      variant: "ghost",
                      size: "md",
                      className: "w-full justify-start normal-case tracking-wide text-[var(--ink-strong)]",
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
                  onClick={() => setMobileMenuOpen(false)}
                  className={buttonStyles({
                    variant: "secondary",
                    size: "md",
                    className: "w-full justify-center normal-case tracking-wide",
                  })}
                >
                  Book Now
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
