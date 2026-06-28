# Fork & Launch Your Own Dating App

Grap3 is MIT-licensed — fork it, rebrand it, ship your own wallet-first dating app.

## 1. Fork the repo

```bash
# GitHub UI: click Fork, or:
gh repo fork 9lordisgod/grap3 --clone
cd grap3
```

## 2. Rebrand (30 minutes)

Use the [Fork & Rebrand AI prompt](./prompts/09-fork-and-rebrand.md) or do it manually:

| Step | File | Change |
|------|------|--------|
| App name | `app/app.json` | `expo.name`, `expo.slug` |
| Package ID | `app/app.json` | `expo.android.package` → `dating.yourname.app` |
| Colors | `app/src/theme/theme.ts` | `accent`, `glow`, `grap3` |
| Logo | `app/assets/logo.png` | Your logo, then `bash scripts/sync-brand.sh` |
| Store config | `app/dapp-store-config.json` | Publisher name, email, website, descriptions |
| Copy | `app/src/screens/*.tsx` | Replace "Grap3", "Grapes", taglines |
| README | `README.md` | Your project name, screenshots, links |

## 3. Set up infrastructure

Follow [REQUIREMENTS_CHECKLIST.md](./REQUIREMENTS_CHECKLIST.md). Minimum for launch:

```
backend/.env
├── DATABASE_URL=postgresql://...
├── JWT_SECRET=<openssl rand -hex 32>
├── SOLANA_RPC=https://mainnet.helius-rpc.com/?api-key=...
└── TREASURY_WALLET=<your multisig public address>
```

**Never commit `.env` or keypairs.**

## 4. Build the MVP (4–6 weeks)

Use the [AI prompts](./prompts/README.md) in this order:

1. [Wire Live API](./prompts/01-wire-live-api.md) — connect screens to backend
2. [WebSocket Realtime](./prompts/02-websocket-realtime.md) — instant matches
3. [Photo Upload](./prompts/04-photo-upload.md) — profile photos
4. [E2E Encryption](./prompts/03-e2e-encryption.md) — private chat
5. [Devnet Payments](./prompts/05-devnet-payments.md) — test monetization
6. [Trust & Safety](./prompts/06-trust-safety.md) — report/block before launch

## 5. Deploy backend

Recommended hosts (all have free tiers):

| Host | Pros |
|------|------|
| [Railway](https://railway.app) | Easy Postgres + Node deploy |
| [Render](https://render.com) | Free tier, auto-deploy from git |
| [Fly.io](https://fly.io) | Global edge, good for WS |

```bash
# Example: Railway
railway init
railway add --database postgres
railway variables set JWT_SECRET=... SOLANA_RPC=... TREASURY_WALLET=...
railway up
```

Point the app at your deployed API:
```
# app/src/api/client.ts
const API_BASE = 'https://your-api.railway.app';
```

## 6. Submit to Solana dApp Store

1. Test on a real Seeker device (MWA doesn't work in Expo Go)
2. Follow [DAPP_STORE.md](./DAPP_STORE.md) and [RELEASE.md](./RELEASE.md)
3. Use the [dApp Store Launch prompt](./prompts/07-dapp-store-launch.md)
4. Generate publisher keypair: `solana-keygen new -o publisher-keypair.json`
5. Fund with ~0.1 SOL, submit via Solana Mobile publishing tools

## 7. Launch checklist

- [ ] Privacy policy + ToS live at your domain
- [ ] Support email set up and monitored
- [ ] Age gate (18+) enforced in onboarding
- [ ] Report/block flows working
- [ ] Mainnet payments verified end-to-end
- [ ] No mock/hardcoded data in production build
- [ ] Push notifications for matches (optional but recommended)
- [ ] At least 50 seed users in one city (solve cold-start)

## 8. Grow

See [GTM.md](./GTM.md) for go-to-market ideas:
- City-by-city seeding (concentrate users geographically)
- IRL crypto singles events
- Referral rewards (free boosts for both sides)
- Protocol partnership quests

## License

MIT — keep the LICENSE file. You may add your own copyright line:

```
MIT License

Copyright (c) 2026 Your Name
Copyright (c) 2025 Grap3 Labs

Based on Grap3 (https://github.com/9lordisgod/grap3)
```

## Get help

- [Builder Kit](./BUILDER_KIT.md) — all resources in one place
- [Good First Issues](./GOOD_FIRST_ISSUES.md) — starter tasks
- GitHub Issues — bug reports and feature requests