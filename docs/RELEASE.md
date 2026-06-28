# Grap3 — dApp Store Release Guide

## 1. Build a release Android binary
Grap3 is an Expo app; build a signed APK/AAB:

\`\`\`bash
cd app
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease   # -> app/android/app/build/outputs/apk/release/
\`\`\`
(Or use EAS: \`eas build -p android --profile production\`.)

## 2. Install the dApp Store CLI
\`\`\`bash
npx @solana-mobile/dapp-store-cli@latest --help
\`\`\`

## 3. Keys (CRITICAL — keep in PRIVATE repo / hardware wallet)
- Generate/keep a Solana publisher keypair. NEVER commit it.
- Fund it with a little SOL for the publishing NFTs.

## 4. Create publisher + app + release NFTs
\`\`\`bash
npx dapp-store create publisher -k ./publisher-keypair.json
npx dapp-store create app -k ./publisher-keypair.json
npx dapp-store create release -k ./publisher-keypair.json \\
  --apk app/android/app/build/outputs/apk/release/app-release.apk
\`\`\`
Config is driven by app/dapp-store-config.json (edit before publishing).

## 5. Submit for review
\`\`\`bash
npx dapp-store publish submit -k ./publisher-keypair.json --requestor-is-authorized
\`\`\`

## 6. Assets checklist
- [ ] App icon 512x512 (assets/icon.png)
- [ ] 4+ screenshots (onboarding, discover, chat, profile)
- [ ] Privacy policy live at privacy_policy_url
- [ ] Age-gating / content policy compliance for a dating app
- [ ] Mainnet RPC + treasury wallet configured

Ref: https://docs.solanamobile.com/dapp-store/publishing-a-release
