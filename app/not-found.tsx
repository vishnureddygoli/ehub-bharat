import Link from "next/link";
import { SiteFrame } from "./components/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame>
      <section className="page-hero">
        <div className="site-container page-hero__grid">
          <div>
            <p className="eyebrow">Page Not Found</p>
            <h1>The requested page is not available.</h1>
            <p>
              The site has been reorganized around government EV
              infrastructure, manufacturing, tenders and institutional project
              discussions.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary" href="/government-ev-infrastructure">
                Open Government Projects
              </Link>
              <Link className="button button--secondary" href="/contact/government-project-desk">
                Contact Project Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
