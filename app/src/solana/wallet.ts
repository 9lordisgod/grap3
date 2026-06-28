/**
 * Grap3 wallet layer.
 * Wraps Solana Mobile Wallet Adapter (MWA) for Seeker / Seed Vault sign-in.
 */
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { PublicKey } from '@solana/web3.js';

export const APP_IDENTITY = {
  name: 'Grap3',
  uri: 'https://grap3.dating',
  icon: 'favicon.ico',
};

export const CHAIN = 'solana:devnet'; // switch to solana:mainnet-beta for prod

export interface AuthResult {
  publicKey: string;
  authToken: string;
  label?: string;
}

/** Connect & authorize a wallet (Seed Vault on Seeker). */
export async function connectWallet(): Promise<AuthResult> {
  return await transact(async (wallet) => {
    const auth = await wallet.authorize({
      chain: CHAIN,
      identity: APP_IDENTITY,
    });
    const account = auth.accounts[0];
    return {
      publicKey: new PublicKey(
        Buffer.from(account.address, 'base64')
      ).toBase58(),
      authToken: auth.auth_token,
      label: account.label,
    };
  });
}

/** Sign a login challenge to prove wallet ownership (SIWS-style). */
export async function signLoginMessage(
  authToken: string,
  nonce: string
): Promise<string> {
  const message = new TextEncoder().encode(
    `Grap3 login\nNonce: ${nonce}`
  );
  return await transact(async (wallet) => {
    await wallet.reauthorize({ auth_token: authToken, identity: APP_IDENTITY });
    const signed = await wallet.signMessages({
      addresses: [],
      payloads: [message],
    });
    return Buffer.from(signed[0]).toString('base64');
  });
}
