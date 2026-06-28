import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { GradientButton } from './GradientButton';
import { colors, radii, spacing, typography } from '../../theme/theme';

const PLANS = [
  { name: 'Plus', price: '$7.99/mo', detail: 'Unlimited likes · see who liked you' },
  { name: 'Gold', price: '$14.99/mo', detail: 'Priority discovery · travel mode' },
];

export function PremiumSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
  berries?: number;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Upgrade</Text>
          <Text style={styles.subtitle}>Pay with USDC or SOL</Text>
          {PLANS.map((p) => (
            <View key={p.name} style={styles.plan}>
              <Text style={styles.planName}>{p.name}</Text>
              <Text style={styles.planPrice}>{p.price}</Text>
              <Text style={styles.planDetail}>{p.detail}</Text>
            </View>
          ))}
          <GradientButton label="Pay with wallet" onPress={onClose} />
          <GradientButton label="Not now" onPress={onClose} variant="ghost" />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.7)' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.sm,
  },
  title: { ...typography.display, color: colors.textPrimary },
  subtitle: { ...typography.caption, color: colors.textMuted, marginBottom: spacing.sm },
  plan: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  planName: { ...typography.label, color: colors.textPrimary },
  planPrice: { ...typography.title, color: colors.accent, marginTop: 4 },
  planDetail: { ...typography.caption, color: colors.textSecondary, marginTop: 4 },
});