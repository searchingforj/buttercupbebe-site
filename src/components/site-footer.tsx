import Link from "next/link";

import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_LINKS,
  CONTACT_PHONES,
  SHOWROOM_LOCATIONS,
} from "@/lib/constants";
import { buttonStyles } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
        <div className="space-y-3">
          <p className="font-display text-3xl text-[var(--ink-strong)]">Buttercup Bebe</p>
          <p className="max-w-md text-sm leading-7 text-[var(--ink-muted)]">
            A curated children&apos;s wholesale showroom helping boutique buyers move quickly with confidence.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "secondary", size: "sm" })}
          >
            Book Appointment
          </a>
        </div>

        <div className="space-y-3">
          <h2 className="section-eyebrow">Contact</h2>
          <a className="block text-sm text-[var(--ink-strong)] transition hover:text-[var(--accent-strong)]" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <a className="block text-sm text-[var(--ink-strong)] transition hover:text-[var(--accent-strong)]" href={`tel:${CONTACT_PHONE_LINKS.madi}`}>
            Madi: {CONTACT_PHONES.madi}
          </a>
          <a className="block text-sm text-[var(--ink-strong)] transition hover:text-[var(--accent-strong)]" href={`tel:${CONTACT_PHONE_LINKS.marci}`}>
            Marci: {CONTACT_PHONES.marci}
          </a>
        </div>

        <div className="space-y-3">
          <h2 className="section-eyebrow">Showrooms</h2>
          <ul className="space-y-2 text-sm text-[var(--ink-strong)]">
            {SHOWROOM_LOCATIONS.map((location) => (
              <li key={location}>{location}</li>
            ))}
          </ul>
          <Link href="/contact" className="text-sm text-[var(--ink-muted)] underline-offset-4 transition hover:text-[var(--accent-strong)] hover:underline">
            Contact to order
          </Link>
        </div>
      </div>
    </footer>
  );
}
