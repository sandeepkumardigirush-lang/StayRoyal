import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { X } from 'lucide-react-native';
import { COLORS } from '../../../../constants/colors';
import WhenSection from '../../search/components/WhenSection';
import WhoSection from '../../search/components/WhoSection';
import PriceBreakdown from './PriceBreakdown';

interface CommonModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  insetsTop: number;
  hideSave?: boolean;
}

const CommonModal = ({ visible, onClose, title, children, insetsTop, hideSave }: CommonModalProps) => (
  <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
    <View style={styles.modalOverlay}>
      <View style={[styles.modalContent, { paddingTop: scale(10) }]}>
        <View style={styles.modalHeader}>
          {hideSave ? (
            <View style={styles.placeholder} />
          ) : (
            <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
              <X color={COLORS.BLACK} size={scale(20)} />
            </TouchableOpacity>
          )}

          <Text style={styles.modalTitle}>{title}</Text>

          <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
            {hideSave ? (
              <X color={COLORS.BLACK} size={scale(20)} />
            ) : (
              <Text style={styles.saveText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </View>
  </Modal>
);

interface PickerModalsProps {
  showDatePicker: boolean;
  setShowDatePicker: (val: boolean) => void;
  showGuestPicker: boolean;
  setShowGuestPicker: (val: boolean) => void;
  showPriceDetails: boolean;
  setShowPriceDetails: (val: boolean) => void;
  insets: any;
  startDate: string | null;
  endDate: string | null;
  markedDates: any;
  onDayPress: (day: any) => void;
  guests: any;
  setGuests: (val: any) => void;
}

const PickerModals = ({
  showDatePicker,
  setShowDatePicker,
  showGuestPicker,
  setShowGuestPicker,
  showPriceDetails,
  setShowPriceDetails,
  insets,
  startDate,
  endDate,
  markedDates,
  onDayPress,
  guests,
  setGuests,
}: PickerModalsProps) => {
  return (
    <>
      <CommonModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        title="Select dates"
        insetsTop={insets.top}
      >
        <WhenSection
          isActive={true}
          startDate={startDate}
          endDate={endDate}
          markedDates={markedDates}
          onDayPress={onDayPress}
          onPress={() => { }}
        />
      </CommonModal>

      <CommonModal
        visible={showGuestPicker}
        onClose={() => setShowGuestPicker(false)}
        title="Select guests"
        insetsTop={insets.top}
      >
        <WhoSection
          isActive={true}
          guests={guests}
          onUpdateGuests={(type, val) => setGuests((prev: any) => ({ ...prev, [type]: val }))}
          onPress={() => { }}
        />
      </CommonModal>

      <CommonModal
        visible={showPriceDetails}
        onClose={() => setShowPriceDetails(false)}
        title="Price details"
        insetsTop={insets.top}
        hideSave
      >
        <PriceBreakdown 
           nights={15}
           pricePerNight={1106.62}
           discount={3267}
           taxes={584.16}
           total={13916.53}
        />
      </CommonModal>
    </>
  );
};

export default PickerModals;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.MODAL_OVERLAY,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    maxHeight: '90%',
    paddingBottom: scale(20),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY_BORDER,
  },
  iconBtn: {
    padding: scale(4),
  },
  modalTitle: {
    fontSize: moderateScale(17),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  saveText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  modalScroll: {
    padding: scale(15),
  },
  placeholder: {
    width: scale(30),
  },
});
