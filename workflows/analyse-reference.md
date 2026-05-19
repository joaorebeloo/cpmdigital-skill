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
5. If `.ai/visual-engine` exists, use the real engine.
6. Run:

```bash
cd .ai/visual-engine
npm install
npm run build
node dist/index.js analyze <url> --out ../contracts/<reference-name> --motion <motion-level>
```

7. Confirm that the engine generated:
   - `screenshots/`
   - `raw-elements.json`
   - `computed-styles.json`
   - `motion-raw.json`
   - `tokens.json`
   - `BLUEPRINT.md`
   - `design-system.md`
   - `voice.md`
   - `motion.md`
   - `PROMPT_CODEX.md`
8. If `.ai/visual-engine` does not exist, say that the real engine is missing and ask to run `install visual-skill <repo-url>` again.
9. Summarise the contract and the next recommended action.

## Contract quality bar

The output must be specific enough to guide implementation. Avoid vague words like modern, clean or premium unless they are translated into concrete layout, type, spacing, colour and motion rules.

## Safety

Do not copy protected brand assets, logos, exact text or proprietary visuals.
