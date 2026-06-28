import React from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable } from 'react-native';
import { GradientButton } from './GradientButton';
import { colors, spacing, typography } from '../../theme/theme';

export function MatchModal({
  visible,
  name,
  photo,
  myPhoto,
  score,
  onMessage,
  onKeepSwiping,
}: {
  visible: boolean;
  name: string;
  photo: string;
  myPhoto?: string;
  score: number;
  onMessage: () => void;
  onKeepSwiping: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Match</Text>
          <Text style={styles.subtitle}>You and {name}</Text>

          <View style={styles.avatars}>
            {myPhoto && (
              <View style={styles.avatarWrap}>
                <Image source={{ uri: myPhoto }} style={styles.avatar} resizeMode="cover" />
              </View>
            )}
            <View style={[styles.avatarWrap, styles.avatarOverlap]}>
              <Image source={{ uri: photo }} style={styles.avatar} resizeMode="cover" />
            </View>
          </View>

          <Text style={styles.score}>{Math.round(score * 100)}% compatible</Text>

          <GradientButton label="Message" onPress={onMessage} style={styles.cta} />
          <Pressable onPress={onKeepSwiping}>
            <Text style={styles.skip}>Keep browsing</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', padding: spacing.lg },
  content: { alignItems: 'center' },
  title: { ...typography.hero, color: colors.textPrimary },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.sm },
  avatars: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.xl },
  avatarWrap: {
    width: 88, height: 88, borderRadius: 44, overflow: 'hidden',
    borderWidth: 2, borderColor: colors.border, backgroundColor: colors.surface,
  },
  avatarOverlap: { marginLeft: -12 },
  avatar: { width: '100%', height: '100%' },
  score: { ...typography.label, color: colors.accent, marginBottom: spacing.xl },
  cta: { width: '100%' },
  skip: { ...typography.caption, color: colors.textMuted, marginTop: spacing.md, textAlign: 'center' },
});