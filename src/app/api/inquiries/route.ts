import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";
const FALLBACK_CONTACT_EMAIL = "wholesale@buttercupbebe.net";

const trimField = (value: unknown, maxLength: number) =>
  String(value ?? "").trim().slice(0, maxLength);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (value: string) =>
  value.replace(/[^\d+]/g, "").length >= 7;

export async function POST(request: Request) {
  let rawPayload: Record<string, unknown>;

  try {
    rawPayload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const payload = {
    name: trimField(rawPayload.name, 120),
    storeName: trimField(rawPayload.storeName, 140),
    email: trimField(rawPayload.email, 200).toLowerCase(),
    phone: trimField(rawPayload.phone, 40),
    inquiryType: trimField(rawPayload.inquiryType, 80),
    message: trimField(rawPayload.message, 4000),
    website: trimField(rawPayload.website, 200),
  };

  // Honeypot trap for low-effort bots.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (
    !payload.name ||
    !payload.storeName ||
    !payload.email ||
    !payload.phone ||
    !payload.inquiryType ||
    !payload.message
  ) {
    return NextResponse.json(
      { message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!isValidPhone(payload.phone)) {
    return NextResponse.json(
      { message: "Please enter a valid phone number." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = trimField(process.env.INQUIRY_TO_EMAIL ?? FALLBACK_CONTACT_EMAIL, 200);
  const fromEmail = trimField(
    process.env.INQUIRY_FROM_EMAIL ?? "Buttercup Bebe Inquiry <onboarding@resend.dev>",
    200,
  );

  if (!resendApiKey) {
    return NextResponse.json(
      {
        message: `Inquiry service is not configured yet. Please email ${toEmail}.`,
      },
      { status: 503 },
    );
  }

  const subject = `Buttercup Bebe inquiry: ${payload.inquiryType}`;
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Chicago",
  });

  const text = [
    "New inquiry from buttercupbebe.net",
    "",
    `Submitted: ${submittedAt} (America/Chicago)`,
    `Name: ${payload.name}`,
    `Store: ${payload.storeName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Inquiry Type: ${payload.inquiryType}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <h2>New inquiry from buttercupbebe.net</h2>
    <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)} (America/Chicago)</p>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Store:</strong> ${escapeHtml(payload.storeName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Inquiry Type:</strong> ${escapeHtml(payload.inquiryType)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
  `;

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();
    console.error("Inquiry email send failed:", errorBody);
    return NextResponse.json(
      { message: `Unable to send inquiry right now. Please email ${toEmail}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
