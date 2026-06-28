import React from 'react';
import { Image, View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/theme';

const logoSource = require('../../assets/logo.png');

type Props = {
  size?: number;
  boxed?: boolean;
  style?: ViewStyle;
};

export function Grap3Logo({ size = 56, boxed = false, style }: Props) {
  const radius = size * 0.21875;

  if (boxed) {
    return (
      <View
        style={[
          styles.box,
          {
            width: size,
            height: size,
            borderRadius: radius,
            shadowRadius: size * 0.22,
          },
          style,
        ]}
      >
        <Image source={logoSource} style={{ width: size, height: size }} resizeMode="cover" />
      </View>
    );
  }

  return (
    <Image
      source={logoSource}
      style={[{ width: size, height: size, borderRadius: radius }, style]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: colors.glow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    elevation: 4,
  },
});