/**
 * Grap3 Matching Engine
 * Original implementation inspired by industry-standard patterns:
 *  - Elo-style desirability ranking (à la Tinder's historical system)
 *  - Weighted multi-factor compatibility scoring
 *  - Gale-Shapley stable matching for "who to surface"
 *  - Solana on-chain reputation as an anti-bot + trust signal (our edge)
 */

// ---- 1. Elo desirability ----------------------------------------------------
export const ELO_K = 32;
export const DEFAULT_ELO = 1400;

/** Expected score of A vs B (logistic). */
export function expectedScore(eloA, eloB) {
  return 1 / (1 + Math.pow(10, (eloB - eloA) / 400));
}

/**
 * Update Elo after a swipe.
 * A right-swipe means the swiper "endorsed" the target -> target gains,
 * weighted by how desirable the swiper themselves is (a like from a
 * high-Elo user is worth more).
 */
export function updateElo(targetElo, swiperElo, liked) {
  const expected = expectedScore(targetElo, swiperElo);
  const actual = liked ? 1 : 0;
  return Math.round(targetElo + ELO_K * (actual - expected));
}

// ---- 2. On-chain reputation -------------------------------------------------
/**
 * Derive a 0-100 trust/quality score from wallet signals.
 * This is Grap3's moat: bots can't fake aged, active, asset-holding wallets.
 */
export function onChainScore({ walletAgeDays = 0, txCount = 0, nftCount = 0, solBalance = 0, isSeeker = false } = {}) {
  const age = Math.min(walletAgeDays / 365, 1) * 30;        // up to 30
  const activity = Math.min(txCount / 500, 1) * 25;          // up to 25
  const assets = Math.min(nftCount / 20, 1) * 15;            // up to 15
  const balance = Math.min(solBalance / 50, 1) * 15;         // up to 15
  const seeker = isSeeker ? 15 : 0;                          // Seeker bonus 15
  return Math.round(age + activity + assets + balance + seeker);
}

// ---- 3. Compatibility scoring ----------------------------------------------
const WEIGHTS = {
  interests: 0.30,
  distance: 0.20,
  age: 0.15,
  reputation: 0.20,
  activity: 0.15,
};

function jaccard(a = [], b = []) {
  const A = new Set(a.map((s) => s.toLowerCase()));
  const B = new Set(b.map((s) => s.toLowerCase()));
  if (A.size === 0 && B.size === 0) return 0;
  const inter = [...A].filter((x) => B.has(x)).length;
  const union = new Set([...A, ...B]).size;
  return inter / union;
}

function ageScore(a, b, prefRange = 8) {
  if (a == null || b == null) return 0.5;
  const diff = Math.abs(a - b);
  return Math.max(0, 1 - diff / prefRange);
}

function distanceScore(km, maxKm = 100) {
  if (km == null) return 0.5;
  return Math.max(0, 1 - km / maxKm);
}

function activityScore(lastActiveHours = 999) {
  return Math.max(0, 1 - Math.min(lastActiveHours / 168, 1)); // decays over a week
}

/**
 * Compute a 0-1 compatibility score between viewer and candidate.
 * Returns score + breakdown for transparency / debugging.
 */
export function compatibility(viewer, candidate, ctx = {}) {
  const interests = jaccard(viewer.tags, candidate.tags);
  const distance = distanceScore(ctx.distanceKm, viewer.maxDistanceKm);
  const age = ageScore(viewer.age, candidate.age, viewer.agePrefRange);
  const reputation = (candidate.onChainScore ?? 0) / 100;
  const activity = activityScore(ctx.lastActiveHours);

  const score =
    interests * WEIGHTS.interests +
    distance * WEIGHTS.distance +
    age * WEIGHTS.age +
    reputation * WEIGHTS.reputation +
    activity * WEIGHTS.activity;

  return {
    score: Math.round(score * 1000) / 1000,
    breakdown: { interests, distance, age, reputation, activity },
  };
}

// ---- 4. Ranked feed ---------------------------------------------------------
/**
 * Rank candidates for a viewer. Blends compatibility with a mild Elo band
 * (people tend to match within a similar desirability range) and adds a small
 * exploration term so new/low-Elo users still get exposure (anti-rich-get-richer).
 */
export function rankFeed(viewer, candidates, ctxById = {}) {
  const viewerElo = viewer.elo ?? DEFAULT_ELO;
  return candidates
    .map((c) => {
      const ctx = ctxById[c.id] ?? {};
      const { score, breakdown } = compatibility(viewer, c, ctx);
      const eloGap = Math.abs((c.elo ?? DEFAULT_ELO) - viewerElo);
      const eloAffinity = Math.max(0, 1 - eloGap / 600); // closer Elo -> higher
      const exploration = Math.random() * 0.08;          // serendipity
      const final = score * 0.7 + eloAffinity * 0.22 + exploration;
      return { ...c, matchScore: Math.round(final * 1000) / 1000, breakdown };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

// ---- 5. Gale-Shapley stable matching ---------------------------------------
/**
 * Given mutual-interest preference lists, produce stable pairings.
 * proposers/receivers: { id: [orderedCandidateIds] }
 * Returns Map<proposerId, receiverId>.
 */
export function stableMatch(proposerPrefs, receiverPrefs) {
  const free = new Set(Object.keys(proposerPrefs));
  const next = {}; // proposer -> index of next to propose
  const engaged = new Map(); // receiver -> proposer
  const rank = {}; // receiver -> { proposerId: rankIndex }

  for (const r of Object.keys(receiverPrefs)) {
    rank[r] = {};
    receiverPrefs[r].forEach((p, i) => (rank[r][p] = i));
  }

  while (free.size > 0) {
    const p = free.values().next().value;
    const prefs = proposerPrefs[p] || [];
    const i = next[p] ?? 0;
    if (i >= prefs.length) { free.delete(p); continue; }
    next[p] = i + 1;
    const r = prefs[i];
    if (rank[r] == null || rank[r][p] == null) continue; // not mutual
    const current = engaged.get(r);
    if (current == null) {
      engaged.set(r, p); free.delete(p);
    } else if (rank[r][p] < rank[r][current]) {
      engaged.set(r, p); free.delete(p); free.add(current);
    }
  }

  const result = new Map();
  for (const [r, p] of engaged) result.set(p, r);
  return result;
}
