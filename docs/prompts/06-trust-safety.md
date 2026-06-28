# Prompt: Trust & Safety (Report, Block, Moderation)

## Task

Add report, block, and basic content moderation so the app is safe to launch.

## Files to modify

**Backend:**
- `backend/prisma/schema.prisma` — add `Report`, `Block` models
- New: `backend/src/routes/safety.js` — report, block, blocked-feed filter
- `backend/src/routes/match.js` — exclude blocked users from feed

**Frontend:**
- `app/src/screens/DiscoveryScreen.tsx` — block button on card overflow menu
- `app/src/screens/ChatScreen.tsx` — report + block in header menu
- `app/src/screens/ProfileScreen.tsx` — report other users
- New: `app/src/components/ui/ReportSheet.tsx` — reason picker bottom sheet

## Data models

```prisma
model Block {
  id        String   @id @default(cuid())
  blockerId String
  blockedId String
  createdAt DateTime @default(now())
  @@unique([blockerId, blockedId])
}

model Report {
  id         String   @id @default(cuid())
  reporterId String
  targetId   String
  reason     String   // spam | harassment | fake | inappropriate | other
  details    String?
  status     String   @default("open") // open | reviewed | actioned
  createdAt  DateTime @default(now())
}
```

## Requirements

1. **Block:** blocked user never appears in feed, matches, or search
2. **Report:** submit reason + optional details; confirmation toast
3. **Feed filter:** `/match/feed` excludes users blocked by or blocking requester
4. **Chat:** block from chat → unmatch + hide conversation
5. **Rate limit:** max 10 reports per user per day
6. **Admin endpoint (dev only):** `GET /safety/reports?status=open` — protect with admin JWT or env flag
7. **Photo moderation hook:** stub `moderateImage(url)` that calls external API (Hive/AWS Rekognition) — return pass/fail

## Report reasons (UI)

- Spam or scam
- Harassment or hate speech
- Fake profile / catfish
- Inappropriate photos
- Under 18
- Other

## Acceptance criteria

- [ ] Block removes user from all surfaces immediately
- [ ] Report submits and stores in DB
- [ ] Blocked users cannot message each other
- [ ] Feed respects block list both directions
- [ ] ReportSheet uses existing `PremiumSheet` / bottom sheet pattern

## Constraints

- Age gate (18+) should already exist in onboarding — enforce `age >= 18`
- Do not auto-ban on report — queue for review
- Use existing UI components and theme tokens