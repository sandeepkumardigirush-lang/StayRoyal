import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';
import { scale } from 'react-native-size-matters';
import { Star, Medal, ChevronRight } from 'lucide-react-native';

import BookingHeader from './components/BookingHeader';
import BookingFooter from './components/BookingFooter';
import BookingRow from './components/BookingRow';
import PickerModals from './components/PickerModals';
import ImageStack from './components/ImageStack';
import PriceBreakdown from './components/PriceBreakdown';

const PaymentReview = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showPriceDetails, setShowPriceDetails] = useState(false);

  const [startDate, setStartDate] = useState<string | null>("2026-05-20");
  const [endDate, setEndDate] = useState<string | null>("2026-05-27");
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });

  const images = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  ];

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);
  const handleClose = useCallback(() => navigation.popToTop(), [navigation]);
  const handleMessagePress = useCallback(() => navigation.navigate('MessageToHost'), [navigation]);

  const toggleDatePicker = useCallback((val: boolean) => setShowDatePicker(val), []);
  const toggleGuestPicker = useCallback((val: boolean) => setShowGuestPicker(val), []);
  const togglePriceDetails = useCallback((val: boolean) => setShowPriceDetails(val), []);

  return (
    <View style={styles.container}>
      <BookingHeader
        insetsTop={insets.top}
        title="Request to book"
        onBack={handleBack}
        onClose={handleClose}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.propertySection}>
          <ImageStack images={images} />
          <Text style={styles.propertyTitle}>Lovers | Privacy | Not Shared | Direct access</Text>
          <View style={styles.ratingRow}>
            <Star color={COLORS.BLACK} size={scale(11)} fill={COLORS.BLACK} />
            <Text style={styles.ratingText}> 4.89 (18)</Text>
            <Text style={styles.ratingDot}> • </Text>
            <Medal color={COLORS.BLACK} size={scale(11)} />
            <Text style={styles.guestFavText}> Guest favourite</Text>
          </View>
        </View>

        <View style={styles.card}>
          <BookingRow
            title="Dates"
            subtitle="20–27 May 2026"
            buttonText="Change"
            onPress={() => toggleDatePicker(true)}
          />
          <View style={styles.divider} />
          <BookingRow
            title="Guests"
            subtitle="1 adult"
            buttonText="Change"
            onPress={() => toggleGuestPicker(true)}
          />
          <View style={styles.divider} />
          <BookingRow
            title="Total price"
            subtitle="₹7,273.33 including taxes INR"
            buttonText="Details"
            onPress={() => togglePriceDetails(true)}
          />
          <View style={styles.divider} />
          <BookingRow
            title="Free cancellation"
            subtitle="Cancel within 24 hours for a full refund."
          />
        </View>

        <TouchableOpacity style={styles.messageCard} onPress={handleMessagePress}>
          <View style={styles.messageLeft}>
            <Text style={styles.messageTitle}>Message to the host</Text>
            <Text style={styles.messageContent} numberOfLines={1}>n</Text>
          </View>
          <ChevronRight color={COLORS.BLACK} size={scale(20)} />
        </TouchableOpacity>

        <PriceBreakdown
          isInline
          nights={7}
          pricePerNight={1237.43}
          discount={1694}
          taxes={305.3}
          total={7273.33}
          onShowDetails={() => togglePriceDetails(true)}
        />

        <Text style={styles.policyText}>
          The host has 24 hours to accept your request. You’ll pay now, but get a full refund if the booking isn’t confirmed.
        </Text>
      </ScrollView>

      <BookingFooter
        bottomInset={insets.bottom}
        onNext={() => { }}
        nextTitle="Continue to Razorpay"
        totalSteps={3}
        currentStep={3}
        subText="You'll be directed to Razorpay to complete payment."
      />

      <PickerModals
        showDatePicker={showDatePicker}
        setShowDatePicker={toggleDatePicker}
        showGuestPicker={showGuestPicker}
        setShowGuestPicker={toggleGuestPicker}
        showPriceDetails={showPriceDetails}
        setShowPriceDetails={togglePriceDetails}
        insets={insets}
        startDate={startDate}
        endDate={endDate}
        markedDates={{}}
        onDayPress={() => { }}
        guests={guests}
        setGuests={setGuests}
      />
    </View>
  );
};

export default PaymentReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    padding: scale(20),
  },
  propertySection: {
    alignItems: 'center',
    marginBottom: scale(30),
  },
  propertyTitle: {
    fontSize: scale(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: scale(8),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: scale(12),
    fontWeight: '600',
  },
  ratingDot: {
    marginHorizontal: scale(4),
  },
  guestFavText: {
    fontSize: scale(12),
    fontWeight: '600',
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.CARD_BORDER,
    borderRadius: scale(16),
    padding: scale(16),
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.SECTION_DIVIDER,
    marginVertical: scale(15),
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.CARD_BORDER,
    borderRadius: scale(16),
    padding: scale(16),
    marginTop: scale(20),
  },
  messageLeft: {
    flex: 1,
  },
  messageTitle: {
    fontSize: scale(14),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(4),
  },
  messageContent: {
    fontSize: scale(13),
    color: COLORS.SECONDARY,
  },
  policyText: {
    fontSize: scale(13),
    color: COLORS.SECONDARY,
    lineHeight: scale(19),
    marginBottom: scale(30),
  },
});
