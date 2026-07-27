// Single source of truth for security response headers.
// Applied to static assets via next.config.ts headers() and to dynamic/SSR
// responses via proxy.ts middleware (vinext applies next.config headers only to
// static assets, so both are required and must stay in sync).

// Notes on the CSP:
// - 'unsafe-inline' is required for framework hydration bootstrap scripts and
//   the JSON-LD blocks injected via dangerouslySetInnerHTML. Removing it needs
//   a nonce/hash strategy across the RSC runtime; tracked as future work.
// - 'unsafe-eval' is intentionally NOT present (not needed by the production
//   bundle).
export const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export const securityHeaders: Array<{ key: string; value: string }> = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
];
