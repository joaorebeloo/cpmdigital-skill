#!/usr/bin/env node
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { openReferencePage } from "./analyzer/browser.js";
import { captureScreenshots } from "./analyzer/screenshots.js";
import { extractVisibleElements } from "./extractor/dom.js";
import { extractMotion } from "./extractor/motion.js";
import { buildTokens } from "./extractor/tokens.js";
import { writeContracts } from "./generator/contracts.js";
import { slugFromUrl } from "./utils/slug.js";
import type { CliOptions, MotionLevel } from "./types.js";

const MOTION_LEVELS = new Set(["none", "minimal", "moderate", "heavy"]);

function usage(): never {
  console.error(`Usage:\n  visual-engine analyze <url> [--out <dir>] [--motion none|minimal|moderate|heavy] [--max-elements 1500]\n\nExample:\n  npm run build\n  node dist/index.js analyze https://www.dirac.com --out ../contracts/dirac --motion moderate`);
  process.exit(1);
}

function parseArgs(argv: string[]): CliOptions {
  const [command, url, ...rest] = argv;
  if (command !== "analyze" || !url) usage();

  let outDir = path.join(process.cwd(), "contracts", slugFromUrl(url));
  let motion: MotionLevel = "minimal";
  let maxElements = 1500;

  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    const next = rest[i + 1];

    if (arg === "--out" && next) {
      outDir = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }

    if (arg === "--motion" && next) {
      if (!MOTION_LEVELS.has(next)) {
        throw new Error(`Invalid --motion value: ${next}`);
      }
      motion = next as MotionLevel;
      i += 1;
      continue;
    }

    if (arg === "--max-elements" && next) {
      const parsed = Number.parseInt(next, 10);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error(`Invalid --max-elements value: ${next}`);
      }
      maxElements = parsed;
      i += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { command, url, outDir, motion, maxElements };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  await mkdir(options.outDir, { recursive: true });

  console.log(`Analysing ${options.url}`);
  console.log(`Output: ${options.outDir}`);

  const { browser, page } = await openReferencePage(options.url);

  try {
    await captureScreenshots(page, options.outDir);
    const elements = await extractVisibleElements(page, options.maxElements);
    const motionRaw = await extractMotion(page, elements);
    const tokens = buildTokens(options.url, elements, motionRaw, options.motion);
    await writeContracts(options.outDir, options.url, elements, motionRaw, tokens);

    console.log("Done.");
    console.log(`Generated ${elements.length} element snapshots.`);
    console.log(`Motion level inferred: ${tokens.motion.inferredLevel}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
