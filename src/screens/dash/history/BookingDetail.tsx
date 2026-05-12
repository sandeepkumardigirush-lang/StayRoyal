import React, { useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { scale, moderateScale } from 'react-native-size-matters';
import { ChevronLeft, Calendar, MapPin, User, CreditCard, Clock, Star } from 'lucide-react-native';
import { COLORS } from '../../../constants/colors';
import { RootStackParamList } from '../../../navigation/types';
import { Booking } from '../../../types/booking';

const DetailItem = React.memo(({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <View style={styles.detailItem}>
    <View style={styles.iconContainer}>{icon}</View>
    <View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
));

const BookingDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'BookingDetail'>>();
  const { booking } = route.params;
  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState('');

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCancel = useCallback(() => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, Cancel', style: 'destructive', onPress: () => console.log('Cancelled') },
      ]
    );
  }, []);

  const handleSubmitReview = useCallback(() => {
    Alert.alert('Thank You!', 'Your review has been submitted.');
    setRating(0);
    setFeedback('');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton} activeOpacity={0.7}>
          <ChevronLeft size={scale(24)} color={COLORS.BLACK} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: scale(24) }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <FastImage 
          source={{ 
            uri: booking.villaImage,
            priority: FastImage.priority.high,
          }} 
          style={styles.villaImage} 
          resizeMode={FastImage.resizeMode.cover}
        />
        
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.villaName}>{booking.villaName}</Text>
            <View style={styles.locationRow}>
              <MapPin size={scale(14)} color={COLORS.SECONDARY} />
              <Text style={styles.locationText}>{booking.location}</Text>
            </View>
          </View>

          <View style={[
            styles.statusBadge, 
            booking.status === 'upcoming' ? styles.statusUpcoming : 
            booking.status === 'completed' ? styles.statusCompleted : 
            styles.statusCancelled
          ]}>
            <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
          </View>

          <View style={styles.detailsCard}>
            <DetailItem 
              icon={<Calendar size={scale(18)} color={COLORS.BLACK} />} 
              label="Date" 
              value={booking.date} 
            />
            <DetailItem 
              icon={<Clock size={scale(18)} color={COLORS.BLACK} />} 
              label="Check-in / Check-out" 
              value="14:00 - 11:00" 
            />
            <DetailItem 
              icon={<User size={scale(18)} color={COLORS.BLACK} />} 
              label="Guests" 
              value={`${booking.guests} Guests`} 
            />
            <DetailItem 
              icon={<CreditCard size={scale(18)} color={COLORS.BLACK} />} 
              label="Total Price" 
              value={`$${booking.price}`} 
            />
          </View>

          {booking.status === 'completed' && (
            <View style={styles.ratingSection}>
              <Text style={styles.sectionTitle}>Rate & Review</Text>
              <Text style={styles.ratingSubtitle}>Share your experience at {booking.villaName}</Text>
              
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity 
                    key={star} 
                    onPress={() => setRating(star)}
                    activeOpacity={0.7}
                  >
                    <Star 
                      size={scale(32)} 
                      color={star <= rating ? COLORS.GOLD : COLORS.GRAY} 
                      fill={star <= rating ? COLORS.GOLD : 'transparent'}
                      style={{ marginRight: scale(8) }}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.feedbackInput}
                placeholder="Tell us about your stay (optional)"
                placeholderTextColor={COLORS.SECONDARY}
                multiline
                numberOfLines={4}
                value={feedback}
                onChangeText={setFeedback}
              />

              <TouchableOpacity 
                style={[styles.submitButton, !rating && styles.disabledButton]} 
                disabled={!rating}
                onPress={handleSubmitReview}
              >
                <Text style={styles.submitButtonText}>Submit Review</Text>
              </TouchableOpacity>
            </View>
          )}

          {booking.status === 'upcoming' && (
            <View style={styles.actions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} activeOpacity={0.8}>
                <Text style={styles.cancelButtonText}>Cancel Booking</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(BookingDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  backButton: {
    padding: scale(5),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  scrollContent: {
    paddingBottom: scale(40),
  },
  villaImage: {
    width: '100%',
    height: scale(250),
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  content: {
    padding: scale(20),
  },
  section: {
    marginBottom: scale(24),
  },
  villaName: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: scale(8),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: moderateScale(14),
    color: COLORS.SECONDARY,
    marginLeft: scale(4),
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    marginBottom: scale(24),
  },
  statusUpcoming: {
    backgroundColor: COLORS.UPCOMING_BG,
  },
  statusCompleted: {
    backgroundColor: COLORS.COMPLETED_BG,
  },
  statusCancelled: {
    backgroundColor: COLORS.CANCELLED_BG,
  },
  statusText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  detailsCard: {
    backgroundColor: COLORS.CARD_BG,
    borderRadius: scale(16),
    padding: scale(20),
    marginBottom: scale(24),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  detailLabel: {
    fontSize: moderateScale(12),
    color: COLORS.SECONDARY,
    marginBottom: scale(2),
  },
  detailValue: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: scale(8),
  },
  ratingSection: {
    marginTop: scale(8),
    paddingTop: scale(24),
    borderTopWidth: 1,
    borderTopColor: COLORS.DIVIDER,
    marginBottom: scale(24),
  },
  ratingSubtitle: {
    fontSize: moderateScale(14),
    color: COLORS.SECONDARY,
    marginBottom: scale(16),
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: scale(20),
  },
  feedbackInput: {
    backgroundColor: COLORS.CARD_BG,
    borderRadius: scale(12),
    padding: scale(16),
    fontSize: moderateScale(14),
    color: COLORS.BLACK,
    height: scale(100),
    textAlignVertical: 'top',
    marginBottom: scale(20),
  },
  submitButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: scale(14),
    borderRadius: scale(12),
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.WHITE,
    fontSize: moderateScale(15),
    fontWeight: '700',
  },
  disabledButton: {
    backgroundColor: COLORS.GRAY,
    opacity: 0.5,
  },
  actions: {
    marginTop: scale(20),
  },
  cancelButton: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: scale(16),
    borderRadius: scale(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.ERROR_RED,
  },
  cancelButtonText: {
    color: COLORS.ERROR_RED,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});
