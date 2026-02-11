"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button, buttonStyles } from "@/components/ui/button";
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
  const activeLookbookUrl = activeBrand?.lookbookUrl ?? activeBrand?.lineSheetUrl;

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
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {orderedBrands.map((brand) => (
          <article
            key={brand.slug}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] shadow-[0_14px_35px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.13)]"
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
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-strong)]">
              <Image
                src={brand.images[0]}
                alt={`${brand.name} collection preview`}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 hidden items-end bg-gradient-to-t from-[rgba(15,15,15,0.62)] via-[rgba(15,15,15,0.1)] to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100 md:flex">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Quick View
                </span>
              </div>
            </div>

            <div className="space-y-2 p-5">
              <h3 className="font-display text-3xl leading-tight text-[var(--ink-strong)]">{brand.name}</h3>
              <p className="text-sm leading-6 text-[var(--ink-muted)]">{brand.oneLiner}</p>
            </div>
          </article>
        ))}
      </div>

      {activeBrand ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(12,12,12,0.62)] p-4"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            aria-describedby="quick-view-description"
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-[0_28px_60px_rgba(0,0,0,0.33)] sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex justify-end">
              <Button variant="secondary" size="sm" onClick={closeModal} aria-label="Close quick view">
                Close
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--surface-strong)]">
                  <Image
                    src={activeBrand.images[activeImageIndex]}
                    alt={`${activeBrand.name} image ${activeImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => advanceImage("previous")}
                    aria-label="View previous image"
                  >
                    Previous
                  </Button>
                  <p className="text-xs tracking-[0.12em] text-[var(--ink-muted)]">
                    {activeImageIndex + 1} / {activeBrand.images.length}
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => advanceImage("next")}
                    aria-label="View next image"
                  >
                    Next
                  </Button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <h2 id="quick-view-title" className="font-display text-4xl leading-tight text-[var(--ink-strong)]">
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
                  {activeLookbookUrl ? (
                    <a
                      href={activeLookbookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles({ variant: "secondary", size: "md" })}
                    >
                      View Lookbook PDF
                    </a>
                  ) : null}
                </div>

                {activeBrand.websiteUrl ? (
                  <a
                    href={activeBrand.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles({
                      variant: "ghost",
                      size: "sm",
                      className: "!px-0 !normal-case !tracking-[0.12em]",
                    })}
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
