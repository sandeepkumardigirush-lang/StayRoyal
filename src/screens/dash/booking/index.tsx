import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/colors';
import { scale, moderateScale } from 'react-native-size-matters';
import { Gem, Star, Medal, X } from 'lucide-react-native';
import { Image } from 'react-native';

import BookingRow from './components/BookingRow';
import PickerModals from './components/PickerModals';
import BookingHeader from './components/BookingHeader';
import BookingFooter from './components/BookingFooter';

const PropertySummary = ({ image, title, rating, reviews }: { image: string; title: string; rating: number; reviews: number }) => (
    <View style={styles.propertySection}>
        <Image source={{ uri: image }} style={styles.propertyImage} />
        <View style={styles.propertyInfo}>
            <Text style={styles.propertyTitle} numberOfLines={2}>{title}</Text>
            <View style={styles.propertyRatingRow}>
                <Star color={COLORS.BLACK} size={scale(11)} fill={COLORS.BLACK} />
                <Text style={styles.ratingText}> {rating} ({reviews})</Text>
                <Text style={styles.ratingDot}> • </Text>
                <Medal color={COLORS.BLACK} size={scale(11)} />
                <Text style={styles.guestFavText}> Guest favourite</Text>
            </View>
        </View>
    </View>
);

const BookingReview = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();

    const [startDate, setStartDate] = useState<string | null>("2026-05-27");
    const [endDate, setEndDate] = useState<string | null>("2026-06-11");
    const [markedDates, setMarkedDates] = useState<any>({
        '2026-05-27': { startingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE },
        '2026-06-11': { endingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE },
    });

    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGuestPicker, setShowGuestPicker] = useState(false);
    const [showPriceDetails, setShowPriceDetails] = useState(false);

    const propertyData = {
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=300&h=300&auto=format&fit=crop",
        title: "Lovers | Privacy | Not Shared | Direct access",
        rating: 4.89,
        reviews: 18
    };

    const onDayPress = (day: any) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
            setMarkedDates({
                [day.dateString]: { startingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE }
            });
        } else {
            let start = new Date(startDate);
            let end = new Date(day.dateString);
            if (end < start) {
                setStartDate(day.dateString);
                setMarkedDates({
                    [day.dateString]: { startingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE }
                });
            } else {
                setEndDate(day.dateString);
                setMarkedDates(getDatesInRange(startDate, day.dateString));
            }
        }
    };

    const getDatesInRange = (startStr: string, endStr: string) => {
        const dates: any = {};
        const start = new Date(startStr);
        const end = new Date(endStr);
        let current = new Date(start);
        while (current <= end) {
            const dateStr = current.toISOString().split('T')[0];
            if (dateStr === startStr) {
                dates[dateStr] = { startingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE };
            } else if (dateStr === endStr) {
                dates[dateStr] = { endingDay: true, color: COLORS.BLACK, textColor: COLORS.WHITE };
            } else {
                dates[dateStr] = { color: 'rgba(0,0,0,0.08)', textColor: COLORS.BLACK };
            }
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };

    const formatDateRange = (start: string | null, end: string | null) => {
        if (!start) return "Add dates";
        if (!end) return start;
        const s = new Date(start);
        const e = new Date(end);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        return `${s.toLocaleDateString('en-GB', options)} – ${e.toLocaleDateString('en-GB', options)} ${e.getFullYear()}`;
    }

    const formatGuests = (g: any) => {
        const total = g.adults + g.children;
        if (total === 0) return "Add guests";
        return `${total} guest${total > 1 ? 's' : ''}${g.infants > 0 ? `, ${g.infants} infant${g.infants > 1 ? 's' : ''}` : ''}${g.pets > 0 ? `, ${g.pets} pet${g.pets > 1 ? 's' : ''}` : ''}`;
    }

    return (
        <View style={styles.container}>
            <BookingHeader
                insetsTop={insets.top}
                onClose={() => navigation?.goBack()}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <PropertySummary {...propertyData} />

                    <View style={styles.divider} />

                    <BookingRow
                        title="Dates"
                        subtitle={formatDateRange(startDate, endDate)}
                        badgeIcon={<Gem color={COLORS.RARE_FIND_PINK} size={scale(12)} />}
                        badgeText="Rare find"
                        buttonText="Change"
                        onPress={() => setShowDatePicker(true)}
                    />

                    <View style={styles.divider} />

                    <BookingRow
                        title="Guests"
                        subtitle={formatGuests(guests)}
                        buttonText="Change"
                        onPress={() => setShowGuestPicker(true)}
                    />

                    <View style={styles.divider} />

                    <BookingRow
                        title="Total price"
                        subtitle="₹13,916.53 including taxes INR"
                        buttonText="Details"
                        subtitleStyle={styles.boldSubtitle}
                        onPress={() => setShowPriceDetails(true)}
                    />

                    <View style={styles.divider} />

                    <BookingRow
                        title="Free cancellation"
                        subtitle="Cancel within 24 hours for a full refund."
                    >
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Change policy</Text>
                        </TouchableOpacity>
                    </BookingRow>
                </View>
            </ScrollView>

            <BookingFooter
                bottomInset={insets.bottom}
                onNext={() => navigation.navigate('MessageToHost')}
                totalSteps={3}
                currentStep={1}
            />

            <PickerModals
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                showGuestPicker={showGuestPicker}
                setShowGuestPicker={setShowGuestPicker}
                showPriceDetails={showPriceDetails}
                setShowPriceDetails={setShowPriceDetails}
                insets={insets}
                startDate={startDate}
                endDate={endDate}
                markedDates={markedDates}
                onDayPress={onDayPress}
                guests={guests}
                setGuests={setGuests}
            />
        </View>
    );
};

export default BookingReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    scrollContent: {
        padding: scale(20),
        paddingBottom: scale(40),
    },
    card: {
        backgroundColor: COLORS.WHITE,
        borderRadius: scale(12),
        padding: scale(20),
        borderWidth: 1,
        borderColor: COLORS.CARD_BORDER,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.SECTION_DIVIDER,
        marginVertical: scale(20),
    },
    boldSubtitle: {
        fontWeight: '600',
        color: COLORS.BLACK,
    },
    linkText: {
        fontSize: scale(13),
        fontWeight: '600',
        color: COLORS.BLACK,
        textDecorationLine: 'underline',
        marginTop: scale(4),
    },
    propertySection: {
        flexDirection: 'row',
        marginBottom: scale(5),
    },
    propertyImage: {
        width: scale(70),
        height: scale(70),
        borderRadius: scale(8),
        backgroundColor: COLORS.IMAGE_BG,
    },
    propertyInfo: {
        flex: 1,
        marginLeft: scale(15),
        justifyContent: 'center',
    },
    propertyTitle: {
        fontSize: scale(13),
        fontWeight: '600',
        color: COLORS.BLACK,
        marginBottom: scale(6),
        lineHeight: scale(18),
    },
    propertyRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: scale(11),
        fontWeight: '500',
        color: COLORS.BLACK,
    },
    ratingDot: {
        fontSize: scale(12),
        color: '#666',
        marginHorizontal: scale(2),
    },
    guestFavText: {
        fontSize: scale(12),
        fontWeight: '500',
        color: COLORS.BLACK,
    },
});
