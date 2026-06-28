import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { radii, colors, typography } from '../../theme/theme';

type Variant = 'primary' | 'secondary' | 'ghost';

export function GradientButton({
  label,
  onPress,
  style,
  variant = 'primary',
  loading = false,
  disabled = false,
}: {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        style,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.onAccent : colors.accent} />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'primary' && styles.labelPrimary,
            variant === 'secondary' && styles.labelSecondary,
            variant === 'ghost' && styles.labelGhost,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 15, paddingHorizontal: 24, borderRadius: radii.pill, alignItems: 'center' },
  primary: { backgroundColor: colors.accent },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.borderStrong },
  ghost: { backgroundColor: 'transparent' },
  label: { ...typography.label, fontSize: 15 },
  labelPrimary: { color: colors.onAccent },
  labelSecondary: { color: colors.textPrimary },
  labelGhost: { color: colors.textSecondary },
  disabled: { opacity: 0.45 },
});