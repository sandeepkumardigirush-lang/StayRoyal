import React, { useState, useMemo, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';
import { RootState } from '../../../redux/store';
import CustomButton from '../../../components/commonButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { Booking, BookingStatus } from '../../../types/booking';
import BookingCard from './components/BookingCard';
import TabButton from './components/TabButton';
import LoginBottomSheet from '../../auth/login';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import NotLoggedIn from '../../../components/notLoggedIn';

const CHUNK_SIZE = 5;

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    villaName: 'Ocean View Luxury Villa',
    villaImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    location: 'Malibu, California',
    date: 'Dec 12 - Dec 18, 2023',
    price: '2,450',
    status: 'upcoming',
    rating: 4.9,
    guests: 4
  },
  {
    id: '2',
    villaName: 'Mountain Retreat Cabin',
    villaImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    location: 'Aspen, Colorado',
    date: 'Oct 05 - Oct 10, 2023',
    price: '1,800',
    status: 'completed',
    rating: 4.8,
    guests: 2
  },
  {
    id: '3',
    villaName: 'Modern Desert Oasis',
    villaImage: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80',
    location: 'Palm Springs, California',
    date: 'Sep 15 - Sep 20, 2023',
    price: '3,200',
    status: 'cancelled',
    rating: 5.0,
    guests: 6
  },
  {
    id: '4',
    villaName: 'Tropical Beachfront Paradise',
    villaImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    location: 'Maui, Hawaii',
    date: 'Jan 20 - Jan 27, 2024',
    price: '4,500',
    status: 'upcoming',
    rating: 4.95,
    guests: 4
  }
];

const History = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const loginSheetRef = useRef<BottomSheetModal>(null);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');

  const filteredBookings = useMemo(() => {
    return MOCK_BOOKINGS.filter(booking => booking.status === activeTab);
  }, [activeTab]);

  const handleBookingPress = useCallback((booking: Booking) => {
    navigation.navigate('BookingDetail', { booking });
  }, [navigation]);

  const renderBookingItem = useCallback(({ item }: { item: Booking }) => (
    <BookingCard item={item} onPress={handleBookingPress} />
  ), [handleBookingPress]);

  const keyExtractor = useCallback((item: Booking) => item.id, []);

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.mainTitle}>History</Text>
          <NotLoggedIn 
            title="Log in to see your History" 
            subtitle="You can view and manage your upcoming and past bookings once you've logged in." 
            onLogin={() => loginSheetRef.current?.present()} 
          />
        </View>
        <LoginBottomSheet ref={loginSheetRef} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.mainTitle}>History</Text>
        
        <View style={styles.tabContainer}>
          <TabButton 
            title="Upcoming" 
            isActive={activeTab === 'upcoming'} 
            onPress={() => setActiveTab('upcoming')} 
          />
          <TabButton 
            title="Completed" 
            isActive={activeTab === 'completed'} 
            onPress={() => setActiveTab('completed')} 
          />
          <TabButton 
            title="Cancelled" 
            isActive={activeTab === 'cancelled'} 
            onPress={() => setActiveTab('cancelled')} 
          />
        </View>

        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          removeClippedSubviews={true}
          initialNumToRender={CHUNK_SIZE}
          maxToRenderPerBatch={CHUNK_SIZE}
          windowSize={5}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text style={styles.emptyListText}>No {activeTab} bookings found</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(History);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  mainTitle: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginVertical: scale(20),
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: scale(24),
    backgroundColor: '#F7F7F7',
    borderRadius: scale(12),
    padding: scale(4),
  },
  listContent: {
    paddingBottom: scale(100),
  },
  emptyContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: scale(10),
  },
  emptySubtitle: {
    fontSize: moderateScale(14),
    color: COLORS.SECONDARY,
    lineHeight: scale(20),
    marginBottom: scale(25),
  },
  emptyList: {
    paddingVertical: scale(50),
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: moderateScale(16),
    color: COLORS.SECONDARY,
  },
});
