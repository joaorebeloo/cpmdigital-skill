# existing-app-design-refactor

Use this skill when applying a visual contract to an existing app.

## Goal

Improve the design of the current project without destroying the codebase.

## Inputs

Ask only for missing information:

1. Which route, page or component should be improved?
2. Which visual contract should be used?
3. What can be changed?
4. What must not be changed?
5. How aggressive should the refactor be?

## Process

1. Inspect the current project structure.
2. Identify framework, styling system, routes and key components.
3. Read the selected visual contract.
4. Compare current design against the contract.
5. Produce a short refactor plan.
6. Wait for confirmation only if the change is risky.
7. Apply changes in layers:
   - tokens/theme
   - typography
   - spacing
   - layout
   - components
   - page sections
   - motion
8. Preserve business logic.
9. Run validation commands.
10. Summarise exactly what changed.

## Forbidden

Never:

- rewrite the whole project blindly
- change authentication logic
- change payment logic
- change database logic
- copy reference brand assets
- copy reference text
- introduce random animations
- add new dependencies without reason

## Refactor principles

Design refactors must be incremental, reversible and scoped.

Do not make the project look like the reference. Use the reference to improve hierarchy, rhythm, typography, spacing, components and motion discipline.
