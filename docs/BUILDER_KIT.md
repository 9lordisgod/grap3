# Builder Kit

Everything you need to fork Grap3, ship features, and launch your own wallet-first dating app.

## Quick links

| Resource | What it's for |
|----------|---------------|
| [AI Prompts](./prompts/README.md) | Copy-paste prompts for Cursor, Claude, ChatGPT, Copilot |
| [Fork & Launch Guide](./FORK_AND_LAUNCH.md) | Rebrand, deploy, and go live with your own variant |
| [Good First Issues](./GOOD_FIRST_ISSUES.md) | Curated starter tasks ranked by difficulty |
| [Setup](./SETUP.md) | Local dev environment |
| [Requirements Checklist](./REQUIREMENTS_CHECKLIST.md) | Secrets & infra you need for production |
| [Roadmap](./ROADMAP.md) | What's built vs. what's next |
| [Contributing](./CONTRIBUTING.md) | PR workflow & ground rules |

## How to use the AI prompts

1. Open [prompts/00-project-context.md](./prompts/00-project-context.md) and paste it first — it gives the AI full repo context.
2. Pick a task prompt from [prompts/](./prompts/README.md) (e.g. wire live API, WebSockets, payments).
3. Point the AI at the specific files listed in the prompt.
4. Review the diff. Never commit secrets or proprietary code from other apps.

## Repo map (for AI & humans)

```
grap3/
├── app/                        # React Native + Expo (Seeker / Android)
│   ├── src/
│   │   ├── theme/theme.ts      # Design tokens — always use these
│   │   ├── components/ui/      # Reusable UI primitives
│   │   ├── screens/            # Feature screens (mostly mock data today)
│   │   ├── solana/             # MWA wallet + tweetnacl crypto
│   │   └── navigation/         # AppShell + tab state
│   └── dapp-store-config.json  # Solana dApp Store metadata
├── backend/
│   ├── prisma/schema.prisma    # User, Swipe, Match, Message, Payment
│   └── src/
│       ├── routes/             # auth, match, payments, reputation
│       └── services/           # matchingEngine, reputation
└── docs/                       # Specs, prompts, launch guides
```

## Design constraints (non-negotiable)

- **OLED-first UI** — true black `#000000`, accent `#14F195`, glow `#FF3D8A`
- **Wallet-only auth** — no email/password; MWA + ed25519 signatures
- **Use existing components** — `Screen`, `GlassCard`, `GradientButton`, `TabBar`, etc.
- **MIT license** — original code only; patterns from other apps, never copied code
- **No secrets in git** — `.env`, keypairs, RPC keys stay local

## Suggested build order

```
Week 1–2   Wire screens → live API (feed, swipe, matches)
Week 2–3   WebSockets (match notifications, typing, presence)
Week 3–4   Photo upload + E2E chat encryption
Week 4–5   Devnet payments (Plus, Grapes, super like)
Week 5–6   Trust & safety + staging deploy
Week 7+    dApp Store submission (see DAPP_STORE.md)
```

## Get help

- Read the [Technical Spec](./TECH_SPEC.md) and [Architecture](./ARCHITECTURE.md) before large changes
- File issues using the GitHub templates (bug report / feature request)
- Security issues → private GitHub advisory, not a public issue

---

*Built to be forked. Ship something great.*

**Creator:** [@CHxmrBrother on X](https://x.com/CHxmrBrother)