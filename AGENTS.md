# AGENTS.md — AI Coding Assistant Guide

This file helps AI agents (Cursor, Copilot, Claude, etc.) work effectively in the Grap3 repo.

## Before writing code

1. Read `docs/prompts/00-project-context.md` for full project context
2. Check `docs/TECH_SPEC.md` for API contracts
3. Use tokens from `app/src/theme/theme.ts` — never hardcode colors
4. Reuse components in `app/src/components/ui/`

## Project conventions

| Area | Convention |
|------|------------|
| Backend | ESM (`import/export`), Express routers in `routes/`, services in `services/` |
| Frontend | Functional React components, TypeScript, no class components |
| Styling | `StyleSheet.create` + theme tokens, no inline color strings |
| Auth | JWT from wallet signature, `Authorization: Bearer` header |
| DB | Prisma ORM, migrations via `npm run prisma:migrate` |
| Secrets | Environment variables only, never in source code |

## Do NOT

- Copy code from Tinder, Bumble, Hinge, or other proprietary apps
- Commit `.env`, keypairs, API keys, or seed phrases
- Add heavy state management libraries (Redux, MobX) for MVP
- Store private keys or message plaintext on the server
- Change the MIT license

## Key commands

```bash
# Backend
cd backend && npm install && npm run dev

# App (requires Android device/emulator)
cd app && npm install --legacy-peer-deps && npm run android

# Prisma
cd backend && npm run prisma:generate && npm run prisma:migrate
```

## Task prompts

See `docs/prompts/` for copy-paste prompts organized by feature:
- `01-wire-live-api.md` — highest priority
- `02-websocket-realtime.md`
- `03-e2e-encryption.md`
- `04-photo-upload.md`
- `05-devnet-payments.md`

## Testing

- MWA wallet features require real Android (not Expo Go, not iOS sim)
- Backend: test with `curl` against `http://localhost:4000`
- Seed test users: `node backend/scripts/seed.js` (create if missing)