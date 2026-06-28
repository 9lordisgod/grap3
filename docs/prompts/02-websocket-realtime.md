# Prompt: WebSocket Realtime (Matches, Typing, Presence)

## Task

Add WebSocket support for real-time match notifications, typing indicators, and online presence.

## Files to modify

**Backend:**
- `backend/src/server.js` — attach `ws` or `socket.io` server
- `backend/src/routes/match.js` — emit events on new match
- New: `backend/src/ws/handler.js` — connection auth, rooms, event routing

**Frontend:**
- `app/src/navigation/AppShell.tsx` — connect WS on auth, show match modal on `match:new`
- `app/src/screens/ChatScreen.tsx` — typing indicators, live message push
- New: `app/src/api/ws.ts` — WebSocket client with reconnect

## Events to implement

| Event | Direction | Payload |
|-------|-----------|---------|
| `auth` | client → server | `{ token }` — validate JWT, join user room |
| `match:new` | server → client | `{ matchId, partner: { id, displayName, photo } }` |
| `message:new` | server → client | `{ matchId, message }` |
| `typing:start` | client → server | `{ matchId }` |
| `typing:stop` | client → server | `{ matchId }` |
| `typing` | server → client | `{ matchId, userId, isTyping }` |
| `presence` | server → client | `{ userId, online: boolean }` |

## Requirements

1. Authenticate WS connections with existing JWT (same as REST)
2. On mutual swipe → server emits `match:new` to both users
3. On new message via REST → also broadcast `message:new` via WS
4. Chat screen: debounced `typing:start`/`typing:stop` (300ms)
5. Matches list: green dot for online partners
6. Auto-reconnect with exponential backoff (max 30s)
7. Graceful fallback: if WS down, REST polling every 10s for messages

## Acceptance criteria

- [ ] Match modal appears instantly when remote user likes back (no refresh)
- [ ] Messages appear in chat without pull-to-refresh
- [ ] Typing indicator shows "..." when partner types
- [ ] Online status visible on matches list
- [ ] WS reconnects after network drop
- [ ] `npm run dev` starts both HTTP + WS on same port

## Constraints

- Prefer `ws` package (lightweight) over socket.io unless you need fallbacks
- Same port as Express (upgrade HTTP connection)
- Do not store WS state in Postgres — in-memory is fine for MVP