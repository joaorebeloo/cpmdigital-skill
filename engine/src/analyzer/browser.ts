import { chromium, type Browser, type Page } from "playwright";

export async function openReferencePage(url: string): Promise<{ browser: Browser; page: Page }> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });

  try {
    await page.waitForLoadState("networkidle", { timeout: 8000 });
  } catch {
    // Network idle is best effort only. Many modern pages keep connections open.
  }

  return { browser, page };
}
