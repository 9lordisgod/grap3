# Grap3 Matching Algorithm

Original implementation (MIT). Inspired by well-documented industry patterns —
no proprietary code was copied. Our differentiator is the **on-chain reputation**
layer, which mainstream apps cannot replicate.

## Components (backend/src/services/matchingEngine.js)

### 1. Elo desirability ranking
Each user has an Elo rating (default 1400). A like from a high-Elo user moves the
target's rating more than a like from a low-Elo user (weighted endorsement).
Classic logistic expected-score formula with K=32.

### 2. On-chain reputation (our moat)
`reputation.js` pulls live wallet signals via Solana RPC:
- Wallet age (up to 30 pts)
- Transaction count / activity (25)
- NFT holdings (15)
- SOL balance (15)
- Seeker device bonus (15)
=> 0-100 trust score. Bots can't fake aged, active, asset-holding wallets.

### 3. Weighted compatibility
Blends interests (Jaccard overlap), distance, age fit, reputation, and recent
activity into a 0-1 score. Weights are tunable in `WEIGHTS`.

### 4. Ranked feed
Final score = 70% compatibility + 22% Elo affinity + small exploration term.
The exploration term prevents a rich-get-richer feedback loop and gives new users
exposure.

### 5. Gale-Shapley stable matching
Produces stable pairings from mutual-interest preference lists — useful for
curated "top picks" and event matchmaking.

## API
- `GET /match/feed` — personalized ranked discovery feed
- `POST /match/swipe` — records swipe, updates Elo, returns match status
- `GET /reputation/:pubkey` — live on-chain trust score + signals
