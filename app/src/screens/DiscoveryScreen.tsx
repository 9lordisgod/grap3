import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Screen } from '../components/ui/Screen';
import { SwipeDeck, Profile } from '../components/SwipeDeck';
import { ActionButton } from '../components/ui/ActionButton';
import { AVATARS } from '../constants/avatars';
import { colors, spacing, typography } from '../theme/theme';

const PROFILES: Profile[] = [
  {
    id: '1', name: 'Nova', age: 27,
    bio: 'Solana dev · DeFi native · Seeker owner',
    tags: ['DeFi', 'Anchor', 'Seeker'],
    photo: AVATARS.nova, onChainScore: 92, matchScore: 0.94,
  },
  {
    id: '2', name: 'Lumi', age: 25,
    bio: 'Trading & DAOs · NYC',
    tags: ['Trading', 'DAOs'],
    photo: AVATARS.lumi, onChainScore: 88, matchScore: 0.89,
  },
  {
    id: '3', name: 'Sol', age: 30,
    bio: 'NFT artist · on-chain creative',
    tags: ['NFTs', 'Art'],
    photo: AVATARS.sol, onChainScore: 81, matchScore: 0.84,
  },
];

export function DiscoveryScreen({ onMatch }: { onMatch?: (profile: Profile) => void }) {
  function handleSwipe(profile: Profile, direction: 'like' | 'pass' | 'superlike') {
    if (direction === 'like' && profile.id === '1') onMatch?.(profile);
    if (direction === 'superlike') Alert.alert('Super like sent', `${profile.name} will see you first.`);
  }

  return (
    <Screen style={styles.root}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Discover</Text>
          <Text style={styles.title}>Tonight</Text>
        </View>
        <View style={styles.counter}>
          <Text style={styles.counterLabel}>Left</Text>
          <Text style={styles.counterVal}>{PROFILES.length}</Text>
        </View>
      </View>
      <View style={styles.deck}>
        <SwipeDeck data={PROFILES} onSwipe={handleSwipe} />
      </View>
      <View style={styles.actions}>
        <ActionButton kind="pass" />
        <ActionButton kind="super" />
        <ActionButton kind="like" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: 72 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: spacing.md },
  label: { fontSize: 10, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', color: colors.textMuted },
  title: { ...typography.display, color: colors.textPrimary, marginTop: 2 },
  counter: { alignItems: 'flex-end' },
  counterLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', color: colors.textMuted },
  counterVal: { ...typography.display, color: colors.accent, fontSize: 22 },
  deck: { flex: 1 },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg, paddingVertical: spacing.md },
});