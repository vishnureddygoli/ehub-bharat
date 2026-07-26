import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { after, before, describe, test } from "node:test";

const port = 3100;
const baseUrl = `http://127.0.0.1:${port}`;
let server;

before(async () => {
  server = spawn("npm", ["run", "start"], {
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  await waitForServer();
});

after(() => {
  if (server && !server.killed) {
    server.kill("SIGTERM");
  }
});

describe("EHUB Bharat production smoke test", () => {
  test("primary public routes return 200", async () => {
    const routes = [
      "/",
      "/government-ev-infrastructure",
      "/manufacturing",
      "/ev-chargers",
      "/technology",
      "/energy-bess",
      "/ppp-commercial-models",
      "/projects",
      "/tender-rfp-desk",
      "/knowledge-centre",
      "/contact/government-project-desk",
      "/government/highway-corridor-charging",
      "/ev-chargers/ac",
      "/privacy",
      "/terms",
    ];

    for (const route of routes) {
      const response = await fetch(`${baseUrl}${route}`);
      assert.equal(response.status, 200, route);
    }
  });

  test("legacy URLs return 301 redirects", async () => {
    const routes = new Map([
      ["/charging-solutions", "/government-ev-infrastructure"],
      ["/apartment-ev-charging", "/apartments"],
      ["/fleet-charging", "/private-fleets"],
      ["/pricing-business-models", "/ppp-commercial-models"],
      ["/contact", "/contact/government-project-desk"],
      ["/blog/ocpp-16j-vs-201-cpos-india", "/knowledge-centre"],
    ]);

    for (const [source, destination] of routes) {
      const response = await fetch(`${baseUrl}${source}`, { redirect: "manual" });
      assert.equal(response.status, 301, source);
      assert.equal(new URL(response.headers.get("location")).pathname, destination);
    }
  });

  test("government enquiry POST returns a reference number", async () => {
    const form = new FormData();
    form.set("organization", "Automated Test Department");
    form.set("contactName", "Test Officer");
    form.set("designation", "Commissioner");
    form.set("email", "officer@example.gov.in");
    form.set("phone", "9999999999");
    form.set("state", "Telangana");
    form.set("cityDistrict", "Hyderabad");
    form.set("projectCategory", "City charging network");
    form.set("procurementStage", "Feasibility assessment");
    form.set("description", "Automated smoke test enquiry");
    form.set("consent", "on");

    const response = await fetch(`${baseUrl}/api/government-enquiry`, {
      method: "POST",
      body: form,
    });
    const json = await response.json();
    assert.equal(response.status, 200);
    assert.equal(json.ok, true);
    assert.match(json.reference, /^EHB-GOV-\d{8}-[A-Z0-9]{6}$/);
  });

  test("sitemap and robots are crawlable", async () => {
    const sitemap = await fetch(`${baseUrl}/sitemap.xml`);
    const robots = await fetch(`${baseUrl}/robots.txt`);

    assert.equal(sitemap.status, 200);
    assert.equal(robots.status, 200);
    assert.match(await sitemap.text(), /government-ev-infrastructure/);
    assert.match(await robots.text(), /Sitemap:/);
  });
});

async function waitForServer() {
  const started = Date.now();
  while (Date.now() - started < 30_000) {
    if (server.exitCode !== null) {
      throw new Error("Production server exited before becoming ready.");
    }
    try {
      const response = await fetch(baseUrl);
      if (response.status === 200) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error("Timed out waiting for production server.");
}
