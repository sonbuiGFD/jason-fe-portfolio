# jason-fe-portfolio Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-10-29

## Active Technologies

- TypeScript 5.3+, JavaScript ES2022+ + Next.js 14+ (App Router), React 18+, TailwindCSS 3.4+, Motion (Framer Motion) 11+, Sanity CMS 3+, GROQ (Sanity query language), SVGR (SVG as React components) (000-fe-portfolio)

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

- 000-fe-portfolio: Added TypeScript 5.3+, JavaScript ES2022+ + Next.js 14+ (App Router), React 18+, TailwindCSS 3.4+, Motion (Framer Motion) 11+, Sanity CMS 3+, GROQ (Sanity query language), SVGR (SVG as React components)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
