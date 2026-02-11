import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_LINKS,
  CONTACT_PHONES,
  SHOWROOM_LOCATIONS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Buttercup Bebe for appointments and wholesale ordering support.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="space-y-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--ink-muted)]">CONTACT</p>
        <h1 className="font-display text-5xl leading-tight text-[var(--ink-strong)] sm:text-6xl">Appointment requests and wholesale ordering support.</h1>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <aside className="space-y-6 rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.58)] p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--ink-muted)]">EMAIL</p>
            <a className="text-base text-[var(--ink-strong)] hover:text-[var(--ink-muted)]" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--ink-muted)]">CALL / TEXT</p>
            <a className="block text-base text-[var(--ink-strong)] hover:text-[var(--ink-muted)]" href={`tel:${CONTACT_PHONE_LINKS.madi}`}>
              Madi: {CONTACT_PHONES.madi}
            </a>
            <a className="block text-base text-[var(--ink-strong)] hover:text-[var(--ink-muted)]" href={`tel:${CONTACT_PHONE_LINKS.marci}`}>
              Marci: {CONTACT_PHONES.marci}
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--ink-muted)]">LOCATIONS</p>
            <ul className="space-y-2 text-sm text-[var(--ink-strong)]">
              {SHOWROOM_LOCATIONS.map((location) => (
                <li key={location}>{location}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.58)] p-6">
          <h2 className="mb-4 font-display text-3xl text-[var(--ink-strong)]">Send an inquiry</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
