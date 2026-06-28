# AI Prompts for Grap3 Builders

Copy-paste prompts for AI coding assistants (Cursor, Claude, ChatGPT, Copilot, Windsurf, etc.).

## How to use

1. **Always start with context** → paste [00-project-context.md](./00-project-context.md) first
2. **Then paste a task prompt** from the list below
3. **Attach or @-mention** the files listed in each prompt
4. **Review output** — AI may hallucinate APIs; cross-check against `TECH_SPEC.md`

## Prompt library

| # | Prompt | Phase | Difficulty |
|---|--------|-------|------------|
| 00 | [Project Context](./00-project-context.md) | — | Paste first, always |
| 01 | [Wire Live API](./01-wire-live-api.md) | MVP | Medium |
| 02 | [WebSocket Realtime](./02-websocket-realtime.md) | MVP | Medium |
| 03 | [E2E Chat Encryption](./03-e2e-encryption.md) | MVP | Hard |
| 04 | [Photo Upload](./04-photo-upload.md) | MVP | Medium |
| 05 | [Devnet Payments](./05-devnet-payments.md) | MVP | Hard |
| 06 | [Trust & Safety](./06-trust-safety.md) | Beta | Medium |
| 07 | [dApp Store Launch](./07-dapp-store-launch.md) | Launch | Medium |
| 08 | [UI Screen Polish](./08-ui-screen-polish.md) | Any | Easy |
| 09 | [Fork & Rebrand](./09-fork-and-rebrand.md) | Launch | Easy |
| 10 | [Matching Algorithm](./10-matching-algorithm.md) | Any | Hard |
| 11 | [Push Notifications](./11-push-notifications.md) | Beta | Medium |
| 12 | [Analytics & Cohorts](./12-analytics-cohorts.md) | Scale | Medium |

## Tips for better results

- **Be specific about files**: `@DiscoveryScreen.tsx @match.js @schema.prisma`
- **Set constraints**: "Use existing `theme.ts` tokens, no new dependencies unless necessary"
- **Ask for tests**: "Include a minimal test or manual verification steps"
- **Iterate**: Start with backend route, then wire frontend, then polish UI
- **One feature per session**: Don't ask for "build the whole app" in one prompt

## Example session (Cursor)

```
[Paste 00-project-context.md]

[Paste 01-wire-live-api.md]

@backend/src/routes/match.js @app/src/screens/DiscoveryScreen.tsx
Implement the discovery feed wiring. Use fetch with JWT from wallet auth.
Match the existing mock PROFILES shape in DiscoveryScreen.
```