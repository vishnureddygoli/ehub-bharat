import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Government Project Desk enquiries.
// Stored in a private D1 database (never exposed publicly). Contains lead PII
// collected with consent for project review; see docs/PRIVACY_DATA_FLOW.md.
export const enquiries = sqliteTable("enquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  reference: text("reference").notNull().unique(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),

  // Contact
  organization: text("organization").notNull(),
  contactName: text("contact_name").notNull(),
  designation: text("designation").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  state: text("state").notNull(),
  cityDistrict: text("city_district").notNull(),

  // Project
  projectCategory: text("project_category").notNull(),
  procurementStage: text("procurement_stage").notNull(),
  locations: text("locations"),
  assets: text("assets"),
  fleetSize: text("fleet_size"),
  dailyDemand: text("daily_demand"),
  powerAvailability: text("power_availability"),
  projectModel: text("project_model"),
  timeline: text("timeline"),
  description: text("description").notNull(),

  // Meta
  utm: text("utm"),
  hasDocument: integer("has_document", { mode: "boolean" }).notNull().default(false),
  clientHash: text("client_hash"),
  status: text("status").notNull().default("new"),
});
