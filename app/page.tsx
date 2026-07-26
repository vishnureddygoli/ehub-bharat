import type { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumbs,
  DownloadPanel,
  JsonLd,
  PageHero,
  SectionIntro,
  SiteFrame,
} from "./components/SiteFrame";
import { FleetChargingEstimator } from "./components/GovernmentDeskForm";
import {
  GovernmentSolutionSelector,
  LifecycleTimeline,
  OperationsPlatformView,
  SiteReadinessChecklist,
} from "./components/ProjectTools";
import {
  brand,
  commercialModels,
  deliveryPillars,
  downloads,
  governanceItems,
  knowledgeArticles,
  manufacturingAddress,
  proofPoints,
  siteDate,
} from "./data/site";

export const metadata: Metadata = {
  title:
    "Government EV Charging Infrastructure and EV Charger Manufacturing | EHUB Bharat",
  description:
    "EHUB Bharat plans, manufactures, deploys and operates EV charging and energy infrastructure for governments, PSUs, institutions, fleets and public assets in India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Building India's Public EV Charging Infrastructure",
    description:
      "An integrated EV charging infrastructure and EV charger manufacturing partner for governments, public-sector organizations and institutions.",
    url: "/",
    siteName: "EHUB Bharat",
    images: [
      {
        url: "/og-government-projects.png",
        width: 1200,
        height: 630,
        alt: "EHUB Bharat government EV infrastructure capability",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building India's Public EV Charging Infrastructure",
    description:
      "EHUB Bharat supports public EV charging projects from planning and manufacturing to deployment and operations.",
    images: ["/og-government-projects.png"],
  },
};

export default function Home() {
  return (
    <SiteFrame>
      <JsonLd data={organizationSchema()} />
      <PageHero
        eyebrow="Government EV Infrastructure - Charger Manufacturing in Telangana"
        title="Building India's Public EV Charging Infrastructure"
        summary="EHUB Bharat works with governments, urban development authorities, public-sector organizations and institutions to plan, manufacture, deploy and operate reliable EV charging and energy infrastructure across cities, highways, public fleets and strategic assets."
      >
        <div className="hero-actions">
          <Link className="button button--primary" href="/contact/government-project-desk">
            Request an Executive Briefing
          </Link>
          <Link className="button button--secondary" href={downloads.capability}>
            Download Capability Statement
          </Link>
          <Link className="text-link" href="/manufacturing">
            Explore Our Manufacturing Facility
          </Link>
        </div>
      </PageHero>

      <section className="proof-strip" aria-label="Verified positioning">
        <div className="site-container proof-strip__grid">
          {proofPoints.map((point) => (
            <div key={point}>
              <span aria-hidden="true" />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="site-container">
          <SectionIntro
            eyebrow="One Accountable Partner"
            title="From project vision to live operations."
            summary="Senior public-sector buyers need fewer handoffs and clearer accountability. EHUB Bharat's delivery narrative is structured around Plan, Manufacture, Deploy and Operate."
          />
          <div className="pillar-grid">
            {deliveryPillars.map((pillar) => (
              <article className="pillar-card" key={pillar.title}>
                <span>{pillar.title.slice(0, 1)}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.summary}</p>
                <ul>
                  {pillar.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band content-band--warm">
        <div className="site-container">
          <GovernmentSolutionSelector />
        </div>
      </section>

      <section className="manufacturing-spotlight">
        <div className="site-container manufacturing-grid">
          <div>
            <p className="eyebrow">Manufacturing Spotlight</p>
            <h2>EV Charger Manufacturing in Telangana</h2>
            <p>
              EHUB Bharat presents its own EV charger manufacturing facility in
              Telangana as a core part of the public-infrastructure offer.
              Capacity, certifications, product ratings and factory metrics
              should be added only after approved documents are available.
            </p>
            <address>{manufacturingAddress}</address>
            <div className="button-row">
              <Link className="button button--primary" href="/manufacturing">
                Review Manufacturing Page
              </Link>
              <Link className="button button--secondary" href="/contact/government-project-desk">
                Request Factory Visit
              </Link>
            </div>
          </div>
          <div className="factory-blueprint" role="img" aria-label="Neutral technical blueprint of EV charger manufacturing process">
            <div>Incoming materials</div>
            <div>Assembly</div>
            <div>Electrical checks</div>
            <div>Documentation</div>
          </div>
        </div>
      </section>

      <LifecycleTimeline />

      <section className="content-band">
        <div className="site-container">
          <SectionIntro
            eyebrow="Procurement and Commercial Models"
            title="Commercial structures for public-infrastructure evaluation."
            summary="Every project model must be reviewed against ownership, investment, operating responsibility, revenue mechanism, maintenance scope and procurement rules."
          />
          <div className="model-grid">
            {commercialModels.map((model) => (
              <article className="model-card" key={model.name}>
                <h3>{model.name}</h3>
                <dl>
                  <div>
                    <dt>Ownership</dt>
                    <dd>{model.ownership}</dd>
                  </div>
                  <div>
                    <dt>Investment</dt>
                    <dd>{model.investment}</dd>
                  </div>
                  <div>
                    <dt>Operations</dt>
                    <dd>{model.operation}</dd>
                  </div>
                  <div>
                    <dt>Suitable for</dt>
                    <dd>{model.suitableFor}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <div className="section-action">
            <Link className="button button--secondary" href="/ppp-commercial-models">
              Compare Procurement Models
            </Link>
          </div>
        </div>
      </section>

      <section className="content-band content-band--warm">
        <div className="site-container">
          <OperationsPlatformView />
        </div>
      </section>

      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Governance and Transparency"
              title="Project records that procurement committees can audit."
              summary="Government EV infrastructure needs operating clarity after commissioning, not only equipment delivery."
            />
            <ul className="check-list">
              {governanceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <SiteReadinessChecklist />
        </div>
      </section>

      <section className="content-band content-band--ink">
        <div className="site-container projects-framework">
          <SectionIntro
            eyebrow="Projects and Credentials"
            title="Government Project Delivery Framework"
            summary="The public website does not invent case studies. Until approved project records are supplied, EHUB Bharat presents its delivery framework and uses clear status labels for future project evidence."
          />
          <div className="status-grid">
            {["Concept", "Proposed", "Feasibility", "Pilot", "Under Implementation", "Commissioned", "Operational"].map(
              (status) => (
                <span key={status}>{status}</span>
              ),
            )}
          </div>
          <Link className="button button--light" href="/projects">
            View Project Framework
          </Link>
        </div>
      </section>

      <section className="content-band">
        <div className="site-container">
          <SectionIntro
            eyebrow="Knowledge and Policy Centre"
            title="Executive notes for public EV infrastructure planning."
            summary="Articles are dated, jurisdiction-aware and written as planning guidance, not legal advice."
          />
          <div className="article-grid">
            {knowledgeArticles.slice(0, 4).map((article) => (
              <article className="article-card" key={article.slug}>
                <p>{article.jurisdiction} - Reviewed {article.reviewed}</p>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <Link href="/knowledge-centre">Read in Knowledge Centre</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band content-band--warm">
        <div className="site-container">
          <FleetChargingEstimator />
        </div>
      </section>

      <section className="final-cta">
        <div className="site-container final-cta__grid">
          <div>
            <Breadcrumbs items={[{ href: "/", label: "Government EV Infrastructure" }]} />
            <p className="eyebrow">Executive Action</p>
            <h2>Planning an EV infrastructure programme?</h2>
            <p>
              Engage EHUB Bharat for a government project briefing,
              site-feasibility discussion, manufacturing review or procurement
              consultation.
            </p>
          </div>
          <div>
            <DownloadPanel />
            <div className="button-stack">
              <Link className="button button--primary" href="/contact/government-project-desk">
                Request Executive Briefing
              </Link>
              <Link className="button button--secondary" href="/tender-rfp-desk">
                Invite EHUB Bharat to an EOI or RFP
              </Link>
              <Link className="button button--secondary" href="/contact/government-project-desk">
                Schedule Factory Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content-band">
        <div className="site-container">
          <SectionIntro
            eyebrow="Secondary Pathway"
            title="Private-sector charging remains available."
            summary="Apartments, private fleets, retail hosts and franchise conversations are retained, but no longer dominate the primary government narrative."
          />
          <div className="compact-link-grid">
            <Link href="/apartments">Apartments and gated communities</Link>
            <Link href="/private-fleets">Private fleets</Link>
            <Link href="/retail-hosts">Retail hosts</Link>
            <Link href="/franchise">Franchise partners</Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

function organizationSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Corporation",
      name: brand.name,
      legalName: brand.legalName,
      url: brand.url,
      logo: `${brand.url}${brand.logo}`,
      email: brand.email,
      telephone: brand.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: brand.city,
        addressRegion: brand.region,
        addressCountry: brand.country,
      },
      sameAs: Object.values(brand.social),
    },
    {
      "@context": "https://schema.org",
      "@type": "Place",
      name: "EHUB Bharat EV Charger Manufacturing Facility",
      address: {
        "@type": "PostalAddress",
        streetAddress: manufacturingAddress,
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      additionalProperty: {
        "@type": "PropertyValue",
        name: "Claim status",
        value:
          "Manufacturing address supplied for public website. Map coordinates and additional factory claims require verification before publication.",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Government EV charging infrastructure planning, manufacturing, deployment and operations",
      provider: {
        "@type": "Corporation",
        name: brand.name,
      },
      areaServed: "India",
      serviceType:
        "EV charging infrastructure, EV charger manufacturing, project planning, deployment, operations and maintenance",
      url: brand.url,
      dateModified: siteDate,
    },
  ];
}
