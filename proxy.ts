import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirects } from "./app/data/site";
import { securityHeaders } from "./security-headers";

export function proxy(request: NextRequest) {
  const legacyRedirect = redirects.find(
    (redirect) => redirect.source === request.nextUrl.pathname,
  );
  const response = legacyRedirect
    ? NextResponse.redirect(new URL(legacyRedirect.destination, request.url), 301)
    : NextResponse.next();

  const isHttps = request.nextUrl.protocol === "https:";
  for (const { key, value } of securityHeaders) {
    // Only emit HSTS over HTTPS (harmless but meaningless over http/local).
    if (key === "Strict-Transport-Security" && !isHttps) continue;
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|brand|downloads).*)",
};
