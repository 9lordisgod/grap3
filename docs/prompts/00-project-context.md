# Grap3 — Project Context (paste this first)

You are helping build **Grap3**, an open-source MIT-licensed dating dApp for Solana Seeker (Android). Wallet-first identity, on-chain trust scoring, encrypted chat, USDC/SOL payments.

## Stack

| Layer | Tech |
|-------|------|
| Mobile | React Native, Expo dev client, TypeScript |
| Wallet | Solana Mobile Wallet Adapter (MWA), Seed Vault on Seeker |
| Backend | Node.js, Express, Prisma, PostgreSQL |
| Crypto | tweetnacl (ed25519 signatures, NaCl box for E2E chat) |
| Chain | Solana devnet/mainnet — treasury wallet, on-chain reputation reads |
| Realtime | WebSockets (planned — not yet wired) |

## Repo structure

```
app/src/
  theme/theme.ts          — colors, spacing, typography (USE THESE)
  components/ui/          — Screen, GlassCard, GradientButton, TabBar, TrustBadge, etc.
  screens/                — Onboarding, Discovery, Matches, Chat, Profile
  solana/wallet.ts        — MWA connect/reauthorize
  solana/crypto.ts        — keypair gen, encrypt/decrypt messages
  navigation/AppShell.tsx — tab state, match modal overlay

backend/src/
  routes/auth.js          — POST /auth/nonce, /auth/verify → JWT
  routes/match.js         — feed, swipe, matches
  routes/payments.js      — verify on-chain SOL/USDC payments
  routes/reputation.js    — on-chain trust score from wallet history
  services/matchingEngine.js — Elo + compatibility ranking
  services/reputation.js  — Solana RPC reads (balance, NFTs, tx history)

backend/prisma/schema.prisma — User, Swipe, Match, Message, Payment models
```

## Design system (v2)

- Background: `#000000` (true black OLED)
- Accent: `#14F195` (Solana green)
- Glow: `#FF3D8A` (grape pink — sparingly)
- Typography-led hierarchy, no emoji chrome
- Floating pill tab bar: Discover · Matches · You
- Glass cards: 4% white fill, 8% border
- Import from `app/src/theme/theme.ts` — never hardcode colors

## Auth flow

1. `POST /auth/nonce { publicKey }` → `{ nonce }`
2. User signs `"Grap3 login\nNonce: {nonce}"` via MWA
3. `POST /auth/verify { publicKey, signature }` → `{ token }` (JWT, 7d)
4. All API calls: `Authorization: Bearer {token}`

## Current state

- ✅ UI screens with mock data (Discovery uses hardcoded PROFILES array)
- ✅ Wallet auth routes exist
- ✅ Matching engine + reputation services exist
- ✅ Prisma schema defined
- ❌ Screens NOT wired to live API yet
- ❌ WebSockets not implemented
- ❌ Photo upload not implemented
- ❌ E2E encryption scaffolded but not integrated in chat
- ❌ Payments route exists but app doesn't call it yet

## Rules

1. **MIT original code only** — never paste proprietary code from Tinder/Bumble/Hinge
2. **No secrets in code** — env vars for JWT_SECRET, RPC keys, treasury address
3. **Use existing components** — extend `components/ui/`, don't create parallel design systems
4. **MWA requires real Android** — no iOS simulator, no Expo Go for wallet features
5. **Match existing patterns** — ESM imports in backend, functional React components in app
6. **Verify payments on-chain** — never trust client-reported amounts; check signature + recipient + amount server-side

## Key docs (read if unsure)

- `docs/TECH_SPEC.md` — API endpoints, data models, flows
- `docs/ARCHITECTURE.md` — system design
- `docs/ALGORITHM.md` — matching logic
- `docs/ROADMAP.md` — what's next