"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Brand } from "@/data/brands";
import { BOOKING_URL } from "@/lib/constants";
import { Button, buttonStyles } from "@/components/ui/button";

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

const sortBrandsForShowroom = (items: Brand[]) => {
  const featured = items.filter((brand) => brand.featured);
  const standard = items.filter((brand) => !brand.featured);
  return [...featured, ...standard];
};

export function BrandsShowcase({ brands }: BrandsShowcaseProps) {
  const [activeBrand, setActiveBrand] = useState<Brand | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const orderedBrands = useMemo(() => sortBrandsForShowroom(brands), [brands]);

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
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
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
      const lastIndex = activeBrand.images.length - 1;
      if (direction === "next") {
        return currentIndex === lastIndex ? 0 : currentIndex + 1;
      }
      return currentIndex === 0 ? lastIndex : currentIndex - 1;
    });
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {orderedBrands.map((brand) => (
          <article
            key={brand.slug}
            role="button"
            tabIndex={0}
            aria-label={`Open quick view for ${brand.name}`}
            className="brand-card interactive-card group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
            onClick={() => openBrandModal(brand)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openBrandModal(brand);
              }
            }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-strong)]">
              <Image
                src={brand.images[0]}
                alt={`${brand.name} collection preview`}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </div>

            <div className="space-y-2 px-5 pb-6 pt-4">
              <h3 className="font-display text-3xl leading-tight text-[var(--ink-strong)]">{brand.name}</h3>
              <p className="text-sm leading-6 text-[var(--ink-muted)]">{brand.oneLiner}</p>
            </div>

            <div className="brand-card-overlay absolute inset-0 hidden items-end bg-gradient-to-t from-[rgba(12,12,12,0.85)] via-[rgba(12,12,12,0.35)] to-transparent p-4 md:flex">
              <div className="pointer-events-auto flex flex-wrap gap-2">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({
                    variant: "primary",
                    size: "sm",
                    className:
                      "focus-visible:ring-offset-[rgba(12,12,12,0.9)]",
                  })}
                  onClick={(event) => event.stopPropagation()}
                >
                  Book
                </a>
                <Link
                  href="/contact"
                  className={buttonStyles({
                    variant: "secondary",
                    size: "sm",
                    className:
                      "border-white/75 text-white hover:border-white hover:bg-white hover:text-[#101010] focus-visible:ring-offset-[rgba(12,12,12,0.9)]",
                  })}
                  onClick={(event) => event.stopPropagation()}
                >
                  Contact
                </Link>
                {brand.lineSheetUrl ? (
                  <a
                    href={brand.lineSheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles({
                      variant: "secondary",
                      size: "sm",
                      className:
                        "border-white/75 text-white hover:border-white hover:bg-white hover:text-[#101010] focus-visible:ring-offset-[rgba(12,12,12,0.9)]",
                    })}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Line Sheet
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      {activeBrand ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,10,10,0.68)] p-4"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            aria-describedby="quick-view-description"
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.35)] sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                aria-label="Close quick view"
              >
                Close
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--surface-strong)]">
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
                      className={`relative aspect-[4/5] overflow-hidden rounded-lg border transition ${
                        imageIndex === activeImageIndex
                          ? "border-[var(--ink-strong)]"
                          : "border-[var(--line)] hover:border-[var(--line-strong)]"
                      } focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]`}
                      aria-label={`View image ${imageIndex + 1}`}
                    >
                      <Image
                        src={image}
                        alt={`${activeBrand.name} thumbnail ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Button variant="secondary" size="sm" onClick={() => advanceImage("previous")} aria-label="View previous image">
                    Previous
                  </Button>
                  <p className="text-xs tracking-[0.1em] text-[var(--ink-muted)]">
                    {activeImageIndex + 1} / {activeBrand.images.length}
                  </p>
                  <Button variant="secondary" size="sm" onClick={() => advanceImage("next")} aria-label="View next image">
                    Next
                  </Button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <h2 id="quick-view-title" className="font-display text-5xl leading-tight text-[var(--ink-strong)]">
                    {activeBrand.name}
                  </h2>
                  <p id="quick-view-description" className="text-sm leading-7 text-[var(--ink-muted)]">
                    {activeBrand.oneLiner}
                  </p>
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
                  <Link href="/contact" className={buttonStyles({ variant: "secondary", size: "md" })}>
                    Contact to Order
                  </Link>
                  {activeBrand.lineSheetUrl ? (
                    <a
                      href={activeBrand.lineSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles({ variant: "secondary", size: "md" })}
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
                    className={buttonStyles({ variant: "ghost", size: "sm", className: "px-0" })}
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
