import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../../../constants/colors'
import { scale } from 'react-native-size-matters'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import AnimatedHeader from '../../../components/animatedHeader'
import { Settings, HelpCircle, User, Shield, LogOut, ChevronRight } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import CustomButton from '../../../components/commonButton'
import LoginBottomSheet from '../../auth/login'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import NotLoggedIn from '../../../components/notLoggedIn'
import { logout } from '../../../redux/userSlice'

const Profile = () => {
    const insets = useSafeAreaInsets()
    const scrollY = useSharedValue(0)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const dispatch = useDispatch()
    const loginSheetRef = useRef<BottomSheetModal>(null)

    const { userInfo, isLoggedIn } = useSelector((state: RootState) => state.user)

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y
        }
    })

    const TOP_HEADER_HEIGHT = scale(50)
    const SCROLL_DISTANCE = scale(40)

    const userImage = userInfo?.profileImage || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&h=256&auto=format&fit=crop"

    const SettingItem = ({ icon, title, isLast = false, showChevron = true, onPress }: any) => (
        <TouchableOpacity style={[styles.settingItem, !isLast && styles.settingItemBorder]} onPress={onPress}>
            <View style={styles.settingItemLeft}>
                {icon}
                <Text style={styles.settingItemTitle}>{title}</Text>
            </View>
            {showChevron && <ChevronRight color={'#A0A0A0'} size={scale(20)} />}
        </TouchableOpacity>
    )

    const settingsGroup1 = [
        { id: 'account', title: 'Account settings', icon: <Settings color={COLORS.BLACK} size={scale(22)} strokeWidth={1.5} /> },
        { id: 'help', title: 'Get help', icon: <HelpCircle color={COLORS.BLACK} size={scale(22)} strokeWidth={1.5} /> },
        { id: 'profile', title: 'View profile', icon: <User color={COLORS.BLACK} size={scale(22)} strokeWidth={1.5} /> },
        { id: 'privacy', title: 'Privacy', icon: <Shield color={COLORS.BLACK} size={scale(22)} strokeWidth={1.5} />, isLast: true },
    ]

    const handleLogout = () => {
        dispatch(logout())
    }

    if (!isLoggedIn) {
        return (
            <View style={styles.container}>
                <AnimatedHeader title="Profile" scrollY={scrollY} showBell={false} />
                <View style={styles.subContainer}>
                    <Text style={styles.mainTitleAlt}>Profile</Text>
                    <NotLoggedIn
                        title="Log in to see your profile"
                        subtitle="You can create, view or edit your profile once you've logged in."
                        onLogin={() => loginSheetRef.current?.present()}
                    />
                </View>
                <LoginBottomSheet ref={loginSheetRef} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <AnimatedHeader title="Profile" scrollY={scrollY} />

            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingTop: insets.top + TOP_HEADER_HEIGHT + SCROLL_DISTANCE + scale(20),
                    paddingHorizontal: scale(20),
                    paddingBottom: scale(100),
                }}
            >
                <View style={styles.profileCard}>
                    <Image source={{ uri: userImage }} style={styles.profileImage} />
                    <Text style={styles.profileName}>{userInfo?.firstName || 'User'}</Text>
                    <Text style={styles.profileRole}>Guest</Text>
                </View>

                <View style={styles.settingsContainer}>
                    {settingsGroup1.map((item) => (
                        <SettingItem
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            isLast={item.isLast}
                            onPress={() => {
                                if (item.id === 'profile') navigation.navigate('ViewProfile')
                                if (item.id === 'account') navigation.navigate('AccountSettings')
                            }}
                        />
                    ))}
                </View>

                <View style={styles.divider} />

                <View style={styles.settingsContainer}>
                    <SettingItem
                        icon={<LogOut color={COLORS.BLACK} size={scale(22)} strokeWidth={1.5} />}
                        title="Log out"
                        isLast={true}
                        showChevron={false}
                        onPress={handleLogout}
                    />
                </View>

            </Animated.ScrollView>
            <LoginBottomSheet ref={loginSheetRef} />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    subContainer: {
        flex: 1,
        paddingHorizontal: scale(20),
        justifyContent: 'center',
    },
    mainTitleAlt: {
        fontSize: scale(28),
        fontWeight: '700',
        color: COLORS.BLACK,
        marginBottom: scale(40),
        position: 'absolute',
        top: scale(50),
    },
    emptyContainer: {
        flex: 1,
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
    profileCard: {
        backgroundColor: COLORS.WHITE,
        borderRadius: scale(15),
        padding: scale(20),
        alignItems: 'center',
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: scale(30),
        borderWidth: 1,
        borderColor: '#f4f4f4',
    },
    profileImage: {
        width: scale(80),
        height: scale(80),
        borderRadius: scale(40),
        marginBottom: scale(15),
        backgroundColor: '#eee',
    },
    profileName: {
        fontSize: scale(22),
        fontWeight: '600',
        color: COLORS.BLACK,
        marginBottom: scale(4),
        letterSpacing: -0.5,
    },
    profileRole: {
        fontSize: scale(13),
        color: COLORS.TAB_GRAY,
        fontWeight: '400',
    },
    settingsContainer: {
        marginBottom: scale(10),
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: scale(16),
    },
    settingItemBorder: {
        // Uncomment to add thin lines if preferred
        // borderBottomWidth: 1,
        // borderBottomColor: '#f4f4f4',
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingItemTitle: {
        fontSize: scale(14),
        color: COLORS.BLACK,
        marginLeft: scale(16),
        fontWeight: '400',
    },
    divider: {
        height: 1,
        backgroundColor: '#f4f4f4',
        marginVertical: scale(10),
    }
})
