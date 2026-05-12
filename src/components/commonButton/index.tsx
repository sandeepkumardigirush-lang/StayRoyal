import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';
import { Search } from 'lucide-react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  width?: number | `${number}%`;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  search?: boolean;
  colors?: string[];
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  width = '100%',
  loading = false,
  disabled = false,
  style,
  textStyle,
  search,
  colors
}) => {
  const buttonColors = colors || [COLORS.PURPLE1, COLORS.PURPLE2, COLORS.PURPLE3];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[{ width }, style]}
    >
      <LinearGradient
        colors={disabled ? [COLORS.DISABLED_GRAY, COLORS.DISABLED_GRAY] : buttonColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, disabled && styles.disabled]}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.WHITE} />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(8) }}>
            {search && <Search size={scale(18)} color={COLORS.WHITE} style={{ marginRight: scale(0) }} />}
            <Text style={[styles.text, { color: COLORS.WHITE }, textStyle]}>{title}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    height: verticalScale(42),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.WHITE,
    fontSize: moderateScale(16),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  disabled: {
  },
});
