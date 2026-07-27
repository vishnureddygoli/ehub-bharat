// Generate raster brand assets (favicons, PWA icons, apple-touch, OG images)
// from the approved EHUB Bharat vector sources in public/brand/.
// Run: node scripts/generate-brand-assets.mjs
// Requires: sharp (already present via the toolchain).
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brand = join(root, "public", "brand");
const pub = join(root, "public");

const RED = "#D71920";
const GRAPHITE = "#20252B";
const INK = "#101820";

const horizontalSvg = readFileSync(join(brand, "ehub-bharat-horizontal.svg"));
const iconSvg = readFileSync(join(brand, "ehub-bharat-icon.svg"));
const appIconSvg = readFileSync(join(brand, "ehub-bharat-app-icon.svg"));
const maskableSvg = readFileSync(join(brand, "ehub-bharat-icon-maskable.svg"));
// Reverse logo ships with its own dark tile; strip it for transparent compositing.
const reverseLogoSvg = Buffer.from(
  readFileSync(join(brand, "ehub-bharat-horizontal-reverse.svg"), "utf8").replace(
    /<rect\s+width="1500"\s+height="500"\s+fill="#171B20"\s*\/>/,
    "",
  ),
);

const png = (svg, size) => sharp(svg).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png();

async function writePng(svg, size, out) {
  await png(svg, size).toFile(join(pub, out));
  console.log("  ✓", out, `(${size}px)`);
}

// ---- Favicon ICO (16/32/48, PNG-compressed entries) ----
function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);
  const dir = Buffer.alloc(16 * count);
  let offset = 6 + dir.length;
  const bodies = [];
  images.forEach((img, i) => {
    const b = 16 * i;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, b + 0);
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, b + 1);
    dir.writeUInt8(0, b + 2);
    dir.writeUInt8(0, b + 3);
    dir.writeUInt16LE(1, b + 4);
    dir.writeUInt16LE(32, b + 6);
    dir.writeUInt32LE(img.data.length, b + 8);
    dir.writeUInt32LE(offset, b + 12);
    offset += img.data.length;
    bodies.push(img.data);
  });
  return Buffer.concat([header, dir, ...bodies]);
}

async function generateIcons() {
  console.log("Icons:");
  // Transparent-pin favicon SVG at root (theme-adaptive, crisp)
  writeFileSync(join(pub, "favicon.svg"), iconSvg);
  console.log("  ✓ favicon.svg");
  // Raster favicons from the filled app tile (visible on any tab colour)
  await writePng(appIconSvg, 16, "favicon-16.png");
  await writePng(appIconSvg, 32, "favicon-32.png");
  await writePng(appIconSvg, 48, "favicon-48.png");
  await writePng(appIconSvg, 180, "apple-touch-icon.png");
  await writePng(appIconSvg, 192, "icon-192.png");
  await writePng(appIconSvg, 512, "icon-512.png");
  await writePng(maskableSvg, 512, "icon-maskable-512.png");

  // Raster horizontal logo (transparent) for structured data / email / social
  await sharp(horizontalSvg).resize({ width: 1024 }).png().toFile(join(brand, "ehub-bharat-horizontal-1024.png"));
  console.log("  ✓ brand/ehub-bharat-horizontal-1024.png");

  const ico = buildIco([
    { size: 16, data: await png(appIconSvg, 16).toBuffer() },
    { size: 32, data: await png(appIconSvg, 32).toBuffer() },
    { size: 48, data: await png(appIconSvg, 48).toBuffer() },
  ]);
  writeFileSync(join(pub, "favicon.ico"), ico);
  console.log("  ✓ favicon.ico (16/32/48)");
}

// ---- Open Graph / social cards (1200x630) ----
async function ogCard(out, { eyebrow, title }) {
  const W = 1200, H = 630;
  const logoW = 460;
  const logo = await sharp(reverseLogoSvg).resize({ width: logoW }).png().toBuffer();
  const logoMeta = await sharp(logo).metadata();
  const bg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#171B20"/>
          <stop offset="100%" stop-color="#0E1114"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      <rect x="0" y="0" width="14" height="${H}" fill="${RED}"/>
      <rect x="80" y="300" width="88" height="6" rx="3" fill="${RED}"/>
      <text x="80" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="26" letter-spacing="3" fill="#C7D0D8" font-weight="600">${eyebrow}</text>
      <text x="78" y="378" font-family="Segoe UI, Arial, sans-serif" font-size="52" fill="#FFFFFF" font-weight="800">${title}</text>
      <text x="80" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#9AA6B2">EV charger manufacturing in Telangana · Government &amp; public-sector projects</text>
    </svg>`);
  await sharp(bg)
    .composite([{ input: logo, top: 70, left: 78 }])
    .png()
    .toFile(join(pub, out));
  console.log("  ✓", out, `(logo ${logoMeta.width}x${logoMeta.height})`);
}

async function generateOg() {
  console.log("Open Graph cards:");
  await ogCard("og-default.png", {
    eyebrow: "GOVERNMENT &amp; PUBLIC-SECTOR EV INFRASTRUCTURE",
    title: "Building India's Public EV Charging",
  });
  await ogCard("og-government-projects.png", {
    eyebrow: "GOVERNMENT PROJECTS",
    title: "EV Infrastructure for Institutions",
  });
  await ogCard("og-manufacturing.png", {
    eyebrow: "MANUFACTURING",
    title: "EV Charger Manufacturing, Telangana",
  });
}

await generateIcons();
await generateOg();
console.log("Done.");
