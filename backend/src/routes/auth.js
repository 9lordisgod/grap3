import { Router } from 'express';
import nacl from 'tweetnacl';
import jwt from 'jsonwebtoken';
import { PublicKey } from '@solana/web3.js';

const router = Router();
const nonces = new Map(); // pubkey -> nonce (use Redis in prod)

// 1. Request a login challenge
router.post('/nonce', (req, res) => {
  const { publicKey } = req.body;
  if (!publicKey) return res.status(400).json({ error: 'publicKey required' });
  const nonce = Math.random().toString(36).slice(2) + Date.now();
  nonces.set(publicKey, nonce);
  res.json({ nonce, message: `Grap3 login\nNonce: ${nonce}` });
});

// 2. Verify signed message, issue JWT
router.post('/verify', (req, res) => {
  const { publicKey, signature } = req.body;
  const nonce = nonces.get(publicKey);
  if (!nonce) return res.status(400).json({ error: 'no nonce; request one first' });
  const message = new TextEncoder().encode(`Grap3 login\nNonce: ${nonce}`);
  const ok = nacl.sign.detached.verify(
    message,
    Buffer.from(signature, 'base64'),
    new PublicKey(publicKey).toBytes()
  );
  if (!ok) return res.status(401).json({ error: 'invalid signature' });
  nonces.delete(publicKey);
  const token = jwt.sign({ sub: publicKey }, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' });
  res.json({ token });
});

export default router;
