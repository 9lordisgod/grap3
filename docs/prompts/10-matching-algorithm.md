# Prompt: Improve Matching Algorithm

## Task

Enhance the Grap3 matching engine for better match quality and engagement.

## Files to modify

- `backend/src/services/matchingEngine.js` — core ranking logic
- `backend/src/routes/match.js` — feed endpoint uses engine
- `docs/ALGORITHM.md` — document changes

## Current algorithm (read first)

The engine combines:
- **Elo rating** — skill-based ranking (default 1400)
- **Compatibility score** — shared tags, age proximity
- **On-chain score** — wallet trust signal (not sole factor)
- **Gale-Shapley** — stable matching for batch pairing

## Improvements to implement (pick 2–3)

### 1. Recency boost
- New users get +50 Elo for first 7 days (new-user boost)
- Recently active users ranked higher (lastActiveAt field)

### 2. Diversity injection
- Every 10th card in feed is outside usual Elo range (explore slot)
- Prevents filter bubble

### 3. Super like signal
- Incoming super likes get priority in feed ranking
- Recipient sees "Someone super liked you" without revealing who (Plus tier reveals)

### 4. Location proximity (stub)
- Add optional `lat`/`lng` to User model
- Score bonus for users within 50km (haversine distance)
- Default to no location filter if coords missing

### 5. Cooldown / anti-spam
- Max 100 swipes per day for free tier
- Pass on same user → don't show again for 30 days

### 6. Match quality feedback
- After 10 messages, prompt "Good match?" (thumbs up/down)
- Adjust Elo of both users based on feedback

## Requirements

1. Add `lastActiveAt DateTime` to User model + migration
2. Update `/match/feed` to use enhanced ranking
3. Log ranking factors for debugging (dev only endpoint)
4. Update `docs/ALGORITHM.md` with new formulas
5. Seed script generates users with varied scores for testing

## Acceptance criteria

- [ ] Feed order changes based on activity and compatibility
- [ ] Free tier swipe limit enforced
- [ ] Passed users don't reappear for 30 days
- [ ] Algorithm documented with examples
- [ ] No performance regression (< 200ms for feed of 1000 users)

## Constraints

- On-chain score is a signal, never the only factor
- Gale-Shapley runs as batch job (cron), not per-request
- Keep ranking transparent enough to explain in docs