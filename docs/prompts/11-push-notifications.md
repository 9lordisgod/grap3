# Prompt: Push Notifications

## Task

Add push notifications for new matches and messages using Expo Notifications + FCM.

## Files to modify

**Backend:**
- `backend/prisma/schema.prisma` — add `pushToken String?` to User
- `backend/src/routes/auth.js` — `POST /auth/push-token { token }`
- New: `backend/src/services/notifications.js` — send via Expo Push API
- `backend/src/routes/match.js` — trigger notification on match + message

**Frontend:**
- `app/App.tsx` — register for push on launch
- New: `app/src/notifications/setup.ts` — permission, token registration, handler

## Notification types

| Event | Title | Body |
|-------|-------|------|
| New match | "It's a match!" | "You and {name} liked each other" |
| New message | "{name}" | "{message preview}" (truncated, no E2E decrypt server-side) |
| Super like | "Someone super liked you!" | "Upgrade to Plus to see who" |
| Boost expired | "Boost ended" | "Your profile is back to normal ranking" |

## Requirements

1. Request notification permission after onboarding (not on first launch)
2. Store Expo push token in user profile
3. On match/message → server sends push via `https://exp.host/--/api/v2/push/send`
4. Tap notification → deep link to ChatScreen or MatchesScreen
5. Respect user preference: `notificationsEnabled` boolean on User
6. Do not send push for messages when user is actively in that chat (presence check)

## Acceptance criteria

- [ ] Match notification arrives on partner's device within 5s
- [ ] Message notification shows sender name (not encrypted body)
- [ ] Tapping notification opens correct screen
- [ ] User can disable notifications in Profile settings
- [ ] Works on Android device (not emulator — FCM requires physical device)

## Constraints

- Use `expo-notifications` — no raw FCM setup unless necessary
- Server cannot decrypt E2E messages — use generic "New message from {name}"
- Expo push token, not FCM token directly