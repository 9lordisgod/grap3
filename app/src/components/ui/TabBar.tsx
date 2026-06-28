import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, typography, layout } from '../../theme/theme';

export type TabKey = 'discover' | 'matches' | 'profile';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'discover', label: 'Discover' },
  { key: 'matches', label: 'Matches' },
  { key: 'profile', label: 'Profile' },
];

export function TabBar({
  active,
  onChange,
  badge,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  badge?: number;
}) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        const showBadge = tab.key === 'matches' && badge && badge > 0;
        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            {showBadge && <View style={styles.dot} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: layout.tabBarHeight,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { ...typography.caption, color: colors.textMuted, fontWeight: '500' },
  labelActive: { color: colors.accent, fontWeight: '600' },
  dot: {
    position: 'absolute',
    top: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
});