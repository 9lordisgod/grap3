# Publishing Grap3 to the Solana dApp Store

Ref: https://docs.solanamobile.com/dapp-store/intro

## Overview
The Solana dApp Store distributes Android apps (.apk/.aab) to Seeker users with no
platform fee on in-app crypto transactions. Grap3 ships as a React Native
Android build.

## Steps
1. Build a release APK/AAB of app/.
2. Install the publishing CLI:
   \`\`\`bash
   npx @solana-mobile/dapp-store-cli@latest
   \`\`\`
3. Create your publisher + app + release NFTs (requires a funded Solana keypair —
   keep this in the PRIVATE repo / a hardware wallet, never commit it).
4. Fill out the dApp Store listing config (name: Grap3, category: Social,
   icon, screenshots, description).
5. Submit for review.

## Seeker detection
Use the Seeker detection guide to unlock Seeker-only perks (e.g. exclusive
badges and boosts for Seeker holders):
https://docs.solanamobile.com/get-started/detecting-seeker
