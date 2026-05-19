import type { ElementSnapshot, MotionLevel, MotionRaw, Tokens } from "../types.js";

function topValues(values: string[], limit = 12): string[] {
  const ignored = new Set(["", "none", "normal", "auto", "rgba(0, 0, 0, 0)", "transparent", "0px", "0s"]);
  const counts = new Map<string, number>();

  for (const raw of values) {
    const value = raw.trim();
    if (ignored.has(value)) continue;
    counts.set(value, (counts.get(value) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([value]) => value);
}

function splitCommaValues(values: string[]): string[] {
  return values.flatMap((value) => value.split(",").map((item) => item.trim()));
}

function inferMotionLevel(motion: MotionRaw): MotionLevel {
  const score = motion.computedMotion.length + motion.keyframes.length * 8 + motion.interactionRules.length * 2;
  if (score === 0) return "none";
  if (score < 15) return "minimal";
  if (score < 60) return "moderate";
  return "heavy";
}

function recommendFramerMotion(level: MotionLevel, motion: MotionRaw): "yes" | "no" | "conditional" {
  if (level === "none") return "no";
  if (level === "heavy") return "yes";
  if (motion.keyframes.length > 0 || motion.computedMotion.length > 20) return "conditional";
  return "no";
}

export function buildTokens(sourceUrl: string, elements: ElementSnapshot[], motion: MotionRaw, requestedLevel: MotionLevel): Tokens {
  const inferredLevel = inferMotionLevel(motion);

  return {
    sourceUrl,
    generatedAt: new Date().toISOString(),
    counts: {
      elements: elements.length,
      keyframes: motion.keyframes.length,
      interactionRules: motion.interactionRules.length
    },
    colors: topValues(elements.map((element) => element.color)),
    backgroundColors: topValues(elements.map((element) => element.backgroundColor)),
    fontFamilies: topValues(elements.map((element) => element.fontFamily), 8),
    fontSizes: topValues(elements.map((element) => element.fontSize), 16),
    fontWeights: topValues(elements.map((element) => element.fontWeight), 10),
    borderRadii: topValues(elements.map((element) => element.borderRadius), 12),
    shadows: topValues(elements.map((element) => element.boxShadow), 10),
    motion: {
      requestedLevel,
      inferredLevel,
      durations: topValues(splitCommaValues(elements.flatMap((element) => [element.transitionDuration, element.animationDuration])), 12),
      easings: topValues(splitCommaValues(elements.flatMap((element) => [element.transitionTimingFunction, element.animationTimingFunction])), 12),
      delays: topValues(splitCommaValues(elements.flatMap((element) => [element.transitionDelay, element.animationDelay])), 12),
      animationNames: topValues(elements.map((element) => element.animationName), 12),
      shouldUseFramerMotion: recommendFramerMotion(inferredLevel, motion)
    }
  };
}
