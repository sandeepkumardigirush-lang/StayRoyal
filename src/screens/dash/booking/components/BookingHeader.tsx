import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { X, ChevronLeft } from 'lucide-react-native';
import { COLORS } from '../../../../constants/colors';

interface BookingHeaderProps {
  insetsTop: number;
  title?: string;
  onBack?: () => void;
  onClose: () => void;
}

const BookingHeader = ({ insetsTop, title, onBack, onClose }: BookingHeaderProps) => {
  return (
    <View style={[styles.header, { paddingTop: insetsTop + scale(10) }]}>
      <TouchableOpacity onPress={onBack || onClose} style={styles.iconButton}>
        {onBack && <ChevronLeft color={COLORS.BLACK} size={scale(21)} />}
      </TouchableOpacity>

      {title && <Text style={styles.headerTitle}>{title}</Text>}

      <TouchableOpacity onPress={onClose} style={styles.iconButton}>
        <X color={COLORS.BLACK} size={scale(21)} />
      </TouchableOpacity>
    </View>
  );
};

export default BookingHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingBottom: scale(10),
    backgroundColor: COLORS.WHITE,
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  iconButton: {
    padding: scale(4),
  },
});
