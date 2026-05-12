import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale, moderateScale } from 'react-native-size-matters';
import { Calendar, MapPin, Star } from 'lucide-react-native';
import { COLORS } from '../../../../constants/colors';
import { Booking } from '../../../../types/booking';

interface BookingCardProps {
  item: Booking;
  onPress: (item: Booking) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(item)}
      activeOpacity={0.9}
    >
      <FastImage 
        source={{ 
          uri: item.villaImage,
          priority: FastImage.priority.high,
        }} 
        style={styles.cardImage} 
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.villaName} numberOfLines={1}>{item.name || item.villaName}</Text>
          <View style={styles.ratingRow}>
            <Star size={scale(14)} color={COLORS.BLACK} fill={COLORS.BLACK} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <MapPin size={scale(14)} color={COLORS.SECONDARY} />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Calendar size={scale(14)} color={COLORS.SECONDARY} />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.priceText}>${item.price} <Text style={styles.totalText}>total</Text></Text>
          <View style={[
            styles.statusBadge, 
            item.status === 'upcoming' ? styles.statusUpcoming : 
            item.status === 'completed' ? styles.statusCompleted : 
            styles.statusCancelled
          ]}>
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(BookingCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: scale(16),
    marginBottom: scale(24),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.DIVIDER,
  },
  cardImage: {
    width: '100%',
    height: scale(180),
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  cardContent: {
    padding: scale(16),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  villaName: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    flex: 1,
    marginRight: scale(10),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginLeft: scale(4),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(6),
  },
  infoText: {
    fontSize: moderateScale(13),
    color: COLORS.SECONDARY,
    marginLeft: scale(6),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(12),
    paddingTop: scale(12),
    borderTopWidth: 1,
    borderTopColor: COLORS.DIVIDER,
  },
  priceText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  totalText: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: COLORS.SECONDARY,
  },
  statusBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(6),
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
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: COLORS.BLACK,
  },
});
