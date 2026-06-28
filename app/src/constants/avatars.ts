/**
 * Demo portraits — Unsplash (free license, model-released stock).
 * Headshot-oriented IDs — crop well in circles & cards.
 * @see https://unsplash.com/license
 */
const portrait = (id: string, size = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${size}&h=${size}&q=85`;

export const AVATARS = {
  /** Handsome caucasian male — front-facing headshot */
  me: portrait('photo-1507003211169-0a1dd7228f2d'),
  /** Beautiful caucasian female — primary match */
  nova: portrait('photo-1494790108377-be9c29b29330'),
  /** Beautiful caucasian female — secondary match */
  lumi: portrait('photo-1488426862026-3ee34a7d66df'),
  /** Handsome caucasian male — discovery profile */
  sol: portrait('photo-1500648767791-00dcc994a43e'),
} as const;

/** Taller crop for full swipe cards */
export const AVATARS_CARD = {
  me: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&h=900&q=85&crop=entropy`,
  nova: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&h=900&q=85&crop=entropy`,
  lumi: `https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&h=900&q=85&crop=entropy`,
  sol: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&h=900&q=85&crop=entropy`,
} as const;