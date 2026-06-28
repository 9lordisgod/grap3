# Good First Issues

Curated tasks for new contributors, ordered by difficulty. Each links to an AI prompt you can use to get started.

## Easy (1–2 days)

| Task | Files | Prompt |
|------|-------|--------|
| Add loading skeletons to Discovery screen | `DiscoveryScreen.tsx` | [UI Polish](./prompts/08-ui-screen-polish.md) |
| Add empty state to Matches screen | `MatchesScreen.tsx` | [UI Polish](./prompts/08-ui-screen-polish.md) |
| Create `app/src/api/client.ts` fetch wrapper | new file | [Wire Live API](./prompts/01-wire-live-api.md) |
| Add seed script for test users | `backend/scripts/seed.js` | [Wire Live API](./prompts/01-wire-live-api.md) |
| Add pull-to-refresh on Matches | `MatchesScreen.tsx` | [UI Polish](./prompts/08-ui-screen-polish.md) |
| Update `.env.example` with all vars documented | `backend/.env.example` | — |
| Add `accessibilityLabel` to ActionButtons | `ActionButton.tsx` | [UI Polish](./prompts/08-ui-screen-polish.md) |

## Medium (3–5 days)

| Task | Files | Prompt |
|------|-------|--------|
| Wire Discovery to live API | `DiscoveryScreen.tsx`, `match.js` | [Wire Live API](./prompts/01-wire-live-api.md) |
| Wire Matches + Chat to live API | `MatchesScreen.tsx`, `ChatScreen.tsx` | [Wire Live API](./prompts/01-wire-live-api.md) |
| Add WebSocket match notifications | `server.js`, `AppShell.tsx` | [WebSocket](./prompts/02-websocket-realtime.md) |
| Photo upload with presigned URLs | `upload.js`, `ProfileScreen.tsx` | [Photo Upload](./prompts/04-photo-upload.md) |
| Report + block flows | `safety.js`, `ReportSheet.tsx` | [Trust & Safety](./prompts/06-trust-safety.md) |
| Push notification setup | `notifications.js`, `App.tsx` | [Push Notifications](./prompts/11-push-notifications.md) |
| Free tier swipe limit (100/day) | `match.js`, `matchingEngine.js` | [Matching Algorithm](./prompts/10-matching-algorithm.md) |

## Hard (1–2 weeks)

| Task | Files | Prompt |
|------|-------|--------|
| E2E chat encryption | `crypto.ts`, `ChatScreen.tsx` | [E2E Encryption](./prompts/03-e2e-encryption.md) |
| Devnet payments end-to-end | `payments.js`, `PremiumSheet.tsx` | [Devnet Payments](./prompts/05-devnet-payments.md) |
| Gale-Shapley batch matching job | `matchingEngine.js` | [Matching Algorithm](./prompts/10-matching-algorithm.md) |
| Analytics + cohort dashboard | `analytics.js`, `track.ts` | [Analytics](./prompts/12-analytics-cohorts.md) |
| dApp Store submission package | `dapp-store-config.json`, screenshots | [dApp Store Launch](./prompts/07-dapp-store-launch.md) |

## How to claim a task

1. Comment on the GitHub issue (or create one referencing this doc)
2. Fork → branch `feat/your-task`
3. Paste [Project Context](./prompts/00-project-context.md) + the task prompt into your AI assistant
4. Submit a PR with description + screenshots/video
5. One maintainer review to merge

## PR tips

- Keep PRs focused — one task per PR
- Include before/after screenshots for UI changes
- Run `npm run lint` in both `app/` and `backend/`
- Add manual test steps in the PR description
- Reference the issue number: `Closes #12`