/**
 * Prisma client singleton. If DATABASE_URL is unset or Prisma client isn't
 * generated yet, db stays null and routes fall back to demo data — so the API
 * boots cleanly in any environment (CI, fresh clone, etc.).
 */
let prisma = null;
try {
  if (process.env.DATABASE_URL) {
    const { PrismaClient } = await import('@prisma/client');
    prisma = new PrismaClient();
  }
} catch {
  prisma = null; // client not generated yet
}
export const db = prisma;
export const hasDb = !!prisma;
