"use client";

import { useEffect, useRef, useState } from "react";

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <rect x="5" y="4" width="3" height="12" rx="1" />
      <rect x="12" y="4" width="3" height="12" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M6.5 4.8a1 1 0 0 1 1.53-.84l8 5.2a1 1 0 0 1 0 1.68l-8 5.2a1 1 0 0 1-1.53-.84V4.8Z" />
    </svg>
  );
}

export function ClubCampaignVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  }

  return (
    <figure className="group relative aspect-[2/3] overflow-hidden rounded-[1.75rem] bg-[#0a382c] shadow-[0_28px_70px_rgba(17,43,36,0.17)]">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/brands/courtside-kids/clubs/editorial/traditions-golf-boy.webp"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="h-full w-full object-cover"
      >
        <source src="/brands/courtside-kids/clubs/editorial/courtside-club-campaign.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#082e24]/70 via-transparent to-[#082e24]/12" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/70">The Traditions collection</p>
        <p className="mt-2 font-display text-3xl font-semibold">Made for club days.</p>
      </figcaption>
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause campaign video" : "Play campaign video"}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[#082e24]/65 text-white backdrop-blur transition hover:bg-[#082e24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </figure>
  );
}
