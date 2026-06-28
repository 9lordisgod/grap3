import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, runOnJS, interpolate, Extrapolation,
} from 'react-native-reanimated';
import { TrustBadge } from './ui/TrustBadge';
import { Chip } from './ui/Chip';
import { colors, radii, spacing, typography } from '../theme/theme';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.28;

export type Profile = {
  id: string; name: string; age: number; bio?: string;
  tags: string[]; photo: string; onChainScore: number; matchScore?: number;
};

export function SwipeDeck({ data, onSwipe }: { data: Profile[]; onSwipe?: (p: Profile, dir: 'like' | 'pass' | 'superlike') => void }) {
  const [index, setIndex] = useState(0);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  const advance = useCallback((dir: 'like' | 'pass' | 'superlike') => {
    const p = data[index];
    if (p && onSwipe) onSwipe(p, dir);
    setIndex((i) => i + 1);
    tx.value = 0; ty.value = 0;
  }, [index, data, onSwipe, tx, ty]);

  const pan = Gesture.Pan()
    .onUpdate((e) => { tx.value = e.translationX; ty.value = e.translationY; })
    .onEnd((e) => {
      if (e.translationX > SWIPE_THRESHOLD) {
        tx.value = withSpring(width * 1.5);
        runOnJS(advance)('like');
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        tx.value = withSpring(-width * 1.5);
        runOnJS(advance)('pass');
      } else if (e.translationY < -SWIPE_THRESHOLD) {
        ty.value = withSpring(-width * 1.5);
        runOnJS(advance)('superlike');
      } else {
        tx.value = withSpring(0); ty.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value }, { translateY: ty.value },
      { rotate: `${interpolate(tx.value, [-width, width], [-8, 8], Extrapolation.CLAMP)}deg` },
    ],
  }));

  if (index >= data.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No more profiles</Text>
        <Text style={styles.emptySub}>Check back later</Text>
      </View>
    );
  }

  const profile = data[index];

  return (
    <View style={styles.wrap}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.card, cardStyle]}>
          <Image source={{ uri: profile.photo }} style={StyleSheet.absoluteFill} />
          <View style={styles.shade} />
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>Trust </Text>
            <TrustBadge score={profile.onChainScore} />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{profile.name}<Text style={styles.age}>, {profile.age}</Text></Text>
            {profile.bio && <Text style={styles.bio} numberOfLines={2}>{profile.bio}</Text>}
            <View style={styles.tags}>
              {profile.tags.map((t) => <Chip key={t} label={t} />)}
            </View>
            {profile.matchScore != null && (
              <Text style={styles.match}>{Math.round(profile.matchScore * 100)}% compatible</Text>
            )}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  card: { flex: 1, borderRadius: radii.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderStrong },
  shade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  badge: { position: 'absolute', top: spacing.md, right: spacing.md, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.5)', paddingLeft: 8, paddingRight: 4, paddingVertical: 4, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border },
  badgeLabel: { fontSize: 10, fontWeight: '700', color: colors.accent },
  info: { position: 'absolute', bottom: spacing.lg, left: spacing.md, right: spacing.md },
  name: { ...typography.display, color: colors.textPrimary, fontSize: 24 },
  age: { fontWeight: '400', color: colors.textSecondary },
  bio: { ...typography.body, color: colors.textSecondary, marginTop: 5, fontSize: 13 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: spacing.sm },
  match: { ...typography.caption, color: colors.accent, marginTop: spacing.sm, fontWeight: '700' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
  emptyTitle: { ...typography.title, color: colors.textPrimary },
  emptySub: { ...typography.caption, color: colors.textMuted },
});