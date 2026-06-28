# Grap3 — Setup

## Prerequisites
- Node 20+ (you have 25)
- Android Studio + an Android device or emulator (Seeker for real testing)
- A Solana wallet supporting Mobile Wallet Adapter (Seed Vault on Seeker)
- Postgres (local or hosted) for the backend

## Backend
\`\`\`bash
cd backend
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, etc.
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev            # http://localhost:4000/health
\`\`\`

## Mobile App
\`\`\`bash
cd app
npm install
npm run android        # builds a dev client onto device/emulator
\`\`\`

MWA requires a real Android runtime — it does not work in iOS simulators or Expo Go. Use a dev client + Android.

## Switching to mainnet
- app/src/solana/wallet.ts -> set CHAIN = 'solana:mainnet-beta'
- backend .env -> SOLANA_RPC to a mainnet endpoint, set TREASURY_WALLET
