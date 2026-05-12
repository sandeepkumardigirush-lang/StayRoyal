import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';
import { Minus, Plus } from 'lucide-react-native';

interface WhoSectionProps {
  isActive: boolean;
  guests: { adults: number; children: number; infants: number; pets: number };
  onUpdateGuests: (type: string, value: number) => void;
  onPress: () => void;
}

interface GuestRowProps {
  title: string;
  subtitle: string;
  value: number;
  onUpdate: (value: number) => void;
}


const GuestRow = ({ title, subtitle, value, onUpdate }: GuestRowProps) => (
  <View style={styles.guestRow}>
    <View style={{ flex: 1 }}>
      <Text style={styles.guestTitle}>{title}</Text>
      <Text style={styles.guestSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.counterRow}>
      <TouchableOpacity
        onPress={() => onUpdate(Math.max(0, value - 1))}
        style={[styles.counterBtn, value === 0 && styles.counterBtnDisabled]}
      >
        <Minus size={scale(15)} color={value === 0 ? COLORS.GRAY : COLORS.BLACK} />
      </TouchableOpacity>
      <Text style={styles.counterText}>{value}</Text>
      <TouchableOpacity
        onPress={() => onUpdate(value + 1)}
        style={styles.counterBtn}
      >
        <Plus size={scale(15)} color={COLORS.BLACK} />
      </TouchableOpacity>
    </View>
  </View>
);

const WhoSection = ({ isActive, guests, onUpdateGuests, onPress }: WhoSectionProps) => {
  if (!isActive) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.stepCard}
      >
        <View style={styles.collapsedRow}>
          <Text style={styles.collapsedLabel}>Who</Text>
          <Text style={styles.collapsedValue}>
            {guests.adults + guests.children > 0 ? `${guests.adults + guests.children} guests` : "Add guests"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.stepCard, styles.activeStepCard]}>
      <Text style={styles.stepTitle}>Who's coming?</Text>
      <GuestRow title="Adults" subtitle="Ages 13 or above" value={guests.adults} onUpdate={(v) => onUpdateGuests('adults', v)} />
      <GuestRow title="Children" subtitle="Ages 2–12" value={guests.children} onUpdate={(v) => onUpdateGuests('children', v)} />
      <GuestRow title="Infants" subtitle="Under 2" value={guests.infants} onUpdate={(v) => onUpdateGuests('infants', v)} />
      <GuestRow title="Pets" subtitle="Bringing a service animal?" value={guests.pets} onUpdate={(v) => onUpdateGuests('pets', v)} />
    </View>
  );
};

export default WhoSection;

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
    fontSize: moderateScale(14),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },

  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  guestTitle: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  guestSubtitle: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#B0B0B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnDisabled: {
    borderColor: '#E2E2E2',
  },
  counterText: {
    fontSize: moderateScale(15),
    marginHorizontal: scale(15),
    minWidth: scale(20),
    textAlign: 'center',
  },
});
