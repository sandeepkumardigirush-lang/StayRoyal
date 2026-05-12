import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../../constants/colors'
import { scale } from 'react-native-size-matters'
import Animated, { useAnimatedStyle, interpolate, Extrapolation, SharedValue } from 'react-native-reanimated'
import { Bell } from 'lucide-react-native'

interface AnimatedHeaderProps {
    title: string;
    scrollY: SharedValue<number>;
    showBell?: boolean;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ title, scrollY, showBell = true }) => {
    const insets = useSafeAreaInsets()

    const SCROLL_DISTANCE = scale(30)
    const FONT_SIZE_LARGE = scale(28)
    const FONT_SIZE_SMALL = scale(20)

    const titleAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [-100, 0, SCROLL_DISTANCE],
            [SCROLL_DISTANCE, SCROLL_DISTANCE, 0],
            Extrapolation.CLAMP
        )

        const fontSize = interpolate(
            scrollY.value,
            [-100, 0, SCROLL_DISTANCE],
            [FONT_SIZE_LARGE, FONT_SIZE_LARGE, FONT_SIZE_SMALL],
            Extrapolation.CLAMP
        )

        return {
            transform: [{ translateY }],
            fontSize: fontSize,
        }
    })

    const headerBgAnimatedStyle = useAnimatedStyle(() => {
        const shadowOpacity = interpolate(
            scrollY.value,
            [0, SCROLL_DISTANCE],
            [0, 0.1],
            Extrapolation.CLAMP
        )
        return {
            shadowOpacity,
            elevation: shadowOpacity * 10
        }
    })

    const TOP_HEADER_HEIGHT = scale(50)

    return (
        <>
            <Animated.View style={[styles.headerBackground, { height: insets.top + TOP_HEADER_HEIGHT }, headerBgAnimatedStyle]} />
            <View style={[styles.absoluteHeader, { paddingTop: insets.top }]} pointerEvents="box-none">
                <View style={[styles.headerContent, { height: TOP_HEADER_HEIGHT }]} pointerEvents="box-none">
                    <Animated.Text style={[styles.headerTitle, titleAnimatedStyle]}>{title}</Animated.Text>
                    {showBell && <Bell color={COLORS.BLACK} size={scale(20)} style={styles.bellIcon} />}
                </View>
            </View>
        </>
    )
}

export default AnimatedHeader

const styles = StyleSheet.create({
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.WHITE,
        zIndex: 5,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    absoluteHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
    },
    headerTitle: {
        fontWeight: '700',
        color: COLORS.BLACK,
        letterSpacing: -0.5,
    },
    bellIcon: {
    },
})
