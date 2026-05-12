import React from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressBar = ({ totalSteps, currentStep }: ProgressBarProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index < currentStep ? styles.activeStep : styles.inactiveStep,
            index === 0 && styles.firstStep,
            index === totalSteps - 1 && styles.lastStep,
          ]}
        />
      ))}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(2),
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  step: {
    flex: 1,
    height: '100%',
    marginHorizontal: 1,
  },
  activeStep: {
    backgroundColor: COLORS.BLACK,
  },
  inactiveStep: {
    backgroundColor: COLORS.LIGHT_GRAY_BORDER,
  },
  firstStep: {
    marginLeft: 0,
  },
  lastStep: {
    marginRight: 0,
  },
});
