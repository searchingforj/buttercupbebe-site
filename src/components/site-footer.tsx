import Link from "next/link";

import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_LINKS,
  CONTACT_PHONES,
  SHOWROOM_LOCATIONS,
} from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[rgba(248,241,228,0.16)] bg-[var(--night)] text-[var(--panel)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr] lg:px-10">
        <div className="space-y-4">
          <p className="font-display text-4xl leading-none">Buttercup Bebe</p>
          <p className="max-w-md text-sm leading-7 text-[rgba(248,241,228,0.78)]">
            Wholesale children&apos;s showroom for boutiques that want a focused line mix, clear guidance, and a premium
            buying experience.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-[rgba(248,241,228,0.72)] px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--panel)] transition hover:bg-[var(--panel)] hover:text-[var(--night)]"
          >
            Book Appointment
          </a>
        </div>

        <div className="space-y-3">
          <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[rgba(248,241,228,0.64)]">Contact</h2>
          <a className="block text-sm transition hover:text-[var(--accent-soft)]" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <a className="block text-sm transition hover:text-[var(--accent-soft)]" href={`tel:${CONTACT_PHONE_LINKS.madi}`}>
            Madi: {CONTACT_PHONES.madi}
          </a>
          <a className="block text-sm transition hover:text-[var(--accent-soft)]" href={`tel:${CONTACT_PHONE_LINKS.marci}`}>
            Marci: {CONTACT_PHONES.marci}
          </a>
        </div>

        <div className="space-y-3">
          <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[rgba(248,241,228,0.64)]">Showrooms</h2>
          <ul className="space-y-2 text-sm text-[rgba(248,241,228,0.84)]">
            {SHOWROOM_LOCATIONS.map((location) => (
              <li key={location}>{location}</li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[rgba(248,241,228,0.72)] underline-offset-4 transition hover:text-[var(--accent-soft)] hover:underline"
          >
            Contact to Order
          </Link>
        </div>
      </div>
    </footer>
  );
}
