import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../components/ui/Screen';
import { GradientButton } from '../components/ui/GradientButton';
import { Grap3Logo } from '../components/Grap3Logo';
import { connectWallet } from '../solana/wallet';
import { colors, spacing, typography } from '../theme/theme';

export function OnboardingScreen({ onAuthed }: { onAuthed: (pk: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect() {
    try {
      setLoading(true);
      setError(null);
      const res = await connectWallet();
      onAuthed(res.publicKey);
    } catch (e: any) {
      setError(e?.message ?? 'Wallet connection failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen style={styles.root}>
      <View style={styles.hero}>
        <Grap3Logo size={64} boxed />
        <Text style={styles.brand}>Grap3</Text>
        <Text style={styles.tagline}>Dating on Solana Seeker</Text>
        <View style={styles.pill}>
          <View style={styles.pillDot} />
          <Text style={styles.pillText}>Seed Vault ready</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <GradientButton label="Connect wallet" onPress={handleConnect} loading={loading} />
        {error && <Text style={styles.error}>{error}</Text>}
        <Text style={styles.hint}>No password needed — just your Seeker wallet.</Text>
        <Text style={styles.legal}>18+ only</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { justifyContent: 'space-between' },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, gap: spacing.sm },
  brand: { ...typography.hero, color: colors.textPrimary, marginTop: spacing.sm },
  tagline: { ...typography.body, color: colors.textSecondary },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
    backgroundColor: colors.accentMuted, borderWidth: 1, borderColor: 'rgba(20,241,149,0.2)',
  },
  pillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  pillText: { fontSize: 11, fontWeight: '600', color: colors.accent },
  footer: { padding: spacing.lg, gap: spacing.sm },
  hint: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
  error: { color: colors.danger, textAlign: 'center', ...typography.caption },
  legal: { ...typography.caption, color: colors.textMuted, textAlign: 'center' },
});