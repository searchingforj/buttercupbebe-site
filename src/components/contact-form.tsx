"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/constants";

type FormStatus = "idle" | "sending" | "sent" | "error";

const inquiryTypes = [
  "Virtual appt",
  "Dallas market appt",
  "Atlanta market appt",
  "Ordering help",
] as const;

const fieldClass =
  "w-full rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--ink-strong)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      storeName: String(formData.get("storeName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      inquiryType: String(formData.get("inquiryType") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(data?.message ?? "Unable to send inquiry right now.");
      }

      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(`Unable to send inquiry right now. Please email ${CONTACT_EMAIL}.`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-[var(--ink-muted)]">
          Name
          <input type="text" name="name" required className={fieldClass} />
        </label>

        <label className="space-y-2 text-sm text-[var(--ink-muted)]">
          Store name
          <input type="text" name="storeName" required className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-[var(--ink-muted)]">
          Email
          <input type="email" name="email" required className={fieldClass} />
        </label>

        <label className="space-y-2 text-sm text-[var(--ink-muted)]">
          Phone
          <input type="tel" name="phone" required className={fieldClass} />
        </label>
      </div>

      <label className="space-y-2 text-sm text-[var(--ink-muted)]">
        Appointment type
        <select name="inquiryType" required className={fieldClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-[var(--ink-muted)]">
        Message
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="primary" size="md" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Inquiry"}
        </Button>
        <p className="text-xs text-[var(--ink-muted)]">
          Sends directly to our team. No email app needed.
        </p>
      </div>

      {status === "sent" ? (
        <p className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--ink-strong)]">
          Thanks, your inquiry was sent. We&apos;ll follow up as soon as possible.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-xl border border-[rgba(153,57,57,0.4)] bg-[rgba(153,57,57,0.08)] px-4 py-3 text-sm text-[rgb(112,42,42)]">
          {errorMessage || `Unable to send inquiry right now. Please email ${CONTACT_EMAIL}.`}
        </p>
      ) : null}
    </form>
  );
}
