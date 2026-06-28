# Security

## Golden rules

- **Never** commit keypairs, seed phrases, or `.env` files.
- Treasury and publisher keys belong in a hardware wallet or multisig — never on a developer laptop.
- Verify all payment transactions server-side on-chain (amount, recipient, no replay).
- Store payment signatures uniquely to prevent double-credit (see Prisma `Payment.signature @unique`).
- Rate-limit auth and rewards endpoints.
- Encrypt messages; sign in via wallet signature (no password store).

## Secrets management

| Secret | Where it lives |
|--------|----------------|
| `JWT_SECRET` | Environment variable / secrets manager |
| Treasury keypair | Hardware wallet or multisig |
| Publisher keypair | Hardware wallet, backed up offline |
| RPC API keys | Environment variable only |

## Trust & safety

- Photo + behavior moderation pipeline
- Report/block flows
- On-chain reputation adjustments for bad actors
- Age verification (18+ legal requirement)

## Reporting vulnerabilities

If you discover a security issue, please open a private security advisory on GitHub rather than filing a public issue.