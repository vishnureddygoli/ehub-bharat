import Link from "next/link";
import Image from "next/image";
import {
  brand,
  downloads,
  primaryNav,
  secondaryNav,
  utilityNav,
} from "../data/site";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  align?: "left" | "center";
};

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="utility-bar" aria-label="Utility navigation">
          <div className="site-container utility-bar__inner">
            {utilityNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="site-container main-nav">
          <Link className="brand-mark" href="/" aria-label="EHUB Bharat home">
            <Image src={brand.logo} alt={brand.logoAlt} width={220} height={73} priority />
          </Link>
          <nav className="primary-nav" aria-label="Primary navigation">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="nav-cta" href="/contact/government-project-desk">
            Government Project Desk
          </Link>
          <details className="mobile-nav">
            <summary aria-label="Open navigation">Menu</summary>
            <nav aria-label="Mobile navigation">
              {[...primaryNav, ...secondaryNav].map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link href="/contact/government-project-desk">
                Government Project Desk
              </Link>
            </nav>
          </details>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Link className="footer-brand" href="/" aria-label="EHUB Bharat home">
            <Image src={brand.logo} alt={brand.logoAlt} width={220} height={73} />
          </Link>
          <p>
            EHUB Bharat is positioned as an integrated EV charging
            infrastructure and EV charger manufacturing partner for governments,
            public-sector organizations and institutions.
          </p>
          <address>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a>
          </address>
        </div>
        <div>
          <h2>Government</h2>
          <ul>
            <li>
              <Link href="/government-ev-infrastructure">
                Government Projects
              </Link>
            </li>
            <li>
              <Link href="/project-development">Project Development</Link>
            </li>
            <li>
              <Link href="/operations-maintenance">Operations & Maintenance</Link>
            </li>
            <li>
              <Link href="/government-mis-reporting">MIS & Reporting</Link>
            </li>
            <li>
              <Link href="/tender-rfp-desk">Tender & RFP Desk</Link>
            </li>
            <li>
              <Link href="/ppp-commercial-models">Procurement Models</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            <li>
              <Link href="/manufacturing">Manufacturing</Link>
            </li>
            <li>
              <Link href="/technology">Technology</Link>
            </li>
            <li>
              <Link href="/compliance-certifications">Compliance</Link>
            </li>
            <li>
              <Link href="/leadership">Leadership</Link>
            </li>
            <li>
              <Link href="/resources">Resources</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Private Sector</h2>
          <ul>
            {secondaryNav.slice(0, 5).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="site-container footer-lower">
        <p>Copyright 2026 EHUB Bharat. All rights reserved.</p>
        <nav aria-label="Legal links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/security">Security</Link>
          <Link href="/sitemap">Sitemap</Link>
        </nav>
      </div>
      <div className="site-container footer-note">
        <p>
          Documents, technical specifications, commercial models and project
          timelines are subject to formal review, site feasibility and the
          applicable procurement process.
        </p>
      </div>
    </footer>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  summary,
  align = "left",
}: SectionIntroProps) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {summary ? <p>{summary}</p> : null}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ href: string; label: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} aria-current={index === items.length - 1 ? "page" : undefined}>
            {index === items.length - 1 ? item.label : <Link href={item.href}>{item.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function DownloadPanel() {
  return (
    <div className="download-panel" aria-label="Government downloads">
      <Link href={downloads.capability}>Government Capability Statement</Link>
      <Link href={downloads.manufacturing}>Manufacturing Profile</Link>
      <Link href={downloads.projectSummary}>Printer-Friendly Project Summary</Link>
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="site-container page-hero__grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{summary}</p>
          {children}
        </div>
        <div className="infrastructure-visual" aria-hidden="true">
          <div className="visual-grid">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="route-line route-line--one" />
          <div className="route-line route-line--two" />
          <div className="facility-node">Factory</div>
          <div className="site-node site-node--one">City</div>
          <div className="site-node site-node--two">Fleet</div>
          <div className="site-node site-node--three">Highway</div>
        </div>
      </div>
    </section>
  );
}
