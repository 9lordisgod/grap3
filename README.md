<div align="center">

<img src="./docs/assets/readme/app-icon-box.png" alt="Grap3 app icon" width="128" />

# Grap3

**Wallet-first dating for Solana Seeker**

Connect with Seed Vault, match on-chain verified singles, chat end-to-end encrypted, pay in USDC or SOL.

[![Solana Mobile](https://img.shields.io/badge/Solana%20Mobile-FF3D8A?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTQuNCAxNi44IDEyIDE5LjUgMTkuNiAxNi44IDIxIDEyIDEyIDQuNSAzIDEyIDQuNCAxNi44eiIvPjwvc3ZnPg==)](https://solanamobile.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-FF3D8A?style=flat-square)](./LICENSE)
[![UI Demo](https://img.shields.io/badge/UI%20Demo-interactive-FF3D8A?style=flat-square)](./docs/mockup/preview.html)
[![Built by @CHxmrBrother](https://img.shields.io/badge/Built%20by-@CHxmrBrother-FF3D8A?style=flat-square&logo=x)](https://x.com/CHxmrBrother)

</div>

---

## UI / UX highlights

<p align="center">
  <img src="./docs/assets/readme/phone-onboard.png" alt="Onboard" width="23%" />
  <img src="./docs/assets/readme/phone-discover.png" alt="Discover" width="23%" />
  <img src="./docs/assets/readme/phone-match.png" alt="Match" width="23%" />
  <img src="./docs/assets/readme/phone-matches.png" alt="Matches" width="23%" />
</p>

---

## Features

| | |
|---|---|
| **Seed Vault auth** | Sign in with your Seeker wallet. No email, no passwords. |
| **On-chain trust** | Wallet age, activity & holdings as anti-bot signals. |
| **Smart matching** | Elo ranking + compatibility + Gale-Shapley stable pairs. |
| **Encrypted chat** | Wallet-key secured messaging with live presence. |
| **Crypto payments** | Boosts & premium in USDC/SOL — zero app-store tax. |
| **Seeker-native UI** | True black OLED, `#FF3D8A` grape glow, minimal chrome. |

## Tech stack

| Layer | Stack |
|-------|-------|
| Mobile | React Native · Expo · Solana Mobile Wallet Adapter |
| Backend | Node.js · Express · Prisma · PostgreSQL |
| Realtime | WebSockets — matches, typing, presence |
| Chain | Solana mainnet/devnet — SOL & USDC treasury |

## Quick start

```bash
cd backend && npm install && npm run dev
cd app && npm install --legacy-peer-deps && npm run android
```

→ Full guide: [docs/SETUP.md](./docs/SETUP.md)

## For builders & contributors

Fork this repo and launch your own dating app. We ship prompts, guides, and templates to help you ship fast.

| Resource | What you get |
|----------|--------------|
| [**Builder Kit**](./docs/BUILDER_KIT.md) | Central hub — repo map, build order, design rules |
| [**AI Prompts**](./docs/prompts/README.md) | 12 copy-paste prompts for Cursor, Claude, ChatGPT |
| [**Fork & Launch**](./docs/FORK_AND_LAUNCH.md) | Rebrand, deploy, dApp Store submission |
| [**Good First Issues**](./docs/GOOD_FIRST_ISSUES.md) | Starter tasks ranked easy → hard |
| [**AGENTS.md**](./AGENTS.md) | Auto-loaded guide for AI coding assistants |

**Fastest path:** paste [Project Context](./docs/prompts/00-project-context.md) + [Wire Live API](./docs/prompts/01-wire-live-api.md) into your AI editor.

## Documentation

| Topic | Link |
|-------|------|
| **UI / UX samples** | [docs/mockup/preview.html](./docs/mockup/preview.html) · [docs/UI.md](./docs/UI.md) |
| Architecture | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| Technical spec | [docs/TECH_SPEC.md](./docs/TECH_SPEC.md) |
| Matching algorithm | [docs/ALGORITHM.md](./docs/ALGORITHM.md) |
| Roadmap | [docs/ROADMAP.md](./docs/ROADMAP.md) |
| Business model | [docs/BUSINESS_MODEL.md](./docs/BUSINESS_MODEL.md) |
| Go-to-market | [docs/GTM.md](./docs/GTM.md) |
| Security | [docs/SECURITY.md](./docs/SECURITY.md) |
| dApp Store publish | [docs/DAPP_STORE.md](./docs/DAPP_STORE.md) · [docs/RELEASE.md](./docs/RELEASE.md) |
| Setup checklist | [docs/REQUIREMENTS_CHECKLIST.md](./docs/REQUIREMENTS_CHECKLIST.md) |
| Builder kit | [docs/BUILDER_KIT.md](./docs/BUILDER_KIT.md) · [AI prompts](./docs/prompts/README.md) |
| Fork & launch | [docs/FORK_AND_LAUNCH.md](./docs/FORK_AND_LAUNCH.md) |
| Contributing | [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) · [docs/CONTRIBUTORS.md](./docs/CONTRIBUTORS.md) |

## Project structure

```
grap3/
├── app/              # React Native dApp (Seeker)
├── backend/          # API + Prisma
├── docs/
│   ├── prompts/      # 12 AI prompts for builders
│   ├── BUILDER_KIT.md
│   └── FORK_AND_LAUNCH.md
├── AGENTS.md         # AI assistant conventions
└── .github/          # CI + issue/PR templates
```

## Creator

Built and open-sourced by [**@CHxmrBrother**](https://x.com/CHxmrBrother) — follow on X for updates, launches, and builder drops.

## License

MIT © Grap3 Labs