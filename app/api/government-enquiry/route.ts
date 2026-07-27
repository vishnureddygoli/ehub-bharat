import { NextResponse } from "next/server";
import { getDb, ensureEnquiriesTable } from "@/db";
import { enquiries } from "@/db/schema";

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
    let hasDocument = false;
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
      // NOTE: the file itself is not stored yet — secure object storage (R2) and
      // malware scanning are pending. We only record that a document was attached.
      hasDocument = true;
    }

    const reference = createReference();
    const field = (name: string) => {
      const value = String(formData.get(name) || "").trim();
      return value.length ? value : null;
    };

    const record: EnquiryRecord = {
      reference,
      organization: String(formData.get("organization")),
      contactName: String(formData.get("contactName")),
      designation: String(formData.get("designation")),
      email,
      phone: String(formData.get("phone")),
      state: String(formData.get("state")),
      cityDistrict: String(formData.get("cityDistrict")),
      projectCategory: String(formData.get("projectCategory")),
      procurementStage: String(formData.get("procurementStage")),
      locations: field("locations"),
      assets: field("assets"),
      fleetSize: field("fleetSize"),
      dailyDemand: field("dailyDemand"),
      powerAvailability: field("powerAvailability"),
      projectModel: field("projectModel"),
      timeline: field("timeline"),
      description: String(formData.get("description")),
      utm: field("utm"),
      hasDocument,
      clientHash: await hashClient(clientKey),
    };

    // Persist to the private D1 store when the binding is available.
    // - No binding (Node preview / not configured): skip and still return the
    //   reference so the applicant is never blocked.
    // - Binding present but the write fails: return an honest 503 rather than a
    //   faked success, so a real government lead is never lost silently.
    const db = await getDb();
    if (db) {
      try {
        await ensureEnquiriesTable(db);
        await db.insert(enquiries).values(record);
      } catch (error) {
        console.error(
          `Enquiry ${reference} could not be persisted to D1:`,
          error instanceof Error ? error.message : error,
        );
        return NextResponse.json(
          {
            ok: false,
            message:
              "We could not record your enquiry right now. Please try again shortly or email the address on the Contact page.",
          },
          { status: 503 },
        );
      }
    } else {
      console.warn(
        `Enquiry ${reference} not persisted: D1 binding unavailable in this runtime.`,
      );
    }

    return NextResponse.json({
      ok: true,
      reference,
      message: "Government project enquiry recorded.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "The enquiry could not be processed securely." },
      { status: 400 },
    );
  }
}

type EnquiryRecord = typeof enquiries.$inferInsert;

async function hashClient(key: string) {
  try {
    const data = new TextEncoder().encode(`ehub-gov:${key}`);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);
  } catch {
    return null;
  }
}

function createReference() {
  const date = new Date();
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `EHB-GOV-${yyyy}${mm}${dd}-${suffix}`;
}
