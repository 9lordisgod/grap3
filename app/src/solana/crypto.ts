/**
 * End-to-end encryption for Grap3 chat.
 * Uses NaCl box (Curve25519 + XSalsa20-Poly1305). Each user holds an X25519
 * keypair; messages are sealed to the recipient's public key. The server only
 * ever sees ciphertext.
 *
 * NOTE: install `tweetnacl` + `tweetnacl-util` in the app for production:
 *   npm i tweetnacl tweetnacl-util --legacy-peer-deps
 */
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

export interface KeyPair {
  publicKey: string;  // base64
  secretKey: string;  // base64 (store in Seed Vault / secure storage, NEVER server)
}

export function generateKeyPair(): KeyPair {
  const kp = nacl.box.keyPair();
  return {
    publicKey: util.encodeBase64(kp.publicKey),
    secretKey: util.encodeBase64(kp.secretKey),
  };
}

export interface SealedMessage {
  nonce: string;       // base64
  ciphertext: string;  // base64
}

/** Encrypt a message to a recipient's public key. */
export function encryptMessage(
  plaintext: string,
  recipientPublicKey: string,
  senderSecretKey: string
): SealedMessage {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const box = nacl.box(
    util.decodeUTF8(plaintext),
    nonce,
    util.decodeBase64(recipientPublicKey),
    util.decodeBase64(senderSecretKey)
  );
  return { nonce: util.encodeBase64(nonce), ciphertext: util.encodeBase64(box) };
}

/** Decrypt a message from a sender's public key. */
export function decryptMessage(
  sealed: SealedMessage,
  senderPublicKey: string,
  recipientSecretKey: string
): string | null {
  const opened = nacl.box.open(
    util.decodeBase64(sealed.ciphertext),
    util.decodeBase64(sealed.nonce),
    util.decodeBase64(senderPublicKey),
    util.decodeBase64(recipientSecretKey)
  );
  return opened ? util.encodeUTF8(opened) : null;
}
