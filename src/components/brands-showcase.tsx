"use client";

import Image from "next/image";
import Link from "next/link";
import type { TouchEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import type { Brand } from "@/data/brands";
import { BOOKING_URL } from "@/lib/constants";
import { imageDetails } from "@/lib/image-loader";
import { canPrefetchImages, GALLERY_SIZES, prepareImage } from "@/lib/prepare-image";

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
  "little-paper-kids": "/brands/little-paper-kids/hero-shop-bottoms.webp",
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
  "little-paper-kids": "center top",
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

const BRAND_CARD_IMAGE_POSITION_BY_SLUG: Partial<Record<Brand["slug"], string>> = {
  "nella-june": "47% center",
};

const BRAND_LOGO_SCALE_BY_SLUG: Partial<Record<Brand["slug"], number>> = {
  "american-jewel": 1.12,
  "cape-point-co": 1.14,
  "eight-thousand-miles": 1.14,
  "glitter-option": 1.1,
  larili: 1.14,
  "little-miss-zoe": 1.12,
  "little-colette": 1.12,
  "little-labels-the-brand": 1.12,
  "little-paper-kids": 1.14,
  mishmoccs: 1.12,
  "sawyer-and-spade": 1.14,
  "southern-proper-blanks": 1.28,
  "velvet-fawn": 1.14,
  "weisinger-bamboo": 1.14,
  yogababy: 1.14,
  "zsazsa-and-lolli": 1.14,
};

const HERO_ROTATION_MS = 9000;
const MOBILE_HERO_ROTATION_MS = 7500;
const MOBILE_HERO_MEDIA_QUERY = "(max-width: 639px)";
const SWIPE_THRESHOLD_PX = 44;
const BRAND_SWIPE_THRESHOLD_PX = 76;
const MOBILE_GALLERY_MEDIA_QUERY = "(max-width: 959px)";
const BRAND_SWIPE_GAP_PX = 12;
const BRAND_SWIPE_SETTLE_MS = 220;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "summary",
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
const brandCardImagePositionFor = (brand: Brand) =>
  BRAND_CARD_IMAGE_POSITION_BY_SLUG[brand.slug] ?? "center center";
const brandLogoScaleFor = (brand: Brand) => BRAND_LOGO_SCALE_BY_SLUG[brand.slug] ?? 1;
const usesContainedProductImages = (brand: Brand, image?: string) =>
  brand.slug === "weisinger-bamboo" || Boolean(image?.match(/\/spb[345]\.webp$/));
const clampBrandSwipeOffset = (offset: number, maxOffset: number) =>
  Math.max(-maxOffset, Math.min(maxOffset, offset));
const brandSwipeProgress = (offset: number) =>
  Math.min(1, Math.abs(offset) / BRAND_SWIPE_THRESHOLD_PX);

function Chevron({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "previous" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

function BrandSwipePreview({
  brand,
  side,
  swipeOffset,
  isSettling,
}: {
  brand: Brand | null;
  side: "left" | "right";
  swipeOffset: number;
  isSettling: boolean;
}) {
  if (!brand) {
    return null;
  }

  const isVisible = side === "right" ? swipeOffset < 0 : swipeOffset > 0;
  const progress = brandSwipeProgress(swipeOffset);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 z-0 hidden h-full w-full overflow-hidden rounded-[24px] border border-white/20 bg-[var(--surface)] shadow-[0_24px_64px_rgba(12,10,8,0.25)] max-[959px]:block ${
        side === "right" ? "left-[calc(100%+12px)]" : "right-[calc(100%+12px)]"
      }`}
      style={{
        opacity: isVisible ? 0.42 + progress * 0.58 : 0,
        transform: `translateX(${swipeOffset}px)`,
        transition: isSettling
          ? `opacity ${BRAND_SWIPE_SETTLE_MS}ms ease-out, transform ${BRAND_SWIPE_SETTLE_MS}ms ease-out`
          : undefined,
      }}
    >
      <div className="quick-view-preview-image">
        <Image
          src={brand.images[0]}
          alt=""
          fill
          decoding="async"
          className="object-contain"
          sizes={GALLERY_SIZES}
          style={{ objectPosition: brandCardImagePositionFor(brand) }}
        />
      </div>
      <div className="px-5 py-3">
        <p className="font-display text-[2rem] leading-none text-[var(--ink-strong)]">{brand.name}</p>
      </div>
    </div>
  );
}

export function BrandsShowcase({ brands }: BrandsShowcaseProps) {
  const [activeBrand, setActiveBrand] = useState<Brand | null>(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [requestedImageIndex, setRequestedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageRetry, setImageRetry] = useState(0);
  const [isMobileGalleryLayout, setIsMobileGalleryLayout] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [heroRotationResetKey, setHeroRotationResetKey] = useState(0);
  const [isMobileHeroLayout, setIsMobileHeroLayout] = useState(false);
  const [hiddenLogoSlugs, setHiddenLogoSlugs] = useState<Record<string, true>>({});
  const [brandSwipeOffset, setBrandSwipeOffset] = useState(0);
  const [brandSwipeIsSettling, setBrandSwipeIsSettling] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const heroTouchStartX = useRef<number | null>(null);
  const heroTouchDidSwipe = useRef(false);
  const galleryTouchStartX = useRef<number | null>(null);
  const galleryTouchDidSwipe = useRef(false);
  const brandTouchStartX = useRef<number | null>(null);
  const brandTouchStartY = useRef<number | null>(null);
  const galleryTouchStartY = useRef<number | null>(null);
  const heroTouchStartY = useRef<number | null>(null);
  const brandSwipeOffsetRef = useRef(0);
  const brandSwipeSettleTimer = useRef<number | null>(null);

  const orderedBrands = useMemo(() => alphabeticalBrandOrder(brands), [brands]);
  const isModalOpen = Boolean(activeBrand);
  const activeBrandSlug = activeBrand?.slug;
  const featuredBrands = useMemo(() => orderFeaturedBrands(brands), [brands]);
  const activeHeroBrand = featuredBrands[activeSlideIndex] ?? featuredBrands[0];
  const activeImageCount = activeBrand?.images.length ?? 0;
  const activeBrandIndex = activeBrand
    ? orderedBrands.findIndex((brand) => brand.slug === activeBrand.slug)
    : -1;
  const previousBrand =
    activeBrandIndex >= 0 && orderedBrands.length
      ? orderedBrands[(activeBrandIndex - 1 + orderedBrands.length) % orderedBrands.length]
      : null;
  const nextBrand =
    activeBrandIndex >= 0 && orderedBrands.length
      ? orderedBrands[(activeBrandIndex + 1) % orderedBrands.length]
      : null;

  const resetHeroRotation = useCallback(() => {
    setHeroRotationResetKey((currentKey) => currentKey + 1);
  }, []);

  const closeModal = useCallback(() => {
    if (brandSwipeSettleTimer.current !== null) {
      window.clearTimeout(brandSwipeSettleTimer.current);
      brandSwipeSettleTimer.current = null;
    }

    setActiveBrand(null);
    setActiveImageIndex(0);
    setRequestedImageIndex(0);
    setImageError(false);
    brandTouchStartX.current = null;
    brandTouchStartY.current = null;

    brandSwipeOffsetRef.current = 0;
    setBrandSwipeIsSettling(false);
    setBrandSwipeOffset(0);
  }, []);

  const clearBrandSwipeSettleTimer = useCallback(() => {
    if (brandSwipeSettleTimer.current !== null) {
      window.clearTimeout(brandSwipeSettleTimer.current);
      brandSwipeSettleTimer.current = null;
    }
  }, []);

  const brandSwipeDistance = useCallback(() => {
    const modalWidth = modalRef.current?.getBoundingClientRect().width;

    if (modalWidth && Number.isFinite(modalWidth)) {
      return modalWidth + BRAND_SWIPE_GAP_PX;
    }

    return Math.min(window.innerWidth - 24, 420) + BRAND_SWIPE_GAP_PX;
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

      setImageError(false);
      setRequestedImageIndex((currentIndex) => {
        const maxIndex = activeImageCount - 1;

        if (direction === "next") {
          return currentIndex === maxIndex ? 0 : currentIndex + 1;
        }

        return currentIndex === 0 ? maxIndex : currentIndex - 1;
      });
    },
    [activeImageCount],
  );

  const showAdjacentBrand = useCallback(
    (direction: "next" | "previous") => {
      if (!activeBrand || orderedBrands.length < 2) {
        return;
      }

      clearBrandSwipeSettleTimer();
      const currentIndex = orderedBrands.findIndex((brand) => brand.slug === activeBrand.slug);
      if (currentIndex < 0) {
        return;
      }

      const offset = direction === "next" ? 1 : -1;
      const nextIndex = (currentIndex + offset + orderedBrands.length) % orderedBrands.length;
      setActiveBrand(orderedBrands[nextIndex]);
      setActiveImageIndex(0);
      setRequestedImageIndex(0);
      setImageError(false);
      brandSwipeOffsetRef.current = 0;
      setBrandSwipeIsSettling(false);
      setBrandSwipeOffset(0);
    },
    [activeBrand, orderedBrands, clearBrandSwipeSettleTimer],
  );

  const openBrandModal = (brand: Brand) => {
    clearBrandSwipeSettleTimer();
    setActiveBrand(brand);
    setActiveImageIndex(0);
    setRequestedImageIndex(0);
    setImageError(false);
    brandSwipeOffsetRef.current = 0;
    setBrandSwipeIsSettling(false);
    setBrandSwipeOffset(0);
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
    galleryTouchStartY.current = event.changedTouches[0]?.clientY ?? null;
    galleryTouchDidSwipe.current = false;
  };

  const handleGalleryTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (galleryTouchStartX.current === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - galleryTouchStartX.current;
    const verticalDistance = event.changedTouches[0].clientY - (galleryTouchStartY.current ?? event.changedTouches[0].clientY);
    galleryTouchStartX.current = null;
    galleryTouchStartY.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD_PX || Math.abs(distance) < Math.abs(verticalDistance) * 1.25) {
      return;
    }

    galleryTouchDidSwipe.current = true;
    advanceImage(distance < 0 ? "next" : "previous");
  };

  const handleGalleryTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!activeImageCount || !window.matchMedia(MOBILE_GALLERY_MEDIA_QUERY).matches) {
      return;
    }

    if (galleryTouchDidSwipe.current) {
      galleryTouchDidSwipe.current = false;
      return;
    }

    if ((event.target as HTMLElement).closest("button")) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const tapX = event.clientX - bounds.left;
    advanceImage(tapX > bounds.width / 2 ? "next" : "previous");
  };

  const handleBrandTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (!isMobileGalleryLayout || orderedBrands.length < 2) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("[data-gallery-area], a, button, summary, details")) {
      return;
    }

    clearBrandSwipeSettleTimer();
    brandTouchStartX.current = event.changedTouches[0]?.clientX ?? null;
    brandTouchStartY.current = event.changedTouches[0]?.clientY ?? null;
    brandSwipeOffsetRef.current = 0;
    setBrandSwipeIsSettling(false);
    setBrandSwipeOffset(0);
  };

  const handleBrandTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (brandTouchStartX.current === null || brandTouchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - brandTouchStartX.current;
    const distanceY = touch.clientY - brandTouchStartY.current;

    if (Math.abs(distanceY) > 8 && Math.abs(distanceY) > Math.abs(distanceX) * 1.15) {
      brandTouchStartX.current = null;
      brandTouchStartY.current = null;
      brandSwipeOffsetRef.current = 0;
      setBrandSwipeOffset(0);
      return;
    }

    const nextOffset = clampBrandSwipeOffset(distanceX, brandSwipeDistance());
    brandSwipeOffsetRef.current = nextOffset;
    setBrandSwipeOffset(nextOffset);
  };

  const handleBrandTouchEnd = () => {
    if (brandTouchStartX.current === null || brandTouchStartY.current === null) {
      return;
    }

    const distance = brandSwipeOffsetRef.current;
    brandTouchStartX.current = null;
    brandTouchStartY.current = null;

    if (Math.abs(distance) >= BRAND_SWIPE_THRESHOLD_PX) {
      const direction = distance < 0 ? "next" : "previous";
      if (prefersReducedMotion) {
        showAdjacentBrand(direction);
        return;
      }
      const targetOffset = direction === "next" ? -brandSwipeDistance() : brandSwipeDistance();

      setBrandSwipeIsSettling(true);
      brandSwipeOffsetRef.current = targetOffset;
      setBrandSwipeOffset(targetOffset);
      clearBrandSwipeSettleTimer();
      brandSwipeSettleTimer.current = window.setTimeout(() => {
        showAdjacentBrand(direction);
        brandSwipeSettleTimer.current = null;
      }, BRAND_SWIPE_SETTLE_MS);
      return;
    }

    setBrandSwipeIsSettling(true);
    brandSwipeOffsetRef.current = 0;
    setBrandSwipeOffset(0);
    clearBrandSwipeSettleTimer();
    brandSwipeSettleTimer.current = window.setTimeout(() => {
      setBrandSwipeIsSettling(false);
      brandSwipeSettleTimer.current = null;
    }, BRAND_SWIPE_SETTLE_MS);
  };

  const handleBrandPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobileGalleryLayout || event.pointerType !== "mouse" || orderedBrands.length < 2) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("[data-gallery-area], a, button, summary, details")) {
      return;
    }

    clearBrandSwipeSettleTimer();
    brandTouchStartX.current = event.clientX;
    brandTouchStartY.current = event.clientY;
    brandSwipeOffsetRef.current = 0;
    setBrandSwipeIsSettling(false);
    setBrandSwipeOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleBrandPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobileGalleryLayout || event.pointerType !== "mouse" || brandTouchStartX.current === null || brandTouchStartY.current === null) {
      return;
    }

    const distanceX = event.clientX - brandTouchStartX.current;
    const distanceY = event.clientY - brandTouchStartY.current;

    if (Math.abs(distanceY) > 8 && Math.abs(distanceY) > Math.abs(distanceX) * 1.15) {
      brandTouchStartX.current = null;
      brandTouchStartY.current = null;
      brandSwipeOffsetRef.current = 0;
      setBrandSwipeOffset(0);
      return;
    }

    const nextOffset = clampBrandSwipeOffset(distanceX, brandSwipeDistance());
    brandSwipeOffsetRef.current = nextOffset;
    setBrandSwipeOffset(nextOffset);
  };

  const handleBrandPointerUp = () => {
    if (!isMobileGalleryLayout || brandTouchStartX.current === null) {
      return;
    }

    handleBrandTouchEnd();
  };

  const handleHeroTouchStart = (event: TouchEvent<HTMLElement>) => {
    heroTouchStartX.current = event.changedTouches[0]?.clientX ?? null;
    heroTouchStartY.current = event.changedTouches[0]?.clientY ?? null;
    heroTouchDidSwipe.current = false;
  };

  const handleHeroTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (heroTouchStartX.current === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - heroTouchStartX.current;
    const verticalDistance = event.changedTouches[0].clientY - (heroTouchStartY.current ?? event.changedTouches[0].clientY);
    heroTouchStartX.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD_PX || Math.abs(distance) < Math.abs(verticalDistance) * 1.25) {
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
    const query = window.matchMedia(MOBILE_GALLERY_MEDIA_QUERY);
    const update = () => setIsMobileGalleryLayout(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!activeBrand) return;
    let cancelled = false;
    // Decode first, then swap. Rapid clicks cannot let an older request win.
    prepareImage(activeBrand.images[requestedImageIndex], GALLERY_SIZES, "high")
      .then(() => {
        if (!cancelled) {
          setActiveImageIndex(requestedImageIndex);
          setImageError(false);
        }
      })
      .catch(() => { if (!cancelled) setImageError(true); });
    return () => { cancelled = true; };
  }, [activeBrand, requestedImageIndex, imageRetry]);

  useEffect(() => {
    if (!activeBrand || !canPrefetchImages()) return;
    const timer = window.setTimeout(() => {
      const count = activeBrand.images.length;
      const upcoming = [
        activeBrand.images[(requestedImageIndex + 1) % count],
        activeBrand.images[(requestedImageIndex - 1 + count) % count],
        previousBrand?.images[0],
        nextBrand?.images[0],
      ];
      for (const src of new Set(upcoming)) {
        if (src) void prepareImage(src).catch(() => {});
      }
    }, 180);
    return () => window.clearTimeout(timer);
  }, [activeBrand, requestedImageIndex, previousBrand, nextBrand]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => clearBrandSwipeSettleTimer();
  }, [clearBrandSwipeSettleTimer]);

  useEffect(() => {
    modalContentRef.current?.scrollTo({ top: 0 });
  }, [activeBrandSlug]);

  useEffect(() => {
    if (featuredBrands.length < 2 || heroPaused || prefersReducedMotion || isModalOpen) {
      return;
    }

    const rotation = window.setTimeout(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % featuredBrands.length);
    }, isMobileHeroLayout ? MOBILE_HERO_ROTATION_MS : HERO_ROTATION_MS);

    return () => window.clearTimeout(rotation);
  }, [activeSlideIndex, featuredBrands.length, heroRotationResetKey, isMobileHeroLayout, heroPaused, prefersReducedMotion, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen || !modalRef.current) {
      return;
    }

    previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const modalElement = modalRef.current;
    const focusableElements = Array.from(
      modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );

    focusableElements.find((element) => element.getClientRects().length)?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocusedElement.current?.focus({ preventScroll: true });
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (event.shiftKey) showAdjacentBrand("next");
        else advanceImage("next");
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (event.shiftKey) showAdjacentBrand("previous");
        else advanceImage("previous");
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const modalElement = modalRef.current;
      if (!modalElement) return;
      const interactiveElements = Array.from(
        modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled") && element.getClientRects().length > 0);

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
    };
  }, [isModalOpen, advanceImage, closeModal, showAdjacentBrand]);

  const activeOrderUrl = activeBrand?.orderUrl?.trim() ? activeBrand.orderUrl : "/contact";
  const isOrderUrlExternal = activeOrderUrl.startsWith("http://") || activeOrderUrl.startsWith("https://");

  return (
    <>
      <section
        className="relative cursor-pointer overflow-hidden bg-[var(--surface-strong)] sm:cursor-default"
        onClick={handleMobileHeroClick}
        onTouchStart={handleHeroTouchStart}
        onTouchEnd={handleHeroTouchEnd}
        onFocusCapture={() => setHeroPaused(true)}
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
                  loading={index === 0 || isActive ? "eager" : "lazy"}
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
            className="absolute left-3 top-[27%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white/95 text-[var(--ink-strong)] shadow-[0_3px_12px_rgba(33,31,28,0.16)] transition hover:bg-[var(--surface-strong)] sm:left-5 sm:top-1/2 sm:flex lg:left-8"
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
            className="absolute right-3 top-[27%] z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white/95 text-[var(--ink-strong)] shadow-[0_3px_12px_rgba(33,31,28,0.16)] transition hover:bg-[var(--surface-strong)] sm:right-5 sm:top-1/2 sm:flex lg:right-8"
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
            <button
              type="button"
              onClick={() => openBrandModal(activeHeroBrand)}
              aria-label={`Open details for ${activeHeroBrand.name}`}
              className="absolute inset-0 z-[1] hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:block"
            />
          ) : null}

          {activeHeroBrand ? (
            <div className="pointer-events-none relative z-10 flex min-h-[500px] items-end sm:min-h-[610px] lg:min-h-[680px]">
              <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:px-6 sm:pb-12 lg:px-10 lg:pb-16">
                <div className="max-w-2xl space-y-3 text-white sm:space-y-5">
                  <p className="text-sm font-semibold text-white/84 sm:text-base">Featured Brands</p>
                  <h1 className="font-display text-4xl leading-[0.98] sm:text-6xl lg:text-7xl">
                    {activeHeroBrand.name}
                  </h1>
                  <p className="hidden max-w-xl text-base leading-8 text-white/86 sm:block sm:text-lg">
                    {heroDescriptionFor(activeHeroBrand)}
                  </p>
                  <div className="pointer-events-auto flex flex-wrap items-start gap-3 pt-1">
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
                    <Link
                      href={BOOKING_URL}
                      className={`${buttonStyles({
                        variant: "glass",
                        size: "md",
                      })} px-4 py-2 text-[0.66rem] sm:px-6 sm:py-3 sm:text-[0.78rem]`}
                    >
                      Book Appointment
                    </Link>
                    <a
                      href="#brands-section"
                      className={`${buttonStyles({
                        variant: "glass",
                        size: "lg",
                      })} group relative overflow-hidden max-sm:px-4 max-sm:py-2 max-sm:text-[0.66rem]`}
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
          <Link
            href={BOOKING_URL}
            className={buttonStyles({ variant: "secondary", size: "md" })}
          >
            Book Appointment
          </Link>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {orderedBrands.map((brand) => {
            const hasLogo = Boolean(brand.logoUrl?.trim()) && !hiddenLogoSlugs[brand.slug];
            const hasSisterLogo = hasLogo && Boolean(brand.sisterLogoUrl?.trim());

            return (
              <article
                id={`brand-${brand.slug}`}
                key={brand.slug}
                className="group relative cursor-pointer overflow-hidden rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface)] shadow-[0_5px_20px_rgba(37,31,24,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_10px_28px_rgba(37,31,24,0.09)]"
                onMouseEnter={() => { if (canPrefetchImages()) void prepareImage(brand.images[0]).catch(() => {}); }}
                onFocus={() => { if (canPrefetchImages()) void prepareImage(brand.images[0]).catch(() => {}); }}
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
                aria-haspopup="dialog"
              >
                <div className={`relative aspect-[5/6] overflow-hidden ${usesContainedProductImages(brand, brand.images[0]) ? "bg-white" : "bg-[var(--surface-strong)]"}`}>
                  <Image
                    src={brand.images[0]}
                    alt={`${brand.name} collection preview`}
                    placeholder={imageDetails(brand.images[0]) ? "blur" : "empty"}
                    blurDataURL={imageDetails(brand.images[0])?.blur}
                    fill
                    decoding="async"
                    className={`${usesContainedProductImages(brand, brand.images[0]) ? "object-contain p-4" : "object-cover"} transition duration-500 ease-out group-hover:scale-[1.035]`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    style={{ objectPosition: brandCardImagePositionFor(brand) }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[rgba(28,24,20,0.13)] opacity-0 transition duration-300 group-hover:opacity-100" />
                </div>

                <div className="border-t border-[var(--border-soft)] bg-[var(--surface)] px-5 py-4">
                  {hasLogo ? (
                    <div className="flex h-20 w-full flex-col px-1 py-1">
                      <div
                        className={
                          hasSisterLogo
                            ? "grid min-h-0 flex-1 grid-cols-[minmax(0,0.8fr)_1px_minmax(0,1.35fr)] items-center gap-3"
                            : "min-h-0 flex-1"
                        }
                      >
                        <Image
                          src={brand.logoUrl!}
                          alt={`${hasSisterLogo ? "Little Labels" : brand.name} logo`}
                          width={700}
                          height={220}
                          className={`h-full w-full object-contain ${
                            hasSisterLogo ? "mix-blend-multiply" : ""
                          }`}
                          style={{
                            transform: hasSisterLogo
                              ? undefined
                              : `scale(${brandLogoScaleFor(brand)})`,
                          }}
                          onError={() => hideLogo(brand.slug)}
                        />
                        {hasSisterLogo ? (
                          <>
                            <span
                              aria-hidden="true"
                              className="h-9 w-px bg-[var(--border-strong)]"
                            />
                            <Image
                              src={brand.sisterLogoUrl!}
                              alt="Toast + Jams logo"
                              width={881}
                              height={113}
                              className="h-full w-full object-contain mix-blend-multiply"
                              onError={() => hideLogo(brand.slug)}
                            />
                          </>
                        ) : null}
                      </div>
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
        <div className="quick-view-backdrop" onClick={closeModal}>
          <div className="quick-view-shell">
            <BrandSwipePreview brand={previousBrand} side="left" swipeOffset={brandSwipeOffset} isSettling={brandSwipeIsSettling} />
            <BrandSwipePreview brand={nextBrand} side="right" swipeOffset={brandSwipeOffset} isSettling={brandSwipeIsSettling} />
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="quick-view-title"
              aria-describedby={isMobileGalleryLayout ? undefined : "quick-view-description"}
              className="quick-view"
              style={{
                transform: brandSwipeOffset ? `translateX(${brandSwipeOffset}px)` : undefined,
                transitionDuration: brandSwipeIsSettling ? `${BRAND_SWIPE_SETTLE_MS}ms` : brandSwipeOffset ? "0ms" : undefined,
              }}
              onClick={(event) => event.stopPropagation()}
              onTouchStart={handleBrandTouchStart}
              onTouchMove={handleBrandTouchMove}
              onTouchEnd={handleBrandTouchEnd}
              onTouchCancel={() => { brandSwipeOffsetRef.current = 0; handleBrandTouchEnd(); }}
              onPointerDown={handleBrandPointerDown}
              onPointerMove={handleBrandPointerMove}
              onPointerUp={handleBrandPointerUp}
              onPointerCancel={handleBrandPointerUp}
            >
              <button type="button" onClick={closeModal} aria-label="Close quick view" className="quick-view-close">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
              </button>

              <div
                data-gallery-area
                className="quick-view-gallery"
                aria-busy={requestedImageIndex !== activeImageIndex}
                onClick={handleGalleryTap}
                onTouchStart={handleGalleryTouchStart}
                onTouchEnd={handleGalleryTouchEnd}
                onTouchCancel={() => { galleryTouchStartX.current = null; galleryTouchStartY.current = null; }}
              >
                <Image
                  src={activeBrand.images[activeImageIndex]}
                  alt={`${activeBrand.name} image ${activeImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes={GALLERY_SIZES}
                  placeholder={imageDetails(activeBrand.images[activeImageIndex]) ? "blur" : "empty"}
                  blurDataURL={imageDetails(activeBrand.images[activeImageIndex])?.blur}
                  loading="eager"
                  fetchPriority="high"
                />
                {activeImageCount > 1 ? (
                  <>
                    <button type="button" onClick={() => advanceImage("previous")} aria-label="View previous image" className="gallery-arrow absolute left-3 top-1/2 z-10 -translate-y-1/2"><Chevron direction="previous" /></button>
                    <button type="button" onClick={() => advanceImage("next")} aria-label="View next image" className="gallery-arrow absolute right-3 top-1/2 z-10 -translate-y-1/2"><Chevron direction="next" /></button>
                  </>
                ) : null}
              </div>

              <div ref={modalContentRef} className="quick-view-details" data-brand-swipe-area>
                <div className="quick-view-copy">
                  <div className="quick-view-heading">
                    <h2 id="quick-view-title" className="font-display" aria-live="polite">{activeBrand.name}</h2>
                    <p className="quick-view-count" role="status" aria-label={`Image ${activeImageIndex + 1} of ${activeImageCount}`}>{activeImageIndex + 1} / {activeImageCount}</p>
                  </div>
                  <p id="quick-view-description" className="quick-view-description">{activeBrand.oneLiner}</p>
                  {activeBrand.orderAccessNote ? (
                    <details key={activeBrand.slug} className="quick-view-order-note">
                      <summary>Ordering details</summary>
                      <p className="whitespace-pre-line">{activeBrand.orderAccessNote}</p>
                    </details>
                  ) : null}
                  <div className="quick-view-actions">
                    {isOrderUrlExternal ? (
                      <a href={activeOrderUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant: "primary", size: "md" })}>Order Now</a>
                    ) : (
                      <Link href={activeOrderUrl} className={buttonStyles({ variant: "primary", size: "md" })}>Ordering Help</Link>
                    )}
                    <Link href={BOOKING_URL} className={buttonStyles({ variant: "secondary", size: "md" })}>Book Appointment</Link>
                  </div>
                  {imageError ? (
                    <p role="alert" className="mt-2 text-xs text-[var(--ink-muted)]">Photo couldn’t load. <button type="button" className="underline underline-offset-2" onClick={() => setImageRetry(value => value + 1)}>Try again</button></p>
                  ) : null}
                </div>

                <nav aria-label="Browse brands" className="quick-view-brand-nav">
                  <button type="button" onClick={() => showAdjacentBrand("previous")} aria-label={`View previous brand, ${previousBrand?.name}`} className="quick-view-brand-link">
                    <Chevron direction="previous" />
                    <span className="quick-view-adjacent-name"><span>Previous brand</span>{previousBrand?.name}</span>
                  </button>
                  <span className="quick-view-swipe-hint">Swipe between brands</span>
                  <button type="button" onClick={() => showAdjacentBrand("next")} aria-label={`View next brand, ${nextBrand?.name}`} className="quick-view-brand-link quick-view-brand-next">
                    <span className="quick-view-adjacent-name"><span>Next brand</span>{nextBrand?.name}</span>
                    <Chevron direction="next" />
                  </button>
                  <button type="button" onClick={closeModal} className="quick-view-back">Back to brands</button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
