import React, { useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale } from 'react-native-size-matters';
import { ChevronLeft, MoreVertical, Star, Heart } from 'lucide-react-native';
import { COLORS } from '../../../constants/colors';
import ImageCarousel from '../../../components/imageCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { removeFromWishlist } from '../../../redux/wishlistSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PropertyCard = ({ item, onUnlike }: { item: any, onUnlike: (id: string) => void }) => {
    const images = item.images || (item.image ? [item.image] : []);

    return (
        <View style={styles.cardContainer}>
            <View style={styles.imageWrapper}>
                {images.length > 1 ? (
                    <ImageCarousel images={images} />
                ) : (
                    <Image source={{ uri: images[0] }} style={styles.propertyImage} />
                )}
                <View style={styles.badgeContainer}>
                    <View style={styles.guestFavoriteBadge}>
                        <Text style={styles.badgeText}>Guest favourite</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.wishlistBtn}
                    onPress={() => onUnlike(item.id)}
                >
                    <Heart
                        color={COLORS.WHITE}
                        fill={COLORS.RED}
                        size={scale(22)}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.titleRow}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{item.name || 'Premium Villa'}</Text>
                    <View style={styles.ratingRow}>
                        <Star size={scale(12)} color={COLORS.BLACK} fill={COLORS.BLACK} />
                        <Text style={styles.ratingText}>{item.rating || '4.89'} ({item.reviews || '24'})</Text>
                    </View>
                </View>

                <Text style={styles.subtitle}>{item.subtitle || 'Lovers | Privacy | Not Shared'}</Text>
                <Text style={styles.details}>1 bedroom · 1 king bed · 1 bathroom</Text>
                <Text style={styles.dates}>14–21 May</Text>

                <View style={styles.priceRow}>
                    {item.originalPrice && (
                        <Text style={styles.originalPriceText}>₹{item.originalPrice.toLocaleString()}</Text>
                    )}
                    <Text style={styles.currentPriceText}>₹{(item.price || 7539).toLocaleString()}</Text>
                    <Text style={styles.priceSuffix}> for 7 nights</Text>
                </View>
            </View>
        </View>
    );
};

const WishlistDetails = ({ route, navigation }: any) => {
    const { wishlist: initialWishlist } = route.params;
    const dispatch = useDispatch();

    const wishlist = useSelector((state: RootState) =>
        state.wishlist.wishlists.find(w => w.name === initialWishlist.name)
    );

    const handleUnlike = useCallback((id: string) => {
        dispatch(removeFromWishlist(id));
    }, [dispatch]);

    if (!wishlist) return null;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft color={COLORS.BLACK} size={scale(24)} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MoreVertical color={COLORS.BLACK} size={scale(20)} />
                </TouchableOpacity>
            </View>

            <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>{wishlist.name}</Text>
                <Text style={styles.itemCount}>{wishlist.items.length} items saved</Text>
            </View>

            <FlatList
                data={wishlist.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PropertyCard item={item} onUnlike={handleUnlike} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default WishlistDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
    },
    titleSection: {
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
        marginBottom: scale(10),
    },
    mainTitle: {
        fontSize: scale(28),
        fontWeight: '700',
        color: COLORS.BLACK,
        marginBottom: scale(5),
    },
    itemCount: {
        fontSize: scale(14),
        color: COLORS.SECONDARY,
    },
    listContent: {
        paddingHorizontal: scale(20),
        paddingBottom: scale(40),
    },
    cardContainer: {
        marginBottom: scale(30),
    },
    imageWrapper: {
        width: '100%',
        height: scale(240),
        borderRadius: scale(15),
        overflow: 'hidden',
        backgroundColor: '#F3F3F3',
    },
    propertyImage: {
        width: '100%',
        height: '100%',
    },
    badgeContainer: {
        position: 'absolute',
        top: scale(12),
        left: scale(12),
        zIndex: 10,
    },
    wishlistBtn: {
        position: 'absolute',
        top: scale(12),
        right: scale(12),
        zIndex: 10,
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
});
