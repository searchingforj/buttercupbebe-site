import Link from "next/link";

import { BrandsShowcase } from "@/components/brands-showcase";
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
    <div className="relative overflow-hidden pb-24">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-10 lg:pt-18">
        <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="space-y-7">
            <p className="eyebrow reveal">Curated Children&apos;s Wholesale Showroom</p>
            <h1 className="reveal max-w-4xl font-display text-6xl leading-[0.92] text-[var(--night)] sm:text-7xl lg:text-8xl">
              A sharper way for retailers to discover standout children&apos;s lines.
            </h1>
            <p className="reveal max-w-2xl text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
              Dallas + Atlanta showrooms, thoughtfully curated brands, and personal buying support built around speed,
              trust, and a better market experience.
            </p>

            <div className="reveal flex flex-wrap gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book Now
              </a>
              <a href="#brands-section" className="btn-secondary">
                Browse Brands
              </a>
            </div>

            <div className="reveal grid gap-3 sm:grid-cols-3">
              <div className="panel px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">Showrooms</p>
                <p className="mt-2 text-sm font-semibold text-[var(--ink)]">Dallas + Atlanta</p>
              </div>
              <div className="panel px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">Buying Style</p>
                <p className="mt-2 text-sm font-semibold text-[var(--ink)]">Guided + Efficient</p>
              </div>
              <div className="panel px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">Appointments</p>
                <p className="mt-2 text-sm font-semibold text-[var(--ink)]">In-Person + Virtual</p>
              </div>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[1.8rem] border border-[rgba(255,255,255,0.2)] bg-[var(--night)] p-6 text-[var(--panel)] shadow-[0_26px_60px_rgba(10,16,22,0.38)] sm:p-8 lg:mt-8">
            <div className="pointer-events-none absolute -right-12 top-[-30px] h-42 w-42 rounded-full bg-[rgba(179,110,61,0.35)] blur-2xl" />
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[rgba(248,241,228,0.72)]">
              Market Booking Desk
            </p>
            <h2 className="mt-4 max-w-sm font-display text-5xl leading-[0.95] text-[var(--panel)] sm:text-6xl">
              Reserve your showroom walk-through.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[rgba(248,241,228,0.82)]">
              Use the calendar to lock in time during market or request a virtual session for line review and order
              planning.
            </p>

            <ul className="mt-8 space-y-3 border-t border-[rgba(248,241,228,0.24)] pt-6 text-sm leading-6 text-[rgba(248,241,228,0.92)]">
              {SHOWROOM_LOCATIONS.map((location) => (
                <li key={location}>{location}</li>
              ))}
            </ul>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full border border-[rgba(248,241,228,0.82)] px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--panel)] transition hover:bg-[var(--panel)] hover:text-[var(--night)]"
            >
              Book Appointment
            </a>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-4 rounded-[1.4rem] border border-[var(--line)] bg-[rgba(255,255,255,0.6)] px-5 py-5 text-sm sm:grid-cols-3 sm:items-center sm:px-6">
          <p className="font-semibold uppercase tracking-[0.11em] text-[var(--ink)]">Dallas Market Center + AmericasMart Atlanta</p>
          <p className="text-[var(--ink-muted)]">Permanent showrooms</p>
          <p className="text-[var(--ink-muted)]">Virtual appointments available</p>
        </div>
      </section>

      <section id="brands-section" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">Brands</p>
            <h2 className="font-display text-5xl leading-[0.95] text-[var(--night)] sm:text-6xl">A curated floor designed for quick, confident buys.</h2>
            <p className="max-w-2xl text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
              Open quick view on any line for an at-a-glance collection preview and direct next-step actions.
            </p>
          </div>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Book Appointment
          </a>
        </div>

        <BrandsShowcase brands={brands} />
      </section>

      <section id="contact-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 rounded-[1.8rem] border border-[var(--line)] bg-[rgba(255,255,255,0.62)] p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
          <div className="space-y-4">
            <p className="eyebrow">Contact</p>
            <h2 className="font-display text-5xl leading-[0.96] text-[var(--night)]">Ready to place orders or build your market plan?</h2>
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              Reach out directly or use the full inquiry form for virtual requests, market appointments, and ordering
              help.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Contact to Order
              </Link>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Book Now
              </a>
            </div>
          </div>

          <div className="panel space-y-3 px-5 py-5 text-sm text-[var(--ink)]">
            <a className="block transition hover:text-[var(--accent)]" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <a className="block transition hover:text-[var(--accent)]" href={`tel:${CONTACT_PHONE_LINKS.madi}`}>
              Madi: {CONTACT_PHONES.madi}
            </a>
            <a className="block transition hover:text-[var(--accent)]" href={`tel:${CONTACT_PHONE_LINKS.marci}`}>
              Marci: {CONTACT_PHONES.marci}
            </a>
            <ul className="space-y-2 pt-3 text-[var(--ink-muted)]">
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
