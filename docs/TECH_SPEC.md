# Grap3 — Technical Specification v2

> Wallet-first dating dApp for Solana Seeker. Clean architecture, minimal PII, crypto-native monetization.

---

## 1. Product summary

| Field | Value |
|-------|-------|
| Platform | Android (Seeker-first), React Native + Expo dev client |
| Identity | Solana wallet pubkey via Mobile Wallet Adapter (Seed Vault) |
| Distribution | Solana dApp Store |
| Payments | USDC / SOL → treasury wallet (on-chain verified) |
| Realtime | WebSockets for matches, typing, presence |

---

## 2. System architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Seeker / Android                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │ Expo RN app  │  │ MWA / Seed   │  │ Local: E2E chat keys   │ │
│  │ Design v2 UI │  │ Vault        │  │ (tweetnacl)            │ │
│  └──────┬───────┘  └──────────────┘  └────────────────────────┘ │
└─────────┼───────────────────────────────────────────────────────┘
          │ REST + WSS
          ▼
┌─────────────────────────────────────────────────────────────────┐
│  Backend (Node.js + Express)                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Auth     │ │ Matching │ │ Chat     │ │ Payments verify  │  │
│  │ JWT+sig  │ │ Elo+GS   │ │ relay    │ │ SOL/USDC on-chain│  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘  │
│       └────────────┴────────────┴────────────────┘              │
│                         Prisma → PostgreSQL                     │
└─────────────────────────────────────────────────────────────────┘
          │ RPC
          ▼
┌─────────────────────────────────────────────────────────────────┐
│  Solana (mainnet / devnet)                                      │
│  Treasury wallet · reputation reads · payment confirmation      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Design system v2

### Principles
- **OLED-first** — true black `#050508`, low visual noise
- **Accent discipline** — Solana gradient only on CTAs, trust badges, premium
- **Typography-led** — no emoji chrome; hierarchy via weight and spacing
- **Floating tab bar** — pill nav, 72px, inset from edges

### Tokens (`app/src/theme/theme.ts`)
- Surfaces: `bg`, `surface`, `surfaceElevated`
- Glass: 4% fill, 8% border
- Brand: `#FF3D8A` grap3, Solana purple/green pair
- Type scale: hero → overline (8 levels)

### Component library (`app/src/components/ui/`)
| Component | Purpose |
|-----------|---------|
| `Screen` | Base layout + ambient glow |
| `GlassCard` | Elevated content panels |
| `GradientButton` | primary / secondary / ghost |
| `TabBar` | Floating bottom navigation |
| `TrustBadge` | On-chain score chip |
| `Chip` | Interest tags |
| `ActionButton` | Swipe pass / super / like |
| `MatchModal` | Real-time match celebration |
| `PremiumSheet` | Tier paywall + Grapes balance |

---

## 4. User flows

### 4.1 Onboarding
1. Three-step value prop carousel
2. `connectWallet()` via MWA
3. Backend nonce → sign → JWT session

### 4.2 Discovery
1. `GET /match/feed` — ranked profiles
2. Swipe gestures → `POST /match/swipe`
3. Mutual like → WebSocket `match:new` → `MatchModal`

### 4.3 Chat
1. Wallet-derived keypair for E2E (client-side encrypt)
2. Server relays ciphertext only
3. Presence + typing via WebSocket

### 4.4 Monetization
1. `GET /pay/prices` — tiers + micro prices
2. Client builds SOL/USDC transfer to treasury
3. `POST /pay/verify` — backend confirms on-chain
4. Unlock feature / credit Grapes

---

## 5. API surface

### Auth
| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/auth/nonce` | `{ publicKey }` | `{ nonce }` |
| POST | `/auth/verify` | `{ publicKey, signature }` | `{ token }` |

### Matching
| Method | Path | Notes |
|--------|------|-------|
| GET | `/match/feed` | Geo + Elo + on-chain weighted |
| POST | `/match/swipe` | `like \| pass \| superlike` |
| GET | `/match/inbox` | Matches + last message |

### Reputation
| Method | Path | Notes |
|--------|------|-------|
| GET | `/reputation/:pubkey` | Wallet age, activity, NFT signal |

### Payments
| Method | Path | Notes |
|--------|------|-------|
| GET | `/pay/prices` | Tiers, Grapes, micro-txns |
| POST | `/pay/verify` | On-chain tx confirmation |

### Realtime (WebSocket)
| Event | Direction | Payload |
|-------|-----------|---------|
| `match:new` | server → client | `{ matchId, user, score }` |
| `message:new` | server → client | `{ matchId, ciphertext }` |
| `presence` | bidirectional | `{ userId, status }` |
| `typing` | bidirectional | `{ matchId, typing }` |

---

## 6. Data model (Prisma)

Core models unchanged; v2 additions planned:

```prisma
// Planned v2 fields
model User {
  berries      Int      @default(0)
  tier         String   @default("free")  // free | plus | gold | seeker
  seekerBonus  Boolean  @default(false)
}

model Payment {
  feature   String   // plusMonthly | goldMonthly | superLike | boost | berries10 | ...
}
```

---

## 7. Matching engine

1. **Elo desirability** — post-swipe rating updates
2. **Compatibility vector** — tags, geo, activity overlap
3. **On-chain trust** — wallet age, tx count, NFT holdings (weighted 15%, never sole factor)
4. **Gale-Shapley** — nightly stable-match batch for high-affinity pairs

See [ALGORITHM.md](./ALGORITHM.md).

---

## 8. Security & privacy

- No passwords; ed25519 wallet signatures only
- JWT short-lived (24h), refresh via re-sign
- Photos: object storage + signed URLs, EXIF stripped
- Chat: E2E encrypted; server stores ciphertext blobs
- Treasury: Squads multisig recommended; never store private keys in `.env`

---

## 9. Deployment targets

| Environment | Backend | Chain | Notes |
|-------------|---------|-------|-------|
| Local | `localhost:3001` | devnet | Emulator + dev wallet |
| Staging | Railway/Fly | devnet | Closed beta |
| Production | HA Postgres + CDN | mainnet | dApp Store release |

---

## 10. v2 changelog

- Redesigned UI: floating tab bar, match modal, premium sheet
- Grapes soft-currency layer ($0.10 unit)
- Tier restructure: Free → Plus ($7.99) → Gold ($14.99) → Seeker Pass
- Cleaner typography, reduced emoji, OLED palette
- Component library extracted to `ui/`

---

*Grap3 Labs · MIT · github.com/9lordisgod/grap3*