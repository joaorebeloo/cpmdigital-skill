# motion-contract-validator

Use this skill when validating animation and motion rules against `motion.md`.

## Validate

Check for:

- durations outside the approved token scale
- easing curves not listed in `motion.md`
- Framer Motion usage without approval
- `whileInView` without `once: true`
- infinite animations not present in the reference
- motion level heavier than allowed
- missing `prefers-reduced-motion`
- scroll-jacking
- decorative animation without purpose

## Rules

Motion is a constraint, not decoration.

If `motion.md` says minimal, do not add cinematic animation.

If motion is not justified by the reference or product, remove it.

Prefer subtle opacity, transform and stagger primitives.

## Framer Motion rules

When Framer Motion is recommended:

- use named variants
- keep durations from `motion.md`
- keep easing from `motion.md`
- use `whileInView` with `once: true`
- respect `prefers-reduced-motion`
- avoid decorative animation not present in the reference

## Forbidden

Never introduce random bounce, excessive parallax, scroll-jacking, infinite loops or cinematic transitions unless the contract explicitly permits them.
