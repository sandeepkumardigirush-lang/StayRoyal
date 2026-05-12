import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';
import { RootStackParamList } from '../../../navigation/types';
import VillaDetailHeader from './components/VillaDetailHeader';
import VillaDetailInfo from './components/VillaDetailInfo';
import VillaDetailSections from './components/VillaDetailSections';
import VillaDetailFooter from './components/VillaDetailFooter';
import ReviewsSection from './components/ReviewsSection';
import ReviewsSheet from './components/ReviewsSheet';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MOCK_REVIEWS = [
  { id: '1', user: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=sarah' }, rating: 5, date: 'October 2023', comment: 'Absolutely amazing villa! The views are breathtaking and the interior is so cozy. Will definitely come back.' },
  { id: '2', user: { name: 'Michael', avatar: 'https://i.pravatar.cc/150?u=michael' }, rating: 4, date: 'September 2023', comment: 'Great location and very clean. The pool area is fantastic. Only minor issue was the wifi in the back bedroom.' },
  { id: '3', user: { name: 'Emma', avatar: 'https://i.pravatar.cc/150?u=emma' }, rating: 5, date: 'August 2023', comment: 'Perfect stay for our family. The host was very responsive and helpful with local recommendations.' },
  { id: '4', user: { name: 'David', avatar: 'https://i.pravatar.cc/150?u=david' }, rating: 5, date: 'July 2023', comment: 'Incredible value for money. The kitchen is fully equipped and the beds are super comfortable.' },
  { id: '5', user: { name: 'Jessica', avatar: 'https://i.pravatar.cc/150?u=jessica' }, rating: 4, date: 'June 2023', comment: 'Lovely place. Very quiet and peaceful. Just what we needed for our anniversary trip.' },
  { id: '6', user: { name: 'Chris', avatar: 'https://i.pravatar.cc/150?u=chris' }, rating: 5, date: 'May 2023', comment: 'The best Airbnb experience I\'ve had. Everything was perfect down to the smallest detail.' },
  { id: '7', user: { name: 'Elena', avatar: 'https://i.pravatar.cc/150?u=elena' }, rating: 5, date: 'April 2023', comment: 'Stunning architecture and very modern amenities. Highly recommend for a luxury getaway.' },
  { id: '8', user: { name: 'Ryan', avatar: 'https://i.pravatar.cc/150?u=ryan' }, rating: 4, date: 'March 2023', comment: 'Very spacious and well-maintained. The garden is beautiful.' },
  { id: '9', user: { name: 'Sophia', avatar: 'https://i.pravatar.cc/150?u=sophia' }, rating: 5, date: 'February 2023', comment: 'A true gem. The neighborhood is very safe and close to all the best restaurants.' },
  { id: '10', user: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=alex' }, rating: 5, date: 'January 2023', comment: 'Exceeded all expectations. The photos don\'t do it justice!' },
  { id: '11', user: { name: 'Maria', avatar: 'https://i.pravatar.cc/150?u=maria' }, rating: 4, date: 'December 2022', comment: 'Good stay. Friendly host and nice views.' },
  { id: '12', user: { name: 'Tom', avatar: 'https://i.pravatar.cc/150?u=tom' }, rating: 5, date: 'November 2022', comment: 'Highly recommended for anyone visiting the area.' },
];

const VillaDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'VillaDetail'>>();
  const { villa } = route.params;
  const insets = useSafeAreaInsets();
  const reviewsSheetRef = React.useRef<BottomSheetModal>(null);

  const handleOpenReviews = () => {
    console.log('Opening reviews sheet...');
    reviewsSheetRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <VillaDetailHeader
          images={villa.images}
          screenWidth={SCREEN_WIDTH}
          onBack={() => navigation.goBack()}
        />
        <View style={styles.body}>
          <VillaDetailInfo villa={villa} />
          <VillaDetailSections villa={villa} />
          <ReviewsSection
            reviews={MOCK_REVIEWS}
            onViewAll={handleOpenReviews}
          />
        </View>
      </ScrollView>

      <VillaDetailFooter
        price={villa.price}
        bottomInset={insets.bottom}
      />

      <ReviewsSheet
        ref={reviewsSheetRef}
        reviews={MOCK_REVIEWS}
      />
    </View>
  );
};

export default VillaDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    paddingBottom: scale(100),
  },
  body: {
    marginTop: -scale(24),          // pulls card up over carousel
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(24),
    paddingTop: scale(24),
  },
});
