"use client";

import { useMemo, useState } from "react";
import {
  chargerCategories,
  governmentSolutions,
  lifecycleSteps,
  technologyCapabilities,
} from "../data/site";

export function GovernmentSolutionSelector() {
  const [selectedSlug, setSelectedSlug] = useState(governmentSolutions[0].slug);
  const selected = useMemo(
    () => governmentSolutions.find((solution) => solution.slug === selectedSlug) || governmentSolutions[0],
    [selectedSlug],
  );

  return (
    <section className="selector-block" aria-labelledby="solution-selector-title">
      <div>
        <p className="eyebrow">Use-Case Explorer</p>
        <h2 id="solution-selector-title">Select a public-infrastructure scenario</h2>
        <p>
          Compare typical government problems, EHUB Bharat role,
          project assets, delivery stages and commercial pathways.
        </p>
      </div>
      <div className="selector-grid">
        <div className="selector-list" role="list" aria-label="Government project scenarios">
          {governmentSolutions.slice(0, 7).map((solution) => (
            <button
              key={solution.slug}
              type="button"
              className={selected.slug === solution.slug ? "is-active" : ""}
              onClick={() => setSelectedSlug(solution.slug)}
            >
              {solution.title}
            </button>
          ))}
        </div>
        <article className="selector-detail">
          <h3>{selected.title}</h3>
          <dl>
            <div>
              <dt>Government problem</dt>
              <dd>{selected.problem}</dd>
            </div>
            <div>
              <dt>EHUB Bharat role</dt>
              <dd>{selected.role}</dd>
            </div>
            <div>
              <dt>Typical assets</dt>
              <dd>{selected.assets}</dd>
            </div>
            <div>
              <dt>Delivery stages</dt>
              <dd>{selected.stages}</dd>
            </div>
            <div>
              <dt>Commercial options</dt>
              <dd>{selected.models}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

export function LifecycleTimeline() {
  const [active, setActive] = useState(0);

  return (
    <section className="lifecycle" aria-labelledby="lifecycle-title">
      <div className="site-container">
        <div className="section-intro">
          <p className="eyebrow">Statewide Deployment Framework</p>
          <h2 id="lifecycle-title">A public-infrastructure lifecycle with clear approval gates.</h2>
          <p>
            The sequence is designed for administrative discipline: each stage
            can be documented, reviewed and expanded as project certainty grows.
          </p>
        </div>
        <div className="timeline-grid">
          {lifecycleSteps.map((step, index) => (
            <button
              key={step}
              type="button"
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </button>
          ))}
        </div>
        <div className="timeline-detail" role="status" aria-live="polite">
          <strong>{lifecycleSteps[active]}</strong>
          <p>
            This stage should create auditable notes, decisions, dependencies
            and owners before the project moves to the next gate.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ChargerComparison() {
  const [active, setActive] = useState(chargerCategories[0].slug);
  const category = chargerCategories.find((item) => item.slug === active) || chargerCategories[0];

  return (
    <section className="comparison" aria-labelledby="charger-comparison-title">
      <div>
        <p className="eyebrow">Charger Categories</p>
        <h2 id="charger-comparison-title">Compare categories without unsupported ratings.</h2>
        <p>
          Specific model names, output ratings, connector details and
          certification statements should be added only after approved
          datasheets are available.
        </p>
      </div>
      <div className="segmented-control" aria-label="Charger categories">
        {chargerCategories.map((item) => (
          <button
            key={item.slug}
            type="button"
            className={active === item.slug ? "is-active" : ""}
            onClick={() => setActive(item.slug)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <article className="comparison-card">
        <h3>{category.title}</h3>
        <p>{category.intent}</p>
        <dl>
          <div>
            <dt>Government and institutional use</dt>
            <dd>{category.publicUse}</dd>
          </div>
          <div>
            <dt>Publication boundary</dt>
            <dd>{category.verifiedBoundary}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}

export function SiteReadinessChecklist() {
  const items = [
    "Land or parking rights are identified",
    "Electrical sanctioned load is known",
    "Transformer and panel access can be reviewed",
    "Vehicle demand or fleet duty cycle is available",
    "Public access, security and signage are feasible",
    "Tariff, billing and settlement owner is identified",
    "O&M owner and escalation route can be assigned",
  ];
  const [checked, setChecked] = useState<string[]>([]);
  const score = Math.round((checked.length / items.length) * 100);

  return (
    <section className="readiness" aria-labelledby="readiness-title">
      <div>
        <p className="eyebrow">Site Readiness</p>
        <h2 id="readiness-title">Early feasibility questionnaire</h2>
        <p>
          This checklist helps identify whether a site is ready for formal
          feasibility review. It is not an approval or technical sanction.
        </p>
      </div>
      <div className="readiness-list">
        {items.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={checked.includes(item)}
              onChange={(event) =>
                setChecked((current) =>
                  event.target.checked
                    ? [...current, item]
                    : current.filter((value) => value !== item),
                )
              }
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <div className="readiness-score">
        <span>Readiness signal</span>
        <strong>{score}%</strong>
        <p>
          A higher score means the project discussion can move faster, but EHUB
          Bharat still needs site inspection and formal data.
        </p>
      </div>
    </section>
  );
}

export function OperationsPlatformView() {
  return (
    <section className="platform-view" aria-labelledby="platform-title">
      <div className="platform-copy">
        <p className="eyebrow">Illustrative Platform View</p>
        <h2 id="platform-title">Command-centre logic for public charging operations.</h2>
        <p>
          The sample below explains the operating model. Values are
          illustrative and are not presented as EHUB Bharat operating results.
        </p>
      </div>
      <div className="dashboard-visual" role="img" aria-label="Illustrative dashboard showing charger operations modules">
        <div className="dashboard-header">
          <span>Illustrative platform view</span>
          <strong>OCPP operations</strong>
        </div>
        <div className="dashboard-grid">
          {technologyCapabilities.slice(0, 8).map((capability) => (
            <div key={capability}>
              <span />
              <p>{capability}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
