# Grap3 — Architecture (v2)

## High level

```
[Seeker / Android]                  [Backend]                 [Solana]
  RN + Expo app   --- REST/WS --->  Express API  --- RPC --->  Mainnet/Devnet
  MWA (Seed Vault)                  Prisma + Postgres          SOL / USDC payments
  Design System v2                  JWT sessions               Treasury wallet
```

## Client architecture

```
app/
├── src/
│   ├── theme/theme.ts          # Design tokens v2
│   ├── components/
│   │   ├── ui/                 # Reusable primitives
│   │   └── SwipeDeck.tsx       # Gesture-driven discovery
│   ├── screens/                # Feature screens
│   ├── navigation/AppShell.tsx # Tab state + match modal
│   └── solana/                 # Wallet + crypto helpers
```

**Navigation model:** single `AppShell` with floating `TabBar` (Discover · Matches · You). Chat and match modal are stack overlays — no heavy router dependency for MVP.

## Auth (wallet-first, passwordless)

1. App requests nonce: `POST /auth/nonce { publicKey }`
2. User signs `Grap3 login\nNonce: ...` via MWA / Seed Vault
3. App submits `POST /auth/verify { publicKey, signature }`
4. Backend verifies ed25519 sig (tweetnacl) → issues JWT

## Matching

- `/match/feed`: ranked discovery (geo + interests + on-chain score + Elo)
- `/match/swipe`: records like/pass/superlike, returns match on mutual like
- WebSocket pushes `match:new` for real-time celebration UI
- On-chain score: wallet age, holdings, activity — trust signal, never sole factor

## Payments & Grapes (revenue)

| Layer | Mechanism |
|-------|-----------|
| Subscriptions | Plus $7.99/mo, Gold $14.99/mo — USDC or SOL to treasury |
| Micro-txns | Super like $0.50, Boost $2.50 |
| Grapes | Soft currency (1 = $0.10); buy packs or earn via quests |
| Seeker Pass | Hardware-holder perks — free boost/mo, trust bonus |

Flow:
1. Client fetches `GET /pay/prices`
2. Builds + sends Solana tx to `TREASURY_WALLET`
3. Submits signature to `POST /pay/verify`
4. Backend confirms on-chain → unlocks tier / credits Grapes

No Apple/Google 30% cut — dApp Store permits native crypto payments.

## Realtime

- WebSocket channel per authenticated user
- Events: `match:new`, `message:new`, `presence`, `typing`
- Chat payloads are E2E ciphertext; server is a relay

## Privacy

- Minimal off-chain PII; wallet pubkey is primary identity
- Photos in object storage with signed URLs
- Optional display name / age / bio — never required for wallet auth

## Docs map

| Doc | Contents |
|-----|----------|
| [TECH_SPEC.md](./TECH_SPEC.md) | Full v2 technical specification |
| [ALGORITHM.md](./ALGORITHM.md) | Matching engine detail |
| [SETUP.md](./SETUP.md) | Local dev setup |
| [DAPP_STORE.md](./DAPP_STORE.md) | Publishing to Seeker |
| [mockup/preview.html](./mockup/preview.html) | Interactive UI preview |