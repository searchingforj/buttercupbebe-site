import type { Metadata } from "next";
import Image from "next/image";

import { buttonStyles } from "@/components/ui/button";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_LINKS,
  CONTACT_PHONES,
  COURTSIDE_WHOLESALE_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Courtside Kids for Golf & Country Clubs",
  description:
    "Discover Courtside Kids junior performance apparel for golf shops, country clubs, racquet clubs, and resort retail, with wholesale support from Buttercup Bebe.",
  openGraph: {
    title: "Courtside Kids for Golf & Country Clubs",
    description:
      "Polished junior performance apparel, custom club embroidery, and personal wholesale support.",
    type: "website",
  },
};

const performancePoints = [
  {
    number: "01",
    title: "Polished performance",
    description:
      "Club-ready silhouettes made with four-way stretch, easy-care fabrics, and thoughtful performance details.",
  },
  {
    number: "02",
    title: "A complete junior story",
    description:
      "Coordinated polos, shorts, skorts, dresses, and layers for boys and girls across the club calendar.",
  },
  {
    number: "03",
    title: "Made for your identity",
    description:
      "Custom club embroidery is available on select styles, creating merchandise that feels specific to your members.",
  },
] as const;

const assortmentCards = [
  {
    label: "Boys",
    title: "Polos that perform. Shorts that still look polished.",
    description:
      "Build an easy junior golf uniform with moisture-wicking polos, dress shorts, signature Super Shorts, and lightweight layers.",
    image: "/brands/courtside-kids/website-card-01.webp",
    imageAlt: "Boy wearing a green Courtside Kids performance polo and coordinating shorts",
    imagePosition: "center 28%",
  },
  {
    label: "Girls",
    title: "Sport-forward pieces designed to move.",
    description:
      "Performance tanks, skorts, court dresses, and layers bring a fresh girls' assortment to golf, racquet, and resort retail.",
    image: "/brands/courtside-kids/clubs/girls-golf-look.jpg",
    imageAlt: "Girl wearing a green striped Courtside Kids golf outfit and holding a golf ball",
    imagePosition: "center 42%",
  },
] as const;

const buyerSteps = [
  {
    title: "Tell us about your shop",
    description:
      "Share your customer, junior programs, season, and the role you want the assortment to play.",
  },
  {
    title: "Build the right assortment",
    description:
      "We will help narrow the collection into a focused opening order, including embroidery opportunities.",
  },
  {
    title: "Order with confidence",
    description:
      "Place your order through the Courtside Kids wholesale portal, with Buttercup Bebe available for ongoing support.",
  },
] as const;

const faqs = [
  {
    question: "Why is this page on the Buttercup Bebe website?",
    answer:
      "Buttercup Bebe is the wholesale representative for Courtside Kids. Our team introduces the collection, supports assortment planning, and helps retail buyers through the wholesale ordering process.",
  },
  {
    question: "Can Courtside Kids add our club logo?",
    answer:
      "Yes. Custom club embroidery is available on select styles. Contact our team to discuss eligible products, placement, minimums, and timing for your program.",
  },
  {
    question: "Can I order directly online?",
    answer:
      "Yes. Approved wholesale buyers can sign in to the Courtside Kids wholesale portal. If you are new to the line or would like assortment guidance, start with our team and we will help you get set up.",
  },
  {
    question: "Is the collection only for golf?",
    answer:
      "No. The assortment works across junior golf, tennis, pickleball, camps, travel, and everyday club life, giving the shop more ways to merchandise and sell each piece.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.5 10.2 2.15 2.15 4.85-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CourtsideKidsForClubsPage() {
  const inquiryEmail = `mailto:${CONTACT_EMAIL}?subject=Courtside%20Kids%20for%20our%20club`;

  return (
    <div className="overflow-hidden bg-[#fbfaf6] text-[#112b24] selection:bg-[#b8dfce] selection:text-[#092f24]">
      <section className="relative isolate border-b border-[#0b513f]/10">
        <div className="absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(circle_at_15%_5%,rgba(156,211,188,0.32),transparent_43%),linear-gradient(180deg,#f4f1e8_0%,#fbfaf6_100%)]" />
        <div className="mx-auto grid min-h-[calc(100svh-82px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10 lg:py-20">
          <div className="relative z-10 max-w-xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0b513f]/15 bg-white/65 px-4 py-2 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#0b513f] shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#15966f]" />
              Wholesale for golf &amp; club retail
            </p>
            <Image
              src="/brand-logos/courtside-kids.png"
              alt="Courtside Kids"
              width={478}
              height={158}
              priority
              className="mb-7 h-auto w-[235px] sm:w-[285px]"
            />
            <h1 className="font-display text-[3.4rem] font-semibold leading-[0.92] tracking-[-0.035em] text-[#0a382c] sm:text-[4.6rem] lg:text-[5.35rem]">
              Junior performance apparel, ready for the club.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#4f625c] sm:text-lg sm:leading-8">
              Polished boys&apos; and girls&apos; activewear built for movement, member families, and a modern golf shop—now available with custom club embroidery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "club", size: "lg", className: "gap-2 normal-case" })}
              >
                Talk to a representative
                <ArrowIcon />
              </a>
              <a
                href={COURTSIDE_WHOLESALE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                  className:
                    "gap-2 border-[#0b513f]/35 bg-transparent normal-case text-[#0b513f] hover:border-[#0b513f] hover:bg-[#0b513f]",
                })}
              >
                Open wholesale portal
                <ArrowIcon />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[#45665d]">
              <span className="inline-flex items-center gap-2"><CheckIcon /> Boys &amp; girls</span>
              <span className="inline-flex items-center gap-2"><CheckIcon /> Performance fabrics</span>
              <span className="inline-flex items-center gap-2"><CheckIcon /> Custom embroidery</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[680px] lg:mx-0">
            <div className="relative aspect-[4/4.15] overflow-hidden rounded-[2rem] bg-[#e5e2da] shadow-[0_34px_90px_rgba(17,43,36,0.17)] sm:aspect-[5/4.55] lg:aspect-[4/4.35]">
              <Image
                src="/brands/courtside-kids/1.webp"
                alt="Children wearing coordinated Courtside Kids polos and performance shorts"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover"
                style={{ objectPosition: "center 48%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082e24]/35 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/35 bg-[#fbfaf6]/90 p-4 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[260px]">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#3f655a]">The club assortment</p>
                <p className="mt-1 font-display text-2xl font-semibold leading-tight text-[#0a382c]">Sport-ready. Clubhouse polished.</p>
              </div>
            </div>
            <div className="absolute -right-3 -top-5 hidden w-[34%] overflow-hidden rounded-[1.35rem] border-[6px] border-[#fbfaf6] bg-white shadow-[0_20px_55px_rgba(17,43,36,0.2)] sm:block lg:-right-5 lg:top-10">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/brands/courtside-kids/website-card-01.webp"
                  alt="Courtside Kids golf-print polo and green shorts"
                  fill
                  sizes="220px"
                  className="object-cover"
                  style={{ objectPosition: "center 28%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#0b513f]/10 bg-[#0a382c] text-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/12 px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
          {performancePoints.map((point) => (
            <article key={point.number} className="py-8 md:px-7 md:py-10 first:md:pl-0 last:md:pr-0">
              <div className="flex items-start gap-5">
                <span className="font-display text-2xl text-[#9cd3bc]">{point.number}</span>
                <div>
                  <h2 className="font-display text-2xl font-semibold">{point.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/68">{point.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="assortment" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#168466]">The assortment</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-[#0a382c] sm:text-5xl">One line. A complete junior story.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#556861] lg:justify-self-end">
            Courtside Kids gives buyers a focused way to serve junior golfers and member families without piecing the category together across unrelated brands.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {assortmentCards.map((card) => (
            <article key={card.label} className="group overflow-hidden rounded-[1.75rem] border border-[#0b513f]/10 bg-white shadow-[0_18px_50px_rgba(17,43,36,0.07)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eeece7]">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                  style={{ objectPosition: card.imagePosition }}
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#168466]">{card.label}</p>
                <h3 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight text-[#0a382c] sm:text-4xl">{card.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#556861] sm:text-base sm:leading-7">{card.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 overflow-hidden rounded-[1.75rem] border border-[#0b513f]/10 bg-[#f0eee7] p-3 sm:p-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px] overflow-hidden rounded-[1.35rem] sm:min-h-[470px]">
            <Image
              src="/brands/courtside-kids/3.webp"
              alt="Boy wearing a striped Courtside Kids polo and performance shorts"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
              style={{ objectPosition: "center 42%" }}
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-10 sm:px-9 lg:py-12">
            <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#168466]">Designed for movement</p>
            <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-[#0a382c] sm:text-5xl">The details parents notice. The polish clubs expect.</h3>
            <ul className="mt-7 grid gap-3 text-sm font-medium text-[#405b52] sm:grid-cols-2">
              <li className="flex items-center gap-2"><CheckIcon /> Four-way stretch</li>
              <li className="flex items-center gap-2"><CheckIcon /> UPF 50</li>
              <li className="flex items-center gap-2"><CheckIcon /> Wrinkle resistant</li>
              <li className="flex items-center gap-2"><CheckIcon /> Easy care</li>
              <li className="flex items-center gap-2"><CheckIcon /> Adjustable waists</li>
              <li className="flex items-center gap-2"><CheckIcon /> Anti-odor options</li>
            </ul>
            <a
              href={COURTSIDE_WHOLESALE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 self-start text-sm font-bold text-[#0b513f] underline decoration-[#0b513f]/25 underline-offset-4 hover:decoration-[#0b513f]"
            >
              Browse the wholesale collection <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#dfeee6]">
        <div className="absolute -right-28 -top-32 -z-10 h-96 w-96 rounded-full border-[70px] border-white/30" />
        <div className="absolute -bottom-44 left-[8%] -z-10 h-80 w-80 rounded-full border-[55px] border-[#78b89e]/18" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#0b7458]">Custom club embroidery</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-[#0a382c] sm:text-6xl">Make the collection unmistakably yours.</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#405b52] sm:text-lg sm:leading-8">
              Add your club mark to select Courtside Kids styles for junior programs, member gifting, tournaments, and an everyday shop assortment that feels unique to your property.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#0b513f]/12 bg-[#fbfaf6]/80 p-7 shadow-[0_24px_60px_rgba(17,43,36,0.1)] backdrop-blur-sm sm:p-9">
            <p className="font-display text-3xl font-semibold text-[#0a382c]">Let&apos;s build your club program.</p>
            <p className="mt-3 text-sm leading-6 text-[#556861]">
              We can help identify eligible styles and coordinate the details with Courtside Kids. Ask us about placement, minimums, and timing.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "club", size: "md", className: "gap-2 normal-case" })}
              >
                Talk to a representative <ArrowIcon />
              </a>
              <a
                href={inquiryEmail}
                className={buttonStyles({
                  variant: "secondary",
                  size: "md",
                  className: "border-[#0b513f]/30 bg-white/60 normal-case text-[#0b513f] hover:bg-[#0b513f]",
                })}
              >
                Email our team
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#168466]">Personal wholesale support</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-[#0a382c] sm:text-5xl">A straightforward way to bring Courtside Kids into your shop.</h2>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {buyerSteps.map((step, index) => (
            <li key={step.title} className="rounded-[1.5rem] border border-[#0b513f]/10 bg-white p-6 shadow-[0_14px_40px_rgba(17,43,36,0.055)] sm:p-7">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b513f] text-xs font-bold text-white">{index + 1}</span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-[#0a382c]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#556861]">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-[#0b513f]/10 bg-[#f4f1e9]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:px-10">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#168466]">Buyer FAQ</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-[#0a382c] sm:text-5xl">The details, made clear.</h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#556861]">
              Still have a question? Email us at{" "}
              <a className="font-semibold text-[#0b513f] underline decoration-[#0b513f]/25 underline-offset-4" href={inquiryEmail}>{CONTACT_EMAIL}</a>.
            </p>
          </div>

          <div className="divide-y divide-[#0b513f]/12 border-y border-[#0b513f]/12">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-xl font-semibold text-[#0a382c] marker:hidden sm:text-2xl">
                  {faq.question}
                  <span className="relative h-5 w-5 shrink-0 text-[#0b513f]">
                    <span className="absolute left-0 top-1/2 h-px w-5 bg-current" />
                    <span className="absolute left-1/2 top-0 h-5 w-px bg-current transition-transform group-open:rotate-90" />
                  </span>
                </summary>
                <p className="max-w-2xl pr-8 pt-4 text-sm leading-7 text-[#556861]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#0a382c] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(77,177,139,0.25),transparent_35%)]" />
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:py-28">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#9cd3bc]">Courtside Kids × Buttercup Bebe</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.98] sm:text-6xl">Ready to build a stronger junior assortment?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70">
            Meet with our team for a guided introduction or sign in to the Courtside Kids wholesale portal to begin your order.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "light", size: "lg", className: "gap-2 normal-case" })}
            >
              Talk to a representative <ArrowIcon />
            </a>
            <a
              href={COURTSIDE_WHOLESALE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "glass", size: "lg", className: "gap-2 normal-case" })}
            >
              Order wholesale <ArrowIcon />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/62">
            <a className="hover:text-white" href={`tel:${CONTACT_PHONE_LINKS.madi}`}>Madi: {CONTACT_PHONES.madi}</a>
            <a className="hover:text-white" href={`tel:${CONTACT_PHONE_LINKS.marci}`}>Marci: {CONTACT_PHONES.marci}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
