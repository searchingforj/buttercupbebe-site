"use client";

import { useState } from "react";

import { GOOGLE_BOOKING_URL } from "@/lib/constants";

export function BookingExperience() {
  const [frameKey, setFrameKey] = useState(0);

  function showAllAppointments() {
    setFrameKey((current) => current + 1);
  }

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-b border-[var(--border-soft)] pb-3">
        <h2 className="text-sm font-semibold">Markets &amp; virtual visits</h2>
        <div className="flex items-center gap-4 text-xs">
          <button
            type="button"
            onClick={showAllAppointments}
            className="min-h-11 font-semibold text-[var(--ink-muted)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--ink-strong)]"
          >
            All appointments
          </button>
          <span className="h-3 w-px bg-[var(--border-soft)]" aria-hidden="true" />
          <a
            href={GOOGLE_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 font-semibold text-[var(--ink-muted)] hover:text-[var(--ink-strong)]"
          >
            Open in Google <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <p id="booking-calendar-help" className="mt-2 text-xs leading-5 text-[var(--ink-muted)]">
        <strong className="font-semibold text-[var(--ink-strong)]">Booking a future market?</strong>{" "}
        After choosing your market, select{" "}
        <strong className="font-semibold text-[var(--ink-strong)]">&ldquo;Jump to the next bookable date&rdquo;</strong>{" "}
        if the calendar opens to this week.
      </p>

      <iframe
        key={frameKey}
        src={GOOGLE_BOOKING_URL}
        title="Buttercup Bebe markets and virtual appointment booking"
        aria-describedby="booking-calendar-help"
        className="mt-2 block h-[960px] w-full border-0 sm:h-[1100px] xl:h-[900px]"
      />

      <p className="mt-3 text-xs leading-5 text-[var(--ink-muted)]">
        Trouble with the calendar?{" "}
        <a href={GOOGLE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
          Continue in Google ↗
        </a>
      </p>
    </div>
  );
}
