/**
 * Grap3 — Seeker OS theme
 * Matches Solana Mobile: true black, #14F195 accent, pink grape glow.
 * @see https://solanamobile.com/
 */

export const colors = {
  bg: '#000000',
  surface: '#111111',
  surfaceElevated: '#1A1A1A',

  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',

  accent: '#14F195',
  accentMuted: 'rgba(20,241,149,0.12)',
  accentDim: 'rgba(20,241,149,0.55)',

  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.55)',
  textMuted: 'rgba(255,255,255,0.32)',

  danger: '#FF453A',
  onAccent: '#000000',

  // legacy aliases
  solanaGreen: '#14F195',
  solanaPurple: '#14F195',
  glow: '#FF3D8A',
  grap3: '#14F195',
  glass: 'rgba(255,255,255,0.04)',
  glassBorder: 'rgba(255,255,255,0.08)',
  glassBorderStrong: 'rgba(255,255,255,0.14)',
  success: '#14F195',
  grape: '#14F195',
};

export const gradients = {
  solana: ['#14F195', '#14F195'] as const,
  grap3: ['#14F195', '#14F195'] as const,
  surface: ['#111111', '#111111'] as const,
  glow: ['transparent', 'transparent'] as const,
  hero: ['transparent', 'transparent'] as const,
};

export const radii = { xs: 6, sm: 10, md: 14, lg: 18, xl: 22, pill: 999 };

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };

export const typography = {
  hero: { fontSize: 34, fontWeight: '700' as const, letterSpacing: -0.8 },
  display: { fontSize: 26, fontWeight: '700' as const, letterSpacing: -0.5 },
  title: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  label: { fontSize: 14, fontWeight: '600' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
};

export const layout = {
  screenPadding: spacing.md,
  tabBarHeight: 56,
};

export const theme = { colors, gradients, radii, spacing, typography, layout };
export type Theme = typeof theme;