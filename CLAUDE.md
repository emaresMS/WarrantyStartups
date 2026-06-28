# Warranty Startups — Claude Code Guide

## Project Overview

Full stack warranty management platform. This file is the source of truth for how Claude should behave in this codebase.

---

## Tech Stack

> Fill in as decisions are made.

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | TBD                 |
| Backend     | TBD                 |
| Database    | TBD                 |
| Auth        | TBD                 |
| Hosting     | TBD                 |
| CI/CD       | TBD                 |

---

## Repository Structure

```
/
├── client/          # Frontend application
├── server/          # Backend API
├── shared/          # Shared types, constants, utilities (used by both sides)
├── infra/           # Infrastructure-as-code (Terraform, Docker, etc.)
├── scripts/         # Developer utility scripts
└── docs/            # Architecture decisions, diagrams, runbooks
```

> Adjust paths as the project takes shape.

---

## Development Setup

```bash
# Install dependencies (root orchestrates both sides)
npm install

# Start full stack dev environment
npm run dev

# Run all tests
npm test

# Lint + typecheck
npm run lint
npm run typecheck
```

> Update these commands as the project is configured.

---

## Phase Development Workflow

When working on a development phase from the project plan, use an orchestrator/worker agent split:

- The **main (orchestrator) agent runs on Opus 4.8**. It owns the phase: decomposing it into scoped coding tasks, delegating them to subagents, reviewing and integrating their output, running typecheck/lint/tests, and verifying the phase against this guide. The orchestrator does **not** write feature code directly.
- **Coding is delegated to subagents running Sonnet 4.6.** Each subagent implements one scoped task and returns its changes.
- The main agent integrates subagent work, resolves conflicts, and confirms the phase's verification steps pass before marking it complete.

---

## Architecture Principles

- **Separation of concerns**: client, server, and shared directories are distinct. Never import server-only code in the client.
- **Typed contracts**: define shared API request/response types in `/shared`. Both sides import from there — never duplicate types.
- **Thin controllers, fat services**: route handlers validate input and delegate; business logic lives in service classes/functions, not in routes or components.
- **Fail at the boundary**: validate all external input (HTTP bodies, query params, env vars) at system boundaries. Trust internal code after that point.
- **No logic in migrations**: migrations run once and are immutable. Keep them additive and non-destructive; never encode business logic in SQL.

---

## Code Style

- **No unnecessary comments**: only comment when the *why* is non-obvious (a hidden constraint, a workaround, a subtle invariant). Never describe *what* the code does.
- **No magic strings/numbers**: put constants in named variables or enums in `/shared/constants`.
- **Small, single-purpose functions**: if a function needs a comment to describe what it does, it should be split up.
- **Consistent naming**: `camelCase` for variables and functions, `PascalCase` for types/classes/components, `SCREAMING_SNAKE_CASE` for top-level constants.
- **Async/await over callbacks**: always use async/await. Never mix promise chains with callbacks.
- **Explicit over implicit**: prefer explicit return types on public API functions and exported components.

---

## API Design

- REST by default. Use GraphQL only if specifically decided.
- All routes versioned under `/api/v1/...`
- HTTP status codes must be semantically correct (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Server Error).
- Error responses always return `{ error: string, details?: unknown }`.
- Paginated list endpoints return `{ data: T[], total: number, page: number, pageSize: number }`.
- Never expose internal database IDs in public API responses — use UUIDs.

---

## Database

- All schema changes via migrations — never modify the database by hand.
- Migrations must be reversible (`up` and `down`).
- Index foreign keys and any column that appears in a `WHERE` clause in production queries.
- No raw SQL outside of the data access layer. Use the ORM/query builder everywhere else.
- Soft deletes (`deleted_at`) for any entity the user would expect to be recoverable.
- Timestamps on every table: `created_at`, `updated_at`, `deleted_at`.

---

## Authentication & Authorization

- Auth logic lives in middleware — never duplicated in individual route handlers.
- Never store plaintext passwords. Use bcrypt (cost factor ≥ 12) or a dedicated auth provider.
- JWTs: short-lived access tokens (15 min), longer-lived refresh tokens (7 days) stored in httpOnly cookies.
- Every protected route must explicitly declare which roles can access it.
- Authorization checks happen on the server — never trust client-side role checks for actual access control.

---

## Security

- Validate and sanitize all user input server-side.
- Parameterize all database queries — never concatenate user input into SQL.
- Set security headers (CORS, CSP, HSTS, X-Frame-Options) via middleware on every response.
- Secrets in environment variables only — never in code or git.
- Dependency audit: run `npm audit` in CI and fail the build on high/critical vulnerabilities.
- Rate-limit all unauthenticated endpoints.

---

## Testing

- **Unit tests**: pure functions and service logic — no network or database.
- **Integration tests**: test the full request/response cycle against a real test database. No mocking the database.
- **E2E tests**: critical user journeys only (login, core domain flows).
- Test files live next to the code they test (`foo.ts` → `foo.test.ts`), except E2E which lives in `/tests/e2e/`.
- Minimum coverage targets: 80% for services, 60% overall. Coverage is a floor, not a goal.
- Tests must be deterministic. No `Date.now()`, `Math.random()`, or network calls in unit tests without mocking.

---

## Environment Variables

- `.env.example` is always kept up to date and committed.
- `.env`, `.env.local`, `.env.*.local` are gitignored — never commit real secrets.
- All required env vars are validated at application startup (fail fast if missing).
- Use a single source-of-truth config module that reads and exports env vars — no `process.env` scattered through business logic.

---

## Git Workflow

- Branch from `main`. Branch names: `feature/short-description`, `fix/short-description`, `chore/short-description`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.
- PRs require passing CI and at least one review before merging.
- Squash-merge feature branches into `main` to keep history linear.
- Never force-push to `main`.

---

## What Claude Should Always Do

- Read existing patterns before adding new ones — prefer extending what exists over introducing new abstractions.
- Check `/shared` for existing types before defining new ones.
- Run `npm run typecheck` and `npm run lint` mentally before declaring a task complete.
- Follow the existing file naming conventions in whichever directory you're working in.
- Add the happy path and at least one error case in new tests.

## What Claude Should Never Do

- Never commit `.env` files or hardcode secrets.
- Never bypass authentication middleware by adding auth logic inside a route handler.
- Never use `any` type in TypeScript without a code comment explaining why it is unavoidable.
- Never delete migrations — only add new ones.
- Never introduce a new dependency without checking if the need can be met by an existing one.
- Never run destructive database operations (`DROP TABLE`, `DELETE` without `WHERE`) without explicit user confirmation.
- Never push directly to `main`.
