import {
  assurancePrinciples,
  briefingSequence,
  procurementReadinessMatrix,
  tenderEvaluationChecklist,
} from "../data/site";
import { SectionIntro } from "./SiteFrame";

export function ExecutiveAssurance() {
  return (
    <section className="content-band content-band--assurance">
      <div className="site-container">
        <SectionIntro
          eyebrow="Executive Assurance"
          title="Built for public-sector scrutiny, not marketing shortcuts."
          summary="The final trust layer is deliberate: every page should help a government reviewer understand what is published, what is controlled, and what needs formal verification before procurement use."
        />
        <div className="assurance-grid">
          {assurancePrinciples.map((item) => (
            <article className="assurance-card" key={item.title}>
              <span>{item.signal}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcurementConfidenceMatrix() {
  return (
    <section className="content-band">
      <div className="site-container">
        <SectionIntro
          eyebrow="Procurement Confidence Matrix"
          title="Clear evidence lanes for committees and project teams."
          summary="Public infrastructure buyers can quickly separate public evidence, controlled evidence and the practical evaluation use of each evidence area."
        />
        <div className="matrix-grid">
          {procurementReadinessMatrix.map((row) => (
            <article className="matrix-card" key={row.area}>
              <h3>{row.area}</h3>
              <dl>
                <div>
                  <dt>Published now</dt>
                  <dd>{row.publicEvidence}</dd>
                </div>
                <div>
                  <dt>Controlled evidence</dt>
                  <dd>{row.controlledEvidence}</dd>
                </div>
                <div>
                  <dt>Committee use</dt>
                  <dd>{row.committeeUse}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TenderEvaluationChecklist() {
  return (
    <section className="content-band content-band--warm">
      <div className="site-container">
        <SectionIntro
          eyebrow="Evaluation Checklist"
          title="A practical checklist for EOI, RFI, RFP and tender teams."
          summary="This does not replace a formal tender document. It helps committees frame the evidence they should request and compare."
        />
        <div className="evaluation-grid">
          {tenderEvaluationChecklist.map((group) => (
            <article className="evaluation-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BriefingSequence() {
  return (
    <div className="briefing-sequence" aria-label="Government briefing sequence">
      {briefingSequence.map((step) => (
        <article key={step.title}>
          <h3>{step.title}</h3>
          <p>{step.summary}</p>
        </article>
      ))}
    </div>
  );
}
