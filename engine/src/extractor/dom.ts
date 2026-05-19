import type { Page } from "playwright";
import type { ElementSnapshot } from "../types.js";

export async function extractVisibleElements(page: Page, maxElements: number): Promise<ElementSnapshot[]> {
  return page.evaluate((limit) => {
    const nodes = Array.from(document.querySelectorAll("*"));
    const visible: any[] = [];

    for (const node of nodes) {
      if (visible.length >= limit) break;
      const element = node as HTMLElement;
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);

      const isVisible =
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity || "1") > 0;

      if (!isVisible) continue;

      const text = (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 160) || null;

      visible.push({
        tag: element.tagName.toLowerCase(),
        id: element.id || null,
        className: element.getAttribute("class"),
        textContent: text,
        boundingBox: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        color: style.color,
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        padding: style.padding,
        margin: style.margin,
        display: style.display,
        position: style.position,
        boxShadow: style.boxShadow,
        opacity: style.opacity,
        transform: style.transform,
        transitionProperty: style.transitionProperty,
        transitionDuration: style.transitionDuration,
        transitionTimingFunction: style.transitionTimingFunction,
        transitionDelay: style.transitionDelay,
        animationName: style.animationName,
        animationDuration: style.animationDuration,
        animationTimingFunction: style.animationTimingFunction,
        animationDelay: style.animationDelay,
        animationIterationCount: style.animationIterationCount
      });
    }

    return visible;
  }, maxElements);
}
