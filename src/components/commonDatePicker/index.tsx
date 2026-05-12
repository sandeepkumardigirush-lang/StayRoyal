import React, { useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';

interface CommonDatePickerProps {
  label?: string;
  value?: string;
  placeholder?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  onChange: (value: string) => void;
}

const DISPLAY_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`;

const parseDate = (value?: string): Date => {
  if (!value) {
    return new Date();
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
  value,
  placeholder = 'Select a date',
  maximumDate,
  minimumDate,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [iosDraftDate, setIosDraftDate] = useState(parseDate(value));

  const selectedDate = useMemo(() => parseDate(value), [value]);
  const displayValue = value ? DISPLAY_FORMATTER.format(selectedDate) : placeholder;

  const openPicker = () => {
    setIosDraftDate(selectedDate);
    setIsOpen(true);
  };

  const closePicker = () => setIsOpen(false);

  const handleAndroidChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'dismissed') {
      closePicker();
      return;
    }
    if (date) {
      onChange(formatDate(date));
    }
    closePicker();
  };

  const handleIosChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setIosDraftDate(date);
    }
  };

  const confirmIosDate = () => {
    onChange(formatDate(iosDraftDate));
    closePicker();
  };

  return (
    <View style={styles.container}>
      {/* Use GHTouchableOpacity for BOTH platforms because we are inside a BottomSheetModal.
          Standard React Native touchables often fail to receive events on Android inside sheets. */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openPicker}
        style={styles.inputLike}
      >
        <Text style={[styles.valueText, !value && styles.placeholderText]}>{displayValue}</Text>
        <Calendar color={COLORS.GRAY} size={scale(18)} />
      </TouchableOpacity>

      {isOpen && Platform.OS === 'android' && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={handleAndroidChange}
        />
      )}

      {Platform.OS === 'ios' && (
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={closePicker}
        >
          <View style={styles.iosOverlayContainer}>
            <Pressable style={styles.iosBackdrop} onPress={closePicker} />
            <View style={styles.iosCard}>
              <View style={styles.iosHeader}>
                {/* Standard RNTouchableOpacity is fine INSIDE the native Modal overlay */}
                <RNTouchableOpacity onPress={closePicker}>
                  <Text style={styles.actionText}>Cancel</Text>
                </RNTouchableOpacity>
                <RNTouchableOpacity onPress={confirmIosDate}>
                  <Text style={styles.actionText}>Done</Text>
                </RNTouchableOpacity>
              </View>
              <DateTimePicker
                value={iosDraftDate}
                mode="date"
                display="spinner"
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                onChange={handleIosChange}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CommonDatePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputLike: {
    minHeight: scale(54),
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
  },
  valueText: {
    fontSize: moderateScale(15),
    color: COLORS.BLACK,
  },
  placeholderText: {
    color: COLORS.GRAY,
  },
  iosCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: scale(16),
    overflow: 'hidden',
    marginHorizontal: scale(18),
  },
  iosOverlayContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iosBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  iosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(30),
    paddingVertical: scale(14),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  actionText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
});
