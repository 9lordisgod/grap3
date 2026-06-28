import { Router } from 'express';
import { computeReputation } from '../services/reputation.js';

const router = Router();

// GET /reputation/:pubkey -> on-chain trust score + signals
router.get('/:pubkey', async (req, res) => {
  const isSeeker = req.query.seeker === 'true';
  const result = await computeReputation(req.params.pubkey, { isSeeker });
  res.json(result);
});

export default router;
