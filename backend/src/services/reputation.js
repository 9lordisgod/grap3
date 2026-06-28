/**
 * On-chain reputation service.
 * Pulls wallet signals from Solana RPC and converts them into a trust score.
 * This is Grap3's anti-bot moat.
 */
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { onChainScore } from './matchingEngine.js';

const RPC = process.env.SOLANA_RPC || 'https://api.devnet.solana.com';

/** Fetch raw wallet signals from chain. */
export async function fetchWalletSignals(pubkey, { isSeeker = false } = {}) {
  const conn = new Connection(RPC, 'confirmed');
  const owner = new PublicKey(pubkey);

  const [balanceLamports, sigs, tokenAccounts] = await Promise.all([
    conn.getBalance(owner),
    conn.getSignaturesForAddress(owner, { limit: 1000 }),
    conn.getParsedTokenAccountsByOwner(owner, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    }),
  ]);

  // Oldest signature timestamp -> wallet age
  let walletAgeDays = 0;
  if (sigs.length > 0) {
    const oldest = sigs[sigs.length - 1];
    if (oldest.blockTime) {
      walletAgeDays = (Date.now() / 1000 - oldest.blockTime) / 86400;
    }
  }

  // Count NFT-like accounts (amount 1, decimals 0)
  const nftCount = tokenAccounts.value.filter((a) => {
    const info = a.account.data.parsed.info.tokenAmount;
    return info.decimals === 0 && info.uiAmount === 1;
  }).length;

  return {
    walletAgeDays,
    txCount: sigs.length,
    nftCount,
    solBalance: balanceLamports / LAMPORTS_PER_SOL,
    isSeeker,
  };
}

/** Full reputation: signals -> 0-100 score. */
export async function computeReputation(pubkey, opts = {}) {
  try {
    const signals = await fetchWalletSignals(pubkey, opts);
    return { score: onChainScore(signals), signals };
  } catch (e) {
    return { score: 0, signals: null, error: String(e) };
  }
}
