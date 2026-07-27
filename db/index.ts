import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type Db = NonNullable<Awaited<ReturnType<typeof getDb>>>;

/**
 * Idempotent safety net so a freshly-provisioned D1 (local `vinext dev` or a
 * deploy before `drizzle/` migrations are applied) never drops a lead. The
 * canonical schema is the Drizzle migration in `drizzle/`; keep this DDL in
 * sync with `db/schema.ts`.
 */
export async function ensureEnquiriesTable(db: Db) {
  await db.run(sql`CREATE TABLE IF NOT EXISTS enquiries (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    reference text NOT NULL,
    created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL,
    organization text NOT NULL,
    contact_name text NOT NULL,
    designation text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    state text NOT NULL,
    city_district text NOT NULL,
    project_category text NOT NULL,
    procurement_stage text NOT NULL,
    locations text,
    assets text,
    fleet_size text,
    daily_demand text,
    power_availability text,
    project_model text,
    timeline text,
    description text NOT NULL,
    utm text,
    has_document integer DEFAULT false NOT NULL,
    client_hash text,
    status text DEFAULT 'new' NOT NULL
  )`);
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS enquiries_reference_unique ON enquiries (reference)`,
  );
}

/**
 * Returns a Drizzle client for the Cloudflare D1 binding, or `null` when the
 * binding is unavailable in the current runtime.
 *
 * IMPORTANT: `cloudflare:workers` is imported lazily. `vinext start` runs under
 * plain Node (no Cloudflare bindings); a top-level `import ... from
 * "cloudflare:workers"` crashes the preview at boot. The binding only exists
 * under `vinext dev` (workerd/Miniflare) and on deploy. Callers must handle a
 * `null` result (e.g. skip persistence during the Node preview).
 */
export async function getDb() {
  let env: { DB?: D1Database } | undefined;
  try {
    ({ env } = (await import("cloudflare:workers")) as { env: { DB?: D1Database } });
  } catch {
    // Not running inside the Workers runtime (e.g. Node preview / tests).
    return null;
  }
  if (!env?.DB) {
    return null;
  }
  return drizzle(env.DB, { schema });
}
