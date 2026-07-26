export const siteDate = "2026-07-26";

export const brand = {
  name: "EHUB Bharat",
  legalName: "EHUB Bharat",
  url: "https://www.ehubbharat.com",
  logo: "/brand/ehub-bharat.png",
  icon: "/brand/ehub-charge-icon.svg",
  logoAlt: "EHUB Bharat Smart EV Charging and Battery Network",
  phone: "+91 76758 06699",
  email: "partners@ehubbharat.com",
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  social: {
    linkedin: "https://www.linkedin.com/company/ehub-charge",
    x: "https://x.com/ehubcharge",
    instagram: "https://www.instagram.com/ehubcharge",
  },
};

export const manufacturingAddress =
  "Sy. No. 6E, Dharmojigudem-Dothigudem Road, H/o Lakkaram Village, Choutuppal Mandal, Yadadri Bhuvanagiri District - 508252, Telangana, India.";

export const downloads = {
  capability: "/downloads/ehub-bharat-government-capability-statement.pdf",
  manufacturing: "/downloads/ehub-bharat-manufacturing-profile.pdf",
  projectSummary: "/downloads/ehub-bharat-government-project-summary.pdf",
};

export const primaryNav = [
  { href: "/government-ev-infrastructure", label: "Government Projects" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/ev-chargers", label: "EV Chargers" },
  { href: "/technology", label: "Technology" },
  { href: "/energy-bess", label: "Energy & BESS" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "Company" },
];

export const utilityNav = [
  { href: "/government-ev-infrastructure", label: "Government & Institutional Projects" },
  { href: "/manufacturing", label: "Manufacturing Facility" },
  { href: "/tender-rfp-desk", label: "Tender & RFP Desk" },
  { href: "/contact/government-project-desk", label: "Contact" },
];

export const secondaryNav = [
  { href: "/private-sector-solutions", label: "Private-Sector Solutions" },
  { href: "/apartments", label: "Apartments" },
  { href: "/private-fleets", label: "Private Fleets" },
  { href: "/retail-hosts", label: "Retail Hosts" },
  { href: "/franchise", label: "Franchise" },
  { href: "/knowledge-centre", label: "Knowledge Centre" },
  { href: "/contact/government-project-desk", label: "Contact" },
];

export const proofPoints = [
  "Own EV charger manufacturing facility in Telangana",
  "Government and institutional project solutions",
  "AC, DC fast and high-power charger categories",
  "OCPP-compatible operations where supported",
  "Solar and BESS integration planning",
  "India-focused deployment and support model",
];

export const deliveryPillars = [
  {
    title: "Plan",
    summary:
      "Master planning, GIS-led location logic, demand assessment, power feasibility, DPR support and procurement structuring.",
    deliverables: [
      "EV infrastructure master plans",
      "Site and electrical feasibility notes",
      "Charger-mix and phase planning",
      "PPP, CAPEX and OPEX commercial analysis",
    ],
  },
  {
    title: "Manufacture",
    summary:
      "EV charger manufacturing from the Telangana facility, presented only through verified product categories and documented process controls.",
    deliverables: [
      "AC, DC fast and high-power charging categories",
      "Incoming material and assembly documentation",
      "Electrical and functional test records where available",
      "Traceability and service documentation readiness",
    ],
  },
  {
    title: "Deploy",
    summary:
      "Civil, electrical, charger, software, commissioning and handover coordination for public and institutional sites.",
    deliverables: [
      "Project design and site coordination",
      "Charger installation and software onboarding",
      "Testing, commissioning and handover records",
      "Signage and user experience coordination",
    ],
  },
  {
    title: "Operate",
    summary:
      "Monitoring, payments, maintenance, reporting and escalation workflows for public agencies and institutional owners.",
    deliverables: [
      "OCPP-based charger monitoring where supported",
      "Remote operations and fault escalation",
      "Energy, session and settlement reporting",
      "Preventive and corrective maintenance workflows",
    ],
  },
];

export const governmentSolutions = [
  {
    slug: "state-city-ev-networks",
    title: "State and City Charging Networks",
    problem:
      "Public agencies need a phased charging network that balances land availability, power readiness, utilisation and public convenience.",
    role:
      "EHUB Bharat can support demand assessment, location planning, charger supply, deployment coordination, commissioning and O&M planning.",
    assets: "Public parking, transit nodes, civic buildings, market areas, depots and priority corridors.",
    stages: "Consultation, mapping, feasibility, DPR support, procurement, manufacturing, deployment, commissioning and reporting.",
    models: "Government-funded CAPEX, EPC plus O&M, PPP, revenue sharing or managed charging service after commercial review.",
  },
  {
    slug: "highway-corridor-charging",
    title: "Highway and Intercity Charging Corridors",
    problem:
      "Intercity EV adoption depends on dependable charging intervals, power availability, clear amenities and strong uptime governance.",
    role:
      "EHUB Bharat can assess corridor demand, shortlist sites, define charger categories, coordinate installation and prepare operating reports.",
    assets: "Wayside amenities, fuel stations, transport hubs, tourism routes and logistics corridors.",
    stages: "Corridor mapping, site readiness, utility coordination, charger deployment, signage, commissioning and escalation planning.",
    models: "PPP, site lease, revenue share, EPC plus O&M, or concession-led structures subject to project feasibility.",
  },
  {
    slug: "fleet-electrification",
    title: "Government Fleet Electrification",
    problem:
      "Departments and PSUs need predictable depot and workplace charging without disrupting duty cycles, power limits or fleet availability.",
    role:
      "EHUB Bharat can plan charging schedules, site electrical readiness, charger categories, software onboarding and operating reports.",
    assets: "Administrative campuses, depots, parking yards, hospitals, universities, field offices and public-sector campuses.",
    stages: "Fleet study, power assessment, phased charger deployment, user onboarding, monitoring, invoicing and maintenance.",
    models: "CAPEX, fleet charging service, EPC plus O&M, managed service or OPEX after commercial due diligence.",
  },
  {
    slug: "bus-depot-charging",
    title: "Electric-Bus and Depot Charging",
    problem:
      "Transport corporations require depot charging plans that respect schedules, route energy demand, electrical capacity and charger availability.",
    role:
      "EHUB Bharat can support depot readiness studies, charger-mix planning, staged deployment, monitoring and maintenance workflows.",
    assets: "Bus depots, terminals, route-end facilities, workshop yards and selected opportunity-charging locations.",
    stages: "Route and schedule review, load study, charger layout, supply, installation, commissioning and SLA reporting.",
    models: "EPC, EPC plus O&M, government CAPEX, operator-funded OPEX or concession structures after formal review.",
  },
  {
    slug: "public-buildings",
    title: "Government Buildings and Public Parking",
    problem:
      "Public buildings need visitor and staff charging that is accessible, safe, transparent and manageable across multiple sites.",
    role:
      "EHUB Bharat can plan site readiness, charger locations, payment flows, user signage, commissioning and site-level reporting.",
    assets: "Secretariats, collectorates, courts, municipal offices, hospitals, universities, libraries and paid public parking.",
    stages: "Asset inventory, power feasibility, charger selection, installation, software onboarding, handover and reporting.",
    models: "CAPEX, EPC plus O&M, managed charging service, site lease or revenue share subject to approvals.",
  },
  {
    slug: "tourism-destination-charging",
    title: "Tourism and Destination Charging",
    problem:
      "Tourism destinations need charging that improves visitor confidence without creating clutter, unsafe electrical work or tariff confusion.",
    role:
      "EHUB Bharat can support destination planning, charger categories, signage, payments, commissioning and seasonal operations review.",
    assets: "Tourism circuits, hotels, resorts, heritage parking, pilgrimage centres, airports, ports and attractions.",
    stages: "Destination mapping, site assessment, utility readiness, deployment, wayfinding, monitoring and support.",
    models: "PPP, site lease, revenue share, EPC plus O&M or managed service depending on asset ownership.",
  },
  {
    slug: "smart-city-urban-development",
    title: "Smart Cities and Urban Development Projects",
    problem:
      "Urban authorities need interoperable charging infrastructure that integrates with wider mobility, parking, data and sustainability plans.",
    role:
      "EHUB Bharat can align charging assets with smart-city use cases, dashboards, reporting structures and phased network expansion.",
    assets: "Smart parking, multimodal hubs, urban corridors, municipal assets, command-centre reporting and public charging hubs.",
    stages: "Stakeholder consultation, demand mapping, integration planning, deployment, commissioning and executive reporting.",
    models: "PPP, EPC, managed service, concession or revenue sharing after procurement review.",
  },
  {
    slug: "institutional-campuses",
    title: "Hospitals, Universities and Institutional Campuses",
    problem:
      "Large campuses need managed charging for staff, visitors, service vehicles and future fleet electrification.",
    role:
      "EHUB Bharat can provide site assessment, charger planning, installation coordination, software onboarding and O&M support.",
    assets: "Campus parking, service yards, ambulance and service fleets, hostels, visitor areas and administrative blocks.",
    stages: "Demand review, electrical audit, phased rollout, access control, payment setup, commissioning and maintenance.",
    models: "CAPEX, EPC plus O&M, managed charging service or revenue share depending on campus policy.",
  },
  {
    slug: "solar-bess-charging-hubs",
    title: "Solar and BESS-Supported Charging Hubs",
    problem:
      "High-demand sites may need renewable integration, peak management, resilience and clearer energy reporting.",
    role:
      "EHUB Bharat can assess solar and BESS fit, charging demand, load profiles, integration needs and monitoring requirements.",
    assets: "Public charging hubs, depots, campuses, parking structures, industrial estates and highway amenities.",
    stages: "Energy study, system concept, commercial review, integration design, deployment coordination and monitoring.",
    models: "CAPEX, PPP, managed service or energy-service structures after technical and financial review.",
  },
];

export const lifecycleSteps = [
  "Stakeholder consultation",
  "Demand and location mapping",
  "Land and power feasibility",
  "Project design and DPR support",
  "Procurement or PPP structuring",
  "Manufacturing and supply",
  "Civil, electrical and charger deployment",
  "Software integration and commissioning",
  "Operations, maintenance and reporting",
  "Phased expansion",
];

export const commercialModels = [
  {
    name: "Government-funded CAPEX",
    ownership: "Government or public institution",
    investment: "Public agency funds equipment and works",
    operation: "Agency or appointed operator",
    revenue: "Tariff or internal allocation as approved",
    maintenance: "Separate O&M or AMC scope",
    suitableFor: "Strategic public assets, offices, campuses and initial network rollouts",
    considerations: "Requires capital budget, procurement clarity and defined maintenance responsibility.",
  },
  {
    name: "EPC",
    ownership: "Government or project owner",
    investment: "Owner funds the project",
    operation: "Owner, operator or separate O&M contractor",
    revenue: "Owner-defined tariff or internal settlement",
    maintenance: "Can be contracted separately",
    suitableFor: "Clearly scoped sites with approved designs and budgets",
    considerations: "Needs clear specifications, acceptance criteria and commissioning records.",
  },
  {
    name: "EPC plus O&M",
    ownership: "Government or project owner",
    investment: "Owner funds project delivery",
    operation: "EHUB Bharat or appointed team can support operations where contracted",
    revenue: "Owner-defined model",
    maintenance: "Included for the agreed period and scope",
    suitableFor: "Agencies that want single-point project delivery and service support",
    considerations: "SLA definitions, escalation process and reporting formats must be agreed.",
  },
  {
    name: "PPP or concession",
    ownership: "Defined by concession agreement",
    investment: "Private, public or blended investment",
    operation: "Concessionaire or nominated operator",
    revenue: "User tariffs, viability support, revenue share or availability payments",
    maintenance: "Concessionaire or O&M contractor",
    suitableFor: "City networks, highways, tourism corridors and public parking portfolios",
    considerations: "Requires bankable demand assumptions, risk allocation and transparent governance.",
  },
  {
    name: "Managed charging service",
    ownership: "Agency, institution or service provider as agreed",
    investment: "Reviewed case by case",
    operation: "Service provider manages access, monitoring and reporting",
    revenue: "Subscription, service fee or usage-based model",
    maintenance: "Included in service scope where agreed",
    suitableFor: "Fleets, campuses and multi-site public buildings",
    considerations: "Needs service boundaries, privacy rules, tariff approval and reporting cadence.",
  },
];

export const chargerCategories = [
  {
    slug: "ac",
    title: "AC Charging",
    intent: "Destination, workplace, apartment, campus and longer-dwell public charging.",
    publicUse: "Government buildings, institutions, staff parking, tourism stays and residential assets.",
    verifiedBoundary:
      "The site presents AC as a product category. Specific model names, ratings and certifications require approved datasheets before publication.",
  },
  {
    slug: "dc-fast",
    title: "DC Fast Charging",
    intent: "Public, fleet and corridor charging where shorter dwell time and higher throughput are required.",
    publicUse: "Highways, bus-adjacent assets, fleet depots, urban hubs and strategic parking facilities.",
    verifiedBoundary:
      "The site presents DC fast charging as a category. Output ratings and compatibility details must come from verified product documents.",
  },
  {
    slug: "high-power",
    title: "High-Power Charging",
    intent: "High-demand applications that may involve buses, logistics fleets, intercity corridors or charging hubs.",
    publicUse: "Transport depots, priority corridors, charging hubs and high-utilisation public assets.",
    verifiedBoundary:
      "The site does not publish power claims such as up to 480 kW until supported by approved technical datasheets and manufacturing records.",
  },
];

export const technologyCapabilities = [
  "OCPP charger connectivity where supported",
  "Charger and connector status monitoring",
  "Session monitoring and remote start or stop",
  "Fault alerts and escalation workflows",
  "Energy, tariff, billing and settlement reports",
  "QR access, UPI and digital payment workflows",
  "Role-based access for public agencies and operators",
  "Site, charger and fleet analytics",
  "Solar and BESS visibility where integrated",
  "API and integration readiness subject to project review",
];

export const governanceItems = [
  "Project milestones and approval gates",
  "Responsibility matrix for agency, site owner, utility and operator",
  "Site-level documentation and commissioning records",
  "SLA, uptime, incident and escalation reporting where contracted",
  "Energy, session and revenue reconciliation",
  "Asset lifecycle records and preventive maintenance logs",
  "Periodic government or institutional reporting",
  "Audit-friendly operational logs",
];

export const knowledgeArticles = [
  {
    slug: "government-ev-infrastructure-planning",
    title: "Government EV Infrastructure Planning",
    jurisdiction: "India",
    reviewed: siteDate,
    summary:
      "A procurement-aware guide to demand assessment, site selection, power feasibility, charger mix and phased public charging rollout.",
  },
  {
    slug: "ev-charging-ppp-models-india",
    title: "EV Charging PPP Models in India",
    jurisdiction: "India",
    reviewed: siteDate,
    summary:
      "How public agencies can compare CAPEX, EPC, EPC plus O&M, PPP, site lease, revenue share and managed service structures.",
  },
  {
    slug: "electric-bus-depot-charging",
    title: "Electric-Bus Depot Charging",
    jurisdiction: "India",
    reviewed: siteDate,
    summary:
      "Planning considerations for transport corporations reviewing depot power capacity, route schedules, charger placement and maintenance.",
  },
  {
    slug: "bess-for-ev-charging",
    title: "BESS for EV Charging Stations",
    jurisdiction: "India",
    reviewed: siteDate,
    summary:
      "When solar and battery energy storage may support peak management, resilience and clearer energy reporting at charging hubs.",
  },
  {
    slug: "charger-interoperability-ocpp",
    title: "Charger Interoperability and OCPP",
    jurisdiction: "India",
    reviewed: siteDate,
    summary:
      "A plain-English explanation of OCPP-based operations, monitoring, session control and public-infrastructure reporting.",
  },
];

export const pageIntents = [
  {
    path: "/",
    intent: "Executive understanding of EHUB Bharat as a government EV infrastructure and charger manufacturing partner.",
    keyword: "government EV charging infrastructure company India",
  },
  {
    path: "/government-ev-infrastructure",
    intent: "Three-minute government briefing for public charging network planning and procurement.",
    keyword: "government EV charging projects India",
  },
  {
    path: "/manufacturing",
    intent: "Manufacturing credibility for EV charger manufacturing facility in Telangana.",
    keyword: "EV charger manufacturer Telangana",
  },
  {
    path: "/ev-chargers",
    intent: "Product-category overview without unsupported model or rating claims.",
    keyword: "EV charging equipment manufacturer India",
  },
  {
    path: "/technology",
    intent: "OCPP, operations, dashboards, payments and reporting overview for institutional buyers.",
    keyword: "OCPP charging platform India",
  },
  {
    path: "/energy-bess",
    intent: "Solar and BESS-supported EV charging planning for public and fleet sites.",
    keyword: "BESS for EV charging stations India",
  },
  {
    path: "/ppp-commercial-models",
    intent: "Procurement and commercial models for public EV charging infrastructure.",
    keyword: "EV charging PPP model India",
  },
  {
    path: "/tender-rfp-desk",
    intent: "Procurement document request and evaluation pathway for public agencies.",
    keyword: "EV charging RFP tender support India",
  },
  {
    path: "/contact/government-project-desk",
    intent: "Dedicated government project enquiry and executive briefing request.",
    keyword: "government EV charging project enquiry",
  },
];

export const redirects = [
  { source: "/charging-solutions", destination: "/government-ev-infrastructure" },
  { source: "/public-charging-network", destination: "/government-ev-infrastructure" },
  { source: "/apartment-ev-charging", destination: "/apartments" },
  { source: "/fleet-charging", destination: "/private-fleets" },
  { source: "/retail-host-partnership", destination: "/retail-hosts" },
  { source: "/franchise-partner-with-us", destination: "/franchise" },
  { source: "/bess-and-solar-energy", destination: "/energy-bess" },
  { source: "/technology-platform", destination: "/technology" },
  { source: "/operator-dashboard", destination: "/technology" },
  { source: "/pricing-business-models", destination: "/ppp-commercial-models" },
  { source: "/contact", destination: "/contact/government-project-desk" },
  { source: "/blog", destination: "/knowledge-centre" },
  { source: "/faq", destination: "/knowledge-centre" },
  { source: "/ev-charging-stations-hyderabad", destination: "/government-ev-infrastructure" },
  { source: "/apartment-ev-charging-hyderabad", destination: "/apartments" },
  { source: "/fleet-ev-charging-hyderabad", destination: "/private-fleets" },
  { source: "/ev-charging-franchise-india", destination: "/franchise" },
  { source: "/ev-charger-installation-india", destination: "/ev-chargers" },
  { source: "/ocpp-ev-charging-software-india", destination: "/technology" },
  { source: "/upi-qr-ev-charging-india", destination: "/technology" },
  { source: "/bess-solar-ev-charging-india", destination: "/energy-bess" },
  { source: "/retail-host-ev-charging-india", destination: "/retail-hosts" },
  { source: "/highway-ev-charging-hubs-india", destination: "/government/highway-corridor-charging" },
  { source: "/blog/ocpp-16j-vs-201-cpos-india", destination: "/knowledge-centre" },
  { source: "/blog/upi-qr-payment-flow-ev-charging-india", destination: "/knowledge-centre" },
  { source: "/blog/apartment-ev-charging-india-guide", destination: "/apartments" },
  { source: "/blog/ev-charging-franchise-india-explained", destination: "/franchise" },
  { source: "/blog/ocpp-qr-upi-ev-charging-software", destination: "/technology" },
];

export const publicPaths = [
  "/",
  "/government-ev-infrastructure",
  "/government/state-city-ev-networks",
  "/government/fleet-electrification",
  "/government/bus-depot-charging",
  "/government/highway-corridor-charging",
  "/government/public-buildings",
  "/government/tourism-destination-charging",
  "/manufacturing",
  "/ev-chargers",
  "/ev-chargers/ac",
  "/ev-chargers/dc-fast",
  "/ev-chargers/high-power",
  "/technology",
  "/energy-bess",
  "/ppp-commercial-models",
  "/projects",
  "/tender-rfp-desk",
  "/knowledge-centre",
  "/about",
  "/contact/government-project-desk",
  "/private-sector-solutions",
  "/apartments",
  "/private-fleets",
  "/retail-hosts",
  "/franchise",
  "/privacy",
  "/terms",
  "/accessibility",
  "/disclaimer",
  "/security",
];
