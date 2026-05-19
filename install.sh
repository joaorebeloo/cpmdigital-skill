#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-$(pwd)}"
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

printf 'Installing Visual Contract Skills into: %s\n' "$TARGET_DIR"

mkdir -p "$TARGET_DIR/.ai/contracts"

install_dir() {
  local source="$1"
  local target="$2"

  if [ ! -d "$source" ]; then
    printf 'Skipping missing source: %s\n' "$source"
    return
  fi

  if [ -d "$target" ]; then
    printf 'Backing up existing %s\n' "$target"
    mv "$target" "$target.backup-$TIMESTAMP"
  fi

  cp -R "$source" "$target"
}

install_dir "$SOURCE_DIR/skills" "$TARGET_DIR/.ai/skills"
install_dir "$SOURCE_DIR/workflows" "$TARGET_DIR/.ai/workflows"
install_dir "$SOURCE_DIR/engine" "$TARGET_DIR/.ai/visual-engine"

if [ ! -f "$TARGET_DIR/AGENTS.md" ]; then
  cp "$SOURCE_DIR/AGENTS.base.md" "$TARGET_DIR/AGENTS.md"
else
  if ! grep -q "Visual Contract Skills" "$TARGET_DIR/AGENTS.md"; then
    cat >> "$TARGET_DIR/AGENTS.md" <<'EOF'

## Visual Contract Skills

Use `.ai/skills`, `.ai/workflows` and `.ai/visual-engine` for visual reference analysis, existing app design refactors, motion contracts and design quizzes.

Short commands:

- `ref: <url>` — analyse a visual reference and generate contracts.
- `design: <route> with <contract>` — improve an existing route using a visual contract.
- `quiz design` — ask only the questions needed to continue.
- `motion check` — validate animation and motion against `motion.md`.
- `update visual-skill` — update the installed skill pack.

Real engine:

When `.ai/visual-engine` exists, use the real Playwright engine for `ref: <url>`:

```bash
cd .ai/visual-engine
npm install
npm run build
node dist/index.js analyze <url> --out ../contracts/<slug> --motion minimal
```

Rules:

- Do not copy protected brand assets, logos, exact text or proprietary visuals.
- Do not rewrite the whole project unless explicitly requested.
- Do not change business logic during design refactors.
- Always inspect the project before editing.
- Always make a plan before modifying files.
- Prefer small, reversible changes.
EOF
  fi
fi

COMMIT_SHA="$(git -C "$SOURCE_DIR" rev-parse HEAD 2>/dev/null || echo "unknown")"

cat > "$TARGET_DIR/.ai/visual-skill.lock" <<EOF
{
  "name": "cpmdigital-skill",
  "installedAt": "$TIMESTAMP",
  "source": "$SOURCE_DIR",
  "commit": "$COMMIT_SHA",
  "engine": ".ai/visual-engine"
}
EOF

printf 'Done.\n\n'
printf 'Available commands:\n'
printf -- '- ref: <url>\n'
printf -- '- design: <route> with <contract>\n'
printf -- '- quiz design\n'
printf -- '- motion check\n'
printf -- '- update visual-skill\n'
printf '\nReal engine installed at .ai/visual-engine\n'
