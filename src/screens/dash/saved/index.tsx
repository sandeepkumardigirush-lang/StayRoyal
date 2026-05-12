import React, { useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';
import { RootState } from '../../../redux/store';
import CustomButton from '../../../components/commonButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import LoginBottomSheet from '../../auth/login';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - scale(60)) / 2;

const WishlistGrid = ({ items }: { items: any[] }) => {
    const displayItems = items.slice(0, 4);
    const count = displayItems.length;

    if (count === 0) return <View style={[styles.wishlistImage, styles.emptyImage]} />;
    if (count === 1) return <Image source={{ uri: displayItems[0].image || displayItems[0].images?.[0] }} style={styles.wishlistImage} />;
    
    if (count === 2) {
        return (
            <View style={styles.gridContainer}>
                <Image source={{ uri: displayItems[0].image || displayItems[0].images?.[0] }} style={styles.gridImageHalf} />
                <Image source={{ uri: displayItems[1].image || displayItems[1].images?.[0] }} style={styles.gridImageHalf} />
            </View>
        );
    }

    if (count === 3) {
        return (
            <View style={styles.gridContainer}>
                <Image source={{ uri: displayItems[0].image || displayItems[0].images?.[0] }} style={styles.gridImageHalf} />
                <View style={styles.gridColumn}>
                    <Image source={{ uri: displayItems[1].image || displayItems[1].images?.[0] }} style={styles.gridImageQuarter} />
                    <Image source={{ uri: displayItems[2].image || displayItems[2].images?.[0] }} style={styles.gridImageQuarter} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.gridContainer}>
            <View style={styles.gridColumn}>
                <Image source={{ uri: displayItems[0].image || displayItems[0].images?.[0] }} style={styles.gridImageQuarter} />
                <Image source={{ uri: displayItems[1].image || displayItems[1].images?.[0] }} style={styles.gridImageQuarter} />
            </View>
            <View style={styles.gridColumn}>
                <Image source={{ uri: displayItems[2].image || displayItems[2].images?.[0] }} style={styles.gridImageQuarter} />
                <Image source={{ uri: displayItems[3].image || displayItems[3].images?.[0] }} style={styles.gridImageQuarter} />
            </View>
        </View>
    );
};

const Saved = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const loginSheetRef = useRef<BottomSheetModal>(null);
    const wishlists = useSelector((state: RootState) => state.wishlist.wishlists);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity 
            style={styles.wishlistCard} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('WishlistDetails', { wishlist: item })}
        >
            <View style={styles.imageContainer}>
                <WishlistGrid items={item.items} />
            </View>
            <Text style={styles.wishlistName}>{item.name}</Text>
            <Text style={styles.wishlistItemCount}>{item.items.length} saved</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.mainTitle}>Wishlists</Text>

                {!isLoggedIn ? (
                    /* Guest State */
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>Log in to see your wishlists</Text>
                        <Text style={styles.emptySubtitle}>You can create, view or edit wishlists once you've logged in.</Text>
                        <CustomButton title="Log in" onPress={() => loginSheetRef.current?.present()} width={scale(100)} />
                    </View>
                ) : wishlists.length > 0 ? (
                    /* Logged In with Wishlists */
                    <FlatList
                        data={wishlists}
                        keyExtractor={(item) => item.name}
                        renderItem={renderItem}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listPadding}
                    />
                ) : (
                    /* Logged In but Empty */
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

export default Saved;

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
        fontSize: scale(24),
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
        width: ITEM_WIDTH,
    },
    imageContainer: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        borderRadius: scale(12),
        backgroundColor: COLORS.IMAGE_BG,
        marginBottom: scale(10),
        borderWidth: 1,
        borderColor: COLORS.LIGHT_GRAY_BORDER,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    wishlistImage: {
        width: '100%',
        height: '100%',
    },
    gridContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        gap: 2,
    },
    gridImageHalf: {
        flex: 1,
        height: '100%',
    },
    gridColumn: {
        flex: 1,
        height: '100%',
        gap: 2,
    },
    gridImageQuarter: {
        flex: 1,
        width: '100%',
    },
    emptyImage: {
        backgroundColor: COLORS.LIGHT_GRAY_BORDER,
    },
    wishlistName: {
        fontSize: scale(14),
        fontWeight: '600',
        color: COLORS.BLACK,
        marginBottom: scale(2),
    },
    wishlistItemCount: {
        fontSize: scale(12),
        color: COLORS.SECONDARY,
    },
    emptyContainer: {
        flex: 0.8,
        justifyContent: 'center',
    },
    emptyTitle: {
        fontSize: scale(18),
        fontWeight: '600',
        color: COLORS.BLACK,
        marginBottom: scale(10),
    },
    emptySubtitle: {
        fontSize: scale(14),
        color: COLORS.SECONDARY,
        lineHeight: scale(20),
        marginBottom: scale(25),
    },
});
