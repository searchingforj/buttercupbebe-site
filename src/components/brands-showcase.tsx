"use client";

import Image from "next/image";
import Link from "next/link";
import type { TouchEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button, buttonStyles } from "@/components/ui/button";
import type { Brand } from "@/data/brands";
import { BOOKING_URL } from "@/lib/constants";

type BrandsShowcaseProps = {
  brands: Brand[];
};

const FEATURED_BRAND_ORDER = [
  "bushel-and-a-peck",
  "courtside-kids",
  "little-paper-kids",
  "smockingbird",
  "yogababy",
] as const;

const HERO_IMAGE_BY_SLUG: Partial<Record<Brand["slug"], string>> = {
  "courtside-kids": "/brands/courtside-kids/hero-user-baseball-bat.webp",
  "bushel-and-a-peck": "/brands/bushel-and-a-peck/hero-fw26-731a7708.webp",
  "little-paper-kids": "/brands/little-paper-kids/hero-user-croquet.webp",
  smockingbird: "/brands/smockingbird/hero-website-jmf-0233.webp",
  yogababy: "/brands/yogababy/hero-website-img-8295.webp",
};

const MOBILE_HERO_IMAGE_BY_SLUG: Partial<Record<Brand["slug"], string>> = {
  "courtside-kids": "/brands/courtside-kids/2.webp",
  "little-paper-kids": "/brands/little-paper-kids/1.webp",
};

const HERO_IMAGE_POSITION_BY_SLUG: Partial<Record<Brand["slug"], string>> = {
  "courtside-kids": "center 46%",
  "bushel-and-a-peck": "center 68%",
  "little-paper-kids": "center 46%",
  smockingbird: "center 48%",
  yogababy: "center 50%",
};

const MOBILE_HERO_IMAGE_POSITION_BY_SLUG: Partial<Record<Brand["slug"], string>> = {
  "courtside-kids": "center 44%",
  "little-paper-kids": "center 52%",
};

const HERO_DESCRIPTION_BY_SLUG: Partial<Record<Brand["slug"], string>> = {
  smockingbird: "Classic children's pieces with handcrafted details and elevated prints.",
};

const HERO_CONTAINED_IMAGE_POSITION_BY_SLUG: Partial<Record<Brand["slug"], string>> = {};

const HERO_ROTATION_MS = 9000;
const MOBILE_HERO_ROTATION_MS = 7500;
const MOBILE_HERO_MEDIA_QUERY = "(max-width: 639px)";
const SWIPE_THRESHOLD_PX = 44;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const alphabeticalBrandOrder = (brands: Brand[]) =>
  [...brands].sort((firstBrand, secondBrand) =>
    firstBrand.name.localeCompare(secondBrand.name, undefined, { sensitivity: "base" }),
  );

const orderFeaturedBrands = (brands: Brand[]) =>
  FEATURED_BRAND_ORDER.map((slug) => brands.find((brand) => brand.slug === slug)).filter(
    Boolean,
  ) as Brand[];

const heroImageFor = (brand: Brand) => HERO_IMAGE_BY_SLUG[brand.slug] ?? brand.images[0];
const mobileHeroImageFor = (brand: Brand) => MOBILE_HERO_IMAGE_BY_SLUG[brand.slug] ?? heroImageFor(brand);
const heroImagePositionFor = (brand: Brand) =>
  HERO_IMAGE_POSITION_BY_SLUG[brand.slug] ?? "center center";
const mobileHeroImagePositionFor = (brand: Brand) =>
  MOBILE_HERO_IMAGE_POSITION_BY_SLUG[brand.slug] ?? heroImagePositionFor(brand);
const heroDescriptionFor = (brand: Brand) =>
  HERO_DESCRIPTION_BY_SLUG[brand.slug] ?? brand.oneLiner;
const heroContainedImagePositionFor = (brand: Brand) =>
  HERO_CONTAINED_IMAGE_POSITION_BY_SLUG[brand.slug] ?? "center center";
const usesContainedHeroImage = (brand: Brand) => Boolean(HERO_CONTAINED_IMAGE_POSITION_BY_SLUG[brand.slug]);

function ThumbnailStrip({
  brand,
  activeImageIndex,
  onSelect,
}: {
  brand: Brand;
  activeImageIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex max-w-full items-center gap-2 overflow-x-auto px-4 py-2 sm:px-5 sm:py-3">
      {brand.images.map((image, index) => (
        <button
          key={`${brand.slug}-${image}`}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`View ${brand.name} image ${index + 1}`}
          className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition sm:h-16 sm:w-16 ${
            activeImageIndex === index
              ? "border-[var(--accent-strong)] shadow-[0_0_0_2px_var(--accent-soft)]"
              : "border-[var(--border-soft)] opacity-72 hover:opacity-100"
          }`}
        >
          <Image
            src={image}
            alt=""
            fill
            unoptimized
            decoding="async"
            className="object-cover"
            sizes="64px"
          />
        </button>
      ))}
    </div>
  );
}

export function BrandsShowcase({ brands }: BrandsShowcaseProps) {
  const [activeBrand, setActiveBrand] = useState<Brand | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [heroRotationResetKey, setHeroRotationResetKey] = useState(0);
  const [isMobileHeroLayout, setIsMobileHeroLayout] = useState(false);
  const [hiddenLogoSlugs, setHiddenLogoSlugs] = useState<Record<string, true>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const heroTouchStartX = useRef<number | null>(null);
  const heroTouchDidSwipe = useRef(false);
  const galleryTouchStartX = useRef<number | null>(null);

  const orderedBrands = useMemo(() => alphabeticalBrandOrder(brands), [brands]);
  const featuredBrands = useMemo(() => orderFeaturedBrands(brands), [brands]);
  const activeHeroBrand = featuredBrands[activeSlideIndex] ?? featuredBrands[0];
  const activeImageCount = activeBrand?.images.length ?? 0;

  const resetHeroRotation = useCallback(() => {
    setHeroRotationResetKey((currentKey) => currentKey + 1);
  }, []);

  const closeModal = useCallback(() => {
    setActiveBrand(null);
    setActiveImageIndex(0);
  }, []);

  const advanceHeroSlide = useCallback(
    (direction: "next" | "previous") => {
      resetHeroRotation();
      setActiveSlideIndex((currentIndex) => {
        if (!featuredBrands.length) {
          return currentIndex;
        }

        const offset = direction === "next" ? 1 : -1;
        return (currentIndex + offset + featuredBrands.length) % featuredBrands.length;
      });
    },
    [featuredBrands.length, resetHeroRotation],
  );

  const advanceImage = useCallback(
    (direction: "next" | "previous") => {
      if (!activeImageCount) {
        return;
      }

      setActiveImageIndex((currentIndex) => {
        const maxIndex = activeImageCount - 1;

        if (direction === "next") {
          return currentIndex === maxIndex ? 0 : currentIndex + 1;
        }

        return currentIndex === 0 ? maxIndex : currentIndex - 1;
      });
    },
    [activeImageCount],
  );

  const openBrandModal = (brand: Brand) => {
    setActiveBrand(brand);
    setActiveImageIndex(0);
  };

  const hideLogo = (slug: string) => {
    setHiddenLogoSlugs((current) => {
      if (current[slug]) {
        return current;
      }

      return { ...current, [slug]: true };
    });
  };

  const handleGalleryTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    galleryTouchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleGalleryTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (galleryTouchStartX.current === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - galleryTouchStartX.current;
    galleryTouchStartX.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD_PX) {
      return;
    }

    advanceImage(distance < 0 ? "next" : "previous");
  };

  const handleHeroTouchStart = (event: TouchEvent<HTMLElement>) => {
    heroTouchStartX.current = event.changedTouches[0]?.clientX ?? null;
    heroTouchDidSwipe.current = false;
  };

  const handleHeroTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (heroTouchStartX.current === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - heroTouchStartX.current;
    heroTouchStartX.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD_PX) {
      return;
    }

    heroTouchDidSwipe.current = true;
    advanceHeroSlide(distance < 0 ? "next" : "previous");
  };

  const handleMobileHeroClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!activeHeroBrand || !window.matchMedia(MOBILE_HERO_MEDIA_QUERY).matches) {
      return;
    }

    if (heroTouchDidSwipe.current) {
      heroTouchDidSwipe.current = false;
      return;
    }

    if ((event.target as HTMLElement).closest("a, button")) {
      return;
    }

    openBrandModal(activeHeroBrand);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_HERO_MEDIA_QUERY);
    const updateMobileHeroLayout = () => setIsMobileHeroLayout(mediaQuery.matches);

    updateMobileHeroLayout();
    mediaQuery.addEventListener("change", updateMobileHeroLayout);

    return () => mediaQuery.removeEventListener("change", updateMobileHeroLayout);
  }, []);

  useEffect(() => {
    if (featuredBrands.length < 2) {
      return;
    }

    const rotation = window.setTimeout(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % featuredBrands.length);
    }, isMobileHeroLayout ? MOBILE_HERO_ROTATION_MS : HERO_ROTATION_MS);

    return () => window.clearTimeout(rotation);
  }, [activeSlideIndex, featuredBrands.length, heroRotationResetKey, isMobileHeroLayout]);

  useEffect(() => {
    if (!activeBrand || !modalRef.current) {
      return;
    }

    previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const modalElement = modalRef.current;
    const focusableElements = Array.from(
      modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );

    focusableElements[0]?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        advanceImage("next");
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        advanceImage("previous");
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const interactiveElements = Array.from(
        modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!interactiveElements.length) {
        return;
      }

      const firstElement = interactiveElements[0];
      const lastElement = interactiveElements[interactiveElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = originalOverflow;
      previouslyFocusedElement.current?.focus();
    };
  }, [activeBrand, advanceImage, closeModal]);

  const activeOrderUrl = activeBrand?.orderUrl?.trim() ? activeBrand.orderUrl : "/contact";
  const isOrderUrlExternal = activeOrderUrl.startsWith("http://") || activeOrderUrl.startsWith("https://");

  return (
    <>
      <section
        className="relative cursor-pointer overflow-hidden bg-[var(--surface-strong)] sm:cursor-default"
        onClick={handleMobileHeroClick}
        onTouchStart={handleHeroTouchStart}
        onTouchEnd={handleHeroTouchEnd}
      >
        <div className="relative min-h-[500px] sm:min-h-[610px] lg:min-h-[680px]">
          {featuredBrands.map((brand, index) => {
            const isActive = activeSlideIndex === index;
            const heroImage = isMobileHeroLayout ? mobileHeroImageFor(brand) : heroImageFor(brand);
            const heroImagePosition = isMobileHeroLayout
              ? mobileHeroImagePositionFor(brand)
              : heroImagePositionFor(brand);
            const usesContainedImage = usesContainedHeroImage(brand);

            return (
              <div
                key={brand.slug}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                {usesContainedImage ? (
                  <>
                    <Image
                      src={heroImage}
                      alt=""
                      fill
                      priority={index === 0}
                      quality={92}
                      decoding="async"
                      className="scale-110 object-cover opacity-55 blur-2xl"
                      sizes="100vw"
                      style={{ objectPosition: heroImagePosition }}
                    />
                    <div className="absolute inset-0 bg-[rgba(18,16,14,0.18)]" />
                  </>
                ) : null}
                <Image
                  src={heroImage}
                  alt={`${brand.name} featured collection`}
                  fill
                  priority={index === 0}
                  quality={92}
                  decoding="async"
                  className={`transition-transform duration-[9000ms] ease-out ${
                    usesContainedImage ? "object-contain" : "object-cover"
                  } ${isActive ? "scale-[1.018]" : "scale-100"}`}
                  sizes="100vw"
                  style={{
                    objectPosition: usesContainedImage
                      ? heroContainedImagePositionFor(brand)
                      : heroImagePosition,
                  }}
                />
              </div>
            );
          })}

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,21,18,0.76)_0%,rgba(24,21,18,0.45)_48%,rgba(24,21,18,0.08)_100%)]" />

          <button
            type="button"
            onClick={() => advanceHeroSlide("previous")}
            aria-label="Show previous featured brand"
            className="absolute left-3 top-[27%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/18 text-xl text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:bg-white/28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5 sm:top-1/2 sm:flex lg:left-8"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => advanceHeroSlide("next")}
            aria-label="Show next featured brand"
            className="absolute right-3 top-[27%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/18 text-xl text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:bg-white/28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:top-1/2 sm:flex lg:right-8"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {activeHeroBrand ? (
            <div className="relative z-10 flex min-h-[500px] items-end sm:min-h-[610px] lg:min-h-[680px]">
              <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:px-6 sm:pb-12 lg:px-10 lg:pb-16">
                <div className="max-w-2xl space-y-3 text-white sm:space-y-5">
                  <p className="text-sm font-semibold text-white/84 sm:text-base">Featured Brands</p>
                  <h1 className="font-display text-4xl leading-[0.98] sm:text-6xl lg:text-7xl">
                    {activeHeroBrand.name}
                  </h1>
                  <p className="hidden max-w-xl text-base leading-8 text-white/86 sm:block sm:text-lg">
                    {heroDescriptionFor(activeHeroBrand)}
                  </p>
                  <div className="flex flex-wrap items-start gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => openBrandModal(activeHeroBrand)}
                      className={`${buttonStyles({
                        variant: "light",
                        size: "lg",
                      })} max-sm:!hidden sm:inline-flex`}
                    >
                      View Brand
                    </button>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${buttonStyles({
                        variant: "glass",
                        size: "md",
                      })} px-4 py-2 text-[0.66rem] sm:px-6 sm:py-3 sm:text-[0.78rem]`}
                    >
                      Book Appointment
                    </a>
                    <a
                      href="#brands-section"
                      className={`${buttonStyles({
                        variant: "glass",
                        size: "lg",
                      })} group relative overflow-hidden max-sm:!hidden sm:inline-flex`}
                    >
                      <span>Browse All Brands</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="absolute bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 text-white/72 transition group-hover:translate-y-0.5 group-hover:text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div
          id="brands-section"
          className="mb-8 scroll-mt-32 flex flex-wrap items-end justify-between gap-4 sm:mb-10 sm:scroll-mt-36"
        >
          <div className="max-w-2xl space-y-3">
            <p className="section-eyebrow">Brands</p>
            <h2 className="font-display text-4xl leading-tight text-[var(--ink-strong)] sm:text-5xl">
              Browse the line mix.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
              Explore a curated showroom assortment, then open any brand for quick ordering support and appointment
              booking.
            </p>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "secondary", size: "md" })}
          >
            Book Appointment
          </a>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {orderedBrands.map((brand) => {
            const hasLogo = Boolean(brand.logoUrl?.trim()) && !hiddenLogoSlugs[brand.slug];

            return (
              <article
                id={`brand-${brand.slug}`}
                key={brand.slug}
                className="group relative cursor-pointer overflow-hidden rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface)] shadow-[0_18px_42px_rgba(37,31,24,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_24px_58px_rgba(37,31,24,0.13)]"
                onClick={() => openBrandModal(brand)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openBrandModal(brand);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open details for ${brand.name}`}
              >
                <div className="relative aspect-[5/6] overflow-hidden bg-[var(--surface-strong)]">
                  <Image
                    src={brand.images[0]}
                    alt={`${brand.name} collection preview`}
                    fill
                    unoptimized
                    decoding="async"
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.035]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[rgba(28,24,20,0.13)] opacity-0 transition duration-300 group-hover:opacity-100" />
                </div>

                <div className="border-t border-[var(--border-soft)] bg-[var(--surface)] px-5 py-4">
                  {hasLogo ? (
                    <div className="h-20 w-full px-1 py-1">
                      <Image
                        src={brand.logoUrl!}
                        alt={`${brand.name} logo`}
                        width={700}
                        height={220}
                        className="h-full w-full object-contain"
                        onError={() => hideLogo(brand.slug)}
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-full items-center justify-center px-1 py-1">
                      <h3 className="line-clamp-2 text-center font-display text-3xl leading-none text-[var(--ink-strong)]">
                        {brand.name}
                      </h3>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {activeBrand ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-[rgba(18,16,14,0.64)] p-3 backdrop-blur-sm sm:items-center sm:p-4"
          style={{ paddingTop: "max(1.5rem, calc(env(safe-area-inset-top) + 0.75rem))" }}
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            aria-describedby="quick-view-description"
            className="relative max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-6xl overflow-hidden rounded-[24px] border border-white/35 bg-[var(--surface)] shadow-[0_30px_80px_rgba(12,10,8,0.35)] sm:max-h-[94vh] sm:w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={closeModal}
              aria-label="Close quick view"
              className="absolute right-3 top-3 z-20 bg-[rgba(255,255,255,0.88)] shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur-md"
            >
              Close
            </Button>

            <div className="grid max-h-[92dvh] min-w-0 overflow-y-auto lg:grid-cols-[minmax(0,1.18fr)_minmax(340px,0.82fr)]">
              <div className="min-w-0 bg-[var(--surface)]">
                <div
                  className="group relative h-[55vh] min-h-[360px] overflow-hidden bg-[var(--surface-strong)] sm:h-[62vh] lg:h-[620px] lg:min-h-0"
                  onTouchStart={handleGalleryTouchStart}
                  onTouchEnd={handleGalleryTouchEnd}
                >
                  <Image
                    src={activeBrand.images[activeImageIndex]}
                    alt={`${activeBrand.name} image ${activeImageIndex + 1}`}
                    fill
                    unoptimized
                    decoding="async"
                    className="object-cover"
                    sizes="(max-width: 640px) 96vw, (max-width: 1024px) 92vw, (max-width: 1280px) 64vw, 720px"
                    loading="eager"
                    fetchPriority="high"
                  />

                  {activeBrand.images.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => advanceImage("previous")}
                        aria-label="View previous image"
                        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/25 text-xl text-white opacity-100 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:bg-white/38 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <span aria-hidden="true">&larr;</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => advanceImage("next")}
                        aria-label="View next image"
                        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/25 text-xl text-white opacity-100 shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:bg-white/38 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <span aria-hidden="true">&rarr;</span>
                      </button>
                    </>
                  ) : null}
                </div>

                {activeBrand.images.length > 1 ? (
                  <ThumbnailStrip
                    brand={activeBrand}
                    activeImageIndex={activeImageIndex}
                    onSelect={setActiveImageIndex}
                  />
                ) : null}
              </div>

              <div className="flex min-h-full min-w-0 flex-col justify-start px-6 py-5 sm:px-8 sm:py-8 lg:justify-center lg:px-10">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <h2
                      id="quick-view-title"
                      className="font-display text-4xl leading-tight text-[var(--ink-strong)] sm:text-5xl"
                    >
                      {activeBrand.name}
                    </h2>
                    <p id="quick-view-description" className="text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
                      {activeBrand.oneLiner}
                    </p>
                    {activeBrand.orderAccessNote ? (
                      <p className="whitespace-pre-line rounded-xl border border-[var(--border-soft)] bg-[var(--surface-strong)] px-3 py-2 text-xs leading-6 text-[var(--ink-strong)]">
                        {activeBrand.orderAccessNote}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles({ variant: "primary", size: "md" })}
                    >
                      Book Appointment
                    </a>
                    {isOrderUrlExternal ? (
                      <a
                        href={activeOrderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonStyles({ variant: "secondary", size: "md" })}
                      >
                        Order Now
                      </a>
                    ) : (
                      <Link href={activeOrderUrl} className={buttonStyles({ variant: "secondary", size: "md" })}>
                        Order Now
                      </Link>
                    )}
                    <Link href="/contact" className={buttonStyles({ variant: "secondary", size: "md" })}>
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
