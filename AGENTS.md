# AGENTS.md

Guidelines for AI agents (Claude, Codex, Cursor, …) and humans working on this project.

## Project

Personal website **paulinestach.de**, built with **Nuxt 4** (Vue 3, TypeScript).

## Stack & tooling

| Purpose         | Tool                               | Notes                                     |
| --------------- | ---------------------------------- | ----------------------------------------- |
| Framework       | Nuxt 4                             | Source lives in `app/` (Nuxt 4 structure) |
| Package manager | **pnpm** (via `packageManager`)    | Never use `npm` or `yarn`                 |
| Linting         | **oxlint**                         | Config: `.oxlintrc.json`                  |
| Formatting      | **oxfmt**                          | Config: `.oxfmtrc.json`                   |
| Styling         | Native CSS + CSS custom properties | Token-based design system, no Tailwind    |

**Keep TypeScript on `^6` for now:** `vue-tsc` (used by `nuxt typecheck`) does not support TypeScript 7 yet. Only upgrade once `vue-tsc` officially supports TS 7.

**Do not add:** ESLint, Prettier, Tailwind, UnoCSS, CSS-in-JS or UI libraries – unless explicitly requested.

## Commands

```bash
pnpm install        # install dependencies (runs nuxt prepare)
pnpm dev            # dev server at http://localhost:3000
pnpm build          # production build
pnpm generate       # generate a static site
pnpm preview        # preview the build locally

pnpm lint           # oxlint
pnpm lint:fix       # oxlint with auto-fix
pnpm format         # oxfmt – formats all files
pnpm format:check   # oxfmt – check only
pnpm typecheck      # nuxt typecheck (vue-tsc)
pnpm check          # format:check + lint + typecheck
```

Add dependencies with `pnpm add <package>` or `pnpm add -D <package>`.

**After every change**, run `pnpm format` and `pnpm check` before considering a task done.

## Git & commits

### Atomic commits (always)

- One commit = **one logical change**. A commit should be describable in a single sentence without "and".
- Never mix unrelated changes (e.g. a feature plus a refactor, or a fix plus a dependency bump) – split them into separate commits.
- Every commit must leave the project in a working state: it formats, lints, typechecks and builds on its own.
- Stage selectively (`git add <files>` / `git add -p`) instead of `git add .` when the working tree contains more than one change.
- Commit messages follow **Conventional Commits** (see below), in English and imperative mood, with a body explaining _why_ when it is not obvious.

### Conventional Commits (always)

Format: `<type>(<optional scope>): <subject>`

- Subject in lowercase imperative mood, no trailing period, max. ~72 characters (e.g. `feat: add article quiz to material page`).
- Allowed types:

  | Type       | Use for                                                      |
  | ---------- | ------------------------------------------------------------ |
  | `feat`     | new user-facing functionality or content                     |
  | `fix`      | bug fixes                                                    |
  | `style`    | visual/CSS changes without new functionality (design tokens) |
  | `refactor` | code changes that neither fix a bug nor add a feature        |
  | `perf`     | performance improvements                                     |
  | `docs`     | documentation only (README, AGENTS.md, comments)             |
  | `test`     | adding or changing tests                                     |
  | `build`    | build system, dependencies, `nuxt.config.ts`                 |
  | `ci`       | CI configuration                                             |
  | `chore`    | maintenance that fits nowhere else (tooling config, cleanup) |

- Optional scope names the affected area, e.g. `feat(header): add mobile menu`, `style(tokens): add article colours`.
- Breaking changes: append `!` after the type/scope (`feat!: …`) and explain in a `BREAKING CHANGE:` footer.

### Before every commit (mandatory)

Run, in this order, and only commit when all pass:

```bash
pnpm format      # oxfmt – apply formatting
pnpm lint        # oxlint
pnpm typecheck   # nuxt typecheck
```

If formatting changed files, review and stage those changes as part of the same commit. Never commit with failing lint or type errors, and never skip the checks (no `--no-verify`).

## Code style

- Formatting is decided by oxfmt alone: no semicolons, single quotes, print width 100.
- Vue SFCs use `<script setup lang="ts">`, in the order `<script>` → `<template>` → `<style scoped>`.
- Use Nuxt auto-imports (`ref`, `computed`, `useSeoMeta`, components from `app/components/`); do not import these manually.
- Components in PascalCase (`app/components/BaseButton.vue`), pages in kebab-case (`app/pages/about-me.vue`).
- Code, comments, commit messages and docs are written in **English**.- Site content is **German** (`<html lang="de">`).

## Project structure

```
app/
  app.vue                 # root component
  layouts/default.vue     # skip link, header, footer around every page
  pages/                  # file-based routing
  components/             # auto-imported components
  assets/css/
    main.css              # entry point, defines cascade layers
    tokens/
      primitives.css      # raw values  (--ref-*)
      semantic.css        # public tokens + theming
    base/
      reset.css
      global.css          # element styles
public/                   # static files
nuxt.config.ts
```

## Design system

The design system is built on **design tokens as CSS custom properties**, in two tiers.

### 1. Primitive tokens – `tokens/primitives.css`

- Prefix `--ref-*` (e.g. `--ref-neutral-900`, `--ref-space-4`, `--ref-font-size-lg`).
- Raw values without meaning: color palettes (OKLCH), spacing scale (4px grid), font sizes, radii, shadows, durations.
- **Never used directly in components.**

### 2. Semantic tokens – `tokens/semantic.css`

- The public API, named by **purpose**, not by value.
- Always reference primitives: `--color-text: var(--ref-neutral-900);`
- Groups:
  - Color: `--color-bg`, `--color-bg-subtle`, `--color-surface`, `--color-surface-raised`, `--color-text`, `--color-text-muted`, `--color-text-on-accent`, `--color-border`, `--color-border-strong`, `--color-accent`, `--color-accent-hover`, `--color-accent-subtle`, `--color-focus-ring`, `--color-danger`, `--color-success`, `--color-warning`
  - Spacing: `--space-3xs` … `--space-3xl`
  - Typography: `--font-body`, `--font-heading`, `--font-code`, `--text-xs` … `--text-xl`, `--text-h1` … `--text-h3`, `--weight-*`, `--leading-*`
  - Shape: `--radius-control`, `--radius-card`, `--radius-pill`, `--shadow-card`, `--shadow-overlay`
  - Motion: `--transition-fast`, `--transition-base`
  - Layout: `--layout-content`, `--layout-wide`, `--layout-gutter`

### Theming

- Light is the default, dark follows `prefers-color-scheme`.
- Force a theme with `<html data-theme="light">` or `data-theme="dark"`.
- A theme only overrides **semantic tokens** – components stay unchanged.

### Cascade layers

`main.css` defines: `@layer reset, tokens, base, components, utilities;`
Component styles in `<style scoped>` are unlayered and therefore win over base styles.

### Rules (mandatory)

1. Components and pages use **semantic tokens only** – no `--ref-*` variables, no hard-coded colors, pixel spacing, font sizes, radii or shadows.
   - ✅ `padding: var(--space-md); color: var(--color-text-muted);`
   - ❌ `padding: 24px; color: #666;` / ❌ `color: var(--ref-neutral-600);`
2. If no suitable token exists: first add a **semantic token** to `semantic.css` (adding a primitive to `primitives.css` first if needed), then use it. For new color tokens, also set the dark theme values in both dark blocks.
3. Allowed exceptions without a token: `0`, `100%`, `1px` borders, `auto`, layout values such as `fr` / grid templates.
4. Styles stay in the component's `<style scoped>`; global rules only in `base/global.css`.
5. Define colors in OKLCH. Check contrast (WCAG AA) for new color combinations.
6. Never remove focus styles; `prefers-reduced-motion` is respected in the reset.
