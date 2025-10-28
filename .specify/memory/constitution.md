<!--
Sync Impact Report:
- Version change: [template] → 1.0.0
- Initial constitution establishment for sonbui.com Next.js Portfolio
- Added principles:
  1. Code Quality & Type Safety
  2. Testing Standards & Accessibility
  3. UX Consistency & Design System
  4. Performance Requirements
  5. Content Management & CMS Integration
- Added sections:
  - Performance Standards (detailed Core Web Vitals requirements)
  - CI/CD & Quality Gates (enforcement mechanisms)
- Templates requiring updates:
  ✅ .specify/templates/plan-template.md - Constitution Check section aligns
  ✅ .specify/templates/spec-template.md - Requirements section supports constitution
  ✅ .specify/templates/tasks-template.md - Task categorization supports principles
  ⚠ No command files found in .specify/templates/commands/ - skipped
  ⚠ No README.md or docs/ found - skipped
- Follow-up TODOs: None
-->

# sonbui.com Portfolio Constitution

## Purpose Statement

This constitution establishes the fundamental principles and governance framework for sonbui.com, Jason Bui's professional portfolio website featuring interactive animations, clean design aesthetics, and content-driven blog, works, and side projects sections. Content is managed through a headless CMS with media assets delivered via CDN, showcasing Next.js best practices and frontend development excellence.

## Core Principles

### Principle 1: Code Quality & Type Safety

TypeScript MUST be configured in strict mode with no `any` types permitted. All code MUST pass ESLint and Prettier checks enforced in CI. Commits MUST follow Conventional Commits format. Branch protections MUST require code reviews before merge. Shared utilities MUST be consolidated in `/lib` with no duplicate helper functions. Dead code MUST be removed before each release.

**Rationale**: Strict typing catches bugs at compile time. Consistent code style and structure reduce cognitive load during maintenance. Eliminating duplication and dead code keeps the codebase lean and maintainable. Professional portfolios demand professional code standards.

### Principle 2: Testing Standards & Accessibility

Accessibility tests MUST validate landmarks, ARIA labels, and color contrast ratios. All interactive components MUST be keyboard-navigable. Focus states MUST be visible. WCAG 2.2 AA compliance MUST be verified in CI. Keyboard traps are strictly forbidden.

**Rationale**: Accessible design expands audience reach and demonstrates professional ethics. Automated accessibility testing catches regressions before deployment. Keyboard navigation is essential for users who cannot use pointing devices.

### Principle 3: UX Consistency & Design System

Design tokens MUST define spacing, border radii, and typography scales. Navigation structure, heading hierarchy, card layouts, and detail pages MUST maintain consistent patterns across blog, work, and labs sections. Dark and light themes MUST have visual parity. Empty states, error states, and loading states MUST be explicitly designed for both list and detail views.

**Rationale**: Consistent UX builds user trust and reduces learning curves. Design tokens enable theme changes without touching component logic. Explicit states prevent jarring experiences during data fetching or errors.

### Principle 4: Performance Requirements

Performance budgets MUST enforce LCP ≤2.5s, INP ≤200ms, and CLS ≤0.1 at the 75th percentile on mobile devices. All images MUST use `next/image` with CDN delivery in WebP or AVIF formats where possible. Width and height MUST be specified. The `priority` attribute MUST be used only for above-the-fold images.

Data fetching MUST prefer Static Site Generation (SSG) or Incremental Static Regeneration (ISR) for list and detail pages. Server-Side Rendering (SSR) MUST be used only when runtime data is required. Caching headers MUST be defined for all routes.

Third-party scripts MUST be limited and lazy-loaded when non-critical. `preconnect` and `preload` directives MUST be used for CMS and CDN origins. Font optimization MUST use `next/font` with subsetting and optimal display strategies.

**Rationale**: Performance directly impacts user retention and SEO rankings. Core Web Vitals are Google ranking factors. Portfolio sites showcasing frontend skills must demonstrate performance mastery. CDN delivery reduces server costs and improves global latency.

### Principle 5: Content Management & CMS Integration

All blog posts, work items, and project descriptions MUST be sourced from the headless CMS—no hardcoded content. Draft content MUST be filtered in production builds. Content schema changes MUST be backward-compatible or versioned. ISR revalidation MUST trigger within 60 seconds of CMS publish events via webhooks.

**Rationale**: Separating content from code enables non-technical updates and prevents deployment bottlenecks. Filtering drafts prevents accidental publication. Schema versioning protects against breaking changes during CMS migrations.

## Performance Standards

### Core Web Vitals Thresholds

- **LCP (Largest Contentful Paint)**: ≤2.5 seconds at 75th percentile (mobile)
- **INP (Interaction to Next Paint)**: ≤200 milliseconds at 75th percentile (mobile)
- **CLS (Cumulative Layout Shift)**: ≤0.1 at 75th percentile (mobile)

### Animation Performance

The website MUST maintain smooth 60fps animations across all supported devices and browsers. Performance optimizations take precedence over feature additions that could degrade user experience. The particle animation system serves as the primary visual centerpiece and MUST perform within device constraints.

**Rationale**: A portfolio showcasing frontend development skills must demonstrate technical excellence through fluid animations and responsive interactions. Visual quality directly reflects design sensibilities and attention to detail.

### Image Optimization

- CDN delivery required for all images
- `next/image` component mandatory
- WebP/AVIF formats preferred with fallbacks
- Explicit width/height to prevent layout shift
- Responsive srcsets for all viewport sizes
- Lazy loading for below-the-fold images
- `priority` attribute only for hero/above-fold images

### Browser Compatibility

The website MUST function correctly across modern browsers (Chrome, Firefox, Safari, Edge last 2 versions). Graceful degradation MUST occur on older browsers without breaking core functionality. Polyfills MUST be loaded conditionally based on feature detection.

**Rationale**: Professional portfolios must be accessible to potential employers and clients regardless of browser choice. Mobile traffic represents a significant portion of web usage.

## CI/CD & Quality Gates

### Pre-Merge Requirements

Every pull request MUST pass the following checks before merge:

- **Linting**: ESLint with zero warnings
- **Type Checking**: TypeScript strict mode with zero errors
- **Testing**: All tests passing with ≥80% coverage
- **Accessibility**: Axe DevTools checks passing
- **Performance**: Lighthouse CI performance budget checks passing
- **Build**: Production build successful

PRs MUST be blocked if any check fails or performance budgets are exceeded.

**Rationale**: Automated quality gates prevent regressions and maintain code standards. Blocking failed checks enforces discipline and prevents technical debt accumulation.

### Specification Compliance

Every feature specification (in `.specify/specs/`) MUST include a section explaining how the feature meets constitution principles. Measurable acceptance criteria MUST be defined for each principle affected by the feature.

**Rationale**: Explicit constitution compliance checks ensure principles are not ignored during rapid development. Measurable criteria enable objective verification.

### Performance Monitoring

- Vercel Analytics or Web Vitals monitoring MUST be enabled in production
- Real User Monitoring (RUM) data MUST be reviewed weekly
- Performance regressions MUST trigger alerts and investigations
- CrUX (Chrome User Experience Report) data MUST be tracked monthly

## Governance

### Constitutional Authority

This constitution supersedes all other development practices. When conflicts arise between this constitution and other documentation, the constitution takes precedence. Exceptions require explicit justification in pull request descriptions.

### Amendment Procedure

1. **Proposal**: Any team member may propose amendments via GitHub issue with `constitution-amendment` label
2. **Discussion**: Minimum 7-day comment period for stakeholder feedback
3. **Impact Analysis**: Proposer MUST document affected templates, specs, and code
4. **Approval**: Amendments require approval from project maintainer(s)
5. **Implementation**: Approved amendments merged with version bump and Sync Impact Report

### Versioning Policy

Constitution version follows semantic versioning:

- **MAJOR (X.0.0)**: Backward-incompatible governance changes, principle removals, or redefinitions
- **MINOR (0.X.0)**: New principles added or existing principles materially expanded
- **PATCH (0.0.X)**: Clarifications, wording improvements, or non-semantic refinements

### Compliance Review

- **Frequency**: Constitution compliance reviewed monthly
- **Scope**: Validate enforcement mechanisms, identify principle violations, update templates
- **Reporting**: Compliance findings documented in GitHub discussions with remediation plans

### Complexity Justification

Any practice that violates constitution principles MUST be justified in the `Complexity Tracking` section of the implementation plan (`.specify/specs/[###-feature]/plan.md`). Justifications MUST explain:

1. Why the violation is necessary
2. What simpler alternatives were considered
3. Why simpler alternatives were rejected

All PRs and reviews MUST verify constitution compliance. Unjustified complexity MUST be refactored or rejected.

**Version**: 1.0.0 | **Ratified**: 2025-10-27 | **Last Amended**: 2025-10-27
