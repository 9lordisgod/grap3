import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform, Image,
} from 'react-native';
import { Screen } from '../components/ui/Screen';
import { AVATARS } from '../constants/avatars';
import { colors, spacing, typography, radii } from '../theme/theme';

type Msg = { id: string; text: string; mine: boolean; ts: string };

const SEED: Msg[] = [
  { id: '1', text: 'hey — we matched at 94%', mine: false, ts: '09:12' },
  { id: '2', text: 'on-chain score checks out', mine: true, ts: '09:13' },
  { id: '3', text: 'coffee at the afterparty?', mine: false, ts: '09:15' },
];

export function ChatScreen({ name = 'Nova', onBack }: { name?: string; onBack?: () => void }) {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [text, setText] = useState('');

  function send() {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: String(Date.now()), text: text.trim(), mine: true, ts: 'now' }]);
    setText('');
  }

  return (
    <Screen>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Pressable onPress={onBack}><Text style={styles.back}>←</Text></Pressable>
          <Image source={{ uri: AVATARS.nova }} style={styles.avatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.status}>Active now · Trust 92</Text>
          </View>
        </View>

        <Text style={styles.e2e}>End-to-end encrypted · wallet-key secured</Text>

        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.row, item.mine ? styles.rowMine : styles.rowTheirs]}>
              <View style={[styles.bubble, item.mine ? styles.mine : styles.theirs]}>
                <Text style={[styles.msg, item.mine && styles.msgMine]}>{item.text}</Text>
              </View>
              <Text style={styles.ts}>{item.ts}</Text>
            </View>
          )}
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Write a message"
            placeholderTextColor={colors.textMuted}
            value={text}
            onChangeText={setText}
            onSubmitEditing={send}
          />
          <Pressable onPress={send} style={styles.sendBtn}>
            <Text style={styles.sendLabel}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingTop: spacing.lg, paddingHorizontal: spacing.md, paddingBottom: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  back: { color: colors.textSecondary, fontSize: 20, paddingRight: 4 },
  avatar: { width: 38, height: 38, borderRadius: 19 },
  headerInfo: { flex: 1 },
  name: { ...typography.title, color: colors.textPrimary, fontSize: 16 },
  status: { fontSize: 11, color: colors.accent, marginTop: 2 },
  e2e: { textAlign: 'center', fontSize: 10, color: colors.textMuted, paddingVertical: spacing.sm },
  list: { flex: 1 },
  listContent: { padding: spacing.md, gap: spacing.sm },
  row: { maxWidth: '78%' },
  rowMine: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  rowTheirs: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { padding: 12, borderRadius: radii.md },
  mine: { backgroundColor: colors.accent },
  theirs: { backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.border },
  msg: { ...typography.body, color: colors.textPrimary, fontSize: 14 },
  msgMine: { color: colors.onAccent },
  ts: { fontSize: 9, color: colors.textMuted, marginTop: 3, paddingHorizontal: 4 },
  inputBar: {
    flexDirection: 'row', gap: spacing.sm, alignItems: 'center',
    padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border,
  },
  input: {
    flex: 1, backgroundColor: colors.surface, borderRadius: radii.md,
    paddingHorizontal: spacing.md, paddingVertical: 12, color: colors.textPrimary,
    borderWidth: 1, borderColor: colors.border, fontSize: 14,
  },
  sendBtn: { backgroundColor: colors.accent, paddingHorizontal: 14, paddingVertical: 10, borderRadius: radii.sm },
  sendLabel: { ...typography.caption, color: colors.onAccent, fontWeight: '700' },
});