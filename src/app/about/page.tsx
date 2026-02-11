import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the Buttercup Bebe showroom team.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
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
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-[rgba(19,19,19,0.25)] bg-[rgba(255,255,255,0.72)]">
            <span className="font-display text-4xl text-[var(--ink-strong)] sm:text-5xl">Marci &amp; Madi</span>
          </div>
          <figcaption className="pt-3 text-xs tracking-[0.16em] text-[var(--ink-muted)]">IMAGE PLACEHOLDER</figcaption>
        </figure>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.58)] p-6 sm:p-7">
          <h2 className="font-display text-4xl text-[var(--ink-strong)]">Marci</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--ink-muted)]">
            <li>25+ years in children&apos;s fashion.</li>
            <li>Owned and operated a children&apos;s boutique for 14 years.</li>
            <li>Runs Buttercup Bebe&apos;s Dallas and Atlanta showrooms.</li>
            <li>Known for selecting lines that perform in real stores.</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.58)] p-6 sm:p-7">
          <h2 className="font-display text-4xl text-[var(--ink-strong)]">Madi</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--ink-muted)]">
            <li>Grew up around boutique retail operations and buying cycles.</li>
            <li>Earned a Fashion Merchandising &amp; Textiles degree from Western Kentucky University.</li>
            <li>Brings a modern merchandising perspective to every appointment.</li>
            <li>Enjoys helping stores curate clear, intentional assortments.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
