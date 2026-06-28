# What You Need to Run Grap3

A checklist of everything required to run Grap3 (dev → production).
Paste values into the relevant `.env` files. Items are ordered by priority.
⚠️ = secret — never commit to git.

---

## 1. Minimum to run locally (dev)

These get the app + backend running on your machine or emulator.

| # | Item | Where it goes | Notes |
|---|------|---------------|-------|
| 1 | **Postgres database URL** | `backend/.env` → `DATABASE_URL` | e.g. local `postgresql://user:pass@localhost:5432/grap3`, or a free hosted DB (Supabase/Neon/Railway) |
| 2 | **JWT secret** ⚠️ | `backend/.env` → `JWT_SECRET` | Any long random string. Generate: `openssl rand -hex 32` |
| 3 | **Solana RPC URL** | `backend/.env` → `SOLANA_RPC` | Devnet works free: `https://api.devnet.solana.com` |
| 4 | **Android device or emulator** | — | Real Seeker or Android Studio emulator (MWA wallet needs real Android) |

That's it for a working dev demo. Everything below unlocks real payments, production, and dApp Store launch.

---

## 2. Solana / Web3 essentials (for real payments + reputation)

| # | Item | Where it goes | How to get it |
|---|------|---------------|---------------|
| 5 | **Production RPC API key** ⚠️ | `backend/.env` → `SOLANA_RPC` | Helius / Triton / QuickNode. Free tiers exist; needed because public RPC is rate-limited |
| 6 | **Treasury wallet address** | `backend/.env` → `TREASURY_WALLET` | The Solana wallet that receives user payments. Use a dedicated wallet — ideally a multisig. **Public address only** |
| 7 | **Treasury wallet keypair** ⚠️🔒 | Hardware wallet / multisig — **NOT in any file** | Controls the funds. Never put the private key/seed in the repo or `.env` |

---

## 3. dApp Store publishing (to launch on Seeker)

| # | Item | Where it goes | How to get it |
|---|------|---------------|---------------|
| 8 | **Publisher Solana keypair** ⚠️🔒 | local file `publisher-keypair.json` (gitignored) | `solana-keygen new`. Fund with ~0.1 SOL for publishing NFTs. Back up offline |
| 9 | **App icon** 512×512 PNG | `app/assets/icon.png` | Generated from `logo.png` via `scripts/sync-brand.sh` |
| 10 | **4+ screenshots** | `app/assets/screenshots/` | onboarding, discover, chat, profile |
| 11 | **Privacy policy URL** | `dapp-store-config.json` | A live page (dating apps legally require one) |
| 12 | **Support email + website** | `dapp-store-config.json` | e.g. support@yourdomain.com |
| 13 | **Domain name** | — | For site + privacy policy + app identity |

---

## 4. Production infra (when you go live)

| # | Item | Purpose |
|---|------|---------|
| 14 | **Hosting for backend** | Deploy the API (Railway, Render, Fly.io, AWS) |
| 15 | **Image/photo storage** ⚠️ | User photos — S3 / Cloudflare R2 / Supabase Storage. Need bucket + access keys |
| 16 | **Push notifications key** | Expo / FCM for match & message alerts |
| 17 | **Content moderation** | Photo + text moderation API — important for a dating app |
| 18 | **Email/SMS provider** (optional) | If you add email verification (Resend, Twilio) |

---

## 5. Legal / business (before launch)

| # | Item | Why |
|---|------|-----|
| 19 | **Privacy policy + ToS** | Required by app stores + privacy law |
| 20 | **Company entity** | To hold treasury, sign contracts |
| 21 | **Age verification plan** | Legal requirement for dating apps (18+) |

---

## Quick-start: the 4 essentials

To get a fully working demo with real on-chain data:

1. **Postgres `DATABASE_URL`** (local or free hosted)
2. **A random `JWT_SECRET`** (`openssl rand -hex 32`)
3. **A Helius/QuickNode RPC API key** (free tier is fine)
4. **Your treasury wallet PUBLIC address** (for receiving test payments)

> 🔒 Security rule: never commit secrets. The repo `.gitignore` already excludes `.env` and `*keypair.json`. Private keys/seeds for the treasury should live in a hardware wallet or multisig — not in any file.

---

*Grap3 · [github.com/9lordisgod/grap3](https://github.com/9lordisgod/grap3)*