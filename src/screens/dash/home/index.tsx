import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Heart, Star } from 'lucide-react-native';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../../../components/homeHeader/HomeHeader';
import ImageCarousel from '../../../components/imageCarousel';
import { COLORS } from '../../../constants/colors';
import { RootStackParamList } from '../../../navigation/types';
import { RootState } from '../../../redux/store';
import { removeFromWishlist, saveToExistingWishlist, showWishlistModal } from '../../../redux/wishlistSlice';
import LoginBottomSheet from '../../auth/login';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const VILLA_DATA = Array.from({ length: 1000 }, (_, index) => {
  const id = index + 1;
  return {
    id: String(id),
    name: id % 3 === 0 ? 'Home in Malibu' : id % 2 === 0 ? 'Villa in Beverly Hills' : 'Flat in Los Angeles',
    subtitle: 'Lovers | Privacy | Not Shared | Direct access',
    details: '1 bedroom · 1 king bed · 1 bathroom',
    dates: '14–21 May',
    price: 7539,
    originalPrice: 9233,
    rating: 4.89,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    ],
    isGuestFavorite: id % 2 === 0,
    isSuperhost: id % 3 === 0,
    discount: id % 4 === 0 ? 'Weekly discount' : null,
    reviews: 18 + (id % 10),
    coordinate: {
      latitude: 30.7046 + (id % 10) * 0.005,
      longitude: 76.7179 + (id % 10) * 0.005,
    },
    liked: false,
  };
});


const VillaCard = memo(({ item, onLikePress }: { item: typeof VILLA_DATA[0], onLikePress: (id: string) => void }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handlePress = () => navigation.navigate('VillaDetail', { villa: item });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <ImageCarousel
          images={item.images}
          containerWidth={SCREEN_WIDTH - scale(40)}
        />

        <View style={styles.badgeContainer}>
          {item.isGuestFavorite && (
            <View style={styles.guestFavoriteBadge}>
              <Text style={styles.badgeText}>Guest favourite</Text>
            </View>
          )}
          {item.isSuperhost && !item.isGuestFavorite && (
            <View style={styles.superhostBadge}>
              <Text style={styles.badgeText}>Superhost</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => onLikePress(item.id)}
        >
          <Heart
            color={COLORS.WHITE}
            fill={item.liked ? COLORS.RED : 'rgba(0,0,0,0.5)'}
            size={scale(20)}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={styles.cardContent}
      >
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Star size={scale(12)} color={COLORS.BLACK} fill={COLORS.BLACK} />
            <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.details}>{item.details}</Text>
        <Text style={styles.dates}>{item.dates}</Text>

        <View style={styles.priceRow}>
          {item.originalPrice && (
            <Text style={styles.originalPriceText}>₹{item.originalPrice.toLocaleString()}</Text>
          )}
          <Text style={styles.currentPriceText}>₹{item.price.toLocaleString()}</Text>
          <Text style={styles.priceSuffix}> for 7 nights</Text>
        </View>

        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
});

const HomeScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const user = { name: 'Heisenberg Martinez' };
  const [villas, setVillas] = useState(VILLA_DATA.slice(0, 10));
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const wishlists = useSelector((state: RootState) => state.wishlist.wishlists);

  const handleLike = useCallback((id: string) => {
    setVillas(prev => {
      const villa = prev.find(v => v.id === id);
      if (!villa) return prev;

      const isCurrentlyLiked = villa.liked;

      if (isCurrentlyLiked) {
        dispatch(removeFromWishlist(id));
      } else {
        const propertyToSave = {
          id: villa.id,
          images: villa.images,
          name: villa.name,
          subtitle: villa.subtitle,
          price: villa.price,
          originalPrice: villa.originalPrice,
          rating: villa.rating,
          reviews: villa.reviews
        };

        if (wishlists.length === 0) {
          dispatch(showWishlistModal(propertyToSave));
        } else {
          dispatch(saveToExistingWishlist(propertyToSave));
        }
      }

      return prev.map(v => v.id === id ? { ...v, liked: !isCurrentlyLiked } : v);
    });
  }, [wishlists.length, dispatch]);

  const loadMoreVillas = useCallback(() => {
    if (loading || villas.length >= VILLA_DATA.length) return;
    setLoading(true);
    setTimeout(() => {
      const nextBatch = VILLA_DATA.slice(villas.length, villas.length + 10);
      setVillas(prev => [...prev, ...nextBatch]);
      setLoading(false);
    }, 500);
  }, [villas.length, loading]);

  const renderItem = useCallback(({ item }: { item: typeof VILLA_DATA[0] }) => (
    <VillaCard item={item} onLikePress={() => handleLike(item.id)} />
  ), [handleLike]);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        user={user}
        onNotificationPress={() => console.log('notif')}
      />

      <View style={{ flex: 1 }}>
        <FlashList
          data={villas}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreVillas}
          onEndReachedThreshold={0.5}
        />
      </View>

      <LoginBottomSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  listContent: {
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    paddingBottom: scale(100),
  },
  cardContainer: {
    marginBottom: scale(25),
  },
  imageWrapper: {
    width: '100%',
    height: scale(240),
    borderRadius: scale(15),
    overflow: 'hidden',
    backgroundColor: '#F3F3F3',
  },
  carouselContainer: {
    flex: 1,
  },
  badgeContainer: {
    position: 'absolute',
    top: scale(12),
    left: scale(12),
  },
  guestFavoriteBadge: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  superhostBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(20),
  },
  badgeText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  wishlistBtn: {
    position: 'absolute',
    top: scale(12),
    right: scale(12),
    zIndex: 10,
  },
  cardContent: {
    paddingTop: scale(12),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(2),
  },
  cardTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: moderateScale(14),
    color: COLORS.BLACK,
    marginLeft: scale(4),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: COLORS.GRAY,
    marginBottom: scale(1),
  },
  details: {
    fontSize: moderateScale(14),
    color: COLORS.GRAY,
    marginBottom: scale(1),
  },
  dates: {
    fontSize: moderateScale(14),
    color: COLORS.GRAY,
    marginBottom: scale(6),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  originalPriceText: {
    fontSize: moderateScale(15),
    color: COLORS.BLACK,
    textDecorationLine: 'line-through',
    marginRight: scale(6),
  },
  currentPriceText: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    textDecorationLine: 'underline',
  },
  priceSuffix: {
    fontSize: moderateScale(15),
    color: COLORS.BLACK,
  },
  discountBadge: {
    backgroundColor: '#F0FFF4',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(4),
    alignSelf: 'flex-start',
    marginTop: scale(8),
    borderWidth: 1,
    borderColor: '#C6F6D5',
  },
  discountText: {
    fontSize: moderateScale(12),
    color: '#22543D',
    fontWeight: 'bold',
  },
});
