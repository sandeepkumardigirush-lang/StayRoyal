import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale, moderateScale } from 'react-native-size-matters';
import { Star, ChevronRight } from 'lucide-react-native';
import { COLORS } from '../../../../constants/colors';

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  onViewAll: () => void;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onViewAll }) => {
  const initialReviews = reviews.slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ratingTitle}>
          <Star size={scale(18)} color={COLORS.BLACK} fill={COLORS.BLACK} />
          <Text style={styles.ratingText}>4.92 · {reviews.length} reviews</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {initialReviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.userInfo}>
              <FastImage source={{ uri: review.user.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.userName}>{review.user.name}</Text>
                <Text style={styles.date}>{review.date}</Text>
              </View>
            </View>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={scale(12)}
                  color={i < review.rating ? COLORS.BLACK : COLORS.GRAY}
                  fill={i < review.rating ? COLORS.BLACK : 'transparent'}
                />
              ))}
            </View>
            <Text style={styles.comment} numberOfLines={3}>
              {review.comment}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
        <Text style={styles.viewAllButtonText}>Show all {reviews.length} reviews</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewsSection;

const styles = StyleSheet.create({
  container: {
    marginTop: scale(32),
    paddingBottom: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  header: {
    marginBottom: scale(16),
  },
  ratingTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginLeft: scale(8),
  },
  scrollContent: {
    paddingRight: scale(24),
  },
  reviewCard: {
    width: scale(240),
    padding: scale(16),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#EBEBEB',
    marginRight: scale(16),
    height: scale(160),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: scale(12),
    backgroundColor: '#F0F0F0',
  },
  userName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  date: {
    fontSize: moderateScale(12),
    color: COLORS.SECONDARY,
    marginTop: scale(2),
  },
  stars: {
    flexDirection: 'row',
    marginBottom: scale(8),
  },
  comment: {
    fontSize: moderateScale(13),
    color: COLORS.BLACK,
    lineHeight: scale(18),
  },
  viewAllCard: {
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#EBEBEB',
    height: scale(160),
  },
  viewAllCircle: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  viewAllText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  viewAllButton: {
    marginTop: scale(20),
    paddingVertical: scale(13),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    alignItems: 'center',
  },
  viewAllButtonText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
});
