"use client";

import type { FormEvent, HTMLAttributes } from "react";
import { useMemo, useState } from "react";

const projectCategories = [
  "Statewide charging network",
  "City charging network",
  "Highway corridor",
  "Government fleet",
  "Bus depot",
  "Government buildings",
  "Public parking",
  "Tourism locations",
  "Hospitals",
  "Universities",
  "Public-sector campuses",
  "Solar and BESS project",
  "Other",
];

const procurementStages = [
  "Policy or concept stage",
  "Feasibility assessment",
  "DPR preparation",
  "Market consultation",
  "EOI",
  "RFI",
  "RFP or tender",
  "Pilot",
  "Awarded project",
  "Expansion of existing infrastructure",
];

const commercialModels = [
  "To be assessed",
  "Government-funded CAPEX",
  "EPC",
  "EPC plus O&M",
  "PPP",
  "BOOT or concession",
  "Revenue sharing",
  "Site lease",
  "Managed charging service",
  "Fleet charging service",
];

type FormStatus =
  | { state: "idle"; message: string }
  | { state: "submitting"; message: string }
  | { state: "success"; message: string; reference: string }
  | { state: "error"; message: string };

export function GovernmentDeskForm() {
  const [status, setStatus] = useState<FormStatus>({
    state: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("utm", getUtm());
    setStatus({ state: "submitting", message: "Submitting enquiry securely..." });

    try {
      const response = await fetch("/api/government-enquiry", {
        method: "POST",
        body: data,
      });
      const result = (await response.json()) as {
        ok: boolean;
        reference?: string;
        message?: string;
      };

      if (!response.ok || !result.ok || !result.reference) {
        throw new Error(result.message || "The enquiry could not be submitted.");
      }

      form.reset();
      setStatus({
        state: "success",
        reference: result.reference,
        message:
          "Your enquiry has been recorded for review by the Government Project Desk.",
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The enquiry could not be submitted. Please try again.",
      });
    }
  }

  return (
    <form className="project-form" onSubmit={handleSubmit} aria-describedby="government-project-note">
      <p className="form-note" id="government-project-note">
        Use an official work email where possible. Sensitive or confidential
        documents should be shared only after EHUB Bharat confirms the secure
        document exchange process.
      </p>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="honeypot" />
      <div className="form-grid">
        <Field label="Government department, PSU or institution" name="organization" required />
        <Field label="Officer or contact name" name="contactName" required />
        <Field label="Designation" name="designation" required />
        <Field label="Official work email" name="email" type="email" required />
        <Field label="Official phone number" name="phone" type="tel" required />
        <Field label="State or Union Territory" name="state" required />
        <Field label="City or district" name="cityDistrict" required />
        <Select label="Project category" name="projectCategory" options={projectCategories} required />
        <Select label="Procurement stage" name="procurementStage" options={procurementStages} required />
        <Field label="Number of proposed locations" name="locations" inputMode="numeric" />
        <Field label="Government buildings or assets involved" name="assets" />
        <Field label="Fleet size, where applicable" name="fleetSize" inputMode="numeric" />
        <Field label="Approximate daily vehicle demand" name="dailyDemand" inputMode="numeric" />
        <Field label="Power availability" name="powerAvailability" />
        <Select label="Preferred project model" name="projectModel" options={commercialModels} />
        <Field label="Expected implementation timeline" name="timeline" />
        <label className="field field--wide">
          <span>Project description</span>
          <textarea name="description" rows={6} required />
        </label>
        <label className="field field--wide">
          <span>Secure document upload</span>
          <input
            type="file"
            name="document"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
          />
          <small>
            Accepted for initial screening only: PDF, Office documents and
            images up to 10 MB. Do not upload confidential tender documents
            until a secure exchange is confirmed.
          </small>
        </label>
        <label className="consent field--wide">
          <input type="checkbox" name="consent" required />
          <span>
            I confirm that the information is shared for project review and
            that I have authority to submit these details.
          </span>
        </label>
      </div>
      <button className="button button--primary" type="submit" disabled={status.state === "submitting"}>
        Submit Government Project Enquiry
      </button>
      <div className={`form-status form-status--${status.state}`} role="status" aria-live="polite">
        {status.message}
        {status.state === "success" ? <strong> Reference: {status.reference}</strong> : null}
      </div>
      <div className="form-aftercare" aria-label="What happens after submission">
        <h3>After submission</h3>
        <ol>
          <li>EHUB Bharat screens the request category, procurement stage and document needs.</li>
          <li>The team confirms whether a briefing, factory visit or secure document exchange is appropriate.</li>
          <li>Any technical, commercial or tender material is shared only after review and approval.</li>
        </ol>
      </div>
    </form>
  );
}

function getUtm() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
    .map((key) => [key, params.get(key)])
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

function Field({
  label,
  name,
  type = "text",
  required,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} required={required} inputMode={inputMode} />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} required={required} defaultValue="">
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FleetChargingEstimator() {
  const [fleetSize, setFleetSize] = useState(25);
  const [dailyKm, setDailyKm] = useState(80);
  const [efficiency, setEfficiency] = useState(0.16);
  const [chargingHours, setChargingHours] = useState(8);

  const estimate = useMemo(() => {
    const dailyEnergy = fleetSize * dailyKm * efficiency;
    const averageLoad = dailyEnergy / Math.max(chargingHours, 1);
    return {
      dailyEnergy: Math.round(dailyEnergy),
      averageLoad: Math.round(averageLoad),
    };
  }, [fleetSize, dailyKm, efficiency, chargingHours]);

  return (
    <section className="tool-panel" aria-labelledby="fleet-estimator-title">
      <div>
        <p className="eyebrow">Planning Tool</p>
        <h2 id="fleet-estimator-title">Government fleet charging estimator</h2>
        <p>
          This tool gives a directional energy estimate for early feasibility
          discussions. Final charger count, power capacity and commercial
          design require site survey, vehicle data and utility review.
        </p>
      </div>
      <div className="estimator-grid">
        <NumberInput label="Fleet size" value={fleetSize} min={1} max={500} onChange={setFleetSize} />
        <NumberInput label="Average km per vehicle per day" value={dailyKm} min={5} max={400} onChange={setDailyKm} />
        <NumberInput label="kWh per km assumption" value={efficiency} min={0.08} max={1.4} step={0.01} onChange={setEfficiency} />
        <NumberInput label="Charging window in hours" value={chargingHours} min={1} max={24} onChange={setChargingHours} />
        <div className="estimator-result">
          <span>Estimated daily energy</span>
          <strong>{estimate.dailyEnergy.toLocaleString("en-IN")} kWh</strong>
        </div>
        <div className="estimator-result">
          <span>Average charging load for window</span>
          <strong>{estimate.averageLoad.toLocaleString("en-IN")} kW</strong>
        </div>
      </div>
      <p className="assumption-note">
        Methodology: fleet size x daily distance x energy per km. Date:
        2026-07-26. This is not a tariff quote, DPR, sanctioned load estimate
        or equipment recommendation.
      </p>
    </section>
  );
}

function NumberInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
