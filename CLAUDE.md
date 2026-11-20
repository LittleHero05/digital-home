@AGENTS.md
# CLAUDE.md

Personal website ("digital home"). Read `PRD.md` first; it is the source of truth for scope, pages, and style.

## Stack
Next.js (App Router) + React + TypeScript + Tailwind. `next/font` for fonts, `next/image` for images. Blog posts come from Substack (RSS). Deployed on Vercel.

## Principles
- **Bare bones first.** Build only what `PRD.md` lists. Do not add features from the "Out of scope" list.
- Prefer the simplest solution. Few dependencies, no state libraries, no CMS.
- Server components by default; add `"use client"` only where interaction needs it.
- Content lives in `/content` and `/public`, not in components.

## Design rules
- Notebook / bullet-journal feel: dot-grid paper, two-page spreads with a spine, washi tape, slight card rotation, highlighter underlines.
- Define all colors and fonts once as tokens in the Tailwind theme / CSS variables. Never hardcode hex values in components.
  - paper `#FBFAF6`, dot `#DAD7CC`, yellow `#FFF3B0`, blue `#1D3FAE`, ink `#1B1F3B`
- Pastel yellow is a fill/highlight only, never text.
- Helvetica stack for body and headings; Source Serif 4 for accents (dates, captions, quotes, margin notes).
- Build a reusable `<Spread>` layout component (left page / right page, stacks below 1024px) and use it for every section.
- The index on `/` uses real `<Link>` rows so it works by keyboard and screen reader.
- Keep motion subtle and honor `prefers-reduced-motion`.

## Conventions
- Routes: `/`, `/projects`, `/gallery`, `/blog`, `/about`, `/sudoku`, `/media-kit`.
- Components in `/components`, one per file, PascalCase.
- Alt text is required on every image.
- Placeholder content is fine, but clearly marked, and easy to swap for real content.

## Commands
- `npm run dev`: local dev server
- `npm run build`: production build (must pass before committing)
- `npm run lint`: lint
