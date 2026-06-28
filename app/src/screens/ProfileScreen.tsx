import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Screen } from '../components/ui/Screen';
import { PremiumSheet } from '../components/ui/PremiumSheet';
import { AVATARS } from '../constants/avatars';
import { colors, spacing, typography, radii } from '../theme/theme';

function TrustBar({ label, score }: { label: string; score: number }) {
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${score}%` }]} />
      </View>
      <Text style={styles.barScore}>{score}</Text>
    </View>
  );
}

export function ProfileScreen({ wallet = '7xKq…3mPn' }: { wallet?: string }) {
  const [premiumOpen, setPremiumOpen] = useState(false);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.label}>Profile</Text>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: AVATARS.me }} style={styles.avatar} resizeMode="cover" />
        </View>
        <Text style={styles.name}>You</Text>
        <Text style={styles.wallet}>{wallet}</Text>
        <Text style={styles.verified}>On-chain verified</Text>

        <View style={styles.stats}>
          <View style={styles.stat}><Text style={styles.statVal}>92</Text><Text style={styles.statLbl}>Trust</Text></View>
          <View style={styles.stat}><Text style={styles.statVal}>24</Text><Text style={styles.statLbl}>Matches</Text></View>
          <View style={styles.stat}><Text style={styles.statVal}>1480</Text><Text style={styles.statLbl}>Elo</Text></View>
        </View>

        <View style={styles.trustCard}>
          <Text style={styles.cardTitle}>Trust signals</Text>
          <TrustBar label="Wallet age" score={84} />
          <TrustBar label="Activity" score={91} />
          <TrustBar label="Seeker" score={100} />
        </View>

        <Pressable style={styles.upgrade} onPress={() => setPremiumOpen(true)}>
          <Text style={styles.upgradeTitle}>Upgrade to Plus</Text>
          <Text style={styles.upgradeSub}>Unlimited likes · see who liked you</Text>
          <Text style={styles.upgradePrice}>$7.99/mo · USDC or SOL</Text>
        </Pressable>
      </ScrollView>
      <PremiumSheet visible={premiumOpen} onClose={() => setPremiumOpen(false)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { alignItems: 'center', padding: spacing.lg, paddingBottom: 80 },
  label: { fontSize: 10, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', color: colors.textMuted, alignSelf: 'flex-start', marginBottom: spacing.md },
  avatarWrap: {
    width: 100, height: 100, borderRadius: 50, overflow: 'hidden', marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface,
  },
  avatar: { width: '100%', height: '100%' },
  name: { ...typography.display, color: colors.textPrimary, fontSize: 22 },
  wallet: { fontSize: 12, color: colors.textMuted, marginTop: 4, fontFamily: 'monospace' },
  verified: { fontSize: 11, color: colors.accent, fontWeight: '600', marginTop: 6 },
  stats: { flexDirection: 'row', gap: spacing.xl, marginVertical: spacing.lg },
  stat: { alignItems: 'center' },
  statVal: { ...typography.display, color: colors.accent, fontSize: 24 },
  statLbl: { fontSize: 10, color: colors.textMuted, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  trustCard: {
    width: '100%', borderWidth: 1, borderColor: colors.border, borderRadius: radii.md,
    padding: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface,
  },
  cardTitle: { ...typography.label, color: colors.textPrimary, marginBottom: spacing.sm },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  barLabel: { width: 72, fontSize: 10, color: colors.textMuted },
  barTrack: { flex: 1, height: 4, backgroundColor: colors.surfaceElevated, borderRadius: radii.pill, overflow: 'hidden' },
  barFill: { height: 4, backgroundColor: colors.accent, borderRadius: radii.pill },
  barScore: { width: 24, textAlign: 'right', fontSize: 10, fontWeight: '600', color: colors.textSecondary },
  upgrade: {
    width: '100%', borderWidth: 1, borderColor: 'rgba(20,241,149,0.25)', borderRadius: radii.md,
    padding: spacing.md, backgroundColor: colors.accentMuted,
  },
  upgradeTitle: { ...typography.label, color: colors.textPrimary },
  upgradeSub: { ...typography.caption, color: colors.textSecondary, marginTop: 4 },
  upgradePrice: { ...typography.caption, color: colors.accent, fontWeight: '600', marginTop: 8 },
});