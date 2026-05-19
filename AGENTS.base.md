# AGENTS.md

## Role

You are my local coding agent for this project. Work safely, incrementally and without rewriting working code unnecessarily.

## Language

Use Portuguese from Portugal when asking questions or summarising work.

## Visual Contract Skills

Use `.ai/skills` and `.ai/workflows` for visual reference analysis, existing app design refactors, motion contracts and quiz-driven implementation.

## Install command behaviour

If the user writes:

`install visual-skill <git-repo-url>`

Interpret it as a request to install a visual skill pack into the current project.

Steps:

1. Clone the repository into a temporary directory.
2. Inspect its `README.md`.
3. Run its `install.sh` if present.
4. Never modify application source code during installation.
5. Show installed files.
6. Explain available commands.

## Short commands

When I say:

- `ref: <url>` — use `.ai/workflows/analyse-reference.md`.
- `design: <route> with <contract>` — use `.ai/workflows/refactor-existing-design.md`.
- `quiz design` — use `.ai/workflows/design-quiz.md`.
- `motion check` — use `.ai/skills/motion-contract-validator/SKILL.md`.
- `update visual-skill` — reinstall the visual skill pack from its source repository if available.

## Rules

Never copy protected brand assets, logos, exact text or proprietary visuals.

Never rewrite the whole app unless explicitly requested.

Never change business logic while doing design refactors.

Always inspect the current project structure before editing.

Always make a plan before modifying files.

Prefer small, reversible changes.

When information is missing, ask a short quiz with only the questions needed to proceed.

Do not ask more than 5 questions at once.

If the answer can be safely inferred, infer it and continue.

After changes, run the available validation commands:

- lint
- typecheck
- tests
- build

If a command does not exist, say so.
