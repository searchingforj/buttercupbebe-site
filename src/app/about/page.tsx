import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";

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

export default function AboutPage() {
  const teamPhotoSrc = resolveTeamPhotoSrc();

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 lg:px-10 lg:pb-20 lg:pt-16">
      <div className="max-w-3xl space-y-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--ink-muted)]">ABOUT</p>
        <h1 className="font-display text-5xl leading-tight text-[var(--ink-strong)] sm:text-6xl">
          A mother-daughter showroom built for confident buying.
        </h1>
        <p className="text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
          Buttercup Bebe is a mother-daughter wholesale showroom representing a curated mix of children&apos;s clothing
          and accessories. Our goal is simple: make buying easy, enjoyable, and confident for every store we support.
        </p>
      </div>

      <div className="mt-10">
        <figure className="rounded-3xl border border-[var(--border-soft)] bg-[linear-gradient(120deg,rgba(243,236,219,0.9),rgba(247,247,247,0.94))] p-5 sm:p-7">
          {teamPhotoSrc ? (
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)]">
              <Image
                src={teamPhotoSrc}
                alt="Marci and Madi from Buttercup Bebe"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>
          ) : (
            <div className="flex aspect-[5/4] items-center justify-center rounded-2xl border border-dashed border-[rgba(19,19,19,0.25)] bg-[rgba(255,255,255,0.72)]">
              <span className="font-display text-4xl text-[var(--ink-strong)] sm:text-5xl">Marci &amp; Madi</span>
            </div>
          )}
        </figure>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.58)] p-6 sm:p-7">
          <h2 className="font-display text-5xl leading-none text-[var(--ink-strong)] sm:text-6xl">Marci</h2>
          <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-[var(--ink-muted)]">
            CO-FOUNDER
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">
            Marci brings 25+ years in children&apos;s fashion and 14 years owning and operating her own boutique. She
            now runs Buttercup Bebe&apos;s Dallas and Atlanta showrooms with a strong instinct for lines that perform and
            assortments that fit each store&apos;s customer
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold tracking-[0.08em] text-[var(--ink-muted)]">
            <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">25+ years in children&apos;s fashion</span>
            <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">14 years boutique ownership</span>
            <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">Dallas + Atlanta showrooms</span>
          </div>
        </article>

        <article className="rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.58)] p-6 sm:p-7">
          <h2 className="font-display text-5xl leading-none text-[var(--ink-strong)] sm:text-6xl">Madi</h2>
          <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-[var(--ink-muted)]">
            CO-FOUNDER
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">
            Madi grew up around boutique retail and earned her degree in Fashion Merchandising &amp; Textiles from
            Western Kentucky University. She focuses on helping buyers build intentional assortments that feel current,
            commercial, and easy to shop
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold tracking-[0.08em] text-[var(--ink-muted)]">
            <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">Boutique retail upbringing</span>
            <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">WKU Fashion Merchandising &amp; Textiles</span>
            <span className="rounded-full border border-[var(--border-soft)] px-3 py-1">Assortment planning support</span>
          </div>
        </article>
      </div>
    </section>
  );
}
