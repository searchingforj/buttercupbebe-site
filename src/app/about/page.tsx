import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the Buttercup Bebe showroom team.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="space-y-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--ink-muted)]">ABOUT</p>
        <h1 className="font-display text-5xl leading-tight text-[var(--ink-strong)] sm:text-6xl">A mother-daughter wholesale showroom built for better buying.</h1>
        <p className="max-w-3xl text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
          Buttercup Bebe represents a curated mix of children&apos;s clothing and accessories with one clear goal: make
          discovering great lines easy and enjoyable for boutique buyers.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.58)] p-6">
          <h2 className="font-display text-4xl text-[var(--ink-strong)]">Marci</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">
            Marci brings over 25 years in children&apos;s fashion and owned and operated a children&apos;s boutique for 14
            years. Today, she leads Buttercup Bebe&apos;s Dallas and Atlanta showrooms alongside her daughter, helping
            retailers choose lines with confidence and clarity.
          </p>
        </article>

        <article className="rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.58)] p-6">
          <h2 className="font-display text-4xl text-[var(--ink-strong)]">Madi</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">
            Madi grew up in boutique retail and earned her degree in Fashion Merchandising &amp; Textiles from Western
            Kentucky University. She brings a modern merchandising perspective and especially enjoys helping stores
            curate assortments that are commercially strong and visually cohesive.
          </p>
        </article>
      </div>
    </section>
  );
}
