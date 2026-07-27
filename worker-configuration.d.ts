// Cloudflare Workers ambient types for the worker/ entry and D1 access in db/.
// Provides `Fetcher`, `D1Database`, and types the `cloudflare:workers` env bindings.
/// <reference types="@cloudflare/workers-types" />

// Runtime bindings declared in .openai/hosting.json (control plane injects values).
// `import { env } from "cloudflare:workers"` resolves to Cloudflare.Env.
declare namespace Cloudflare {
  interface Env {
    ASSETS: Fetcher;
    DB: D1Database;
  }
}
