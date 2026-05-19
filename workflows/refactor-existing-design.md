# Workflow: refactor-existing-design

When the user says `design: <route> with <contract>` or `melhorar design existente`, do this.

## Steps

1. Inspect the project.
2. Find available visual contracts in `.ai/contracts/`.
3. If there is no contract, ask whether to create one first.
4. Ask only missing quiz questions:
   - Which route/page?
   - Which contract?
   - How aggressive should the change be?
   - What cannot change?
5. Produce a refactor plan.
6. Apply safe changes in layers:
   - tokens/theme
   - typography
   - spacing
   - layout
   - reusable components
   - page sections
   - motion
7. Preserve business logic.
8. Run validation.
9. Summarise changed files and next steps.

## Rules

Do not rewrite the whole app blindly.

Do not change business logic.

Do not copy the reference. Apply the contract.

Use motion only when allowed by `motion.md`.
