import { NextResponse } from "next/server";

const requiredFields = [
  "organization",
  "contactName",
  "designation",
  "email",
  "phone",
  "state",
  "cityDistrict",
  "projectCategory",
  "procurementStage",
  "description",
  "consent",
];

const allowedFileTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
]);

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const tenMinutes = 10 * 60 * 1000;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin && host) {
    const originHost = new URL(origin).host;
    if (originHost !== host) {
      return NextResponse.json(
        { ok: false, message: "Request origin could not be verified." },
        { status: 403 },
      );
    }
  }

  const clientKey =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    "local";
  const now = Date.now();
  const current = requestCounts.get(clientKey);
  if (current && current.resetAt > now && current.count >= 5) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }
  requestCounts.set(clientKey, {
    count: current && current.resetAt > now ? current.count + 1 : 1,
    resetAt: now + tenMinutes,
  });

  try {
    const formData = await request.formData();
    if (String(formData.get("company_website") || "").trim()) {
      return NextResponse.json({ ok: true, reference: createReference() });
    }

    const missing = requiredFields.filter((field) => !String(formData.get(field) || "").trim());
    if (missing.length) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const email = String(formData.get("email"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid official work email." },
        { status: 400 },
      );
    }

    const file = formData.get("document");
    if (file instanceof File && file.size > 0) {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { ok: false, message: "Uploaded documents must be 10 MB or smaller." },
          { status: 400 },
        );
      }
      if (!allowedFileTypes.has(file.type)) {
        return NextResponse.json(
          { ok: false, message: "Uploaded document type is not accepted." },
          { status: 400 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      reference: createReference(),
      message: "Government project enquiry recorded.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "The enquiry could not be processed securely." },
      { status: 400 },
    );
  }
}

function createReference() {
  const date = new Date();
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `EHB-GOV-${yyyy}${mm}${dd}-${suffix}`;
}
