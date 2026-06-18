import Link from "next/link";

import { BrandsShowcase } from "@/components/brands-showcase";
import { buttonStyles } from "@/components/ui/button";
import { visibleBrands } from "@/data/brands";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_LINKS,
  CONTACT_PHONES,
  SHOWROOM_LOCATIONS,
} from "@/lib/constants";

export default function Home() {
  return (
    <div className="pb-16">
      <BrandsShowcase brands={visibleBrands} />

      <section id="contact-section" className="bg-[var(--surface-strong)] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-[0_22px_60px_rgba(37,31,24,0.08)] md:grid-cols-[1.2fr_1fr] md:p-8">
          <div className="space-y-4">
            <p className="section-eyebrow">Contact</p>
            <h2 className="font-display text-4xl leading-tight text-[var(--ink-strong)]">
              Ready to place orders or build your market plan?
            </h2>
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              Reach out directly, or use the contact form for virtual, Dallas, Atlanta, or Nashville appointment
              requests.{" "}
              <Link
                href="/market-dates"
                className="font-semibold text-[var(--ink-strong)] underline decoration-[var(--border-strong)] underline-offset-4 transition hover:text-[var(--ink-muted)]"
              >
                See market dates.
              </Link>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className={buttonStyles({ variant: "primary", size: "md" })}>
                Contact to Order
              </Link>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "secondary", size: "md" })}
              >
                Book Now
              </a>
            </div>
          </div>

          <div className="space-y-3 text-sm text-[var(--ink-strong)]">
            <a className="block hover:text-[var(--ink-muted)]" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <a className="block hover:text-[var(--ink-muted)]" href={`tel:${CONTACT_PHONE_LINKS.madi}`}>
              Madi: {CONTACT_PHONES.madi}
            </a>
            <a className="block hover:text-[var(--ink-muted)]" href={`tel:${CONTACT_PHONE_LINKS.marci}`}>
              Marci: {CONTACT_PHONES.marci}
            </a>
            <ul className="space-y-2 pt-2 text-[var(--ink-muted)]">
              {SHOWROOM_LOCATIONS.map((location) => (
                <li key={location}>{location}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
