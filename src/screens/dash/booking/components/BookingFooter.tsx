import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';
import CustomButton from '../../../../components/commonButton';
import ProgressBar from './ProgressBar';

interface BookingFooterProps {
  bottomInset: number;
  onNext: () => void;
  nextTitle?: string;
  totalSteps: number;
  currentStep: number;
  subText?: string;
  footerContent?: React.ReactNode;
}

const BookingFooter = ({
  bottomInset,
  onNext,
  nextTitle = 'Next',
  totalSteps,
  currentStep,
  subText,
  footerContent
}: BookingFooterProps) => {
  return (
    <View style={[styles.bottomBar, { paddingBottom: bottomInset || scale(20) }]}>
      <ProgressBar totalSteps={totalSteps} currentStep={currentStep} />

      <View style={styles.content}>
        {subText && <Text style={styles.subText}>{subText}</Text>}
        {footerContent}
        <CustomButton title={nextTitle} onPress={onNext} />
        {currentStep === totalSteps && (
          <Text style={styles.termsText}>
            By selecting the button, I agree to the <Text style={styles.link}>booking terms</Text>.
          </Text>
        )}
      </View>
    </View>
  );
};

export default BookingFooter;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.CARD_BORDER,
  },
  content: {
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
  },
  subText: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY1,
    marginBottom: scale(15),
    textAlign: 'center',
  },
  termsText: {
    fontSize: moderateScale(11),
    color: COLORS.GRAY,
    marginTop: scale(12),
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: COLORS.BLACK,
  }
});
