import type { Page } from "playwright";
import type { ElementSnapshot, MotionRaw } from "../types.js";

export async function extractMotion(page: Page, computedMotion: ElementSnapshot[]): Promise<MotionRaw> {
  const cssom = await page.evaluate(() => {
    const keyframes: { name: string; cssText: string }[] = [];
    const interactionRules: { selector: string; cssText: string }[] = [];

    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules || [])) {
          const cssRule = rule as CSSRule & { name?: string; selectorText?: string };
          const text = cssRule.cssText || "";

          if (typeof CSSKeyframesRule !== "undefined" && cssRule instanceof CSSKeyframesRule) {
            keyframes.push({ name: cssRule.name, cssText: text });
          }

          if (
            cssRule.selectorText &&
            (cssRule.selectorText.includes(":hover") ||
              cssRule.selectorText.includes(":focus") ||
              cssRule.selectorText.includes(":active"))
          ) {
            interactionRules.push({ selector: cssRule.selectorText, cssText: text });
          }
        }
      } catch {
        // Cross-origin stylesheets often block cssRules. Ignore safely.
      }
    }

    return { keyframes, interactionRules };
  });

  return {
    computedMotion: computedMotion.filter((element) => {
      return (
        element.transitionDuration !== "0s" ||
        element.transitionDelay !== "0s" ||
        element.animationName !== "none" ||
        element.animationDuration !== "0s" ||
        element.transform !== "none" ||
        element.opacity !== "1"
      );
    }),
    keyframes: cssom.keyframes,
    interactionRules: cssom.interactionRules
  };
}
