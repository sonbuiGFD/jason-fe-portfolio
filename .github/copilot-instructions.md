# jason-fe-portfolio Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-10-29

## Active Technologies

- TypeScript 5.3+, JavaScript ES2022+ + Next.js 14+ (App Router), React 18+, TailwindCSS 4.1+, Motion (Framer Motion) 11+, SVGR (SVG as React components) (000-fe-portfolio)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.3+, JavaScript ES2022+: Follow standard conventions

### CSS/SCSS Naming Convention

**BEM (Block Element Modifier) with Double Underscores**

Format: `block__element__modifier`

- Use `__` (double underscore) for ALL separators, including modifiers
- Do NOT use `--` (double dash) for modifiers
- Keep names semantic and descriptive

Examples:

- `.card__header__title`
- `.nav__item__active`
- `.button__icon__large`
- `.hero__content__centered`
- `.modal__overlay__dark`

Apply this convention to:

- Custom CSS/SCSS classes
- Component-specific styles
- Any hand-written CSS (when not using Tailwind utility classes)

### CSS/SCSS Implementation Rules

**CRITICAL: Do NOT use @apply directive**

- ❌ NEVER use `@apply` directive - Tailwind CSS v4 has removed support for `@apply`
- ✅ ALWAYS use direct CSS properties or Tailwind utility classes in HTML instead
- ✅ Use CSS custom properties defined in `@theme` block for theme colors
- ✅ For opacity, use `rgb(var(--color-name-rgb) / 0.1)` syntax or standard `opacity` property

**Bad Example:**

```scss
.button {
  @apply bg-primary text-white hover:bg-primary/90;
}
```

**Good Example:**

```scss
.button {
  background-color: rgb(var(--color-primary));
  color: white;

  &:hover {
    opacity: 0.9;
  }
}
```

**Using Custom Properties (Tailwind CSS v4):**

- Background: `background-color: var(--color-background)`
- Foreground: `color: var(--color-foreground)`
- Primary: `var(--color-primary)`
- Border: `var(--color-border)`
- Muted: `var(--color-muted)`
- With opacity (use RGB channels): `rgb(var(--color-muted-rgb) / 0.1)`

**TailwindCSS v4 Configuration:**

- Configuration is now CSS-based using `@theme` directive in `styles/tailwind.css`
- No `tailwind.config.ts` file needed
- Import Tailwind using `@import "tailwindcss"` instead of `@tailwind` directives
- Define custom theme values using CSS custom properties within `@theme` block
- Colors defined as `rgb()` values for better opacity support

### SVG Asset Guidelines

**Using SVGR for SVG Components**

- Import SVG files as React components using SVGR: `import Logo from '@/public/icons/logo.svg'`
- Pass standard SVG props (width, height, className, style, etc.) to SVG components
- Use with TailwindCSS classes for dynamic styling: `<Icon className="text-gray-900 dark:text-white" />`
- Combine with Motion for animations: `const MotionIcon = motion(Icon)`
- Ensure SVGs have proper viewBox for responsive scaling
- Add ARIA attributes for accessibility: `aria-label`, `role="img"`
- Store icon SVGs in `public/icons/` and illustration SVGs in `public/images/`
- See `docs/svg-usage.md` for detailed usage patterns and best practices

## Recent Changes

- 000-fe-portfolio: Updated to TailwindCSS 4.1 with CSS-based configuration using `@theme` directive (October 30, 2025)
- 000-fe-portfolio: Added TypeScript 5.3+, JavaScript ES2022+ + Next.js 14+ (App Router), React 18+, Motion (Framer Motion) 11+, SVGR (SVG as React components)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
