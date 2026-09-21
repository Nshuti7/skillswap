# Contributing

Read this before your first pull request.

## Branching

Never commit or merge to `main`. It is the release branch, and only Brice
merges into it, from `dev`.

```
main      release only
dev       integration branch, all pull requests target this
feature/  your working branch, branched from dev
```

Name branches after the YouTrack issue:

```
feature/SS-12-swap-request-endpoints
fix/SS-31-session-cookie-not-set
docs/SS-40-openapi-matching
design/SS-22-profile-screens
```

Prefixes: `feature/`, `fix/`, `docs/`, `design/`, `test/`, `chore/`.

Starting work:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/SS-12-swap-request-endpoints
```

Pull from `dev` regularly. The longer a branch runs behind, the worse the merge.

## Commits

Keep commits small. One commit, one logical change. A 800-line commit cannot be
reviewed properly, only approved.

Aim to keep a pull request under about 400 changed lines. Generated files
(`pnpm-lock.yaml`, Prisma migrations) do not count, but commit them separately
from hand-written code.

If a task will not fit in one small pull request, split it into several that
each merge on their own. Ask Brice how to slice it if it is not obvious.

Message format:

```
<type>(<scope>): <what changed>

SS-12
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `style`.

```
feat(matching): add POST /api/v1/matches/requests
fix(identity): regenerate session on login
test(sessions): cover swap session state transitions
```

Not `update`, `fixed stuff`, or `final version v2`.

## Pull requests

Every pull request needs a real title and description. One with an empty
description gets closed without review.

The title follows the commit format and should say what changed without the
reviewer opening the diff.

Description template:

```markdown
## What
What this pull request does.

## Why
The problem it solves. YouTrack issue: SS-12

## How
The approach, and anything non-obvious you decided.

## Testing
How you verified it. Commands, endpoints, screenshots for UI.

## Notes for the reviewer
Anything you are unsure about.
```

Assign Brice as reviewer on every pull request. Nothing merges without his
approval, including work from the person who owns that module.

Before opening one:

- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` passes
- [ ] Endpoint changed? `apps/api/src/docs/openapi.ts` updated in this pull request
- [ ] Prisma enum changed? mirrored in `packages/shared/src/index.ts`
- [ ] No secrets, `.env` files or credentials in the diff
- [ ] No commented-out code or leftover `console.log`
- [ ] Branch is up to date with `dev`

After review, push fixes as new commits on the same branch. Do not force-push
while a review is open; it loses the reviewer's place in the diff. Reply to each
comment so Brice knows it was handled.

## Code conventions

Use `pnpm` for everything. Never `npm`, `npx` or `yarn`: this is a PNPM
workspace, and a stray `npm install` creates a second lockfile and a duplicate
React. In `apps/mobile`, add packages with `pnpm exec expo install <package>`
so Expo picks SDK-compatible versions.

Backend modules follow the structure of `apps/api/src/modules/identity/`:

| File | Job |
| --- | --- |
| `*.schemas.ts` | zod schemas for request bodies |
| `*.service.ts` | business logic and database access, no `req`/`res` |
| `*.controller.ts` | reads the request, calls the service, sends the response |
| `*.routes.ts` | maps URLs to middleware and controllers |

- Modules call each other's services, never each other's controllers.
- Throw `HttpError.*` for expected errors. The global handler formats every
  error as `{ error: { message, details? } }`.
- Wrap async handlers in `asyncHandler`. Express 4 does not catch async errors,
  and an uncaught one hangs the request.
- Routes live under `/api/v1`.

Web and mobile both build against `/api/docs`. If the spec and the code
disagree, two other people are building the wrong thing, which is why the
OpenAPI update ships in the same pull request as the endpoint.

The database model is `SwapSession`, not `Session`, so it stays distinct from
the login session in `req.session`. In the web app, only `VITE_*` variables
reach the browser, so no secrets go there.

## Getting help

Stuck for more than about 30 minutes? Say so, on the YouTrack issue or to the
team. Each pair has a module owner, who is the first person to ask. Brice is the
fallback for anything architectural and has the final say on the API contract.
