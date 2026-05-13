import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';
import CustomButton from '../../../../components/commonButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OtpStepProps {
  otpCode: string;
  setOtpCode: (value: string) => void;
  error: string | null;
  setError: (value: string | null) => void;
  maskedContactValue: string;
  otpLength: number;
  onContinue: () => void;
}

const OtpStep: React.FC<OtpStepProps> = ({
  otpCode,
  setOtpCode,
  error,
  setError,
  maskedContactValue,
  otpLength,
  onContinue,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.bodyWrapper}>
      <View style={styles.topContent}>
        <Text style={styles.title}>Confirm it's you</Text>
        <Text style={styles.subtitle}>We sent a code to {maskedContactValue}.</Text>

        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpHiddenInput}
            value={otpCode}
            onChangeText={value => {
              const next = value.replace(/\D/g, '').slice(0, otpLength);
              setOtpCode(next);
              setError(null);
            }}
            keyboardType="number-pad"
            autoFocus
            maxLength={otpLength}
          />
          {Array.from({ length: otpLength }, (_, idx) => {
            const char = otpCode[idx] || '';
            return (
              <View
                key={`otp-${idx}`}
                style={[styles.otpDigitBox, idx < otpCode.length && styles.otpDigitBoxActive]}
              >
                <Text style={styles.otpText}>{char}</Text>
              </View>
            );
          })}
        </View>

        {!!error && <Text style={styles.errorLabel}>{error}</Text>}

        <TouchableOpacity onPress={() => setOtpCode('')} style={styles.resendWrapper}>
          <Text style={styles.resendText}>
            Didn't get it? <Text style={styles.resendLink}>Send a new code</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.bottomActionArea, { paddingBottom: insets.bottom + scale(6) }]}>
        <CustomButton title="Continue" onPress={onContinue} />
      </View>
    </View>
  );
};

export default OtpStep;

const styles = StyleSheet.create({
  bodyWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  topContent: {
    width: '100%',
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: scale(10),
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: COLORS.GRAY,
    marginBottom: scale(22),
    textAlign: 'center',
    width: '100%',
  },
  otpContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(8),
    position: 'relative',
  },
  otpHiddenInput: {
    position: 'absolute',
    height: scale(56),
    width: '100%',
    opacity: 0,
    zIndex: 5,
  },
  otpDigitBox: {
    width: scale(45),
    height: scale(52),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  otpDigitBoxActive: {
    borderColor: COLORS.BLACK,
  },
  otpText: {
    fontSize: moderateScale(20),
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  errorLabel: {
    width: '100%',
    marginTop: scale(8),
    color: COLORS.RED,
    fontSize: moderateScale(12),
  },
  resendWrapper: {
    marginTop: scale(18),
    alignSelf: 'center',
  },
  resendText: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY1,
  },
  resendLink: {
    color: COLORS.BLACK,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bottomActionArea: {
    width: '100%',
  },
});
