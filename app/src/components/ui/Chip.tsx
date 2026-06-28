import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, typography } from '../../theme/theme';

export function Chip({ label }: { label: string; accent?: boolean }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: { color: colors.textSecondary, ...typography.caption },
});