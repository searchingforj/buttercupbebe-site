import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the Buttercup Bebe showroom team.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="space-y-5">
          <p className="eyebrow">About</p>
          <h1 className="font-display text-6xl leading-[0.92] text-[var(--night)] sm:text-7xl">
            A mother-daughter showroom with deep retail roots.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
            Buttercup Bebe represents a curated mix of children&apos;s clothing and accessories with one goal: make
            discovering great lines easy and enjoyable for boutique buyers.
          </p>
        </div>

        <aside className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--night)] p-6 text-[var(--panel)] sm:p-8">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[rgba(248,241,228,0.65)]">Why Stores Partner</p>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-[rgba(248,241,228,0.86)]">
            <li>Curated assortment that balances proven sellers with freshness.</li>
            <li>Personal guidance during market so buying stays focused and efficient.</li>
            <li>Consistent support between markets for reorders and assortment planning.</li>
          </ul>
        </aside>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="panel overflow-hidden">
          <div className="border-b border-[var(--line)] bg-[rgba(255,255,255,0.6)] px-6 py-5">
            <p className="eyebrow">Marci</p>
            <h2 className="font-display text-5xl text-[var(--night)]">25+ Years</h2>
          </div>
          <p className="px-6 py-6 text-sm leading-7 text-[var(--ink-muted)]">
            Marci brings over 25 years in children&apos;s fashion and owned and operated a children&apos;s boutique for 14
            years. She now leads Buttercup Bebe&apos;s Dallas and Atlanta showrooms with her daughter, helping retailers
            choose lines with confidence and clarity.
          </p>
        </article>

        <article className="panel overflow-hidden">
          <div className="border-b border-[var(--line)] bg-[rgba(255,255,255,0.6)] px-6 py-5">
            <p className="eyebrow">Madi</p>
            <h2 className="font-display text-5xl text-[var(--night)]">Modern Merchandising</h2>
          </div>
          <p className="px-6 py-6 text-sm leading-7 text-[var(--ink-muted)]">
            Madi grew up around boutique retail and earned her degree in Fashion Merchandising &amp; Textiles from
            Western Kentucky University. She brings a modern merchandising perspective and enjoys helping stores build
            assortments that are both commercially strong and visually cohesive.
          </p>
        </article>
      </div>
    </section>
  );
}
