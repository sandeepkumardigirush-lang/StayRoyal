import React from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/colors';
import CustomButton from '../commonButton';

interface NotLoggedInProps {
    title: string;
    subtitle: string;
    onLogin: () => void;
    style?: StyleProp<ViewStyle>;
}

const NotLoggedIn: React.FC<NotLoggedInProps> = ({ title, subtitle, onLogin, style }) => {
    return (
        <View style={[styles.emptyContainer, style]}>
            <Text style={styles.emptyTitle}>{title}</Text>
            <Text style={styles.emptySubtitle}>{subtitle}</Text>
            <CustomButton title="Log in" onPress={onLogin} width={scale(120)} />
        </View>
    );
};

export default React.memo(NotLoggedIn);

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
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
