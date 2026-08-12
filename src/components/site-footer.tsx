"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { InstagramLink } from "@/components/instagram-link";
import { buttonStyles } from "@/components/ui/button";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_LINKS,
  CONTACT_PHONES,
  SHOWROOM_LOCATIONS,
} from "@/lib/constants";

const CLUB_LANDING_PATH = "/courtside-kids";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === CLUB_LANDING_PATH) {
    return (
      <footer className="border-t border-[#d9ddd7] bg-[#f5f2e9]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.25fr_0.75fr] lg:px-10">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <Image
                src="/brand-logos/courtside-kids.png"
                alt="Courtside Kids"
                width={478}
                height={158}
                className="h-auto w-[150px]"
              />
              <span className="h-8 w-px bg-[#0b513f]/20" aria-hidden="true" />
              <Image
                src="/brand/buttercup-bebe-logo.svg"
                alt="Buttercup Bebe"
                width={1180}
                height={450}
                className="h-auto w-[170px]"
              />
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#4f625c]">
              Courtside Kids wholesale representation and buyer support from the Buttercup Bebe team.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Courtside%20Kids%20wholesale%20inquiry`}
              className="text-sm font-semibold text-[#0b513f] underline decoration-[#0b513f]/25 underline-offset-4 hover:decoration-[#0b513f]"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#4f625c] hover:text-[#0b513f]"
            >
              Schedule a conversation ↗
            </a>
            <Link href="/" className="text-sm text-[#4f625c] hover:text-[#0b513f]">
              Visit the full Buttercup Bebe showroom
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--background)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
        <div className="space-y-3">
          <p className="font-display text-2xl text-[var(--ink-strong)]">Buttercup Bebe</p>
          <p className="max-w-md text-sm leading-7 text-[var(--ink-muted)]">
            A curated children&apos;s wholesale showroom for boutique, specialty, and department store buyers.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "secondary", size: "md" })}
          >
            Book Appointment
          </a>
        </div>

        <div className="space-y-3">
          <h2 className="section-eyebrow">Contact</h2>
          <a className="block text-sm text-[var(--ink-strong)] hover:text-[var(--ink-muted)]" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <a className="block text-sm text-[var(--ink-strong)] hover:text-[var(--ink-muted)]" href={`tel:${CONTACT_PHONE_LINKS.madi}`}>
            Madi: {CONTACT_PHONES.madi}
          </a>
          <a className="block text-sm text-[var(--ink-strong)] hover:text-[var(--ink-muted)]" href={`tel:${CONTACT_PHONE_LINKS.marci}`}>
            Marci: {CONTACT_PHONES.marci}
          </a>
          <InstagramLink className="pt-1" label="buttercupbebe_" />
        </div>

        <div className="space-y-3">
          <h2 className="section-eyebrow">Showrooms</h2>
          <ul className="space-y-2 text-sm text-[var(--ink-strong)]">
            {SHOWROOM_LOCATIONS.map((location) => (
              <li key={location}>{location}</li>
            ))}
          </ul>
          <Link href="/contact" className="text-sm text-[var(--ink-muted)] underline-offset-4 hover:underline">
            Contact to order
          </Link>
        </div>
      </div>
    </footer>
  );
}
