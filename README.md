# CareFlow — Patient Reservation Frontend Lab

CareFlow is an **independent candidate frontend demonstrator** created to show frontend engineering practices with Next.js, React and TypeScript.

> **Truthfulness boundary:** CareFlow uses synthetic data only. It is not an official product of Počítače a Programovanie and does not represent or reproduce the company's internal systems, architecture, APIs, source code, customers or data.

## Current implementation state

**Pass 0 — Repository & Toolchain Foundation only.**

No search, provider, availability, booking or reservation product features are implemented in this pass. Those belong to later passes and require explicit approval before implementation.

## Stack foundation

- Next.js App Router
- React
- TypeScript (`strict`)
- Tailwind CSS
- ESLint
- Vitest + React Testing Library
- Playwright

## Local setup

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.

## Pass 0 quality gate

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

## Security / privacy baseline

- No production credentials or API keys belong in this repository.
- No real patient or healthcare data may be used.
- `.env*` is ignored; `.env.example` contains placeholders only.
- Future demo data must remain synthetic.

## Planned architecture boundary

Later passes will introduce domain contracts and a typed `CareFlowApi` boundary. React UI must not import fixture data directly.

## Pass 0 stop condition

Do not begin Pass 1 until the complete Pass 0 gate is green and the pass is explicitly approved.
