"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Brand } from "@/data/brands";
import { BOOKING_URL } from "@/lib/constants";

type BrandsShowcaseProps = {
  brands: Brand[];
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const visuallyBalancedBrandOrder = (brands: Brand[]) => {
  const featured = brands.filter((brand) => brand.featured);
  const standard = brands.filter((brand) => !brand.featured);
  return [...featured, ...standard];
};

export function BrandsShowcase({ brands }: BrandsShowcaseProps) {
  const [activeBrand, setActiveBrand] = useState<Brand | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const orderedBrands = useMemo(() => visuallyBalancedBrandOrder(brands), [brands]);

  const closeModal = useCallback(() => {
    setActiveBrand(null);
    setActiveImageIndex(0);
  }, []);

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
  }, [activeBrand, closeModal]);

  const openBrandModal = (brand: Brand) => {
    setActiveBrand(brand);
    setActiveImageIndex(0);
  };

  const advanceImage = (direction: "next" | "previous") => {
    if (!activeBrand) {
      return;
    }

    setActiveImageIndex((currentIndex) => {
      const maxIndex = activeBrand.images.length - 1;
      if (direction === "next") {
        return currentIndex === maxIndex ? 0 : currentIndex + 1;
      }
      return currentIndex === 0 ? maxIndex : currentIndex - 1;
    });
  };

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {orderedBrands.map((brand, index) => {
          const prominentCard = index < 2;
          return (
            <article
              key={brand.slug}
              className={`group relative cursor-pointer overflow-hidden rounded-[1.35rem] border border-[var(--line)] bg-[rgba(255,255,255,0.6)] shadow-[0_18px_38px_rgba(18,30,40,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(18,30,40,0.16)] ${
                prominentCard ? "xl:col-span-2" : ""
              }`}
              onClick={() => openBrandModal(brand)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openBrandModal(brand);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open quick view for ${brand.name}`}
            >
              <div
                className={`relative overflow-hidden bg-[var(--surface-strong)] ${
                  prominentCard ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={brand.images[0]}
                  alt={`${brand.name} collection preview`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,31,41,0.72)] via-[rgba(18,31,41,0.12)] to-transparent" />
                {prominentCard ? (
                  <span className="absolute left-4 top-4 rounded-full border border-[rgba(255,255,255,0.52)] bg-[rgba(18,31,41,0.55)] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--panel)]">
                    Highlighted line
                  </span>
                ) : null}
              </div>

              <div className="space-y-3 p-5">
                <h3 className="font-display text-4xl leading-none text-[var(--night)]">{brand.name}</h3>
                <p className="text-sm leading-6 text-[var(--ink-muted)]">{brand.oneLiner}</p>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 items-end p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
                <div className="pointer-events-auto flex flex-wrap gap-2 rounded-2xl border border-[rgba(255,255,255,0.28)] bg-[rgba(14,27,36,0.82)] p-2.5 backdrop-blur-sm">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[var(--panel)] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--night)]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Book
                  </a>
                  <Link
                    href="/contact"
                    className="rounded-full border border-[rgba(248,241,228,0.7)] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--panel)]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Contact
                  </Link>
                  {brand.lineSheetUrl ? (
                    <a
                      href={brand.lineSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[rgba(248,241,228,0.7)] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--panel)]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Line Sheet
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-[var(--line)] px-4 py-3 md:hidden">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--night)] px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[var(--panel)]"
                  onClick={(event) => event.stopPropagation()}
                >
                  Book
                </a>
                <Link
                  href="/contact"
                  className="rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]"
                  onClick={(event) => event.stopPropagation()}
                >
                  Contact
                </Link>
                {brand.lineSheetUrl ? (
                  <a
                    href={brand.lineSheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Line Sheet
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {activeBrand ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(12,20,28,0.74)] p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            aria-describedby="quick-view-description"
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_30px_70px_rgba(10,16,22,0.4)] sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)] transition hover:text-[var(--night)]"
                aria-label="Close quick view"
              >
                Close
              </button>
            </div>

            <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface-strong)]">
                  <Image
                    src={activeBrand.images[activeImageIndex]}
                    alt={`${activeBrand.name} image ${activeImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {activeBrand.images.map((image, imageIndex) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImageIndex(imageIndex)}
                      className={`relative aspect-[4/3] overflow-hidden rounded-xl border ${
                        imageIndex === activeImageIndex
                          ? "border-[var(--night)]"
                          : "border-[var(--line)] hover:border-[var(--line-strong)]"
                      }`}
                      aria-label={`View image ${imageIndex + 1}`}
                    >
                      <Image src={image} alt={`${activeBrand.name} thumbnail ${imageIndex + 1}`} fill className="object-cover" sizes="240px" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => advanceImage("previous")}
                    className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)] transition hover:text-[var(--night)]"
                    aria-label="View previous image"
                  >
                    Previous
                  </button>
                  <p className="text-xs tracking-[0.12em] text-[var(--ink-muted)]">
                    {activeImageIndex + 1} / {activeBrand.images.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => advanceImage("next")}
                    className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)] transition hover:text-[var(--night)]"
                    aria-label="View next image"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="space-y-6 rounded-2xl bg-[rgba(255,255,255,0.62)] p-5">
                <div className="space-y-3">
                  <h2 id="quick-view-title" className="font-display text-5xl leading-[0.96] text-[var(--night)]">
                    {activeBrand.name}
                  </h2>
                  <p id="quick-view-description" className="text-sm leading-7 text-[var(--ink-muted)]">
                    {activeBrand.oneLiner}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-4 py-2.5"
                  >
                    Book Appointment
                  </a>
                  <Link href="/contact" className="btn-secondary px-4 py-2.5">
                    Contact to Order
                  </Link>
                  {activeBrand.lineSheetUrl ? (
                    <a
                      href={activeBrand.lineSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary px-4 py-2.5"
                    >
                      View Line Sheet
                    </a>
                  ) : null}
                </div>

                {activeBrand.websiteUrl ? (
                  <a
                    href={activeBrand.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
                  >
                    Visit Website
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
