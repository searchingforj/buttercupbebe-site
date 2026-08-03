import type { Metadata } from "next";
import Image from "next/image";

import { ClubLookbookCarousel } from "@/components/club-lookbook-carousel";
import { buttonStyles } from "@/components/ui/button";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_LINKS,
  CONTACT_PHONES,
  COURTSIDE_WHOLESALE_URL,
} from "@/lib/constants";

const GOLF_DIGEST_URL = "https://www.golfdigest.com/story/toddler-little-kid-golf-gear";

export const metadata: Metadata = {
  title: "Courtside Kids for Golf & Country Clubs",
  description:
    "Discover Courtside Kids performance apparel, custom club embroidery, and wholesale support for golf shops, pro shops, and country clubs.",
  openGraph: {
    title: "Courtside Kids for Golf & Country Clubs",
    description:
      "A Golf Digest-featured kids' activewear line for golf shops, pro shops, and country clubs.",
    type: "website",
  },
};

const lookbookSlides = [
  {
    src: "/brands/courtside-kids/clubs/gallery/history-of-sport.jpg",
    alt: "Boys and girls wearing Courtside Kids activewear in a clubhouse setting",
    label: "Boys & girls",
    position: "center 45%",
  },
  {
    src: "/brands/courtside-kids/clubs/girls-golf-look.jpg",
    alt: "Girl wearing a green striped Courtside Kids outfit and holding a golf ball",
    label: "For the course",
    position: "center 42%",
  },
  {
    src: "/brands/courtside-kids/clubs/gallery/boys-in-motion.jpg",
    alt: "Boys moving in Courtside Kids performance shirts and shorts",
    label: "Built to move",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/gallery/khaki-short-logo.jpg",
    alt: "Close-up of khaki Courtside Kids performance shorts with embroidered logo",
    label: "Embroidery ready",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/gallery/blue-seersucker-short.jpg",
    alt: "Close-up of blue striped Courtside Kids performance shorts",
    label: "Polished details",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/3.webp",
    alt: "Boy wearing a striped Courtside Kids polo and performance shorts",
    label: "Everyday performance",
    position: "center 42%",
  },
] as const;

const faqs = [
  {
    question: "Why is this page on the Buttercup Bebe website?",
    answer:
      "Buttercup Bebe is the wholesale representative for Courtside Kids. We introduce the collection, help buyers select an assortment, and support the wholesale ordering process.",
  },
  {
    question: "Can Courtside Kids add our club logo?",
    answer:
      "Yes. Custom club embroidery is available on select styles. Contact our team to discuss eligible products, placement, minimums, and timing.",
  },
  {
    question: "Can I order directly online?",
    answer:
      "Yes. Approved wholesale buyers can sign in to the Courtside Kids wholesale portal. If you are new to the line, we can help you get set up and plan an opening order.",
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
        <div className="absolute inset-x-0 top-0 -z-10 h-[72%] bg-[radial-gradient(circle_at_14%_4%,rgba(156,211,188,0.32),transparent_44%),linear-gradient(180deg,#f4f1e8_0%,#fbfaf6_100%)]" />
        <div className="mx-auto grid min-h-[calc(100svh-82px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:px-10 lg:py-20">
          <div className="relative z-10 max-w-xl">
            <p className="mb-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#0b7458]">
              Courtside Kids × Buttercup Bebe
            </p>
            <Image
              src="/brand-logos/courtside-kids.png"
              alt="Courtside Kids"
              width={478}
              height={158}
              priority
              className="mb-7 h-auto w-[235px] sm:w-[285px]"
            />
            <h1 className="font-display text-[3.35rem] font-semibold leading-[0.92] tracking-[-0.035em] text-[#0a382c] sm:text-[4.55rem] lg:text-[5.15rem]">
              Kids&apos; activewear that earns its place in the shop.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#4f625c] sm:text-lg sm:leading-8">
              Courtside Kids combines polished style with performance fabrics kids want to wear. The line performs especially well in golf shops, pro shops, and country club retail.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "club", size: "lg", className: "gap-2 normal-case" })}
              >
                Talk to a representative <ArrowIcon />
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
                Order wholesale <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[680px] lg:mx-0">
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[2rem] bg-[#e5e2da] shadow-[0_34px_90px_rgba(17,43,36,0.17)] sm:aspect-[5/4.55] lg:aspect-[4/4.35]">
              <Image
                src="/brands/courtside-kids/1.webp"
                alt="Children wearing coordinated Courtside Kids activewear"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover"
                style={{ objectPosition: "center 48%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082e24]/30 via-transparent to-transparent" />
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

      <section className="border-b border-[#0b513f]/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-[1.5rem] border border-[#0b513f]/10 bg-[#f4f1e9] p-2 shadow-[0_22px_60px_rgba(17,43,36,0.1)] lg:mx-0">
            <Image
              src="/brands/courtside-kids/clubs/golf-digest-feature.png"
              alt="Courtside Kids announcement celebrating its Golf Digest feature"
              width={1194}
              height={1584}
              className="h-auto w-full rounded-[1.1rem]"
            />
          </div>

          <div className="max-w-2xl">
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#168466]">Featured by Golf Digest</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.01] text-[#0a382c] sm:text-6xl">
              One of seven great products for the youngest golfers.
            </h2>
            <p className="mt-6 text-base leading-7 text-[#556861] sm:text-lg sm:leading-8">
              Golf Digest highlighted the Courtside Kids Khaki Super Short for its quality, versatility, and ability to keep up both on and off the course.
            </p>
            <a
              href={GOLF_DIGEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0b513f] underline decoration-[#0b513f]/25 underline-offset-4 hover:decoration-[#0b513f]"
            >
              Read the Golf Digest feature <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section id="lookbook" className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto mb-10 grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-10">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#168466]">The collection</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-[#0a382c] sm:text-5xl">See why it works.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#556861] lg:justify-self-end">
            Coordinated pieces for boys and girls, designed to move, wash well, and still look polished around the club.
          </p>
        </div>

        <ClubLookbookCarousel slides={lookbookSlides} />

        <div className="mx-auto mt-10 grid max-w-7xl gap-3 px-4 text-sm font-semibold text-[#405b52] sm:grid-cols-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 rounded-full border border-[#0b513f]/10 bg-white px-5 py-3"><CheckIcon /> Boys&apos; and girls&apos; assortments</div>
          <div className="flex items-center gap-3 rounded-full border border-[#0b513f]/10 bg-white px-5 py-3"><CheckIcon /> Easy-care performance fabrics</div>
          <div className="flex items-center gap-3 rounded-full border border-[#0b513f]/10 bg-white px-5 py-3"><CheckIcon /> Custom embroidery available</div>
        </div>
      </section>

      <section className="border-y border-[#0b513f]/10 bg-[#dfeee6]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#0b7458]">Custom club embroidery</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.99] text-[#0a382c] sm:text-6xl">
              Your logo on pieces kids will actually wear.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#405b52] sm:text-lg sm:leading-8">
              Courtside Kids already provides custom embroidery for club partners. We can help identify eligible styles and coordinate placement, minimums, and timing.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#0b513f]/12 bg-[#fbfaf6]/85 p-7 shadow-[0_24px_60px_rgba(17,43,36,0.1)] sm:p-9">
            <p className="font-display text-3xl font-semibold text-[#0a382c]">Ask about your club program.</p>
            <p className="mt-3 text-sm leading-6 text-[#556861]">We will help you find the right pieces and build a focused first order.</p>
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
                  className: "border-[#0b513f]/30 bg-white/70 normal-case text-[#0b513f] hover:bg-[#0b513f]",
                })}
              >
                Email our team
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f1e9]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:px-10 lg:py-24">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#168466]">Buyer FAQ</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-[#0a382c] sm:text-5xl">A few useful details.</h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#556861]">
              Have another question? Email us at{" "}
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
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#9cd3bc]">Courtside Kids × Buttercup Bebe</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.98] sm:text-6xl">Interested in Courtside Kids?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70">
            Talk with us about the collection, custom embroidery, or your first wholesale order.
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
