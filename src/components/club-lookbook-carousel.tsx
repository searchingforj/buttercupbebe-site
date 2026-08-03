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
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToSlide(index: number) {
    const nextIndex = (index + slides.length) % slides.length;
    const track = trackRef.current;
    const slide = track?.children[nextIndex] as HTMLElement | undefined;

    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setActiveIndex(nextIndex);
  }

  function updateActiveSlide() {
    const track = trackRef.current;
    if (!track) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    const slidesArray = Array.from(track.children) as HTMLElement[];
    const closestIndex = slidesArray.reduce((closest, slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const closestCenter = slidesArray[closest].offsetLeft + slidesArray[closest].offsetWidth / 2;
      return Math.abs(slideCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? index : closest;
    }, 0);

    setActiveIndex(closestIndex);
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={updateActiveSlide}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-80rem)/2))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
      >
        {slides.map((slide) => (
          <figure
            key={slide.src}
            className="group relative aspect-[4/5] w-[78vw] max-w-[410px] shrink-0 snap-center overflow-hidden rounded-[1.5rem] bg-[#e8e5de] sm:w-[44vw] lg:w-[31vw]"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 31vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
              style={{ objectPosition: slide.position ?? "center" }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#082e24]/75 via-[#082e24]/20 to-transparent px-5 pb-5 pt-20 text-white">
              <figcaption className="text-xs font-bold uppercase tracking-[0.16em]">{slide.label}</figcaption>
            </div>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2" aria-label={`Slide ${activeIndex + 1} of ${slides.length}`}>
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-8 bg-[#0b513f]" : "w-1.5 bg-[#0b513f]/25 hover:bg-[#0b513f]/50"}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToSlide(activeIndex - 1)}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0b513f]/20 text-[#0b513f] transition hover:border-[#0b513f] hover:bg-[#0b513f] hover:text-white"
          >
            <Arrow direction="previous" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSlide(activeIndex + 1)}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0b513f]/20 text-[#0b513f] transition hover:border-[#0b513f] hover:bg-[#0b513f] hover:text-white"
          >
            <Arrow direction="next" />
          </button>
        </div>
      </div>
    </div>
  );
}
