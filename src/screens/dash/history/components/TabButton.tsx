import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.tabButton, isActive && styles.activeTabButton]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>{title}</Text>
  </TouchableOpacity>
);

export default React.memo(TabButton);

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: scale(10),
    alignItems: 'center',
    borderRadius: scale(8),
  },
  activeTabButton: {
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.SECONDARY,
  },
  activeTabButtonText: {
    color: COLORS.BLACK,
  },
});
