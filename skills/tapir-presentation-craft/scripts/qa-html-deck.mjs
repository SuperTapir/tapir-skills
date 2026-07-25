#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const targetArg = args.find((arg) => !arg.startsWith("--"));
const screenshotsFlag = args.indexOf("--screenshots");
const screenshotsArg = screenshotsFlag >= 0 ? args[screenshotsFlag + 1] : null;
const motionSlideFlag = args.indexOf("--motion-slide");
const motionSlide = motionSlideFlag >= 0 ? Number.parseInt(args[motionSlideFlag + 1], 10) : null;

if (!targetArg) {
  console.error("Usage: qa-html-deck.mjs <deck-directory|index.html> [--screenshots <directory>] [--motion-slide <number>]");
  console.error("Set TAPIR_NODE_MODULES when Playwright is not installed beside the deck.");
  process.exit(2);
}

const target = path.resolve(targetArg);
const root = fs.statSync(target).isDirectory() ? target : path.dirname(target);
const entry = fs.statSync(target).isDirectory() ? "index.html" : path.basename(target);
const screenshotsDir = screenshotsArg ? path.resolve(screenshotsArg) : null;

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch (firstError) {
    const moduleRoot = process.env.TAPIR_NODE_MODULES;
    if (!moduleRoot) {
      console.error("Playwright is unavailable.");
      console.error("Install it locally or set TAPIR_NODE_MODULES to a node_modules directory containing playwright.");
      throw firstError;
    }
    return import(pathToFileURL(path.join(moduleRoot, "playwright", "index.mjs")).href);
  }
}

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".woff2": "font/woff2",
  }[extension] || "application/octet-stream";
}

const server = http.createServer((request, response) => {
  const requested = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const relative = requested === "/" ? entry : requested.replace(/^\/+/, "");
  const filePath = path.resolve(root, relative);

  if (!filePath.startsWith(`${root}${path.sep}`) && filePath !== path.join(root, entry)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    response.writeHead(404).end("Not found");
    return;
  }

  response.writeHead(200, { "Content-Type": contentType(filePath) });
  fs.createReadStream(filePath).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const baseUrl = `http://127.0.0.1:${address.port}/${entry}`;
const { chromium } = await loadPlaywright();
const browser = await chromium.launch({ headless: true });
const report = {
  deck: root,
  generatedAt: new Date().toISOString(),
  viewports: [],
  errors: [],
  warnings: [],
};

try {
  if (screenshotsDir) fs.mkdirSync(screenshotsDir, { recursive: true });

  const viewports = [
    { name: "stage", width: 1920, height: 1080 },
    { name: "tall-window", width: 1366, height: 900 },
  ];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    const runtimeErrors = [];
    page.on("pageerror", (event) => runtimeErrors.push(String(event)));
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) runtimeErrors.push(message.text());
    });

    await page.goto(`${baseUrl}#1`, { waitUntil: "domcontentloaded" });
    const slideCount = await page.locator("[data-slide]").count();
    const viewportResult = { ...viewport, slides: [] };

    for (let index = 1; index <= slideCount; index += 1) {
      await page.goto(`${baseUrl}#${index}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(90);

      const slide = await page.evaluate(() => {
        const stage = document.querySelector("[data-deck-stage]");
        const active = document.querySelector('[data-slide][data-active="true"]');
        const stageRect = stage?.getBoundingClientRect();
        const slideRect = active?.getBoundingClientRect();
        const title = active?.querySelector(".slide-title");
        const titleRect = title?.getBoundingClientRect();
        const overflow = active
          ? active.scrollWidth > active.clientWidth || active.scrollHeight > active.clientHeight
          : true;

        return {
          id: active?.dataset.slide,
          role: active?.dataset.role,
          layout: active?.dataset.layout,
          motion: active?.dataset.motion,
          anchor: active?.dataset.anchor,
          activeCount: document.querySelectorAll('[data-slide][data-active="true"]').length,
          stageRatio: stageRect ? Number((stageRect.width / stageRect.height).toFixed(4)) : null,
          slideInsideStage: Boolean(
            stageRect &&
            slideRect &&
            slideRect.left >= stageRect.left - 0.5 &&
            slideRect.top >= stageRect.top - 0.5 &&
            slideRect.right <= stageRect.right + 0.5 &&
            slideRect.bottom <= stageRect.bottom + 0.5
          ),
          titleInsideStage: Boolean(
            stageRect &&
            titleRect &&
            titleRect.left >= stageRect.left - 0.5 &&
            titleRect.top >= stageRect.top - 0.5 &&
            titleRect.right <= stageRect.right + 0.5 &&
            titleRect.bottom <= stageRect.bottom + 0.5
          ),
          overflow,
          overflowIntentional: active?.dataset.overflow === "intentional",
          iconPlaceholders: active?.querySelectorAll("[data-lucide]").length || 0,
          renderedIcons: active?.querySelectorAll("svg.lucide").length || 0,
          motionBeatCount: active?.querySelectorAll(".motion-beat").length || 0,
          animatedElements: active?.querySelectorAll("[data-animate], .motion-beat").length || 0,
          runningAnimations: active
            ? [...active.querySelectorAll("[data-animate], .motion-beat")].reduce(
                (total, element) => total + element.getAnimations().length,
                0,
              )
            : 0,
        };
      });

      viewportResult.slides.push(slide);
      const prefix = `${viewport.name} slide ${index}`;
      if (slide.activeCount !== 1) report.errors.push(`${prefix}: expected one active slide.`);
      if (slide.stageRatio !== 1.7778) report.errors.push(`${prefix}: stage ratio is ${slide.stageRatio}.`);
      if (!slide.slideInsideStage) report.errors.push(`${prefix}: active slide escaped the stage.`);
      if (!slide.titleInsideStage) report.errors.push(`${prefix}: title escaped the stage.`);
      if (slide.overflow && !slide.overflowIntentional) report.errors.push(`${prefix}: unapproved overflow.`);
      if (!slide.anchor) report.errors.push(`${prefix}: missing rendered anchor declaration.`);
      if (slide.iconPlaceholders > 0 && slide.renderedIcons === 0) {
        report.errors.push(`${prefix}: icon placeholders did not render.`);
      }
      if (slide.motion && slide.motion !== "hold" && slide.animatedElements === 0) {
        report.warnings.push(`${prefix}: motion declared but no animated elements found.`);
      }
      if (slide.motionBeatCount > 0 && slide.runningAnimations < slide.motionBeatCount) {
        report.errors.push(`${prefix}: one or more motion beats did not start.`);
      }

      if (screenshotsDir && viewport.name === "stage") {
        const filename = `${String(index).padStart(2, "0")}-${slide.role || "slide"}.png`;
        await page.locator("[data-deck-stage]").screenshot({
          path: path.join(screenshotsDir, filename),
          animations: "disabled",
        });
      }
    }

    if (slideCount > 1) {
      await page.goto(`${baseUrl}#1`, { waitUntil: "domcontentloaded" });
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowLeft");
      const navigationState = await page.evaluate(() => ({
        hash: location.hash,
        activeCount: document.querySelectorAll('[data-slide][data-active="true"]').length,
      }));
      if (navigationState.hash !== "#1" || navigationState.activeCount !== 1) {
        report.errors.push(`${viewport.name}: rapid previous/next navigation left stale state.`);
      }
    }

    runtimeErrors.forEach((message) => report.errors.push(`${viewport.name}: ${message}`));
    report.viewports.push(viewportResult);
    await page.close();
  }

  if (screenshotsDir && Number.isFinite(motionSlide) && motionSlide > 0) {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(`${baseUrl}#${motionSlide}`, { waitUntil: "domcontentloaded" });
    const sampleTimes = [120, 720, 1320, 1920, 2640];
    let elapsed = 0;
    for (const time of sampleTimes) {
      await page.waitForTimeout(time - elapsed);
      elapsed = time;
      await page.locator("[data-deck-stage]").screenshot({
        path: path.join(
          screenshotsDir,
          `motion-${String(motionSlide).padStart(2, "0")}-${String(time).padStart(4, "0")}ms.png`,
        ),
      });
    }
    await page.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

const reportPath = path.join(screenshotsDir || root, "qa-report.json");
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

report.warnings.forEach((message) => console.warn(`WARN: ${message}`));
report.errors.forEach((message) => console.error(`ERROR: ${message}`));
console.log(
  `Rendered ${report.viewports[0]?.slides.length || 0} slide(s) in ${report.viewports.length} viewport(s): ` +
  `${report.errors.length} error(s), ${report.warnings.length} warning(s).`,
);
console.log(`Report: ${reportPath}`);

if (report.errors.length > 0) process.exit(1);
