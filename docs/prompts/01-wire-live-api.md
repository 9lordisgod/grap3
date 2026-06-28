# Prompt: Wire Screens to Live API

## Task

Replace mock/hardcoded data in the Grap3 mobile app with live backend API calls. This is the #1 MVP blocker.

## Files to modify

**Backend (verify/extend):**
- `backend/src/routes/match.js`
- `backend/src/routes/auth.js`
- `backend/prisma/schema.prisma`

**Frontend (wire up):**
- `app/src/screens/DiscoveryScreen.tsx` — replace `PROFILES` mock array with `GET /match/feed`
- `app/src/screens/MatchesScreen.tsx` — fetch `GET /match/matches`
- `app/src/screens/ChatScreen.tsx` — fetch/send messages via match endpoints
- `app/src/screens/ProfileScreen.tsx` — fetch/update user profile
- `app/src/screens/OnboardingScreen.tsx` — create profile after wallet auth

**New file (create):**
- `app/src/api/client.ts` — shared fetch wrapper with JWT, base URL, error handling

## Requirements

1. Create `app/src/api/client.ts`:
   - `API_BASE` from env or `http://10.0.2.2:4000` (Android emulator → host)
   - `setAuthToken(token)` / `getAuthToken()` helpers
   - `api.get(path)`, `api.post(path, body)` with `Authorization: Bearer` header
   - Typed error responses

2. **Discovery flow:**
   - On mount: `GET /match/feed` → map response to `Profile[]` shape used by `SwipeDeck`
   - On swipe: `POST /match/swipe { toId, direction: 'like'|'pass'|'superlike' }`
   - If response includes `match: true`, trigger `onMatch` callback

3. **Matches flow:**
   - `GET /match/matches` → list with last message preview, unread count
   - Tap match → navigate to ChatScreen with `matchId`

4. **Chat flow:**
   - `GET /match/:matchId/messages` → message list
   - `POST /match/:matchId/messages { body }` → send message
   - Optimistic UI: append message immediately, rollback on error

5. **Profile flow:**
   - `GET /auth/me` or equivalent → current user
   - `PATCH /auth/profile { displayName, age, bio, tags }` → update

6. **Onboarding:**
   - After wallet connect + JWT received, show profile setup
   - `POST` profile fields, then navigate to Discovery

## Acceptance criteria

- [ ] Discovery shows real users from Postgres (seed 3+ test users for dev)
- [ ] Swiping persists to DB and creates matches on mutual like
- [ ] Matches screen shows real matches
- [ ] Chat sends/receives messages (plaintext OK for now — encryption is separate task)
- [ ] Profile edits persist
- [ ] Loading states and error toasts on all screens
- [ ] No hardcoded `PROFILES` array remains

## Constraints

- Use existing `Profile` type from `SwipeDeck.tsx`
- Use `theme.ts` for all styles
- Add a `backend/scripts/seed.js` to create test users for local dev
- Do not add Redux/MobX — React state + context is fine for MVP