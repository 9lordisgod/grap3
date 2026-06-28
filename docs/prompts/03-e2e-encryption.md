# Prompt: End-to-End Chat Encryption

## Task

Integrate wallet-derived encryption keys into the chat flow so messages are encrypted client-side before hitting the server.

## Files to modify

- `app/src/solana/crypto.ts` — already has `generateKeyPair`, `encrypt`, `decrypt`
- `app/src/screens/ChatScreen.tsx` — encrypt on send, decrypt on receive
- `backend/src/routes/match.js` — store ciphertext in `Message.body`, add `isEncrypted` flag
- `backend/prisma/schema.prisma` — optional: `publicKey` field on User for key exchange

## Encryption design

1. Each user generates a NaCl box keypair on first chat use
2. Store `secretKey` in device secure storage (Expo SecureStore), never on server
3. Store `publicKey` on user profile (server-side, public by nature)
4. On send: `encrypt(plaintext, recipientPublicKey, senderSecretKey)` → base64 ciphertext
5. On receive: `decrypt(ciphertext, senderPublicKey, recipientSecretKey)` → plaintext
6. Server stores and relays opaque ciphertext — cannot read messages

## Requirements

1. Key generation on onboarding or first chat open
2. Key exchange: fetch partner's `publicKey` from profile endpoint
3. Encrypt every outgoing message before `POST /match/:id/messages`
4. Decrypt every incoming message on display
5. Show lock icon in chat header when E2E is active
6. Migration: existing plaintext messages show as-is with "unencrypted" badge
7. Handle missing keys gracefully: "Waiting for partner's encryption key..."

## Acceptance criteria

- [ ] Server DB contains only ciphertext (verify by reading raw `Message.body`)
- [ ] Two devices can exchange readable messages
- [ ] Keys persist across app restarts (SecureStore)
- [ ] New match → keys exchanged automatically before first message
- [ ] Unit test: encrypt → decrypt roundtrip in `crypto.ts`

## Constraints

- Use existing `tweetnacl` + `tweetnacl-util` — no new crypto libraries
- Do not roll your own crypto primitives
- Secret keys NEVER sent to server or logged