# Prompt: Fork & Rebrand Grap3

## Task

Help me fork Grap3 and rebrand it as my own dating app. Change name, colors, copy, and package identifiers while keeping the architecture.

## What to change

| Item | Files |
|------|-------|
| App name | `app/app.json`, `app/dapp-store-config.json`, `README.md` |
| Package ID | `app/app.json` → `android.package`, `app/dapp-store-config.json` |
| Brand colors | `app/src/theme/theme.ts`, `docs/assets/brand/grap3-tokens.css` |
| Logo | `app/assets/logo.png`, `app/assets/icon.png`, run `scripts/sync-brand.sh` |
| Copy/text | All `app/src/screens/*.tsx`, `docs/mockup/preview.html` |
| Backend name | `backend/src/server.js` health check, `package.json` names |
| Currency name | Replace "Grapes" with your soft currency name in UI + schema comments |
| Git remote | New repo URL, update badge links in README |

## Rebrand worksheet (fill in before prompting)

```
App name:        _______________
Tagline:         _______________
Package ID:      dating._______.app
Primary color:   #______
Accent color:    #______
Currency name:   _______________
Domain:          _______________
Support email:   _______________
```

## Requirements

1. Global find-replace plan (list every occurrence of "Grap3", "grap3", "Grapes", "berries")
2. Update `theme.ts` with new brand colors (keep OLED black background)
3. Regenerate app icon from new logo
4. Update `dapp-store-config.json` with new publisher info
5. Update README with new name, screenshots, and description
6. Keep MIT license — add your name as additional copyright holder if desired
7. Remove any Grap3-specific domains/emails that aren't yours

## Acceptance criteria

- [ ] No references to "Grap3" remain (except LICENSE attribution if keeping fork credit)
- [ ] App builds with new package ID
- [ ] Theme uses new colors consistently
- [ ] Logo appears in onboarding, tab bar, and app icon
- [ ] `dapp-store-config.json` reflects new brand

## Constraints

- Do not change Prisma model structure (rename display fields only)
- Keep Solana MWA integration intact
- Keep MIT license file
- Architecture and API routes stay the same — rebrand is cosmetic + config