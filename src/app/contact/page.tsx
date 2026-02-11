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
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="space-y-4">
        <p className="eyebrow">Contact</p>
        <h1 className="max-w-5xl font-display text-6xl leading-[0.92] text-[var(--night)] sm:text-7xl">
          Appointment requests and wholesale support with direct response.
        </h1>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="rounded-[1.5rem] border border-[rgba(248,241,228,0.24)] bg-[var(--night)] p-6 text-[var(--panel)] sm:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[rgba(248,241,228,0.66)]">Email</p>
              <a className="text-base transition hover:text-[var(--accent-soft)]" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[rgba(248,241,228,0.66)]">Call / Text</p>
              <a className="block text-base transition hover:text-[var(--accent-soft)]" href={`tel:${CONTACT_PHONE_LINKS.madi}`}>
                Madi: {CONTACT_PHONES.madi}
              </a>
              <a className="block text-base transition hover:text-[var(--accent-soft)]" href={`tel:${CONTACT_PHONE_LINKS.marci}`}>
                Marci: {CONTACT_PHONES.marci}
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[rgba(248,241,228,0.66)]">Locations</p>
              <ul className="space-y-2 text-sm text-[rgba(248,241,228,0.9)]">
                {SHOWROOM_LOCATIONS.map((location) => (
                  <li key={location}>{location}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="panel p-6 sm:p-7">
          <h2 className="mb-4 font-display text-5xl leading-none text-[var(--night)]">Send an inquiry</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
