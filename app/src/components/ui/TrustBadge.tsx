import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, typography } from '../../theme/theme';

export function TrustBadge({ score }: { score: number; compact?: boolean }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.accentMuted,
  },
  text: { color: colors.accent, ...typography.caption, fontWeight: '700' },
});