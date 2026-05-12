import React, { useRef, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';
import { RootState } from '../../../redux/store';
import CustomButton from '../../../components/commonButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import LoginBottomSheet from '../../auth/login';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import WishlistGrid from './components/WishlistGrid';

const Saved = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const loginSheetRef = useRef<BottomSheetModal>(null);
  const wishlists = useSelector((state: RootState) => state.wishlist.wishlists);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleWishlistPress = useCallback((wishlist: any) => {
    navigation.navigate('WishlistDetails', { wishlist });
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.wishlistCard} 
      activeOpacity={0.8}
      onPress={() => handleWishlistPress(item)}
    >
      <View style={styles.imageContainer}>
        <WishlistGrid items={item.items} />
      </View>
      <Text style={styles.wishlistName}>{item.name}</Text>
      <Text style={styles.wishlistItemCount}>{item.items.length} saved</Text>
    </TouchableOpacity>
  ), [handleWishlistPress]);

  const keyExtractor = useCallback((item: any) => item.name, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.mainTitle}>Wishlists</Text>

        {!isLoggedIn ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Log in to see your wishlists</Text>
            <Text style={styles.emptySubtitle}>You can create, view or edit wishlists once you've logged in.</Text>
            <CustomButton title="Log in" onPress={() => loginSheetRef.current?.present()} width={scale(100)} />
          </View>
        ) : wishlists.length > 0 ? (
          <FlatList
            data={wishlists}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listPadding}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Create your first wishlist</Text>
            <Text style={styles.emptySubtitle}>As you search, tap the heart icon to save your favourite places and Experiences to a wishlist.</Text>
          </View>
        )}
      </View>
      <LoginBottomSheet ref={loginSheetRef} />
    </SafeAreaView>
  );
};

export default React.memo(Saved);

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
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginVertical: scale(20),
  },
  listPadding: {
    paddingBottom: scale(100),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  wishlistCard: {
    width: '48%',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: scale(12),
    backgroundColor: COLORS.LIGHT_GRAY,
    marginBottom: scale(10),
    borderWidth: 1,
    borderColor: COLORS.DIVIDER,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  wishlistName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: scale(2),
  },
  wishlistItemCount: {
    fontSize: moderateScale(12),
    color: COLORS.SECONDARY,
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
});
