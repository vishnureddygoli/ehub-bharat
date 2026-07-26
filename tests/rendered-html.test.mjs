import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { after, before, describe, test } from "node:test";

let port;
let baseUrl;
let server;

before(async () => {
  port = await getAvailablePort();
  baseUrl = `http://127.0.0.1:${port}`;
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

  test("homepage presents assurance and procurement confidence content", async () => {
    const response = await fetch(`${baseUrl}/`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /Executive Assurance/);
    assert.match(html, /Procurement Confidence Matrix/);
    assert.match(html, /No invented capacity, certifications, contracts or ratings/);
  });

  test("important security headers are present", async () => {
    const response = await fetch(`${baseUrl}/`);

    assert.equal(response.status, 200);
    assert.ok(response.headers.get("content-security-policy"));
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  });

  test("public downloads and social cards are available", async () => {
    const assets = [
      "/downloads/ehub-bharat-government-capability-statement.pdf",
      "/downloads/ehub-bharat-manufacturing-profile.pdf",
      "/downloads/ehub-bharat-government-project-summary.pdf",
      "/og-government-projects.png",
      "/og-manufacturing.png",
    ];

    for (const asset of assets) {
      const response = await fetch(`${baseUrl}${asset}`);
      assert.equal(response.status, 200, asset);
      const body = await response.arrayBuffer();
      assert.ok(body.byteLength > 1000, asset);
    }
  });

  test("legacy URLs return 301 redirects", async () => {
    const routes = new Map([
      ["/charging-solutions", "/government-ev-infrastructure"],
      ["/public-charging-network", "/government-ev-infrastructure"],
      ["/apartment-ev-charging", "/apartments"],
      ["/fleet-charging", "/private-fleets"],
      ["/retail-host-partnership", "/retail-hosts"],
      ["/franchise-partner-with-us", "/franchise"],
      ["/bess-and-solar-energy", "/energy-bess"],
      ["/technology-platform", "/technology"],
      ["/operator-dashboard", "/technology"],
      ["/pricing-business-models", "/ppp-commercial-models"],
      ["/contact", "/contact/government-project-desk"],
      ["/blog", "/knowledge-centre"],
      ["/faq", "/knowledge-centre"],
      ["/ev-charging-stations-hyderabad", "/government-ev-infrastructure"],
      ["/apartment-ev-charging-hyderabad", "/apartments"],
      ["/fleet-ev-charging-hyderabad", "/private-fleets"],
      ["/ev-charging-franchise-india", "/franchise"],
      ["/ev-charger-installation-india", "/ev-chargers"],
      ["/ocpp-ev-charging-software-india", "/technology"],
      ["/upi-qr-ev-charging-india", "/technology"],
      ["/bess-solar-ev-charging-india", "/energy-bess"],
      ["/retail-host-ev-charging-india", "/retail-hosts"],
      ["/highway-ev-charging-hubs-india", "/government/highway-corridor-charging"],
      ["/blog/ocpp-16j-vs-201-cpos-india", "/knowledge-centre"],
      ["/blog/upi-qr-payment-flow-ev-charging-india", "/knowledge-centre"],
      ["/blog/apartment-ev-charging-india-guide", "/apartments"],
      ["/blog/ev-charging-franchise-india-explained", "/franchise"],
      ["/blog/ocpp-qr-upi-ev-charging-software", "/technology"],
    ]);

    for (const [source, destination] of routes) {
      const response = await fetch(`${baseUrl}${source}`, { redirect: "manual" });
      assert.equal(response.status, 301, source);
      assert.equal(new URL(response.headers.get("location"), baseUrl).pathname, destination);
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
      if (response.status === 200) {
        const html = await response.text();
        if (html.includes("EHUB Bharat")) return;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error("Timed out waiting for production server.");
}

async function getAvailablePort() {
  return await new Promise((resolve, reject) => {
    const probe = createServer();
    probe.on("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      probe.close(() => {
        if (typeof address === "object" && address) {
          resolve(address.port);
        } else {
          reject(new Error("Unable to allocate an available port."));
        }
      });
    });
  });
}
