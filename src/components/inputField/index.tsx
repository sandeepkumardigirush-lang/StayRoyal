import React, { useState, useEffect, memo } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';
import { Eye, EyeOff } from 'lucide-react-native';

const LABEL_TOP_INITIAL = scale(18);
const LABEL_TOP_FOCUSED = scale(6);
const LABEL_SIZE_INITIAL = moderateScale(14);
const LABEL_SIZE_FOCUSED = moderateScale(11);

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  style,
  placeholder,
  value,
  onFocus,
  onBlur,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const animatedValue = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    animatedValue.value = withTiming(value ? 1 : 0, { duration: 200 });
  }, [value]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    animatedValue.value = withTiming(1, { duration: 200 });
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!value) {
      animatedValue.value = withTiming(0, { duration: 200 });
    }
    if (onBlur) onBlur(e);
  };

  const labelStyle = useAnimatedStyle(() => {
    return {
      top: animatedValue.value === 1 ? LABEL_TOP_FOCUSED : LABEL_TOP_INITIAL,
      fontSize:
        animatedValue.value === 1 ? LABEL_SIZE_FOCUSED : LABEL_SIZE_INITIAL,
      color: error
        ? COLORS.RED
        : animatedValue.value === 1
          ? COLORS.GRAY
          : '#999',
      fontWeight: error ? '700' : '500',
    };
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          isFocused && { borderColor: COLORS.BLACK, borderWidth: 1 },
          error ? styles.errorInput : null,
        ]}
      >
        <Animated.Text style={[styles.floatingLabel, labelStyle]}>
          {placeholder}
        </Animated.Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, style]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            {...props}
          />
          {secureTextEntry && (
            <Pressable
              onPress={togglePasswordVisibility}
              style={styles.eyeIcon}
              hitSlop={10}
            >
              {isPasswordVisible ? (
                <EyeOff size={scale(18)} color={COLORS.GRAY} />
              ) : (
                <Eye size={scale(18)} color={COLORS.GRAY} />
              )}
            </Pressable>
          )}
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default memo(InputField);

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(6),
    width: '100%',
  },
  inputWrapper: {
    height: scale(54),
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    justifyContent: 'flex-end',
    paddingBottom: scale(6),
    position: 'relative',
    backgroundColor: COLORS.WHITE,
  },
  floatingLabel: {
    position: 'absolute',
    left: scale(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: moderateScale(15),
    color: COLORS.BLACK,
    height: scale(32),
    padding: 0,
    margin: 0,
    flex: 1,
  },
  eyeIcon: {
    paddingLeft: scale(8),
    height: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorInput: {
    borderColor: COLORS.RED,
    borderWidth: 1.2,
  },
  errorText: {
    marginTop: scale(4),
    fontSize: scale(12),
    color: COLORS.RED,
    paddingLeft: scale(4),
    fontWeight: '500',
  },
});
