import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Star, Award } from 'lucide-react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../../../constants/colors';
import FastImage from 'react-native-fast-image';
import { ShieldCheck } from 'lucide-react-native';

interface Props {
  villa: any;
}

const VillaDetailInfo = memo(({ villa }: Props) => (
  <View >
    {/* Title */}
    <Text style={styles.title}>{villa.name}</Text>
    <Text style={styles.locationText}>Entire rental unit in Zirakpur, India</Text>
    <Text style={styles.detailsText}>2 guests · 1 bedroom · 1 bed · 1 bathroom</Text>

    {/* Rating Section */}
    <View style={styles.ratingSection}>
      <View style={styles.ratingCard}>
        <Text style={styles.ratingScore}>{villa.rating}</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} size={scale(10)} color={COLORS.BLACK} fill={COLORS.BLACK} />
          ))}
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.favoriteCard}>
        <View style={styles.favoriteBadge}>
          <Award size={scale(24)} color={COLORS.BLACK} />
          <Text style={styles.favoriteText}>{'Guest\nfavourite'}</Text>
          <Award size={scale(24)} color={COLORS.BLACK} />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.reviewsCard}>
        <Text style={styles.reviewCount}>{villa.reviews}</Text>
        <Text style={styles.reviewLabel}>Reviews</Text>
      </View>
    </View>

    {/* Host */}
    <View style={styles.sectionDivider} />
    <View style={styles.hostContainer}>
      <View style={styles.hostAvatarContainer}>
        <FastImage
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' }}
          style={styles.hostAvatar}
        />
        <View style={styles.superhostIcon}>
          <ShieldCheck size={scale(12)} color={COLORS.WHITE} />
        </View>
      </View>
      <View style={styles.hostInfo}>
        <Text style={styles.hostName}>Hosted by Shaminder</Text>
        <Text style={styles.hostMeta}>Superhost · 4 months hosting</Text>
      </View>
    </View>
  </View>
));

export default VillaDetailInfo;

const styles = StyleSheet.create({

  title: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: COLORS.BLACK,
    lineHeight: scale(32),
  },
  locationText: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: COLORS.BLACK,
    marginTop: scale(10),
  },
  detailsText: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY,
    marginTop: scale(4),
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.CARD_BORDER,
    borderRadius: scale(12),
    padding: scale(16),
    marginTop: scale(24),
  },
  ratingCard: {
    alignItems: 'center',
    flex: 1,
  },
  ratingScore: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: scale(4),
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.SECTION_DIVIDER,
  },
  favoriteCard: {
    flex: 2,
    alignItems: 'center',
  },
  favoriteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: scale(4),
    color: COLORS.BLACK,
  },
  reviewsCard: {
    alignItems: 'center',
    flex: 1,
  },
  reviewCount: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  reviewLabel: {
    fontSize: moderateScale(12),
    color: COLORS.GRAY,
    marginTop: scale(2),
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.SECTION_DIVIDER,
    marginVertical: scale(32),
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostAvatarContainer: {
    position: 'relative',
  },
  hostAvatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
  },
  superhostIcon: {
    position: 'absolute',
    bottom: -scale(2),
    right: -scale(2),
    backgroundColor: COLORS.BRAND_PINK,
    borderRadius: scale(8),
    padding: scale(2),
  },
  hostInfo: {
    marginLeft: scale(16),
  },
  hostName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  hostMeta: {
    fontSize: moderateScale(14),
    color: COLORS.GRAY,
    marginTop: scale(2),
  },
});
