#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const keep = process.argv.includes("--keep");
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, "..");
const fixtureDir = path.join(skillRoot, "assets", "examples", "gpt-principles");
const sourcePath = path.join(fixtureDir, "deck-source.json");
const fixtureCssPath = path.join(fixtureDir, "custom.css");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "tapir-presentation-self-test-"));
const deckDir = path.join(tempRoot, "deck");
const qaDir = path.join(tempRoot, "qa");

function run(script, args, env = process.env) {
  const result = spawnSync(process.execPath, [path.join(scriptDir, script), ...args], {
    env,
    stdio: "inherit",
  });
  if (result.status !== 0) throw new Error(`${script} failed with exit code ${result.status}.`);
}

function runExpectFailure(script, args, env = process.env) {
  const result = spawnSync(process.execPath, [path.join(scriptDir, script), ...args], {
    env,
    encoding: "utf8",
  });
  if (result.status === 0) throw new Error(`${script} unexpectedly accepted invalid input.`);
}

function digest(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

let passed = false;

try {
  run("create-html-deck.mjs", [sourcePath, deckDir]);
  runExpectFailure("create-html-deck.mjs", [sourcePath, deckDir]);

  const invalidSource = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  delete invalidSource.slides[0].visual.anchor;
  const invalidSourcePath = path.join(tempRoot, "invalid-source.json");
  fs.writeFileSync(invalidSourcePath, `${JSON.stringify(invalidSource, null, 2)}\n`);
  runExpectFailure("create-html-deck.mjs", [
    invalidSourcePath,
    path.join(tempRoot, "invalid-deck"),
  ]);

  fs.copyFileSync(fixtureCssPath, path.join(deckDir, "custom.css"));
  const cssBefore = digest(path.join(deckDir, "custom.css"));

  run("create-html-deck.mjs", [sourcePath, deckDir, "--force"]);
  const cssAfter = digest(path.join(deckDir, "custom.css"));
  if (cssBefore !== cssAfter) throw new Error("Regeneration did not preserve custom.css.");

  run("validate-html-deck.mjs", [deckDir, "--strict"]);

  if (process.env.TAPIR_NODE_MODULES) {
    run(
      "qa-html-deck.mjs",
      [deckDir, "--screenshots", qaDir, "--motion-slide", "6"],
      process.env,
    );
  } else {
    console.log("Rendered QA skipped: TAPIR_NODE_MODULES is not set.");
  }

  passed = true;
  console.log(`Tapir Presentation Craft self-test passed: ${tempRoot}`);
} finally {
  if (passed && !keep) fs.rmSync(tempRoot, { recursive: true, force: true });
  else if (!passed || keep) console.log(`Self-test artifacts retained: ${tempRoot}`);
}
