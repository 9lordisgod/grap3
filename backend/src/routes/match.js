import { Router } from 'express';
import { rankFeed, updateElo, DEFAULT_ELO } from '../services/matchingEngine.js';
import { db, hasDb } from '../db.js';

const router = Router();

// Demo fallback data (used when no DATABASE_URL configured)
const DEMO = [
  { id: '1', name: 'Nova', age: 27, bio: 'Solana dev. Long walks on the blockchain.', tags: ['DeFi','Anchor','Seeker'], onChainScore: 92, elo: 1520, photo: 'https://picsum.photos/seed/nova/600/800' },
  { id: '2', name: 'Sol', age: 30, bio: 'NFT artist. Mint me a memory.', tags: ['NFTs','Art','DAOs'], onChainScore: 81, elo: 1460, photo: 'https://picsum.photos/seed/sol/600/800' },
  { id: '3', name: 'Lumi', age: 25, bio: 'Trading perps by day, touching grass by sunset.', tags: ['DeFi','Trading','Seeker'], onChainScore: 88, elo: 1490, photo: 'https://picsum.photos/seed/lumi/600/800' },
  { id: '4', name: 'Vega', age: 29, bio: 'Running a validator. Stake your heart.', tags: ['Validators','Rust','DAOs'], onChainScore: 76, elo: 1410, photo: 'https://picsum.photos/seed/vega/600/800' },
];

async function loadCandidates(excludeWallet) {
  if (!hasDb) return DEMO;
  const users = await db.user.findMany({
    where: { walletPubkey: { not: excludeWallet || '' } },
    take: 100,
  });
  return users.map((u) => ({
    id: u.id, name: u.displayName ?? 'Anon', age: u.age ?? 25,
    bio: u.bio ?? '', tags: u.tags ?? [], onChainScore: u.onChainScore ?? 0,
    elo: u.elo ?? DEFAULT_ELO, photo: (u.photos && u.photos[0]) || 'https://picsum.photos/seed/' + u.id + '/600/800',
  }));
}

// Personalized ranked discovery feed
router.get('/feed', async (req, res) => {
  try {
    const viewer = {
      id: req.query.viewerId || 'me',
      age: Number(req.query.age) || 28,
      tags: (req.query.tags || 'DeFi,Seeker,DAOs').split(','),
      elo: Number(req.query.elo) || DEFAULT_ELO,
      maxDistanceKm: 100, agePrefRange: 8,
    };
    const candidates = await loadCandidates(req.query.wallet);
    const ctxById = Object.fromEntries(
      candidates.map((c, i) => [c.id, { distanceKm: 5 + i * 12, lastActiveHours: 1 + i * 6 }])
    );
    res.json({ source: hasDb ? 'db' : 'demo', profiles: rankFeed(viewer, candidates, ctxById) });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// Record a swipe; update Elo; persist + detect match if DB present
router.post('/swipe', async (req, res) => {
  const { targetId, direction, swiperElo = DEFAULT_ELO, fromId } = req.body;
  const liked = direction === 'like' || direction === 'superlike';
  try {
    if (hasDb && fromId) {
      await db.swipe.upsert({
        where: { fromId_toId: { fromId, toId: targetId } },
        update: { direction },
        create: { fromId, toId: targetId, direction },
      });
      const reciprocal = await db.swipe.findUnique({
        where: { fromId_toId: { fromId: targetId, toId: fromId } },
      });
      const matched = liked && reciprocal && (reciprocal.direction === 'like' || reciprocal.direction === 'superlike');
      if (matched) {
        await db.match.create({ data: { userAId: fromId, userBId: targetId } }).catch(() => {});
      }
      return res.json({ targetId, matched: !!matched });
    }
    const target = DEMO.find((c) => c.id === targetId);
    let newElo = target?.elo;
    if (target) { newElo = updateElo(target.elo, swiperElo, liked); target.elo = newElo; }
    res.json({ targetId, matched: liked && Math.random() > 0.4, targetElo: newElo });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

export default router;
