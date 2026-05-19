# cpmdigital-skill

Reusable Codex skill pack for visual reference analysis, existing app design refactors, motion contracts and quiz-driven workflows.

The point is simple: stop writing huge prompts every time. Install this pack inside any project, then use short commands.

```txt
ref: https://www.dirac.com
design: / with dirac
quiz design
motion check
```

## Codex install command

Inside any project where you want these skills, open Codex and write:

```txt
install visual-skill https://github.com/joaorebeloo/cpmdigital-skill.git
```

Codex should interpret that as:

```bash
TMP=$(mktemp -d)
git clone --depth 1 https://github.com/joaorebeloo/cpmdigital-skill.git "$TMP"
bash "$TMP/install.sh" "$(pwd)"
rm -rf "$TMP"
```

## Manual install

```bash
cd path/to/your-project
TMP=$(mktemp -d)
git clone --depth 1 https://github.com/joaorebeloo/cpmdigital-skill.git "$TMP"
bash "$TMP/install.sh" "$(pwd)"
rm -rf "$TMP"
```

## What gets installed into a project

```txt
AGENTS.md
.ai/
  skills/
    reference-to-contract/
      SKILL.md
    existing-app-design-refactor/
      SKILL.md
    motion-contract-validator/
      SKILL.md
  workflows/
    analyse-reference.md
    refactor-existing-design.md
    design-quiz.md
  contracts/
  visual-skill.lock
```

## Available commands after install

### Analyse a visual reference

```txt
ref: https://www.dirac.com
```

Generates a contract in:

```txt
.ai/contracts/[reference-name]/
  BLUEPRINT.md
  design-system.md
  voice.md
  tokens.json
  motion.md
  PROMPT_CODEX.md
```

### Improve an existing route/page

```txt
design: / with dirac
```

Uses the selected contract to improve an existing route without rewriting the whole app or changing business logic.

### Ask only the required questions

```txt
quiz design
```

Runs a short implementation quiz when there is missing information.

### Validate animation/motion

```txt
motion check
```

Checks whether animation usage respects `motion.md`.

### Update installed skills

```txt
update visual-skill
```

Reinstalls the skill pack from its source repository when available.

## Core rules

- Do not copy protected brand assets, logos, exact text or proprietary visuals from references.
- Do not rewrite the whole project unless explicitly requested.
- Do not change business logic during design refactors.
- Treat motion as a constraint, not decoration.
- Ask a short quiz when information is missing.
- Prefer small, reversible changes.

## Repository structure

```txt
AGENTS.base.md
install.sh
skills/
  reference-to-contract/
    SKILL.md
  existing-app-design-refactor/
    SKILL.md
  motion-contract-validator/
    SKILL.md
workflows/
  analyse-reference.md
  refactor-existing-design.md
  design-quiz.md
```
