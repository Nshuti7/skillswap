# SkillSwap

Peer-to-peer skill exchange. Users teach a skill they know in exchange for
learning one they want. Pilot is IUEA students and staff.

## Layout

PNPM monorepo.

```
apps/
  api/       Express + Prisma REST API
  web/       React + Vite SPA
  mobile/    Expo / React Native app
packages/
  shared/    Types and enums shared by all three
```

## Requirements

- Node 20+
- PNPM 10+
- Docker (for Postgres and Redis)

## Setup

```bash
pnpm install
pnpm infra:up                                    # Postgres + Redis
cp apps/api/.env.example apps/api/.env           # then set SESSION_SECRET
pnpm --filter @skillswap/api db:generate
pnpm --filter @skillswap/api db:migrate          # name it: init
```

On Windows PowerShell, use `Copy-Item apps/api/.env.example apps/api/.env`.

## Running

```bash
pnpm dev:api                    # API on http://localhost:4000
pnpm --filter @skillswap/web dev    # web on http://localhost:5173
pnpm --filter @skillswap/mobile start   # Expo dev server
```

- API docs: http://localhost:4000/api/docs
- Database browser: `pnpm --filter @skillswap/api db:studio`

## Checks

```bash
pnpm typecheck     # all workspaces
pnpm build         # api + web
```

Both run in CI on every pull request.

## API structure

`apps/api` is a modular monolith. Each module under `src/modules/` has four files:

| File | Job |
| --- | --- |
| `*.schemas.ts` | zod schemas for request bodies |
| `*.service.ts` | business logic and database access, no `req`/`res` |
| `*.controller.ts` | reads the request, calls the service, sends the response |
| `*.routes.ts` | maps URLs to middleware and controllers |

`identity/` is the reference implementation. `matching/`, `communication/` and
`sessions/` are stubs returning 501.

Modules call each other's services, never each other's controllers.

## Monorepo notes

`.npmrc` sets `node-linker=hoisted`. React Native's Metro bundler cannot resolve
react-native's transitive dependencies through PNPM's default isolated layout,
so mobile builds fail without it. The cost is that PNPM no longer catches
undeclared dependencies, so list every import in the right `package.json`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). In short: branch off `dev`, keep commits
small, open a pull request into `dev`, and request review from Brice. Nothing
merges to `main` except releases.
