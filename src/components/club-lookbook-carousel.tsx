"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type LookbookSlide = {
  src: string;
  alt: string;
  label: string;
  position?: string;
};

type ClubLookbookCarouselProps = {
  slides: readonly LookbookSlide[];
};

function Arrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path
        d={direction === "previous" ? "M16 10H5m4-4-4 4 4 4" : "M4 10h11m-4-4 4 4-4 4"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClubLookbookCarousel({ slides }: ClubLookbookCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToSlide(index: number) {
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    const track = trackRef.current;
    const slide = track?.children[nextIndex] as HTMLElement | undefined;
    if (!track || !slide) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const centeredPosition = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left: Math.max(0, Math.min(centeredPosition, maxScroll)), behavior: "smooth" });
    setActiveIndex(nextIndex);
  }

  function updateActiveSlide() {
    const track = trackRef.current;
    if (!track) return;

    if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(() => {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      const slidesArray = Array.from(track.children) as HTMLElement[];
      const closestIndex = slidesArray.reduce((closest, slide, index) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const closestCenter = slidesArray[closest].offsetLeft + slidesArray[closest].offsetWidth / 2;
        return Math.abs(slideCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? index : closest;
      }, 0);

      setActiveIndex(closestIndex);
      scrollFrameRef.current = null;
    });
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={updateActiveSlide}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-80rem)/2))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
      >
        {slides.map((slide, index) => (
          <figure
            key={slide.src}
            className="group relative aspect-[4/5] w-[78vw] max-w-[410px] shrink-0 snap-center overflow-hidden border border-[#0b513f]/14 bg-[#e8e5de] sm:w-[44vw] lg:w-[31vw]"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 31vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
              style={{ objectPosition: slide.position ?? "center" }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-[#0b513f]/12 bg-[#f7f6f1]/94 px-4 py-3 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#0a382c] backdrop-blur">
              <span>{slide.label}</span>
              <span className="text-[#0b7458]">{String(index + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-5 flex max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-10">
        <p className="w-12 shrink-0 text-xs font-bold tabular-nums text-[#0b513f]" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </p>
        <div className="h-px flex-1 overflow-hidden bg-[#0b513f]/18" aria-hidden="true">
          <div
            className="h-full origin-left bg-[#0b513f] transition-[width] duration-300"
            style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToSlide(activeIndex - 1)}
            aria-label="Previous slide"
            disabled={activeIndex === 0}
            className="flex h-11 w-11 items-center justify-center border border-[#0b513f]/20 text-[#0b513f] transition hover:border-[#0b513f] hover:bg-[#0b513f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#0b513f]/20 disabled:hover:bg-transparent disabled:hover:text-[#0b513f]"
          >
            <Arrow direction="previous" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSlide(activeIndex + 1)}
            aria-label="Next slide"
            disabled={activeIndex === slides.length - 1}
            className="flex h-11 w-11 items-center justify-center border border-[#0b513f]/20 text-[#0b513f] transition hover:border-[#0b513f] hover:bg-[#0b513f] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#0b513f]/20 disabled:hover:bg-transparent disabled:hover:text-[#0b513f]"
          >
            <Arrow direction="next" />
          </button>
        </div>
      </div>
    </div>
  );
}
