/**
 * Vercel serverless function — POST /api/contact
 *
 * Receives the contact form payload from the client and forwards it to
 * Resend's email API. The RESEND_API_KEY lives only on the server
 * (Vercel environment variables) and never reaches the browser.
 *
 * No SDK required — Resend exposes a plain REST endpoint.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = "edufulgodfred22@gmail.com";

const ALLOWED_ORIGINS = [
  "https://godfrededuful.vercel.app",
  "http://localhost:5173",
];

const MAX_NAME = 120;
const MAX_MESSAGE = 5000;

function isAllowedOrigin(origin) {
  return origin === undefined || ALLOWED_ORIGINS.includes(origin);
}

function sendError(res, status, message) {
  res.status(status).setHeader("Cache-Control", "no-store").json({ ok: false, error: message });
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    sendError(res, 405, "Method not allowed");
    return;
  }

  if (!isAllowedOrigin(req.headers.origin)) {
    sendError(res, 403, "Origin not allowed");
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured on the server");
    sendError(res, 500, "Email service is not configured yet");
    return;
  }

  let body;
  try {
    body = typeof req.body === "object" && req.body !== null ? req.body : JSON.parse(req.body || "{}");
  } catch {
    sendError(res, 400, "Invalid JSON payload");
    return;
  }

  // Honeypot — bots fill hidden fields; humans never see them.
  if (body.website) {
    res.status(200).json({ ok: true });
    return;
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > MAX_NAME) {
    sendError(res, 400, "Please provide your name");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    sendError(res, 400, "Please provide a valid email address");
    return;
  }
  if (!message || message.length > MAX_MESSAGE) {
    sendError(res, 400, "Please write a message (max 5000 characters)");
    return;
  }

  const subject = `Portfolio message from ${name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #0c0c10;">New message from your portfolio</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px 0; color: #565b66;">From</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(name)} (${escapeHtml(email)})</td></tr>
        <tr><td style="padding: 8px 0; color: #565b66;">Subject</td><td style="padding: 8px 0;">Portfolio enquiry</td></tr>
      </table>
      <p style="white-space: pre-wrap; border-top: 1px solid #e2e5ea; padding-top: 16px; line-height: 1.6;">${escapeHtml(message)}</p>
      <p style="color: #a1a1aa; font-size: 12px; margin-top: 24px;">Sent from godfrededuful.vercel.app</p>
    </div>
  `;

  try {
    const resendRes = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Godfred Eduful Portfolio <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        html,
      }),
    });

    const resendData = await resendRes.json().catch(() => ({}));
    if (!resendRes.ok) {
      console.error("[contact] Resend error:", resendData);
      sendError(res, 502, "The email service could not send the message");
      return;
    }

    res.status(200).json({ ok: true, id: resendData.id ?? null });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    sendError(res, 500, "Something went wrong while sending your message");
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
