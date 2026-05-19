import type { ElementSnapshot, MotionRaw, Tokens } from "../types.js";

function list(items: string[]): string {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- Not enough signal extracted.";
}

function topText(elements: ElementSnapshot[]): string[] {
  return elements
    .map((element) => element.textContent)
    .filter((text): text is string => Boolean(text && text.length > 3))
    .slice(0, 20);
}

export function generateBlueprint(tokens: Tokens, elements: ElementSnapshot[]): string {
  const headings = elements.filter((element) => /^h[1-6]$/.test(element.tag)).map((element) => element.textContent).filter(Boolean).slice(0, 12) as string[];

  return `# BLUEPRINT\n\n## Source\n\n${tokens.sourceUrl}\n\n## Extraction summary\n\n- Elements analysed: ${tokens.counts.elements}\n- Keyframes found: ${tokens.counts.keyframes}\n- Interaction rules found: ${tokens.counts.interactionRules}\n\n## Visual essence\n\nUse this as a visual contract source, not as a clone target. Preserve the target product identity while borrowing structure, rhythm, hierarchy and restraint.\n\n## Observed hierarchy signals\n\n${list(headings)}\n\n## Layout guidance\n\n- Build from clear sections.\n- Preserve strong vertical rhythm.\n- Avoid dense, unfocused blocks.\n- Prefer reusable components and consistent spacing.\n\n## Implementation rules\n\n- Do not copy brand assets, logos, exact text or proprietary visuals.\n- Translate the reference into tokens and component rules.\n- Keep changes scoped and reversible.\n- Use the generated motion contract before adding animation.\n`;
}

export function generateDesignSystem(tokens: Tokens): string {
  return `# design-system\n\n## Colours\n\n### Text colours\n\n${list(tokens.colors)}\n\n### Background colours\n\n${list(tokens.backgroundColors)}\n\n## Typography\n\n### Font families\n\n${list(tokens.fontFamilies)}\n\n### Font sizes\n\n${list(tokens.fontSizes)}\n\n### Font weights\n\n${list(tokens.fontWeights)}\n\n## Shape\n\n### Border radius\n\n${list(tokens.borderRadii)}\n\n### Shadows\n\n${list(tokens.shadows)}\n\n## Usage\n\nConvert these observations into the target project theme or Tailwind configuration. Do not blindly paste every value; select a compact scale.\n`;
}

export function generateVoice(elements: ElementSnapshot[]): string {
  const samples = topText(elements);

  return `# voice\n\n## Extracted copy samples\n\n${list(samples)}\n\n## Voice guidance\n\n- Infer tone from structure and copy rhythm, not from brand wording.\n- Reuse the copy mechanics, not the exact copy.\n- Prefer short, concrete claims over vague slogans.\n- Make the user's problem obvious before presenting the solution.\n`;
}

export function generateMotion(tokens: Tokens, motion: MotionRaw): string {
  return `# motion\n\n## Motion restraint level\n\nRequested: ${tokens.motion.requestedLevel}\n\nInferred from reference: ${tokens.motion.inferredLevel}\n\n## Framer Motion recommendation\n\n${tokens.motion.shouldUseFramerMotion}\n\n## Duration tokens\n\n${list(tokens.motion.durations)}\n\n## Easing tokens\n\n${list(tokens.motion.easings)}\n\n## Delay tokens\n\n${list(tokens.motion.delays)}\n\n## Animation names\n\n${list(tokens.motion.animationNames)}\n\n## Observed keyframes\n\n${list(motion.keyframes.map((item) => item.name))}\n\n## Observed interaction rules\n\n${list(motion.interactionRules.map((item) => item.selector).slice(0, 30))}\n\n## Implementation rules\n\n- Motion is a constraint, not decoration.\n- Use only durations and easings from this contract unless the user approves otherwise.\n- Respect prefers-reduced-motion.\n- Use whileInView only with once: true.\n- Do not add infinite loops unless the reference clearly uses them.\n- Do not add scroll-jacking.\n- Do not use heavy motion when the requested level is minimal.\n`;
}

export function generatePromptCodex(tokens: Tokens): string {
  return `# PROMPT_CODEX\n\nUse the visual contracts in this folder to improve or generate UI.\n\n## Source\n\n${tokens.sourceUrl}\n\n## Required files to read\n\n- BLUEPRINT.md\n- design-system.md\n- voice.md\n- tokens.json\n- motion.md\n\n## Rules\n\n- Do not copy brand assets, logos, exact text or proprietary visuals.\n- Do not rewrite the whole app unless explicitly requested.\n- Preserve business logic.\n- Apply changes in layers: tokens, typography, spacing, components, sections, motion.\n- Follow motion.md strictly.\n- Run validation commands after changes.\n`;
}
