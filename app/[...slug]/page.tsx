import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { GovernmentDeskForm, FleetChargingEstimator } from "../components/GovernmentDeskForm";
import {
  BriefingSequence,
  ExecutiveAssurance,
  ProcurementConfidenceMatrix,
  TenderEvaluationChecklist,
} from "../components/AssuranceBlocks";
import {
  ChargerComparison,
  LifecycleTimeline,
  OperationsPlatformView,
  SiteReadinessChecklist,
} from "../components/ProjectTools";
import {
  Breadcrumbs,
  DownloadPanel,
  JsonLd,
  PageHero,
  SectionIntro,
  SiteFrame,
} from "../components/SiteFrame";
import {
  brand,
  caseStudies,
  chargerCategories,
  chargingTimeCaveat,
  commercialModels,
  contractableRoles,
  deliveryPillars,
  downloads,
  governmentFaqs,
  governmentSolutions,
  knowledgeArticles,
  lifecycleSteps,
  manufacturingAddress,
  products,
  redirects,
  siteDate,
  technologyCapabilities,
} from "../data/site";

type Params = Promise<{ slug: string[] }>;

type StaticPage = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  kind:
    | "government"
    | "manufacturing"
    | "chargers"
    | "products"
    | "technology"
    | "energy"
    | "commercial"
    | "projects"
    | "tender"
    | "knowledge"
    | "about"
    | "contact"
    | "private"
    | "operations"
    | "mis"
    | "methodology"
    | "compliance"
    | "leadership"
    | "careers"
    | "resources"
    | "sitemap"
    | "legal";
};

const staticPages: StaticPage[] = [
  {
    path: "/government-ev-infrastructure",
    eyebrow: "Government Projects Hub",
    title: "EV Infrastructure for Governments and Public Institutions",
    description:
      "A three-minute executive briefing on EHUB Bharat's role across public EV charging planning, manufacturing support, deployment, operations, reporting and procurement pathways.",
    kind: "government",
  },
  {
    path: "/manufacturing",
    eyebrow: "Manufacturing",
    title: "EV Charger Manufacturing Facility in Telangana",
    description:
      "EHUB Bharat's EV charger manufacturing facility address, verified publication boundaries, process overview, product categories and factory-visit pathway.",
    kind: "manufacturing",
  },
  {
    path: "/ev-chargers",
    eyebrow: "EV Chargers",
    title: "EV Charger Categories for Public and Institutional Projects",
    description:
      "AC, DC fast and high-power charging categories for government, institutional, fleet and public charging projects, with product claims controlled by verified datasheets.",
    kind: "chargers",
  },
  {
    path: "/products",
    eyebrow: "Products",
    title: "EV Charger Product Portfolio",
    description:
      "A scalable product portfolio for public and institutional charging. Individual model specifications are published only when an approved datasheet is available.",
    kind: "products",
  },
  {
    path: "/technology",
    eyebrow: "Technology",
    title: "OCPP-Compatible Operations, Payments and Reporting",
    description:
      "Technology view for charger connectivity, session monitoring, QR access, UPI payments, role-based operations, reporting and integration readiness where supported.",
    kind: "technology",
  },
  {
    path: "/energy-bess",
    eyebrow: "Energy and BESS",
    title: "Solar and BESS-Supported EV Charging Infrastructure",
    description:
      "Energy planning, solar integration and battery energy storage considerations for public charging hubs, fleets, campuses and high-demand sites.",
    kind: "energy",
  },
  {
    path: "/ppp-commercial-models",
    eyebrow: "Commercial Models",
    title: "Procurement and Commercial Models for Public EV Charging",
    description:
      "Compare CAPEX, EPC, EPC plus O&M, PPP, concession, revenue-share, site lease and managed-service structures for public EV charging projects.",
    kind: "commercial",
  },
  {
    path: "/projects",
    eyebrow: "Projects",
    title: "Government Project Delivery Framework",
    description:
      "A transparent project framework with status labels and evidence rules. The page avoids invented case studies until approved project records are available.",
    kind: "projects",
  },
  {
    path: "/operations-maintenance",
    eyebrow: "Operations and Maintenance",
    title: "O&M and SLA Framework for Public Charging",
    description:
      "How EHUB Bharat structures preventive and corrective maintenance, fault response, uptime reporting and escalation for government and institutional charging assets.",
    kind: "operations",
  },
  {
    path: "/government-mis-reporting",
    eyebrow: "MIS and Reporting",
    title: "Government MIS and Reporting for EV Charging",
    description:
      "Sample management-information and reporting views for public agencies: site readiness, uptime, energy, utilisation, settlement, safety and asset records. All samples are illustrative.",
    kind: "mis",
  },
  {
    path: "/project-development",
    eyebrow: "Project Development",
    title: "EV Charging Project-Development Methodology",
    description:
      "A disciplined, stage-gated methodology from stakeholder alignment and feasibility through manufacturing, deployment, commissioning and lifecycle operations.",
    kind: "methodology",
  },
  {
    path: "/compliance-certifications",
    eyebrow: "Compliance and Certifications",
    title: "Compliance, Standards and Certification Approach",
    description:
      "The standards and approvals EHUB Bharat designs projects to align with, and a controlled register for certifications published only when evidence is available.",
    kind: "compliance",
  },
  {
    path: "/leadership",
    eyebrow: "Leadership and Governance",
    title: "Leadership and Governance",
    description:
      "EHUB Bharat's governance approach for public-sector delivery. Leadership profiles are published only after names, roles and photographs are approved.",
    kind: "leadership",
  },
  {
    path: "/careers",
    eyebrow: "Careers",
    title: "Careers at EHUB Bharat",
    description:
      "Build India's public EV charging and manufacturing capability. Register interest for engineering, manufacturing, project-delivery, software and field-operations roles.",
    kind: "careers",
  },
  {
    path: "/resources",
    eyebrow: "Resources",
    title: "Resources and Government Downloads",
    description:
      "Capability statement, manufacturing profile, project summary and planning notes for government and institutional evaluation, with a secure route for controlled documents.",
    kind: "resources",
  },
  {
    path: "/sitemap",
    eyebrow: "Sitemap",
    title: "Website Sitemap",
    description:
      "A human-readable index of the EHUB Bharat website for government, manufacturing, technology, commercial and policy sections.",
    kind: "sitemap",
  },
  {
    path: "/cookies",
    eyebrow: "Policy",
    title: "Cookie Notice",
    description:
      "How the EHUB Bharat website uses cookies and similar technologies, and the privacy-conscious approach to analytics.",
    kind: "legal",
  },
  {
    path: "/tender-rfp-desk",
    eyebrow: "Tender and RFP Desk",
    title: "Evaluation Support for EOI, RFI, RFP and Tender Processes",
    description:
      "A procurement desk for capability statements, manufacturing profile, project-delivery method, O&M approach, secure document requests and official enquiries.",
    kind: "tender",
  },
  {
    path: "/knowledge-centre",
    eyebrow: "Knowledge Centre",
    title: "Government EV Infrastructure Planning Notes",
    description:
      "Dated, jurisdiction-aware planning notes on EV charging infrastructure, fleet electrification, electric-bus depot charging, PPP models, BESS and interoperability.",
    kind: "knowledge",
  },
  {
    path: "/about",
    eyebrow: "Company",
    title: "An Integrated EV Infrastructure and Manufacturing Company",
    description:
      "EHUB Bharat's government-focused repositioning, operating philosophy, manufacturing facility and public-infrastructure delivery model.",
    kind: "about",
  },
  {
    path: "/contact/government-project-desk",
    eyebrow: "Government Project Desk",
    title: "Request an Executive Briefing or Project Review",
    description:
      "Dedicated government project enquiry form for departments, PSUs, public institutions, utilities, transport corporations and infrastructure agencies.",
    kind: "contact",
  },
  {
    path: "/private-sector-solutions",
    eyebrow: "Secondary Pathway",
    title: "Private-Sector EV Charging Solutions",
    description:
      "Apartment, private fleet, retail host and franchise conversations remain available as a secondary pathway to the government-focused website.",
    kind: "private",
  },
  {
    path: "/apartments",
    eyebrow: "Private-Sector Solutions",
    title: "EV Charging for Apartments and Gated Communities",
    description:
      "Apartment and gated-community charging conversations with site assessment, resident access, billing and operating support subject to feasibility.",
    kind: "private",
  },
  {
    path: "/private-fleets",
    eyebrow: "Private-Sector Solutions",
    title: "EV Charging for Private Fleets",
    description:
      "Private fleet charging planning for duty cycles, charging windows, software onboarding and operating reports.",
    kind: "private",
  },
  {
    path: "/retail-hosts",
    eyebrow: "Private-Sector Solutions",
    title: "EV Charging for Retail Hosts and Destination Properties",
    description:
      "EV charging conversations for malls, hotels, fuel stations, offices and retail properties, subject to site and commercial feasibility.",
    kind: "private",
  },
  {
    path: "/franchise",
    eyebrow: "Secondary Pathway",
    title: "Franchise and Site-Partner Discussions",
    description:
      "Franchise and site-partner enquiries are retained as secondary pathways with site-specific commercial review and no guaranteed revenue claims.",
    kind: "private",
  },
  {
    path: "/privacy",
    eyebrow: "Policy",
    title: "Privacy Policy",
    description:
      "EHUB Bharat privacy policy for project enquiries, contact details, analytics readiness and document request workflows.",
    kind: "legal",
  },
  {
    path: "/terms",
    eyebrow: "Policy",
    title: "Terms of Use",
    description:
      "Terms for using the EHUB Bharat website, downloads, project enquiry forms and public information.",
    kind: "legal",
  },
  {
    path: "/accessibility",
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    description:
      "Accessibility statement for the EHUB Bharat website, including WCAG 2.2 AA intent and feedback contact details.",
    kind: "legal",
  },
  {
    path: "/disclaimer",
    eyebrow: "Disclaimer",
    title: "Website Disclaimer",
    description:
      "Important limitations on technical specifications, commercial models, project timelines and public information.",
    kind: "legal",
  },
  {
    path: "/security",
    eyebrow: "Security",
    title: "Security Contact and Responsible Disclosure",
    description:
      "Security contact route and responsible disclosure guidance for the EHUB Bharat website.",
    kind: "legal",
  },
];

export function generateStaticParams() {
  const governmentPaths = governmentSolutions.map((solution) => ({
    slug: ["government", solution.slug],
  }));
  const chargerPaths = chargerCategories.map((category) => ({
    slug: ["ev-chargers", category.slug],
  }));
  const productPaths = products.map((product) => ({
    slug: ["products", product.slug],
  }));
  const caseStudyPaths = caseStudies.map((study) => ({
    slug: ["projects", study.slug],
  }));
  const staticPaths = staticPages.map((page) => ({
    slug: page.path.replace(/^\//, "").split("/"),
  }));

  return [
    ...staticPaths,
    ...governmentPaths,
    ...chargerPaths,
    ...productPaths,
    ...caseStudyPaths,
  ];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const legacyRedirect = redirects.find((redirect) => redirect.source === path);
  if (legacyRedirect) {
    permanentRedirect(legacyRedirect.destination);
  }
  const page = resolvePage(path);
  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | EHUB Bharat`,
    description: page.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: path,
      siteName: brand.name,
      images: [
        {
          url: page.kind === "manufacturing" ? "/og-manufacturing.png" : "/og-government-projects.png",
          width: 1200,
          height: 630,
          alt: `${page.title} - EHUB Bharat`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.kind === "manufacturing" ? "/og-manufacturing.png" : "/og-government-projects.png"],
    },
  };
}

export default async function DynamicPage({ params }: { params: Params }) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const page = resolvePage(path);

  if (!page) {
    notFound();
  }

  return (
    <SiteFrame>
      <JsonLd data={schemaForPage(page, path)} />
      <PageHero eyebrow={page.eyebrow} title={page.title} summary={page.description}>
        <div className="hero-actions">
          <Link className="button button--primary" href="/contact/government-project-desk">
            Request Project Discussion
          </Link>
          <Link className="button button--secondary" href="/tender-rfp-desk">
            Tender & RFP Desk
          </Link>
        </div>
      </PageHero>
      <div className="site-container">
        <Breadcrumbs items={[{ href: path, label: page.title }]} />
      </div>
      {renderPage(page, path)}
    </SiteFrame>
  );
}

function resolvePage(path: string): StaticPage | null {
  const staticPage = staticPages.find((page) => page.path === path);
  if (staticPage) return staticPage;

  if (path.startsWith("/government/")) {
    const slug = path.split("/").pop();
    const solution = governmentSolutions.find((item) => item.slug === slug);
    if (!solution) return null;
    return {
      path,
      eyebrow: "Government Solution",
      title: solution.title,
      description: `${solution.problem} EHUB Bharat's role: ${solution.role}`,
      kind: "government",
    };
  }

  if (path.startsWith("/ev-chargers/")) {
    const slug = path.split("/").pop();
    const category = chargerCategories.find((item) => item.slug === slug);
    if (!category) return null;
    return {
      path,
      eyebrow: "EV Charger Category",
      title: category.title,
      description: `${category.intent} ${category.verifiedBoundary}`,
      kind: "chargers",
    };
  }

  if (path.startsWith("/products/")) {
    const slug = path.split("/").pop();
    const product = products.find((item) => item.slug === slug);
    if (!product) return null;
    return {
      path,
      eyebrow: product.category,
      title: product.name,
      description: product.summary,
      kind: "products",
    };
  }

  if (path.startsWith("/projects/")) {
    const slug = path.split("/").pop();
    const study = caseStudies.find((item) => item.slug === slug);
    if (!study) return null;
    return {
      path,
      eyebrow: `Case Study - ${study.status}`,
      title: study.title,
      description: study.scope,
      kind: "projects",
    };
  }

  return null;
}

function renderPage(page: StaticPage, path: string) {
  if (path.startsWith("/government/")) {
    const solution = governmentSolutions.find((item) => path.endsWith(item.slug));
    return solution ? <GovernmentSolutionPage solution={solution} /> : null;
  }
  if (path.startsWith("/ev-chargers/")) {
    const category = chargerCategories.find((item) => path.endsWith(item.slug));
    return category ? <ChargerCategoryPage category={category} /> : null;
  }
  if (path.startsWith("/products/")) {
    const product = products.find((item) => path.endsWith(item.slug));
    return product ? <ProductDetailPage product={product} /> : null;
  }
  if (path.startsWith("/projects/")) {
    const study = caseStudies.find((item) => path.endsWith(item.slug));
    return study ? <CaseStudyPage study={study} /> : null;
  }

  switch (page.kind) {
    case "government":
      return <GovernmentHub />;
    case "manufacturing":
      return <ManufacturingPage />;
    case "chargers":
      return <ChargersPage />;
    case "products":
      return <ProductsIndexPage />;
    case "technology":
      return <TechnologyPage />;
    case "energy":
      return <EnergyPage />;
    case "commercial":
      return <CommercialModelsPage />;
    case "projects":
      return <ProjectsPage />;
    case "operations":
      return <OperationsMaintenancePage />;
    case "mis":
      return <GovernmentMisPage />;
    case "methodology":
      return <ProjectDevelopmentPage />;
    case "compliance":
      return <CompliancePage />;
    case "leadership":
      return <LeadershipPage />;
    case "careers":
      return <CareersPage />;
    case "resources":
      return <ResourcesPage />;
    case "sitemap":
      return <SitemapPage />;
    case "tender":
      return <TenderDeskPage />;
    case "knowledge":
      return <KnowledgeCentrePage />;
    case "about":
      return <AboutPage />;
    case "contact":
      return <ContactPage />;
    case "private":
      return <PrivateSectorPage page={page} />;
    case "legal":
      return <LegalPage page={page} />;
    default:
      return null;
  }
}

function GovernmentHub() {
  const audiences = [
    "State governments",
    "Urban development authorities",
    "Municipal corporations",
    "Transport departments and corporations",
    "PSUs and public institutions",
    "Smart City organizations",
    "Tourism departments",
    "Government fleet operators",
  ];

  return (
    <>
      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Executive Summary"
              title="A complete public charging programme requires planning, equipment, deployment, operations and reporting."
              summary="EHUB Bharat is positioned to support governments and institutions with an accountable delivery model across public charging networks, fleet electrification, bus depots, public buildings, tourism assets and charging hubs."
            />
            <DownloadPanel />
          </div>
          <div className="audience-grid">
            {audiences.map((audience) => (
              <span key={audience}>{audience}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container">
          <SectionIntro
            eyebrow="Government Use Cases"
            title="Project types for public agencies."
            summary="Each use case is framed around the public problem, EHUB Bharat role, assets, stages and commercial model options."
          />
          <div className="solution-card-grid">
            {governmentSolutions.map((solution) => (
              <article className="solution-card" key={solution.slug}>
                <h3>{solution.title}</h3>
                <p>{solution.problem}</p>
                <Link href={`/government/${solution.slug}`}>Open solution brief</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ExecutiveAssurance />
      <LifecycleTimeline />
      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Manufacturing Support"
              title="A Telangana manufacturing facility anchors the delivery story."
              summary="The public site states the facility address and charger categories. Capacity, floor area, machinery, certifications and product ratings remain unpublished until verified."
            />
            <address className="address-panel">{manufacturingAddress}</address>
          </div>
          <SiteReadinessChecklist />
        </div>
      </section>
      <ProcurementConfidenceMatrix />
      <section className="content-band content-band--warm">
        <div className="site-container">
          <OperationsPlatformView />
        </div>
      </section>
      <section className="content-band">
        <div className="site-container">
          <SectionIntro
            eyebrow="Government FAQ"
            title="Answers for public-sector evaluation."
            summary="Direct answers to the questions departments and committees ask first."
          />
          <div className="faq-list">
            {governmentFaqs.map((faq) => (
              <article key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="final-cta">
        <div className="site-container final-cta__grid">
          <div>
            <p className="eyebrow">Procurement Pathway</p>
            <h2>Move from market sounding to formal evaluation.</h2>
            <p>
              Share the project category, procurement stage, site assets and
              documentation needs with the Government Project Desk.
            </p>
          </div>
          <div className="button-stack">
            <Link className="button button--primary" href="/contact/government-project-desk">
              Request Executive Briefing
            </Link>
            <Link className="button button--secondary" href="/tender-rfp-desk">
              Access Tender & RFP Desk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function GovernmentSolutionPage({
  solution,
}: {
  solution: (typeof governmentSolutions)[number];
}) {
  return (
    <>
      <section className="content-band">
        <div className="site-container solution-detail-grid">
          <DetailBlock title="Government problem" text={solution.problem} />
          <DetailBlock title="Proposed EHUB Bharat role" text={solution.role} />
          <DetailBlock title="Typical assets involved" text={solution.assets} />
          <DetailBlock title="Project-delivery stages" text={solution.stages} />
          <DetailBlock title="Commercial-model options" text={solution.models} />
          <DetailBlock
            title="Next action"
            text="Request an executive discussion with available site details, procurement stage and feasibility information."
          />
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container two-column">
          <SiteReadinessChecklist />
          <FleetChargingEstimator />
        </div>
      </section>
      <section className="final-cta">
        <div className="site-container final-cta__grid">
          <div>
            <p className="eyebrow">Project Discussion</p>
            <h2>Prepare a formal project conversation.</h2>
            <p>
              EHUB Bharat can review concept notes, feasibility inputs, DPR
              support requirements, commercial pathways and manufacturing
              documentation needs.
            </p>
          </div>
          <Link className="button button--primary" href="/contact/government-project-desk">
            Request Discussion
          </Link>
        </div>
      </section>
    </>
  );
}

function ManufacturingPage() {
  const process = [
    "Facility overview and operating-rights verification",
    "Incoming-material inspection records",
    "Assembly process documentation",
    "Electrical and functional testing records where available",
    "Product traceability and datasheet control",
    "Service, spares and warranty process verification",
  ];

  return (
    <>
      <section className="content-band">
        <div className="site-container manufacturing-page-grid">
          <div>
            <SectionIntro
              eyebrow="Facility Address"
              title="Manufacturing credibility starts with a verifiable location."
              summary="The address below is supplied as the manufacturing facility source address. Map coordinates are not published because they must be verified before adding a pin."
            />
            <address className="address-panel">{manufacturingAddress}</address>
            <div className="button-row">
              <Link className="button button--primary" href="/contact/government-project-desk">
                Request Factory Visit
              </Link>
              <Link className="button button--secondary" href={downloads.manufacturing}>
                Download Manufacturing Profile
              </Link>
            </div>
          </div>
          <div className="factory-blueprint" role="img" aria-label="Neutral technical process graphic for manufacturing">
            <div>Inspection</div>
            <div>Assembly</div>
            <div>Testing</div>
            <div>Traceability</div>
          </div>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container">
          <SectionIntro
            eyebrow="Verified Publication Boundary"
            title="Published claims are limited to documented capabilities."
            summary="The live page does not publish factory size, capacity, installed equipment, certifications, compliance statements or product ratings until supporting records are supplied."
          />
          <div className="process-grid">
            {process.map((item) => (
              <article key={item}>
                <h3>{item}</h3>
                <p>
                  Source requirement: internal facility, manufacturing, quality
                  or product documentation must be attached before expanding the
                  public claim.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ProcurementConfidenceMatrix />
      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Product Categories"
              title="AC, DC fast and high-power charger categories."
              summary="These are categories only. Model names, output ratings, certifications and warranty terms require approved product datasheets."
            />
            <div className="compact-link-grid">
              {chargerCategories.map((category) => (
                <Link key={category.slug} href={`/ev-chargers/${category.slug}`}>
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="evidence-box">
            <h3>Before Launch Photography Needed</h3>
            <ul>
              <li>Exterior manufacturing facility photographs</li>
              <li>Factory entrance and signage</li>
              <li>Production floor and assembly process</li>
              <li>Testing and quality inspection areas</li>
              <li>Finished charger and product close-ups</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function ChargersPage() {
  return (
    <section className="content-band">
      <div className="site-container two-column">
        <ChargerComparison />
        <div className="evidence-box">
          <h2>Datasheet Control</h2>
          <p>
            Approved product datasheets are not published until verified. Public
            procurement teams may request the latest reviewed product
            documentation through the Tender & RFP Desk.
          </p>
          <div className="button-row">
            <Link className="button button--secondary" href="/products">
              View Product Portfolio
            </Link>
            <Link className="button button--secondary" href="/tender-rfp-desk">
              Request Approved Datasheets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChargerCategoryPage({
  category,
}: {
  category: (typeof chargerCategories)[number];
}) {
  return (
    <section className="content-band">
      <div className="site-container two-column">
        <div>
          <SectionIntro
            eyebrow="Category Brief"
            title={category.title}
            summary={category.intent}
          />
          <dl className="definition-list">
            <div>
              <dt>Public and institutional use</dt>
              <dd>{category.publicUse}</dd>
            </div>
            <div>
              <dt>Publication boundary</dt>
              <dd>{category.verifiedBoundary}</dd>
            </div>
          </dl>
        </div>
        <div className="evidence-box">
          <h2>Required Before Publishing Specifications</h2>
          <ul>
            <li>Approved model datasheet</li>
            <li>Connector, rating and protocol confirmation</li>
            <li>Safety and product compliance evidence</li>
            <li>Warranty and service documentation</li>
          </ul>
          <Link className="button button--primary" href="/contact/government-project-desk">
            Request Product Discussion
          </Link>
        </div>
      </div>
      <div className="site-container">
        <p className="assumption-note">{chargingTimeCaveat}</p>
      </div>
    </section>
  );
}

function ProductsIndexPage() {
  return (
    <section className="content-band">
      <div className="site-container">
        {products.length ? (
          <>
            <SectionIntro
              eyebrow="Product Portfolio"
              title="Published EV charger models."
              summary="Each model below is backed by an approved datasheet. Request the latest reviewed documentation through the Tender & RFP Desk."
            />
            <div className="solution-card-grid">
              {products.map((product) => (
                <article className="solution-card" key={product.slug}>
                  <p className="eyebrow">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                  <Link href={`/products/${product.slug}`}>View specifications</Link>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="two-column">
            <div>
              <SectionIntro
                eyebrow="Product Portfolio"
                title="A scalable portfolio, published only with evidence."
                summary="EHUB Bharat presents AC, DC fast and high-power charging as categories. Individual model pages — with rated output, connectors, protection, OCPP version, dimensions, warranty and certifications — are published as approved datasheets become available, so no unverified specification is shown."
              />
              <div className="compact-link-grid">
                {chargerCategories.map((category) => (
                  <Link key={category.slug} href={`/ev-chargers/${category.slug}`}>
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="evidence-box">
              <h2>Request Product Documentation</h2>
              <p>
                Public procurement teams can request the latest reviewed product
                datasheets, ratings and compliance evidence through the Tender &amp;
                RFP Desk.
              </p>
              <p className="assumption-note">
                Status: model specifications require approved datasheets before
                publication.
              </p>
              <Link className="button button--primary" href="/tender-rfp-desk">
                Request Approved Datasheets
              </Link>
            </div>
          </div>
        )}
        <div className="charging-caveat">
          <p className="assumption-note">{chargingTimeCaveat}</p>
        </div>
      </div>
    </section>
  );
}

function ProductDetailPage({ product }: { product: (typeof products)[number] }) {
  return (
    <>
      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow={`${product.category} - ${product.status}`}
              title={product.name}
              summary={product.summary}
            />
            <p>
              <strong>Intended segment:</strong> {product.segment}
            </p>
            <div className="button-row">
              {product.datasheetHref ? (
                <Link className="button button--secondary" href={product.datasheetHref}>
                  Download Datasheet
                </Link>
              ) : null}
              <Link className="button button--primary" href="/contact/government-project-desk">
                Request Technical Discussion
              </Link>
            </div>
          </div>
          <div className="spec-table" role="table" aria-label={`${product.name} specifications`}>
            <div role="row" className="spec-row spec-row--head">
              <span role="columnheader">Specification</span>
              <span role="columnheader">Value</span>
            </div>
            {product.specs.map((spec) => (
              <div role="row" className="spec-row" key={spec.label}>
                <span role="cell">{spec.label}</span>
                <span role="cell">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {product.certifications.length ? (
        <section className="content-band content-band--warm">
          <div className="site-container">
            <SectionIntro
              eyebrow="Compliance"
              title="Certifications for this model."
              summary="Published with certificate number, scope and expiry where permitted."
            />
            <ul className="capability-grid">
              {product.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <section className="content-band">
        <div className="site-container">
          <p className="assumption-note">{chargingTimeCaveat}</p>
        </div>
      </section>
    </>
  );
}

function CaseStudyPage({ study }: { study: (typeof caseStudies)[number] }) {
  return (
    <section className="content-band">
      <div className="site-container solution-detail-grid">
        <DetailBlock title="Status" text={study.status} />
        <DetailBlock title="Location" text={study.location} />
        {study.client ? <DetailBlock title="Client / agency" text={study.client} /> : null}
        <DetailBlock title="Scope" text={study.scope} />
        <DetailBlock title="Public outcome" text={study.outcome} />
        <DetailBlock title="Date" text={study.date} />
      </div>
    </section>
  );
}

function TechnologyPage() {
  return (
    <>
      <section className="content-band content-band--warm">
        <div className="site-container">
          <OperationsPlatformView />
        </div>
      </section>
      <section className="content-band">
        <div className="site-container">
          <SectionIntro
            eyebrow="Capabilities"
            title="Operational modules for public agencies and institutional operators."
            summary="Capabilities are published as operational areas. Project-specific integrations and dashboards require a formal technical review."
          />
          <ul className="capability-grid">
            {technologyCapabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function EnergyPage() {
  return (
    <>
      <section className="content-band">
        <div className="site-container energy-grid">
          <div>
            <SectionIntro
              eyebrow="Energy Flow"
              title="Plan charging, solar and BESS as one operating system."
              summary="Solar and BESS can be reviewed for peak management, resilience, energy visibility and fleet scheduling. Suitability depends on site load, land, policy and project economics."
            />
            <ul className="check-list">
              <li>Solar generation and site load assessment</li>
              <li>BESS sizing concept subject to engineering review</li>
              <li>Load management and charging schedule planning</li>
              <li>Energy reporting for agencies and operators</li>
            </ul>
          </div>
          <div className="energy-flow" role="img" aria-label="Illustrative energy flow from grid and solar to BESS and EV chargers">
            <span>Grid</span>
            <span>Solar</span>
            <span>BESS</span>
            <span>Chargers</span>
            <span>Reports</span>
          </div>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container two-column">
          <SiteReadinessChecklist />
          <FleetChargingEstimator />
        </div>
      </section>
    </>
  );
}

function CommercialModelsPage() {
  return (
    <section className="content-band">
      <div className="site-container">
        <SectionIntro
          eyebrow="Procurement Review"
          title="Compare ownership, investment, operation, revenue and maintenance responsibilities."
          summary="EHUB Bharat does not imply that every model is available for every project. Each structure requires management approval, procurement review and site feasibility."
        />
        <div className="model-grid model-grid--wide">
          {commercialModels.map((model) => (
            <article className="model-card" key={model.name}>
              <h3>{model.name}</h3>
              <dl>
                <div>
                  <dt>Ownership</dt>
                  <dd>{model.ownership}</dd>
                </div>
                <div>
                  <dt>Investment responsibility</dt>
                  <dd>{model.investment}</dd>
                </div>
                <div>
                  <dt>Operating responsibility</dt>
                  <dd>{model.operation}</dd>
                </div>
                <div>
                  <dt>Revenue mechanism</dt>
                  <dd>{model.revenue}</dd>
                </div>
                <div>
                  <dt>Maintenance responsibility</dt>
                  <dd>{model.maintenance}</dd>
                </div>
                <div>
                  <dt>Government considerations</dt>
                  <dd>{model.considerations}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <>
      {caseStudies.length ? (
        <section className="content-band">
          <div className="site-container">
            <SectionIntro
              eyebrow="Case Studies"
              title="Published projects with verified status."
              summary="Each project carries a controlled status label and is published only with approved records."
            />
            <div className="solution-card-grid">
              {caseStudies.map((study) => (
                <article className="solution-card" key={study.slug}>
                  <p className="eyebrow">{study.status}</p>
                  <h3>{study.title}</h3>
                  <p>{study.location}</p>
                  <Link href={`/projects/${study.slug}`}>Read case study</Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Evidence Policy"
              title="Only real projects should appear as case studies."
              summary="Client names, locations, charger configuration, commercial model, status, dates, outcomes and photographs require approval before publication."
            />
            <Link className="button button--primary" href="/contact/government-project-desk">
              Submit Project Reference Request
            </Link>
          </div>
          <div className="status-grid status-grid--light">
            {["Concept", "Proposed", "Feasibility", "Pilot", "Under Implementation", "Commissioned", "Operational"].map(
              (status) => (
                <span key={status}>{status}</span>
              ),
            )}
          </div>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container">
          <SectionIntro
            eyebrow="Delivery Framework"
            title="What a published project card must include."
            summary="This framework is ready for approved case studies without falsely presenting proposed work as commissioned infrastructure."
          />
          <ul className="capability-grid">
            {[
              "Project name and location",
              "Client or partner only with permission",
              "Project type and charger configuration",
              "EHUB Bharat scope",
              "Commercial model and current status",
              "Start and completion dates",
              "Measurable outcomes",
              "Approved photographs",
              "Reference contact availability where approved",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function TenderDeskPage() {
  const publicDocs = [
    { label: "Government capability statement", href: downloads.capability },
    { label: "Manufacturing profile", href: downloads.manufacturing },
    { label: "Printer-friendly government project summary", href: downloads.projectSummary },
  ];
  const requestDocs = [
    "Company profile",
    "Product catalogue",
    "Approved product datasheets",
    "Technology overview",
    "Project-delivery methodology",
    "O&M approach",
    "Quality-assurance overview",
    "Sustainability overview",
    "Corporate registrations",
    "Approved certifications",
    "Contact sheet",
  ];

  return (
    <>
      <section className="content-band">
        <div className="site-container tender-grid">
          <div>
            <SectionIntro
              eyebrow="Public Downloads"
              title="Start evaluation with reviewed public documents."
              summary="Sensitive or confidential documents are handled through request, not exposed publicly."
            />
            <div className="download-panel download-panel--large">
              {publicDocs.map((doc) => (
                <Link key={doc.href} href={doc.href}>
                  {doc.label}
                </Link>
              ))}
            </div>
            <BriefingSequence />
          </div>
          <div className="evidence-box">
            <h2>Secure Document Request</h2>
            <p>
              Use the Government Project Desk for documents that require review,
              approval or secure exchange.
            </p>
            <ul>
              {requestDocs.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
            <Link className="button button--primary" href="/contact/government-project-desk">
              Request Tender Documents
            </Link>
          </div>
        </div>
      </section>
      <TenderEvaluationChecklist />
      <ProcurementConfidenceMatrix />
    </>
  );
}

function KnowledgeCentrePage() {
  return (
    <section className="content-band">
      <div className="site-container">
        <SectionIntro
          eyebrow="Planning Notes"
          title="Searchable executive content cluster."
          summary="All content is dated, jurisdiction-specific, periodically reviewed and not presented as legal advice."
        />
        <div className="article-grid">
          {knowledgeArticles.map((article) => (
            <article className="article-card" key={article.slug}>
              <p>{article.jurisdiction} - Reviewed {article.reviewed}</p>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <Link href="/contact/government-project-desk">Discuss this topic</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Company"
              title="A modern Indian infrastructure company for EV charging deployment."
              summary="EHUB Bharat's public website is rebuilt around government and institutional decision-making, with private-sector opportunities retained as a secondary pathway."
            />
            <ul className="check-list">
              {deliveryPillars.map((pillar) => (
                <li key={pillar.title}>
                  <strong>{pillar.title}:</strong> {pillar.summary}
                </li>
              ))}
            </ul>
          </div>
          <div className="evidence-box">
            <h2>Entity Record</h2>
            <dl className="definition-list">
              <div>
                <dt>Brand name</dt>
                <dd>{brand.name}</dd>
              </div>
              <div>
                <dt>Public email</dt>
                <dd>{brand.email}</dd>
              </div>
              <div>
                <dt>Public telephone</dt>
                <dd>{brand.phone}</dd>
              </div>
              <div>
                <dt>Manufacturing facility</dt>
                <dd>{manufacturingAddress}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container">
          <SectionIntro
            eyebrow="Roles We Can Contract For"
            title="Clear roles, not blurred claims."
            summary="A government decision-maker should know exactly what EHUB Bharat can contractually deliver. Each role below is engaged on its own terms, subject to project scope and approvals."
          />
          <div className="roles-grid">
            {contractableRoles.map((item) => (
              <article className="role-card" key={item.role}>
                <h3>{item.role}</h3>
                <p>{item.scope}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <section className="content-band">
      <div className="site-container form-layout">
        <div>
          <SectionIntro
            eyebrow="Government Project Desk"
            title="Submit a project enquiry for structured review."
            summary="Use this form for market sounding, feasibility discussions, DPR support, RFI, EOI, RFP, tender, pilot, factory-visit and project-expansion conversations."
          />
          <div className="contact-card">
            <h2>Direct Contact</h2>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a>
          </div>
        </div>
        <GovernmentDeskForm />
      </div>
    </section>
  );
}

function PrivateSectorPage({ page }: { page: StaticPage }) {
  const cards = [
    {
      title: "Apartments and gated communities",
      text: "Site assessment, resident access, billing workflow and O&M support subject to electrical feasibility.",
      href: "/apartments",
    },
    {
      title: "Private fleets",
      text: "Duty-cycle review, charging windows, charger categories, software onboarding and reporting.",
      href: "/private-fleets",
    },
    {
      title: "Retail hosts",
      text: "Destination charging discussions for parking assets, commercial terms and user experience.",
      href: "/retail-hosts",
    },
    {
      title: "Franchise",
      text: "Site-specific partnership review without guaranteed revenue, invented utilisation or unsupported returns.",
      href: "/franchise",
    },
  ];

  return (
    <section className="content-band">
      <div className="site-container">
        <SectionIntro
          eyebrow={page.eyebrow}
          title={page.title}
          summary={page.description}
        />
        <div className="solution-card-grid">
          {cards.map((card) => (
            <article className="solution-card" key={card.href}>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <Link href={card.href}>Open pathway</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LegalPage({ page }: { page: StaticPage }) {
  const legalCopy: Record<string, string[]> = {
    "/privacy": [
      "EHUB Bharat collects only the information needed to review enquiries, respond to project requests, manage document requests and improve the website.",
      "Personal information submitted through forms should be shared through official channels and is subject to internal review before any onward workflow is configured.",
      "The site is prepared for analytics and CRM integrations, but personal or sensitive enquiry information should not be sent to analytics platforms.",
      "Indian privacy and data-protection statements should be validated by legal counsel before final publication.",
    ],
    "/terms": [
      "The website provides general information for government, public-sector, institutional and private-sector evaluation.",
      "Published material does not constitute a technical proposal, quotation, tender response, legal advice, tax advice or binding commercial offer.",
      "Downloads and website content may be updated as approved documents, product records and project evidence become available.",
    ],
    "/accessibility": [
      "EHUB Bharat aims to provide a keyboard-accessible, screen-reader-friendly and responsive website aligned with WCAG 2.2 AA principles.",
      "The site includes semantic landmarks, visible focus styles, text alternatives, form labels, reduced-motion support and contrast-conscious colour choices.",
      `Accessibility feedback may be sent to ${brand.email}.`,
    ],
    "/disclaimer": [
      "Documents, technical specifications, commercial models and project timelines are subject to formal review, site feasibility and the applicable procurement process.",
      "No government endorsement, empanelment, certification, production capacity, charger rating, project award or operational result is implied unless explicitly supported by approved public evidence.",
      "Illustrative dashboard, lifecycle, energy and planning views explain concepts and must not be read as live operating data.",
    ],
    "/security": [
      `Security concerns about the website may be reported to ${brand.email} with the subject line Website Security Disclosure.`,
      "Please do not submit production secrets, confidential tender documents or personal data through insecure channels.",
      "The site uses security headers, origin checks, file-size and file-type restrictions for initial uploads, and no public stack traces.",
    ],
    "/cookies": [
      "The EHUB Bharat website is designed to work without advertising or cross-site tracking cookies. Strictly necessary cookies may be used to keep the site secure and functioning.",
      "If privacy-conscious analytics are introduced, this notice will be updated to describe what is measured and how consent is handled, in line with applicable law.",
      "No analytics or marketing technology is added without prior approval, and enquiry form data is never sent to analytics platforms.",
      `Questions about cookies and privacy may be sent to ${brand.email}.`,
    ],
  };

  return (
    <section className="content-band">
      <div className="site-container legal-copy">
        <SectionIntro eyebrow={page.eyebrow} title={page.title} summary={page.description} />
        {(legalCopy[page.path] || []).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>Last reviewed: {siteDate}.</p>
      </div>
    </section>
  );
}

function OperationsMaintenancePage() {
  const slaAreas = [
    {
      title: "Preventive maintenance",
      text: "Scheduled inspection of chargers, connectors, cooling, enclosures, earthing and signage, with a documented checklist and service history per site.",
    },
    {
      title: "Corrective maintenance",
      text: "Fault diagnosis, spare-part replacement and repair against an agreed response and resolution window, with root-cause notes for recurring issues.",
    },
    {
      title: "Remote monitoring",
      text: "OCPP-based status, heartbeat and fault alerts where supported, so many issues are identified before a site visit is required.",
    },
    {
      title: "Uptime and reporting",
      text: "Availability, downtime and incident reporting at the cadence agreed with the agency, with a transparent method for how uptime is calculated.",
    },
    {
      title: "Escalation",
      text: "A defined escalation matrix across field team, operations and the agency's nominated owner, with severity levels and contact points.",
    },
    {
      title: "Spares and warranty",
      text: "Spare-part availability planning and warranty administration, with clear boundaries between warranty, AMC and out-of-scope work.",
    },
  ];

  return (
    <>
      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Lifecycle Ownership"
              title="Operations do not end at commissioning."
              summary="Public charging assets need dependable operations, transparent reporting and a clear maintenance owner for years after installation. EHUB Bharat structures O&M so an agency can evaluate service quality, not just equipment supply."
            />
            <ul className="check-list">
              <li>Defined SLA targets agreed with the agency, not implied</li>
              <li>Auditable service records per site and per asset</li>
              <li>Clear scope split across warranty, AMC and project works</li>
              <li>Reporting formats suitable for public review</li>
            </ul>
          </div>
          <div className="evidence-box">
            <h2>Service Boundaries</h2>
            <p>
              SLA windows, penalties, uptime definitions and spares
              responsibility are set per contract and site. Published figures are
              not a guarantee for any specific project until agreed in writing.
            </p>
            <Link className="button button--secondary" href="/contact/government-project-desk">
              Discuss an O&amp;M Scope
            </Link>
          </div>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container">
          <SectionIntro
            eyebrow="O&M Framework"
            title="What a public O&M engagement covers."
            summary="Each area is scoped, measured and reported. The specific targets depend on charger type, site conditions, utilisation and the agreed commercial model."
          />
          <div className="process-grid">
            {slaAreas.map((area) => (
              <article key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function GovernmentMisPage() {
  const reports = [
    { name: "Site readiness", detail: "Status of land, power, civil and approvals per planned location." },
    { name: "Charger uptime and downtime", detail: "Availability and outage windows with the calculation method stated." },
    { name: "Energy delivered", detail: "kWh dispensed by site, charger and period." },
    { name: "Session count and utilisation", detail: "Sessions, average duration and utilisation trends." },
    { name: "Revenue and settlement", detail: "Collections, tariff, and revenue-share or settlement lines where applicable." },
    { name: "Fault and maintenance history", detail: "Tickets raised, response and resolution, and recurring faults." },
    { name: "SLA compliance", detail: "Performance against agreed uptime and response targets." },
    { name: "Safety incidents", detail: "Any reportable safety events and the actions taken." },
    { name: "Asset inventory and warranty", detail: "Installed assets, serial records and warranty status." },
  ];

  return (
    <>
      <section className="content-band">
        <div className="site-container">
          <SectionIntro
            eyebrow="Transparency for Public Agencies"
            title="Reporting a procurement committee can audit."
            summary="Government EV infrastructure needs operating clarity, not only equipment delivery. The report types below can be produced for public agencies and institutional owners. Every sample is illustrative until connected to authorised project data."
          />
          <div className="matrix-grid">
            {reports.map((report) => (
              <article className="matrix-card" key={report.name}>
                <h3>{report.name}</h3>
                <p>{report.detail}</p>
                <p className="assumption-note">Illustrative sample report</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Data and Access"
              title="Role-based access and exportable records."
              summary="Reports can be provided through role-based access with export to common formats for internal review, subject to a formal technical and data-governance discussion."
            />
            <ul className="check-list">
              <li>Role-based access for agency, operator and auditor</li>
              <li>Exportable records for internal MIS and audit</li>
              <li>Defined reporting cadence agreed with the agency</li>
              <li>Data ownership and retention set per project</li>
            </ul>
          </div>
          <div className="evidence-box">
            <h2>Before Live Reporting</h2>
            <p>
              Live dashboards require a commissioned project, connected chargers
              and a data-governance agreement. Until then, samples are provided
              for evaluation only.
            </p>
            <Link className="button button--primary" href="/contact/government-project-desk">
              Request a Reporting Walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectDevelopmentPage() {
  return (
    <>
      <section className="content-band">
        <div className="site-container">
          <SectionIntro
            eyebrow="Methodology"
            title="A stage-gated method built for administrative discipline."
            summary="Each stage produces documented decisions, owners and dependencies before the project moves forward. This lets an agency evaluate readiness at every gate rather than committing to an unproven rollout."
          />
          <ol className="numbered-flow">
            {lifecycleSteps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container two-column">
          <SiteReadinessChecklist />
          <div className="evidence-box">
            <h2>Responsibility at Each Gate</h2>
            <p>
              A responsibility matrix identifies the agency, land-owning body,
              DISCOM, EPC, manufacturing, operations and payment roles for every
              stage, so accountability is clear before works begin.
            </p>
            <Link className="button button--secondary" href="/ppp-commercial-models">
              Review Commercial Models
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CompliancePage() {
  const standards = [
    "Ministry of Power EV charging infrastructure guidelines",
    "Central Electricity Authority (CEA) safety and connectivity requirements",
    "Applicable BIS / IS standards for the relevant equipment",
    "State EV policies and SERC / DISCOM requirements",
    "Open communication protocols and interoperability (OCPP, and OCPI/UEI where applicable)",
    "PM E-DRIVE-related requirements, where applicable to the project",
  ];

  return (
    <>
      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Design Intent"
              title="Projects are designed to align with applicable standards."
              summary="EHUB Bharat designs and delivers projects to align with current, applicable requirements. Alignment is a design commitment; it is not a claim of certification unless supported by a specific, unexpired certificate."
            />
            <ul className="check-list">
              {standards.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="evidence-box">
            <h2>Certification Register</h2>
            <p>
              Product and company certifications (for example BIS, ARAI, ICAT,
              ISO, NABL, IEC, EMC, IP or IK) are published here only with the
              certificate number, scope, issue date and expiry date once
              approved evidence is supplied.
            </p>
            <p className="assumption-note">
              Status: verification required. No certification is claimed until
              its evidence is recorded.
            </p>
            <Link className="button button--secondary" href="/tender-rfp-desk">
              Request Compliance Documents
            </Link>
          </div>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container">
          <SectionIntro
            eyebrow="Procurement Integrity"
            title="No implied endorsement or unverified status."
            summary="EHUB Bharat does not use the State Emblem, ministry seals or government devices, and does not describe itself as government approved, empanelled or certified without current, verifiable evidence and legal approval."
          />
        </div>
      </section>
    </>
  );
}

function LeadershipPage() {
  return (
    <>
      <section className="content-band">
        <div className="site-container two-column">
          <div>
            <SectionIntro
              eyebrow="Governance"
              title="Accountable governance for public-sector delivery."
              summary="EHUB Bharat's delivery model is built around clear ownership, documented decisions and procurement integrity. Individual leadership profiles are published only after names, roles, biographies and photographs are formally approved."
            />
            <ul className="check-list">
              <li>Named project ownership for every government engagement</li>
              <li>Separation of delivery and quality sign-off</li>
              <li>Anti-bribery and procurement-integrity commitment</li>
              <li>Documented decisions and auditable records</li>
            </ul>
          </div>
          <div className="evidence-box">
            <h2>Leadership Profiles</h2>
            <p>
              Executive and technical-team profiles will appear here with role,
              responsibility and relevant experience once approved for
              publication.
            </p>
            <p className="assumption-note">
              Status: verification required (names, titles, biographies and
              photographs pending approval).
            </p>
            <Link className="button button--secondary" href="/contact/government-project-desk">
              Request Leadership Introductions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CareersPage() {
  const areas = [
    "Manufacturing and quality",
    "Electrical and power engineering",
    "Project delivery and site management",
    "Charging software and platform",
    "Field operations and maintenance",
    "Government and institutional business development",
  ];

  return (
    <section className="content-band">
      <div className="site-container two-column">
        <div>
          <SectionIntro
            eyebrow="Careers"
            title="Help build India's public EV charging capability."
            summary="EHUB Bharat brings together manufacturing, engineering, project delivery, software and field operations. We register interest across these areas and respond as specific roles open."
          />
          <ul className="capability-grid">
            {areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div className="contact-card">
          <h2>Register Interest</h2>
          <p>
            Share your area of interest and experience. Please do not send
            sensitive personal documents by email.
          </p>
          <a href={`mailto:${brand.email}?subject=Careers%20-%20EHUB%20Bharat`}>{brand.email}</a>
        </div>
      </div>
    </section>
  );
}

function ResourcesPage() {
  const docs = [
    { label: "Government capability statement (PDF)", href: downloads.capability },
    { label: "Manufacturing profile (PDF)", href: downloads.manufacturing },
    { label: "Printer-friendly government project summary (PDF)", href: downloads.projectSummary },
  ];

  return (
    <>
      <section className="content-band">
        <div className="site-container tender-grid">
          <div>
            <SectionIntro
              eyebrow="Public Downloads"
              title="Documents for government and institutional evaluation."
              summary="These reviewed documents can be downloaded directly. Confidential or project-specific material is shared through the Government Project Desk after review."
            />
            <div className="download-panel download-panel--large">
              {docs.map((doc) => (
                <Link key={doc.href} href={doc.href}>
                  {doc.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="evidence-box">
            <h2>Controlled Documents</h2>
            <p>
              Product datasheets, certifications, registrations and project
              records are provided on request through the Tender &amp; RFP Desk.
            </p>
            <Link className="button button--primary" href="/tender-rfp-desk">
              Open the Tender &amp; RFP Desk
            </Link>
          </div>
        </div>
      </section>
      <section className="content-band content-band--warm">
        <div className="site-container">
          <SectionIntro
            eyebrow="Planning Notes"
            title="Executive notes for public EV infrastructure planning."
            summary="Dated, jurisdiction-aware planning notes — not legal advice."
          />
          <div className="article-grid">
            {knowledgeArticles.map((article) => (
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
    </>
  );
}

function SitemapPage() {
  const groups = [
    {
      heading: "Government",
      links: [
        { href: "/government-ev-infrastructure", label: "Government Projects" },
        { href: "/project-development", label: "Project Development" },
        { href: "/operations-maintenance", label: "Operations & Maintenance" },
        { href: "/government-mis-reporting", label: "Government MIS & Reporting" },
        { href: "/ppp-commercial-models", label: "PPP & Commercial Models" },
        { href: "/tender-rfp-desk", label: "Tender & RFP Desk" },
        { href: "/projects", label: "Projects & Framework" },
      ],
    },
    {
      heading: "Solutions & products",
      links: [
        ...governmentSolutions.map((s) => ({ href: `/government/${s.slug}`, label: s.title })),
        { href: "/ev-chargers", label: "EV Chargers" },
        ...chargerCategories.map((c) => ({ href: `/ev-chargers/${c.slug}`, label: c.title })),
        { href: "/products", label: "Product Portfolio" },
        { href: "/energy-bess", label: "Energy & BESS" },
      ],
    },
    {
      heading: "Company",
      links: [
        { href: "/about", label: "About" },
        { href: "/manufacturing", label: "Manufacturing" },
        { href: "/technology", label: "Technology" },
        { href: "/compliance-certifications", label: "Compliance & Certifications" },
        { href: "/leadership", label: "Leadership & Governance" },
        { href: "/careers", label: "Careers" },
        { href: "/contact/government-project-desk", label: "Contact" },
      ],
    },
    {
      heading: "Resources & private sector",
      links: [
        { href: "/resources", label: "Resources & Downloads" },
        { href: "/knowledge-centre", label: "Knowledge Centre" },
        { href: "/private-sector-solutions", label: "Private-Sector Solutions" },
        { href: "/apartments", label: "Apartments" },
        { href: "/private-fleets", label: "Private Fleets" },
        { href: "/retail-hosts", label: "Retail Hosts" },
        { href: "/franchise", label: "Franchise" },
      ],
    },
    {
      heading: "Legal & trust",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Use" },
        { href: "/cookies", label: "Cookie Notice" },
        { href: "/accessibility", label: "Accessibility Statement" },
        { href: "/disclaimer", label: "Disclaimer" },
        { href: "/security", label: "Security & Responsible Disclosure" },
      ],
    },
  ];

  return (
    <section className="content-band">
      <div className="site-container">
        <div className="sitemap-grid">
          {groups.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2>{group.heading}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <article className="detail-block">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

function schemaForPage(page: StaticPage, path: string) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: brand.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: `${brand.url}${path}`,
      },
    ],
  };

  if (path.startsWith("/products/")) {
    const product = products.find((item) => path.endsWith(item.slug));
    if (product) {
      return [
        breadcrumb,
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          category: product.category,
          description: product.summary,
          brand: { "@type": "Brand", name: brand.name },
          manufacturer: { "@type": "Organization", name: brand.legalName },
          url: `${brand.url}${path}`,
        },
      ];
    }
  }

  if (path === "/government-ev-infrastructure") {
    return [
      breadcrumb,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: governmentFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ];
  }

  if (page.kind === "knowledge") {
    return [
      breadcrumb,
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "EHUB Bharat Knowledge Centre",
        itemListElement: knowledgeArticles.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Article",
            headline: article.title,
            description: article.summary,
            dateModified: article.reviewed,
            inLanguage: "en-IN",
          },
        })),
      },
    ];
  }

  return [
    breadcrumb,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      description: page.description,
      provider: {
        "@type": "Corporation",
        name: brand.name,
        url: brand.url,
      },
      areaServed: "India",
      url: `${brand.url}${path}`,
      dateModified: siteDate,
    },
  ];
}
