# Prompt: Devnet Payments End-to-End

## Task

Wire the premium sheet and in-app purchases to real Solana devnet transactions, verified server-side.

## Files to modify

**Backend:**
- `backend/src/routes/payments.js` — verify tx, credit features
- `backend/prisma/schema.prisma` — ensure Payment model is complete

**Frontend:**
- `app/src/components/ui/PremiumSheet.tsx` — trigger payment flows
- `app/src/screens/DiscoveryScreen.tsx` — super like payment
- New: `app/src/solana/payments.ts` — build and send SOL/USDC transactions

## Payment features

| Feature | Price | Effect |
|---------|-------|--------|
| Super like | $0.50 (0.005 SOL or 0.5 USDC) | Priority like, 5 Grapes alternative |
| Boost (30 min) | $2.50 | Profile shown first in feed |
| Plus (monthly) | $7.99 | Unlimited likes, see who liked you |
| Grapes pack (50) | $4.50 | +50 soft currency |

## Requirements

1. **Client payment flow:**
   - User taps purchase → app builds Solana transfer to `TREASURY_WALLET`
   - User signs via MWA → broadcast tx → get signature
   - App: `POST /pay/verify { signature, feature, amount, currency }`
   - Server verifies on-chain → credits feature → returns updated user

2. **Server verification (`payments.js`):**
   - Fetch tx by signature from Solana RPC
   - Confirm: correct recipient, correct amount (±1% tolerance), not already in `Payment` table
   - Credit: update `tier`, `berries` (Grapes), or grant boost/superlike
   - Return `{ ok: true, user: { tier, berries, ... } }`

3. **PremiumSheet UI:**
   - Show current tier, Grapes balance
   - Purchase buttons with SOL/USDC toggle
   - Loading state during tx confirmation
   - Success/error feedback

4. **Devnet setup:**
   - Document faucet steps in prompt output
   - `.env.example` has `TREASURY_WALLET` placeholder

## Acceptance criteria

- [ ] Super like deducts payment and sends priority swipe
- [ ] Plus purchase upgrades `tier` to `plus`
- [ ] Grapes purchase increments `berries` balance
- [ ] Double-spend prevented (same signature rejected)
- [ ] Wrong amount/recipient rejected
- [ ] Works on devnet with test SOL

## Constraints

- Use `@solana/web3.js` (already in backend; add to app if needed)
- USDC: use devnet USDC mint `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
- Never store private keys — user signs via MWA only
- Treasury address from env, never hardcoded