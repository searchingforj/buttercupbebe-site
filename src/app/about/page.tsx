import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";

import { CONTACT_PHONE_LINKS, CONTACT_PHONES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the Buttercup Bebe showroom team.",
};

const teamPhotoCandidates = [
  "about/marci-madi.webp",
  "about/marci-madi.jpg",
  "about/marci-madi.jpeg",
  "about/marci-madi.png",
] as const;

function resolveTeamPhotoSrc() {
  for (const src of teamPhotoCandidates) {
    const absolutePath = path.join(process.cwd(), "public", src);
    if (fs.existsSync(absolutePath)) {
      return `/${src}`;
    }
  }
  return null;
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8.04 9.72a16 16 0 0 0 6.24 6.24l1.27-1.28a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

export default function AboutPage() {
  const teamPhotoSrc = resolveTeamPhotoSrc();

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-10 lg:pb-20 lg:pt-14">
      <div className="max-w-3xl space-y-6">
        <p className="section-eyebrow">About</p>
        <h1 className="font-display text-4xl leading-tight text-[var(--ink-strong)] sm:text-5xl">
          A mother-daughter showroom built for confident buying.
        </h1>
        <p className="text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
          Buttercup Bebe is a women-owned, mother-daughter wholesale showroom representing a curated mix of
          children&apos;s clothing and accessories. Our goal is simple: make buying easy, enjoyable, and confident
          for every store we support.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <figure className="w-full max-w-3xl">
          {teamPhotoSrc ? (
            <div className="relative mx-auto aspect-[5/4] w-full max-w-2xl overflow-hidden rounded-[22px] bg-[var(--surface)] shadow-[0_20px_45px_rgba(37,31,24,0.1)]">
              <Image
                src={teamPhotoSrc}
                alt="Marci and Madi from Buttercup Bebe"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 56rem"
              />
            </div>
          ) : (
            <div className="mx-auto flex aspect-[5/4] w-full max-w-2xl items-center justify-center rounded-[22px] bg-[var(--surface)] shadow-[0_20px_45px_rgba(37,31,24,0.08)]">
              <span className="font-display text-4xl text-[var(--ink-strong)] sm:text-5xl">Marci &amp; Madi</span>
            </div>
          )}
        </figure>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <article className="flex h-full flex-col rounded-[22px] bg-[var(--surface)] p-6 shadow-[0_14px_35px_rgba(37,31,24,0.08)] sm:p-7">
          <p className="section-eyebrow">Co-Founder</p>
          <h2 className="mt-2 font-display text-3xl leading-none text-[var(--ink-strong)] sm:text-4xl">Madi</h2>
          <p className="mt-4 text-sm leading-8 text-[var(--ink-muted)]">
            Madi was raised in the world of boutique retail and earned her degree in Fashion Merchandising & Textiles.
            Her experience across multiple sectors of the fashion industry gives her a complete understanding of the
            business, from product development to the sales floor, and she brings that insight to every brand and buyer
            relationship.
          </p>
          <div className="mt-auto pt-6 text-sm text-[var(--ink-strong)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center gap-2 whitespace-nowrap hover:text-[var(--ink-muted)]"
                href={`tel:${CONTACT_PHONE_LINKS.madi}`}
              >
                <PhoneIcon />
                <span>{CONTACT_PHONES.madi}</span>
              </a>
              <a
                className="inline-flex min-w-0 items-center gap-2 hover:text-[var(--ink-muted)] sm:ml-auto"
                href="mailto:madi@buttercupbebe.net"
              >
                <MailIcon />
                <span className="break-all sm:text-right">madi@buttercupbebe.net</span>
              </a>
            </div>
          </div>
        </article>

        <article className="flex h-full flex-col rounded-[22px] bg-[var(--surface)] p-6 shadow-[0_14px_35px_rgba(37,31,24,0.08)] sm:p-7">
          <p className="section-eyebrow">Co-Founder</p>
          <h2 className="mt-2 font-display text-3xl leading-none text-[var(--ink-strong)] sm:text-4xl">Marci</h2>
          <p className="mt-4 text-sm leading-8 text-[var(--ink-muted)]">
            Marci brings over 25 years of experience in children&apos;s fashion, including 14 years owning and operating her own boutique. She
            has a sharp eye for high-performing lines and provides a wealth of market knowledge that buyers can rely on season after season.
          </p>
          <div className="mt-auto pt-6 text-sm text-[var(--ink-strong)]">
            <a className="inline-flex items-center gap-2 hover:text-[var(--ink-muted)]" href={`tel:${CONTACT_PHONE_LINKS.marci}`}>
              <PhoneIcon />
              <span>{CONTACT_PHONES.marci}</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
