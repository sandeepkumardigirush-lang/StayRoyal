import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';

interface BookingRowProps {
  title: string;
  subtitle: string;
  badgeIcon?: React.ReactNode;
  badgeText?: string;
  buttonText?: string;
  subtitleStyle?: any;
  onPress?: () => void;
  children?: React.ReactNode;
}

const BookingRow = ({
  title,
  subtitle,
  badgeIcon,
  badgeText,
  buttonText,
  subtitleStyle,
  onPress,
  children
}: BookingRowProps) => {
  return (
    <View style={styles.rowSection}>
      <View style={styles.rowLeft}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle && <Text style={[styles.rowSubtitle, subtitleStyle]}>{subtitle}</Text>}
        {badgeText && (
          <View style={styles.badgeContainer}>
            {badgeIcon}
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
        {children}
      </View>
      {buttonText && (
        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
          <Text style={styles.actionButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(BookingRow);

const styles = StyleSheet.create({
  rowSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowLeft: {
    flex: 1,
    paddingRight: scale(15),
  },
  rowTitle: {
    fontSize: scale(14),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(4),
  },
  rowSubtitle: {
    fontSize: scale(13),
    color: COLORS.GRAY1,
    marginBottom: scale(2),
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(4),
  },
  badgeText: {
    fontSize: scale(12),
    color: COLORS.RARE_FIND_PINK,
    fontWeight: '500',
    marginLeft: scale(4),
  },
  actionButton: {
    backgroundColor: COLORS.ACTION_BTN_BG,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(8),
  },
  actionButtonText: {
    fontSize: scale(12),
    fontWeight: '500',
    color: COLORS.BLACK,
  },
});
