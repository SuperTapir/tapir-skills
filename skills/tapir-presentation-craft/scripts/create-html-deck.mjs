#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, "..");
const starterDir = path.join(skillRoot, "assets", "html-deck-starter");
const knownRoles = new Set([
  "cover",
  "intro",
  "agenda",
  "section",
  "statement",
  "relationship",
  "evidence",
  "comparison",
  "summary",
  "qa",
  "thanks",
]);
const knownPatterns = new Set([
  "cut",
  "pass",
  "land",
  "focus",
  "accumulate",
  "unfold",
  "lock",
  "replace",
  "hold",
]);
const args = process.argv.slice(2);
const sourceArg = args.find((arg) => !arg.startsWith("--"));
const outputArg = args.filter((arg) => !arg.startsWith("--"))[1];
const force = args.includes("--force");

if (!sourceArg || !outputArg) {
  console.error("Usage: create-html-deck.mjs <deck-source.json> <output-directory> [--force]");
  process.exit(2);
}

const sourcePath = path.resolve(sourceArg);
const outputDir = path.resolve(outputArg);

if (!fs.existsSync(sourcePath)) {
  console.error(`Source file not found: ${sourcePath}`);
  process.exit(2);
}

if (fs.existsSync(outputDir) && fs.readdirSync(outputDir).length > 0 && !force) {
  console.error(`Output directory is not empty: ${outputDir}`);
  console.error("Choose an empty directory or pass --force to overwrite generated files.");
  process.exit(2);
}

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const errors = [];

function requireText(value, label) {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${label} must be non-empty text.`);
}

requireText(source?.meta?.title, "meta.title");
requireText(source?.meta?.communicationChange, "meta.communicationChange");

if (!Array.isArray(source.slides) || source.slides.length === 0) {
  errors.push("slides must be a non-empty array.");
}

const ids = new Set();
for (const [index, slide] of (source.slides || []).entries()) {
  const label = `slides[${index}]`;
  requireText(slide.id, `${label}.id`);
  requireText(slide.role, `${label}.role`);
  requireText(slide.layout, `${label}.layout`);
  requireText(slide.claim, `${label}.claim`);
  if (!slide.visual?.pattern) errors.push(`${label}.visual.pattern is required.`);
  if (!slide.visual?.anchor) errors.push(`${label}.visual.anchor is required.`);
  if (slide.role && !knownRoles.has(slide.role)) {
    errors.push(`${label}.role "${slide.role}" is not supported.`);
  }
  if (slide.visual?.pattern && !knownPatterns.has(slide.visual.pattern)) {
    errors.push(`${label}.visual.pattern "${slide.visual.pattern}" is not supported.`);
  }
  if (Array.isArray(slide.lines)) {
    if (slide.lines.length < 1 || slide.lines.length > 3) {
      errors.push(`${label}.lines must contain one to three semantic lines.`);
    }
    slide.lines.forEach((line, lineIndex) => {
      const text = typeof line === "string" ? line : line?.text;
      if (typeof text !== "string" || text.trim() === "") {
        errors.push(`${label}.lines[${lineIndex}] must contain text.`);
      }
    });
  }
  if (slide.role === "agenda" && (!Array.isArray(slide.items) || slide.items.length < 2 || slide.items.length > 5)) {
    errors.push(`${label}.items must contain two to five agenda stages.`);
  }
  if (slide.role === "evidence" && !slide.evidence?.value) {
    errors.push(`${label}.evidence.value is required for evidence slides.`);
  }
  if (
    slide.role === "comparison" &&
    (!slide.comparison?.left || !slide.comparison?.right)
  ) {
    errors.push(`${label}.comparison.left and .right are required.`);
  }
  if (Array.isArray(slide.motion?.beats) && (slide.motion.beats.length < 2 || slide.motion.beats.length > 5)) {
    errors.push(`${label}.motion.beats must contain two to five beats.`);
  }
  if (slide.overflow && slide.overflow !== "intentional") {
    errors.push(`${label}.overflow only accepts "intentional".`);
  }
  if (ids.has(slide.id)) errors.push(`${label}.id duplicates "${slide.id}".`);
  ids.add(slide.id);
}

if (errors.length > 0) {
  errors.forEach((message) => console.error(`ERROR: ${message}`));
  process.exit(1);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function titleHtml(slide) {
  const lines = Array.isArray(slide.lines) && slide.lines.length > 0
    ? slide.lines
    : [slide.claim];
  return lines.map((line) => {
    const text = typeof line === "string" ? line : line.text;
    const accent = typeof line === "object" && line.accent;
    return `<span class="title-line${accent ? " is-accent" : ""}">${escapeHtml(text)}</span>`;
  }).join("<br />");
}

function icon(name) {
  return name ? `<i data-lucide="${escapeHtml(name)}" aria-hidden="true"></i>` : "";
}

function notes(slide) {
  return `<aside class="speaker-notes">${escapeHtml(slide.notes || "")}</aside>`;
}

function motionBeats(slide) {
  const beats = Array.isArray(slide.motion?.beats) ? slide.motion.beats : [];
  if (beats.length === 0) return "";

  return `
          <div class="motion-beats" aria-label="${escapeHtml(slide.motion?.label || "动画步骤")}">
            ${beats.map((beat, index) => {
              const normalized = typeof beat === "string" ? { label: beat } : beat;
              const delay = Number.isFinite(normalized.delayMs) ? normalized.delayMs : index * 480;
              return `<span class="motion-beat${normalized.selected ? " is-selected" : ""}" style="--beat-delay:${delay}ms">${icon(normalized.icon)}${escapeHtml(normalized.label)}</span>`;
            }).join("")}
          </div>`;
}

function eyebrow(slide, fallback) {
  return `<p class="eyebrow" data-animate="1">${escapeHtml(slide.eyebrow || fallback)}</p>`;
}

function renderAgenda(slide) {
  const items = Array.isArray(slide.items) ? slide.items.slice(0, 5) : [];
  return `
          ${eyebrow(slide, "ROUTE")}
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          <ol class="route route-${items.length}" aria-label="演示路线" data-animate="3">
            ${items.map((item, index) => `
            <li>
              <b>${String(index + 1).padStart(2, "0")}</b>
              ${icon(item.icon)}
              <span>${escapeHtml(item.label)}</span>
            </li>`).join("")}
          </ol>
          ${notes(slide)}`;
}

function renderRelationship(slide) {
  const before = slide.visual?.before || {};
  const after = slide.visual?.after || {};
  return `
          ${eyebrow(slide, "MECHANISM")}
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          <div class="relationship" aria-label="${escapeHtml(slide.visual?.description || slide.claim)}" data-animate="3">
            <span class="relationship-before">${icon(before.icon)}${escapeHtml(before.label || "之前")}</span>
            <i class="relationship-gate" aria-hidden="true"></i>
            <span class="relationship-after">${icon(after.icon)}${escapeHtml(after.label || "之后")}</span>
          </div>
          ${notes(slide)}`;
}

function renderEvidence(slide) {
  const evidence = slide.evidence || {};
  return `
          ${eyebrow(slide, "EVIDENCE")}
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          <figure class="evidence-object" data-animate="3">
            ${icon(evidence.icon)}
            <strong>${escapeHtml(evidence.value || "—")}</strong>
            <figcaption>${escapeHtml(evidence.label || "")}</figcaption>
            ${evidence.source ? `<cite>${escapeHtml(evidence.source)}</cite>` : ""}
          </figure>
          ${notes(slide)}`;
}

function renderComparison(slide) {
  const comparison = slide.comparison || {};
  return `
          ${eyebrow(slide, "CONTRAST")}
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          <div class="comparison" data-animate="3">
            <span class="comparison-small">${icon(comparison.leftIcon)}${escapeHtml(comparison.left || "A")}</span>
            <span class="comparison-large">${icon(comparison.rightIcon)}${escapeHtml(comparison.right || "B")}</span>
          </div>
          ${notes(slide)}`;
}

function renderSlide(slide, index) {
  const active = index === 0 ? ' data-active="true"' : "";
  const overflow = slide.overflow === "intentional" ? ' data-overflow="intentional"' : "";
  const customReason = slide.customSvgReason
    ? ` data-custom-svg-reason="${escapeHtml(slide.customSvgReason)}"`
    : "";
  const attributes = `data-slide="${escapeHtml(slide.id)}" data-role="${escapeHtml(slide.role)}" data-layout="${escapeHtml(slide.layout)}" data-motion="${escapeHtml(slide.visual.pattern)}" data-anchor="${escapeHtml(slide.visual.anchor)}"${overflow}${customReason}${active}`;
  let body;

  switch (slide.role) {
    case "cover":
      body = `
          ${eyebrow(slide, "TAPIR PRESENTATION CRAFT")}
          <h1 class="slide-title" data-animate="2">${titleHtml(slide)}</h1>
          <div class="premise-line" aria-hidden="true" data-animate="3"></div>
          ${notes(slide)}`;
      break;
    case "intro":
      body = `
          ${eyebrow(slide, "INTRO")}
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          <p class="supporting-copy" data-animate="3">${icon(slide.icon)}${escapeHtml(slide.supporting || "")}</p>
          <div class="focus-disc" aria-hidden="true" data-animate="2"></div>
          ${notes(slide)}`;
      break;
    case "agenda":
      body = renderAgenda(slide);
      break;
    case "section":
      body = `
          <p class="section-number" data-animate="1">${escapeHtml(slide.sectionNumber || "01")}</p>
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          ${notes(slide)}`;
      break;
    case "statement":
      body = `
          ${eyebrow(slide, "ONE CLAIM")}
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          ${notes(slide)}`;
      break;
    case "relationship":
      body = renderRelationship(slide);
      break;
    case "evidence":
      body = renderEvidence(slide);
      break;
    case "comparison":
      body = renderComparison(slide);
      break;
    case "summary":
      body = `
          ${eyebrow(slide, "SUMMARY")}
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          <p class="supporting-copy" data-animate="3">${icon(slide.icon)}${escapeHtml(slide.supporting || "")}</p>
          ${notes(slide)}`;
      break;
    case "qa":
      body = `
          <div class="qa-field" data-animate="1">
            <small>${escapeHtml(slide.eyebrow || "OPEN FLOOR")}</small>
            <h2 class="slide-title">${titleHtml(slide)}</h2>
            <p>${escapeHtml(slide.supporting || "")}</p>
          </div>
          ${notes(slide)}`;
      break;
    case "thanks":
      body = `
          ${eyebrow(slide, "THANK YOU")}
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          <p class="supporting-copy" data-animate="3">${escapeHtml(slide.supporting || "")}</p>
          ${notes(slide)}`;
      break;
    default:
      body = `
          ${eyebrow(slide, slide.role.toUpperCase())}
          <h2 class="slide-title" data-animate="2">${titleHtml(slide)}</h2>
          <div class="slide-visual" data-animate="3">${escapeHtml(slide.supporting || "")}</div>
          ${notes(slide)}`;
  }

  return `        <section class="slide role-${escapeHtml(slide.role)}" ${attributes}>${body}${motionBeats(slide)}
        </section>`;
}

const preservedCustomCssPath = path.join(outputDir, "custom.css");
const preservedCustomCss = force && fs.existsSync(preservedCustomCssPath)
  ? fs.readFileSync(preservedCustomCssPath, "utf8")
  : null;

fs.mkdirSync(outputDir, { recursive: true });
fs.cpSync(starterDir, outputDir, { recursive: true, force: true });
if (preservedCustomCss !== null) {
  fs.writeFileSync(preservedCustomCssPath, preservedCustomCss);
}

const shellPath = path.join(outputDir, "index.html");
let html = fs.readFileSync(shellPath, "utf8");
const startMarker = "<!-- DECK_SLIDES_START -->";
const endMarker = "<!-- DECK_SLIDES_END -->";
const start = html.indexOf(startMarker);
const end = html.indexOf(endMarker);

if (start === -1 || end === -1 || end <= start) {
  console.error("Starter template is missing slide replacement markers.");
  process.exit(1);
}

const renderedSlides = source.slides.map(renderSlide).join("\n\n");
html = `${html.slice(0, start + startMarker.length)}\n${renderedSlides}\n        ${html.slice(end)}`;
html = html.replace(
  /<title>[\s\S]*?<\/title>/i,
  `<title>${escapeHtml(source.meta.title)}</title>`,
);

const tokenEntries = Object.entries(source.tokens || {})
  .filter(([key, value]) => /^[-a-zA-Z0-9]+$/.test(key) && typeof value === "string")
  .map(([key, value]) => `  --${key}: ${value};`);

if (tokenEntries.length > 0) {
  html = html.replace(
    "</head>",
    `  <style data-deck-tokens>\n:root {\n${tokenEntries.join("\n")}\n}\n  </style>\n  </head>`,
  );
}

fs.writeFileSync(shellPath, html);
fs.copyFileSync(sourcePath, path.join(outputDir, "deck-source.json"));

console.log(`Generated ${source.slides.length} slides in ${outputDir}`);
