import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Calendar } from 'react-native-calendars';
import { COLORS } from '../../../../constants/colors';

interface WhenSectionProps {
  isActive: boolean;
  onDayPress: (day: any) => void;
  markedDates: any;
  startDate: string | null;
  endDate: string | null;
  onPress: () => void;
}

const WhenSection = ({
  isActive,
  onDayPress,
  markedDates,
  startDate,
  endDate,
  onPress
}: WhenSectionProps) => {
  if (!isActive) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.stepCard}
      >
        <View style={styles.collapsedRow}>
          <Text style={styles.collapsedLabel}>When</Text>
          <Text style={styles.collapsedValue}>
            {startDate && endDate ? `${startDate} - ${endDate}` : "Add dates"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const [currentMonth, setCurrentMonth] = React.useState(today.substring(0, 7));

  const mergedMarkedDates = {
    ...markedDates,
    [today]: {
      ...(markedDates[today] || {}),
      customStyles: {
        text: { color: COLORS.PURPLE1, fontWeight: 'bold' }
      }
    }
  };

  return (
    <View style={[styles.stepCard, styles.activeStepCard]}>
      <Text style={styles.stepTitle}>When's your trip?</Text>
      <Calendar
        onDayPress={onDayPress}
        markingType={'period'}
        markedDates={mergedMarkedDates}
        minDate={today}
        onMonthChange={(month) => setCurrentMonth(month.dateString.substring(0, 7))}
        disableArrowLeft={currentMonth === today.substring(0, 7)}
        theme={{
          todayTextColor: COLORS.PURPLE1,
          arrowColor: COLORS.BLACK,
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          calendarBackground: COLORS.WHITE,
          textDisabledColor: COLORS.DISABLED_GRAY,
        }}
      />
    </View>
  );
};

export default WhenSection;

const styles = StyleSheet.create({
  stepCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: scale(15),
    padding: scale(15),
    marginBottom: scale(12),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  activeStepCard: {
    elevation: 4,
    shadowOpacity: 0.1,
  },
  stepTitle: {
    fontSize: moderateScale(21),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(15),
  },
  collapsedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapsedLabel: {
    fontSize: moderateScale(14),
    color: COLORS.GRAY,
    fontWeight: '500',
  },
  collapsedValue: {
    fontSize: moderateScale(13),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
});



