import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii } from '../../theme/theme';

type Kind = 'pass' | 'super' | 'like';

const CONFIG: Record<Kind, { label: string; color: string }> = {
  pass: { label: '×', color: colors.danger },
  super: { label: '↑', color: colors.textSecondary },
  like: { label: '♥', color: colors.accent },
};

export function ActionButton({ kind, onPress, style }: { kind: Kind; onPress?: () => void; style?: ViewStyle }) {
  const cfg = CONFIG[kind];
  return (
    <Pressable onPress={onPress} style={[styles.btn, { borderColor: cfg.color }, style]}>
      <Text style={[styles.icon, { color: cfg.color }]}>{cfg.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 52,
    height: 52,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: colors.surface,
  },
  icon: { fontSize: 20, fontWeight: '600' },
});