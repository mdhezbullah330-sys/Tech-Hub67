# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Free Fire API Playground (`artifacts/ff-playground`)
- **Type**: React + Vite frontend-only app (no backend needed)
- **Description**: Dark Tech themed single-page API interaction hub for Free Fire tools
- **Features**:
  - Interactive particle background (mouse-responsive)
  - Glassmorphism API cards with Playground/Test Live/Copy URL buttons
  - 6 API endpoints: Player Info, Ban Check, Profile Card, Send Visits, Send Friend Request, Long Bio
  - External API base: `https://wotaxxdev-api.vercel.app/`
  - Features section with glowing cards
  - Footer with Discord & YouTube links
- **Components**: ParticleBackground, Header, ApiCard, FeaturesSection, Footer, Notification

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
