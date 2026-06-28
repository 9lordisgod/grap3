import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { Screen } from '../components/ui/Screen';
import { AVATARS } from '../constants/avatars';
import { colors, spacing, typography, radii } from '../theme/theme';

const CONVOS = [
  { id: '1', name: 'Nova', photo: AVATARS.nova, last: 'coffee after the keynote?', ts: 'now', unread: true },
  { id: '2', name: 'Lumi', photo: AVATARS.lumi, last: 'sounds perfect', ts: 'Tue', unread: false },
  { id: '3', name: 'Sol', photo: AVATARS.sol, last: 'matched yesterday', ts: 'Mon', unread: false },
];

export function MatchesScreen({ onOpenChat }: { onOpenChat?: (name: string) => void }) {
  return (
    <Screen style={styles.root}>
      <Text style={styles.label}>Inbox</Text>
      <Text style={styles.header}>Matches</Text>
      <FlatList
        data={CONVOS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => onOpenChat?.(item.name)}>
            <Image source={{ uri: item.photo }} style={styles.avatar} />
            <View style={styles.body}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.last} numberOfLines={1}>{item.last}</Text>
            </View>
            <View style={styles.meta}>
              <Text style={styles.ts}>{item.ts}</Text>
              {item.unread && <View style={styles.unread} />}
            </View>
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { paddingTop: spacing.lg, paddingBottom: 72 },
  label: { fontSize: 10, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', color: colors.textMuted, paddingHorizontal: spacing.md },
  header: { ...typography.display, color: colors.textPrimary, paddingHorizontal: spacing.md, marginTop: 4, marginBottom: spacing.md },
  list: { paddingHorizontal: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 50, height: 50, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border },
  body: { flex: 1 },
  name: { ...typography.label, color: colors.textPrimary, fontSize: 15 },
  last: { ...typography.caption, color: colors.textSecondary, marginTop: 3 },
  meta: { alignItems: 'flex-end', gap: 6 },
  ts: { fontSize: 10, color: colors.textMuted },
  unread: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
});