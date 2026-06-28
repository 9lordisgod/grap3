# Prompt: dApp Store Launch Checklist

## Task

Prepare Grap3 for Solana dApp Store submission. Audit config, generate assets, write store copy.

## Files to review/modify

- `app/dapp-store-config.json` — publisher info, descriptions, media paths
- `app/assets/icon.png` — 512×512 app icon
- `app/assets/screenshots/` — 4+ screenshots (create if missing)
- `docs/DAPP_STORE.md` — submission steps
- `docs/RELEASE.md` — version bump + changelog
- `scripts/sync-brand.sh` — regenerate icon from logo

## Requirements

1. **Audit `dapp-store-config.json`:**
   - Publisher name, email, website are real (or clearly marked TODO for fork)
   - `privacy_policy_url` and `copyright_url` are live URLs
   - `android_package` matches `app.json`
   - Version matches `app.json` version

2. **Generate screenshots** (if missing):
   - Use `docs/assets/readme/phone-*.png` as base or capture from mockup
   - Required: onboarding, discover, chat, profile
   - Size: 1080×1920 or Seeker-native resolution

3. **Build release APK/AAB:**
   - Document `eas build` or local gradle steps
   - Signing keystore instructions (never commit keystore)

4. **Publisher wallet:**
   - Document `solana-keygen new` for publisher keypair
   - Fund with ~0.1 SOL for NFT minting
   - Add `publisher-keypair.json` to `.gitignore` (verify)

5. **Pre-submission checklist** (output as markdown):
   - [ ] Privacy policy page live
   - [ ] ToS page live
   - [ ] Support email responds
   - [ ] App tested on real Seeker device
   - [ ] No dev/mock data in production build
   - [ ] Mainnet RPC + treasury configured
   - [ ] Age gate enforced

## Acceptance criteria

- [ ] `dapp-store-config.json` validates against Solana dApp Store schema
- [ ] 4 screenshots exist in `app/assets/screenshots/`
- [ ] `docs/RELEASE.md` updated with version and changelog
- [ ] Build instructions documented step-by-step

## Constraints

- Publisher keypair NEVER in repo
- Use existing brand assets from `docs/assets/brand/`
- Short description < 80 chars, long description < 4000 chars