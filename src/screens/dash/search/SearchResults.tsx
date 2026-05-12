import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, Heart, Star } from 'lucide-react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageCarousel from '../../../components/imageCarousel';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const VILLA_DATA = Array.from({ length: 50 }, (_, index) => {
  const id = index + 1;
  return {
    id: String(id),
    name: id % 3 === 0 ? 'Home in Malibu' : id % 2 === 0 ? 'Villa in Beverly Hills' : 'Flat in Los Angeles',
    subtitle: 'Lovers | Privacy | Not Shared | Direct access',
    details: '1 bedroom · 1 king bed · 1 bathroom',
    dates: '14–21 May',
    price: 7500 + (index * 200),
    originalPrice: 9000 + (index * 200),
    rating: 4.89,
    reviews: 18,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    ],
    isGuestFavorite: id % 2 === 0,
    isSuperhost: id % 3 === 0,
    coordinate: {
      latitude: 34.0522 + (Math.random() - 0.5) * 0.1,
      longitude: -118.2437 + (Math.random() - 0.5) * 0.1,
    }
  };
});


const PriceMarker = React.memo(({ price, selected }: { price: number, selected: boolean }) => (
  <View style={[styles.markerContainer, selected && styles.markerSelected]}>
    <Text style={[styles.markerText, selected && styles.markerTextSelected]}>₹{price.toLocaleString()}</Text>
  </View>
));

import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';

const SearchResults = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'SearchResults'>>();
  const { location, guests, startDate, endDate, coords } = route.params;
  const [selectedVilla, setSelectedVilla] = useState<any>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const listRef = useRef<any>(null);
  const [sheetIndex, setSheetIndex] = useState(1);

  const snapPoints = useMemo(() => ['10%', '45%', '90%'], []);

  const [visibleVillas, setVisibleVillas] = useState(VILLA_DATA.slice(0, 5));
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = useCallback(() => {
    if (loadingMore || visibleVillas.length >= VILLA_DATA.length) return;
    setLoadingMore(true);

    setTimeout(() => {
      const nextBatch = VILLA_DATA.slice(visibleVillas.length, visibleVillas.length + 5);
      setVisibleVillas(prev => [...prev, ...nextBatch]);
      setLoadingMore(false);
    }, 400);
  }, [visibleVillas.length, loadingMore]);

  const initialRegion = {
    latitude: coords?.latitude || 34.0522,
    longitude: coords?.longitude || -118.2437,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const renderVillaItem = useCallback(({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('VillaDetail', { villa: item });
      }}
    >
      <View style={styles.imageWrapper}>
        <ImageCarousel images={item.images} />
        <TouchableOpacity style={styles.wishlistBtn}>
          <Heart color={COLORS.WHITE} size={scale(20)} />
        </TouchableOpacity>
        {item.isGuestFavorite && (
          <View style={styles.guestFavoriteBadge}>
            <Text style={styles.badgeText}>Guest favourite</Text>
          </View>
        )}
      </View>
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Star size={scale(12)} color={COLORS.BLACK} fill={COLORS.BLACK} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.priceText}>₹{item.price.toLocaleString()} <Text style={styles.nightText}>night</Text></Text>
      </View>
    </TouchableOpacity>
  ), []);

  const renderedMarkers = useMemo(() => {
    return VILLA_DATA.map((villa) => (
      <Marker
        key={villa.id}
        coordinate={villa.coordinate}
        onPress={() => setSelectedVilla(villa)}
        tracksViewChanges={false}
      >
        <PriceMarker price={villa.price} selected={selectedVilla?.id === villa.id} />
      </Marker>
    ));
  }, [selectedVilla?.id]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {renderedMarkers}
      </MapView>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none" edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (sheetIndex > 0) {
                bottomSheetRef.current?.snapToIndex(0);
              } else {
                navigation.navigate('MainTabs');
              }
            }}
            style={styles.backBtn}
          >
            <ChevronLeft size={scale(24)} color={COLORS.BLACK} />
          </TouchableOpacity>
          <View style={styles.searchSummary}>
            <Text style={styles.summaryText} numberOfLines={1}>
              {location || 'Current Location'}
            </Text>
            <Text style={styles.summarySubText}>
              {startDate ? `${startDate} - ${endDate || 'Anytime'}` : 'Anytime'} • {guests?.adults + guests?.children || 0} guests
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={(index) => setSheetIndex(index)}
        handleIndicatorStyle={styles.sheetIndicator}
        backgroundStyle={styles.sheetBackground}
      >
        <View style={styles.sheetHeader}>
          <Text style={styles.resultsCount}>Over 1,000 homes</Text>
        </View>
        <BottomSheetFlatList
          ref={listRef}
          data={visibleVillas}
          renderItem={renderVillaItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          maxToRenderPerBatch={5}
          windowSize={5}
          initialNumToRender={5}
        />
      </BottomSheet>
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GRAY,
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: COLORS.WHITE,
    paddingBottom: scale(10),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
  },
  backBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.BG_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
  },
  searchSummary: {
    flex: 1,
    marginLeft: scale(12),
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: scale(30),
    paddingVertical: scale(8),
    paddingHorizontal: scale(20),
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
  },
  summaryText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  summarySubText: {
    fontSize: moderateScale(11),
    color: COLORS.GRAY,
    marginTop: scale(2)
  },
  markerContainer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  markerSelected: {
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.BLACK,
    transform: [{ scale: 1.1 }],
  },
  markerText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  markerTextSelected: {
    color: COLORS.WHITE,
  },
  sheetBackground: {
    backgroundColor: COLORS.WHITE,
    borderRadius: scale(25),
  },
  sheetIndicator: {
    backgroundColor: '#DDDDDD',
    width: scale(40),
  },
  sheetHeader: {
    paddingVertical: scale(20),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultsCount: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.BLACK,
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
    height: scale(220),
    borderRadius: scale(15),
    overflow: 'hidden',
    backgroundColor: '#F3F3F3',
  },
  wishlistBtn: {
    position: 'absolute',
    top: scale(12),
    right: scale(12),
  },
  guestFavoriteBadge: {
    position: 'absolute',
    top: scale(12),
    left: scale(12),
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
  badgeText: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  cardContent: {
    paddingTop: scale(12),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: COLORS.BLACK,
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
    marginTop: scale(2),
  },
  priceText: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginTop: scale(5),
  },
  nightText: {
    fontWeight: 'normal',
    color: COLORS.BLACK,
  },

});
