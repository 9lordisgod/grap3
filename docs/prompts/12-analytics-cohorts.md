# Prompt: Analytics & Cohort Dashboard

## Task

Add privacy-respecting analytics to track engagement and conversion. No third-party trackers — self-hosted or lightweight.

## Files to modify

**Backend:**
- `backend/prisma/schema.prisma` — add `Event` model
- New: `backend/src/routes/analytics.js` — ingest + query events
- New: `backend/src/services/analytics.js` — aggregation helpers

**Frontend:**
- New: `app/src/analytics/track.ts` — `track(event, properties)` helper
- Instrument key screens: onboarding complete, swipe, match, message, purchase

## Event model

```prisma
model Event {
  id         String   @id @default(cuid())
  userId     String?  // null for anonymous pre-auth events
  event      String   // onboarding_complete | swipe | match | message_sent | purchase
  properties Json?
  createdAt  DateTime @default(now())
  @@index([event, createdAt])
  @@index([userId, createdAt])
}
```

## Events to track

| Event | Properties |
|-------|------------|
| `onboarding_complete` | `{ steps: 3 }` |
| `swipe` | `{ direction, targetOnChainScore }` |
| `match` | `{ matchId }` |
| `message_sent` | `{ matchId, isFirstMessage }` |
| `purchase` | `{ feature, amount, currency }` |
| `session_start` | `{ platform: 'android' }` |

## Dashboard endpoint (admin)

`GET /analytics/cohort?from=2026-01-01&to=2026-06-01`

Returns:
```json
{
  "dau": 150,
  "wau": 800,
  "matchesPerUser": 2.3,
  "messagesPerMatch": 8.1,
  "premiumConversion": 0.04,
  "d7Retention": 0.28,
  "topEvents": [{ "event": "swipe", "count": 12000 }]
}
```

## Requirements

1. `track()` batches events and flushes every 10s or on app background
2. No PII in event properties (no names, bios, message content)
3. Admin endpoint protected by env `ADMIN_SECRET` header
4. Simple HTML dashboard at `docs/analytics/dashboard.html` (static, fetches API)
5. Rate limit: 100 events per user per minute

## Acceptance criteria

- [ ] Key user actions tracked without noticeable latency
- [ ] Cohort endpoint returns accurate DAU/WAU/retention
- [ ] No third-party SDK (no Mixpanel, Amplitude, Firebase Analytics)
- [ ] Events stored in Postgres, queryable

## Constraints

- GDPR-friendly: no cross-user tracking, no device fingerprinting
- Wallet pubkey is the user ID — acceptable as pseudonymous
- Dashboard is dev/admin only — not exposed to app users