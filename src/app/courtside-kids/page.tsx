import type { Metadata } from "next";
import Image from "next/image";

import { ClubCampaignVideo } from "@/components/club-campaign-video";
import { ClubLookbookCarousel } from "@/components/club-lookbook-carousel";
import { buttonStyles } from "@/components/ui/button";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_LINKS,
  CONTACT_PHONES,
} from "@/lib/constants";

const GOLF_DIGEST_URL = "https://www.golfdigest.com/story/toddler-little-kid-golf-gear";

export const metadata: Metadata = {
  title: "Courtside Kids for Golf & Country Clubs",
  description:
    "Discover Courtside Kids performance apparel, custom club embroidery, and wholesale support for golf shops, pro shops, and country clubs.",
  alternates: {
    canonical: "/courtside-kids",
  },
  openGraph: {
    title: "Courtside Kids for Golf & Country Clubs",
    description:
      "A Golf Digest-featured kids' activewear line for golf shops, pro shops, and country clubs.",
    type: "website",
  },
};

const lookbookSlides = [
  {
    src: "/brands/courtside-kids/clubs/editorial/boys-performance.webp",
    alt: "Two boys wearing colorful Courtside Kids performance polos and shorts",
    label: "Performance polos",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/club-classics.webp",
    alt: "Boys and girls wearing classic navy, white, and khaki Courtside Kids outfits",
    label: "Club classics",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/junior-golfer-putting.webp",
    alt: "Boy in a green Courtside Kids polo putting on a golf green",
    label: "For the course",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/tennis-portrait.webp",
    alt: "Girl in a navy and white Courtside Kids tennis dress",
    label: "Tennis dress",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/girls-tennis.webp",
    alt: "Girls in Courtside Kids tennis outfits relaxing beside a racquet",
    label: "Girls' tennis",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/junior-golfer-with-bag.webp",
    alt: "Boy in a Courtside Kids polo and shorts standing beside a golf bag",
    label: "Junior golf",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/marina-club-style.webp",
    alt: "Boy and girl wearing coordinated Courtside Kids outfits at a marina",
    label: "Club days",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/boys-tennis-court.webp",
    alt: "Two boys wearing Courtside Kids performance apparel beside a tennis court",
    label: "Between matches",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/boy-in-motion.webp",
    alt: "Boy moving in a Courtside Kids polo and performance shorts",
    label: "Made to move",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/baby-golf.webp",
    alt: "Baby girl in a pink Courtside Kids outfit holding a golf ball",
    label: "The youngest golfers",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/summer-group.webp",
    alt: "Boys and girls in a colorful range of Courtside Kids club attire",
    label: "Boys & girls",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/girls-pink-performance.webp",
    alt: "Girl wearing a pink Courtside Kids performance set and bucket hat",
    label: "Girls' performance",
    position: "center",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/girls-tennis-campaign.webp",
    alt: "Girls in pastel Courtside Kids tennis outfits on a clay court",
    label: "Girls' racquet",
    position: "center 35%",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/little-golfer.webp",
    alt: "Young boy wearing a blue gingham Courtside Kids polo and white shorts on the course",
    label: "Golf ready",
    position: "center 25%",
  },
  {
    src: "/brands/courtside-kids/clubs/editorial/girls-pastel.webp",
    alt: "Girls wearing pastel Courtside Kids performance outfits",
    label: "Pastel performance",
    position: "center 25%",
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
      "Yes. Courtside Kids can embroider your club's logo, crest, or emblem to create a distinctive custom assortment. Contact our team to discuss the details, minimums, and timing.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Email our team or schedule a conversation with us. We will answer questions, help you plan the right assortment, and coordinate your order directly.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CourtsideKidsForClubsPage() {
  const inquiryEmail = `mailto:${CONTACT_EMAIL}?subject=Courtside%20Kids%20for%20our%20club`;

  return (
    <div className="overflow-hidden bg-[#f7f6f1] text-[#112b24] selection:bg-[#b8dfce] selection:text-[#092f24]">
      <section className="relative isolate border-b border-[#0b513f]/10">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#edf2e9_0%,#f7f6f1_68%)]" />
        <div className="mx-auto flex max-w-7xl flex-col px-4 py-9 sm:px-6 sm:py-12 lg:px-10 lg:py-14">
          <div className="order-2 grid gap-8 lg:order-1 lg:grid-cols-[1.02fr_0.98fr] lg:items-end lg:gap-16">
            <div>
              <div className="mb-5 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#0b7458]">
                <span>01</span>
                <span className="h-px w-10 bg-[#0b7458]/55" />
                <span>Courtside Kids × Buttercup Bebe</span>
              </div>
              <Image
                src="/brand-logos/courtside-kids.png"
                alt="Courtside Kids"
                width={478}
                height={158}
                priority
                className="mb-6 h-auto w-[210px] sm:w-[245px]"
              />
              <h1 className="max-w-3xl font-display text-[3rem] font-semibold leading-[0.94] tracking-[-0.035em] text-[#0a382c] sm:text-[3.8rem] lg:text-[4.15rem]">
                Kids&apos; activewear that earns its place in the shop.
              </h1>
            </div>

            <div className="lg:pb-1">
              <p className="max-w-xl text-base leading-7 text-[#4f625c] sm:text-lg sm:leading-8">
                Courtside Kids pairs polished style with performance fabrics kids want to wear. It is an especially strong fit for golf shops, pro shops, and country club retail.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({ variant: "club", size: "lg", className: "gap-2 !rounded-none normal-case" })}
                >
                  Talk to a representative <ArrowIcon />
                </a>
                <a
                  href={inquiryEmail}
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                    className:
                      "gap-2 !rounded-none border-[#0b513f]/35 bg-transparent normal-case text-[#0b513f] hover:border-[#0b513f] hover:bg-[#0b513f]",
                  })}
                >
                  Email our team <ArrowIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 mb-8 grid grid-cols-2 gap-px border border-[#0b513f]/18 bg-[#0b513f]/18 lg:order-2 lg:mb-0 lg:mt-10 lg:h-[440px] lg:grid-cols-[1.265fr_0.713fr_0.759fr]">
            <figure className="group relative col-span-2 aspect-[5/4] overflow-hidden bg-[#e5e2da] lg:col-span-1 lg:aspect-auto">
              <Image
                src="/brands/courtside-kids/clubs/editorial/club-crew.webp"
                alt="Boys and girls wearing a colorful range of Courtside Kids club attire"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
              />
            </figure>
            <figure className="group relative aspect-[5/7] overflow-hidden bg-[#e5e2da] lg:aspect-auto">
              <Image
                src="/brands/courtside-kids/clubs/editorial/hero-golf-boy.webp"
                alt="Boy in a Courtside Kids gingham polo and khaki shorts with a golf club"
                fill
                priority
                sizes="(max-width: 1024px) 46vw, 26vw"
                className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.02]"
              />
            </figure>
            <figure className="group relative aspect-[5/7] overflow-hidden bg-[#e5e2da] lg:aspect-auto">
              <Image
                src="/brands/courtside-kids/clubs/editorial/hero-golf-girl.webp"
                alt="Girl wearing a green striped Courtside Kids golf outfit on the course"
                fill
                priority
                sizes="(max-width: 1024px) 46vw, 28vw"
                className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.02]"
              />
            </figure>
          </div>
        </div>
      </section>

      <section id="golf-digest" className="scroll-mt-24 border-b border-[#0b513f]/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-9 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:gap-14 lg:px-10 lg:py-16">
          <div className="mx-auto w-full max-w-[440px] overflow-hidden border border-[#0b513f]/18 bg-[#f4f1e9] lg:mx-0">
            <Image
              src="/brands/courtside-kids/clubs/golf-digest-feature.png"
              alt="Courtside Kids announcement celebrating its Golf Digest feature"
              width={1194}
              height={1584}
              className="h-auto w-full"
            />
          </div>

          <div className="max-w-2xl lg:border-l lg:border-[#0b513f]/18 lg:py-5 lg:pl-12">
            <div className="mb-5 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#168466]">
              <span>02</span><span className="h-px w-10 bg-[#168466]/55" /><span>Press note</span>
            </div>
            <h2 className="font-display text-4xl font-semibold leading-[1.01] text-[#0a382c] sm:text-6xl">
              Featured by Golf Digest
            </h2>
            <p className="mt-6 text-base leading-7 text-[#556861] sm:text-lg sm:leading-8">
              Golf Digest highlighted Courtside Kids for its quality, versatility, and ability to keep up both on and off the course.
            </p>
            <a
              href={GOLF_DIGEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 border-b border-[#0b513f] pb-1 text-sm font-bold text-[#0b513f] transition hover:gap-3"
            >
              Read the Golf Digest feature <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section id="lookbook" className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto mb-8 grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-10">
          <div>
            <div className="flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#168466]">
              <span>03</span><span className="h-px w-10 bg-[#168466]/55" /><span>The collection</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-[#0a382c] sm:text-5xl">From first tee to match point.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#556861] lg:justify-self-end">
            Coordinated pieces for boys and girls, with the comfort and polish to move through the whole day.
          </p>
        </div>

        <ClubLookbookCarousel slides={lookbookSlides} />

        <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-6 lg:px-10">
          <ClubCampaignVideo />

          <figure className="group relative aspect-[4/5] overflow-hidden bg-[#e7e3dc]">
            <Image
              src="/brands/courtside-kids/clubs/editorial/full-range.webp"
              alt="Children of several ages wearing Courtside Kids activewear"
              fill
              sizes="(max-width: 1024px) 92vw, 42vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
              style={{ objectPosition: "center 28%" }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#082e24]/68 via-[#082e24]/10 to-transparent px-6 pb-6 pt-24 text-white">
              <figcaption className="font-display text-3xl font-semibold">A complete junior assortment.</figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section className="border-y border-[#0b513f]/10 bg-[#dfeee6]">
        <div className="mx-auto grid max-w-7xl gap-9 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:px-10 lg:py-16">
          <figure className="relative aspect-[4/3] overflow-hidden border border-[#0b513f]/18 bg-[#e7e3dc] lg:aspect-[4/4.2]">
            <Image
              src="/brands/courtside-kids/clubs/editorial/embroiderable-polo.webp"
              alt="Close-up of a blue Courtside Kids polo"
              fill
              sizes="(max-width: 1024px) 92vw, 42vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
            <figcaption className="absolute bottom-0 left-0 bg-[#0a382c] px-5 py-3 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white sm:px-6">
              Add your club crest
            </figcaption>
          </figure>

          <div>
            <div className="flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#0b7458]">
              <span>04</span><span className="h-px w-10 bg-[#0b7458]/55" /><span>Custom club embroidery</span>
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.99] text-[#0a382c] sm:text-6xl">
              Make it your club&apos;s.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#405b52] sm:text-lg sm:leading-8">
              Courtside Kids can customize the collection with your club&apos;s logo, crest, or emblem, bringing a distinctive, elevated look to your junior assortment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "club", size: "lg", className: "gap-2 !rounded-none normal-case" })}
              >
                Talk to a representative <ArrowIcon />
              </a>
              <a
                href={inquiryEmail}
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                  className: "!rounded-none border-[#0b513f]/30 bg-white/70 normal-case text-[#0b513f] hover:bg-[#0b513f]",
                })}
              >
                Email our team
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f1e9]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[0.72fr_1.28fr] lg:px-10 lg:py-16">
          <div>
            <div className="flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#168466]">
              <span>05</span><span className="h-px w-10 bg-[#168466]/55" /><span>Buyer FAQ</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] text-[#0a382c] sm:text-5xl">A few useful details.</h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#556861]">
              Have another question? Email us at{" "}
              <a className="font-semibold text-[#0b513f] underline decoration-[#0b513f]/25 underline-offset-4" href={inquiryEmail}>{CONTACT_EMAIL}</a>.
            </p>
          </div>

          <div className="divide-y divide-[#0b513f]/12 border-y border-[#0b513f]/12">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
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
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
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
              className={buttonStyles({ variant: "light", size: "lg", className: "gap-2 !rounded-none normal-case" })}
            >
              Talk to a representative <ArrowIcon />
            </a>
            <a
              href={inquiryEmail}
              className={buttonStyles({ variant: "glass", size: "lg", className: "gap-2 !rounded-none normal-case" })}
            >
              Email our team <ArrowIcon />
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
