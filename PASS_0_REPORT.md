# CareFlow — Pass 0 Review Gate

## Scope

Pass 0 implements the repository and toolchain foundation only. No CareFlow product features from Pass 1+ are implemented.

## Implemented

- Next.js App Router project structure
- React + TypeScript strict configuration
- Tailwind CSS/PostCSS foundation
- ESLint configuration
- Vitest + React Testing Library setup
- Playwright setup and smoke specification
- Minimal Pass 0 landing page
- UI + README truthfulness disclaimer
- `.gitignore` and `.env.example`
- Git repository initialized with a Pass 0 foundation commit

## Gate status

**BLOCKED_PREREQUISITE — not GREEN.**

The execution runtime cannot resolve `registry.npmjs.org`, and the required package metadata is not present in the local npm cache. Therefore a dependency lockfile cannot be generated and `npm ci` cannot complete in this runtime.

Observed prerequisite evidence:

```text
registry.npmjs.org DNS: unavailable
npm offline metadata: ENOTCACHED
npm ci: blocked because package-lock.json cannot be generated without package metadata
```

Static checks that do not require installed project dependencies passed:

- `package.json` JSON parse: PASS
- `.mjs` syntax parse: PASS
- TS/TSX parse-only validation using the runtime's global TypeScript: PASS
- README truthfulness boundary presence: PASS
- UI truthfulness boundary presence: PASS

## Required network-enabled final gate

Run from the repository root in a runtime with npm registry access:

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

After the first successful `npm install`, commit the generated `package-lock.json`. Then re-run from a clean checkout with:

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Pass 1 must not begin until this gate is GREEN.
