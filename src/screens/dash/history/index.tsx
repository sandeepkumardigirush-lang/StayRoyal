import React from 'react';
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




const History = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.mainTitle}>History</Text>

                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Log in to see your History</Text>
                    <Text style={styles.emptySubtitle}>You can create, view or edit wishlists once you've logged in.</Text>
                    <CustomButton title="Log in" onPress={() => { }} width={scale(100)} />
                </View>

            </View>
        </SafeAreaView>
    );
};

export default History;

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
        fontWeight: '600',
        color: COLORS.BLACK,
        marginVertical: scale(20),
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
