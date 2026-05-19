# Workflow: analyse-reference

When the user says `ref: <url>` or `analisar referência`, do this.

## Steps

1. Check whether a reference URL was provided.
2. If not, ask for it.
3. Ask a short quiz only if needed:
   - What is the target product?
   - Is this for a new page or an existing project?
   - Desired adaptation: subtle, balanced or strong?
   - Motion: none, minimal, moderate or heavy?
4. Create an output folder inside `.ai/contracts/[reference-name]/`.
5. Generate:
   - `BLUEPRINT.md`
   - `design-system.md`
   - `voice.md`
   - `tokens.json`
   - `motion.md`
   - `PROMPT_CODEX.md`
6. Summarise the contract and the next recommended action.

## Contract quality bar

The output must be specific enough to guide implementation. Avoid vague words like modern, clean or premium unless they are translated into concrete layout, type, spacing, colour and motion rules.

## Safety

Do not copy protected brand assets, logos, exact text or proprietary visuals.
