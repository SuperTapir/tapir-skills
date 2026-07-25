#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const KNOWN_ROLES = new Set([
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

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const targetArg = args.find((arg) => !arg.startsWith("--"));

if (!targetArg) {
  console.error("Usage: validate-html-deck.mjs <index.html|deck-directory> [--strict]");
  process.exit(2);
}

const target = path.resolve(targetArg);
const htmlPath = fs.statSync(target).isDirectory()
  ? path.join(target, "index.html")
  : target;
const root = path.dirname(htmlPath);

if (!fs.existsSync(htmlPath)) {
  console.error(`ERROR: HTML entry not found: ${htmlPath}`);
  process.exit(2);
}

const html = fs.readFileSync(htmlPath, "utf8");
const errors = [];
const warnings = [];

function error(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function attrs(source) {
  const result = {};
  const pattern = /([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of source.matchAll(pattern)) {
    result[match[1]] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return result;
}

function stripMarkup(source) {
  return source
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readLinkedStylesheets() {
  const sheets = [];
  const linkPattern = /<link\b([^>]*rel=["']stylesheet["'][^>]*)>/gi;
  for (const match of html.matchAll(linkPattern)) {
    const linkAttrs = attrs(match[1]);
    if (!linkAttrs.href || /^(?:https?:)?\/\//i.test(linkAttrs.href)) continue;
    const cssPath = path.resolve(root, linkAttrs.href);
    if (!fs.existsSync(cssPath)) {
      error(`Missing linked stylesheet: ${linkAttrs.href}`);
      continue;
    }
    sheets.push(fs.readFileSync(cssPath, "utf8"));
  }
  return sheets.join("\n");
}

const css = [
  ...[...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]),
  readLinkedStylesheets(),
].join("\n");

const slidePattern = /<section\b([^>]*\bdata-slide(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?[^>]*)>([\s\S]*?)<\/section>/gi;
const slides = [...html.matchAll(slidePattern)];

if (slides.length === 0) error("No <section data-slide> elements found.");
if (!/\bdata-deck-stage\b/.test(html)) error("Missing [data-deck-stage] root.");
if (!/\bdata-prev\b/.test(html) || !/\bdata-next\b/.test(html)) {
  warn("Previous/next controls are not both present.");
}

if (!/(?:width\s*:\s*1920px[\s\S]{0,300}height\s*:\s*1080px|height\s*:\s*1080px[\s\S]{0,300}width\s*:\s*1920px)/i.test(css)) {
  error("CSS does not declare a fixed 1920×1080 stage.");
}

if (!/scale\s*\(\s*var\(\s*--deck-scale/i.test(css)) {
  error("Stage does not use uniform --deck-scale transformation.");
}

if (/\b100(?:d|s|l)?v[wh]\b/i.test(css)) {
  error("Viewport-sized 100vw/100vh units found; fixed decks must scale one stage.");
}

if (!/prefers-reduced-motion\s*:\s*reduce/i.test(css)) {
  warn("No prefers-reduced-motion fallback found.");
}

const seenSlideIds = new Set();
let activeCount = 0;

slides.forEach((match, index) => {
  const slideNumber = index + 1;
  const slideAttrs = attrs(match[1]);
  const body = match[2];
  const role = slideAttrs["data-role"];
  const layout = slideAttrs["data-layout"];
  const motion = slideAttrs["data-motion"];
  const anchor = slideAttrs["data-anchor"];
  const stableId = slideAttrs["data-slide"] || `position-${slideNumber}`;

  if (seenSlideIds.has(stableId)) error(`Slide ${slideNumber}: duplicate data-slide "${stableId}".`);
  seenSlideIds.add(stableId);

  if (!role) error(`Slide ${slideNumber}: missing data-role.`);
  else if (!KNOWN_ROLES.has(role)) warn(`Slide ${slideNumber}: unknown role "${role}".`);
  if (!layout) error(`Slide ${slideNumber}: missing data-layout.`);
  if (!motion) warn(`Slide ${slideNumber}: missing data-motion.`);
  if (!anchor) error(`Slide ${slideNumber}: missing data-anchor.`);
  if (!/class=["'][^"']*\bslide-title\b/.test(body)) {
    error(`Slide ${slideNumber}: missing .slide-title.`);
  }
  if (!/class=["'][^"']*\bspeaker-notes\b/.test(body)) {
    warn(`Slide ${slideNumber}: missing .speaker-notes.`);
  }

  if (slideAttrs["data-active"] === "true") activeCount += 1;

  const titleMatch = body.match(/<h[1-3]\b[^>]*class=["'][^"']*\bslide-title\b[^"']*["'][^>]*>([\s\S]*?)<\/h[1-3]>/i);
  if (titleMatch) {
    const titleText = stripMarkup(titleMatch[1]);
    const chineseCharacters = [...titleText].filter((char) => /\p{Script=Han}/u.test(char)).length;
    if (chineseCharacters > 18 && !/<br\s*\/?>/i.test(titleMatch[1])) {
      warn(`Slide ${slideNumber}: long Chinese title has no explicit semantic line break.`);
    }
  }

  const visibleBody = body.replace(/<aside\b[^>]*class=["'][^"']*\bspeaker-notes\b[^"']*["'][^>]*>[\s\S]*?<\/aside>/gi, "");
  const visibleText = stripMarkup(visibleBody);
  const libraryIconCount = (body.match(/\bdata-lucide\s*=/gi) || []).length;
  const customSvgCount = (body.match(/<svg\b/gi) || []).length;

  if (customSvgCount > 2 && !/\bdata-custom-svg-reason\s*=/.test(match[1])) {
    warn(
      `Slide ${slideNumber}: ${customSvgCount} inline SVGs found; prefer a coherent icon library or declare data-custom-svg-reason.`,
    );
  }
  if (role === "agenda" && libraryIconCount === 0 && customSvgCount === 0) {
    warn(`Slide ${slideNumber}: icon-free agenda may feel abstract; verify the route remains imageable.`);
  }

  if (["section", "qa"].includes(role) && visibleText.length > 90) {
    warn(`Slide ${slideNumber}: ${role} role may be carrying too much visible text.`);
  }

  if (role === "qa" && /Q\s*&(?:amp;)?\s*A/i.test(body) && /[?？]/.test(visibleText)) {
    warn(`Slide ${slideNumber}: Q&A label and question mark may duplicate meaning; inspect silhouette.`);
  }
});

if (activeCount !== 1) {
  error(`Expected exactly one initial data-active="true" slide; found ${activeCount}.`);
}

const idPattern = /\bid\s*=\s*["']([^"']+)["']/gi;
const ids = new Set();
for (const match of html.matchAll(idPattern)) {
  if (ids.has(match[1])) error(`Duplicate DOM id "${match[1]}".`);
  ids.add(match[1]);
}

const assetPattern = /<(?:img|video|source)\b[^>]*(?:src|poster)\s*=\s*["']([^"']+)["']/gi;
for (const match of html.matchAll(assetPattern)) {
  const source = match[1];
  if (/^(?:data:|https?:|blob:|#)/i.test(source)) continue;
  if (!fs.existsSync(path.resolve(root, source))) error(`Missing local asset: ${source}`);
}

const scriptPattern = /<script\b[^>]*src\s*=\s*["']([^"']+)["']/gi;
for (const match of html.matchAll(scriptPattern)) {
  const source = match[1];
  if (/^(?:https?:)?\/\//i.test(source)) continue;
  if (!fs.existsSync(path.resolve(root, source))) error(`Missing local script: ${source}`);
}

warnings.forEach((message) => console.warn(`WARN: ${message}`));
errors.forEach((message) => console.error(`ERROR: ${message}`));

console.log(
  `Checked ${slides.length} slide(s): ${errors.length} error(s), ${warnings.length} warning(s).`,
);

if (errors.length > 0 || (strict && warnings.length > 0)) process.exit(1);
