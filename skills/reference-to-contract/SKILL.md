# reference-to-contract

Use this skill when the user wants to analyse a visual reference website and convert it into implementation-ready contracts for Codex.

## Inputs

Ask only for missing information:

1. Reference URL
2. Target product or app type
3. Desired adaptation level
4. Motion level
5. Output folder

## Output artifacts

Generate:

- `BLUEPRINT.md`
- `design-system.md`
- `voice.md`
- `tokens.json`
- `motion.md`
- `PROMPT_CODEX.md`

## Process

1. Analyse the reference page.
2. Identify layout, hierarchy, typography, colour, spacing, components, copy style and motion.
3. Do not copy protected brand, exact text, logos or assets.
4. Convert observations into reusable rules.
5. Generate implementation guidance for Codex.

## Contract rules

The contract must describe:

- visual essence
- layout system
- section structure
- typography rules
- colour system
- spacing scale
- components
- copywriting voice
- motion rules
- forbidden patterns
- implementation guidance

## Motion

If motion is requested, generate `motion.md`.

Classify motion as:

- none
- minimal
- moderate
- heavy

Always prefer restraint.

## Forbidden

Never copy protected brand assets, logos, exact text, proprietary visuals or private assets.

Never produce generic AI landing-page clichés.

Never treat the reference as a clone target. Treat it as a design contract source.
