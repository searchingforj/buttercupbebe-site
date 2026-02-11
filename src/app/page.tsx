import Link from "next/link";

import { BrandsShowcase } from "@/components/brands-showcase";
import { buttonStyles } from "@/components/ui/button";
import { brands } from "@/data/brands";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_LINKS,
  CONTACT_PHONES,
  SHOWROOM_LOCATIONS,
} from "@/lib/constants";

export default function Home() {
  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-10 lg:pt-20">
        <div className="max-w-3xl space-y-6">
          <p className="section-eyebrow reveal">Wholesale Children&apos;s Showroom</p>
          <h1 className="reveal font-display text-5xl leading-tight text-[var(--ink-strong)] sm:text-6xl">
            Curated children&apos;s lines for modern boutique retailers.
          </h1>
          <p className="reveal max-w-2xl text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
            Dallas + Atlanta permanent showrooms, considered brands, and personal buying support so your market
            appointments feel efficient and enjoyable.
          </p>
          <div className="reveal flex flex-wrap items-center gap-3 pt-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Book Now
            </a>
            <a href="#brands-section" className={buttonStyles({ variant: "secondary", size: "lg" })}>
              Browse Brands
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-3 rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.72)] p-5 text-sm text-[var(--ink-strong)] sm:grid-cols-3 sm:items-center sm:gap-4 sm:p-6">
          <p className="font-semibold tracking-wide">Dallas Market Center + AmericasMart Atlanta</p>
          <p className="text-[var(--ink-muted)]">Permanent showrooms</p>
          <p className="text-[var(--ink-muted)]">Virtual appointments available</p>
        </div>
      </section>

      <section id="brands-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl space-y-2">
            <p className="section-eyebrow">Brands</p>
            <h2 className="font-display text-4xl text-[var(--ink-strong)] sm:text-5xl">Browse the line mix fast.</h2>
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              Tap any brand for quick view details, appointment booking, and ordering support.
            </p>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "secondary", size: "md" })}
          >
            Book Appointment
          </a>
        </div>

        <BrandsShowcase brands={brands} />
      </section>

      <section id="contact-section" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-10">
        <div className="grid gap-6 rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.72)] p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
          <div className="space-y-4">
            <p className="section-eyebrow">Contact</p>
            <h2 className="font-display text-4xl leading-tight text-[var(--ink-strong)]">
              Ready to place orders or build your market plan?
            </h2>
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              Reach out directly, or use the contact form for virtual, Dallas, or Atlanta appointment requests.
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
