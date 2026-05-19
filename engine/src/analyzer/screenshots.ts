import { mkdir } from "node:fs/promises";
import path from "node:path";
import type { Page } from "playwright";

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 900, fullPage: false },
  { name: "tablet", width: 768, height: 1000, fullPage: false },
  { name: "desktop", width: 1440, height: 1100, fullPage: false },
  { name: "full", width: 1440, height: 1100, fullPage: true }
] as const;

export async function captureScreenshots(page: Page, outDir: string): Promise<string[]> {
  const screenshotsDir = path.join(outDir, "screenshots");
  await mkdir(screenshotsDir, { recursive: true });

  const files: string[] = [];

  for (const viewport of VIEWPORTS) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.waitForTimeout(400);
    const filePath = path.join(screenshotsDir, `${viewport.name}.png`);
    await page.screenshot({ path: filePath, fullPage: viewport.fullPage });
    files.push(filePath);
  }

  return files;
}
