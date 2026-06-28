# UI / UX Samples

Grap3 follows the **Solana Seeker OS** visual language: true black (`#000000`), hot-pink accent (`#FF3D8A`), minimal typography, no gradient chrome.

## Interactive demo

Open locally or on GitHub:

**[docs/mockup/preview.html](./mockup/preview.html)**

Screens included:

| # | Screen | Highlights |
|---|--------|------------|
| 1 | Onboard | Seed Vault wallet connect |
| 2 | Discover | Swipe deck, on-chain trust score, compatibility % |
| 3 | Match | Mutual-like modal, compatibility score |
| 4 | Matches | Inbox with unread indicators |
| 5 | Chat | E2E encrypted bubbles, Send action |
| 6 | Profile | Trust score, upgrade CTA (USDC/SOL) |

## Logo

Single source: **`app/assets/logo.png`** (grape emoji on black).

Synced everywhere via `./scripts/sync-brand.sh`:

| Asset | Use |
|-------|-----|
| `app/assets/icon.png` | Expo + dApp Store icon (512×512, generated) |
| `docs/assets/brand/logo.png` | Docs, preview, README export |
| `docs/mockup/assets/logo.png` | Legacy path kept in sync |

Presentation: rounded **logo box** (64 px onboard, 128 px README) — border `rgba(255,255,255,0.09)`, pink glow `rgba(255,61,138,0.35)`.

Component: `app/src/components/Grap3Logo.tsx` — pass `boxed` for the app-icon treatment.

## Design tokens

```ts
// app/src/theme/theme.ts
bg:      '#000000'
accent:  '#FF3D8A'   // Grap3 pink — sole brand color
surface: '#111111'
border:  'rgba(255,255,255,0.08)'
```

## Component map

```
app/src/components/ui/
├── Screen.tsx          # Base layout
├── GradientButton.tsx  # Primary (pink) / secondary / ghost
├── TabBar.tsx          # Discover · Matches · Profile
├── SwipeDeck.tsx       # Gesture swipe cards
├── TrustBadge.tsx      # On-chain score chip
├── MatchModal.tsx      # Real-time match overlay
└── PremiumSheet.tsx    # USDC/SOL upgrade sheet
```

## Demo portraits

Demo avatars use curated [Unsplash](https://unsplash.com/license) stock photography (free license, model-released). Production builds use user-uploaded photos via signed URLs.

| Role | Source |
|------|--------|
| You (male) | `photo-1507003211169` — front-facing headshot |
| Nova (female) | `photo-1494790108377` |
| Lumi (female) | `photo-1488426862026` |
| Sol (male) | `photo-1500648767791` |

→ `app/src/constants/avatars.ts`