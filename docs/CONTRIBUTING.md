# Contributing to Grap3

We love crypto-native builders. 🍇

## New here? Start here

1. [Builder Kit](./BUILDER_KIT.md) — overview of all resources
2. [Setup](./SETUP.md) — get the app running locally
3. [Good First Issues](./GOOD_FIRST_ISSUES.md) — pick a starter task
4. [AI Prompts](./prompts/README.md) — copy-paste into Cursor/Claude/ChatGPT

## Ground rules

- This repo is original MIT-licensed code. Do NOT paste proprietary code from other dating apps (Tinder/Bumble/etc.) — patterns/ideas only.
- Never commit secrets, keypairs, or `.env` files.
- Use design tokens from `app/src/theme/theme.ts`.
- Reuse components in `app/src/components/ui/`.

## Workflow

1. Fork + branch: `feat/your-feature`
2. Paste [Project Context](./prompts/00-project-context.md) + task prompt into your AI assistant
3. Keep PRs focused and described (template auto-fills)
4. Run lint before pushing
5. Include screenshots for UI changes
6. One approving review from a maintainer to merge

## Areas we need help

| Priority | Area | Prompt |
|----------|------|--------|
| 🔴 High | Wire screens to live API | [01-wire-live-api](./prompts/01-wire-live-api.md) |
| 🔴 High | WebSocket realtime | [02-websocket-realtime](./prompts/02-websocket-realtime.md) |
| 🟡 Medium | Photo upload | [04-photo-upload](./prompts/04-photo-upload.md) |
| 🟡 Medium | E2E chat encryption | [03-e2e-encryption](./prompts/03-e2e-encryption.md) |
| 🟡 Medium | Devnet payments | [05-devnet-payments](./prompts/05-devnet-payments.md) |
| 🟡 Medium | Trust & safety | [06-trust-safety](./prompts/06-trust-safety.md) |
| 🟢 Nice | UI polish | [08-ui-screen-polish](./prompts/08-ui-screen-polish.md) |
| 🟢 Nice | Push notifications | [11-push-notifications](./prompts/11-push-notifications.md) |
| 🟢 Nice | Analytics dashboard | [12-analytics-cohorts](./prompts/12-analytics-cohorts.md) |

## Using AI assistants

Grap3 is designed to be built with AI coding tools. Every task has a ready-made prompt in `docs/prompts/`:

```
1. Paste docs/prompts/00-project-context.md     ← always first
2. Paste the task prompt (e.g. 01-wire-live-api.md)
3. @-mention the files listed in the prompt
4. Review the diff, test on Android, submit PR
```

See [AGENTS.md](../AGENTS.md) for conventions AI tools should follow.

## Forking

Want your own app, not just a contribution? See [Fork & Launch](./FORK_AND_LAUNCH.md).