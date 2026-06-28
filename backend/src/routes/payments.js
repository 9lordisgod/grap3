import { Router } from 'express';
import { Connection } from '@solana/web3.js';

const router = Router();

/** @type {Record<string, { usd: number; berries?: number }>} */
const PRICES = {
  superLike: { usd: 0.5, berries: 5 },
  boost: { usd: 2.5, berries: 25 },
  berries10: { usd: 1.0, berries: 10 },
  berries50: { usd: 4.5, berries: 50 },
  plusMonthly: { usd: 7.99 },
  goldMonthly: { usd: 14.99 },
  verifyBadge: { usd: 5.0 },
};

router.post('/verify', async (req, res) => {
  const { signature, feature } = req.body;
  if (!signature) return res.status(400).json({ error: 'signature required' });
  if (!PRICES[feature]) return res.status(400).json({ error: 'unknown feature' });

  try {
    const conn = new Connection(process.env.SOLANA_RPC || 'https://api.devnet.solana.com', 'confirmed');
    const tx = await conn.getTransaction(signature, { maxSupportedTransactionVersion: 0 });
    if (!tx) return res.status(404).json({ error: 'tx not found / not confirmed' });
    // TODO: assert recipient == TREASURY_WALLET and amount >= PRICES[feature].usd
    res.json({ ok: true, feature, slot: tx.slot, price: PRICES[feature] });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get('/prices', (_req, res) => {
  res.json({
    currency: 'USDC',
    treasuryNote: 'Pay USDC or SOL equivalent. dApp Store allows native crypto — no 30% cut.',
    grapes: { rate: 0.1, unit: '1 Grape = $0.10' },
    tiers: {
      free: { name: 'Free', perks: ['10 likes / day', 'Basic discovery'] },
      plus: { name: 'Plus', usd: 7.99, period: 'month', perks: ['Unlimited likes', 'See who liked you', '1 boost / week'] },
      gold: { name: 'Gold', usd: 14.99, period: 'month', perks: ['Everything in Plus', 'Priority stack', '3 super likes / day', 'Travel mode'] },
      seeker: { name: 'Seeker Pass', perks: ['Free monthly boost', '+10 trust bonus', 'Exclusive pools'], requires: 'Seeker device' },
    },
    micro: PRICES,
  });
});

export default router;