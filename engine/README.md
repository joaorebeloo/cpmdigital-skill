# cpmdigital visual engine

Local Playwright engine for generating visual reference contracts.

## Install dependencies

```bash
cd engine
npm install
npx playwright install chromium
npm run build
```

## Run locally

```bash
node dist/index.js analyze https://www.dirac.com --out ../contracts/dirac --motion moderate
```

Or through npm:

```bash
npm run analyze -- https://www.dirac.com --out ../contracts/dirac --motion moderate
```

## Output

The engine generates:

```txt
screenshots/
  mobile.png
  tablet.png
  desktop.png
  full.png
raw-elements.json
computed-styles.json
motion-raw.json
tokens.json
BLUEPRINT.md
design-system.md
voice.md
motion.md
PROMPT_CODEX.md
README.md
```

## What it extracts

- visible DOM elements
- computed styles
- text snippets
- bounding boxes
- colour and background colour usage
- font families, sizes and weights
- border radius and shadows
- CSS transitions
- CSS animations
- CSS keyframes when accessible
- hover/focus/active rules when accessible

## Limitations

- Cross-origin stylesheets may block CSSOM access. The engine ignores those safely.
- Sites behind login, bot protection or heavy canvas/WebGL may produce weak contracts.
- It does not copy private assets, images, logos or protected brand material.
- The generated markdowns are useful drafts, not a substitute for design judgement.
