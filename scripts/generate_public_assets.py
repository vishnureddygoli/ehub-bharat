from __future__ import annotations

import shutil
from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DOWNLOADS = PUBLIC / "downloads"
OUTPUT = ROOT / "output" / "pdf"
LOGO = PUBLIC / "brand" / "ehub-bharat.png"

BRAND = "EHUB Bharat"
DATE = "2026-07-26"
ADDRESS = (
    "Sy. No. 6E, Dharmojigudem-Dothigudem Road, H/o Lakkaram Village, "
    "Choutuppal Mandal, Yadadri Bhuvanagiri District - 508252, Telangana, India."
)


def ensure_dirs() -> None:
    DOWNLOADS.mkdir(parents=True, exist_ok=True)
    OUTPUT.mkdir(parents=True, exist_ok=True)


def styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=29,
            textColor=colors.HexColor("#17202a"),
            spaceAfter=12,
        ),
        "h2": ParagraphStyle(
            "Heading2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=colors.HexColor("#13795b"),
            spaceBefore=12,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.8,
            leading=14,
            textColor=colors.HexColor("#31404d"),
            spaceAfter=6,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=11,
            textColor=colors.HexColor("#5d6875"),
        ),
    }


def header_footer(canvas, doc) -> None:
    canvas.saveState()
    width, height = A4
    if LOGO.exists():
      canvas.drawImage(str(LOGO), 18 * mm, height - 23 * mm, width=42 * mm, height=14 * mm, mask="auto")
    canvas.setStrokeColor(colors.HexColor("#d9e1e6"))
    canvas.line(18 * mm, height - 28 * mm, width - 18 * mm, height - 28 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(colors.HexColor("#5d6875"))
    canvas.drawString(18 * mm, 13 * mm, f"{BRAND} - Public document - Last reviewed {DATE}")
    canvas.drawRightString(width - 18 * mm, 13 * mm, f"Page {doc.page}")
    canvas.restoreState()


def make_pdf(filename: str, title: str, sections: list[tuple[str, list[str]]]) -> None:
    target = OUTPUT / filename
    doc = SimpleDocTemplate(
        str(target),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=34 * mm,
        bottomMargin=22 * mm,
        title=title,
        author=BRAND,
        subject=title,
    )
    s = styles()
    story = [Paragraph(title, s["title"])]
    for heading, paragraphs in sections:
        story.append(Paragraph(heading, s["h2"]))
        for paragraph in paragraphs:
            story.append(Paragraph(paragraph, s["body"]))
    story.append(Spacer(1, 6))
    story.append(
        Paragraph(
            "Disclaimer: Documents, technical specifications, commercial models and project timelines are subject to formal review, site feasibility and the applicable procurement process.",
            s["small"],
        )
    )
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    shutil.copyfile(target, DOWNLOADS / filename)


def make_documents() -> None:
    make_pdf(
        "ehub-bharat-government-capability-statement.pdf",
        "Government Capability Statement",
        [
            (
                "Positioning",
                [
                    "EHUB Bharat is positioned as an integrated EV charging infrastructure and EV charger manufacturing partner for governments, public-sector organizations and institutions.",
                    "The public delivery narrative is Plan - Manufacture - Deploy - Operate.",
                ],
            ),
            (
                "Government project support",
                [
                    "Planning support may include demand assessment, location planning, site readiness, electrical feasibility, charger-mix planning, DPR support, commercial model review and phased implementation planning.",
                    "Deployment support may include project design, civil and electrical coordination, charger installation, software onboarding, testing, commissioning, signage, handover documentation and operations planning.",
                ],
            ),
            (
                "Manufacturing facility",
                [
                    f"EHUB Bharat presents its own EV charger manufacturing facility at: {ADDRESS}",
                    "Published product and manufacturing claims are limited to verified categories and process descriptions until approved datasheets, test records, certifications and capacity documents are available.",
                ],
            ),
            (
                "Government use cases",
                [
                    "State and city charging networks, highway corridors, government fleet electrification, electric-bus and depot charging, government buildings, public parking, smart-city assets, tourism destinations, hospitals, universities and public-sector campuses.",
                ],
            ),
            (
                "Next action",
                [
                    "Request an executive briefing, invite EHUB Bharat to an EOI or RFP, request a manufacturing review or schedule a factory-visit discussion through the Government Project Desk.",
                ],
            ),
        ],
    )

    make_pdf(
        "ehub-bharat-manufacturing-profile.pdf",
        "Manufacturing Profile",
        [
            (
                "Facility address",
                [
                    ADDRESS,
                    "Map coordinates, factory photographs and additional facility claims must be verified before publication.",
                ],
            ),
            (
                "Published manufacturing scope",
                [
                    "The website may state that EHUB Bharat has its own EV charger manufacturing facility in Telangana.",
                    "AC, DC fast and high-power charger categories may be discussed as categories. Product model names, ratings, certifications, test equipment, capacity and warranty terms require approved source documents.",
                ],
            ),
            (
                "Process overview",
                [
                    "The public manufacturing page is structured around facility overview, incoming-material inspection, assembly process, electrical and functional testing, safety and quality controls, traceability, documentation, spare-parts readiness and factory-visit requests.",
                ],
            ),
            (
                "Verification checklist",
                [
                    "Facility ownership or operating rights, factory photographs, floor area, production lines, installed machinery, testing equipment, quality certifications, product compliance, product test reports, environmental approvals, warranty process, local-content declarations, component sourcing, annual capacity, service network and spare-parts inventory.",
                ],
            ),
        ],
    )

    make_pdf(
        "ehub-bharat-government-project-summary.pdf",
        "Government Project Summary",
        [
            (
                "Project approach",
                [
                    "EHUB Bharat can support public EV charging projects through stakeholder consultation, demand and location mapping, land and power feasibility, DPR support, procurement or PPP structuring, manufacturing and supply, deployment, software integration, commissioning, O&M and phased expansion.",
                ],
            ),
            (
                "Commercial pathways",
                [
                    "Potential models include government-funded CAPEX, EPC, EPC plus O&M, PPP, concession, revenue sharing, site lease, managed charging service and fleet charging service. Availability depends on project feasibility and formal commercial review.",
                ],
            ),
            (
                "Governance",
                [
                    "Recommended project records include milestone logs, responsibility matrix, site documentation, commissioning records, SLA reporting where contracted, uptime and incident reporting, energy reporting, revenue reconciliation, asset lifecycle records and periodic government reports.",
                ],
            ),
            (
                "Contact",
                [
                    "Email: partners@ehubbharat.com. Phone: +91 76758 06699.",
                ],
            ),
        ],
    )


def font(size: int, bold: bool = False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def draw_wrapped(draw: ImageDraw.ImageDraw, text: str, xy: tuple[int, int], fill: str, font_obj, width: int, line_gap: int = 8) -> int:
    x, y = xy
    line = ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=font_obj) <= width:
            line = trial
        else:
            draw.text((x, y), line, fill=fill, font=font_obj)
            y += font_obj.size + line_gap
            line = word
    if line:
        draw.text((x, y), line, fill=fill, font=font_obj)
        y += font_obj.size + line_gap
    return y


def make_og(filename: str, eyebrow: str, title: str, body: str) -> None:
    image = Image.new("RGB", (1200, 630), "#fbfaf7")
    draw = ImageDraw.Draw(image)

    for x in range(0, 1200, 48):
        draw.line((x, 0, x, 630), fill="#d9e1e6", width=1)
    for y in range(0, 630, 48):
        draw.line((0, y, 1200, y), fill="#d9e1e6", width=1)

    draw.rectangle((0, 0, 20, 630), fill="#c5362d")
    draw.rectangle((20, 0, 28, 630), fill="#13795b")
    draw.rectangle((830, 120, 1120, 440), outline="#9fb3bd", width=2)
    draw.rectangle((870, 170, 1040, 220), fill="#101820")
    draw.text((900, 184), "Factory", fill="#ffffff", font=font(26, True))
    draw.rectangle((880, 284, 1060, 336), fill="#ffffff", outline="#c28a31", width=3)
    draw.text((904, 296), "Public Sites", fill="#101820", font=font(24, True))
    draw.line((955, 220, 970, 284), fill="#13795b", width=5)
    draw.line((835, 390, 1110, 250), fill="#c5362d", width=5)

    if LOGO.exists():
        logo = Image.open(LOGO).convert("RGBA")
        logo.thumbnail((238, 80))
        image.paste(logo, (72, 56), logo)

    draw.text((72, 164), eyebrow, fill="#13795b", font=font(28, True))
    y = draw_wrapped(draw, title, (72, 216), "#17202a", font(64, True), 700, 10)
    draw_wrapped(draw, body, (72, y + 22), "#31404d", font(30), 675, 8)
    draw.text((72, 560), "ehubbharat.com", fill="#c5362d", font=font(24, True))
    image.save(PUBLIC / filename, quality=95)


def make_social_images() -> None:
    make_og(
        "og-government-projects.png",
        "Government EV Infrastructure",
        "Building India's Public EV Charging Infrastructure",
        "Plan - Manufacture - Deploy - Operate for governments, PSUs and institutions.",
    )
    make_og(
        "og-manufacturing.png",
        "EV Charger Manufacturing in Telangana",
        "Manufacturing Facility for Public Infrastructure",
        "Facility address published. Capacity and product claims require verified documents.",
    )


if __name__ == "__main__":
    ensure_dirs()
    make_documents()
    make_social_images()
